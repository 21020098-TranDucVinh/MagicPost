import React, { Component } from 'react';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import * as actions from '../../../store/actions/index';
import { Button } from 'reactstrap';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import ModalCollectionAddNewStaff from './ModalCollectionAddNewStaff';
import * as services from '../../../services/index';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { options } from '../../.././utils';

class ManageCollectionStaff extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               rowSelectedCollections: '',
               collection_zip_code: '',
               accessToken: '',
               arrCollectionStaff: [],
          };
     }
     async componentDidMount() {
          let { userInfo } = this.props;
          this.props.getCollectionStaff(userInfo.zip_code, userInfo.token);
          this.setState({
               collection_zip_code: userInfo.zip_code,
               accessToken: userInfo.token,
          });
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          console.log('çol staff : ', this.props.arrCollectionStaff);
          if (prevProps.arrCollectionStaff !== this.props.arrCollectionStaff) {
               this.setState({
                    arrCollectionStaff: this.props.arrCollectionStaff,
               });
          }
     }
     // Close modal
     isCloseModal = () => {
          this.setState({
               isOpenModal: false,
          });
     };

     // Open modal to create new transaction staff
     openModalCrateNewCollectionStaff = () => {
          this.props.clearDataEditStaff();
          this.props.isNotEditStaff();
          this.setState({
               isOpenModal: true,
          });
     };
     // Delete transaction staff
     handleDeleteStaffCollection = async () => {
          let { rowSelectedCollections, collection_zip_code, accessToken } = this.state;
          let staff_id = rowSelectedCollections[0].staff_id;
          if (staff_id) {
               let res = await services.deleteStaffByStaffId(staff_id, {
                    headers: { Authorization: `Bearer ${accessToken}` },
               });
               if (res && res.errorCode === 0) {
                    this.props.getCollectionStaff(collection_zip_code, accessToken);
                    toast.success('Delete staff successfully!');
               } else {
                    toast.failed('Delete staff failed!');
               }
          }
     };
     //Open Modal Edit transaction staff
     OpenModalEditStaff = () => {
          let { rowSelectedCollections } = this.state;
          console.log(rowSelectedCollections[0]);
          if (rowSelectedCollections.length === 1) {
               this.props.fetchDataEditStaffAction(rowSelectedCollections[0]);
               this.props.doEditStaff();
               this.setState({
                    isOpenModal: true,
               });
          } else {
               toast.error('You can only chose one entry!');
          }
     };
     render() {
          let { rowSelectedCollections } = this.state;
          let { arrCollectionStaff } = this.props;
          return (
               <>
                    <div className="admin-container my-3">
                         <ModalCollectionAddNewStaff isOpen={this.state.isOpenModal} isCloseModal={this.isCloseModal} />
                         <div className="admin-content container">
                              <div className="title-admin text-center my-4">
                                   <span>Create Account Staff</span>
                              </div>
                              <div className="btn-director-add-new-user-container">
                                   <div className="btn-create-new-user-container">
                                        <button
                                             className="btn btn-primary"
                                             onClick={() => this.openModalCrateNewCollectionStaff()}
                                        >
                                             <BsFillPersonPlusFill />
                                             <span>Add New User</span>
                                        </button>
                                   </div>
                                   <div className="btn-option-container">
                                        {rowSelectedCollections && rowSelectedCollections.length > 0 && (
                                             <>
                                                  <Button
                                                       className="btn btn-warning px-4"
                                                       onClick={() => this.OpenModalEditStaff()}
                                                  >
                                                       <EditTwoToneIcon />
                                                       <span>Edit</span>
                                                  </Button>
                                                  <Button
                                                       className="btn btn-danger"
                                                       onClick={() => this.handleDeleteStaffCollection()}
                                                  >
                                                       <DeleteForeverTwoToneIcon />
                                                       <span>Delete</span>
                                                  </Button>
                                             </>
                                        )}
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
                                             rows={arrCollectionStaff}
                                             columns={options.columnsCollectionStaff}
                                             pageSizeOptions={[5, 7]}
                                             autoHeight={true}
                                             checkboxSelection={true}
                                             onRowSelectionModelChange={(ids) => {
                                                  const selectedIDs = new Set(ids);
                                                  let selectedRowData = [];
                                                  arrCollectionStaff.map((row) => {
                                                       selectedIDs.has(row.id);
                                                       if (selectedIDs.has(row.id)) {
                                                            selectedRowData.push(row);
                                                       }
                                                  });
                                                  this.setState({
                                                       rowSelectedCollections: selectedRowData,
                                                  });
                                             }}
                                             slotProps={{
                                                  toolbar: {
                                                       showQuickFilter: true,
                                                  },
                                             }}
                                             initialState={{
                                                  pagination: {
                                                       paginationModel: { page: 0, pageSize: 5 },
                                                  },
                                             }}
                                             // {...arrStaffTransaction}
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
          arrCollectionStaff: state.adminCollection.arrCollectionStaff,
          userInfo: state.user.userInfo,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getCollectionStaff: (collection_zip_code, accessToken) =>
               dispatch(actions.getCollectionStaffByIdAction(collection_zip_code, accessToken)),
          doEditStaff: () => dispatch(actions.isEditStaffAction()),
          fetchDataEditStaffAction: (staff) => dispatch(actions.fetchDataEditStaffAction(staff)),
          isNotEditStaff: () => dispatch(actions.isNotEditStaffAction()),
          clearDataEditStaff: () => dispatch(actions.clearDataEditStaffAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCollectionStaff);
