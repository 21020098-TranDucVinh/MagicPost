import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';
import { toast } from 'react-toastify';
import './Login.scss';
import { handleLoginAPI } from '../../services/userService';

class Login extends Component {
     constructor(props) {
          super(props);
          this.state = {
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
          this.setState({
               arrMessage: '',
          });
          // console.log("state : ", this.state);
          try {
               let data = await handleLoginAPI(this.state.username, this.state.password);
               if (data && data.userData.errCode !== 0) {
                    this.setState({
                         arrMessage: data.userData.arrMessage,
                    });
               }

               if (data && data.userData.errCode === 0) {
                    this.props.userLoginSuccess(data.userData.user);
               }
               console.log('check data: ', data.userData);
          } catch (error) {
               // console.log(error.response.data.message);
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
                         <div className="login-container">
                              <div className="login-content row">
                                   <div className="col-12 text-login">LOGIN</div>
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
                                   <div className="col-12">
                                        <button
                                             className="btn-login"
                                             onClick={() => {
                                                  this.handleLogin();
                                             }}
                                        >
                                             Login
                                        </button>
                                   </div>
                                   <div className="col-12 extra-login">
                                        <span
                                             className="forgot-password"
                                             onClick={() => this.handleOnclickForgetPassWord()}
                                        >
                                             Forgot Password
                                        </span>
                                        {/* <span className="sign-up" onClick={() => this.handleOnclickSignUp()}>
                                             Sign Up
                                        </span> */}
                                        <div className="btn-create-new-account-container">
                                             <button className="btn-create-new-account">Create a new account</button>
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
