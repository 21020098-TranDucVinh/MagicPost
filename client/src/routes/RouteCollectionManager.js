import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Header from '../containers/Header/Header';
import HomeFooter from '../containers/HomePage/HomeFooter';
import ManageCollectionStaff from '../containers/System/Collection/ManageCollectionStaff';
import CollectionStatisticParcel from '../containers/System/Collection/CollectionStatisticParcel';
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
                                             path="/collection-admin/manager/create-account"
                                             component={ManageCollectionStaff}
                                        />
                                        <Route
                                             path="/collection-admin/manager/statistic-parcel"
                                             component={CollectionStatisticParcel}
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
