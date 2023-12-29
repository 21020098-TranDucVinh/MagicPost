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
import '../transaction-staff/StaffManageArrivedOrder.scss';
import ModalColStaffReviewReceivedOrder from './ModalColStaffReviewReceivedOrder';
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
          this.props.getAllCollections(accessToken);
          this.props.getParcelsFromTran(col_zip_code, accessToken);
          this.buildInvoiceFromTran();
          this.props.getAllParcels(accessToken);
     }
     // get transaction with zip_code
     getInfoTransactionWithZipCode = (zip_code) => {
          let { arrTransactions } = this.props;

          for (let i = 0; i < arrTransactions.length; i++) {
               if (zip_code === arrTransactions[i].zip_code) {
                    return arrTransactions[i];
               }
          }
          return '';
     };
     // get collection with zip_code
     getInfoCollectionWithZipCode = (zip_code) => {
          let { arrCollections } = this.props;

          for (let i = 0; i < arrCollections.length; i++) {
               if (zip_code === arrCollections[i].zip_code) {
                    return arrCollections[i];
               }
          }
          return '';
     };
     calNumberOfParcel = (invoice) => {
          let totalInvoice = 0;
          let { arrParcelFromAnotherNode } = this.props;
          for (let i = 0; i < arrParcelFromAnotherNode.length; i++) {
               if (arrParcelFromAnotherNode[i].s_zip_code === invoice.s_zip_code) {
                    totalInvoice += 1;
               }
          }
          return totalInvoice;
     };

     // build invoice list
     buildInvoiceFromTran = () => {
          let { arrParcelFromAnotherNode } = this.props;
          console.log('arrParcelFromAnotherNode : ', arrParcelFromAnotherNode);
          let invoiceList = [];
          const uniqueZipCodes = new Map();
          if (arrParcelFromAnotherNode && arrParcelFromAnotherNode.length > 0) {
               // Lọc các đối tượng với s_zip_code khác nhau
               const filteredData = arrParcelFromAnotherNode.filter((obj) => {
                    if (!uniqueZipCodes.has(obj.s_zip_code)) {
                         uniqueZipCodes.set(obj.s_zip_code, true);
                         return true;
                    }
                    return false;
               });

               for (let i = 0; i < filteredData.length; i++) {
                    let senderInfo = '';
                    if (filteredData[i]?.s_zip_code[0] === 'T') {
                         senderInfo = this.getInfoTransactionWithZipCode(filteredData[i]?.s_zip_code);
                    } else {
                         senderInfo = this.getInfoCollectionWithZipCode(filteredData[i]?.s_zip_code);
                    }
                    let obj = {};
                    obj.from = senderInfo?.name;
                    obj.zip_code = senderInfo?.zip_code;
                    obj.phone = senderInfo.admin?.phone;
                    obj.address = senderInfo.address;
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
          if (prevProps.arrParcelFromAnotherNode !== this.props.arrParcelFromAnotherNode) {
               this.buildInvoiceFromTran();
          }
     }
     openModalPrintInvoice = (zip_code) => {
          let { arrParcelFromAnotherNode } = this.props;

          let listParcels = [];
          let parcelListSameZipCode = arrParcelFromAnotherNode.filter((obj) => obj.s_zip_code === zip_code);
          console.log('check parcelListSameZipCode : ', parcelListSameZipCode);
          if (parcelListSameZipCode && parcelListSameZipCode.length > 0) {
               for (let i = 0; i < parcelListSameZipCode.length; i++) {
                    let obj = { trackID: parcelListSameZipCode[i].id, parcel: parcelListSameZipCode[i].parcel };
                    listParcels.push(obj);
               }
          }
          this.setState({
               listParcels: listParcels,
          });

          this.isOpenModal();
     };

     isOpenModal = () => {
          // event.preventDefault();
          this.setState({ isOpen: true });
     };
     closeModal = (event) => this.setState({ isOpen: false });
     render() {
          let { invoiceList, listParcels } = this.state;

          return (
               <>
                    <div className="admin-container my-3">
                         <div className="admin-content container">
                              <div className="title-admin text-center my-4">
                                   <span>Manage arrived invoice</span>
                              </div>
                              <div className="btn-director-add-new-user-container"></div>
                              <div className="table-user-content mt-2 mb-3 ">
                                   <ModalColStaffReviewReceivedOrder
                                        showModal={this.state.isOpen}
                                        closeModal={this.closeModal}
                                        parcelList={listParcels}
                                   />
                                   {invoiceList && invoiceList.length > 0 ? (
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
                                                                 <StyledTableCell align="left">
                                                                      {row.time}
                                                                 </StyledTableCell>
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
                                   ) : (
                                        <div className="text-center display-4 no-order-list">Empty!</div>
                                   )}
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
          arrParcelFromAnotherNode: state.colStaff.arrParcelFromAnotherNode,
          arrTransactions: state.admin.arrTransactions,
          arrCollections: state.admin.arrCollections,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllCollections: (accessToken) => dispatch(actions.getAllCollectionsAction(accessToken)),
          getParcelsFromTran: (col_zip_code, accessToken) =>
               dispatch(actions.getParcelsFromTranAnotherNodeAction(col_zip_code, accessToken)),
          getAllTransactions: (token) => dispatch(actions.getAllTransactionsAction(token)),
          getAllParcels: (token) => dispatch(actions.getAllParcelsAction(token)),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColStaffManageArrivedOrder);
