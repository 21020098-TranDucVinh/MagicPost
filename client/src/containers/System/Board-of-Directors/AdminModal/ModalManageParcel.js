import React, { Component } from 'react';
import { connect } from 'react-redux';
import './commonSsssModal.scss';
import { Modal } from 'reactstrap';
import 'flatpickr/dist/themes/material_green.css';
import { toast } from 'react-toastify';
import { handleCreateNewAccountAdmin } from '../../../../services/userService';
class AdminModalAddNewUser extends Component {
     constructor(props) {
          super(props);
          this.state = {
               status: '',
               weight: '',
               senderName: '',
               senderPhone: '',
               from: '',
               receiverName: '',
               receiverPhone: '',
               toAddress: '',
               type: '',
               senderZipCode: '',
               receiverZipCode: '',
               cost: '',
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

     // handleCreateNewAccountAdminTransitionOrCollection = async () => {
     //      let res = '';
     //      let data = {
     //           userName: this.state.userName,
     //           phone: this.state.phone,
     //           password: this.state.password,
     //           role: this.state.selectedRole.value,
     //      };
     //      let checkPasswordValid = this.checkInputPasswordValid(this.state.password, this.state.rePassword);
     //      let checkInputValid = this.checkInputValid();
     //      if (checkPasswordValid && checkInputValid) {
     //           res = await handleCreateNewAccountAdmin(data);
     //      } else {
     //           toast.error('Nhập lại mật khẩu phù hợp');
     //      }
     //      if (res && res.errCode === 0) {
     //           toast.success('Taọ tài khoản thành công');
     //      } else if (res && res.errCode !== 0) {
     //           toast.success('Taọ tài khoản thất bại');
     //      }
     // };
     adminHandleCreateParcel = () => {
          console.log(this.state);
     };
     render() {
          let { isOpen, isCloseModal } = this.props;
          return (
               <>
                    <Modal className="modal-admin-container" isOpen={isOpen} size="lg" centered>
                         <div className="modal-admin-content">
                              <div className="modal-admin-header">
                                   <span className="left">Thêm bưu kiện</span>
                                   <span className="right" onClick={isCloseModal}>
                                        <i className="fa fa-times"></i>
                                   </span>
                              </div>
                              <div className="modal-admin-body">
                                   <div className="row">
                                        <div className="col-4 form-group">
                                             <label>Sender Name</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.senderName}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'senderName')}
                                             ></input>
                                        </div>

                                        <div className="col-4 form-group">
                                             <label>Sender Phone</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.senderPhone}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'senderPhone')}
                                             ></input>
                                        </div>
                                        <div className="col-4 form-group">
                                             <label>From</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.from}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'from')}
                                             ></input>
                                        </div>
                                        <div className="col-4 form-group">
                                             <label>Receiver Name</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.receiverName}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'receiverName')}
                                             ></input>
                                        </div>
                                        <div className="col-4 form-group">
                                             <label>Phone's Receiver</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.receiverPhone}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'receiverPhone')}
                                             ></input>
                                        </div>
                                        <div className="col-4 form-group">
                                             <label>To</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.toAddress}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'toAddress')}
                                             ></input>
                                        </div>
                                        <div className="col-4 form-group">
                                             <label>Status</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.status}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'status')}
                                             ></input>
                                        </div>
                                        <div className="col-4 form-group">
                                             <label>Weight</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.weight}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'weight')}
                                             ></input>
                                        </div>

                                        <div className="col-4 form-group">
                                             <label>type</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.type}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'type')}
                                             ></input>
                                        </div>
                                        <div className="col-4 form-group">
                                             <label>Sender's zip code </label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.senderZipCode}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'senderZipCode')}
                                             ></input>
                                        </div>
                                        <div className="col-4 form-group">
                                             <label>Receiver's zip code</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.receiverZipCode}
                                                  onChange={(event) =>
                                                       this.handleOnchangeInput(event, 'receiverZipCode')
                                                  }
                                             ></input>
                                        </div>
                                        <div className="col-4 form-group">
                                             <label>Cost</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.cost}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'cost')}
                                             ></input>
                                        </div>
                                   </div>
                              </div>
                              <div className="modal-admin-footer">
                                   <button
                                        className="btn-add-new-user-confirm"
                                        onClick={() => this.adminHandleCreateParcel()}
                                   >
                                        Create
                                   </button>
                                   <button className="btn-add-new-user-cancel" onClick={isCloseModal}>
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
          language: state.app.language,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          // userDefaultClassSuccess: (userInfo) => dispatch(actions.userDefaultClassSuccess(userInfo)),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminModalAddNewUser);
