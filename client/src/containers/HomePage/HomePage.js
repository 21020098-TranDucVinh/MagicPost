import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import HomeHeader from './HomeHeader';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import HomeFooter from './HomeFooter';
const steps = ['Name tran1', 'name col1', 'name col2', 'name tran2', 'Your home'];
class Homepage extends Component {
     state = {};

     componentDidMount() {}

     render() {
          return (
               <div className="homepage-container">
                    <HomeHeader />
                    <div className="homepage-banner-container row">
                         <div className="company-info col-12 container py-3">
                              <div className="px-5 company-info-detail">
                                   <div className="info-top">
                                        <h1 className="text-header-rps">
                                             Welcome to <br /> MagicPost Center
                                        </h1>

                                        <p className="lead text-primary">
                                             Your One-Stop Solution for Healthcare Order Fulfilment and Delivery.
                                        </p>
                                   </div>
                                   <div className="info-middle info text-content-rps ">
                                        <ul className="">
                                             What make us unique?
                                             <li>Same day fulfillment and delivery within VietNam</li>
                                             <li>02 days delivery within Canada</li>
                                        </ul>
                                   </div>
                                   <div className="info-bottom info ">
                                        <AvatarGroup max={4}>
                                             <Avatar alt="Remy Sharp" src="../../assets/images/logo_tiger.jpg" />
                                             <Avatar alt="Travis Howard" src="../../assets/images/logo2.jpg" />
                                             <Avatar alt="Cindy Baker" src="../../assets/images/logo2.jpg" />
                                             <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                                             <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                                        </AvatarGroup>
                                   </div>
                              </div>
                         </div>
                         <div className="search-parcel-container col-12 container">
                              <div className="search-content p-5">
                                   <div className="search-box container">
                                        <div className="title-search-parcel text-center p-3">Search parcel</div>
                                        <div className="box-search-parcel-container">
                                             <div className="box-search-parcel-content p-3">
                                                  <Paper
                                                       component="form"
                                                       sx={{
                                                            p: '2px 4px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            width: 400,
                                                       }}
                                                  >
                                                       <IconButton sx={{ p: '10px' }} aria-label="menu">
                                                            <MenuIcon />
                                                       </IconButton>
                                                       <InputBase
                                                            sx={{ ml: 1, flex: 1 }}
                                                            placeholder="Ex:P00001"
                                                            inputProps={{ 'aria-label': 'search google maps' }}
                                                       />
                                                       <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                                                            <SearchIcon />
                                                       </IconButton>
                                                  </Paper>
                                             </div>
                                             <div className="box-search-parcel-result  ">
                                                  <div className="result-info p-3 text-content-rps ">
                                                       <div>
                                                            Tracking number: <span>P00001</span>
                                                       </div>
                                                       <div>
                                                            Shipping date:<span>11/09/2023</span>
                                                       </div>
                                                       <div>
                                                            Estimated delivery date:<span>14/09/2023</span>
                                                       </div>
                                                       <div>
                                                            Status:<span>In transit</span>
                                                       </div>
                                                  </div>
                                                  <div className="result-chart p-3 ">
                                                       <Box sx={{ width: '100%' }}>
                                                            <Stepper activeStep={2}>
                                                                 {steps.map((label, index) => {
                                                                      const stepProps = {};
                                                                      const labelProps = {};

                                                                      if (index === 2) {
                                                                           stepProps.completed = false;
                                                                      }
                                                                      return (
                                                                           <Step key={label} {...stepProps}>
                                                                                <StepLabel {...labelProps}>
                                                                                     {label}
                                                                                </StepLabel>
                                                                           </Step>
                                                                      );
                                                                 })}
                                                            </Stepper>
                                                       </Box>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              {/* <div className="more-info"></div> */}
                         </div>
                    </div>
                    <div className="welcome-magicpost-info-container container">
                         <div className="row welcome-magicpost-info-content">
                              <div className="col-8 left-content-info">
                                   <h1 className="text-header-rps">Welcome to MagicPost</h1>
                                   <p className="lead text-content-rps">
                                        We're a Vietnamese owned & operated courier company that offers express delivery
                                        as standard, real-time tracking in the palm of your hand and a transparent fixed
                                        price model. With Click couriers you're in the driver's seat.
                                   </p>
                                   <p className="lead">
                                        <a className="btn btn-primary btn-lg" href="google.com" role="button">
                                             contact us
                                        </a>
                                   </p>
                              </div>
                              <div className="col-4 right-content-info">
                                   <h1 className="text-header-rps">Features</h1>
                                   <ul className="">
                                        <li>
                                             Largest coverage in Ontario than any other courier for same day delivery
                                        </li>
                                        <li>Fixed Rate $6 for all your shipments.</li>
                                        <li>Latest cut-off time int market 2pm for same delivery.</li>
                                        <li>Monday to Saturday service.</li>
                                   </ul>
                              </div>
                         </div>
                    </div>
                    <HomeFooter />
               </div>
          );
     }
}

const mapStateToProps = (state) => {
     return {};
};

const mapDispatchToProps = (dispatch) => {
     return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
