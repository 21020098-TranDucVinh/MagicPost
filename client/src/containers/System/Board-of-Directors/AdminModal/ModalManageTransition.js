import React, { Component } from 'react';
import { connect } from 'react-redux';
import './commonSsssModal.scss';
import { Modal } from 'reactstrap';
import 'flatpickr/dist/themes/material_green.css';
import { toast } from 'react-toastify';

class ModalManageTransition extends Component {
     constructor(props) {
          super(props);
          this.state = {
               adminId: '',
               name: '',
               collection_zip_code: '',
               address: '',
          };
     }
     componentDidMount() {}
     handleOnchangeInput = (event, id) => {
          let copyState = this.state;
          copyState[id] = event.target.value;
          this.setState({
               ...copyState,
          });
     };
     createNewTransition = () => {
          let data = {
               adminId: this.state.adminId,
               name: this.state.name,
               collection_zip_code: this.state.collection_zip_code,
               address: this.state.address,
          };
     };
     render() {
          let { isOpen, isCloseModal } = this.props;
          return (
               <>
                    <Modal className="modal-admin-container" isOpen={isOpen} size="lg" centered>
                         <div className="modal-admin-content">
                              <div className="modal-admin-header">
                                   <span className="left">Add new transition</span>
                                   <span className="right" onClick={isCloseModal}>
                                        <i className="fa fa-times"></i>
                                   </span>
                              </div>
                              <div className="modal-admin-body">
                                   <div className="row">
                                        <div className="col-6 form-group">
                                             <label>Admin ID</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.adminId}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'adminId')}
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>name</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.name}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'name')}
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Collection zip code</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.collection_zip_code}
                                                  onChange={(event) =>
                                                       this.handleOnchangeInput(event, 'collection_zip_code')
                                                  }
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Address</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.address}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                             ></input>
                                        </div>
                                   </div>
                              </div>
                              <div className="modal-admin-footer">
                                   <button
                                        className="btn-add-new-user-confirm"
                                        onClick={() => this.createNewTransition()}
                                   >
                                        Create
                                   </button>
                                   <button className="btn-add-new-user-cancel" onClick={isCloseModal}>
                                        Cancel
                                   </button>
                              </div>
                         </div>
                    </Modal>
               </>
          );
     }
}

const mapStateToProps = (state) => {
     return {
          language: state.app.language,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          // userDefaultClassSuccess: (userInfo) => dispatch(actions.userDefaultClassSuccess(userInfo)),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalManageTransition);
