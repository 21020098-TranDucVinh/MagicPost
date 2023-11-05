import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../AdminManagement.scss';
import ModalManageTransition from '../AdminModal/ModalManageTransition';
import { getAllTransitions, deleteTransitionById } from '../../.././../services/userService';
import { toast } from 'react-toastify';
class ManagementTransition extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               arrTransitions: [],
          };
     }
     async componentDidMount() {
          let res = await getAllTransitions();
          console.log('check transition :', res);
          if (res && res.errCode === 0) {
               this.setState({
                    arrTransitions: res.data,
               });
          }
     }
     directorCreateParcel = () => {
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
          if (res && res.errCode === 0) {
               toast.success('Delete Transition success');
          } else {
               toast.success('Delete Transition failed');
          }
     };
     render() {
          let { arrTransitions } = this.state;

          return (
               <>
                    <div className="admin-container">
                         <ModalManageTransition isOpen={this.state.isOpenModal} isCloseModal={this.isCloseModal} />
                         <div className="title-admin text-center my-5">Management Transition</div>
                         <div className="btn-director-add-new-user-container">
                              <div className="btn-create-new-user-container">
                                   <button className="btn-create-new-user" onClick={() => this.directorCreateParcel()}>
                                        <i className="fas fa-plus"></i>
                                        <span>Add new transition</span>
                                   </button>
                              </div>
                              <div className="table-user-content mt-2 px-5 mb-3 ">
                                   <table className="customers table">
                                        <thead>
                                             {/* status: '', status: '', senderName: '', senderPhone: '', from: '',
                                             receiverName: '', receiverPhone: '', toAddress: '', type: '',
                                             senderZipCode: '', receiverZipCode: '', cost: '', */}
                                             <tr>
                                                  <th>Admin ID</th>
                                                  <th>Name</th>
                                                  <th>Collection zip code</th>
                                                  <th>Address</th>
                                                  <th>Actions</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {arrTransitions &&
                                                  arrTransitions.map((item, index) => {
                                                       return (
                                                            <tr>
                                                                 <td>{item.zip_code}</td>
                                                                 <td>{item.name}</td>
                                                                 <td>{item.collection_zip_code}</td>
                                                                 <td>{item.address}</td>
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
                                                                                this.handleDeleteTransition(
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
          language: state.app.language,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          // userDefaultClassSuccess: (userInfo) => dispatch(actions.userDefaultClassSuccess(userInfo)),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagementTransition);
