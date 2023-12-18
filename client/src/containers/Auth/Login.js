import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import * as actions from '../../store/actions';
import toast from 'react-hot-toast';
import './Login.scss';
import Input from '@mui/joy/Input';
import { MdLockOutline } from 'react-icons/md';
import { handleLoginAPI } from '../../services/adminService';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import '@fontsource/inter';

import Fab from '@mui/material/Fab';
import PersonIcon from '@mui/icons-material/Person';
import { Stack } from '@mui/material';
// import Select from '@mui/material/Select';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import CloseRounded from '@mui/icons-material/CloseRounded';

import IconButton from '@mui/joy/IconButton';

class Login extends Component {
     constructor(props) {
          super(props);
          this.state = {
               roleToSendToServer: 'a',
               username: '',
               password: '',
               onOffShowPassword: 'VisibilityOffIcon',
          };
          this.action = React.createRef();
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
               console.log('data login  :', data);
               let res = await handleLoginAPI(data);

               if (res && res.errorCode === 0) {
                    this.props.userLoginSuccess(res);
                    toast.success('Login success!', { position: 'top-center' });
               }
          } catch (error) {
               toast.error('Your username or password is incorrect!', { position: 'top-center' });
          }
     };

     handleShowHidePassword = () => {
          this.setState({
               onOffShowPassword: 'VisibilityIcon',
          });
     };
     handleShowPassword = () => {
          this.setState({
               onOffShowPassword: 'VisibilityOffIcon',
          });
     };

     render() {
          let { onOffShowPassword, roleToSendToServer } = this.state;
          return (
               <>
                    <div className="login-background">
                         <div className="login-container container">
                              <div className="login-content row">
                                   <div className="col-12 text-login text-center  my-4">
                                        <div>
                                             <Fab size="medium" color="primary" aria-label="add">
                                                  <MdLockOutline />
                                             </Fab>
                                        </div>
                                        <div>Sign in</div>
                                   </div>

                                   <div className="col-12 form-group login-input">
                                        <label className="text-label">Username:</label>
                                        <Input
                                             startDecorator={<PersonIcon />}
                                             onChange={(event) => {
                                                  this.handleOnchangeInput(event, 'username');
                                             }}
                                        ></Input>
                                   </div>
                                   <div className="col-12 form-group login-input">
                                        <label className="text-label">Password:</label>
                                        <div className="custom-input-password">
                                             <Stack>
                                                  <Input
                                                       startDecorator={<LockIcon />}
                                                       type={
                                                            onOffShowPassword === 'VisibilityIcon' ? 'text' : 'password'
                                                       }
                                                       onChange={(event) => {
                                                            this.handleOnchangeInput(event, 'password');
                                                       }}
                                                       endDecorator={
                                                            {
                                                                 VisibilityIcon: (
                                                                      <VisibilityIcon
                                                                           onClick={() => {
                                                                                this.handleShowPassword();
                                                                           }}
                                                                      />
                                                                 ),
                                                                 VisibilityOffIcon: (
                                                                      <VisibilityOffIcon
                                                                           onClick={() => {
                                                                                this.handleShowHidePassword();
                                                                           }}
                                                                      />
                                                                 ),
                                                            }[onOffShowPassword]
                                                       }
                                                  ></Input>
                                             </Stack>
                                        </div>
                                   </div>

                                   <div className="col-12 form-group login-input">
                                        <label className="text-label">Role:</label>
                                        <Select
                                             action={this.action}
                                             value={roleToSendToServer}
                                             placeholder="Choose role…"
                                             onChange={(e, newValue) => this.setState({ roleToSendToServer: newValue })}
                                             {...(roleToSendToServer && {
                                                  // display the button and remove select indicator
                                                  // when user has selected a value
                                                  endDecorator: (
                                                       <IconButton
                                                            size="sm"
                                                            variant="plain"
                                                            color="neutral"
                                                            onMouseDown={(event) => {
                                                                 // don't open the popup when clicking on this button
                                                                 event.stopPropagation();
                                                            }}
                                                            onClick={() => {
                                                                 this.setState({ roleToSendToServer: null });
                                                                 this.action.current?.focusVisible();
                                                            }}
                                                       >
                                                            <CloseRounded />
                                                       </IconButton>
                                                  ),
                                                  indicator: null,
                                             })}
                                             sx={{ minWidth: 160 }}
                                        >
                                             <Option value="admin">Admin</Option>
                                             <Option value="">Staff</Option>
                                        </Select>
                                   </div>
                                   <div className="col-12 my-5 btn-sign-in ">
                                        <Button
                                             variant="contained"
                                             onClick={() => {
                                                  this.handleLogin();
                                             }}
                                             fullWidth={true}
                                        >
                                             SIGN IN
                                        </Button>
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
