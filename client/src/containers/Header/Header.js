import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { BiSolidBellRing } from 'react-icons/bi';
import {
     adminMenu,
     transactionManageMenu,
     collectionManageMenu,
     transactionStaffMenu,
     collectionStaffMenu,
} from './menuApp';
import './Header.scss';
import { Button } from 'reactstrap';
import { CiLogout } from 'react-icons/ci';
import { roles } from '../../utils';
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
               case roles.ADMIN:
                    this.setState({
                         menuApp: adminMenu,
                    });
                    break;
               case roles.TRANSACTION_ADMIN:
                    this.setState({
                         menuApp: transactionManageMenu,
                    });
                    break;
               case roles.COLLECTION_ADMIN:
                    this.setState({
                         menuApp: collectionManageMenu,
                    });
                    break;
               case roles.TRANSACTION_STAFF:
                    this.setState({
                         menuApp: transactionStaffMenu,
                    });
                    break;
               case roles.COLLECTION_STAFF:
                    this.setState({
                         menuApp: collectionStaffMenu,
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
          const { userInfo } = this.props;
          return (
               <>
                    <div className="header-container">
                         <div className="header-logo"></div>
                         <div className="header-tabs-container">
                              <Navigator menus={this.state.menuApp} />
                         </div>

                         <div className="languages">
                              <span className="hi-user">
                                   <BiSolidBellRing />
                              </span>
                              <div className="btn-logout-container p-4" title="Log out">
                                   <Button
                                        className="btn btn-primary btn-lg-content "
                                        onClick={() => this.handleLogout()}
                                   >
                                        <CiLogout className="button" />
                                        <span className="button">Logout</span>
                                   </Button>
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
