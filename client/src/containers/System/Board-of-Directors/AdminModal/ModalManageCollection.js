import React, { Component } from 'react';
import { connect } from 'react-redux';
import './commonSsssModal.scss';
import { Modal } from 'reactstrap';
import 'flatpickr/dist/themes/material_green.css';
import { toast } from 'react-toastify';
import Select from 'react-select';
import * as actions from '../../../../store/actions/index';
import { handleCreateNewCollection } from '../../../../services/adminService';
class ModalManageCollection extends Component {
     constructor(props) {
          super(props);
          this.state = {
               name: '',
               address: '',
               selectedAdmin: '',
               optionSelectionAdmins: [],
          };
     }
     async componentDidMount() {
          this.props.getAllUserPending();
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.arrUsersPending !== this.props.arrUsersPending) {
               this.setState({
                    arrUsersPending: this.props.arrUsersPending,
                    optionSelectionAdmins: this.buildOptionSelectAdmin(this.props.arrUsersPending),
               });
          }
          if (prevProps.dataCollectionEdit !== this.props.dataCollectionEdit) {
               this.setState({
                    name: this.props.dataCollectionEdit.name,
                    address: this.props.dataCollectionEdit.address,
                    selectedAdmin: '',
               });
          }
     }
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
               console.log('check res :', res);
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

     render() {
          let { isOpen, isCloseModal } = this.props;
          let { selectedAdmin, optionSelectionAdmins } = this.state;

          return (
               <>
                    <Modal className="modal-admin-container" isOpen={isOpen} size="lg" centered>
                         <div className="modal-admin-content">
                              <div className="modal-admin-header">
                                   <span className="left">Add new Collection</span>
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
                                                  placeholder={<div>Your admin</div>}
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
                                             ></input>
                                        </div>

                                        <div className="col-12 form-group">
                                             <label>The address of the Collection</label>
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
                                        className="btn-add-new-user-confirm "
                                        // className={
                                        //      isEditTransaction === true ? 'btn-edit' : 'btn-add-new-user-confirm '
                                        // }
                                        onClick={() => this.createNewCollection()}
                                   >
                                        {/* {isEditTransaction ? 'Save' : 'Create'} */}
                                        create
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
          arrUsersPending: state.admin.arrUsersPending,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllUserPending: () => dispatch(actions.getAllUserPendingAction()),
          getAllCollections: () => dispatch(actions.getAllCollectionsAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalManageCollection);
