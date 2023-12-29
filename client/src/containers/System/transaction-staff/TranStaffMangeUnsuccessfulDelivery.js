import React, { Component } from 'react';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { FaPlus } from 'react-icons/fa6';
import * as actions from '../../../store/actions/index';
import { options } from '../../../utils';
import * as services from '../../../services/index';
class TranStaffMangeUnsuccessfulDelivery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrParcelReturn: [],
    };
  }
  async componentDidMount() {
    const { userInfo } = this.props;
    let res = await services.getParcelsReturnedByTransaction(userInfo.zip_code);
    console.log('check res  :', res);
    if (res && res.errorCode === 0) {
      this.setState({
        arrParcelReturn: res.parcels,
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { arrParcelReturn } = this.state;
    console.log('arrParcelReturn : ', arrParcelReturn);
    return (
      <div className="admin-container my-3">
        <div className="admin-content container">
          <div className="title-admin text-center my-4">
            <span>Parcel to receiver</span>
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
                rows={arrParcelReturn}
                columns={options.columnsParcels}
                pageSizeOptions={[5, 7]}
                autoHeight={true}
                checkboxSelection={true}
                onRowSelectionModelChange={(ids) => {
                  const selectedIDs = new Set(ids);
                  let selectedRowData = [];
                  arrParcelReturn.map((row) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(TranStaffMangeUnsuccessfulDelivery);
