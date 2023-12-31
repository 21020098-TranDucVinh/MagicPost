import React, { Component } from 'react';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { FaPlus } from 'react-icons/fa6';
import * as actions from '../../../store/actions/index';
import { options } from '../../../utils';
import ModalSendParcelToReceiver from './ModalSendParcelToReceiver';
class TranStaffSendOrderToClient extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               arrParcelsAfterConfirm: [],
               selectedParcels: '',
          };
     }
     async componentDidMount() {
          const { userInfo } = this.props;
          this.props.getALlReceivedParcels(userInfo.zip_code, userInfo.token);
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.allParcelEachNodeAfterConfirm !== this.props.allParcelEachNodeAfterConfirm) {
               this.setState(
                    {
                         arrParcelsAfterConfirm: this.filerParcelList(this.props.allParcelEachNodeAfterConfirm),
                    },
                    () => {
                         console.log('check arrParcelsAfterConfirm: ', this.state.arrParcelsAfterConfirm);
                    },
               );
          }
     }
     //filter parcel
     filerParcelList = (data) => {
          let result = [];
          for (let i = 0; i < data.length; i++) {
               let obj = {
                    id: i + 1,
                    ...data[i].parcel,
               };
               result.push(obj);
          }
          return result;
     };
     // Close modal
     isCloseModal = () => {
          this.setState({
               isOpenModal: false,
          });
     };

     openModalSendOrderToReceiver = () => {
          if (this.state.selectedParcels.length > 0) {
               this.setState({
                    isOpenModal: true,
               });
          } else {
               toast.error('please choose at least one!');
          }
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
          let { arrParcelsAfterConfirm, selectedParcels } = this.state;
          return (
               <>
                    <div className="admin-container my-3">
                         <ModalSendParcelToReceiver
                              isOpen={this.state.isOpenModal}
                              isCloseModal={this.isCloseModal}
                              parcelListToReceiver={selectedParcels}
                         />

                         <div className="admin-content container">
                              <div className="title-admin text-center my-4">
                                   <span>Parcel to receiver</span>
                              </div>
                              <div className="btn-director-add-new-user-container">
                                   <div className="btn-create-new-user-container">
                                        <button
                                             className="btn btn-primary"
                                             onClick={() => this.openModalSendOrderToReceiver()}
                                        >
                                             <span className="text-white">
                                                  <FaPlus />
                                             </span>

                                             <span>Create order</span>
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
                                             rows={arrParcelsAfterConfirm}
                                             columns={options.columnsParcels}
                                             pageSizeOptions={[5, 7]}
                                             autoHeight={true}
                                             checkboxSelection={true}
                                             onRowSelectionModelChange={(ids) => {
                                                  const selectedIDs = new Set(ids);

                                                  let selectedRowData = [];
                                                  arrParcelsAfterConfirm.map((row) => {
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
          userInfo: state.user.userInfo,
          arrPendingParcels: state.staffTransaction.arrPendingParcels,
          allParcelEachNodeAfterConfirm: state.colStaff.allParcelEachNodeAfterConfirm,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          getAllPendingParcels: () => dispatch(actions.getAllPendingParcelsAction()),
          fetchParcelsToSendCol: (arrParcels) => dispatch(actions.fetchParcelsToSendColAction(arrParcels)),
          getALlReceivedParcels: (zip_code, accessToken) =>
               dispatch(actions.getALlReceivedParcels(zip_code, accessToken)),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(TranStaffSendOrderToClient);
