import React, { Component } from 'react';
import { connect } from 'react-redux';
import { options } from '../../../utils/constant';
import { Modal } from 'reactstrap';
import Select from 'react-select';
import { GiCancel } from 'react-icons/gi';
import toast from 'react-hot-toast';
import * as services from '../../../services/index';
class ModalTransactionAddNewStaff extends Component {
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
     // onchange select type
     handleChangeSelectType = (selectedType) => {
          this.setState({ selectedType });
     };
     // onchange select Payment
     handleChangeSelectPayment = (selectedPayment) => {
          this.setState({
               selectedPayment,
          });
     };
     // Handle on change input
     handleOnchangeInput = (event, id) => {
          let copyState = this.state;
          copyState[id] = event.target.value;
          this.setState({
               ...copyState,
          });
     };
     // Check full fill input
     checkInputValid = () => {
          let data = [
               's_name',
               'r_name',
               's_phone',
               'cost',
               'weight',
               'r_address',
               's_address',
               'r_phone',
               'selectedPayment',
               'selectedType',
          ];
          for (let i = 0; i < data.length; i++) {
               if (!this.state[data[i]]) {
                    return false;
               }
          }
          return true;
     };
     // close modal
     handleCloseModal = () => {
          this.props.isCloseModal();
     };
     // Record parcel
     handleTransactionCreateNewStaff = async () => {
          let checkInputValid = this.checkInputValid();
          let {
               s_name,
               r_name,
               s_phone,

               cost,
               weight,

               r_address,
               s_address,
               r_phone,
               selectedPayment,
               selectedType,
          } = this.state;
          let data = {
               s_name: s_name,
               r_name: r_name,
               s_phone: s_phone,
               payment_status: selectedPayment.value,
               cost: cost,
               weight: weight,
               type: selectedType.value,
               r_address: r_address,
               s_address: s_address,
               r_phone: r_phone,
               s_zip_code: 'T00001',
          };
          console.log(data);
          if (checkInputValid) {
               let res = await services.handleCreateNewParcel(data);
               if (res && res.errorCode === 0) {
                    toast.success('Record parcel success!');
                    // this.props.getTransactionStaffById();
                    this.props.isCloseModal();
                    this.setState({
                         s_name: '',
                         r_name: '',
                         s_phone: '',
                         payment_status: '',
                         cost: '',
                         weight: '',
                         type: '',
                         r_address: '',
                         s_address: '',
                         r_phone: '',
                    });
               } else {
                    toast.error('Record Parcel Failed!');
               }
          } else {
               toast.error('Please full fill your form!');
          }
     };

     // edit staff
     // handleTransactionEditStaff = async () => {
     //      let { password, phone, selectTransaction, userName } = this.state;
     //      let data = {
     //           username: userName,
     //           staff_id: this.props.dataEditStaff.staff_id,
     //           password: password,
     //           phone: phone.toString(),
     //           transaction_zip_code: selectTransaction.value,
     //           collection_zip_code: null,
     //      };
     //      console.log('check data :', data);
     //      if (data.staff_id && data.password && data.phone && data.transaction_zip_code) {
     //           let res = await editTransactionStaff(data);
     //           if (res && res.errorCode === 0) {
     //                toast.success(res.message);
     //                this.props.getTransactionStaffById();
     //                this.props.isCloseModal();
     //           }
     //      }
     // };
     // chose between function create or edit
     // handleChoseBetweenCreateOrUpdate = () => {
     //      if (this.props.isEditStaff) {
     //           this.handleTransactionEditStaff();
     //      } else {
     //           this.handleTransactionCreateNewStaff();
     //      }
     // };
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
                                        onClick={() => this.handleTransactionCreateNewStaff()}
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
          arrTransactions: state.admin.arrTransactions,
          dataEditStaff: state.adminTransaction.dataEditStaff,
          isEditStaff: state.adminTransaction.isEditStaff,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          // getAllTransactions: () => dispatch(actions.getAllTransactionsAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalTransactionAddNewStaff);
