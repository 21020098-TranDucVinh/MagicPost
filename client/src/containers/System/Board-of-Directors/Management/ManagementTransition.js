import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../AdminManagement.scss';
import ModalManageTransition from '../AdminModal/ModalManageTransition';
import { deleteTransitionById } from '../../.././../services/adminService';
import { toast } from 'react-toastify';
import * as actions from '../../../../store/actions/index';
class ManagementTransition extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               arrTransitions: [],
               isEditTransaction: false,
               transactionEdit: '',
          };
     }
     async componentDidMount() {
          await this.props.getAllTransitions();
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.arrTransitions !== this.props.arrTransitions) {
               this.setState({
                    arrTransitions: this.props.arrTransitions,
               });
          }
          if (prevProps.arrUsersPending !== this.props.arrUsersPending) {
               this.setState({
                    arrUsersPending: this.props.arrUsersPending,
               });
          }
     }
     isOpenModalCreateTransition = () => {
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
     handleDeleteTransition = async (id) => {
          let res = await deleteTransitionById(id);
          if (res && res.errorCode === 0) {
               await this.props.getAllTransitions();
               toast.success('Delete Transition success');
          } else {
               toast.success('Delete Transition failed');
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
          let { arrTransitions, isEditTransaction, transactionEdit } = this.state;

          return (
               <>
                    <div className="admin-container">
                         <ModalManageTransition
                              isOpen={this.state.isOpenModal}
                              isCloseModal={this.isCloseModal}
                              transactionEdit={isEditTransaction ? transactionEdit : ''}
                         />

                         <div className="title-admin text-center my-4">Create Account</div>
                         <div className="admin-content container">
                              <div className="btn-director-add-new-user-container">
                                   <div className="btn-create-new-user-container">
                                        <button
                                             // className="btn-create-new-user"
                                             className="btn btn-primary"
                                             onClick={() => this.isOpenModalCreateTransition()}
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
                                             {arrTransitions &&
                                                  arrTransitions.map((item, index) => {
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
                                                                                this.handleDeleteTransition(
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
          arrTransitions: state.admin.arrTransitions,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllTransitions: () => dispatch(actions.getAllTransitionsAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagementTransition);
