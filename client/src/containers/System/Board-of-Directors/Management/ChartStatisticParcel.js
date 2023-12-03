import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../AdminManagement.scss';
import ModalManageParcel from '../AdminModal/ModalManageParcel';
import Select from 'react-select';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Avatar from '@mui/material/Avatar';
import OutboxTwoToneIcon from '@mui/icons-material/OutboxTwoTone';
import MoveToInboxTwoToneIcon from '@mui/icons-material/MoveToInboxTwoTone';
ChartJS.register(ArcElement, Tooltip, Legend);
class ChartStatisticParcel extends Component {
     constructor(props) {
          super(props);
          this.state = {};
     }

     render() {
          // let { optionsSelectStatistic } = this.state;
          let { optionsSelectOne, optionsSelectTwo, data, options } = this.props;
          return (
               <>
                    <div className="admin-container my-3">
                         <ModalManageParcel isOpen={this.state.isOpenModal} isCloseModal={this.isCloseModal} />

                         <div className="title-admin text-center my-4">Statistic parcel</div>
                         <div className="admin-content container">
                              <div className="row select-statistic-parcel">
                                   <div className="col-3 mb-1 ">
                                        <Select
                                             // value={selectedAdmin}
                                             placeholder={<div>Your Manager</div>}
                                             onChange={this.handleChangeSelectAmin}
                                             options={optionsSelectOne}
                                        />
                                   </div>
                                   <div className="col-3 mb-1">
                                        <Select
                                             // value={selectedAdmin}
                                             placeholder={<div>Your Manager</div>}
                                             onChange={this.handleChangeSelectAmin}
                                             options={optionsSelectTwo}
                                        />
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
                                                       <OutboxTwoToneIcon />
                                                  </Avatar>
                                                  <span>
                                                       <div>40</div>
                                                       <div>shipment</div>
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
                                                       <MoveToInboxTwoToneIcon />
                                                  </Avatar>
                                                  <span>
                                                       <div>40</div>
                                                       <div>good received</div>
                                                  </span>
                                                  {/* <TextareaAutosize>argrefgersfv</TextareaAutosize> */}
                                                  {/* <div className="data-container col-9">
                                                       <span>40</span>
                                                       <span className="title-chart">shipment</span>
                                                  </div> */}
                                             </div>
                                        </div>
                                        <div className="col-6 py-4">
                                             <Pie data={data} options={options} />
                                        </div>
                                        <div className="col-6 py-4">
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
