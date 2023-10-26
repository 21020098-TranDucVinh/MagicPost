import React, { Component } from 'react';
import { connect } from 'react-redux';

// Import css files

class HomeFooter extends Component {
     state = {};

     componentDidMount() {}

     render() {
          return (
               <>
                    <div className="section-home-footer">
                         <p>
                              &copy; 2023 Thach nhe. More information.{' '}
                              <a
                                   className="more-info"
                                   href="https://www.facebook.com/stories/1230080321041475/?source=profile_highlight"
                                   target="blank"
                              >
                                   &#8594; Click here &#8592;
                              </a>
                         </p>
                    </div>
               </>
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
