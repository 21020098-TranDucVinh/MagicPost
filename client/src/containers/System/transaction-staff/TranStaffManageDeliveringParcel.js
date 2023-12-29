import React, { Component } from 'react';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { FaPlus } from 'react-icons/fa6';
import * as actions from '../../../store/actions/index';
import { options } from '../../../utils';
import * as services from '../../../services/index';
class TranStaffManageDeliveringParcel extends Component {
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
    this.props.getAllDeliveringParcelsBYTransaction(userInfo.zip_code, userInfo.token);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  getListParcelId = (parcels) => {
    let res = [];
    for (let i = 0; i < parcels.length; i++) {
      res.push(parcels[i].parcel_id);
    }
    return res;
  };
  confirmParcelDeliveryUnsuccess = async () => {
    let { selectedParcels } = this.state;

    let listId = this.getListParcelId(selectedParcels);
    //      "last_staff_id_update": "T00001S00001",
    //     "list_parcel_id": "P00001",
    //     "description": "Lỗi"
    let data = {
      list_parcel_id: listId,
      last_staff_id_update: this.props.userInfo.staff_id,
      description: 'Lỗi',
    };
    console.log('data : ', data);
    let res = await services.handleConfirmParcelDeliveryUnsuccess(data);
    console.log('check res : ', res);
    if (res && res.errorCode === 0) {
      const { userInfo } = this.props;
      this.props.getAllDeliveringParcelsBYTransaction(userInfo.zip_code, userInfo.token);
      toast.success(res.msg);
    } else {
      toast.error('Error!');
    }
  };
  render() {
    let { selectedParcels } = this.state;
    let { arrDeliveringParcels } = this.props;
    console.log('arrDeliveringParcelsOKOKO : ', arrDeliveringParcels);
    return (
      <>
        <div className="admin-container my-3">
          <div className="admin-content container">
            <div className="title-admin text-center my-4">
              <span>Parcel to receiver</span>
            </div>
            <div className="btn-director-add-new-user-container">
              <div className="ml-auto">
                <button className="btn btn-warning  " onClick={() => this.confirmParcelDeliveryUnsuccess()}>
                  <span className="text-white">
                    <FaPlus />
                  </span>
                  <span>unsuccess parcel </span>
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
                  rows={arrDeliveringParcels}
                  columns={options.columnsParcels}
                  pageSizeOptions={[5, 7]}
                  autoHeight={true}
                  checkboxSelection={true}
                  onRowSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);

                    let selectedRowData = [];
                    arrDeliveringParcels.map((row) => {
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
    arrDeliveringParcels: state.staffTransaction.arrDeliveringParcels,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDeliveringParcelsBYTransaction: (zip_code, accessToken) =>
      dispatch(actions.getAllDeliveringParcelsBYTransactionIDAction(zip_code, accessToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TranStaffManageDeliveringParcel);
