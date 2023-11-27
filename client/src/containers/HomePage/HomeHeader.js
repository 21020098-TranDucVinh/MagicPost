import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import logo from '../../assets/images/logo.svg';
import * as actions from '../../store/actions';
import { changeLanguageApp } from '../../store/actions/appActions';
class HomeHeader extends Component {
     state = {};
     changeLanguage = (language) => {
          this.props.changeLanguageAppRedux(language);
     };

     render() {
          let language = this.props.language;
          return (
               <div className="">
                    <div className="homepage-header-container col-12 ">
                         <div className="header-content-left col-2">
                              <div className="logo-magic-post"></div>
                         </div>
                         <div className="header-content-right col-6 row">
                              <div className="menu-list-header col-9">
                                   <div className="col-4  text-wrap">How to Operate</div>
                                   <div className="col-4  text-wrap"> Services</div>
                                   <div className="col-4 text-wrap"> About us</div>
                              </div>
                              <div className="login-logout-container col-2 ">
                                   <button className="btn btn-primary text-md-start btn-login btn-lg">Login</button>
                              </div>
                         </div>
                    </div>
               </div>
          );
     }
}

const mapStateToProps = (state) => {
     return {
          isLoggedIn: state.user.isLoggedIn,
          language: state.app.language,
          userInfo: state.user.userInfo,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          changeLanguageAppRedux: (language) => {
               dispatch(changeLanguageApp(language));
          },
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
