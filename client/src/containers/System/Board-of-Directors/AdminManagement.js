import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminManagement.scss';
import AdminModalAddNewUser from './AdminModal/AdminModalAddNewUser';
import * as actions from '../../../store/actions/index';
import { deleteUserPending } from '../../../services/adminService';
import toast from 'react-hot-toast';

import { options } from '../../../utils';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { MdPersonAddAlt1 } from 'react-icons/md';
class AdminManagement extends Component {
     constructor(props) {
          super(props);
          this.state = {
               rows: [{ id: 1, name: 'thach', age: '21', gender: 'NAM' }],
               isOpenModal: false,
               arrAdminsPending: [],
               selectedPendingAdmins: '',
          };
     }

     async componentDidMount() {
          let res = await this.props.getAllUserPending(this.props.userInfo.token);
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
     handleDeleteUserPending = async () => {
          try {
               let { selectedPendingAdmins } = this.state;
               let id = selectedPendingAdmins[0].id;
               console.log('ID  :', id);
               if (id) {
                    let res = await deleteUserPending(id, {
                         headers: { Authorization: `Bearer ${this.props.userInfo.token}` },
                    });
                    console.log(res);
                    if (res && res.errorCode === 0) {
                         toast.success(res.msg);
                         await this.props.getAllUserPending();
                    } else {
                         toast.error(res.msg);
                    }
               }
          } catch (e) {
               console.log(e);
          }
     };
     // open modal edit admin pending
     openModalEditPendingAdmin = () => {
          let { selectedPendingAdmins } = this.state;
          if (selectedPendingAdmins && selectedPendingAdmins.length === 1) {
               this.props.fetchDataEditPendingAdmin(selectedPendingAdmins[0]);
               this.props.isEditAdminPending();
               this.setState({
                    isOpenModal: true,
                    isEditUser: true,
               });
          } else {
               toast.error('Please chose only one entry!');
          }
     };
     // Open modal create potential candidate
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

                         <div className="admin-content container">
                              <div className="title-admin text-center my-4">
                                   <span>Create Account potential admin</span>
                              </div>
                              <div className="btn-director-add-new-user-container">
                                   <div className="btn-create-new-user-container button">
                                        <Button
                                             className="btn btn-primary button"
                                             onClick={() => this.OpenModalCrateNewAdminPending()}
                                        >
                                             <MdPersonAddAlt1 className="button" />
                                             <span>Add potential admin</span>
                                        </Button>
                                   </div>
                                   <div className="btn-option-container ">
                                        <Button
                                             className="btn btn-warning px-4 button "
                                             onClick={() => this.openModalEditPendingAdmin()}
                                        >
                                             <EditTwoToneIcon className="button" />
                                             <span>Edit</span>
                                        </Button>
                                        <Button
                                             className="btn btn-danger button"
                                             onClick={() => this.handleDeleteUserPending()}
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
                                             rows={arrAdminsPending}
                                             columns={options.columnsPotentialCandidate}
                                             pageSizeOptions={[5, 7]}
                                             autoHeight={true}
                                             checkboxSelection={true}
                                             onRowSelectionModelChange={(ids) => {
                                                  const selectedIDs = new Set(ids);

                                                  let selectedRowData = [];
                                                  arrAdminsPending.map((row) => {
                                                       selectedIDs.has(row.id);
                                                       if (selectedIDs.has(row.id)) {
                                                            selectedRowData.push(row);
                                                       }
                                                  });
                                                  this.setState({
                                                       selectedPendingAdmins: selectedRowData,
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
               </>
          );
     }
}

const mapStateToProps = (state) => {
     return {
          arrAdminsPending: state.admin.arrAdminsPending,
          userInfo: state.user.userInfo,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllUserPending: (token) => dispatch(actions.getAllUserPendingAction(token)),
          fetchDataEditPendingAdmin: (user) => dispatch(actions.fetchDataEditPendingAdminAction(user)),
          isEditAdminPending: () => dispatch(actions.isEditAdminPendingAction()),
          isNotEditAdminPending: () => dispatch(actions.isNotEditAdminPendingAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminManagement);
