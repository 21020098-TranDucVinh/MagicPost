import React, { Component } from 'react';
import { connect } from 'react-redux';
import './commonSsssModal.scss';
import { Modal } from 'reactstrap';
import Select from 'react-select';
import 'flatpickr/dist/themes/material_green.css';
import * as actions from '../../../../store/actions/index';
import { toast } from 'react-toastify';
import { handleCreateNewPotentialAdmin, editUserPending } from '../../../../services/adminService';

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
          };
     }
     async componentDidMount() {}
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.arrUsersPending !== this.props.arrUsersPending) {
               this.setState({
                    arrUsersPending: this.props.arrUsersPending,
               });
          }
          if (prevProps.userEdit !== this.props.userEdit) {
               let data = this.props.userEdit;
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
     handleOnchangeInput = (event, id) => {
          let copyState = this.state;
          copyState[id] = event.target.value;
          this.setState({
               ...copyState,
          });
     };
     handleOnchangeSelectRole = (selectedRole) => {
          this.setState({
               selectedRole: selectedRole,
          });
     };
     checkInputPasswordValid = (password, rePassword) => {
          if (password !== rePassword) {
               return false;
          }
          return true;
     };
     checkInputValid = () => {
          let data = ['userName', 'phone', 'password'];
          for (let i = 0; i < data.length; i++) {
               if (!this.state[data[i]]) {
                    return false;
                    break;
               }
          }
          return true;
     };
     handleCreatePotentialAdmin = async () => {
          let checkInputValid = this.checkInputValid();
          let checkInputPasswordValid = this.checkInputPasswordValid(this.state.password, this.state.rePassword);
          let data = {
               username: this.state.userName,
               password: this.state.password,
               phone: this.state.phone,
          };
          if (checkInputValid && checkInputPasswordValid) {
               // this.props.createNewUser(data);
               let res = await handleCreateNewPotentialAdmin(data);
               if (res && res.errorCode === 0) {
                    this.setState({
                         userName: '',
                         phone: '',
                         password: '',
                         rePassword: '',
                    });
                    toast.success(res.msg);
                    this.props.isCloseModal();
                    this.props.getAllUserPending();
               }
          } else {
               toast.error('Your input invalid');
          }
     };

     handleUpdatePotentialAdmin = async () => {
          let checkInputValid = this.checkInputValid();
          let checkInputPasswordValid = this.checkInputPasswordValid(this.state.password, this.state.rePassword);
          let data = {
               id: this.state.userId,
               username: this.state.userName,
               password: this.state.password,
               phone: this.state.phone,
          };
          let res = '';
          if (checkInputValid && checkInputPasswordValid) {
               res = await editUserPending(data);
               if (res && res.errorCode === 0) {
                    await this.props.updateUser(data);
                    toast.success('Update user success!');
               } else {
                    toast.error(res.message);
               }
          } else {
               toast.error('Your input invalid');
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
               this.props.getAllUserPending();
          }
     };
     handleOnClick = () => {
          if (this.state.isEditUser) {
               this.handleUpdatePotentialAdmin();
          } else {
               this.handleCreatePotentialAdmin();
          }
     };
     handleCloseModal = () => {
          this.props.isCloseModal();
          this.setState({
               userId: '',
               userName: '',
               phone: '',
               password: '',
               rePassword: '',
               isEditUser: false,
          });
     };
     render() {
          let { isOpen, isCloseModal } = this.props;
          let { isEditUser } = this.state;
          return (
               <>
                    <Modal className="modal-admin-container" isOpen={isOpen} size="lg" centered>
                         <div className="modal-admin-content">
                              <div className="modal-admin-header">
                                   <span className="left">Add new potential admin </span>
                                   <span className="right" onClick={isCloseModal}>
                                        <i className="fa fa-times"></i>
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
                                        // className="btn-add-new-user-confirm btn-edit-user"
                                        className={isEditUser === true ? 'btn-edit-user' : 'btn-add-new-user-confirm'}
                                        onClick={() => this.handleOnClick()}
                                   >
                                        <span>
                                             {isEditUser === true && 'Save'}
                                             {isEditUser === false && 'Create'}
                                        </span>
                                   </button>
                                   <button className="btn-add-new-user-cancel" onClick={() => this.handleCloseModal()}>
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
          arrUsersPending: state.admin.arrUsersPending,
          isEditUserSuccess: state.admin.isEditUserSuccess,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllUserPending: () => dispatch(actions.getAllUserPendingAction()),
          updateUser: (data) => dispatch(actions.updateUserAction(data)),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminModalAddNewUser);