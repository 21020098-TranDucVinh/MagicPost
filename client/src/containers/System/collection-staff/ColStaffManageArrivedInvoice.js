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
import ModalTransactionStaffPrintInvoice from '../transaction-staff/ModalTransactionStaffPrintInvoice';
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

function createData(name, calories, fat, carbs, protein) {
     return { name, calories, fat, carbs, protein };
}

const rows = [
     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
     createData('Eclair', 262, 16.0, 24, 6.0),
     createData('Cupcake', 305, 3.7, 67, 4.3),
     createData('Gingerbread', 356, 16.0, 49, 3.9),
];
class ColStaffManageArrivedInvoice extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpen: false,
          };
     }

     async componentDidMount() {}
     componentDidUpdate(prevProps, prevState, snapshot) {
          // if (prevProps.arrAdminsPending !== this.props.arrAdminsPending) {
          //      this.setState({
          //           arrAdminsPending: this.props.arrAdminsPending,
          //      });
          // }
     }
     openModalPrintInvoice = () => {
          this.setState({
               isOpen: true,
          });
     };
     openModal = (event) => {
          event.preventDefault();
          this.setState({ isOpen: true });
     };
     closeModal = (event) => this.setState({ isOpen: false });
     render() {
          return (
               <>
                    <div className="admin-container my-3">
                         <div className="admin-content container">
                              <div className="title-admin text-center my-4">
                                   <span>Manage arrived invoice</span>
                              </div>
                              <div className="btn-director-add-new-user-container"></div>
                              <div className="table-user-content mt-2 mb-3 ">
                                   <ModalTransactionStaffPrintInvoice
                                        showModal={this.state.isOpen}
                                        closeModal={this.closeModal}
                                        info={''}
                                        items={''}
                                        currency={'currency'}
                                        subTotal={'subTotal'}
                                        discountAmmount={'discountAmmount'}
                                        total={this.state.total}
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
                                                       <StyledTableCell>Value</StyledTableCell>

                                                       <StyledTableCell>Protein&nbsp;(g)</StyledTableCell>
                                                  </TableRow>
                                             </TableHead>
                                             <TableBody>
                                                  {rows.map((row, index) => (
                                                       <StyledTableRow key={row.name}>
                                                            <StyledTableCell component="th" scope="row">
                                                                 {index + 1}
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row">
                                                                 transaction1
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row">
                                                                 090490303933
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row">
                                                                 T00001
                                                            </StyledTableCell>
                                                            <StyledTableCell component="th" scope="row">
                                                                 CG,HN
                                                            </StyledTableCell>
                                                            <StyledTableCell align="left">10/09/2023</StyledTableCell>
                                                            <StyledTableCell align="left">10</StyledTableCell>
                                                            <StyledTableCell align="left">1000</StyledTableCell>
                                                            <StyledTableCell align="left">
                                                                 <Button
                                                                      className="btn btn-primary"
                                                                      onClick={() => this.openModalPrintInvoice()}
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
     return {};
};

const mapDispatchToProps = (dispatch) => {
     return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ColStaffManageArrivedInvoice);
