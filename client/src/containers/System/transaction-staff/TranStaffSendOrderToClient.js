import React, { Component } from 'react';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { FaPlus } from 'react-icons/fa6';
import ModalRecordParcel from './ModalRecordParcel';
import * as actions from '../../../store/actions/index';
import { options } from '../../../utils';
class TranStaffSendOrderToClient extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               arrPendingParcels: [],
               selectedParcels: '',
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

     redirectUICreateInvoiceSendReceiver = () => {
          alert('OK');
     };
     handleUICreateInvoice = () => {
          let { selectedParcels } = this.state;
          if (selectedParcels && selectedParcels.length > 0) {
               this.props.fetchParcelsToSendCol(selectedParcels);
               this.props.history.push('/transaction-staff/manage/create-order/send/collection');
          } else {
               toast.error('Please select at least 1 item!');
          }
     };
     render() {
          let { arrPendingParcels } = this.state;

          return (
               <>
                    <div className="admin-container my-3">
                         <ModalRecordParcel isOpen={this.state.isOpenModal} isCloseModal={this.isCloseModal} />

                         <div className="admin-content container">
                              <div className="title-admin text-center my-4">
                                   <span>Manage Parcel</span>
                              </div>
                              <div className="btn-director-add-new-user-container">
                                   <div className="btn-create-new-user-container">
                                        <button
                                             className="btn btn-primary"
                                             onClick={() => this.redirectUICreateInvoiceSendReceiver()}
                                        >
                                             <span className="text-white">
                                                  <FaPlus />
                                             </span>

                                             <span>Create invoice</span>
                                        </button>
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
                                                       selectedParcels: selectedRowData,
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
          fetchParcelsToSendCol: (arrParcels) => dispatch(actions.fetchParcelsToSendColAction(arrParcels)),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(TranStaffSendOrderToClient);
