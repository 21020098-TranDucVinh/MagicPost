import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../AdminManagement.scss';
import ModalManageParcel from '../AdminModal/ModalManageParcel';
import HomeFooter from '../../../HomePage/HomeFooter';
class ManageParcel extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               arrParcels: [],
          };
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
     handleDeleteUser = () => {
          alert('delete');
     };
     render() {
          let { arrParcels } = this.state;
          return (
               <>
                    {/* <div className="admin-container container">
                         <ModalManageParcel isOpen={this.state.isOpenModal} isCloseModal={this.isCloseModal} />
                         <div className="title-admin text-center my-4">Statistic Parcel</div>
                         <div className="admin-content">
                              <div className="btn-director-add-new-user-container">
                                   <div className="btn-create-new-user-container">
                                        <button
                                             className="btn-create-new-user"
                                             onClick={() => this.directorCreateParcel()}
                                        >
                                             <i className="fas fa-plus"></i>
                                             <span>Add Parcel</span>
                                        </button>
                                   </div>
                              </div>
                              <div className="table-user-content mt-2 px-5 mb-3 ">
                                   <table className="customers table">
                                        <thead>
                                             <tr>
                                                  <th>status</th>
                                                  <th>senderName</th>
                                                  <th>senderPhone</th>
                                                  <th>from</th>
                                                  <th>receiverName</th>
                                                  <th>receiverPhone</th>
                                                  <th>toAddress</th>
                                                  <th>type</th>
                                                  <th>senderZipCode</th>
                                                  <th>receiverZipCode</th>
                                                  <th>cost</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {arrUsers &&
                                                  arrUsers.map((item, index) => {
                                                       return (
                                                            <tr>
                                                                 <td>{item.email}</td>
                                                                 <td>{item.firstName}</td>
                                                                 <td>{item.lastName}</td>
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
                                                                                this.handleDeleteUser(item.className)
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
                    </div> */}
                    <div className="admin-container">
                         <ModalManageParcel isOpen={this.state.isOpenModal} isCloseModal={this.isCloseModal} />

                         <div className="title-admin text-center my-4">Create Account</div>
                         <div className="admin-content container">
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
                              <div className="table-user-content mt-2 mb-3 ">
                                   <table className="table table-hover customers container">
                                        <thead className="text-center">
                                             <tr>
                                                  <th scope="col">#</th>
                                                  <th>senderName</th>
                                                  <th>senderZipCode</th>
                                                  <th>senderPhone</th>
                                                  <th>from</th>
                                                  <th>receiverName</th>
                                                  <th>receiverPhone</th>
                                                  <th>status</th>
                                                  <th>toAddress</th>
                                                  <th>type</th>
                                                  <th>cost</th>
                                             </tr>
                                        </thead>
                                        <tbody className="text-center">
                                             {arrParcels &&
                                                  arrParcels.map((item, index) => {
                                                       return (
                                                            <tr>
                                                                 <td>{item.email}</td>
                                                                 <td>{item.firstName}</td>
                                                                 <td>{item.lastName}</td>
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
                                                                                this.handleDeleteUser(item.className)
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageParcel);
