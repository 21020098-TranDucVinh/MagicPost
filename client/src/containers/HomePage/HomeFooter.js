import React, { Component } from 'react';
import { connect } from 'react-redux';

import './HomeFooter.scss';

class HomeFooter extends Component {
     state = {};

     componentDidMount() {}

     render() {
          return (
               <div className="section-home-footer-container">
                    <div className="section-home-footer">
                         {/* <div className="icon-footer mb-2">
                              <i className="fab fa-facebook-f"></i>
                              <i className="fab fa-twitter"></i>
                              <i className="fab fa-google"></i>
                              <i className="fab fa-instagram"></i>
                              <i className="fab fa-linkedin-in"></i>
                              <i className="fab fa-github"></i>
                         </div> */}
                         <div className="copyright-content">
                              &copy; 2023 ,Thạch + Vinh + Bảo
                              {/* <a
                                   className="more-info"
                                   href="https://www.facebook.com/stories/1230080321041475/?source=profile_highlight"
                                   target="blank"
                              >
                                   &#8594; Click here &#8592;
                              </a> */}
                         </div>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
