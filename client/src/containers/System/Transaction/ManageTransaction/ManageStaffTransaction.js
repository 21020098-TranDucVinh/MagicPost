import React, { Component } from 'react';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';
import ModalTransactionAddNewStaff from '../Modal/ModalTransactionAddNewStaff';
import * as actions from '../../../../store/actions/index';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { deleteStaffByStaffId } from '../../../.././services/TransactionService';
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
          headerName: 'User',
          description: 'This column has a value getter and is not sortable.',
          sortable: true,
          width: 160,
     },
];

class ManageStaffTransaction extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               arrStaffTransaction: [],
               selectedTransaction: '',
          };
     }
     async componentDidMount() {
          this.props.getTransactionStaffById();
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.arrStaffTransaction !== this.props.arrStaffTransaction) {
               this.setState({
                    arrStaffTransaction: this.props.arrStaffTransaction,
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
     openModalCrateNewTransactionStaff = () => {
          this.props.clearDataEditStaff();
          this.props.isNotEditStaff();
          this.setState({
               isOpenModal: true,
          });
     };
     // Delete transaction staff
     handleDeleteStaffTransaction = async () => {
          let { selectedTransaction } = this.state;
          let staff_id = selectedTransaction[0].staff_id;
          // console.log('check staff Id : ', staff_id);
          if (staff_id) {
               let res = await deleteStaffByStaffId(staff_id);
               if (res && res.errorCode === 0) {
                    this.props.getTransactionStaffById();
                    toast.success('Delete staff success!');
               } else {
                    toast.failed('Delete staff failed!');
               }
          }
     };
     //Open Modal Edit transaction staff
     OpenModalEditStaff = () => {
          let { selectedTransaction } = this.state;
          if (selectedTransaction.length === 1) {
               this.props.fetchDataEditStaffAction(selectedTransaction[0]);
               this.props.doEditStaff();
               this.setState({
                    isOpenModal: true,
               });
          } else {
               toast.error('You can only chose one entry!');
          }
     };
     render() {
          let { arrStaffTransaction, selectedTransaction } = this.state;

          return (
               <>
                    <div className="admin-container my-3">
                         <ModalTransactionAddNewStaff
                              isOpen={this.state.isOpenModal}
                              isCloseModal={this.isCloseModal}
                         />

                         <div className="title-admin text-center my-4">
                              <span>Create Account Staff</span>
                         </div>
                         <div className="admin-content container">
                              <div className="btn-director-add-new-user-container">
                                   <div className="btn-create-new-user-container">
                                        <button
                                             className="btn btn-primary"
                                             onClick={() => this.openModalCrateNewTransactionStaff()}
                                        >
                                             <i className="fas fa-plus"></i>
                                             <span>Add New User</span>
                                        </button>
                                   </div>
                                   <div className="btn-option-container">
                                        {selectedTransaction.length > 0 && (
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
                                                       onClick={() => this.handleDeleteStaffTransaction()}
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
                                             rows={arrStaffTransaction}
                                             columns={columns}
                                             pageSizeOptions={[5, 7]}
                                             autoHeight={true}
                                             checkboxSelection={true}
                                             onRowSelectionModelChange={(ids) => {
                                                  const selectedIDs = new Set(ids);

                                                  let selectedRowData = [];
                                                  arrStaffTransaction.map((row) => {
                                                       selectedIDs.has(row.id);
                                                       if (selectedIDs.has(row.id)) {
                                                            selectedRowData.push(row);
                                                       }
                                                  });
                                                  this.setState({
                                                       selectedTransaction: selectedRowData,
                                                  });
                                             }}
                                             initialState={{
                                                  pagination: {
                                                       paginationModel: { page: 0, pageSize: 5 },
                                                  },
                                             }}
                                             {...arrStaffTransaction}
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
          arrStaffTransaction: state.adminTransaction.arrTransactionById,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getTransactionStaffById: () => dispatch(actions.getTransactionStaffByIdAction()),
          doEditStaff: () => dispatch(actions.isEditStaffAction()),
          fetchDataEditStaffAction: (staff) => dispatch(actions.fetchDataEditStaffAction(staff)),
          isNotEditStaff: () => dispatch(actions.isNotEditStaffAction()),
          clearDataEditStaff: () => dispatch(actions.clearDataEditStaffAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaffTransaction);
