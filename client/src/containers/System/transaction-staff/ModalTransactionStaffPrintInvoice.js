import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload } from 'react-icons/bi';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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

function GenerateInvoice() {
     html2canvas(document.querySelector('#invoiceCapture')).then((canvas) => {
          const imgData = canvas.toDataURL('image/png', 1.0);
          const pdf = new jsPDF({
               orientation: 'portrait',
               unit: 'pt',
               format: [612, 792],
          });
          pdf.internal.scaleFactor = 1;
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('invoice-001.pdf');
     });
}

class ModalTransactionStaffPrintReceipt extends React.Component {
     constructor(props) {
          super(props);
          this.state = {};
     }
     render() {
          return (
               <div>
                    <Modal show={this.props.showModal} onHide={this.props.closeModal} size="lg" centered>
                         <div id="invoiceCapture">
                              <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
                                   <div className="w-100">
                                        <h4 className="fw-bold my-2">
                                             {this.props.info.billFrom || 'John Uberbacher'}
                                        </h4>
                                        <h6 className="fw-bold text-secondary mb-1">
                                             Invoice #: {this.props.info.invoiceNumber || ''}
                                        </h6>
                                   </div>
                                   <div className="text-end ms-4">
                                        <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6>
                                        <h5 className="fw-bold text-secondary">
                                             {' '}
                                             {this.props.currency} {this.props.total}
                                        </h5>
                                   </div>
                              </div>
                              <div className="p-4">
                                   <Row className="mb-4">
                                        <Col md={4}>
                                             <div className="fw-bold">Billed to:</div>
                                             <div>{this.props.info.billTo || ''}</div>
                                             <div>{this.props.info.billToAddress || ''}</div>
                                             <div>{this.props.info.billToEmail || ''}</div>
                                        </Col>
                                        <Col md={4}>
                                             <div className="fw-bold">Billed From:</div>
                                             <div>{this.props.info.billFrom || ''}</div>
                                             <div>{this.props.info.billFromAddress || ''}</div>
                                             <div>{this.props.info.billFromEmail || ''}</div>
                                        </Col>
                                        <Col md={4}>
                                             <div className="fw-bold mt-2">Date Of Issue:</div>
                                             <div>{this.props.info.dateOfIssue || ''}</div>
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

                                   <Table>
                                        <tbody>
                                             <tr>
                                                  <td>&nbsp;</td>
                                                  <td>&nbsp;</td>
                                                  <td>&nbsp;</td>
                                             </tr>

                                             <tr className="text-end">
                                                  <td></td>
                                                  <td className="fw-bold" style={{ width: '100px' }}>
                                                       TOTAL
                                                  </td>
                                                  <td className="text-end" style={{ width: '100px' }}>
                                                       {this.props.currency} {this.props.total}
                                                  </td>
                                             </tr>
                                        </tbody>
                                   </Table>
                                   {this.props.info.notes && (
                                        <div className="bg-light py-3 px-4 rounded">{this.props.info.notes}</div>
                                   )}
                              </div>
                         </div>
                         <div className="pb-4 px-4">
                              <Row>
                                   <Col md={6}>
                                        <Button variant="primary" className="d-block w-100" onClick={GenerateInvoice}>
                                             <BiPaperPlane
                                                  style={{ width: '15px', height: '15px', marginTop: '-3px' }}
                                                  className="me-2"
                                             />
                                             Send Invoice
                                        </Button>
                                   </Col>
                                   <Col md={6}>
                                        <Button
                                             variant="outline-primary"
                                             className="d-block w-100 mt-3 mt-md-0"
                                             onClick={GenerateInvoice}
                                        >
                                             <BiCloudDownload
                                                  style={{ width: '16px', height: '16px', marginTop: '-3px' }}
                                                  className="me-2"
                                             />
                                             Download Copy
                                        </Button>
                                   </Col>
                              </Row>
                         </div>
                    </Modal>
                    <hr className="mt-4 mb-3" />
               </div>
          );
     }
}

export default ModalTransactionStaffPrintReceipt;
