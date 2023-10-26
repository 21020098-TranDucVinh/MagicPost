import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions';
import './HomepageDirector.scss';

// import { handleDefaultClassAPI } from '../../services/userService';

class HomepageDirector extends Component {
     constructor(props) {
          super(props);
          this.state = {};
     }

     render() {
          return <>HomepageDirector</>;
     }
}

const mapStateToProps = (state) => {
     return {
          language: state.app.language,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          // userDefaultClassSuccess: (userInfo) => dispatch(actions.userDefaultClassSuccess(userInfo)),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomepageDirector);
