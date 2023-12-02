import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import ModalTransactionStaffPrintReceipt from './ModalTransactionStaffPrintInvoice';
import { DataGrid } from '@mui/x-data-grid';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from 'react-bootstrap/Table';
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
class TransactionStaffCreateReceipt extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpen: false,
               currency: '$',
               currentDate: '',
               invoiceNumber: 1,
               dateOfIssue: '',
               billTo: '',
               billToEmail: '',
               billToAddress: '',
               billFrom: '',
               billFromEmail: '',
               billFromAddress: '',
               notes: '',
               total: '0.00',
          };
     }
     componentDidMount(prevProps) {}

     onCurrencyChange = (selectedOption) => {
          this.setState(selectedOption);
     };
     editField = (event) => {
          this.setState({
               [event.target.name]: event.target.value,
          });
     };
     openModal = (event) => {
          event.preventDefault();
          this.setState({ isOpen: true });
     };
     closeModal = (event) => this.setState({ isOpen: false });
     render() {
          return (
               <Form onSubmit={this.openModal}>
                    <Row>
                         <Col md={8} lg={9}>
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
                                             <div className="d-flex flex-row align-items-center">
                                                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                                                  <Form.Control
                                                       type="date"
                                                       value={this.state.dateOfIssue}
                                                       name={'dateOfIssue'}
                                                       onChange={(event) => this.editField(event)}
                                                       style={{
                                                            maxWidth: '150px',
                                                       }}
                                                       required="required"
                                                  />
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
                                             <Form.Label className="fw-bold">Bill to:</Form.Label>
                                             <Form.Control
                                                  placeholder={'Who is this invoice to?'}
                                                  rows={3}
                                                  value={this.state.billTo}
                                                  type="text"
                                                  name="billTo"
                                                  className="my-2"
                                                  onChange={(event) => this.editField(event)}
                                                  autoComplete="name"
                                                  required="required"
                                             />
                                             <Form.Control
                                                  placeholder={'Email address'}
                                                  value={this.state.billToEmail}
                                                  type="email"
                                                  name="billToEmail"
                                                  className="my-2"
                                                  onChange={(event) => this.editField(event)}
                                                  autoComplete="email"
                                                  required="required"
                                             />
                                             <Form.Control
                                                  placeholder={'Billing address'}
                                                  value={this.state.billToAddress}
                                                  type="text"
                                                  name="billToAddress"
                                                  className="my-2"
                                                  autoComplete="address"
                                                  onChange={(event) => this.editField(event)}
                                                  required="required"
                                             />
                                        </Col>
                                        <Col>
                                             <Form.Label className="fw-bold">Bill from:</Form.Label>
                                             <Form.Control
                                                  placeholder={'Who is this invoice from?'}
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
                                                  placeholder={'Email address'}
                                                  value={this.state.billFromEmail}
                                                  type="email"
                                                  name="billFromEmail"
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
                                        </Col>
                                   </Row>

                                   <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                             <TableHead>
                                                  <TableRow>
                                                       <TableCell>Dessert (100g serving)</TableCell>
                                                       <TableCell align="right">Calories</TableCell>
                                                       <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                                       <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                                       <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                                  </TableRow>
                                             </TableHead>
                                             <TableBody>
                                                  {rows.map((row) => (
                                                       <TableRow
                                                            key={row.name}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                       >
                                                            <TableCell component="th" scope="row">
                                                                 {row.name}
                                                            </TableCell>
                                                            <TableCell align="right">{row.calories}</TableCell>
                                                            <TableCell align="right">{row.fat}</TableCell>
                                                            <TableCell align="right">{row.carbs}</TableCell>
                                                            <TableCell align="right">{row.protein}</TableCell>
                                                       </TableRow>
                                                  ))}
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
                                                  <span className="fw-bold">
                                                       {this.state.currency}
                                                       {this.state.total || 0}
                                                  </span>
                                             </div>
                                        </Col>
                                   </Row>
                                   <hr className="my-4" />

                                   <Form.Label className="fw-bold">Notes:</Form.Label>
                                   <Form.Control
                                        placeholder="Thanks for your business!"
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
                                   <ModalTransactionStaffPrintReceipt
                                        showModal={this.state.isOpen}
                                        closeModal={this.closeModal}
                                        info={this.state}
                                        items={this.state.items}
                                        currency={this.state.currency}
                                        subTotal={this.state.subTotal}
                                        discountAmmount={this.state.discountAmmount}
                                        total={this.state.total}
                                   />
                                   <Form.Group className="mb-3">
                                        <Form.Label className="fw-bold">Currency:</Form.Label>
                                        <Form.Select
                                             onChange={(event) =>
                                                  this.onCurrencyChange({ currency: event.target.value })
                                             }
                                             className="btn btn-light my-1"
                                             aria-label="Change Currency"
                                        >
                                             <option value="$">USD (United States Dollar)</option>
                                             <option value="£">GBP (British Pound Sterling)</option>
                                             <option value="¥">JPY (Japanese Yen)</option>
                                             <option value="$">CAD (Canadian Dollar)</option>
                                        </Form.Select>
                                   </Form.Group>
                              </div>
                         </Col>
                    </Row>
               </Form>
          );
     }
}

export default TransactionStaffCreateReceipt;
