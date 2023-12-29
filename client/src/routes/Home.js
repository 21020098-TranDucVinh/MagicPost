import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
class Home extends Component {
     render() {
          let { userInfo } = this.props;
          const { isLoggedIn } = this.props;
          let linkToRedirect = isLoggedIn ? '/system/director' : '/login';
          return <Redirect to={linkToRedirect} />;
     }
}

const mapStateToProps = (state) => {
     return {
          isLoggedIn: state.user.isLoggedIn,
          userInfo: state.user.userInfo,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
