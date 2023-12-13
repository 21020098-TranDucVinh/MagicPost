import React, { Component } from 'react';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import * as actions from '../../../store/actions/index';
import { options } from '../../../utils';
import { FaPlus } from 'react-icons/fa6';
class CollectionStaffManageParcel extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               parcelListSendCol: [],
               arrPendingParcels: [],
          };
     }
     async componentDidMount() {
          let { userInfo } = this.props;
          this.props.getAllPendingParcels();
          this.props.getALlReceivedParcels(userInfo.zip_code, userInfo.token);
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
     handleCreateOrderToSendCol = () => {
          let { parcelListSendCol } = this.state;
          if (parcelListSendCol && parcelListSendCol.length > 0) {
               this.props.fetchParcelsToSendCol(parcelListSendCol);
               this.props.history.push('/collection-staff/manage/create-order/send/collection');
          } else {
               toast.error('Please select at least 1 item!');
          }
     };

     render() {
          let { arrPendingParcels } = this.state;
          const { allParcelEachNode } = this.props;
          console.log('arrPendingParcels', allParcelEachNode);
          return (
               <>
                    <div className="admin-container my-3">
                         <div className="admin-content container">
                              <div className="btn-director-add-new-user-container row container">
                                   <div className="title-admin text-center my-4 col-12">
                                        <span>Manage Parcel</span>
                                   </div>
                                   <div className="btn-create-new-user-container">
                                        <button
                                             className="btn btn-primary"
                                             onClick={() => this.handleCreateOrderToSendCol()}
                                        >
                                             <span className="text-white">
                                                  <FaPlus />
                                             </span>

                                             <span>Create order</span>
                                        </button>
                                   </div>
                                   {/* <div className="btn-option-container">
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
                                   </div> */}
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
                                             rows={allParcelEachNode}
                                             columns={options.columnsParcels}
                                             pageSizeOptions={[5, 7]}
                                             autoHeight={true}
                                             checkboxSelection={true}
                                             onRowSelectionModelChange={(ids) => {
                                                  const selectedIDs = new Set(ids);

                                                  let selectedRowData = [];
                                                  if (allParcelEachNode && allParcelEachNode.length > 0) {
                                                       allParcelEachNode.map((row) => {
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
          allParcelEachNode: state.colStaff.allParcelEachNode,
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
