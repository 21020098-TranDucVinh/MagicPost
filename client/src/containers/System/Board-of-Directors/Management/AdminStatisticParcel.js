import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../AdminManagement.scss';
import Select from 'react-select';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Avatar from '@mui/material/Avatar';
import OutboxTwoToneIcon from '@mui/icons-material/OutboxTwoTone';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { CommonUtils } from '../../../../utils';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import * as actions from '../../../../store/actions/index';
import * as services from '../../../../services/index';
ChartJS.register(ArcElement, Tooltip, Legend);
const today = dayjs();
class AdminStatisticParcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRange: '',
      selectedNode: '',
      optionsSelectTwo: '',
      arrNumberParcel: [],
      optionsSelectStatistic: [
        //    { value: 'NW', label: 'Nationwide' },
        { value: 'TRAN', label: 'Transaction' },
        { value: 'COLL', label: 'Collection' },
      ],
      data: {
        labels: ['Pending', 'Shipping', 'Delivering', 'Delivered'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        // Các cấu hình khác bạn muốn áp dụng cho biểu đồ
      },
    };
  }
  async componentDidMount() {
    const { userInfo } = this.props;
    this.props.getAllTransactions(userInfo.token);
    this.props.getAllCollections(userInfo.token);
    let res = await services.getStatisticNationWides();

    if (res && res.errorCode === 0) {
      this.setState({
        data: this.buildDataStatiStic(res),
      });
    }
  }
  buildDataStatiStic = (dataStatisticParcels) => {
    let number = [];
    number.push(dataStatisticParcels.pendingCount);
    number.push(dataStatisticParcels.shippingSentCount);
    number.push(dataStatisticParcels.deliveringSentCount);
    number.push(dataStatisticParcels.deliveredSentCount);
    this.setState({
      arrNumberParcel: number,
    });
    let data = {
      labels: ['Pending', 'Shipping', 'Delivering', 'Delivered'],
      datasets: [
        {
          label: '# of Votes',
          data: number,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',

            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    return data;
  };
  handleChangeSelectRange = (selectedRange) => {
    this.setState({ selectedRange: selectedRange }, () => {
      if (selectedRange.value === 'TRAN') {
        this.setState({
          optionsSelectTwo: CommonUtils.buildSelectionOptions(this.props.arrTransactions),
        });
      }
      if (selectedRange.value === 'COLL') {
        this.setState({
          optionsSelectTwo: CommonUtils.buildSelectionOptions(this.props.arrCollections),
        });
      }
      //  if (selectedRange.value === 'NW') {
      //    this.setState({
      //      optionsSelectTwo: [],
      //    });
      //  }
    });
  };
  handleChangeSelectNode = async (selectedNode) => {
    this.setState({
      selectedNode: selectedNode,
    });
    let res = await services.getStatisticParcelsByTransaction(selectedNode.value);
    if (res && res.errorCode === 0) {
      this.setState({
        data: this.buildDataStatiStic(res),
      });
    }
  };

  render() {
    let { optionsSelectTwo, selectedNode, selectedRange, data, options, optionsSelectStatistic, arrNumberParcel } =
      this.state;
    console.log('arrNumberParcel : ', arrNumberParcel);
    return (
      <>
        <div className="admin-container my-3">
          <div className="admin-content container">
            <div className="title-admin text-center my-4">Statistic parcel</div>
            <hr />
            <div className="row select-statistic-parcel">
              <div className="col-9 d-flex">
                {optionsSelectStatistic && optionsSelectStatistic.length > 0 && (
                  <div className="col-4 mb-1 ">
                    <Select
                      value={selectedRange}
                      placeholder={<div>Your Manager</div>}
                      onChange={this.handleChangeSelectRange}
                      options={optionsSelectStatistic}
                    />
                  </div>
                )}
                {optionsSelectTwo && optionsSelectTwo.length > 0 && (
                  <div className="col-4 mb-1">
                    <Select
                      value={selectedNode}
                      placeholder={<div>Your Manager</div>}
                      onChange={this.handleChangeSelectNode}
                      options={optionsSelectTwo}
                    />
                  </div>
                )}
              </div>
              <div className="col-3 mb-1">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker slotProps={{ textField: { size: 'small' } }} defaultValue={today} maxDate={today} />
                </LocalizationProvider>
              </div>
            </div>
            <div className="statistic-container container py-2">
              <div className="statistic-content row">
                <div className="col-6 chart-content pl-5 ">
                  <div className=" border-chart px-1">
                    <Avatar
                      sx={{
                        bgcolor: 'green',
                      }}
                    >
                      <InventoryIcon />
                    </Avatar>
                    <span>
                      <div>{arrNumberParcel[0]}</div>
                      <div>Pending</div>
                    </span>
                  </div>
                </div>
                <div className="col-6 chart-content pl-5 ">
                  <div className="border-chart px-1 ">
                    <Avatar
                      sx={{
                        bgcolor: 'orange',
                      }}
                    >
                      <LocalShippingIcon />
                    </Avatar>
                    <span>
                      <div>{arrNumberParcel[1]}</div>
                      <div>Shipping</div>
                    </span>
                  </div>
                </div>
                <div className="col-6 chart-content pl-5 ">
                  <div className=" border-chart px-1">
                    <Avatar
                      sx={{
                        bgcolor: 'green',
                      }}
                    >
                      <OutboxTwoToneIcon />
                    </Avatar>
                    <span>
                      <div>{arrNumberParcel[2]}</div>
                      <div>Delivering</div>
                    </span>
                  </div>
                </div>
                <div className="col-6 chart-content pl-5 ">
                  <div className="border-chart px-1 ">
                    <Avatar
                      sx={{
                        bgcolor: 'orange',
                      }}
                    >
                      <CheckCircleIcon />
                    </Avatar>
                    <span>
                      <div>{arrNumberParcel[3]}</div>
                      <div>Delivered</div>
                    </span>
                  </div>
                </div>
                <div className="col-12 py-4">
                  <Pie data={data} options={options} />
                </div>
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
    arrCollections: state.admin.arrCollections,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTransactions: () => dispatch(actions.getAllTransactionsAction()),
    getAllCollections: () => dispatch(actions.getAllCollectionsAction()),
    // userDefaultClassSuccess: (userInfo) => dispatch(actions.userDefaultClassSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminStatisticParcel);
