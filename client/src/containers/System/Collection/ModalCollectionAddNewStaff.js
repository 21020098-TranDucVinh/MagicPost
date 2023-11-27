import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as services from '../../../services/index';
import { Modal } from 'reactstrap';
import Select from 'react-select';
import toast from 'react-hot-toast';
import * as actions from '../../../store/actions/index';
class ModalCollectionAddNewStaff extends Component {
     constructor(props) {
          super(props);
          this.state = {
               userName: '',
               phone: '',
               password: '',
               rePassword: '',
               zip_code: '',
               address: '',
               optionSelectionCollections: [],
               selectedCollection: '',
          };
     }
     async componentDidMount() {
          this.props.getAllCollections();
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.arrCollections !== this.props.arrCollections) {
               this.setState({
                    optionSelectionCollections: this.buildOptionSelectCollections(this.props.arrCollections),
               });
          }
          if (prevProps.dataEditStaff !== this.props.dataEditStaff) {
               let data = this.props.dataEditStaff;
               this.setState({
                    userName: data.username,
                    phone: data.phone,
                    password: data.password,
                    rePassword: data.password,
               });
          }
     }
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
     handleChangeTransaction = (selectedCollection) => {
          this.setState({ selectedCollection });
     };
     // Handle on change input
     handleOnchangeInput = (event, id) => {
          let copyState = this.state;
          copyState[id] = event.target.value;
          this.setState({
               ...copyState,
          });
     };
     // Check password and re-enter password equals
     checkInputPasswordValid = (password, rePassword) => {
          if (password !== rePassword) {
               return false;
          }
          return true;
     };
     // create new transaction staff
     handleCollectionCreateNewStaff = async () => {
          let checkInputPasswordValid = this.checkInputPasswordValid();
          let data = {
               username: this.state.userName,
               phone: this.state.phone,
               password: this.state.password,
               zip_code: this.state.selectedCollection.value,
          };
          if (checkInputPasswordValid) {
               let res = await services.handleCollectionCreateNewStaff(data);
               if (res && res.errorCode === 0) {
                    toast.success('Create new staff success!');
                    this.props.getCollectionStaffById();
                    this.props.isCloseModal();
                    this.setState({
                         userName: '',
                         phone: '',
                         password: '',
                         rePassword: '',
                         zip_code: '',
                         address: '',
                    });
               } else {
                    toast.error('Create new staff Failed!');
               }
          }
     };
     // close modal
     handleCloseModal = () => {
          this.props.isCloseModal();
     };
     // edit collection staff
     handleCollectionEditStaff = async () => {
          let { password, phone, selectedCollection, userName } = this.state;
          let data = {
               username: userName,
               staff_id: this.props.dataEditStaff.staff_id,
               password: password,
               phone: phone.toString(),
               transaction_zip_code: null,
               collection_zip_code: selectedCollection.value,
          };
          // console.log('check data :', data);
          if (data.staff_id && data.password && data.phone && data.collection_zip_code) {
               let res = await services.editTransactionStaff(data);
               if (res && res.errorCode === 0) {
                    toast.success(res.message);
                    this.props.getCollectionStaffById();
                    this.props.isCloseModal();
               }
          }
     };
     // chose between function create or edit
     handleChoseBetweenCreateOrUpdate = () => {
          if (this.props.isEditStaff) {
               this.handleCollectionEditStaff();
          } else {
               this.handleCollectionCreateNewStaff();
          }
     };
     render() {
          let { isOpen, isEditStaff } = this.props;
          let { optionSelectionCollections, selectedCollection } = this.state;
          return (
               <>
                    <Modal className="modal-admin-container" isOpen={isOpen} size="lg" centered>
                         <div className="modal-admin-content">
                              <div className="modal-admin-header">
                                   <span className="left">Add new staff </span>
                                   <span className="right" onClick={() => this.handleCloseModal()}>
                                        <i className="fa fa-times"></i>
                                   </span>
                              </div>
                              <div className="modal-admin-body">
                                   <div className="row">
                                        <div className="col-6 form-group">
                                             <label>Chose Collection</label>
                                             <Select
                                                  value={selectedCollection}
                                                  placeholder={<div>Your Manager</div>}
                                                  onChange={this.handleChangeTransaction}
                                                  options={optionSelectionCollections}
                                             />
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>User Name</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.userName}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'userName')}
                                                  placeholder="Your Name"
                                             ></input>
                                        </div>
                                        <div className="col-6 form-group">
                                             <label>Phone</label>
                                             <input
                                                  type="text"
                                                  className="form-control"
                                                  value={this.state.phone}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'phone')}
                                                  placeholder="Your Phone"
                                             ></input>
                                        </div>

                                        <div className="col-6 form-group">
                                             <label>Password</label>
                                             <input
                                                  type="password"
                                                  className="form-control"
                                                  value={this.state.password}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'password')}
                                                  placeholder="Your Password"
                                             ></input>
                                        </div>

                                        <div className="col-6 form-group">
                                             <label>Re-enter password</label>
                                             <input
                                                  type="password"
                                                  className="form-control"
                                                  value={this.state.rePassword}
                                                  onChange={(event) => this.handleOnchangeInput(event, 'rePassword')}
                                                  placeholder="Your Password"
                                             ></input>
                                        </div>
                                   </div>
                              </div>
                              <div className="modal-admin-footer">
                                   <button
                                        className={isEditStaff === true ? 'btn btn-warning px-3' : 'btn btn-primary'}
                                        onClick={() => this.handleChoseBetweenCreateOrUpdate()}
                                   >
                                        <span>
                                             {isEditStaff === true && 'Save'}
                                             {isEditStaff === false && 'Create'}
                                        </span>
                                   </button>
                                   <button className="btn btn-danger" onClick={() => this.handleCloseModal()}>
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
          dataEditStaff: state.adminTransaction.dataEditStaff,
          isEditStaff: state.adminTransaction.isEditStaff,
          arrCollections: state.admin.arrCollections,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getCollectionStaffById: () => dispatch(actions.getCollectionStaffByIdAction()),
          getAllCollections: () => dispatch(actions.getAllCollectionsAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalCollectionAddNewStaff);
