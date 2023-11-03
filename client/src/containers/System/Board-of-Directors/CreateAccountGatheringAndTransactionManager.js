import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CreateAccountGatheringAndTransactionManager.scss';
import DirectorModalAddNewUser from './AdminModal/DirectorModalAddNewUser';
// import ModalPersonal from '../Admin/ModalPersonal';
// import HomeFooter from '../../HomePage/HomeFooter';
class CreateAccountGatheringAndTransactionManager extends Component {
     constructor(props) {
          super(props);
          this.state = {
               isOpenModal: false,
               arrUsers: [
                    { email: 'thachdinh110902', firstName: 'Thach', lastName: 'Dinh' },
                    { email: 'user1', firstName: 'First1', lastName: 'Last1' },
                    { email: 'user2', firstName: 'First2', lastName: 'Last2' },
                    { email: 'user3', firstName: 'First3', lastName: 'Last3' },
                    { email: 'user4', firstName: 'First4', lastName: 'Last4' },
                    { email: 'user5', firstName: 'First5', lastName: 'Last5' },
                    { email: 'user6', firstName: 'First6', lastName: 'Last6' },
                    { email: 'user7', firstName: 'First7', lastName: 'Last7' },
                    { email: 'user8', firstName: 'First8', lastName: 'Last8' },
                    { email: 'user9', firstName: 'First9', lastName: 'Last9' },
                    { email: 'user10', firstName: 'First10', lastName: 'Last10' },
               ],
          };
     }
     directorDandleCreateNewUser = () => {
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
     render() {
          let { arrUsers } = this.state;
          console.log('check user : ', arrUsers);
          return (
               <>
                    <div className="admin-container">
                         <DirectorModalAddNewUser isOpen={this.state.isOpenModal} isCloseModal={this.isCloseModal} />

                         <div className="title-admin text-center my-5">Tạo tài khoản</div>
                         <div className="btn-director-add-new-user-container">
                              <div className="btn-create-new--user-container">
                                   <button
                                        className="btn-create-new-user"
                                        onClick={() => this.directorDandleCreateNewUser()}
                                   >
                                        <i className="fas fa-plus"></i>
                                        <span>Thêm người dùng</span>
                                   </button>
                              </div>
                         </div>
                         <div className="table-user-content mt-2 px-5 mb-3 ">
                              <table className="customers table">
                                   <thead>
                                        <tr>
                                             <th>Email</th>
                                             <th>Tên</th>
                                             <th>Họ</th>
                                             <th>Địa chỉ</th>
                                             <th>Tuỳ chọn</th>
                                        </tr>
                                   </thead>
                                   <tbody>
                                        {arrUsers &&
                                             arrUsers.map((item, index) => {
                                                  return (
                                                       <tr>
                                                            <td>{item.email}</td>
                                                            <td>{item.firstName}</td>
                                                            <td>{item.lastName}</td>
                                                            <td>{item.address}</td>
                                                            <td>
                                                                 <button
                                                                      className="btn-edit"
                                                                      onClick={() => this.handleEditUser(item)}
                                                                 >
                                                                      <i className="fas fa-pencil-alt"></i>
                                                                 </button>
                                                                 <button
                                                                      className="btn-delete"
                                                                      onClick={() =>
                                                                           this.handleDeleteUser(item.className)
                                                                      }
                                                                 >
                                                                      <i className="fas fa-trash"></i>
                                                                 </button>
                                                            </td>
                                                       </tr>
                                                  );
                                             })}
                                   </tbody>
                              </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountGatheringAndTransactionManager);
