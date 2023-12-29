import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChartStatisticParcel from '../Board-of-Directors/Management/ChartStatisticParcel';
import * as services from '../../../services/index';
class TranStaffStatisticParcel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataStatisticParcels: '',
      arrNumberParcel: '',
      data: {
        labels: ['Red', 'Blue', 'gray', 'white'],
        datasets: [
          {
            label: '# of Votes',
            data: [2, 3, 10],
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
  // build data statistic
  buildDataStatiStic = (dataStatisticParcels) => {
    let number = [];
    number.push(dataStatisticParcels.pendingSentCount);
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
    };
    console.log('check data static number : ', data);
    return data;
  };
  async componentDidMount() {
    let res = await services.getStatisticParcelsByTransaction(this.props.userInfo.zip_code);
    this.setState({
      data: this.buildDataStatiStic(res),
    });
  }
  render() {
    let { data, options, arrNumberParcel } = this.state;
    return <ChartStatisticParcel data={data} options={options} arrNumberParcel={arrNumberParcel} />;
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // userDefaultClassSuccess: (userInfo) => dispatch(actions.userDefaultClassSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TranStaffStatisticParcel);
