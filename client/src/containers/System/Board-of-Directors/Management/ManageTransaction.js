import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../AdminManagement.scss';
import ModalManageTransaction from '../AdminModal/ModalManageTransaction';
import { deleteTransactionById } from '../../../../services/adminService';
import { toast } from 'react-toastify';
import * as actions from '../../../../store/actions/index';
class ManageTransaction extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               arrTransactions: [],
               isEditTransaction: false,
               transactionEdit: '',
          };
     }
     async componentDidMount() {
          let res = await this.props.getAllTransactions();
          console.log('check res : ', res);
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          console.log('check props tran : ', this.props.arrTransactions);
          if (prevProps.arrTransactions !== this.props.arrTransactions) {
               this.setState({
                    arrTransactions: this.props.arrTransactions,
               });
          }
          if (prevProps.arrUsersPending !== this.props.arrUsersPending) {
               this.setState({
                    arrUsersPending: this.props.arrUsersPending,
               });
          }
     }
     isOpenModalCreateTransaction = () => {
          this.setState({
               isOpenModal: true,
          });
     };
     isCloseModal = () => {
          this.setState({
               isOpenModal: false,
          });
     };
     handleEditUser = () => {
          alert('edit');
     };
     handleDeleteTransaction = async (id) => {
          let res = await deleteTransactionById(id);
          if (res && res.errorCode === 0) {
               await this.props.getAllTransactions();
               toast.success('Delete Transaction success');
          } else {
               toast.success('Delete Transaction failed');
          }
     };
     isOpenModalEditTransaction = (transaction) => {
          this.setState({
               isEditTransaction: true,
               isOpenModal: true,
               transactionEdit: transaction,
          });
     };
     render() {
          let { arrTransactions, isEditTransaction, transactionEdit } = this.state;
          console.log('check transaction : ', arrTransactions);
          return (
               <>
                    <div className="admin-container">
                         <ModalManageTransaction
                              isOpen={this.state.isOpenModal}
                              isCloseModal={this.isCloseModal}
                              transactionEdit={isEditTransaction ? transactionEdit : ''}
                         />

                         <div className="title-admin text-center my-4">Manage Transaction</div>
                         <div className="admin-content container">
                              <div className="btn-director-add-new-user-container">
                                   <div className="btn-create-new-user-container">
                                        <button
                                             // className="btn-create-new-user"
                                             className="btn btn-primary"
                                             onClick={() => this.isOpenModalCreateTransaction()}
                                        >
                                             <i className="fas fa-plus"></i>
                                             <span>Add New User</span>
                                        </button>
                                   </div>
                              </div>
                              <div className="table-user-content mt-2 mb-3 ">
                                   <table className="table table-hover customers">
                                        <thead className="text-center">
                                             <tr>
                                                  <th className="STT">#</th>
                                                  <th>Zip code</th>
                                                  <th>Name</th>
                                                  <th>Collection zip code</th>
                                                  <th>Address</th>
                                                  <th>Admin's Name</th>
                                                  <th>Actions</th>
                                             </tr>
                                        </thead>
                                        <tbody className="text-center">
                                             {arrTransactions &&
                                                  arrTransactions.map((item, index) => {
                                                       return (
                                                            <tr key={index}>
                                                                 <td>{index + 1}</td>

                                                                 <td className="break-word">{item.zip_code}</td>
                                                                 <td className="break-word">{item.name}</td>
                                                                 <td className="break-word">
                                                                      {item.collection_zip_code}
                                                                 </td>
                                                                 <td className="break-word">{item.address}</td>
                                                                 <td className="break-word">{item.admin_id}</td>
                                                                 <td>
                                                                      <button
                                                                           className="btn-edit"
                                                                           onClick={() =>
                                                                                this.isOpenModalEditTransaction(item)
                                                                           }
                                                                      >
                                                                           <i className="fas fa-pencil-alt"></i>
                                                                      </button>
                                                                      <button
                                                                           className="btn-delete"
                                                                           onClick={() =>
                                                                                this.handleDeleteTransaction(
                                                                                     item.zip_code,
                                                                                )
                                                                           }
                                                                      >
                                                                           <i className="fas fa-trash"></i>
                                                                      </button>
                                                                 </td>
                                                            </tr>
                                                       );
                                                  })}
                                        </tbody>
                                   </table>
                              </div>
                         </div>
                    </div>
               </>
          );
     }
}

const mapStateToProps = (state) => {
     return {
          arrTransactions: state.admin.arrTransactions,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllTransactions: () => dispatch(actions.getAllTransactionsAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTransaction);