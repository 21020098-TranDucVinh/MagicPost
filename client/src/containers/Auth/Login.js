import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';
import toast from 'react-hot-toast';
import './Login.scss';
import { MdLockOutline } from 'react-icons/md';
import { handleLoginAPI } from '../../services/adminService';
import { IoEyeOff } from 'react-icons/io5';
import { IoEye } from 'react-icons/io5';
class Login extends Component {
     constructor(props) {
          super(props);
          this.state = {
               roleToSendToServer: '',
               username: '',
               password: '',
               isShowPassword: false,
          };
     }

     handleOnchangeInput = (event, id) => {
          let copyState = this.state;
          copyState[id] = event.target.value;
          this.setState({
               ...copyState,
          });
     };

     handleLogin = async () => {
          try {
               let data = {
                    username: this.state.username,
                    password: this.state.password,
                    role: this.state.roleToSendToServer,
               };
               // console.log('check data : ', data);
               let res = await handleLoginAPI(data);
               console.log('check res : ', res);
               if (res && res.errorCode === 0) {
                    this.props.userLoginSuccess(res);
                    toast.success('Login success!', { position: 'top-center' });
               }
          } catch (error) {
               console.log('check erorr : ', error);
               toast.error('Your username or password is incorrect!', { position: 'top-center' });
          }
     };

     handleShowHidePassword = () => {
          this.setState({
               isShowPassword: !this.state.isShowPassword,
          });
     };

     handleOnclickForgetPassWord = () => {
          this.props.history.push('/forget-password');
     };
     render() {
          let { isShowPassword } = this.state;

          return (
               <>
                    <div className="login-background">
                         <div className="login-container container">
                              <div className="login-content row">
                                   <div className="col-12 text-login text-center  my-4">
                                        <div>
                                             <button className="logo-login">
                                                  <MdLockOutline />
                                             </button>
                                        </div>
                                        <div>Sign in</div>
                                   </div>
                                   <div className="col-12 form-group login-input">
                                        <label className="text-label">Username:</label>
                                        <input
                                             type="text"
                                             className="form-control col-12"
                                             placeholder="Enter your username"
                                             value={this.state.username}
                                             onChange={(event) => {
                                                  this.handleOnchangeInput(event, 'username');
                                             }}
                                        />
                                   </div>
                                   <div className="col-12 form-group login-input">
                                        <label className="text-label">Password:</label>
                                        <div className="custom-input-password">
                                             <input
                                                  className="form-control"
                                                  type={this.state.isShowPassword ? 'text' : 'password'}
                                                  placeholder="Enter your password"
                                                  onChange={(event) => {
                                                       this.handleOnchangeInput(event, 'password');
                                                  }}
                                             />
                                             <span
                                                  onClick={() => {
                                                       this.handleShowHidePassword();
                                                  }}
                                             >
                                                  {isShowPassword ? (
                                                       <IoEye onClick={() => this.handleShowHidePassword()} />
                                                  ) : (
                                                       <IoEyeOff />
                                                  )}
                                             </span>
                                        </div>
                                   </div>
                                   <div className="col-12" style={{ color: 'red' }}>
                                        {this.state.arrMessage}
                                   </div>
                                   <div className="col-12 my-5 ">
                                        <button
                                             className="btn btn-primary w-100 py-3"
                                             onClick={() => {
                                                  this.handleLogin();
                                             }}
                                        >
                                             SIGN IN
                                        </button>
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
     return {
          navigate: (path) => dispatch(push(path)),
          // userLoginFail: () => dispatch(actions.adminLoginFail()),
          userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo)),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
