import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import './Register.scss';
import { handleRegisterAPI } from '../../services/userService';

class Register extends Component {
     constructor(props) {
          super(props);
          this.state = {
               firstName: '',
               lastName: '',
               email: '',
               password: '',
               confirmPassword: '',
               isShowPassword: false,
               isShowConfirmPassword: false,
          };
     }
     compareInputPassword = (password, confirmPassword) => {
          let result = password === confirmPassword ? true : false;
          return result;
     };
     handleOnChangeInput = (event, type) => {
          let copyState = this.state;
          copyState[type] = event.target.value;
          this.setState({
               ...copyState,
          });
     };
     handleShowHidePassword = () => {
          this.setState({
               isShowPassword: !this.state.isShowPassword,
          });
     };
     handleShowHideConfirmPassword = () => {
          this.setState({
               isShowConfirmPassword: !this.state.isShowConfirmPassword,
          });
     };
     render() {
          let { firstName, lastName, email, passWord, confirmPassword, isShowPassword, isShowConfirmPassword } =
               this.state;
          console.log('check state : ', this.state);
          return (
               <>
                    <div className="background-register">
                         <div className="register-container">
                              <div className="register-content">
                                   <div className="col-12 text-register">register</div>
                                   <div className="row input-info">
                                        <div className="col-6 form-group">
                                             <label>First Name</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  placeholder="First Name"
                                                  value={firstName}
                                                  onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Last Name</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  placeholder="Last Name"
                                                  value={lastName}
                                                  onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                                             ></input>
                                        </div>
                                        <div className="col-12 form-group">
                                             <label>Email</label>
                                             <input
                                                  type="email"
                                                  className="form-control"
                                                  placeholder="Email"
                                                  value={email}
                                                  onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                             ></input>
                                        </div>
                                        <div className="col-12 form-group">
                                             <label>Password</label>
                                             <div className="custom-input-password">
                                                  <input
                                                       type={isShowPassword ? 'text' : 'password'}
                                                       className="form-control"
                                                       placeholder="Password"
                                                       value={passWord}
                                                       onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                                  ></input>
                                                  <span
                                                       onClick={() => {
                                                            this.handleShowHidePassword();
                                                       }}
                                                  >
                                                       <i
                                                            className={
                                                                 !this.state.isShowPassword
                                                                      ? 'far fa-eye-slash'
                                                                      : 'far fa-eye'
                                                            }
                                                       ></i>
                                                  </span>
                                             </div>
                                        </div>
                                        <div className="col-12 form-group">
                                             <label>Confirm Password</label>
                                             <div className="custom-input-confirm-password">
                                                  <input
                                                       type={isShowConfirmPassword ? 'text' : 'password'}
                                                       className="form-control"
                                                       placeholder="Confirm password"
                                                       value={confirmPassword}
                                                       onChange={(event) =>
                                                            this.handleOnChangeInput(event, 'confirmPassword')
                                                       }
                                                  ></input>
                                                  <span
                                                       onClick={() => {
                                                            this.handleShowHideConfirmPassword();
                                                       }}
                                                  >
                                                       <i
                                                            className={
                                                                 !this.state.isShowConfirmPassword
                                                                      ? 'far fa-eye-slash'
                                                                      : 'far fa-eye'
                                                            }
                                                       ></i>
                                                  </span>
                                             </div>
                                        </div>
                                        <div className="col-12">
                                             <button className="btn-sign-up ">Sign Up</button>
                                        </div>
                                        <div className="back-to-login col-12">Have account back to login?</div>
                                   </div>
                              </div>
                         </div>
                    </div>
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
     return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
