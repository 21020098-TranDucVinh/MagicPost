import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../AdminManagement.scss';
import ModalManageTransaction from '../AdminModal/ModalManageTransaction';
import { deleteTransactionById } from '../../../../services/adminService';
import toast from 'react-hot-toast';
import * as actions from '../../../../store/actions/index';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { options } from '../../../../utils';
class ManageTransaction extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               arrTransactions: [],
               selectedTransactions: '',
          };
     }
     async componentDidMount() {
          const token = this.props.userInfo.token;
          await this.props.getAllTransactions(token);
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.arrTransactions !== this.props.arrTransactions) {
               this.setState({
                    arrTransactions: this.props.arrTransactions,
               });
          }
          if (prevProps.arrAdminsPending !== this.props.arrAdminsPending) {
               this.setState({
                    arrAdminsPending: this.props.arrAdminsPending,
               });
          }
     }
     isOpenModalCreateTransaction = () => {
          this.props.isNotTransaction();
          this.props.clearDataEditTransaction();
          this.setState({
               isOpenModal: true,
          });
     };
     isCloseModal = () => {
          this.setState({
               isOpenModal: false,
          });
     };

     handleDeleteTransaction = async () => {
          try {
               let { selectedTransactions } = this.state;
               let token = this.props.userInfo.token;
               let res = await deleteTransactionById(selectedTransactions[0]?.zip_code, {
                    headers: { Authorization: `Bearer ${token}` },
               });
               if (res && res.errorCode === 0) {
                    await this.props.getAllTransactions();
                    toast.success('Delete Transaction success');
               } else {
                    toast.success('Delete Transaction failed');
               }
               console.log(selectedTransactions);
          } catch (e) {
               console.log(e);
          }
     };
     isOpenModalEditTransaction = () => {
          try {
               let { selectedTransactions } = this.state;
               console.log(selectedTransactions[0]);
               if (selectedTransactions && selectedTransactions.length === 1) {
                    this.props.isEditTransaction();
                    this.props.fetchDataEditTransaction(selectedTransactions[0]);
                    this.setState({
                         isOpenModal: true,
                    });
               } else {
                    toast.error('Please choose only one!');
               }
          } catch (e) {
               console.log(e);
          }
     };
     render() {
          let { arrTransactions } = this.state;
          return (
               <>
                    <div className="admin-container my-3">
                         <ModalManageTransaction isOpen={this.state.isOpenModal} isCloseModal={this.isCloseModal} />

                         <div className="admin-content container">
                              <div className="title-admin text-center my-4">Manage Transaction</div>
                              <div className="btn-director-add-new-user-container">
                                   <div className="btn-create-new-user-container button">
                                        <button
                                             className="btn btn-primary"
                                             onClick={() => this.isOpenModalCreateTransaction()}
                                        >
                                             <BsFillPersonPlusFill className="mx-1" />
                                             <span>Add New Transaction</span>
                                        </button>
                                   </div>
                                   <div className="btn-option-container ">
                                        <Button
                                             className="btn btn-warning px-4 button "
                                             onClick={() => this.isOpenModalEditTransaction()}
                                        >
                                             <EditTwoToneIcon className="button" />
                                             <span>Edit</span>
                                        </Button>
                                        <Button
                                             className="btn btn-danger button"
                                             onClick={() => this.handleDeleteTransaction()}
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
                                             rows={arrTransactions}
                                             columns={options.columnsTransaction}
                                             pageSizeOptions={[5, 7]}
                                             autoHeight={true}
                                             checkboxSelection={true}
                                             onRowSelectionModelChange={(ids) => {
                                                  const selectedIDs = new Set(ids);

                                                  let selectedRowData = [];
                                                  arrTransactions.map((row) => {
                                                       selectedIDs.has(row.id);
                                                       if (selectedIDs.has(row.id)) {
                                                            selectedRowData.push(row);
                                                       }
                                                  });
                                                  this.setState({
                                                       selectedTransactions: selectedRowData,
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
          arrTransactions: state.admin.arrTransactions,
          userInfo: state.user.userInfo,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllTransactions: (token) => dispatch(actions.getAllTransactionsAction(token)),
          isEditTransaction: () => dispatch(actions.isEditTransactionAction()),
          fetchDataEditTransaction: (data) => dispatch(actions.fetchDataEditTransactionAction(data)),
          clearDataEditTransaction: () => dispatch(actions.clearDataEditTransactionAction()),
          isNotTransaction: () => dispatch(actions.isNotTransactionAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTransaction);
