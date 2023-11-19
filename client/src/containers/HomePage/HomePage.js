import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import HomeHeader from './HomeHeader';
import { Modal } from 'reactstrap';
import ForgotPassword from '../Auth/ForgotPassword';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
class Homepage extends Component {
     state = {
          isShowModalLogin: false,
          isShowModalForgotPassword: false,
          isSHowModalRegister: true,
     };

     componentDidMount() {}

     render() {
          let { isShowModalLogin, isShowModalForgotPassword, isSHowModalRegister } = this.state;
          return (
               <div className="homepage-container container">
                    <HomeHeader />
                    <Modal className="booking-modal-container" isOpen={true} centered>
                         <div className="modal-header">
                              <span>
                                   {isShowModalLogin && 'Login'}
                                   {isShowModalForgotPassword && 'Forgot Password'}
                                   {isSHowModalRegister && 'Register'}
                              </span>
                              <i className="fa fa-times"></i>
                         </div>
                         <div className="modal-login-signup-forgot-password">
                              {isShowModalLogin && <Login />}
                              {isShowModalForgotPassword && <ForgotPassword />}
                              {isSHowModalRegister && <Register />}
                         </div>
                    </Modal>
               </div>
          );
     }
}

const mapStateToProps = (state) => {
     return {};
};

const mapDispatchToProps = (dispatch) => {
     return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
