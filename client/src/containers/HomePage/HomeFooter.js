import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaFacebookF } from 'react-icons/fa';
import './HomeFooter.scss';
import { FaTwitter } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { CiLinkedin } from 'react-icons/ci';
import { FaGithub } from 'react-icons/fa';
class HomeFooter extends Component {
     state = {};

     componentDidMount() {}

     render() {
          return (
               <footer className="section-home-footer-container">
                    <section className="media-container p-3">
                         <a data-mdb-ripple-init className="btn btn-link btn-floating btn-lg text-body m-1" href="#!">
                              <FaFacebookF />
                         </a>

                         <a data-mdb-ripple-init className="btn btn-link btn-floating btn-lg text-body m-1" href="#!">
                              <FaTwitter />
                         </a>
                         <a data-mdb-ripple-init className="btn btn-link btn-floating btn-lg text-body m-1" href="#!">
                              <FaGoogle />
                         </a>
                         <a data-mdb-ripple-init className="btn btn-link btn-floating btn-lg text-body m-1" href="#!">
                              <FaInstagram />
                         </a>
                         <a data-mdb-ripple-init className="btn btn-link btn-floating btn-lg text-body m-1" href="#!">
                              <CiLinkedin />
                         </a>
                         <a data-mdb-ripple-init className="btn btn-link btn-floating btn-lg text-body m-1" href="#!">
                              <FaGithub />
                         </a>
                    </section>
                    <div className="section-home-footer">
                         <div className="text-center p-3 text-dark">
                              © 2020 Copyright:
                              <a className="text-reset fw-bold" href="https://google.com/">
                                   MagicPost.com
                              </a>
                         </div>
                    </div>
               </footer>
          );
     }
}

const mapStateToProps = (state) => {
     return {};
};

const mapDispatchToProps = (dispatch) => {
     return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
