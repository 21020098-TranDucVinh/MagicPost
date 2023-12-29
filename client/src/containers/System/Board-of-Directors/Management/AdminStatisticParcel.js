import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChartStatisticParcel from './ChartStatisticParcel';
import * as actions from '../../../../store/actions/index';
class AdminStatisticParcel extends Component {
     constructor(props) {
          super(props);

          this.state = {
               optionsSelectStatistic: [
                    { value: 'NW', label: 'Nationwide' },
                    { value: 'TRAN', label: 'Transaction' },
                    { value: 'COLL', label: 'Collection' },
               ],
               data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [
                         {
                              label: '# of Votes',
                              data: [12, 19, 3, 5, 2, 3],
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
     componentDidMount() {
          const { userInfo } = this.props;
          this.props.getAllTransactions(userInfo.token);
          this.props.getAllCollections(userInfo.token);
     }

     render() {
          let { optionsSelectStatistic, data, options } = this.state;
          return (
               <ChartStatisticParcel
                    arrTransactions={this.props.arrTransactions}
                    arrCollections={this.props.arrCollections}
                    optionsSelectOne={optionsSelectStatistic}
                    optionsSelectTwo={optionsSelectStatistic}
                    data={data}
                    options={options}
               />
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
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminStatisticParcel);