import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import HomeHeader from './HomeHeader';
import { Modal } from 'reactstrap';
import ForgotPassword from '../Auth/ForgotPassword';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
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
               <div className="homepage-container">
                    <HomeHeader />
                    {/* <Modal className="booking-modal-container" isOpen={true} centered>
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
                    </Modal> */}
                    <div className="homepage-banner-container row">
                         <div className="company-info col-6 ">
                              <div className="info-top container">
                                   <p class="display-4">Welcome to</p>
                                   <h1 class="display-4">Magicpost Center</h1>
                                   <p class="lead text-primary">
                                        Your One-Stop Solution for Healthcare Order Fulfilment and Delivery.
                                   </p>
                              </div>
                              <div className="info-middle info container">
                                   <ul className="">
                                        What make us unique?
                                        <li>Same day fulfillment and delivery within VietNam</li>
                                        <li>02 days delivery within Canada</li>
                                   </ul>
                              </div>
                              <div className="info-bottom info container">
                                   <AvatarGroup max={4}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                        <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                        <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                                   </AvatarGroup>
                              </div>
                         </div>
                    </div>
                    <div className="welcome-magicpost-info-container container">
                         <div className="row welcome-magicpost-info-content">
                              <div className="col-8 left-content-info">
                                   <div class="">
                                        <h1 class="display-4 text-primary">Welcome to Magicpost</h1>
                                        <p class="lead">
                                             We're a Vietnamese owned & operated courier company that offers express
                                             delivery as standard, real-time tracking in the palm of your hand and a
                                             transparent fixed price model. With Click couriers you're in the driver's
                                             seat.
                                        </p>
                                        <p class="lead">
                                             <a class="btn btn-primary btn-lg" href="#" role="button">
                                                  contact us
                                             </a>
                                        </p>
                                   </div>
                              </div>
                              <div className="col-4 right-content-info">
                                   <ul>
                                        <li>
                                             Largest coverage in Ontario than any other courier for same day delivery
                                        </li>
                                        <li>Fixed Rate $6 for all your shipments.</li>
                                        <li>Latest cut-off time int market 2pm for same delivery.</li>
                                        <li>Monday to Saturday service.</li>
                                   </ul>
                              </div>
                         </div>
                    </div>
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
