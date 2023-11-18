import React, { Component } from 'react';
import { connect } from 'react-redux';
import './commonSsssModal.scss';
import { Modal } from 'reactstrap';
import 'flatpickr/dist/themes/material_green.css';
import { toast } from 'react-toastify';
import * as actions from '../../../../store/actions/index';
import Select from 'react-select';
import { handleCreateNewTransaction } from '../../../../services/adminService';

class ModalManageTransaction extends Component {
     constructor(props) {
          super(props);
          this.state = {
               name: '',
               collection_zip_code: '',
               address: '',
               arrCollections: [],
               selectedAdmin: '',
               selectedCollection: '',
               optionSelectionAdmins: [],
               optionSelectionCollections: [],
               isEditTransaction: false,
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
          if (prevProps.transactionEdit !== this.props.transactionEdit) {
               console.log('tran : ', this.props.transactionEdit);
               this.setState({
                    // transactionEdit: this.props.transactionEdit,
                    isEditTransaction: true,
                    selectedAdmin: this.buildSelectionAdmin(
                         this.props.transactionEdit.admin_id,
                         this.props.arrUsersPending,
                    ),
                    selectedCollection: '',
                    address: this.props.transactionEdit.address,
                    name: this.props.transactionEdit.name,
               });
          }
     }
     // build to setState for selectedAdmin
     buildSelectionAdmin = (id, users) => {
          let selectAdmin = {};
          for (let i = 0; i < users.length; i++) {
               if (id === users.id) {
                    selectAdmin.value = users.id;
                    selectAdmin.label = users.username;
                    break;
               }
          }
          return selectAdmin;
     };
     // build options select admin
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
     //build option select collection
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
     // On change select admin
     handleChangeSelectAmin = (selectedAdmin) => {
          this.setState({ selectedAdmin });
     };
     // onchange selection collection
     handleChangeSelectCollection = (selectedCollection) => {
          this.setState({ selectedCollection: selectedCollection });
     };
     // on change input
     handleOnchangeInput = (event, id) => {
          let copyState = this.state;
          copyState[id] = event.target.value;
          this.setState({
               ...copyState,
          });
     };
     // check password equal re-enter password ?
     checkInputValid = () => {
          let input = ['name', 'selectedCollection', 'selectedAdmin', 'address'];
          for (let i = 0; i < input.length; i++) {
               if (!this.state[input[i]]) {
                    return false;
               }
          }
          return true;
     };
     // create new transaction
     createNewTransaction = async () => {
          let { selectedAdmin, name, address, selectedCollection } = this.state;
          let checkInputValid = this.checkInputValid();
          let data = {
               admin_id: selectedAdmin.value,
               name: name,
               collection_zip_code: selectedCollection.value,
               address: address,
          };
          if (checkInputValid) {
               let res = await handleCreateNewTransaction(data);
               if (res && res.errorCode === 0) {
                    toast.success(res.msg);
                    this.props.getAllTransactions();
                    this.props.isCloseModal();
                    this.setState({
                         name: '',
                         address: '',
                         selectedAdmin: {},
                         selectedCollection: {},
                    });
               } else {
                    toast.error(res.msg);
               }
          } else {
               toast.error('Please full fill information');
          }
     };

     render() {
          let { isOpen, isCloseModal } = this.props;
          let {
               selectedAdmin,
               optionSelectionAdmins,
               selectedCollection,
               optionSelectionCollections,
               isEditTransaction,
          } = this.state;

          return (
               <>
                    <Modal className="modal-admin-container" isOpen={isOpen} size="lg" centered>
                         <div className="modal-admin-content">
                              <div className="modal-admin-header">
                                   <span className="left">Add new transaction</span>
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
                                             <label>Collection zip code</label>
                                             <Select
                                                  value={selectedCollection}
                                                  onChange={this.handleChangeSelectCollection}
                                                  options={optionSelectionCollections}
                                                  placeholder={<div>Your Collection</div>}
                                             />
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>The name of the Transaction</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.name}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'name')}
                                             ></input>
                                        </div>

                                        <div className="col-6 form-group">
                                             <label>The address of the Transaction</label>
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
                                        // className="btn-add-new-user-confirm "
                                        className={isEditTransaction === true ? 'btn btn-warning' : 'btn btn-primary'}
                                        onClick={() => this.createNewTransaction()}
                                   >
                                        {isEditTransaction ? 'Save' : 'Create'}
                                   </button>
                                   <button className="btn-danger" onClick={isCloseModal}>
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
          arrCollections: state.admin.arrCollections,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllUserPending: () => dispatch(actions.getAllUserPendingAction()),
          getAllTransactions: () => dispatch(actions.getAllTransactionsAction()),
          getAllCollections: () => dispatch(actions.getAllCollectionsAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalManageTransaction);
