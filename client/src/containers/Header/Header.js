import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';

import ModalPersonal from '../System/Admin/ModalPersonal';
class Header extends Component {
     constructor(props) {
          super(props);
          this.state = {
               menuApp: [],
               isOpenModalPersonal: false,
          };
     }

     componentDidMount() {
          let { userInfo } = this.props;
     }
     handleOpenModalPersonal = () => {
          this.setState({
               isOpenModalPersonal: true,
          });
     };
     closeModalPersonal = () => {
          this.setState({
               isOpenModalPersonal: false,
          });
     };
     render() {
          const { processLogout, userInfo } = this.props;
          return (
               <>
                    <ModalPersonal
                         isOpenModalPersonal={this.state.isOpenModalPersonal}
                         isCloseModalPersonal={this.closeModalPersonal}
                    />
                    <div className="header-container">
                         <div className="header-logo"></div>
                         <div className="header-tabs-container">
                              <Navigator menus={adminMenu} />
                         </div>

                         <div className="languages">
                              {/* <span className="welcome">
                                   {userInfo && userInfo.firstName ? userInfo.firstName : ' '}!
                              </span> */}

                              <div
                                   className="btn btn-logout"
                                   onClick={() => this.handleOpenModalPersonal()}
                                   title="Log out"
                              >
                                   {/* <i className="fas fa-sign-out-alt"></i> */}
                                   <i className="	fas fa-bars"></i>
                              </div>
                         </div>
                    </div>
               </>
          );
     }
}

const mapStateToProps = (state) => {
     return {
          isLoggedIn: state.user.isLoggedIn,

          userInfo: state.user.userInfo,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          processLogout: () => dispatch(actions.processLogout()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
