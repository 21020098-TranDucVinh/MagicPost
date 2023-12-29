import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from '@mui/material/Button';
import CheckBoxCustom from './Invoice/components/CheckBoxCustom';
import styles from './Invoice/./Invoice.module.scss';
import { CommonUtils } from '../../utils';
import classNames from 'classnames/bind';
import QRCode from 'react-qr-code';
import './ModalClientInvoice.scss';
import RowFlexTwoColumnWithFloat from './Invoice/components/RowFlexTwoColumnWithFloat';
const cx = classNames.bind(styles);
class ModalClientInvoice extends Component {
     constructor(props) {
          super(props);
          this.state = {};
     }
     handleExportReceipt = () => {
          CommonUtils.GenerateInvoice();
     };
     render() {
          console.log('dataToModalToPrintOrder: ', this.props.dataToModalToPrintOrder);
          return (
               <>
                    <Modal show={this.props.showModal} onHide={this.props.closeModal} size="xl" centered>
                         <>
                              <div
                                   style={{
                                        height: 'fit-content',
                                        marginLeft: '1rem',
                                        marginRight: '1rem',
                                   }}
                              >
                                   <Button
                                        style={{
                                             marginBottom: '1rem',
                                        }}
                                        variant="contained"
                                        color="inherit"
                                        onClick={CommonUtils.GenerateInvoice}
                                   >
                                        Xuất giấy biên nhận
                                   </Button>
                              </div>

                              <div className={cx(styles.mainPage)} ref={'invoiceRef'}>
                                   <div className={cx(styles.subPage)} id="invoiceCapture">
                                        <div className={cx(styles.invoiceHeader)}>
                                             {/* <div className="my-logo"></div> */}
                                             <div
                                                  style={{
                                                       height: 'auto',
                                                       margin: '0 auto',
                                                       maxWidth: 64,
                                                       width: '100%',
                                                  }}
                                             >
                                                  <QRCode
                                                       size={256}
                                                       style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                                                       value={'http://192.168.1.8:3000/home'}
                                                       viewBox={`0 0 256 256`}
                                                  />
                                             </div>
                                        </div>
                                        <div className={cx(styles.invoiceBody)}>
                                             <table className={cx(styles.table)}>
                                                  <tbody>
                                                       <tr>
                                                            <td
                                                                 className={cx(styles.td)}
                                                                 style={{
                                                                      width: '50%',
                                                                      height: '25%',
                                                                 }}
                                                            >
                                                                 <div
                                                                      style={{
                                                                           width: '100%',
                                                                           height: '100%',
                                                                           display: 'flex',
                                                                           flexDirection: 'column',
                                                                      }}
                                                                 >
                                                                      <div
                                                                           style={{
                                                                                flex: '3',
                                                                           }}
                                                                      >
                                                                           <div className={cx(styles.title)}>
                                                                                1. Họ tên địa chỉ người gửi
                                                                           </div>
                                                                           <p>
                                                                                Dịch Vọng Hậu - Cầu Giấy - TP Hà Nội
                                                                                Dịch Vọng Hậu - Cầu Giấy - TP Hà Nội
                                                                           </p>
                                                                      </div>
                                                                      <div
                                                                           style={{
                                                                                flex: '1',
                                                                           }}
                                                                      >
                                                                           <p>
                                                                                <span className={cx(styles.bold)}>
                                                                                     Điện thoại:{' '}
                                                                                </span>{' '}
                                                                                0914508451
                                                                           </p>
                                                                      </div>
                                                                      <div
                                                                           style={{
                                                                                flex: '1',
                                                                           }}
                                                                           className={cx(styles.flexTwoColumn)}
                                                                      >
                                                                           <p className={cx(styles.left)}>
                                                                                <span className={cx(styles.bold)}>
                                                                                     Mã khách hàng:{' '}
                                                                                </span>
                                                                                0914508451
                                                                           </p>
                                                                           <p className={cx(styles.right)}>
                                                                                <span className={cx(styles.bold)}>
                                                                                     Mã bưu chính:{' '}
                                                                                </span>
                                                                                0914508451
                                                                           </p>
                                                                      </div>
                                                                 </div>
                                                            </td>
                                                            <td
                                                                 className={cx(styles.td)}
                                                                 style={{
                                                                      width: '50%',
                                                                      height: '25%',
                                                                 }}
                                                                 colspan={2}
                                                            >
                                                                 <div
                                                                      style={{
                                                                           width: '100%',
                                                                           height: '100%',
                                                                           display: 'flex',
                                                                           flexDirection: 'column',
                                                                      }}
                                                                 >
                                                                      <div
                                                                           style={{
                                                                                flex: '3',
                                                                           }}
                                                                      >
                                                                           <div className={cx(styles.title)}>
                                                                                2. Họ tên địa chỉ người nhận
                                                                           </div>
                                                                           <p>
                                                                                Dịch Vọng Hậu - Cầu Giấy - TP Hà Nội
                                                                                Dịch Vọng Hậu - Cầu Giấy - TP Hà Nội
                                                                           </p>
                                                                      </div>
                                                                      <div
                                                                           style={{
                                                                                flex: '1',
                                                                           }}
                                                                      >
                                                                           <p className={cx(styles.bold)}>Mã ĐH:</p>
                                                                      </div>
                                                                      <div
                                                                           style={{
                                                                                display: 'flex',
                                                                           }}
                                                                           className={cx(styles.flexTwoColumn)}
                                                                      >
                                                                           <p className={cx(styles.left)}>
                                                                                <span className={cx(styles.bold)}>
                                                                                     Mã khách hàng:{' '}
                                                                                </span>
                                                                                0914508451
                                                                           </p>
                                                                           <p className={cx(styles.right)}>
                                                                                <span className={cx(styles.bold)}>
                                                                                     Điện thoại:{' '}
                                                                                </span>{' '}
                                                                                0914508451
                                                                           </p>
                                                                      </div>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                       <tr>
                                                            <td className={cx(styles.td)} rowSpan={'2'}>
                                                                 <div
                                                                      style={{
                                                                           width: '100%',
                                                                           height: '100%',
                                                                      }}
                                                                 >
                                                                      <div>
                                                                           <div className={cx(styles.title)}>
                                                                                {' '}
                                                                                3. Loại hàng gửi
                                                                           </div>
                                                                           <div
                                                                                style={{
                                                                                     flex: '1',
                                                                                }}
                                                                           >
                                                                                <CheckBoxCustom
                                                                                     label={'Tài liệu'}
                                                                                     checked={true}
                                                                                ></CheckBoxCustom>
                                                                                <CheckBoxCustom
                                                                                     label={'Hàng hoá'}
                                                                                     checked={true}
                                                                                ></CheckBoxCustom>
                                                                           </div>
                                                                      </div>
                                                                      <div>
                                                                           <div className={cx(styles.title)}>
                                                                                4. Nội dung giá trị bưu gửi
                                                                           </div>
                                                                           <table
                                                                                className={cx(styles.table)}
                                                                                style={{
                                                                                     height: '70%',
                                                                                }}
                                                                           >
                                                                                <thead>
                                                                                     <tr className={cx(styles.bold)}>
                                                                                          <td className={cx(styles.td)}>
                                                                                               Nội dung
                                                                                          </td>
                                                                                          <td className={cx(styles.td)}>
                                                                                               Số lượng
                                                                                          </td>
                                                                                          <td className={cx(styles.td)}>
                                                                                               Trị giá
                                                                                          </td>
                                                                                          <td className={cx(styles.td)}>
                                                                                               Giấy tờ đính kèm
                                                                                          </td>
                                                                                     </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                     <tr>
                                                                                          <td className={cx(styles.td)}>
                                                                                               a
                                                                                          </td>
                                                                                          <td className={cx(styles.td)}>
                                                                                               a
                                                                                          </td>
                                                                                          <td className={cx(styles.td)}>
                                                                                               a
                                                                                          </td>
                                                                                          <td className={cx(styles.td)}>
                                                                                               a
                                                                                          </td>
                                                                                     </tr>
                                                                                </tbody>
                                                                           </table>
                                                                      </div>
                                                                      <div>
                                                                           <div className={cx(styles.title)}>
                                                                                5. Dịch vụ đặc biệt/ Cộng thêm
                                                                           </div>
                                                                           <p></p>
                                                                      </div>
                                                                 </div>
                                                            </td>
                                                            <td className={cx(styles.td)} rowspan="2">
                                                                 <div className={cx(styles.title)}>9. Cước</div>
                                                                 <RowFlexTwoColumnWithFloat
                                                                      label={'a. Cước chính'}
                                                                      amount={9500}
                                                                 ></RowFlexTwoColumnWithFloat>
                                                                 <RowFlexTwoColumnWithFloat
                                                                      label={'b. Phụ phí'}
                                                                      amount={9500}
                                                                 ></RowFlexTwoColumnWithFloat>
                                                                 <RowFlexTwoColumnWithFloat
                                                                      label={'c. Cước GTGT'}
                                                                      amount={9500}
                                                                 ></RowFlexTwoColumnWithFloat>
                                                                 <RowFlexTwoColumnWithFloat
                                                                      label={'d. Tổng cước (gồm VAT)'}
                                                                      amount={9500}
                                                                 ></RowFlexTwoColumnWithFloat>
                                                                 <RowFlexTwoColumnWithFloat
                                                                      label={'e. Thu khác'}
                                                                      amount={9500}
                                                                 ></RowFlexTwoColumnWithFloat>
                                                                 <div className={cx(styles.bold)}>
                                                                      <RowFlexTwoColumnWithFloat
                                                                           label={'f. Tổng thu'}
                                                                           amount={9500}
                                                                      ></RowFlexTwoColumnWithFloat>
                                                                 </div>
                                                            </td>
                                                            <td className={cx(styles.td)}>
                                                                 <div className={cx(styles.title)}>
                                                                      10. Khối lượng(kg)
                                                                 </div>

                                                                 <RowFlexTwoColumnWithFloat
                                                                      label={'Khối lượng thực tế'}
                                                                      amount={9500}
                                                                 ></RowFlexTwoColumnWithFloat>
                                                                 <RowFlexTwoColumnWithFloat
                                                                      label={'Khối lượng quy đổi'}
                                                                      amount={9500}
                                                                 ></RowFlexTwoColumnWithFloat>
                                                            </td>
                                                       </tr>
                                                       <tr>
                                                            {/* <td className={cx(styles.td)}>ABC2</td> */}
                                                            <td className={cx(styles.td)} rowspan="2">
                                                                 <div className={cx(styles.title)}>
                                                                      12. Chú dẫn nghiệp vụ
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                       <tr>
                                                            <td className={cx(styles.td)}>
                                                                 <div className={cx(styles.title)}>
                                                                      6. Chỉ dẫn của người gửi khi không phát được bưu
                                                                      gửi
                                                                 </div>
                                                                 <p>
                                                                      <CheckBoxCustom
                                                                           label={'Chuyển hoàn ngay'}
                                                                           checked={true}
                                                                      ></CheckBoxCustom>
                                                                      <CheckBoxCustom
                                                                           label={'Gọi điện cho người gửi'}
                                                                           checked={true}
                                                                      ></CheckBoxCustom>
                                                                      <CheckBoxCustom
                                                                           label={'Huỷ'}
                                                                           checked={true}
                                                                      ></CheckBoxCustom>
                                                                 </p>
                                                            </td>
                                                            <td className={cx(styles.td)}>
                                                                 <div className={cx(styles.title)}>
                                                                      {' '}
                                                                      11. Thu của người nhận
                                                                 </div>
                                                                 <RowFlexTwoColumnWithFloat
                                                                      label={'COD'}
                                                                      amount={9500}
                                                                 ></RowFlexTwoColumnWithFloat>
                                                                 <RowFlexTwoColumnWithFloat
                                                                      label={'Thu khác'}
                                                                      amount={9500}
                                                                 ></RowFlexTwoColumnWithFloat>
                                                                 <RowFlexTwoColumnWithFloat
                                                                      label={'Tổng thu'}
                                                                      amount={9500}
                                                                 ></RowFlexTwoColumnWithFloat>
                                                            </td>
                                                       </tr>
                                                       <tr>
                                                            <td className={cx(styles.td)}>
                                                                 <div>
                                                                      <div className={cx(styles.title)}>
                                                                           7. Cam kết của người gửi
                                                                      </div>
                                                                      <p
                                                                           style={{
                                                                                fontSize: '0.875rem',
                                                                           }}
                                                                      >
                                                                           Tôi chấp nhận các điều khoản tại mặt sau
                                                                           phiếu gửi và cam đoan bưu gửi này không chứa
                                                                           những mặt hàng nguy hiểm, cầm gửi. Trường hợp
                                                                           không phát được hãy thực hiện chỉ dẫn tại mục
                                                                           6, tôi sẽ trả cước chuyển hoàn
                                                                      </p>
                                                                      <div className={cx(styles.title)}>
                                                                           8. Ngày giờ gửi Chữ ký người gửi
                                                                      </div>
                                                                      <p>abc</p>
                                                                 </div>
                                                            </td>
                                                            <td className={cx(styles.td, styles.textCenter)}>
                                                                 <div className={cx(styles.title)}>
                                                                      13. Bưu cục chấp nhận
                                                                 </div>
                                                                 <div>Chữ ký GDV nhận</div>
                                                            </td>

                                                            <td className={cx(styles.td)}>
                                                                 <div className={cx(styles.title)}>
                                                                      14. Ngày giờ nhận
                                                                 </div>
                                                                 <p className={cx(styles.bold)}>29/05/2003 20h35p</p>
                                                                 <div className={cx(styles.textCenter)}>
                                                                      <p>Người nhận/ Người được uỷ quyền</p>
                                                                      <p>(Ký, ghi rõ họ tên)</p>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  </tbody>
                                             </table>
                                        </div>
                                   </div>
                              </div>
                         </>
                    </Modal>
                    <hr className="mt-4 mb-3" />
               </>
          );
     }
}

const mapStateToProps = (state) => {
     return {
          language: state.app.language,
          dataToModalToPrintOrder: state.staffTransaction.dataToModalToPrintOrder,
     };
};

const mapDispatchToProps = (dispatch) => {
     return {
          // userDefaultClassSuccess: (userInfo) => dispatch(actions.userDefaultClassSuccess(userInfo)),
     };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalClientInvoice);
