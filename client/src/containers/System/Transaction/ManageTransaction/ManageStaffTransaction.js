import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import ModalTransactionAddNewStaff from '../Modal/ModalTransactionAddNewStaff';
import * as actions from '../../../../store/actions/index';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
const columns = [
     { field: 'id', headerName: 'ID', width: 90 },

     {
          field: 'staff_id',
          headerName: 'Staff Id',
          width: 150,
          editable: true,
     },
     {
          field: 'phone',
          headerName: 'Phone',
          type: 'text',
          width: 200,
          editable: true,
     },
     {
          field: 'username',
          headerName: 'User',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          //valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
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
          this.props.getTransactionById();
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
     OpenModalCrateNewAdminPending = () => {
          this.setState({
               isOpenModal: true,
          });
     };

     render() {
          let { arrStaffTransaction, selectedTransaction } = this.state;
          console.log('selected ', selectedTransaction);

          return (
               <>
                    <div className="admin-container my-3">
                         <ModalTransactionAddNewStaff
                              isOpen={this.state.isOpenModal}
                              isCloseModal={this.isCloseModal}
                         />

                         <div className="title-admin text-center my-4">
                              <span>Create Account</span>
                         </div>
                         <div className="admin-content container">
                              <div className="btn-director-add-new-user-container">
                                   <div className="btn-create-new-user-container">
                                        <button
                                             // className="btn-create-new-user"
                                             className="btn btn-primary"
                                             onClick={() => this.OpenModalCrateNewAdminPending()}
                                        >
                                             <i className="fas fa-plus"></i>
                                             <span>Add New User</span>
                                        </button>
                                   </div>
                                   <div className="btn-option-container">
                                        {selectedTransaction.length > 0 && (
                                             <>
                                                  <Button className="btn btn-danger">
                                                       <DeleteForeverTwoToneIcon />
                                                       <span>Delete</span>
                                                  </Button>
                                                  <Button className="btn btn-warning px-4">
                                                       <EditTwoToneIcon />
                                                       <span>Edit</span>
                                                  </Button>
                                             </>
                                        )}
                                   </div>
                              </div>
                              <div className="table-user-content mt-2 mb-3 ">
                                   <div style={{ height: 400, width: '100%' }}>
                                        <DataGrid
                                             rows={arrStaffTransaction}
                                             columns={columns}
                                             pageSizeOptions={[5, 7]}
                                             autoHeight={true}
                                             checkboxSelection={true}
                                             onRowSelectionModelChange={(ids) => {
                                                  const selectedIDs = new Set(ids);
                                                  console.log('array : ', selectedIDs);
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
          getTransactionById: () => dispatch(actions.getTransactionByIdAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaffTransaction);
