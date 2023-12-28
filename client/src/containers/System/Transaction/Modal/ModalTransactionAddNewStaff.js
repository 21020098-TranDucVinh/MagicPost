import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Modal } from 'reactstrap';
import { IoEyeOff } from 'react-icons/io5';
import { IoEye } from 'react-icons/io5';
import * as actions from '../../../../store/actions/index';
import { handleTransactionCreateNewStaff, editTransactionStaff } from '../../../../services/TransactionService';
import { GiCancel } from 'react-icons/gi';
import toast from 'react-hot-toast';

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
               transaction_zip_code: '',
               accessToken: '',
               isShowPassword: false,
               isShowRepassword: false,
          };
     }
     async componentDidMount() {
          let { userInfo } = this.props;
          this.setState({
               accessToken: userInfo.token,
               transaction_zip_code: this.props.userInfo.zip_code,
          });
          this.props.getAllTransactions();
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.dataEditStaff !== this.props.dataEditStaff) {
               let data = this.props.dataEditStaff;
               this.setState({
                    userName: data.username,
                    phone: data.phone,
                    password: data.password,
                    rePassword: data.password,
               });
          }
     }

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
     // create new transaction staff
     handleTransactionCreateNewStaff = async () => {
          try {
               let checkInputValid = this.checkInputValid();
               let checkInputPasswordValid = this.checkInputPasswordValid();
               let data = {
                    username: this.state.userName,
                    phone: this.state.phone,
                    password: this.state.password,
                    zip_code: this.state.transaction_zip_code,
               };
               if (checkInputValid && checkInputPasswordValid) {
                    let { accessToken } = this.state;
                    let res = await handleTransactionCreateNewStaff(data, {
                         headers: { Authorization: `Bearer ${accessToken}` },
                    });

                    if (res && res.errorCode === 0) {
                         toast.success('Create new staff success!');
                         this.props.getTransactionStaff(this.state.transaction_zip_code, accessToken);
                         this.props.isCloseModal();
                         this.setState({
                              userName: '',
                              phone: '',
                              password: '',
                              rePassword: '',
                              address: '',
                         });
                    } else {
                         toast.error('Create new staff Failed!');
                    }
               }
          } catch (e) {
               console.log(e);
          }
     };
     // close modal
     handleCloseModal = () => {
          this.props.isCloseModal();
     };
     // edit staff
     handleTransactionEditStaff = async () => {
          try {
               let { password, phone, transaction_zip_code, userName, accessToken } = this.state;
               let { dataEditStaff } = this.props;
               let data = {
                    username: userName,
                    staff_id: dataEditStaff.staff_id,
                    password: password,
                    phone: phone.toString(),
                    transaction_zip_code: transaction_zip_code,
                    collection_zip_code: null,
               };
               // console.log('check data :', data);
               if (data.staff_id && data.password && data.phone && data.transaction_zip_code) {
                    let res = await editTransactionStaff(data, { headers: { Authorization: `Bearer ${accessToken}` } });
                    if (res && res.errorCode === 0) {
                         toast.success(res.msg);
                         this.props.isCloseModal();
                         this.props.getTransactionStaff(transaction_zip_code, accessToken);
                    }
               }
          } catch (e) {
               console.log(e);
          }
     };
     // chose between function create or edit
     handleChoseBetweenCreateOrUpdate = () => {
          if (this.props.isEditStaff) {
               this.handleTransactionEditStaff();
          } else {
               this.handleTransactionCreateNewStaff();
          }
     };
     //Turn on or off password
     handleShowPassword = () => {
          this.setState({
               isShowPassword: !this.state.isShowPassword,
          });
     };
     //Turn on or off re-enter password
     handleShowRepassword = () => {
          this.setState({
               isShowRepassword: !this.state.isShowRepassword,
          });
     };
     render() {
          let { isOpen, isEditStaff } = this.props;
          let { isShowPassword, isShowRepassword } = this.state;

          return (
               <>
                    <Modal className="modal-admin-container" isOpen={isOpen} size="lg" centered>
                         <div className="modal-admin-content">
                              <div className="modal-admin-header">
                                   <span className="left">Add new staff </span>
                                   <span className="right" onClick={() => this.handleCloseModal()}>
                                        <GiCancel onClick={this.props.isCloseModal} />
                                   </span>
                              </div>
                              <div className="modal-admin-body">
                                   <div className="row">
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
                                                  value={this.state.phone}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'phone')}
                                                  placeholder="Your Phone"
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Password</label>
                                             <input
                                                  type={isShowPassword ? 'text' : 'password'}
                                                  className="form-control"
                                                  value={this.state.password}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                                  placeholder="Your Password"
                                                  disabled={isEditStaff ? true : false}
                                             />
                                             <span className="btn-showPassword">
                                                  {isShowPassword ? (
                                                       <IoEye onClick={this.handleShowPassword} />
                                                  ) : (
                                                       <IoEyeOff onClick={this.handleShowPassword} />
                                                  )}
                                             </span>
                                        </div>

                                        <div className="col-6 form-group">
                                             <label>Re-enter password</label>
                                             <input
                                                  type={isShowRepassword ? 'text' : 'password'}
                                                  className="form-control"
                                                  value={this.state.rePassword}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'rePassword')}
                                                  placeholder="Your Password"
                                                  disabled={isEditStaff ? true : false}
                                             ></input>
                                             <span className="btn-showPassword">
                                                  {isShowRepassword ? (
                                                       <IoEye onClick={this.handleShowRepassword} />
                                                  ) : (
                                                       <IoEyeOff onClick={this.handleShowRepassword} />
                                                  )}
                                             </span>
                                        </div>
                                   </div>
                              </div>
                              <div className="modal-admin-footer">
                                   <button
                                        className={isEditStaff === true ? 'btn btn-warning px-3' : 'btn btn-primary'}
                                        onClick={() => this.handleChoseBetweenCreateOrUpdate()}
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
          userInfo: state.user.userInfo,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllTransactions: () => dispatch(actions.getAllTransactionsAction()),
          getTransactionStaff: (transaction_zip_code, accessToken) =>
               dispatch(actions.getTransactionStaffByIdAction(transaction_zip_code, accessToken)),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalTransactionAddNewStaff);
