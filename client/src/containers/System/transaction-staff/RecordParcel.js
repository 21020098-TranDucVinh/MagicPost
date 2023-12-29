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
import ModalClientInvoice from '../../HomePage/ModalClientInvoice';

class RecordParcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpenModal: false,
      arrPendingParcels: [],
      selectedParcels: '',
    };
  }
  async componentDidMount() {
    const { userInfo } = this.props;
    this.props.getAllPendingParcelsEachTransaction(userInfo.zip_code, userInfo.token);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.ParcelPendingEachTransaction !== this.props.ParcelPendingEachTransaction) {
      this.setState({
        arrPendingParcels: this.props.ParcelPendingEachTransaction,
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
    this.setState({
      isOpenModal: true,
    });
  };

  // open mal
  openModal = (event) => {
    this.setState({ isOpen: true });
  };
  // close modal
  closeModal = (event) => {
    this.setState({ isOpen: false });
    document.location.reload();
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
          <ModalRecordParcel
            isOpen={this.state.isOpenModal}
            isCloseModal={this.isCloseModal}
            isOpenAnotherModalPrintOrder={this.openModal}
            isCloseAnotherModalPrintOrder={this.closeModal}
          />

          <div className="admin-content container">
            <div className="title-admin text-center my-4">
              <span>Manage Parcel</span>
              <ModalClientInvoice showModal={this.state.isOpen} closeModal={this.closeModal} />
            </div>
            <div className="btn-director-add-new-user-container">
              <div className="btn-create-new-user-container">
                <button className="btn btn-primary" onClick={() => this.openModalCrateNewTransactionStaff()}>
                  <span className="text-white">
                    <FaPlus />
                  </span>

                  <span>Record Parcel</span>
                </button>
              </div>
              <div className="btn-option-container">
                {arrPendingParcels.length > 0 && (
                  <>
                    <Button className="btn btn-primary" onClick={() => this.handleUICreateInvoice()}>
                      <FaPlus />
                      Create Invoice
                    </Button>
                    <Button className="btn btn-warning px-4" onClick={() => this.OpenModalEditStaff()}>
                      <EditTwoToneIcon />
                      <span>Edit</span>
                    </Button>
                    <Button className="btn btn-danger" onClick={() => this.handleDeleteStaffTransaction()}>
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
    userInfo: state.user.userInfo,
    ParcelPendingEachTransaction: state.staffTransaction.ParcelPendingEachTransaction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getAllPendingParcels: () => dispatch(actions.getAllPendingParcelsAction()),
    fetchParcelsToSendCol: (arrParcels) => dispatch(actions.fetchParcelsToSendColAction(arrParcels)),
    getAllPendingParcelsEachTransaction: (transactionID, accessToken) =>
      dispatch(actions.getAllPendingParcelsBYTransactionIDAction(transactionID, accessToken)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecordParcel);
