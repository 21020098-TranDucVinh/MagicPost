import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiCloudDownload } from 'react-icons/bi';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';
import CommonUtils from '../../../utils/CommonUtils';
import { GiConfirmed } from 'react-icons/gi';
import * as actions from '../../../store/actions/index';
import * as services from '../../../services/index';
class ModalColStaffReviewReceivedOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      totalOrderVal: 0,
    };
  }
  handleGetParcelIdList = (parcels) => {
    let list = [];
    if (parcels && parcels.length > 0) {
      for (let i = 0; i < parcels.length; i++) {
        list.push(parcels[i].trackID);
      }
    }
    return list;
  };
  handleConfirmOrder = async () => {
    try {
      const { parcelList, userInfo } = this.props;
      let idList = this.handleGetParcelIdList(parcelList);
      const accessToken = userInfo.token;
      // console.log('check list id : ', idList);
      let data = {
        last_staff_id_update: userInfo.staff_id,
        list_tracking_id: idList,
        zip_code: userInfo.zip_code,
      };
      let res = await services.colStaffConfirmReceiveOrder(data, accessToken);
      if (res && res.errorCode === 0) {
        toast.success(res.msg);
        this.props.getParcelsFromTranAnotherNode();
        this.props.closeModal();
      }
    } catch (e) {
      toast.error('Errors!');
      console.log(e);
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.parcelList !== this.props.parcelList) {
      this.handleCalTotalOrderVal();
    }
  }
  handleCalTotalOrderVal = () => {
    let total = 0;
    let { parcelList } = this.props;
    if (parcelList && parcelList.length > 0) {
      for (let i = 0; i < parcelList.length; i++) {
        total += parcelList[i].parcel.cost;
      }
    }
    this.setState({
      totalOrderVal: total,
    });
  };
  render() {
    let { parcelList } = this.props;
    console.log('parcelList : ', parcelList);
    return (
      <div>
        <Modal show={this.props.showModal} onHide={this.props.closeModal} size="xl" centered>
          <div id="invoiceCapture">
            <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
              <div className="text-end ms-4">
                {/* <h6 className="fw-bold mt-1 mb-2">Amount&nbsp;Due:</h6> */}
                <h5 className="fw-bold text-secondary">Order details </h5>
              </div>
            </div>
            <div className="p-4">
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell align="right">Sender Name</TableCell>
                      <TableCell align="right">Sender Phone</TableCell>
                      <TableCell align="right">sender Address</TableCell>
                      <TableCell align="right">Receiver Name</TableCell>
                      <TableCell align="right">Receiver Phone</TableCell>
                      <TableCell align="right">Receiver Address</TableCell>
                      <TableCell align="right">From</TableCell>
                      <TableCell align="right">Cost($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {parcelList &&
                      parcelList.length > 0 &&
                      parcelList.map((row, index) => (
                        <TableRow
                          key={index}
                          sx={{
                            '&:last-child td, &:last-child th': {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell align="right">{index + 1}</TableCell>
                          <TableCell align="right">{row.parcel.s_name}</TableCell>
                          <TableCell align="right">{row.parcel.s_phone}</TableCell>
                          <TableCell align="right">{row.parcel.s_address}</TableCell>
                          <TableCell align="right">{row.parcel.r_name}</TableCell>
                          <TableCell align="right">{row.parcel.r_phone}</TableCell>
                          <TableCell align="right">{row.parcel.r_address}</TableCell>
                          <TableCell align="right">{row.parcel.s_zip_code}</TableCell>
                          <TableCell align="right">{row.parcel.cost}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Table>
                <tbody>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                  <tr className="text-end">
                    <td className="fw-bold" style={{ width: '100px' }}>
                      Order value: $ {this.state.totalOrderVal}
                    </td>
                  </tr>
                  <tr>
                    <td>&nbsp;</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className="pb-4 px-4">
            <Row>
              <Col md={6}>
                <Button variant="primary" className="d-block w-100" onClick={() => this.handleConfirmOrder()}>
                  <GiConfirmed style={{ width: '15px', height: '15px', marginTop: '-3px' }} className="me-2" />
                  Confirm Order
                </Button>
              </Col>
              <Col md={6}>
                <Button
                  variant="outline-primary"
                  className="d-block w-100 mt-3 mt-md-0"
                  onClick={CommonUtils.GenerateInvoice}
                >
                  <BiCloudDownload style={{ width: '16px', height: '16px', marginTop: '-3px' }} className="me-2" />
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
    getParcelsFromTranAnotherNode: (col_zip_code, accessToken) =>
      dispatch(actions.getParcelsFromTranAnotherNodeAction(col_zip_code, accessToken)),
    // getAllTransactions: () => dispatch(actions.getAllTransactionsAction()),
    // getAllCollections: () => dispatch(actions.getAllCollectionsAction()),
    // clearParcelsToSendCol: () => dispatch(actions.clearParcelsToSendColAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalColStaffReviewReceivedOrder);
