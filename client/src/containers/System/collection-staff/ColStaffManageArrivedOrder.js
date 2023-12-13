import React, { Component } from 'react';
import { connect } from 'react-redux';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from 'react-bootstrap/Button';
import Paper from '@mui/material/Paper';
import * as actions from '../../../store/actions/index';
import ModalColStaffReviewOrder from './ModalColStaffReviewOrder';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
     [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
     },
     [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
     },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
     '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
     },
     // hide last border
     '&:last-child td, &:last-child th': {
          border: 0,
     },
}));

class ColStaffManageArrivedOrder extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpen: false,
               invoiceList: [],
               listParcels: '',
          };
     }

     async componentDidMount() {
          const { userInfo } = this.props;
          let col_zip_code = userInfo.zip_code;
          let accessToken = userInfo.token;
          this.props.getAllTransactions(accessToken);
          this.props.getParcelsFromTran(col_zip_code, accessToken);
          this.buildInvoiceFromTran();
          this.props.getAllParcels(accessToken);
     }
     //
     getInfoTransaction = (zip_code) => {
          let { arrTransactions } = this.props;

          for (let i = 0; i < arrTransactions.length; i++) {
               if (zip_code === arrTransactions[i].zip_code) {
                    return arrTransactions[i];
               }
          }
          return '';
     };
     calNumberOfParcel = (invoice) => {
          let totalInvoice = 0;
          let { arrParcelFromTran } = this.props;
          for (let i = 0; i < arrParcelFromTran.length; i++) {
               if (arrParcelFromTran[i].s_zip_code === invoice.s_zip_code) {
                    totalInvoice += 1;
               }
          }
          return totalInvoice;
     };

     // build invoice list
     buildInvoiceFromTran = () => {
          let { arrParcelFromTran } = this.props;
          console.log('arrParcelFromTran : ', arrParcelFromTran);
          let invoiceList = [];
          const uniqueZipCodes = new Map();
          // Lọc các đối tượng với s_zip_code khác nhau
          if (arrParcelFromTran && arrParcelFromTran.length > 0) {
               const filteredData = arrParcelFromTran.filter((obj) => {
                    if (!uniqueZipCodes.has(obj.s_zip_code)) {
                         uniqueZipCodes.set(obj.s_zip_code, true);
                         return true;
                    }
                    return false;
               });

               for (let i = 0; i < filteredData.length; i++) {
                    let transaction = this.getInfoTransaction(filteredData[i]?.s_zip_code);

                    let obj = {};
                    obj.from = transaction?.name;
                    obj.zip_code = transaction?.zip_code;
                    obj.phone = transaction.admin.phone;
                    obj.address = transaction.address;
                    obj.time = filteredData[i]?.s_time;
                    obj.numberItem = this.calNumberOfParcel(filteredData[i]);
                    invoiceList.push(obj);
               }
          }
          this.setState({
               invoiceList: invoiceList,
          });
     };

     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.arrParcelFromTran !== this.props.arrParcelFromTran) {
               this.buildInvoiceFromTran();
          }
     }
     openModalPrintInvoice = (zip_code) => {
          let { arrParcelFromTran, allParcels } = this.props;
          console.log('allParcels here : ', allParcels);
          let listParcels = [];
          const parcelListSameZipCode = arrParcelFromTran.filter((obj) => obj.s_zip_code === zip_code);
          for (let i = 0; i < allParcels.length; i++) {
               for (let j = 0; j < parcelListSameZipCode.length; j++) {
                    if (parcelListSameZipCode[j].parcel_id === allParcels[i].parcel_id) {
                         listParcels.push(allParcels[i]);
                    }
               }
          }
          const uniqueZipCodes = new Map();
          // Lọc các đối tượng với parcel_id khác nhau
          if (listParcels && listParcels.length > 0) {
               listParcels = listParcels.filter((obj) => {
                    if (!uniqueZipCodes.has(obj.parcel_id)) {
                         uniqueZipCodes.set(obj.parcel_id, true);
                         return true;
                    }
                    return false;
               });
          }

          this.setState({
               listParcels: listParcels,
          });
          console.log('list parcel here : ', listParcels);

          this.isOpenModal();
     };

     isOpenModal = () => {
          // event.preventDefault();
          this.setState({ isOpen: true });
     };
     closeModal = (event) => this.setState({ isOpen: false });
     render() {
          let { allParcels } = this.props;
          let { invoiceList, listParcels } = this.state;
          console.log('allParcels  : ', allParcels);
          return (
               <>
                    <div className="admin-container my-3">
                         <div className="admin-content container">
                              <div className="title-admin text-center my-4">
                                   <span>Manage arrived invoice</span>
                              </div>
                              <div className="btn-director-add-new-user-container"></div>
                              <div className="table-user-content mt-2 mb-3 ">
                                   <ModalColStaffReviewOrder
                                        showModal={this.state.isOpen}
                                        closeModal={this.closeModal}
                                        parcelList={listParcels}
                                   />
                                   <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                             <TableHead>
                                                  <TableRow>
                                                       <StyledTableCell>#</StyledTableCell>
                                                       <StyledTableCell>From</StyledTableCell>
                                                       <StyledTableCell>Phone</StyledTableCell>
                                                       <StyledTableCell>Zip code</StyledTableCell>
                                                       <StyledTableCell>Address</StyledTableCell>
                                                       <StyledTableCell>Time</StyledTableCell>
                                                       <StyledTableCell>No items ($) </StyledTableCell>
                                                       {/* <StyledTableCell>Value</StyledTableCell> */}

                                                       <StyledTableCell>Actions</StyledTableCell>
                                                  </TableRow>
                                             </TableHead>
                                             <TableBody>
                                                  {invoiceList.map((row, index) => (
                                                       <StyledTableRow key={index}>
                                                            <StyledTableCell component="th" scope="row">
                                                                 {index + 1}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row">
                                                                 {row.from}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row">
                                                                 {row.phone}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row">
                                                                 {row.zip_code}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row">
                                                                 {row.address}
                                                            </StyledTableCell>
                                                            <StyledTableCell align="left">{row.time}</StyledTableCell>
                                                            <StyledTableCell align="left">
                                                                 {row.numberItem}
                                                            </StyledTableCell>
                                                            {/* <StyledTableCell align="left">1000</StyledTableCell> */}
                                                            <StyledTableCell align="left">
                                                                 <Button
                                                                      className="btn btn-primary"
                                                                      onClick={() =>
                                                                           this.openModalPrintInvoice(row.zip_code)
                                                                      }
                                                                 >
                                                                      Detail
                                                                 </Button>
                                                            </StyledTableCell>
                                                       </StyledTableRow>
                                                  ))}
                                             </TableBody>
                                        </Table>
                                   </TableContainer>
                              </div>
                         </div>
                    </div>
               </>
          );
     }
}

const mapStateToProps = (state) => {
     return {
          userInfo: state.user.userInfo,
          arrParcelFromTran: state.colStaff.arrParcelFromTran,
          arrTransactions: state.admin.arrTransactions,
          allParcels: state.colStaff.allParcels,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getParcelsFromTran: (col_zip_code, accessToken) =>
               dispatch(actions.getParcelsFromTranAction(col_zip_code, accessToken)),

          getAllTransactions: (token) => dispatch(actions.getAllTransactionsAction(token)),
          getAllParcels: (token) => dispatch(actions.getAllParcelsAction(token)),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColStaffManageArrivedOrder);
