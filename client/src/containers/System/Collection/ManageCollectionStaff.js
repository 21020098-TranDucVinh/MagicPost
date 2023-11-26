import React, { Component } from 'react';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';
import { DataGrid } from '@mui/x-data-grid';
import * as actions from '../../../store/actions/index';
import { Button } from 'reactstrap';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import ModalCollectionAddNewStaff from './ModalCollectionAddNewStaff';
import * as services from '../../../services/index';
const columns = [
     { field: 'id', headerName: 'ID', width: 90 },

     {
          field: 'staff_id',
          headerName: 'Staff ID',
          width: 150,
          editable: false,
     },
     {
          field: 'phone',
          headerName: 'Phone',
          type: 'text',
          width: 200,
          editable: false,
     },
     {
          field: 'username',
          headerName: 'Username',
          description: 'This column has a value getter and is not sortable.',
          sortable: true,
          width: 160,
     },
];

class ManageCollectionStaff extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               rowSelectedCollections: '',
               // arrCollectionStaff: [],
               // selectedCollection: '',
          };
     }
     async componentDidMount() {
          this.props.getCollectionStaffById();
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          // if (prevProps.arrStaffTransaction !== this.props.arrStaffTransaction) {
          //      this.setState({
          //           arrStaffTransaction: this.props.arrStaffTransaction,
          //      });
          // }
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
          let { rowSelectedCollections } = this.state;
          let staff_id = rowSelectedCollections[0].staff_id;
          console.log('check staff Id : ', staff_id);
          if (staff_id) {
               let res = await services.deleteStaffByStaffId(staff_id);
               if (res && res.errorCode === 0) {
                    this.props.getCollectionStaffById();
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
                         <div className="title-admin text-center my-4">
                              <span>Create Account Staff</span>
                         </div>
                         <div className="admin-content container">
                              <div className="btn-director-add-new-user-container">
                                   <div className="btn-create-new-user-container">
                                        <button
                                             className="btn btn-primary"
                                             onClick={() => this.openModalCrateNewCollectionStaff()}
                                        >
                                             <i className="fas fa-plus"></i>
                                             <span>Add New User</span>
                                        </button>
                                   </div>
                                   <div className="btn-option-container">
                                        {rowSelectedCollections.length > 0 && (
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
                                             rows={arrCollectionStaff}
                                             columns={columns}
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
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getCollectionStaffById: () => dispatch(actions.getCollectionStaffByIdAction()),
          doEditStaff: () => dispatch(actions.isEditStaffAction()),
          fetchDataEditStaffAction: (staff) => dispatch(actions.fetchDataEditStaffAction(staff)),
          isNotEditStaff: () => dispatch(actions.isNotEditStaffAction()),
          clearDataEditStaff: () => dispatch(actions.clearDataEditStaffAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCollectionStaff);
