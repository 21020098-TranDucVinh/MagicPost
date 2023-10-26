import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import HomeHeader from './HomeHeader';
import { Modal } from 'reactstrap';
import ForgotPassword from '../Auth/ForgotPassword';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
class Homepage extends Component {
     state = {};

     componentDidMount() {}

     render() {
          return (
               <div className="homepage-container">
                    <HomeHeader />
                    <Modal className="booking-modal-container" isOpen={true} size="lg" centered>
                         <div className="modal-header">
                              <span>Login</span>
                              <i className="fa fa-times"></i>
                         </div>
                         {/* <ForgotPassword /> */}
                         <div className="modal-login-signup-forgot-password">
                              <Login />
                         </div>

                         {/* <Register /> */}
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
