import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DirectorModalAddNewUser.scss';
import { Modal } from 'reactstrap';
// import { handleDefaultClassAPI } from '../../services/userService';
import Select from 'react-select';
import 'flatpickr/dist/themes/material_green.css';
// import Modal from 'react-modal';
import Flatpickr from 'react-flatpickr';
class DirectorModalAddNewUser extends Component {
     constructor(props) {
          super(props);
          this.state = {
               genders: [
                    { label: 'Nam', value: 'Na' },
                    { label: 'Nữ', value: 'Nu' },
               ],
          };
     }

     render() {
          let { isOpen, isCloseModal } = this.props;
          return (
               <>
                    <Modal className="director-add-new-user-container" isOpen={isOpen} size="lg" centered>
                         <div className="director-add-new-user-content">
                              <div className="director-add-new-user-header">
                                   <span className="left">Thêm người dùng mới</span>
                                   <span className="right" onClick={isCloseModal}>
                                        <i className="fa fa-times"></i>
                                   </span>
                              </div>

                              <div className="director-add-new-user-body">
                                   <div className="row">
                                        <div className="col-6 form-group">
                                             <label>Họ tên</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={'fullName'}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'fullName')}
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Số điện thoại</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={'phoneNumber'}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'phoneNumber')}
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Địa chỉ Email</label>
                                             <input
                                                  type="email"
                                                  className="form-control"
                                                  value={'email'}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'email')}
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Địa chỉ liên hệ</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={'address'}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                             ></input>
                                        </div>

                                        <div className="col-6 form-group">
                                             <label>Ngày sinh</label>
                                             <Flatpickr
                                                  className="form-control"
                                                  onChange={this.handleOnchangeDatePicker}
                                                  value={this.state.currentDate}
                                                  placeholder={'Ngày sinh'}
                                             />
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Giới tính</label>
                                             <Select
                                                  value={this.state.selectedGender}
                                                  options={this.state.genders}
                                                  onChange={this.handleOnchangeSelect}
                                             />
                                        </div>
                                   </div>
                              </div>
                              <div className="director-add-new-user-footer">
                                   <button
                                        className="btn-add-new-user-confirm"
                                        onClick={() => this.handleConfirmBooking()}
                                   >
                                        Xác nhận
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

export default connect(mapStateToProps, mapDispatchToProps)(DirectorModalAddNewUser);
