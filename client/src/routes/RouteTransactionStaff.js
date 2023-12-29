import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import HomeFooter from '../containers/HomePage/HomeFooter';
import TransactionManageParcel from '../containers/System/Transaction/ManageTransaction/TransactionManageParcel';
import RecordParcel from '../containers/System/transaction-staff/RecordParcel';
import TransactionStaffCreateOrder from '../containers/System/transaction-staff/TransactionStaffCreateOrder';
import TranStaffManageArrivedOrder from '../containers/System/transaction-staff/TranStaffManageArrivedOrder';
import TranStaffStatisticParcel from '../containers/System/transaction-staff/TranStaffStatisticParcel';
import TranStaffSendOrderToClient from '../containers/System/transaction-staff/TranStaffSendOrderToClient';
import TranStaffManageDeliveringParcel from '../containers/System/transaction-staff/TranStaffManageDeliveringParcel';
import tranStaffMangeUnsuccessfulDelivery from '../containers/System/transaction-staff/TranStaffMangeUnsuccessfulDelivery';
import TanStaffManageParcels from '../containers/System/transaction-staff/TranStaffManageParcels';
class RouteTransactionStaff extends Component {
     render() {
          return (
               <>
                    <div className="board-of-director-container">
                         <Header />
                         <div className="system-container">
                              <div className="system-list container">
                                   <Switch>
                                        <Route
                                             path="/transaction-staff/manage/create-parcel"
                                             component={RecordParcel}
                                        />

                                        <Route
                                             path="/transaction-staff/manage/create-order/send/collection"
                                             component={TransactionStaffCreateOrder}
                                        />
                                        <Route
                                             path="/transaction-staff/manage/arrived-invoice"
                                             component={TranStaffManageArrivedOrder}
                                        />
                                        <Route
                                             path="/transaction-staff/create/send/parcel-to-client"
                                             component={TranStaffSendOrderToClient}
                                        />
                                        <Route
                                             path="/transaction-staff/create/receipt"
                                             component={TransactionManageParcel}
                                        />
                                        <Route
                                             path="/transaction-staff/statistic-parcel"
                                             component={TranStaffStatisticParcel}
                                        />
                                        <Route
                                             path="/transaction-staff/manage/parcel-delivering"
                                             component={TranStaffManageDeliveringParcel}
                                        />
                                        <Route
                                             path="/transaction-staff/manage/parcel/parcel-unsuccessful"
                                             component={tranStaffMangeUnsuccessfulDelivery}
                                        />
                                        <Route
                                             path="/transaction-staff/manage/parcel"
                                             component={TanStaffManageParcels}
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

export default connect(mapStateToProps, mapDispatchToProps)(RouteTransactionStaff);
