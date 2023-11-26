import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux';
import { ToastContainer } from 'react-toastify';
import HomePage from './HomePage/HomePage.js';
import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';
import 'react-toastify/dist/ReactToastify.css';
import { Scrollbars } from 'react-custom-scrollbars';
import { path } from '../utils';
import Home from '../routes/Home';
import Login from './Auth/Login';
import BoardOfDirector from '../routes/BoardOfDirector';
import Register from './Auth/Register';
import ForgotPassword from './Auth/ForgotPassword';
import RouteTransactionManager from '../routes/RouteTransactionManager.js';
import { Toaster } from 'react-hot-toast';
import RouteCollectionManager from '../routes/RouteCollectionManager.js';
class App extends Component {
     componentDidMount() {}
     render() {
          return (
               <>
                    <Router history={history}>
                         <div className="main-container">
                              <div className="content-container">
                                   <Scrollbars style={{ height: '100vh', width: '100%' }}>
                                        <Switch>
                                             <Route path={path.HOME} exact component={Home} />
                                             <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                             <Route
                                                  path={path.SYSTEM}
                                                  component={userIsAuthenticated(BoardOfDirector)}
                                             />

                                             <Route path={path.TRANSACTION_ADMIN} component={RouteTransactionManager} />
                                             <Route path={path.COLLECTION_ADMIN} component={RouteCollectionManager} />
                                             <Route path={path.HOMEPAGE} component={HomePage} />
                                             {/* <Route exact path={path.REGISTER} component={Register} />
                                             <Route exact path={path.FORGOT_PASSWORD} component={ForgotPassword} /> */}
                                        </Switch>
                                   </Scrollbars>
                              </div>
                              <Toaster />
                              {/* <ToastContainer
                                   position="top-right"
                                   autoClose={5000}
                                   hideProgressBar={false}
                                   newestOnTop={false}
                                   closeOnClick
                                   rtl={false}
                                   pauseOnFocusLoss
                                   draggable
                                   pauseOnHover
                                   theme="light"
                              /> */}
                              {/* Same as */}
                              <ToastContainer />
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
     };
};

const mapDispatchToProps = (dispatch) => {
     return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
