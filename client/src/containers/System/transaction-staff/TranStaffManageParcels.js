import React, { Component } from 'react';
import { connect } from 'react-redux';
import toast from 'react-hot-toast';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { FaPlus } from 'react-icons/fa6';
import * as actions from '../../../store/actions/index';
import { options } from '../../../utils';
import { Button } from 'reactstrap';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
class TranStaffManageParcels extends Component {
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
    this.props.getAllParcelsBYTransactionID(userInfo.zip_code);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { selectedParcels } = this.state;
    let { arrParcelsByTransaction } = this.props;
    console.log('arrDeliveringParcelsOKOKO : ', arrParcelsByTransaction);
    return (
      <>
        <div className="admin-container my-3">
          {/* <ModalSendParcelToReceiver
                              isOpen={this.state.isOpenModal}
                              isCloseModal={this.isCloseModal}
                              parcelListToReceiver={selectedParcels}
                         /> */}

          <div className="admin-content container">
            <div className="title-admin text-center my-4">
              <span>Parcel to receiver</span>
            </div>
            <div className="btn-director-add-new-user-container">
              <div className="ml-auto">
                <Button className="btn btn-danger" onClick={() => this.handleDeleteStaffTransaction()}>
                  <DeleteForeverTwoToneIcon />
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
                  rows={arrParcelsByTransaction}
                  columns={options.columnsParcels}
                  pageSizeOptions={[5, 7]}
                  autoHeight={true}
                  checkboxSelection={true}
                  onRowSelectionModelChange={(ids) => {
                    const selectedIDs = new Set(ids);

                    let selectedRowData = [];
                    arrParcelsByTransaction.map((row) => {
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
    arrParcelsByTransaction: state.staffTransaction.arrParcelsByTransaction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllParcelsBYTransactionID: (zip_code) => dispatch(actions.getAllParcelsBYTransactionIDAction(zip_code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TranStaffManageParcels);
