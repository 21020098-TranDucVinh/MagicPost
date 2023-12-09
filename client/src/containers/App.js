import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux';
import HomePage from './HomePage/HomePage.js';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import 'react-toastify/dist/ReactToastify.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { path } from '../utils';
import Login from './Auth/Login';
import BoardOfDirector from '../routes/BoardOfDirector';
import RouteTransactionManager from '../routes/RouteTransactionManager.js';
import { Toaster } from 'react-hot-toast';
import RouteCollectionManager from '../routes/RouteCollectionManager.js';
import { Redirect } from 'react-router-dom';
import RouteTransactionStaff from '../routes/RouteTransactionStaff.js';
import RouteCollectionStaff from '../routes/RouteCollectionStaff.js';
class App extends Component {
     constructor(props) {
          super(props);
          this.state = {
               userInfo: '',
          };
     }
     componentDidMount() {}
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.userInfo !== this.props.userInfo) {
               this.setState({
                    userInfo: this.props.userInfo,
               });
          }
     }

     render() {
          let { userInfo } = this.state;
          console.log('check userInfo : ', userInfo);
          return (
               <>
                    <Router history={history}>
                         <div className="main-container">
                              <div className="content-container">
                                   <Scrollbars style={{ height: '100vh', width: '100%' }}>
                                        <Switch>
                                             <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                             <Route path={path.HOMEPAGE} component={HomePage} />

                                             {userInfo && userInfo.role === 'ADMIN' && (
                                                  <>
                                                       <Redirect to={path.ADMIN_CREATE_ACCOUNT} />
                                                       <Route
                                                            path={path.SYSTEM}
                                                            component={userIsAuthenticated(BoardOfDirector)}
                                                       />
                                                  </>
                                             )}
                                             {userInfo && userInfo?.role === 'TRANSACTION_ADMIN' && (
                                                  <>
                                                       <Redirect to={path.TRANSACTION_ADMIN_CREATE_ACCOUNT} />
                                                       <Route
                                                            path={path.TRANSACTION_ADMIN}
                                                            component={userIsAuthenticated(RouteTransactionManager)}
                                                       />
                                                  </>
                                             )}
                                             {userInfo && userInfo?.role === 'COLLECTION_ADMIN' && (
                                                  <>
                                                       <Redirect to={path.COLLECTION_ADMIN_CREATE_ACCOUNT} />
                                                       <Route
                                                            path={path.COLLECTION_ADMIN}
                                                            component={userIsAuthenticated(RouteCollectionManager)}
                                                       />
                                                  </>
                                             )}
                                             {userInfo && userInfo?.role === 'TRANSACTION_STAFF' && (
                                                  <>
                                                       <Redirect to={path.TRANSACTION_STAFF_CREATE_PARCEL} />
                                                       <Route
                                                            path={'/transaction-staff'}
                                                            component={userIsAuthenticated(RouteTransactionStaff)}
                                                       />
                                                  </>
                                             )}
                                             {userInfo && userInfo?.role === 'COLLECTION_STAFF' && (
                                                  <>
                                                       <Redirect to={path.COLLECTION_STAFF_MANAGE_PARCEL} />
                                                       <Route
                                                            path={'/collection-staff'}
                                                            component={userIsAuthenticated(RouteCollectionStaff)}
                                                       />
                                                  </>
                                             )}
                                        </Switch>
                                   </Scrollbars>
                              </div>
                              <Toaster position="top-right" />
                         </div>
                    </Router>
               </>
          );
     }
}

const mapStateToProps = (state) => {
     return {
          started: state.app.started,
          isLoggedIn: state.user.isLoggedIn,
          userInfo: state.user.userInfo,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
