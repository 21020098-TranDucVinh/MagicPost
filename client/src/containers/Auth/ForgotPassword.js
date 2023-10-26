import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import './ForgotPassword.scss';

class ForgotPassword extends Component {
     constructor(props) {
          super(props);
          this.state = {
               email: '',
          };
     }

     render() {
          return (
               <>
                    <div className="forgot-password-container">
                         <div className="forgot-password-content">
                              <div className="col-12 title-forget-password">Forgot Password</div>
                              <div className="input-info-forgot-password row">
                                   <div className="input-email col-12 form-group">
                                        <label>Email: </label>
                                        <input className="form-control content-email" placeholder="Your email"></input>
                                   </div>
                                   <div className="btn-container col-12">
                                        <button className="submit-form-forgot-password">Submit</button>
                                   </div>
                              </div>
                         </div>
                    </div>
               </>
          );
     }
}

const mapStateToProps = (state) => {
     return {};
};

const mapDispatchToProps = (dispatch) => {
     return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
