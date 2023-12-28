import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import HomeFooter from '../containers/HomePage/HomeFooter';
import CollectionStaffManageParcel from '../containers/System/collection-staff/CollectionStaffManageParcel';
import ColStaffManageArrivedOrder from '../containers/System/collection-staff/ColStaffManageArrivedOrder';
import colStaffCreateOrderToCol from '../containers/System/collection-staff/colStaffCreateOrderToCol';
import colStaffCreateOrderToTran from '../containers/System/collection-staff/colStaffCreateOrderToTran';
class RouteCollectionStaff extends Component {
     render() {
          const { isLoggedIn } = this.props;
          return (
               <>
                    <div className="board-of-director-container">
                         <Header />
                         <div className="system-container">
                              <div className="system-list container">
                                   <Switch>
                                        <Route
                                             exact
                                             path="/collection-staff/manage/parcel"
                                             component={CollectionStaffManageParcel}
                                        />
                                        <Route
                                             path="/collection-staff/manage/create-order/send/collection"
                                             component={colStaffCreateOrderToCol}
                                        />
                                        <Route
                                             path="/collection-staff/manage/create-order/send/transaction"
                                             component={colStaffCreateOrderToTran}
                                        />
                                        <Route
                                             path="/collection-staff/manage/arrived-invoice"
                                             component={ColStaffManageArrivedOrder}
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

export default connect(mapStateToProps, mapDispatchToProps)(RouteCollectionStaff);
