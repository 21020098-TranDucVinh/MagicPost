import React, { Component } from 'react';
import { connect } from 'react-redux';
import './commonSsssModal.scss';
import { Modal } from 'reactstrap';
import 'flatpickr/dist/themes/material_green.css';
import { toast } from 'react-toastify';
import * as actions from '../../../../store/actions/index';
import Select from 'react-select';
import { handleCreateNewTransition } from '../../../../services/adminService';

class ModalManageTransition extends Component {
     constructor(props) {
          super(props);
          this.state = {
               name: '',
               collection_zip_code: '',
               address: '',
               arrUsersPending: '',
               arrCollections: [],
               selectedAdmin: {},
               selectedCollection: {},
               optionSelectionAdmins: [],
               optionSelectionCollections: [],
          };
     }
     async componentDidMount() {
          await this.props.getAllUserPending();
          await this.props.getAllCollections();
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.arrUsersPending !== this.props.arrUsersPending) {
               this.setState({
                    arrUsersPending: this.props.arrUsersPending,
                    optionSelectionAdmins: this.buildOptionSelectAdmin(this.props.arrUsersPending),
               });
          }
          if (prevProps.arrCollections !== this.props.arrCollections) {
               this.setState({
                    arrCollections: this.props.arrCollections,
                    optionSelectionCollections: this.buildOptionSelectCollections(this.props.arrCollections),
               });
          }
     }
     buildOptionSelectAdmin = (admins) => {
          let optionAdmins = '';
          if (admins && admins.length > 0) {
               optionAdmins = admins.map((item, index) => {
                    let obj = {};
                    obj.value = item.id;
                    obj.label = item.username;
                    return obj;
               });
          }

          return optionAdmins;
     };
     buildOptionSelectCollections = (collections) => {
          let optionCollections = '';
          if (collections && collections.length > 0) {
               optionCollections = collections.map((item, index) => {
                    let obj = {};
                    obj.value = item.zip_code;
                    obj.label = item.name;
                    return obj;
               });
          }
          return optionCollections;
     };
     handleChangeSelectAmin = (selectedAdmin) => {
          this.setState({ selectedAdmin });
     };

     handleChangeSelectCollection = (selectedCollection) => {
          this.setState({ selectedCollection: selectedCollection });
     };
     handleOnchangeInput = (event, id) => {
          let copyState = this.state;
          copyState[id] = event.target.value;
          this.setState({
               ...copyState,
          });
     };
     checkInputValid = () => {
          let input = ['name', 'selectedCollection', 'selectedAdmin', 'address'];
          for (let i = 0; i < input.length; i++) {
               if (!this.state[input[i]]) {
                    return false;
               }
          }
          return true;
     };
     createNewTransition = async () => {
          let { selectedAdmin, name, address, selectedCollection } = this.state;
          let checkInputValid = this.checkInputValid();
          let data = {
               admin_id: selectedAdmin.value,
               name: name,
               collection_zip_code: selectedCollection.value,
               address: address,
          };
          console.log('check data ; ', data);
          if (checkInputValid) {
               console.log('OK');
               let res = await handleCreateNewTransition(data);
               console.log('check res : ', res);
               if (res && res.errorCode === 0) {
                    toast.success(res.msg);
                    this.props.getAllTransitions();
               } else {
                    toast.error(res.msg);
               }
          } else {
               toast.error('Please full fill information');
          }
     };
     render() {
          let { isOpen, isCloseModal } = this.props;
          let { selectedAdmin, optionSelectionAdmins, selectedCollection, optionSelectionCollections } = this.state;
          // console.log('thach pending : ', this.state.arrUsersPending);
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
                                             <label>Chose admin</label>
                                             <Select
                                                  value={selectedAdmin}
                                                  onChange={this.handleChangeSelectAmin}
                                                  options={optionSelectionAdmins}
                                             />
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Collection zip code</label>
                                             <Select
                                                  value={selectedCollection}
                                                  onChange={this.handleChangeSelectCollection}
                                                  options={optionSelectionCollections}
                                             />
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Name</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.name}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'name')}
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
          arrUsersPending: state.admin.arrUsersPending,
          arrCollections: state.admin.arrCollections,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllUserPending: () => dispatch(actions.getAllUserPendingAction()),
          getAllTransitions: () => dispatch(actions.getAllTransitionsAction()),
          getAllCollections: () => dispatch(actions.getAllCollectionsAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalManageTransition);
