import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CreateAccountGatheringAndTransactionManager.scss';
import DirectorModalAddNewUser from './DirectorModalAddNewUser';
import ModalPersonal from '../Admin/ModalPersonal';
class CreateAccountGatheringAndTransactionManager extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
          };
     }
     directorDandleCreateNewUser = () => {
          this.setState({
               isOpenModal: true,
          });
     };
     isCloseModal = () => {
          this.setState({
               isOpenModal: false,
          });
     };
     render() {
          return (
               <>
                    <div className="board-of-director-container">
                         <DirectorModalAddNewUser isOpen={this.state.isOpenModal} isCloseModal={this.isCloseModal} />
                         {/* <ModalPersonal /> */}
                         <div className="title-board-of-director">Tạo tài khoản</div>
                         <div className="btn-director-add-new-user-container">
                              <button
                                   className="btn-create-new-user"
                                   onClick={() => this.directorDandleCreateNewUser()}
                              >
                                   <i className="fas fa-plus"></i>
                                   <span>Thêm người dùng</span>
                              </button>
                         </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountGatheringAndTransactionManager);
