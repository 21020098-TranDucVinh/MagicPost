import React, { Component } from 'react';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button } from 'reactstrap';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { FaPlus } from 'react-icons/fa6';
import ModalRecordParcel from './ModalRecordParcel';
import * as actions from '../../../store/actions/index';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { options } from '../../../utils';

class RecordParcel extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               arrPendingParcels: [],
          };
     }
     async componentDidMount() {
          this.props.getAllPendingParcels();
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.arrPendingParcels !== this.props.arrPendingParcels) {
               this.setState({
                    arrPendingParcels: this.props.arrPendingParcels,
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
          // this.props.clearDataEditStaff();
          // this.props.isNotEditStaff();
          this.setState({
               isOpenModal: true,
          });
     };
     // Delete transaction staff
     // handleDeleteStaffTransaction = async () => {
     //      let { selectedTransaction } = this.state;
     //      let staff_id = selectedTransaction[0].staff_id;
     //      // console.log('check staff Id : ', staff_id);
     //      if (staff_id) {
     //           let res = await deleteStaffByStaffId(staff_id);
     //           if (res && res.errorCode === 0) {
     //                this.props.getTransactionStaffById();
     //                toast.success('Delete staff success!');
     //           } else {
     //                toast.failed('Delete staff failed!');
     //           }
     //      }
     // };
     //Open Modal Edit transaction staff
     // OpenModalEditStaff = () => {
     //      let { selectedTransaction } = this.state;
     //      if (selectedTransaction.length === 1) {
     //           this.props.fetchDataEditStaffAction(selectedTransaction[0]);
     //           this.props.doEditStaff();
     //           this.setState({
     //                isOpenModal: true,
     //           });
     //      } else {
     //           toast.error('You can only chose one entry!');
     //      }
     // };
     render() {
          let { arrPendingParcels } = this.state;
          console.log(arrPendingParcels);
          return (
               <>
                    <div className="admin-container my-3">
                         <ModalRecordParcel isOpen={this.state.isOpenModal} isCloseModal={this.isCloseModal} />

                         <div className="title-admin text-center my-4">
                              <span>Manage Parcel</span>
                         </div>
                         <div className="admin-content container">
                              <div className="btn-director-add-new-user-container">
                                   <div className="btn-create-new-user-container">
                                        <button
                                             className="btn btn-primary"
                                             onClick={() => this.openModalCrateNewTransactionStaff()}
                                        >
                                             <span className="text-white">
                                                  <FaPlus />
                                             </span>

                                             <span>Record Parcel</span>
                                        </button>
                                   </div>
                                   <div className="btn-option-container">
                                        {arrPendingParcels.length > 0 && (
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
                                             slots={{ toolbar: GridToolbar }}
                                             slotProps={{
                                                  toolbar: {
                                                       showQuickFilter: true,
                                                  },
                                             }}
                                             rows={arrPendingParcels}
                                             columns={options.columnsParcels}
                                             pageSizeOptions={[5, 7]}
                                             autoHeight={true}
                                             checkboxSelection={true}
                                             onRowSelectionModelChange={(ids) => {
                                                  const selectedIDs = new Set(ids);

                                                  let selectedRowData = [];
                                                  arrPendingParcels.map((row) => {
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
                                             {...arrPendingParcels}
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
          arrPendingParcels: state.staffTransaction.arrPendingParcels,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllPendingParcels: () => dispatch(actions.getAllPendingParcelsAction()),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordParcel);
