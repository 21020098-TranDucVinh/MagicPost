import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload } from 'react-icons/bi';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';
import * as services from '../../../services/index';
import toast from 'react-hot-toast';
import CommonUtils from '../../../utils/CommonUtils';

class ModalColStaffReviewSendOrderToCol extends React.Component {
     constructor(props) {
          super(props);
          this.state = {};
     }
     buildListParcelIds = (parcels) => {
          let listId = [];
          if (parcels && parcels.length > 0) {
               for (let i = 0; i < parcels.length; i++) {
                    listId.push(parcels[i]?.parcel_id);
               }
          }
          return listId;
     };
     handleSendParcelsToCollection = async () => {
          // alert('OK');

          let { userInfo, arrParcelsToSendCol, info } = this.props;
          let accessToken = userInfo.token;
          try {
               let listIdParcels = this.buildListParcelIds(arrParcelsToSendCol);
               let body = {
                    staff_id: userInfo.staff_id,
                    s_zip_code: userInfo.zip_code,
                    r_zip_code: info.r_colInfo.zip_code,
                    list_parcel_id: listIdParcels,
                    shipper_name: info.shipperName,
                    shipper_phone: info.shipperPhone,
               };
               console.log('check body : ', body);
               let res = await services.handleSendParcelsToCol(body, accessToken);
               if (res && res.errorCode === 0) {
                    this.props.closeModal();
                    toast.success(res.msg);
                    // CommonUtils.GenerateInvoice();
               } else {
                    toast.error(res.msg);
               }
          } catch (e) {
               console.log(e);
          }
     };
     render() {
          let { arrParcelsToSendCol, r_colInfo, s_colInfo } = this.props;
          console.log('s_colInfo: ', s_colInfo);
          console.log('r_colInfo: ', r_colInfo);
          return (
               <div className="modal-order-container">
                    <Modal show={this.props.showModal} onHide={this.props.closeModal} size="xl" centered>
                         <div id="invoiceCapture">
                              <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
                                   <div className="text-end ms-4">
                                        <div className="order-logo"></div>
                                        <h6 className="fw-bold text-secondary mb-1">
                                             Order #: {this.props.info.invoiceNumber || ''}
                                        </h6>
                                   </div>
                                   <div className="text-end ms-4">
                                        <h6 className="fw-bold mt-1 mb-2">Date:</h6>
                                        <h5 className="fw-bold text-secondary">{new Date().toLocaleDateString()}</h5>
                                   </div>
                              </div>
                              <div className="p-4">
                                   <Row className="mb-4">
                                        <Col md={6}>
                                             <div className="fw-bold">Billed From:</div>
                                             <div>
                                                  Name:
                                                  <span className="font-weight-bold px-2">{s_colInfo.name || ''}</span>
                                             </div>
                                             <div>
                                                  Address:
                                                  <span className="font-weight-bold px-2">
                                                       {s_colInfo.address || ''}
                                                  </span>
                                             </div>
                                             <div>
                                                  Phone:
                                                  <span className="font-weight-bold px-2">
                                                       {s_colInfo?.admin?.phone || ''}
                                                  </span>
                                             </div>
                                        </Col>
                                        <Col md={6}>
                                             <div className="fw-bold">Billed to Collection:</div>
                                             <div>
                                                  Name:
                                                  <span className="font-weight-bold px-2">{r_colInfo.name || ''}</span>
                                             </div>
                                             <div>
                                                  Address:
                                                  <span className="font-weight-bold px-2">
                                                       {r_colInfo.address || ''}
                                                  </span>
                                             </div>
                                             <div>
                                                  Phone:
                                                  <span className="font-weight-bold px-2">
                                                       {r_colInfo?.admin?.phone || ''}
                                                  </span>
                                             </div>
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
                                                  {arrParcelsToSendCol &&
                                                       arrParcelsToSendCol.length > 0 &&
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
                                                                 <TableCell align="right">{row.s_address}</TableCell>
                                                                 <TableCell align="right">{row.r_name}</TableCell>
                                                                 <TableCell align="right">{row.r_phone}</TableCell>
                                                                 <TableCell align="right">{row.r_address}</TableCell>
                                                                 <TableCell align="right">{row.s_zip_code}</TableCell>
                                                                 <TableCell align="right">{row.r_zip_code}</TableCell>
                                                                 <TableCell align="right">{row.cost}</TableCell>
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
                                        <Button
                                             variant="primary"
                                             className="d-block w-100"
                                             onClick={() => this.handleSendParcelsToCollection()}
                                        >
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
                                             onClick={CommonUtils.GenerateInvoice}
                                        >
                                             <BiCloudDownload
                                                  style={{ width: '16px', height: '16px', marginTop: '-3px' }}
                                                  className="me-2"
                                             />
                                             Download
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

const mapStateToProps = (state) => {
     return {
          arrParcelsToSendCol: state.staffTransaction.arrParcelsToSendCol,
          userInfo: state.user.userInfo,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          // getAllTransactions: () => dispatch(actions.getAllTransactionsAction()),
          // getAllCollections: () => dispatch(actions.getAllCollectionsAction()),
          // clearParcelsToSendCol: () => dispatch(actions.clearParcelsToSendColAction()),
     };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalColStaffReviewSendOrderToCol);
