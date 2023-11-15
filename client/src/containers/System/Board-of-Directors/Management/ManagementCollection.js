import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../AdminManagement.scss';
import ModalManageTransition from '../AdminModal/ModalManageTransition';
import { getAllCollections } from '../../.././../services/userService';
import { toast } from 'react-toastify';
class ManagementCollection extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               arrCollections: [],
          };
     }
     async componentDidMount() {
          let res = await getAllCollections();
          if (res && res.errCode === 0) {
               this.setState({
                    arrCollections: res.data,
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
     handleEditCollection = () => {
          alert('edit');
     };
     render() {
          let { arrCollections } = this.state;

          return (
               <>
                    <div className="admin-container container">
                         <ModalManageTransition isOpen={this.state.isOpenModal} isCloseModal={this.isCloseModal} />
                         <div className="title-admin text-center my-4">Management Collection</div>
                         <div className="admin-content">
                              <div className="btn-director-add-new-user-container">
                                   <div className="btn-create-new-user-container">
                                        <button
                                             className="btn-create-new-user"
                                             onClick={() => this.directorCreateParcel()}
                                        >
                                             <i className="fas fa-plus"></i>
                                             <span>Add new Collection</span>
                                        </button>
                                   </div>
                              </div>
                              <div className="table-user-content mt-2 px-5 mb-3">
                                   <table className="customers table">
                                        <thead>
                                             <tr>
                                                  <th>Zip Code</th>
                                                  <th>Name</th>
                                                  <th>Admin ID</th>
                                                  <th>Address</th>
                                                  <th>Actions</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {arrCollections &&
                                                  arrCollections.map((item, index) => {
                                                       return (
                                                            <tr>
                                                                 <td>{item.zip_code}</td>
                                                                 <td>{item.name}</td>
                                                                 <td>{item.admin_id}</td>
                                                                 <td>{item.address}</td>
                                                                 <td>
                                                                      <button
                                                                           className="btn-edit"
                                                                           onClick={() =>
                                                                                this.handleEditCollection(item)
                                                                           }
                                                                      >
                                                                           <i className="fas fa-pencil-alt"></i>
                                                                      </button>
                                                                      <button
                                                                           className="btn-delete"
                                                                           onClick={() =>
                                                                                this.handleDeleteCollection(
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagementCollection);
