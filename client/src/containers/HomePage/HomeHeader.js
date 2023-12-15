import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { PiListDashesBold } from 'react-icons/pi';
import ModalClientInvoice from './ModalClientInvoice';
class HomeHeader extends Component {
     constructor(props) {
          super(props);
          this.state = {
               anchorEl: null,
               isOpen: false,
          };
     }

     handleClick = (event) => {
          this.setState({ anchorEl: event.currentTarget });
     };

     handleClose = () => {
          this.setState({ anchorEl: null });
     };
     // open mal
     openModal = (event) => {
          event.preventDefault();
          this.setState({ isOpen: true });
     };
     // close modal
     closeModal = (event) => {
          this.setState({ isOpen: false });
          document.location.reload();
     };
     render() {
          const { anchorEl } = this.state;
          const open = Boolean(anchorEl);
          return (
               <div className="">
                    <div className="homepage-header-container col-12 ">
                         <div className="header-content-left col-2">
                              <div className="logo-magic-post"></div>
                         </div>
                         <div className="header-content-right col-6 row">
                              <div className="menu-list-header col-9">
                                   <div className="col-4  text-wrap">How to Operate</div>
                                   <div className="col-4  text-wrap"> Services</div>
                                   <div className="col-4 text-wrap"> About us</div>
                              </div>
                              <ModalClientInvoice showModal={this.state.isOpen} closeModal={this.closeModal} />
                              <div className="login-logout-container col-3 ">
                                   <Button
                                        id="basic-button"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={this.handleClick}
                                   >
                                        <PiListDashesBold className="text-dark menu-list-item" />
                                   </Button>
                                   <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={this.handleClose}
                                        MenuListProps={{
                                             'aria-labelledby': 'basic-button',
                                        }}
                                   >
                                        <MenuItem onClick={this.openModal}>Profile</MenuItem>
                                        <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                                   </Menu>
                              </div>
                         </div>
                    </div>
               </div>
          );
     }
}

const mapStateToProps = (state) => {
     return {
          isLoggedIn: state.user.isLoggedIn,
          language: state.app.language,
          userInfo: state.user.userInfo,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          // changeLanguageAppRedux: (language) => {
          //      dispatch(changeLanguageApp(language));
          // },
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
