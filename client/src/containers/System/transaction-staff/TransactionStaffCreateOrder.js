import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TransactionStaffCreateOrder.scss';
import Row from 'react-bootstrap/Row';
import { connect } from 'react-redux';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ModalTransactionStaffPrintOrder from './ModalTransactionStaffPrintOrder';
import * as actions from '../../../store/actions/index';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from 'react-bootstrap/Table';
class TransactionStaffCreateReceipt extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpen: false,
               currency: '$',
               currentDate: '',
               invoiceNumber: 1,
               belongToCollection: '',
               billFrom: '',
               billFromPhone: '',
               billFromAddress: '',
               notes: '',
               total: '0.00',
               shipperName: '',
               shipperPhone: '',
          };
     }
     componentDidMount() {
          this.handleCalculateValueParcels();
          this.props.getAllTransactions();
          this.props.getAllCollections();
          this.buildDataFrom();
          this.buildInfoCol();
     }
     componentDidUpdate(prevProps, prevState) {
          if (prevProps.arrParcelsToSendCol !== this.props.arrParcelsToSendCol) {
               this.handleCalculateValueParcels();
          }
     }
     // Defining the componentWillUnmount method
     componentWillUnmount() {
          this.props.clearParcelsToSendCol();
     }

     buildDataFrom = async () => {
          let { userInfo, arrTransactions } = this.props;
          let TranZipCode = userInfo.zip_code;
          let data = {};
          if (arrTransactions && arrTransactions.length > 0) {
               for (let i = 0; i < arrTransactions.length; i++) {
                    if (TranZipCode === arrTransactions[i]?.zip_code) {
                         data = arrTransactions[i];
                         break;
                    }
               }
               this.setState({
                    billFrom: data?.name,
                    billFromPhone: '123137123',
                    billFromAddress: data?.address,
               });
          }
     };
     onCurrencyChange = (selectedOption) => {
          this.setState(selectedOption);
     };
     editField = (event) => {
          this.setState({
               [event.target.name]: event.target.value,
          });
     };
     // build info about receive node
     buildInfoCol = () => {
          let { userInfo, arrTransactions, arrCollections } = this.props;
          let tranZipCode = userInfo.zip_code;
          let colZip_Code;
          if (arrTransactions && arrTransactions.length > 0) {
               for (let i = 0; i < arrTransactions.length; i++) {
                    if (tranZipCode === arrTransactions[i].zip_code) {
                         colZip_Code = arrTransactions[i].collection_zip_code;
                         break;
                    }
               }
          }
          if (arrCollections && arrCollections.length > 0) {
               for (let i = 0; i < arrCollections.length; i++) {
                    if (colZip_Code === arrCollections[i].zip_code) {
                         colZip_Code = arrCollections[i].zip_code;
                         this.setState({
                              belongToCollection: arrCollections[i],
                         });
                         break;
                    }
               }
          }
     };
     openModal = (event) => {
          event.preventDefault();
          this.setState({ isOpen: true });
     };
     closeModal = (event) => this.setState({ isOpen: false });
     handleCalculateValueParcels = () => {
          let { arrParcelsToSendCol } = this.props;
          let totalCost = 0;
          for (let i = 0; i < arrParcelsToSendCol.length; i++) {
               totalCost += arrParcelsToSendCol[i].cost;
          }
          // console.log('totalCost', totalCost);
          this.setState({
               total: totalCost,
          });
     };
     render() {
          let { arrParcelsToSendCol } = this.props;
          let { belongToCollection } = this.state;
          // console.log('col : ', belongToCollection);
          return (
               <div className="tran-staff-invoice-container">
                    <Form onSubmit={this.openModal}>
                         <Row>
                              <Col md={8} lg={10}>
                                   <Card className="p-4 p-xl-5 my-3 my-xl-4">
                                        <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                                             <div className="d-flex flex-column">
                                                  <div className="d-flex flex-column">
                                                       <div className="mb-2">
                                                            <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                                                            <span className="current-date">
                                                                 {new Date().toLocaleDateString()}
                                                            </span>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="d-flex flex-row align-items-center">
                                                  <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                                                  <Form.Control
                                                       type="number"
                                                       value={this.state.invoiceNumber}
                                                       name={'invoiceNumber'}
                                                       onChange={(event) => this.editField(event)}
                                                       min="1"
                                                       style={{
                                                            maxWidth: '70px',
                                                       }}
                                                       required="required"
                                                  />
                                             </div>
                                        </div>
                                        <hr className="my-4" />
                                        <Row className="mb-5">
                                             <Col>
                                                  <Form.Label className="font-weight-bold">Bill from:</Form.Label>
                                                  <Form.Control
                                                       placeholder={'Which transaction is this invoice from?'}
                                                       rows={3}
                                                       value={this.state.billFrom}
                                                       type="text"
                                                       name="billFrom"
                                                       className="my-2"
                                                       onChange={(event) => this.editField(event)}
                                                       autoComplete="name"
                                                       required="required"
                                                  />
                                                  <Form.Control
                                                       placeholder={'Transaction phone'}
                                                       value={this.state.billFromPhone}
                                                       type="text"
                                                       name="billFromPhone"
                                                       className="my-2"
                                                       onChange={(event) => this.editField(event)}
                                                       autoComplete="email"
                                                       required="required"
                                                  />
                                                  <Form.Control
                                                       placeholder={'Billing address'}
                                                       value={this.state.billFromAddress}
                                                       type="text"
                                                       name="billFromAddress"
                                                       className="my-2"
                                                       autoComplete="address"
                                                       onChange={(event) => this.editField(event)}
                                                       required="required"
                                                  />
                                                  <Form.Label className="font-weight-bold">Shipper Name:</Form.Label>
                                                  <Form.Control
                                                       placeholder={'Name of shipper'}
                                                       rows={3}
                                                       value={this.state.shipperName}
                                                       type="text"
                                                       name="shipperName"
                                                       className="my-2"
                                                       onChange={(event) => this.editField(event)}
                                                       autoComplete="name"
                                                       required="required"
                                                  />
                                             </Col>
                                             <Col>
                                                  <Form.Label className="font-weight-bold">Bill to:</Form.Label>

                                                  <Form.Control
                                                       placeholder={'Which collection is this invoice to?'}
                                                       value={belongToCollection.name || ''}
                                                       type="text"
                                                       className="my-2"
                                                       onChange={(event) => this.editField(event)}
                                                       autoComplete="email"
                                                       required="required"
                                                  />
                                                  <Form.Control
                                                       placeholder={'Collection phone'}
                                                       value={belongToCollection.admin?.phone || ''}
                                                       type="text"
                                                       className="my-2"
                                                       onChange={(event) => this.editField(event)}
                                                       autoComplete="email"
                                                       required="required"
                                                  />
                                                  <Form.Control
                                                       placeholder={'Billing address'}
                                                       value={belongToCollection.address}
                                                       type="text"
                                                       className="my-2"
                                                       autoComplete="address"
                                                       onChange={(event) => this.editField(event)}
                                                       required="required"
                                                  />
                                                  <Form.Label className="font-weight-bold">Shipper phone:</Form.Label>
                                                  <Form.Control
                                                       placeholder={'Phone of shipper'}
                                                       rows={3}
                                                       value={this.state.shipperPhone}
                                                       type="text"
                                                       name="shipperPhone"
                                                       className="my-2"
                                                       onChange={(event) => this.editField(event)}
                                                       autoComplete="name"
                                                       required="required"
                                                  />
                                             </Col>
                                        </Row>

                                        <TableContainer component={Paper}>
                                             <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                  <TableHead>
                                                       <TableRow>
                                                            <TableCell>ID</TableCell>
                                                            <TableCell align="right">Sender Name</TableCell>
                                                            <TableCell align="right">Sender Phone</TableCell>
                                                            <TableCell align="right">sender Address</TableCell>
                                                            <TableCell align="right">Receiver Name</TableCell>
                                                            <TableCell align="right">Receiver Phone</TableCell>
                                                            <TableCell align="right">Receiver Address</TableCell>
                                                            <TableCell align="right">From</TableCell>
                                                            <TableCell align="right">To </TableCell>
                                                            <TableCell align="right">Cost($)</TableCell>
                                                       </TableRow>
                                                  </TableHead>
                                                  <TableBody>
                                                       {arrParcelsToSendCol && arrParcelsToSendCol.length > 0 ? (
                                                            arrParcelsToSendCol.map((row, index) => (
                                                                 <TableRow
                                                                      key={index}
                                                                      sx={{
                                                                           '&:last-child td, &:last-child th': {
                                                                                border: 0,
                                                                           },
                                                                      }}
                                                                 >
                                                                      <TableCell align="right">{row.id}</TableCell>
                                                                      <TableCell align="right">{row.s_name}</TableCell>
                                                                      <TableCell align="right">{row.s_phone}</TableCell>
                                                                      <TableCell align="right">
                                                                           {row.s_address}
                                                                      </TableCell>
                                                                      <TableCell align="right">{row.r_name}</TableCell>
                                                                      <TableCell align="right">{row.r_phone}</TableCell>
                                                                      <TableCell align="right">
                                                                           {row.r_address}
                                                                      </TableCell>
                                                                      <TableCell align="right">
                                                                           {row.s_zip_code}
                                                                      </TableCell>
                                                                      <TableCell align="right">
                                                                           {row.r_zip_code}
                                                                      </TableCell>
                                                                      <TableCell align="right">{row.cost}</TableCell>
                                                                 </TableRow>
                                                            ))
                                                       ) : (
                                                            <span>Empty!</span>
                                                       )}
                                                  </TableBody>
                                             </Table>
                                        </TableContainer>
                                        <Row className="mt-4 justify-content-end">
                                             <Col lg={6}>
                                                  <hr />
                                                  <div
                                                       className="d-flex flex-row align-items-start justify-content-between"
                                                       style={{
                                                            fontSize: '1.125rem',
                                                       }}
                                                  >
                                                       <span className="fw-bold">Total:</span>
                                                       <span className="fw-bold">{this.state.total}$</span>
                                                  </div>
                                             </Col>
                                        </Row>
                                        <hr className="my-4" />

                                        <Form.Label className="fw-bold">Notes:</Form.Label>
                                        <Form.Control
                                             placeholder="Note!"
                                             name="notes"
                                             value={this.state.notes}
                                             onChange={(event) => this.editField(event)}
                                             as="textarea"
                                             className="my-2"
                                             rows={1}
                                        />
                                   </Card>
                              </Col>
                              <Col md={4} lg={3}>
                                   <div className="sticky-top pt-md-3 pt-xl-4">
                                        <Button variant="primary" type="submit" className="d-block w-100">
                                             Review Invoice
                                        </Button>
                                        <ModalTransactionStaffPrintOrder
                                             showModal={this.state.isOpen}
                                             closeModal={this.closeModal}
                                             info={this.state}
                                             items={this.state.items}
                                             currency={this.state.currency}
                                             total={this.state.total}
                                        />
                                   </div>
                              </Col>
                         </Row>
                    </Form>
               </div>
          );
     }
}

const mapStateToProps = (state) => {
     return {
          arrParcelsToSendCol: state.staffTransaction.arrParcelsToSendCol,
          userInfo: state.user.userInfo,
          arrTransactions: state.admin.arrTransactions,
          arrCollections: state.admin.arrCollections,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllTransactions: () => dispatch(actions.getAllTransactionsAction()),
          getAllCollections: () => dispatch(actions.getAllCollectionsAction()),
          clearParcelsToSendCol: () => dispatch(actions.clearParcelsToSendColAction()),
     };
};
export default connect(mapStateToProps, mapDispatchToProps)(TransactionStaffCreateReceipt);
