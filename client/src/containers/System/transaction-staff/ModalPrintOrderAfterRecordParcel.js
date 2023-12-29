import React, { Component } from 'react';
import { connect } from 'react-redux';
import { options } from '../../../utils/constant';
import { Modal } from 'reactstrap';
import Select from 'react-select';
import { GiCancel } from 'react-icons/gi';
import toast from 'react-hot-toast';
import * as services from '../../../services/index';
import * as actions from '../../../store/actions/index';
class ModalPrintOrderAfterRecordParcel extends Component {
     constructor(props) {
          super(props);
          this.state = {
               s_name: '',
               r_name: '',
               s_phone: '',
               cost: '',
               weight: '',
               r_address: '',
               s_address: '',
               r_phone: '',
               selectedPayment: '',
               selectedType: '',
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

     render() {
          let { isOpen, isEditStaff } = this.props;
          let { selectedType, selectedPayment } = this.state;
          return (
               <>
                    <Modal className="modal-admin-container" isOpen={isOpen} size="lg" centered>
                         <div className="modal-admin-content">
                              <div className="modal-admin-header">
                                   <span className="left">Record Parcel </span>
                                   <span className="right" onClick={() => this.handleCloseModal()}>
                                        <GiCancel />
                                   </span>
                              </div>
                              <div className="modal-admin-body">
                                   <div className="row">
                                        <div className="col-6 form-group">
                                             <label>Sender Name</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.s_name}
                                                  onChange={(event) => this.handleOnchangeInput(event, 's_name')}
                                                  placeholder="Enter Sender Name"
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Receiver Name</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.r_name}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'r_name')}
                                                  placeholder="Enter Receiver Name"
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Sender Phone</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.s_phone}
                                                  onChange={(event) => this.handleOnchangeInput(event, 's_phone')}
                                                  placeholder="Enter Sender Phone"
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Receiver Phone</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.r_phone}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'r_phone')}
                                                  placeholder="Enter Receiver Phone"
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Sender Address</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.s_address}
                                                  onChange={(event) => this.handleOnchangeInput(event, 's_address')}
                                                  placeholder="Enter Sender address"
                                             ></input>
                                        </div>

                                        <div className="col-6 form-group">
                                             <label>Receiver Address</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.r_address}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'r_address')}
                                                  placeholder="Enter Receiver Address"
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Cost</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.cost}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'cost')}
                                                  placeholder="Enter cost"
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Weight</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.weight}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'weight')}
                                                  placeholder="Enter weight"
                                             ></input>
                                        </div>

                                        <div className="col-6 form-group">
                                             <label>Type</label>
                                             <Select
                                                  value={selectedType}
                                                  placeholder={<div>Type</div>}
                                                  onChange={this.handleChangeSelectType}
                                                  options={options.OptionSelectionType}
                                             />
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Payment Status</label>
                                             <Select
                                                  value={selectedPayment}
                                                  placeholder={<div>Payment status</div>}
                                                  onChange={this.handleChangeSelectPayment}
                                                  options={options.OptionSelectionPayment}
                                             />
                                        </div>
                                   </div>
                              </div>
                              <div className="modal-admin-footer">
                                   <button
                                        className={isEditStaff === true ? 'btn btn-warning px-3' : 'btn btn-primary'}
                                        onClick={() => this.tranStaffCreateParcel()}
                                   >
                                        <span>
                                             {isEditStaff === true && 'Save'}
                                             {isEditStaff === false && 'Create'}
                                        </span>
                                   </button>
                                   <button className="btn btn-danger" onClick={() => this.handleCloseModal()}>
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
          // getAllPendingParcelsEachTransaction: (transactionID, accessToken) =>
          //      dispatch(actions.getAllPendingParcelsBYTransactionIDAction(transactionID, accessToken)),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPrintOrderAfterRecordParcel);
