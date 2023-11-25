import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Modal } from 'reactstrap';
import Select from 'react-select';
import 'flatpickr/dist/themes/material_green.css';
import * as actions from '../../../../store/actions/index';
import { toast } from 'react-toastify';
import axios from 'axios';
import { handleTransactionCreateNewStaff } from '../../../../services/TransactionService';

class ModalTransactionAddNewStaff extends Component {
     constructor(props) {
          super(props);
          this.state = {
               userName: '',
               phone: '',
               password: '',
               rePassword: '',
               zip_code: '',
               address: '',
               optionSelectionTransactions: [],
               selectTransaction: '',
          };
     }
     async componentDidMount() {
          this.props.getAllTransactions();
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.arrTransactions !== this.props.arrTransactions) {
               this.setState({
                    optionSelectionTransactions: this.buildOptionSelectTransactions(this.props.arrTransactions),
               });
          }
     }
     //build option select collection
     buildOptionSelectTransactions = (collections) => {
          let optionTransactions = '';
          if (collections && collections.length > 0) {
               optionTransactions = collections.map((item, index) => {
                    let obj = {};
                    obj.value = item.zip_code;
                    obj.label = item.name;
                    return obj;
               });
          }
          console.log(optionTransactions);
          return optionTransactions;
     };
     handleChangeTransaction = (selectTransaction) => {
          this.setState({ selectTransaction });
     };
     // Handle on change input
     handleOnchangeInput = (event, id) => {
          let copyState = this.state;
          copyState[id] = event.target.value;
          this.setState({
               ...copyState,
          });
     };
     // Check password and re-enter password equals
     checkInputPasswordValid = (password, rePassword) => {
          if (password !== rePassword) {
               return false;
          }
          return true;
     };
     // Check full fill input
     checkInputValid = () => {
          let data = ['userName', 'phone', 'password'];
          for (let i = 0; i < data.length; i++) {
               if (!this.state[data[i]]) {
                    return false;
               }
          }
          return true;
     };
     handleTransactionCreateNewStaff = async () => {
          let checkInputValid = this.checkInputValid();
          let checkInputPasswordValid = this.checkInputPasswordValid();
          let data = {
               username: this.state.userName,
               phone: this.state.phone,
               password: this.state.password,
               zip_code: this.state.selectTransaction.value,
          };
          console.log(data);
          if (checkInputValid && checkInputPasswordValid) {
               let res = await handleTransactionCreateNewStaff(data);
               if (res && res.errorCode === 0) {
                    toast.success(res.message);
                    this.props.isCloseModal();
                    this.setState({
                         userName: '',
                         phone: '',
                         password: '',
                         rePassword: '',
                         zip_code: '',
                         address: '',
                    });
               } else {
                    toast('Create new staff Failed!');
               }
          }
     };
     handleCloseModal = () => {
          this.props.isCloseModal();
     };
     render() {
          let { isOpen } = this.props;
          let { optionSelectionTransactions, selectTransaction } = this.state;
          return (
               <>
                    <Modal className="modal-admin-container" isOpen={isOpen} size="lg" centered>
                         <div className="modal-admin-content">
                              <div className="modal-admin-header">
                                   <span className="left">Add new staff </span>
                                   <span className="right" onClick={() => this.handleCloseModal()}>
                                        <i className="fa fa-times"></i>
                                   </span>
                              </div>
                              <div className="modal-admin-body">
                                   <div className="row">
                                        <div className="col-6 form-group">
                                             <label>Chose transaction</label>
                                             <Select
                                                  value={selectTransaction}
                                                  placeholder={<div>Your Manager</div>}
                                                  onChange={this.handleChangeTransaction}
                                                  options={optionSelectionTransactions}
                                             />
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>User Name</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.userName}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'userName')}
                                                  placeholder="Your Name"
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Phone</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.address}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                                  placeholder="Your Phone"
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Address</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.phone}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'phone')}
                                                  placeholder="Your Phone"
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Password</label>
                                             <input
                                                  type="password"
                                                  className="form-control"
                                                  value={this.state.password}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                                  placeholder="Your Password"
                                             ></input>
                                        </div>

                                        <div className="col-6 form-group">
                                             <label>Re-enter password</label>
                                             <input
                                                  type="password"
                                                  className="form-control"
                                                  value={this.state.rePassword}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'rePassword')}
                                                  placeholder="Your Password"
                                             ></input>
                                        </div>
                                   </div>
                              </div>
                              <div className="modal-admin-footer">
                                   <button
                                        className={'btn btn-primary'}
                                        onClick={() => this.handleTransactionCreateNewStaff()}
                                   >
                                        {/* <span>
                                             {isEditPendingAdmin === true && 'Save'}
                                             {isEditPendingAdmin === false && 'Create'}
                                        </span> */}
                                        create
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
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllTransactions: () => dispatch(actions.getAllTransactionsAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalTransactionAddNewStaff);
