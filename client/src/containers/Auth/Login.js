import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';
import toast from 'react-hot-toast';
import './Login.scss';
import { handleLoginAPI } from '../../services/adminService';
import Cookies from 'js-cookie';
class Login extends Component {
     constructor(props) {
          super(props);
          this.state = {
               roleToSendToServer: 'admin',
               username: '',
               password: '',
               isShowPassword: false,
               arrMessage: '',
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
               if (res && res.errorCode === 0) {
                    this.props.userLoginSuccess(res);
               }
          } catch (error) {
               if (error.response) {
                    if (error.response.data) {
                         this.setState({
                              arrMessage: error.response.data.message,
                         });
                    }
               }
          }
     };

     handleShowHidePassword = () => {
          this.setState({
               isShowPassword: !this.state.isShowPassword,
          });
     };
     handleOnclickSignUp = () => {
          toast.success('OK');
          // this.props.history.push('/register');
     };
     handleOnclickForgetPassWord = () => {
          this.props.history.push('/forget-password');
     };
     render() {
          return (
               <>
                    <div className="login-background">
                         <div className="login-container container">
                              <div className="login-content row">
                                   <div className="col-12 text-login text-center  my-4">LOGIN</div>
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
                                   <div className="col-12" style={{ color: 'red' }}>
                                        {this.state.arrMessage}
                                   </div>
                                   <div className="col-12 my-5 ">
                                        <button
                                             className="btn btn-primary w-100"
                                             onClick={() => {
                                                  this.handleLogin();
                                             }}
                                        >
                                             Login
                                        </button>
                                   </div>
                                   <div className="col-12 extra-login">
                                        <div className="btn-create-new-account-container my-3 mb-5">
                                             <button className="btn btn-primary w-100">Create a new account</button>
                                        </div>
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
