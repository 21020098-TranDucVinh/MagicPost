import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import AdminManagement from '../containers/System/Board-of-Directors/AdminManagement';
import HomepageDirector from '../containers/System/Board-of-Directors/HomepageDirector';
import './BoardOfDirector.scss';
import ManageTransaction from '../containers/System/Board-of-Directors/Management/ManageTransaction';
import ManagementCollection from '../containers/System/Board-of-Directors/Management/ManagementCollection';
import HomeFooter from '../containers/HomePage/HomeFooter';
import AdminStatisticParcel from '../containers/System/Board-of-Directors/Management/AdminStatisticParcel';
import { path } from '../utils';
class BoardOfDirector extends Component {
     render() {
          return (
               <>
                    {/* {isLoggedIn && <Header />} */}

                    <div className="board-of-director-container">
                         <Header />
                         <div className="system-container">
                              <div className="system-list container">
                                   <Switch>
                                        <Route exact path="/system/director" component={HomepageDirector} />
                                        <Route
                                             exact
                                             path={path.ADMIN_MANAGE_COLLECTION_AND_TRANSACTION}
                                             component={AdminManagement}
                                        />
                                        <Route
                                             exact
                                             path={path.ADMIN_STATISTIC_PARCEL}
                                             component={AdminStatisticParcel}
                                        />
                                        <Route
                                             exact
                                             path={path.ADMIN_MANAGE_TRANSACTION}
                                             component={ManageTransaction}
                                        />
                                        <Route
                                             exact
                                             path={path.ADMIN_MANAGE_COLLECTION}
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
