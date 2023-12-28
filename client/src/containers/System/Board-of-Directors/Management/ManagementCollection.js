import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../AdminManagement.scss';
import * as actions from '../../../../store/actions/index';
import toast from 'react-hot-toast';
import ModalManageCollection from '../AdminModal/ModalManageCollection';
import { deleteCollectionById } from '../../../../services/adminService';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { BsFillPersonPlusFill } from 'react-icons/bs';

import { options } from '../../../../utils';
class ManagementCollection extends Component {
     constructor(props) {
          super(props);
          this.state = {
               rows: [{ id: 1, name: 'thach', age: '21', gender: 'Name' }],
               isOpenModal: false,
               arrCollections: [],
               isEditCollection: false,
               selectedCollections: [],
          };
     }
     async componentDidMount() {
          const token = this.props.userInfo.token;
          await this.props.getAllCollections(token);
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
     handleDeleteCollection = async () => {
          let { selectedCollections } = this.state;
          let collectionId = selectedCollections[0].zip_code;
          const token = this.props.userInfo.token;
          if (collectionId) {
               let res = await deleteCollectionById(collectionId, { headers: { Authorization: `Bearer ${token}` } });
               if (res && res.errorCode === 0) {
                    toast.success(res.msg);
                    this.props.getAllCollections();
               }
          }
     };
     // open modal edit Collection
     isOpenModalEditCollection = () => {
          let { selectedCollections } = this.state;
          if (selectedCollections && selectedCollections.length === 1) {
               this.props.doEditCollection();
               this.props.fetchDataEditCollection(selectedCollections[0]);
               this.setState({
                    isOpenModal: true,
               });
          } else {
               toast.error('Please choose only one!');
          }
     };

     render() {
          let { arrCollections } = this.state;
          return (
               <div className="admin-container my-3">
                    <ModalManageCollection isOpen={this.state.isOpenModal} isCloseModal={this.isCloseModal} />
                    <div className="admin-content container">
                         <div className="title-admin text-center my-4">Management Collection</div>
                         <div className="btn-director-add-new-user-container">
                              <div className="btn-create-new-user-container">
                                   <button
                                        className="btn btn-primary"
                                        onClick={() => this.isOpenModalCreteCollection()}
                                   >
                                        <BsFillPersonPlusFill className="button mx-1" />
                                        <span className="button">Add new Collection</span>
                                   </button>
                              </div>
                              <div className="btn-option-container ">
                                   <Button
                                        className="btn btn-warning px-4 button "
                                        onClick={() => this.isOpenModalEditCollection()}
                                   >
                                        <EditTwoToneIcon className="button" />
                                        <span>Edit</span>
                                   </Button>
                                   <Button
                                        className="btn btn-danger button"
                                        onClick={() => this.handleDeleteCollection()}
                                   >
                                        <DeleteForeverTwoToneIcon className="button" />
                                        <span>Delete</span>
                                   </Button>
                              </div>
                         </div>

                         <div className="table-user-content mt-2 mb-3 ">
                              <div style={{ height: 400, width: '100%' }}>
                                   <DataGrid
                                        sx={{
                                             border: 1,
                                             fontFamily: 'Plus Jakarta Sans, sans-serif',
                                             fontSize: 16,
                                        }}
                                        slots={{ toolbar: GridToolbar }}
                                        slotProps={{
                                             toolbar: {
                                                  showQuickFilter: true,
                                             },
                                        }}
                                        rows={arrCollections}
                                        columns={options.columnsCollection}
                                        pageSizeOptions={[5, 7]}
                                        autoHeight={true}
                                        checkboxSelection={true}
                                        onRowSelectionModelChange={(ids) => {
                                             const selectedIDs = new Set(ids);

                                             let selectedRowData = [];
                                             arrCollections.map((row) => {
                                                  selectedIDs.has(row.id);
                                                  if (selectedIDs.has(row.id)) {
                                                       selectedRowData.push(row);
                                                  }
                                             });
                                             this.setState({
                                                  selectedCollections: selectedRowData,
                                             });
                                        }}
                                        initialState={{
                                             pagination: {
                                                  paginationModel: { page: 0, pageSize: 5 },
                                             },
                                        }}
                                   />
                              </div>
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
          userInfo: state.user.userInfo,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllCollections: (token) => dispatch(actions.getAllCollectionsAction(token)),
          doEditCollection: () => dispatch(actions.isEditCollectionAction()),
          fetchDataEditCollection: (data) => dispatch(actions.fetchDataEditCollectionAction(data)),
          isNotEditCollection: () => dispatch(actions.isNotEditCollectionAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagementCollection);
