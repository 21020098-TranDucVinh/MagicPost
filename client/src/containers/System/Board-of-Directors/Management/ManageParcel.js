import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../AdminManagement.scss';
import ModalManageParcel from '../AdminModal/ModalManageParcel';
import Select from 'react-select';
import { Chart, ArcElement } from 'chart.js';

import { Pie } from 'react-chartjs-2';
Chart.register(ArcElement);
class ManageParcel extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               arrParcels: [],
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
               // options: {
               //      responsive: true,
               //      maintainAspectRatio: false,
               //      // Các cấu hình khác bạn muốn áp dụng cho biểu đồ
               // },
          };
     }
     directorCreateParcel = () => {
          this.setState({
               isOpenModal: true,
          });
     };
     isCloseModal = () => {
          this.setState({
               isOpenModal: false,
          });
     };
     handleEditUser = () => {
          alert('edit');
     };
     handleDeleteUser = () => {
          alert('delete');
     };
     openModalCreateNewParcel = () => {
          this.setState({
               isOpenModal: true,
          });
     };
     render() {
          let { optionsSelectStatistic } = this.state;
          return (
               <>
                    <div className="admin-container">
                         <ModalManageParcel isOpen={this.state.isOpenModal} isCloseModal={this.isCloseModal} />

                         <div className="title-admin text-center my-4">Statistic parcel</div>
                         <div className="admin-content container">
                              <div className="row select-statistic-parcel">
                                   <div className="col-3">
                                        <Select
                                             // value={selectedAdmin}
                                             placeholder={<div>Your Manager</div>}
                                             onChange={this.handleChangeSelectAmin}
                                             options={optionsSelectStatistic}
                                        />
                                   </div>
                                   <div className="col-3">
                                        <Select
                                             // value={selectedAdmin}
                                             placeholder={<div>Your Manager</div>}
                                             onChange={this.handleChangeSelectAmin}
                                             options={optionsSelectStatistic}
                                             styles={{
                                                  input: () => ({
                                                       control: (base) => ({
                                                            ...base,
                                                            fontFamily: 'Times New Roman',
                                                       }),
                                                  }),
                                             }}
                                        />
                                   </div>
                              </div>
                              <div className="statistic-container container">
                                   <div className="statistic-content row">
                                        <div className="col-6 chart-content">
                                             <div className="row border-chart">
                                                  <div className="shipment col-3">
                                                       <i class="fas fa-shipping-fast col-4"></i>
                                                  </div>
                                                  <div className="data-container col-9">
                                                       <span>40</span>
                                                       <span className="title-chart">Number of parcels</span>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="col-6 chart-content">
                                             <div className="row border-chart">
                                                  <div className="shipment col-3">
                                                       <i class="fas fa-shipping-fast col-4"></i>
                                                  </div>
                                                  <div className="data-container col-9">
                                                       <span>40</span>
                                                       <span className="title-chart">Number of parcels</span>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="col-6">
                                             <Pie data={this.state.data} options={this.state.options} />
                                        </div>
                                        <div className="col-6">
                                             <Pie data={this.state.data} options={this.state.options} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageParcel);
