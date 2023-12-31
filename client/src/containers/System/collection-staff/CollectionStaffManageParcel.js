import React, { Component } from 'react';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import * as actions from '../../../store/actions/index';
import { options } from '../../../utils';
import { BiPaperPlane } from 'react-icons/bi';
class CollectionStaffManageParcel extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               parcelListSendCol: [],
               parcelsAfterConfirm: [],
          };
     }
     async componentDidMount() {
          let { userInfo } = this.props;
          this.props.getAllPendingParcels();
          this.props.getALlReceivedParcels(userInfo.zip_code, userInfo.token);
     }
     componentDidUpdate(prevProps, prevState, snapshot) {
          if (prevProps.allParcelEachNodeAfterConfirm !== this.props.allParcelEachNodeAfterConfirm) {
               this.setState({
                    parcelsAfterConfirm: this.filerParcelList(this.props.allParcelEachNodeAfterConfirm),
               });
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
     handleCreateOrderToSendCol = () => {
          let { parcelListSendCol } = this.state;
          if (parcelListSendCol && parcelListSendCol.length > 0) {
               this.props.fetchParcelsToSendCol(parcelListSendCol);
               this.props.history.push('/collection-staff/manage/create-order/send/collection');
          } else {
               toast.error('Please select at least 1 item!');
          }
     };
     handleCreateOrderToSendTran = () => {
          let { parcelListSendCol } = this.state;
          if (parcelListSendCol && parcelListSendCol.length > 0) {
               this.props.fetchParcelsToSendCol(parcelListSendCol);
               this.props.history.push('/collection-staff/manage/create-order/send/transaction');
          } else {
               toast.error('Please select at least 1 item!');
          }
     };
     render() {
          let { parcelsAfterConfirm } = this.state;
          // console.log('parcelsAfterConfirm', parcelsAfterConfirm);
          return (
               <>
                    <div className="admin-container my-3">
                         <div className="admin-content container">
                              <div className="btn-director-add-new-user-container row container">
                                   <div className="title-admin text-center my-4 col-12">
                                        <span>Manage Parcel</span>
                                   </div>

                                   <div className="gap-1">
                                        <button
                                             className="btn btn-primary"
                                             onClick={() => this.handleCreateOrderToSendCol()}
                                        >
                                             <span className="text-white">
                                                  <BiPaperPlane
                                                       style={{ width: '15px', height: '15px', marginTop: '-3px' }}
                                                       className="me-2"
                                                  />
                                             </span>
                                             <span>Send Collection</span>
                                        </button>
                                        <button
                                             className="btn btn-primary"
                                             onClick={() => this.handleCreateOrderToSendTran()}
                                        >
                                             <span className="text-white">
                                                  <BiPaperPlane
                                                       style={{ width: '15px', height: '15px', marginTop: '-3px' }}
                                                       className="me-2"
                                                  />
                                             </span>
                                             <span>Send Transaction</span>
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
                                             rows={parcelsAfterConfirm}
                                             columns={options.columnsParcels}
                                             pageSizeOptions={[5, 7]}
                                             autoHeight={true}
                                             checkboxSelection={true}
                                             onRowSelectionModelChange={(ids) => {
                                                  const selectedIDs = new Set(ids);

                                                  let selectedRowData = [];
                                                  if (parcelsAfterConfirm && parcelsAfterConfirm.length > 0) {
                                                       parcelsAfterConfirm.map((row) => {
                                                            selectedIDs.has(row.id);
                                                            if (selectedIDs.has(row.id)) {
                                                                 selectedRowData.push(row);
                                                            }
                                                       });
                                                  }
                                                  this.setState({
                                                       parcelListSendCol: selectedRowData,
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

export default connect(mapStateToProps, mapDispatchToProps)(CollectionStaffManageParcel);
