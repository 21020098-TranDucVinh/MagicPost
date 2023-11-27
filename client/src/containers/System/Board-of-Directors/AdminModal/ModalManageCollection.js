import React, { Component } from 'react';
import { connect } from 'react-redux';
import './commonSsssModal.scss';
import { Modal } from 'reactstrap';

import toast from 'react-hot-toast';
import Select from 'react-select';
import * as actions from '../../../../store/actions/index';
import { handleCreateNewCollection, editCollection } from '../../../../services/adminService';
class ModalManageCollection extends Component {
     constructor(props) {
          super(props);
          this.state = {
               name: '',
               address: '',
               selectedAdmin: '',
               optionSelectionAdmins: [],
               zip_code: '',
          };
     }
     async componentDidMount() {
          this.props.getAllUserPending();
          this.props.getAllAdminCollections();
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.arrAdminsPending !== this.props.arrAdminsPending) {
               this.setState({
                    arrAdminsPending: this.props.arrAdminsPending,
                    optionSelectionAdmins: this.buildOptionSelectAdmin(this.props.arrAdminsPending),
               });
          }
          if (prevProps.dataEditCollection !== this.props.dataEditCollection) {
               console.log('check props edit colleciton : ', this.props.dataCollectionEdit);
               this.setState({
                    zip_code: this.props.dataEditCollection.zip_code,
                    name: this.props.dataEditCollection.name,
                    address: this.props.dataEditCollection.address,
                    selectedAdmin: this.buildSelectionAdmin(
                         this.props.dataEditCollection.admin_id,
                         this.props.arrAllAdminCollections,
                    ),
               });
          }
     }
     // build to setState for selectedAdmin
     buildSelectionAdmin = (admin_id, arrAllAdminCollections) => {
          let selectAdmin = {};
          if (arrAllAdminCollections.length > 0) {
               for (let i = 0; i < arrAllAdminCollections.length; i++) {
                    if (admin_id === arrAllAdminCollections[i].id) {
                         selectAdmin.value = admin_id;
                         selectAdmin.label = arrAllAdminCollections[i].username;

                         return selectAdmin;
                    }
               }
          }
          return {};
     };
     // onchange info input
     handleOnchangeInput = (event, id) => {
          let copyState = this.state;
          copyState[id] = event.target.value;
          this.setState({
               ...copyState,
          });
     };
     // build options to select admin
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
     // On change select admin
     handleChangeSelectAmin = (selectedAdmin) => {
          this.setState({ selectedAdmin });
     };
     // check user fill full info
     checkInputValid = () => {
          let input = ['selectedAdmin', 'name', 'address'];
          for (let i = 0; i < input.length; i++) {
               if (!this.state[input[i]]) {
                    return false;
               }
          }
          return true;
     };
     // Create new Collection
     createNewCollection = async () => {
          let data = {
               admin_id: this.state.selectedAdmin.value,
               name: this.state.name,
               address: this.state.address,
          };
          let checkInputValid = this.checkInputValid();
          if (checkInputValid) {
               let res = await handleCreateNewCollection(data);

               if (res && res.errorCode === 0) {
                    toast.success('Create Collection success!');
                    this.props.getAllCollections();
                    this.setState({
                         name: '',
                         address: '',
                         selectedAdmin: '',
                    });
                    this.props.isCloseModal();
               } else {
                    toast.error('Create Collection failed!');
               }
          } else {
               toast.error('Please full fill your form!');
          }
     };
     // Create new Collection
     handleEditCollection = async () => {
          let data = {
               zip_code: this.state.zip_code,
               admin_id: this.state.selectedAdmin.value,
               name: this.state.name,
               address: this.state.address,
          };
          console.log('data edit collection : ', data);
          let checkInputValid = this.checkInputValid();
          if (checkInputValid) {
               let res = await editCollection(data);
               if (res && res.errorCode === 0) {
                    toast.success('Update Collection success!');
                    this.props.getAllCollections();
                    this.props.getAllAdminCollections();
                    this.props.getAllUserPending();
                    this.setState({
                         name: '',
                         address: '',
                         selectedAdmin: '',
                    });
                    this.props.isCloseModal();
               } else {
                    toast.error('Update Collection failed!');
               }
          } else {
               toast.error('Please full fill your form!');
          }
     };
     handleCloseModal = () => {
          this.props.isCloseModal();
          this.props.clearDataEditCollection();
          this.setState({
               name: '',
               address: '',
               selectedAdmin: '',
          });
     };
     handleOnClickChoseBetCreateOrUpdate = () => {
          if (this.props.isEditCollection) {
               console.log('vao day');
               this.handleEditCollection();
          } else {
               this.createNewCollection();
          }
     };
     render() {
          let { isOpen } = this.props;
          let { selectedAdmin, optionSelectionAdmins } = this.state;
          let { isEditCollection } = this.props;
          return (
               <>
                    <Modal className="modal-admin-container" isOpen={isOpen} size="lg" centered>
                         <div className="modal-admin-content">
                              <div className="modal-admin-header">
                                   <span className="left">Add new Collection</span>
                                   <span className="right" onClick={() => this.handleCloseModal()}>
                                        <i className="fa fa-times"></i>
                                   </span>
                              </div>
                              <div className="modal-admin-body">
                                   <div className="row">
                                        <div className="col-6 form-group">
                                             <label>Chose Manager</label>
                                             <Select
                                                  value={selectedAdmin}
                                                  placeholder={<div>Your Manager</div>}
                                                  onChange={this.handleChangeSelectAmin}
                                                  options={optionSelectionAdmins}
                                             />
                                        </div>

                                        <div className="col-6 form-group">
                                             <label>The name of the Collection</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.name}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'name')}
                                                  placeholder="Name of collection"
                                             ></input>
                                        </div>

                                        <div className="col-12 form-group">
                                             <label>The address of the Collection</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.address}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                                  placeholder="Address of Collection"
                                             ></input>
                                        </div>
                                   </div>
                              </div>
                              <div className="modal-admin-footer">
                                   <button
                                        className={isEditCollection === true ? 'btn btn-warning' : 'btn btn-primary '}
                                        onClick={() => this.handleOnClickChoseBetCreateOrUpdate()}
                                   >
                                        {isEditCollection === true ? 'Save' : 'Create'}
                                   </button>
                                   <button className="btn-danger" onClick={() => this.handleCloseModal()}>
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
          arrAllAdminCollections: state.admin.arrAllAdminCollections,
          arrAdminsPending: state.admin.arrAdminsPending,
          isEditCollection: state.admin.isEditCollection,
          dataEditCollection: state.admin.dataEditCollection,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllUserPending: () => dispatch(actions.getAllUserPendingAction()),
          getAllCollections: () => dispatch(actions.getAllCollectionsAction()),
          getAllAdminCollections: () => dispatch(actions.getAllAdminCollectionsAction()),
          doEditCollection: () => dispatch(actions.isEditCollectionAction()),
          clearDataEditCollection: () => dispatch(actions.clearDataEditCollectionAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalManageCollection);
