import React, { Component } from 'react';
import { connect } from 'react-redux';
import './commonSsssModal.scss';
import { Modal } from 'reactstrap';
import toast from 'react-hot-toast';
import * as actions from '../../../../store/actions/index';
import Select from 'react-select';
import { handleCreateNewTransaction, editTransaction } from '../../../../services/adminService';
import { GiCancel } from 'react-icons/gi';
class ModalManageTransaction extends Component {
     constructor(props) {
          super(props);
          this.state = {
               selectedAdmin: '',
               selectedCollection: '',
               name: '',
               collection_zip_code: '',
               address: '',
               arrCollections: [],
               optionSelectionAdmins: [],
               optionSelectionCollections: [],

               transaction_zip_code: '',
          };
     }
     async componentDidMount() {
          await this.props.getAllUserPending();
          await this.props.getAllCollections();
          await this.props.getAllAdminTransactions();
          await this.props.getAllAdminCollections();
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.arrAdminsPending !== this.props.arrAdminsPending) {
               this.setState({
                    arrAdminsPending: this.props.arrAdminsPending,
                    optionSelectionAdmins: this.buildOptionSelectAdmin(this.props.arrAdminsPending),
               });
          }
          if (prevProps.arrCollections !== this.props.arrCollections) {
               this.setState({
                    arrCollections: this.props.arrCollections,
                    optionSelectionCollections: this.buildOptionSelectCollections(this.props.arrCollections),
               });
          }
          if (prevProps.dataEditTransaction !== this.props.dataEditTransaction) {
               let data = this.props.dataEditTransaction;
               this.setState({
                    // isEditTransaction: true,
                    transaction_zip_code: data.zip_code,
                    selectedAdmin: this.buildValueSelectedAdmin(data),
                    selectedCollection: this.buildSelectionCollection(
                         data.collection_zip_code,
                         this.props.arrCollections,
                    ),
                    address: data?.address,
                    name: data?.name,
               });
          }
     }
     // build value for select admin
     buildValueSelectedAdmin = (data) => {
          let res = '';
          if (data && data.admin && data.admin.id && data.admin.username) {
               res = { value: data.admin.id, label: data?.admin.username };
               return res;
          }
          return res;
     };
     //build to setState for selectedCollection
     buildSelectionCollection = (collection_zip_code, arrCollections) => {
          let selectAdmin = {};
          for (let i = 0; i < arrCollections.length; i++) {
               if (collection_zip_code === arrCollections[i].zip_code) {
                    selectAdmin.value = collection_zip_code;
                    selectAdmin.label = arrCollections[i].name;
                    return selectAdmin;
               }
          }
          return '';
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
          try {
               let { selectedAdmin, name, address, selectedCollection } = this.state;
               let checkInputValid = this.checkInputValid();
               let data = {
                    admin_id: selectedAdmin.value,
                    name: name,
                    collection_zip_code: selectedCollection.value,
                    address: address,
               };
               if (checkInputValid) {
                    let token = this.props.userInfo.token;
                    let res = await handleCreateNewTransaction(data, { headers: { Authorization: `Bearer ${token}` } });
                    if (res && res.errorCode === 0) {
                         toast.success(res.msg);
                         this.props.getAllTransactions();
                         this.props.isCloseModal();
                         this.props.getAllUserPending();
                         this.setState({
                              name: '',
                              address: '',
                              selectedAdmin: '',
                              selectedCollection: '',
                         });
                    } else {
                         toast.error(res.msg);
                    }
               } else {
                    toast.error('Please full fill information!');
               }
          } catch (e) {
               console.log(e);
          }
     };
     // Edit transaction
     handleEditTransaction = async () => {
          try {
               let { selectedAdmin, name, address, selectedCollection, transaction_zip_code } = this.state;
               let checkInputValid = this.checkInputValid();
               let data = {
                    zip_code: transaction_zip_code,
                    admin_id: selectedAdmin.value,
                    name: name,
                    collection_zip_code: selectedCollection.value,
                    address: address,
               };
               if (checkInputValid) {
                    const { token } = this.props;
                    let res = await editTransaction(data, { headers: { Authorization: `Bearer ${token}` } });

                    if (res && res.errorCode === 0) {
                         toast.success('Update transaction success!');
                         this.props.getAllTransactions();
                         this.props.isCloseModal();
                         this.props.getAllUserPending();
                         this.props.getAllAdminCollections();
                         this.props.getAllAdminTransactions();
                         this.props.getAllCollections();
                         this.props.clearDataEditTransaction();
                         this.setState({
                              name: '',
                              address: '',
                              selectedAdmin: '',
                              selectedCollection: '',
                         });
                    } else {
                         toast.error('Update transaction failed!');
                    }
               } else {
                    toast.error('Please full fill information');
               }
          } catch (e) {
               console.log(e);
          }
     };
     handleCloseModal = () => {
          this.props.isCloseModal();
          this.props.clearDataEditTransaction();
          this.props.isNotTransaction();
     };
     handleOnClickChoseBetCreateOrUpdate = () => {
          if (this.props.isEditTransaction) {
               this.handleEditTransaction();
          } else {
               this.createNewTransaction();
          }
     };
     render() {
          let { isOpen, isEditTransaction } = this.props;

          let { selectedAdmin, optionSelectionAdmins, selectedCollection, optionSelectionCollections } = this.state;

          return (
               <>
                    <Modal className="modal-admin-container" isOpen={isOpen} size="lg" centered>
                         <div className="modal-admin-content">
                              <div className="modal-admin-header">
                                   <span className="left">Add new transaction</span>
                                   <span className="right" onClick={() => this.handleCloseModal()}>
                                        <GiCancel onClick={this.props.isCloseModal} />
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
                                                  placeholder="Name of Transaction"
                                             ></input>
                                        </div>

                                        <div className="col-6 form-group">
                                             <label>The address of the Transaction</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.address}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'address')}
                                                  placeholder="Address of transaction"
                                             ></input>
                                        </div>
                                   </div>
                              </div>
                              <div className="modal-admin-footer">
                                   <button
                                        // className="btn-add-new-user-confirm "
                                        className={isEditTransaction === true ? 'btn btn-warning' : 'btn btn-primary'}
                                        onClick={() => this.handleOnClickChoseBetCreateOrUpdate()}
                                   >
                                        {isEditTransaction ? 'Save' : 'Create'}
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
          userInfo: state.user.userInfo,
          arrAdminsPending: state.admin.arrAdminsPending,
          arrCollections: state.admin.arrCollections,
          arrAllAdminTransaction: state.admin.arrAllAdminTransaction,
          arrAllAdminCollections: state.admin.arrAllAdminCollections,
          dataEditTransaction: state.admin.dataEditTransaction,
          isEditTransaction: state.admin.isEditTransaction,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllUserPending: () => dispatch(actions.getAllUserPendingAction()),
          getAllTransactions: () => dispatch(actions.getAllTransactionsAction()),
          getAllCollections: () => dispatch(actions.getAllCollectionsAction()),
          getAllAdminTransactions: () => dispatch(actions.getAllAdminTransactionsAction()),
          getAllAdminCollections: () => dispatch(actions.getAllAdminCollectionsAction()),
          clearDataEditTransaction: () => dispatch(actions.clearDataEditTransactionAction()),
          isNotTransaction: () => dispatch(actions.isNotTransactionAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalManageTransaction);
