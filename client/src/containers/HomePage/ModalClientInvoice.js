import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';

// import { handleDefaultClassAPI } from '../../services/adminService';

class DefaultClass extends Component {
     constructor(props) {
          super(props);
          this.state = {};
     }

     render() {
          return (
               <>
                    <Modal show={this.props.showModal} onHide={this.props.closeModal} size="xl" centered>
                         awkejhfkaljrgklajerg kn iaeriljergojergosnergonksdg;nk ;okrjgsierg
                    </Modal>
                    <hr className="mt-4 mb-3" />
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
          // userDefaultClassSuccess: (userInfo) => dispatch(actions.userDefaultClassSuccess(userInfo)),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
