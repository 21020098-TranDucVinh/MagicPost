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
ChartJS.register(ArcElement, Tooltip, Legend);
const today = dayjs();
class ChartStatisticParcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRange: '',
      selectedNode: '',
      optionsSelectTwo: '',
    };
  }
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
      if (selectedRange.value === 'NW') {
        this.setState({
          optionsSelectTwo: [],
        });
      }
    });
  };
  handleChangeSelectNode = async (selectedNode) => {
    this.setState({
      selectedNode: selectedNode,
    });
    // let res = await services.getStatisticParcelsByTransaction(selectedNode.valu);
  };
  render() {
    let { optionsSelectOne, data, options, arrNumberParcel } = this.props;
    let { optionsSelectTwo, selectedNode, selectedRange } = this.state;
    console.log('selected node : ', selectedNode);
    return (
      <>
        <div className="admin-container my-3">
          <div className="admin-content container">
            <div className="title-admin text-center my-4">Statistic parcel</div>
            <hr />
            <div className="row select-statistic-parcel">
              <div className="col-9 d-flex">
                {optionsSelectOne && optionsSelectOne.length > 0 && (
                  <div className="col-4 mb-1 ">
                    <Select
                      value={selectedRange}
                      placeholder={<div>Your Manager</div>}
                      onChange={this.handleChangeSelectRange}
                      options={optionsSelectOne}
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // userDefaultClassSuccess: (userInfo) => dispatch(actions.userDefaultClassSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartStatisticParcel);
