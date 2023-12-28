import React, { Component } from 'react';
import { connect } from 'react-redux';
import './commonSsssModal.scss';
import { Modal } from 'reactstrap';
import * as actions from '../../../../store/actions/index';
import toast from 'react-hot-toast';
import { handleCreateNewPotentialAdmin, editUserPending } from '../../../../services/adminService';
import { IoEyeOff } from 'react-icons/io5';
import { IoEye } from 'react-icons/io5';
import { GiCancel } from 'react-icons/gi';
class AdminModalAddNewUser extends Component {
     constructor(props) {
          super(props);
          this.state = {
               userId: '',
               userName: '',
               phone: '',
               password: '',
               rePassword: '',
               isEditUser: false,
               editUser: '',
               isShowPassword: false,
               isShowRepassword: false,
          };
     }
     async componentDidMount() {}
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.arrAdminsPending !== this.props.arrAdminsPending) {
               this.setState({
                    arrAdminsPending: this.props.arrAdminsPending,
               });
          }
          if (prevProps.dataEditAdminPending !== this.props.dataEditAdminPending) {
               let data = this.props.dataEditAdminPending;
               this.setState({
                    userName: data.username,
                    phone: data.phone,
                    password: data.password,
                    rePassword: data.password,
                    isEditUser: true,
                    userId: data.id,
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
     // Create new potential admin
     handleCreatePotentialAdmin = async () => {
          try {
               let checkInputValid = this.checkInputValid();
               let checkInputPasswordValid = this.checkInputPasswordValid(this.state.password, this.state.rePassword);
               let data = {
                    username: this.state.userName,
                    password: this.state.password,
                    phone: this.state.phone,
               };
               let token = this.props.userInfo.token;
               if (checkInputValid && checkInputPasswordValid) {
                    let res = await handleCreateNewPotentialAdmin(data, {
                         headers: { Authorization: `Bearer ${token}` },
                    });
                    console.log('check res: ', res);
                    if (res && res.errorCode === 0) {
                         this.setState({
                              userName: '',
                              phone: '',
                              password: '',
                              rePassword: '',
                         });
                         toast.success(res.msg);
                         this.props.isCloseModal();
                         this.props.getAllUserPending(this.props.userInfo.token);
                    }
               } else {
                    toast.error('Your input invalid');
               }
          } catch (e) {
               console.log(e);
          }
     };
     // Update potential admin
     handleUpdatePotentialAdmin = async () => {
          // let checkInputValid = this.checkInputValid();
          // let checkInputPasswordValid = this.checkInputPasswordValid(this.state.password, this.state.rePassword);
          let data = {
               id: this.state.userId,
               username: this.state.userName,
               password: this.state.password,
               phone: this.state.phone,
          };
          // console.log('check data : ', data);
          // console.log('check valid input ', checkInputValid, checkInputPasswordValid);
          let res = await editUserPending(data);
          if (res && res.errorCode === 0) {
               await this.props.updateUser(data);
               toast.success('Update user success!');
          } else {
               toast.error(res.msg);
          }
          if (this.props.isEditUserSuccess === true) {
               this.setState({
                    userName: '',
                    phone: '',
                    password: '',
                    rePassword: '',
                    isEditUser: false,
               });
               this.props.isCloseModal();
               this.props.getAllUserPending(this.props.userInfo.token);
          }
     };
     // Onclick chose between create or update
     handleOnClick = () => {
          if (this.props.isEditPendingAdmin) {
               this.handleUpdatePotentialAdmin();
          } else {
               this.handleCreatePotentialAdmin();
          }
     };
     // Close modal
     handleCloseModal = () => {
          this.props.isCloseModal();
          this.props.isNotEditAdminPending();
          this.props.clearDataEditPendingAdmin();
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
          let { isOpen, isEditPendingAdmin, isEditStaff } = this.props;
          let { isShowPassword, isShowRepassword } = this.state;
          return (
               <>
                    <Modal className="modal-admin-container" isOpen={isOpen} size="lg" centered>
                         <div className="modal-admin-content">
                              <div className="modal-admin-header">
                                   <span className="left">Add new potential admin </span>
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
                                        // className="btn-add-new-user-confirm btn-edit-user"
                                        className={isEditPendingAdmin === true ? 'btn btn-warning' : 'btn btn-primary'}
                                        onClick={() => this.handleOnClick()}
                                   >
                                        <span>
                                             {isEditPendingAdmin === true && 'Save'}
                                             {isEditPendingAdmin === false && 'Create'}
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
          arrAdminsPending: state.admin.arrAdminsPending,
          isEditUserSuccess: state.admin.isEditUserSuccess,
          dataEditAdminPending: state.admin.dataEditAdminPending,
          isEditPendingAdmin: state.admin.isEditPendingAdmin,
          userInfo: state.user.userInfo,
          isEditStaff: state.adminTransaction.isEditStaff,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllUserPending: (token) => dispatch(actions.getAllUserPendingAction(token)),
          updateUser: (data) => dispatch(actions.updateUserAction(data)),
          isNotEditAdminPending: () => dispatch(actions.isNotEditAdminPendingAction()),
          clearDataEditPendingAdmin: () => dispatch(actions.clearDataEditPendingAdminAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminModalAddNewUser);
