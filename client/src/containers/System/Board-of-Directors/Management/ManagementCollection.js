import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../AdminManagement.scss';
import * as actions from '../../../../store/actions/index';
import toast from 'react-hot-toast';
import ModalManageCollection from '../AdminModal/ModalManageCollection';
import { deleteCollectionById } from '../../../../services/adminService';
class ManagementCollection extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               arrCollections: [],
               isEditCollection: false,
          };
     }
     async componentDidMount() {
          await this.props.getAllCollections();
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.arrCollections !== this.props.arrCollections) {
               this.setState({
                    arrCollections: this.props.arrCollections,
               });
          }
     }
     // open modal create collection
     isOpenModalCreteCollection = () => {
          this.props.isNotEditCollection();
          this.setState({
               isOpenModal: true,
          });
     };
     // close Modal
     isCloseModal = () => {
          this.setState({
               isOpenModal: false,
          });
     };
     // Delete Collection
     handleDeleteCollection = async (collection) => {
          if (collection) {
               let res = await deleteCollectionById(collection.zip_code);
               console.log('check res : ', res);
               if (res && res.errorCode === 0) {
                    toast.success(res.message);
                    this.props.getAllCollections();
               }
          }
     };
     // open modal edit Collection
     isOpenModalEditCollection = (collection) => {
          this.setState({
               isOpenModal: true,
          });
          this.props.doEditCollection();
          this.props.fetchDataEditCollection(collection);
     };

     render() {
          let { arrCollections } = this.state;
          return (
               <div className="admin-container container my-3">
                    <ModalManageCollection isOpen={this.state.isOpenModal} isCloseModal={this.isCloseModal} />
                    <div className="title-admin text-center my-4">Management Collection</div>
                    <div className="admin-content">
                         <div className="btn-director-add-new-user-container">
                              <div className="btn-create-new-user-container">
                                   <button
                                        className="btn btn-primary"
                                        onClick={() => this.isOpenModalCreteCollection()}
                                   >
                                        <i className="fas fa-plus"></i>
                                        <span>Add new Collection</span>
                                   </button>
                              </div>
                         </div>
                         <div className="table-user-content mt-2 mb-3">
                              <table className="table table-hover customers">
                                   <thead className="text-center">
                                        <tr>
                                             <th scope="col">#</th>
                                             <th scope="col">Zip Code</th>
                                             <th scope="col">Name</th>
                                             <th scope="col">Address</th>
                                             <th scope="col">Admin ID</th>
                                             <th scope="col">Actions</th>
                                        </tr>
                                   </thead>
                                   <tbody className="text-center">
                                        {arrCollections &&
                                             arrCollections.map((item, index) => {
                                                  return (
                                                       <>
                                                            <tr>
                                                                 <th scope="row">{index + 1}</th>
                                                                 <td>{item.zip_code}</td>
                                                                 <td>{item.name}</td>
                                                                 <td>{item.address}</td>
                                                                 <td>{item.admin_id}</td>
                                                                 <td>
                                                                      <button
                                                                           className="btn-edit"
                                                                           onClick={() =>
                                                                                this.isOpenModalEditCollection(item)
                                                                           }
                                                                      >
                                                                           <i className="fas fa-pencil-alt"></i>
                                                                      </button>
                                                                      <button
                                                                           className="btn-delete"
                                                                           onClick={() =>
                                                                                this.handleDeleteCollection(item)
                                                                           }
                                                                      >
                                                                           <i className="fas fa-trash"></i>
                                                                      </button>
                                                                 </td>
                                                            </tr>
                                                       </>
                                                  );
                                             })}
                                   </tbody>
                              </table>
                         </div>
                    </div>
               </div>
          );
     }
}

const mapStateToProps = (state) => {
     return {
          arrCollections: state.admin.arrCollections,
          isEditCollection: state.admin.isEditCollection,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllCollections: () => dispatch(actions.getAllCollectionsAction()),
          doEditCollection: () => dispatch(actions.isEditCollectionAction()),
          fetchDataEditCollection: (data) => dispatch(actions.fetchDataEditCollectionAction(data)),
          isNotEditCollection: () => dispatch(actions.isNotEditCollectionAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagementCollection);
