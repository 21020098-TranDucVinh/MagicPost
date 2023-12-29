import React, { Component } from 'react';
import { connect } from 'react-redux';
import { options } from '../../../utils/constant';
import { Modal } from 'reactstrap';
import { GiCancel } from 'react-icons/gi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import toast from 'react-hot-toast';
import * as services from '../../../services/index';
import * as actions from '../../../store/actions/index';
import { styled } from '@mui/material/styles';
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

class ModalSendParcelToReceiver extends Component {
     constructor(props) {
          super(props);
          this.state = {
               shipperName: '',
               shipperPhone: '',
          };
     }
     async componentDidMount() {}
     componentDidUpdate(prevProps, prevState, snapshot) {
          // if (prevProps.arrTransactions !== this.props.arrTransactions) {
          //      this.setState({
          //           optionSelectionTransactions: this.buildOptionSelectTransactions(this.props.arrTransactions),
          //      });
          // }
     }
     getListParcelId = (parcels) => {
          let res = [];
          if (parcels && parcels.length > 0) {
               for (let i = 0; i < parcels.length; i++) {
                    res.push(parcels[i].parcel_id);
               }
          }
          return res;
     };
     handleOnchangeInput = (event, id) => {
          let copyState = this.state;
          copyState[id] = event.target.value;
          this.setState({
               ...copyState,
          });
     };
     handleSendParcelToReceiver = async () => {
          const { userInfo } = this.props;
          try {
               let parcelIdList = this.getListParcelId(this.props.parcelListToReceiver);
               let data = {
                    list_parcel_id: parcelIdList,
                    last_shipper_name: this.state.shipperName,
                    last_shipper_phone: this.state.shipperPhone,
               };
               let res = await services.handleSendParcelsToReceiver(data, userInfo.token);
               if (res && res.errorCode === 0) {
                    this.setState({
                         shipperName: '',
                         shipperPhone: '',
                    });
                    this.props.getALlReceivedParcels(userInfo.zip_code, userInfo.token);
                    this.props.isCloseModal();
                    toast.success(res.msg);
               } else {
                    toast.error(res.msg);
               }
          } catch (e) {
               console.log(e);
          }
     };
     render() {
          let { isOpen, isEditStaff, parcelListToReceiver } = this.props;
          console.log('parcelListToReceiver : ', parcelListToReceiver);
          return (
               <>
                    <Modal className="modal-admin-container" isOpen={isOpen} size="xl" centered>
                         <div className="modal-admin-content">
                              <div className="modal-admin-header">
                                   <span className="left">Record Parcel </span>
                                   <span className="right" onClick={() => this.props.isCloseModal()}>
                                        <GiCancel />
                                   </span>
                              </div>
                              <div className="modal-admin-body">
                                   <div className="row">
                                        <div className="col-6 form-group">
                                             <label>Shipper name: </label>
                                             <TextField
                                                  id="standard-basic"
                                                  label="Name"
                                                  variant="standard"
                                                  onChange={(event) => this.handleOnchangeInput(event, 'shipperName')}
                                             />
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Shipper phone:</label>
                                             <TextField
                                                  id="standard-basic"
                                                  label="Phone"
                                                  variant="standard"
                                                  onChange={(event) => this.handleOnchangeInput(event, 'shipperPhone')}
                                             />
                                        </div>
                                        <TableContainer component={Paper}>
                                             <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                                  <TableHead>
                                                       <TableRow>
                                                            <StyledTableCell>#</StyledTableCell>
                                                            <StyledTableCell>Sender name</StyledTableCell>
                                                            <StyledTableCell>Sender phone</StyledTableCell>
                                                            <StyledTableCell>Receiver name</StyledTableCell>
                                                            <StyledTableCell>Receiver phone</StyledTableCell>
                                                            <StyledTableCell>Type</StyledTableCell>
                                                            <StyledTableCell>Cost</StyledTableCell>
                                                            <StyledTableCell>Weight</StyledTableCell>
                                                       </TableRow>
                                                  </TableHead>
                                                  <TableBody>
                                                       {parcelListToReceiver &&
                                                            parcelListToReceiver.length > 0 &&
                                                            parcelListToReceiver.map((row, index) => (
                                                                 <StyledTableRow key={index}>
                                                                      <StyledTableCell component="th" scope="row">
                                                                           {index + 1}
                                                                      </StyledTableCell>
                                                                      <StyledTableCell component="th" scope="row">
                                                                           {row.s_name}
                                                                      </StyledTableCell>
                                                                      <StyledTableCell component="th" scope="row">
                                                                           {row.s_phone}
                                                                      </StyledTableCell>
                                                                      <StyledTableCell component="th" scope="row">
                                                                           {row.r_name}
                                                                      </StyledTableCell>
                                                                      <StyledTableCell component="th" scope="row">
                                                                           {row.r_phone}
                                                                      </StyledTableCell>
                                                                      <StyledTableCell align="left">
                                                                           {row.type}
                                                                      </StyledTableCell>
                                                                      <StyledTableCell align="left">
                                                                           {row.cost}
                                                                      </StyledTableCell>
                                                                      <StyledTableCell align="left">
                                                                           {row.weight}
                                                                      </StyledTableCell>
                                                                 </StyledTableRow>
                                                            ))}
                                                  </TableBody>
                                             </Table>
                                        </TableContainer>
                                   </div>
                              </div>
                              <div className="modal-admin-footer">
                                   <button
                                        className={'btn btn-primary'}
                                        onClick={() => this.handleSendParcelToReceiver()}
                                   >
                                        Send
                                   </button>
                                   <button className="btn btn-danger" onClick={() => this.props.isCloseModal()}>
                                        Cancel
                                   </button>
                              </div>
                         </div>
                    </Modal>
               </>
          );
     }
}

const mapStateToProps = (state) => {
     return {
          userInfo: state.user.userInfo,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getALlReceivedParcels: (zip_code, accessToken) =>
               dispatch(actions.getALlReceivedParcels(zip_code, accessToken)),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalSendParcelToReceiver);
