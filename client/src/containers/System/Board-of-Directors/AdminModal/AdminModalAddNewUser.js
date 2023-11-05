import React, { Component } from 'react';
import { connect } from 'react-redux';
import './commonSsssModal.scss';
import { Modal } from 'reactstrap';
import Select from 'react-select';
import 'flatpickr/dist/themes/material_green.css';
import { toast } from 'react-toastify';
import { handleCreateNewAccountAdmin } from '../../../../services/userService';
class AdminModalAddNewUser extends Component {
     constructor(props) {
          super(props);
          this.state = {
               userName: '',
               phone: '',
               password: '',
               rePassword: '',
               selectedRole: '',
               roles: [
                    { value: 'adminCollection', label: 'Trưởng điểm tập kết' },
                    { value: 'adminTransition', label: 'Trưởng điểm giao dịch' },
               ],
          };
     }
     componentDidMount() {}
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
          let data = ['userName', 'phone', 'password', 'selectedRole'];
          for (let i = 0; i < data.length; i++) {
               if (!this.state[data[i]]) {
                    toast.error('Please enter all the necessary information.');
                    return false;
                    break;
               }
          }
          return true;
     };
     handleCreateNewAccountAdminTransitionOrCollection = async () => {
          let res = '';
          let data = {
               userName: this.state.userName,
               phone: this.state.phone,
               password: this.state.password,
               role: this.state.selectedRole.value,
          };
          let checkPasswordValid = this.checkInputPasswordValid(this.state.password, this.state.rePassword);
          let checkInputValid = this.checkInputValid();
          if (checkPasswordValid && checkInputValid) {
               res = await handleCreateNewAccountAdmin(data);
          } else {
               toast.error('Re-enter a matching password.');
          }
          if (res && res.errCode === 0) {
               toast.success('Account creation successful.');
          } else if (res && res.errCode !== 0) {
               toast.success('Account creation failed.');
          }
     };
     render() {
          let { isOpen, isCloseModal } = this.props;
          return (
               <>
                    <Modal className="modal-admin-container" isOpen={isOpen} size="lg" centered>
                         <div className="modal-admin-content">
                              <div className="modal-admin-header">
                                   <span className="left">Thêm người dùng mới</span>
                                   <span className="right" onClick={isCloseModal}>
                                        <i className="fa fa-times"></i>
                                   </span>
                              </div>
                              <div className="modal-admin-body">
                                   <div className="row">
                                        <div className="col-12 form-group">
                                             <label>Họ tên</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.userName}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'userName')}
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Số điện thoại</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.phone}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'phone')}
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Mật khẩu</label>
                                             <input
                                                  type="password"
                                                  className="form-control"
                                                  value={this.state.password}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                             ></input>
                                        </div>

                                        <div className="col-6 form-group">
                                             <label>Vai trò</label>
                                             <Select
                                                  options={this.state.roles}
                                                  value={this.state.selectedRole}
                                                  onChange={this.handleOnchangeSelectRole}
                                             />
                                        </div>
                                        <div className="col-6 form-group">
                                             <label> Nhập lại Mật khẩu</label>
                                             <input
                                                  type="password"
                                                  className="form-control"
                                                  value={this.state.rePassword}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'rePassword')}
                                             ></input>
                                        </div>
                                   </div>
                              </div>
                              <div className="modal-admin-footer">
                                   <button
                                        className="btn-add-new-user-confirm"
                                        onClick={() => this.handleCreateNewAccountAdminTransitionOrCollection()}
                                   >
                                        Tạo
                                   </button>
                                   <button className="btn-add-new-user-cancel" onClick={isCloseModal}>
                                        Hủy
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
          language: state.app.language,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          // userDefaultClassSuccess: (userInfo) => dispatch(actions.userDefaultClassSuccess(userInfo)),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminModalAddNewUser);
