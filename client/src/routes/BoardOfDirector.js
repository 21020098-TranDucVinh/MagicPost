import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import AdminManagement from '../containers/System/Board-of-Directors/AdminManagement';
import HomepageDirector from '../containers/System/Board-of-Directors/HomepageDirector';
import ManageParcel from '../containers/System/Board-of-Directors/Management/ManageParcel';
import './BoardOfDirector.scss';
import ManagementTransition from '../containers/System/Board-of-Directors/Management/ManagementTransition';
import ManagementCollection from '../containers/System/Board-of-Directors/Management/ManagementCollection';
import HomeFooter from '../containers/HomePage/HomeFooter';

class BoardOfDirector extends Component {
     render() {
          const { isLoggedIn } = this.props;
          return (
               <>
                    {/* {isLoggedIn && <Header />} */}

                    <div className="board-of-director-container">
                         <Header />
                         <div className="system-container">
                              <div className="system-list">
                                   <Switch>
                                        <Route exact path="/system/director" component={HomepageDirector} />
                                        <Route
                                             exact
                                             path="/system/director/create/account/admin-transition-or-collection"
                                             component={AdminManagement}
                                        />
                                        <Route
                                             exact
                                             path="/system/director/statistics/parcels"
                                             component={ManageParcel}
                                        />
                                        <Route
                                             exact
                                             path="/system/admin/management-transition"
                                             component={ManagementTransition}
                                        />
                                        <Route
                                             exact
                                             path="/system/admin/management-collection"
                                             component={ManagementCollection}
                                        />
                                   </Switch>
                              </div>
                         </div>
                    </div>
                    <HomeFooter />
               </>
          );
     }
}

const mapStateToProps = (state) => {
     return {
          isLoggedIn: state.user.isLoggedIn,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardOfDirector);
