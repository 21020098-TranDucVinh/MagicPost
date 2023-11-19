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
               <>
                    <div className="homepage-header-container">
                         <div className="header-content-left"></div>
                         <div className="header-content-right"></div>
                    </div>
               </>
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
