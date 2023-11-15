import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminManagement.scss';
import AdminModalAddNewUser from './AdminModal/AdminModalAddNewUser';
import { getAllUserPending } from '../../.././services/userService';
import * as actions from '../../../store/actions/index';
class AdminManagement extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               arrUsersPending: [],
          };
     }

     async componentDidMount() {
          let res = await this.props.getAllUserPending();
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.arrUsersPending !== this.props.arrUsersPending) {
               this.setState({
                    arrUsersPending: this.props.arrUsersPending,
               });
          }
     }
     directorDandleCreateNewUser = () => {
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
     handleDeleteUser = () => {
          alert('delete');
     };
     handleDeleteUserPending = () => {};
     render() {
          let { arrUsersPending } = this.state;
          console.log('check user : ', arrUsersPending);
          return (
               <>
                    <div className="admin-container container">
                         <AdminModalAddNewUser isOpen={this.state.isOpenModal} isCloseModal={this.isCloseModal} />

                         <div className="title-admin text-center my-4">Create Account</div>
                         <div className="admin-content">
                              <div className="btn-director-add-new-user-container">
                                   <div className="btn-create-new-user-container">
                                        <button
                                             className="btn-create-new-user"
                                             onClick={() => this.directorDandleCreateNewUser()}
                                        >
                                             <i className="fas fa-plus"></i>
                                             <span>Add New User</span>
                                        </button>
                                   </div>
                              </div>
                              <div className="table-user-content mt-2 px-5 mb-3 ">
                                   <table className="customers">
                                        <thead>
                                             <tr>
                                                  <th>userName</th>
                                                  <th>Phone</th>
                                                  <th>Role</th>
                                                  <th>Actions</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {arrUsersPending &&
                                                  arrUsersPending.map((item, index) => {
                                                       return (
                                                            <tr>
                                                                 <td>{item.username}</td>
                                                                 <td>{item.phone}</td>
                                                                 <td>{item.role}</td>
                                                                 <td>
                                                                      <button
                                                                           className="btn-edit"
                                                                           onClick={() => this.handleEditUser(item)}
                                                                      >
                                                                           <i className="fas fa-pencil-alt"></i>
                                                                      </button>
                                                                      <button
                                                                           className="btn-delete"
                                                                           onClick={() =>
                                                                                this.handleDeleteUserPending(
                                                                                     item.className,
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
          arrUsersPending: state.admin.arrUsersPending,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllUserPending: () => dispatch(actions.getAllUserPendingAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminManagement);
