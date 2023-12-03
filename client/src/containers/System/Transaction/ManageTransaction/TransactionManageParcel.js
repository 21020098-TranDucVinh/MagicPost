import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions';

import ChartStatisticParcel from '../../Board-of-Directors/Management/ChartStatisticParcel';
// import { handleDefaultClassAPI } from '../../services/adminService';

class TransactionManageParcel extends Component {
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

     render() {
          let { optionsSelectStatistic, data, options } = this.state;
          return (
               <>
                    <ChartStatisticParcel
                         optionsSelectOne={optionsSelectStatistic}
                         optionsSelectTwo={optionsSelectStatistic}
                         data={data}
                         options={options}
                    />
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

export default connect(mapStateToProps, mapDispatchToProps)(TransactionManageParcel);
