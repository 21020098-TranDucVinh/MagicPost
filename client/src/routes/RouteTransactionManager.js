import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import ManageStaffTransaction from '../containers/System/Transaction/ManageTransaction/ManageStaffTransaction';
import Header from '../containers/Header/Header';
import HomeFooter from '../containers/HomePage/HomeFooter';
import TransactionManageParcel from '../containers/System/Transaction/ManageTransaction/TransactionManageParcel';
class RouteTransactionManager extends Component {
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
                                        <Route
                                             path="/transaction-admin/manager/create-account"
                                             component={ManageStaffTransaction}
                                        />
                                        <Route
                                             path="/transaction-admin/manager/statistic-parcel"
                                             component={TransactionManageParcel}
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

export default connect(mapStateToProps, mapDispatchToProps)(RouteTransactionManager);
