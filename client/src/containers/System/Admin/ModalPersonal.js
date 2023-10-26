import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions';
import './ModalPersonal.scss';
// import { Modal } from 'reactstrap';
import Modal from 'react-modal';

class ModalPersonal extends Component {
     constructor(props) {
          super(props);
          this.state = {};
     }

     render() {
          let { isOpenModalPersonal, isCloseModalPersonal } = this.props;
          return (
               <div>
                    <Modal contentLabel="Example Modal" isOpen={isOpenModalPersonal} className="custom-modal">
                         <div className="modal-personal-header">
                              <span> Thông tin cá nhân</span>
                              <i className="fa fa-times" onClick={isCloseModalPersonal}></i>
                         </div>
                         <div className="modal-personal-body">
                              <div className="email">thachdinh@gmail.com</div>
                              {/* <div className="log-out">Log out</div> */}
                         </div>
                         <div className="modal-personal-footer">
                              <i class="fas fa-sign-out-alt"></i>
                         </div>
                    </Modal>
               </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalPersonal);
