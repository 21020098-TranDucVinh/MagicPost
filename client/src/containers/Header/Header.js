import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu, transactionManageMenu, collectionManageMenu } from './menuApp';
import './Header.scss';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import { TbLogin } from 'react-icons/tb';
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
                    <div className="header-container">
                         <div className="header-logo"></div>
                         <div className="header-tabs-container">
                              <Navigator menus={transactionManageMenu} />
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
                                   <button className="btn btn-primary btn-lg">
                                        <TbLogin />
                                        <span>Login</span>
                                   </button>
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
