import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu, transactionManageMenu, collectionManageMenu } from './menuApp';
import './Header.scss';
import { CiLogout } from 'react-icons/ci';
class Header extends Component {
     constructor(props) {
          super(props);
          this.state = {
               menuApp: [],
               isOpenModal: false,
          };
     }

     componentDidMount() {
          let { userInfo } = this.props;
          switch (userInfo.role) {
               case 'ADMIN':
                    this.setState({
                         menuApp: adminMenu,
                    });
                    break;
               case 'TRANSACTION_ADMIN':
                    this.setState({
                         menuApp: transactionManageMenu,
                    });
                    break;
               case 'COLLECTION_ADMIN':
                    this.setState({
                         menuApp: collectionManageMenu,
                    });
                    break;
               default:
                    return this.setState({
                         menuApp: [],
                    });
          }
     }
     handleLogout = () => {
          this.props.processLogout();
     };
     render() {
          const { processLogout, userInfo } = this.props;
          // let { isOpenModal } = this.state;
          return (
               <>
                    <div className="header-container">
                         <div className="header-logo"></div>
                         {/* <Login isOpen={isOpenModal} isCloseModal={this.isCloseModal} /> */}
                         <div className="header-tabs-container">
                              <Navigator menus={this.state.menuApp} />
                         </div>

                         <div className="languages">
                              <div className="btn btn-logout" title="Log out">
                                   <button className="btn btn-primary btn-lg" onClick={() => this.handleLogout()}>
                                        <CiLogout />
                                        <span>Logout</span>
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
