import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import AdminManagement from '../containers/System/Board-of-Directors/AdminManagement';
import HomepageDirector from '../containers/System/Board-of-Directors/HomepageDirector';
import ChartStatisticParcel from '../containers/System/Board-of-Directors/Management/ChartStatisticParcel';
import './BoardOfDirector.scss';
import ManageTransaction from '../containers/System/Board-of-Directors/Management/ManageTransaction';
import ManagementCollection from '../containers/System/Board-of-Directors/Management/ManagementCollection';
import HomeFooter from '../containers/HomePage/HomeFooter';
import AdminStatisticParcel from '../containers/System/Board-of-Directors/Management/AdminStatisticParcel';
class BoardOfDirector extends Component {
     render() {
          const { isLoggedIn } = this.props;
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
                                             path="/system/director/create/account/admin-transaction-or-collection"
                                             component={AdminManagement}
                                        />
                                        <Route
                                             exact
                                             path="/system/director/statistics/parcels"
                                             component={AdminStatisticParcel}
                                        />
                                        <Route
                                             exact
                                             path="/system/admin/management-transaction"
                                             component={ManageTransaction}
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
