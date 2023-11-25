import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminManagement.scss';
import AdminModalAddNewUser from './AdminModal/AdminModalAddNewUser';
import * as actions from '../../../store/actions/index';
import { deleteUserPending } from '../../../services/adminService';
import toast from 'react-hot-toast';
class AdminManagement extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               arrAdminsPending: [],
          };
     }

     async componentDidMount() {
          let res = await this.props.getAllUserPending();
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.arrAdminsPending !== this.props.arrAdminsPending) {
               this.setState({
                    arrAdminsPending: this.props.arrAdminsPending,
               });
          }
     }
     // Close modal
     isCloseModal = () => {
          this.setState({
               isOpenModal: false,
          });
     };
     // Delete admin pending
     handleDeleteUserPending = async (id) => {
          if (id) {
               let res = await deleteUserPending(id);
               console.log(res);
               if (res && res.errorCode === 0) {
                    toast.success(res.message);
                    await this.props.getAllUserPending();
               } else {
                    toast.error(res.message);
               }
          }
     };
     // open modal edit admin pending
     openModalEditUserPending = (user) => {
          this.props.fetchDataEditPendingAdmin(user);
          this.props.isEditAdminPending();
          this.setState({
               isOpenModal: true,
               isEditUser: true,
          });
     };
     OpenModalCrateNewAdminPending = () => {
          this.props.isNotEditAdminPending();
          this.setState({
               isOpenModal: true,
          });
     };
     render() {
          let { arrAdminsPending } = this.state;
          return (
               <>
                    <div className="admin-container my-3">
                         <AdminModalAddNewUser isOpen={this.state.isOpenModal} isCloseModal={this.isCloseModal} />

                         <div className="title-admin text-center my-4">
                              <span>Create Account</span>
                         </div>
                         <div className="admin-content container">
                              <div className="btn-director-add-new-user-container">
                                   <div className="btn-create-new-user-container">
                                        <button
                                             // className="btn-create-new-user"
                                             className="btn btn-primary"
                                             onClick={() => this.OpenModalCrateNewAdminPending()}
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
                                                  <th scope="col">#</th>
                                                  <th>userName</th>
                                                  <th>Phone</th>
                                                  <th>Role</th>
                                                  <th>Actions</th>
                                             </tr>
                                        </thead>
                                        <tbody className="text-center">
                                             {arrAdminsPending &&
                                                  arrAdminsPending.map((item, index) => {
                                                       return (
                                                            <tr>
                                                                 <td>{index + 1}</td>
                                                                 <td>{item.username}</td>
                                                                 <td>{item.phone}</td>
                                                                 <td>{item.role}</td>
                                                                 <td>
                                                                      <button
                                                                           className="btn-edit"
                                                                           onClick={() =>
                                                                                this.openModalEditUserPending(item)
                                                                           }
                                                                      >
                                                                           <i className="fas fa-pencil-alt"></i>
                                                                      </button>
                                                                      <button
                                                                           className="btn-delete"
                                                                           onClick={() =>
                                                                                this.handleDeleteUserPending(item.id)
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
          arrAdminsPending: state.admin.arrAdminsPending,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllUserPending: () => dispatch(actions.getAllUserPendingAction()),
          fetchDataEditPendingAdmin: (user) => dispatch(actions.fetchDataEditPendingAdminAction(user)),
          isEditAdminPending: () => dispatch(actions.isEditAdminPendingAction()),
          isNotEditAdminPending: () => dispatch(actions.isNotEditAdminPendingAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminManagement);
