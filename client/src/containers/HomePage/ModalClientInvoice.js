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
    let { dataToModalToPrintOrder } = this.props;

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
                Issue a receipt
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
                              <div className={cx(styles.title)}>1. Sender's full name and address</div>
                              <p>{dataToModalToPrintOrder.s_address}</p>
                            </div>
                            <div
                              style={{
                                flex: '1',
                              }}
                            >
                              <p>
                                <span className={cx(styles.bold)}>Phone: </span> {dataToModalToPrintOrder.s_phone}
                              </p>
                            </div>
                            <div
                              style={{
                                flex: '1',
                              }}
                              className={cx(styles.flexTwoColumn)}
                            >
                              <p className={cx(styles.left)}>
                                <span className={cx(styles.bold)}>Customer's code: </span>
                                {dataToModalToPrintOrder.s_phone}
                              </p>
                              <p className={cx(styles.right)}>
                                <span className={cx(styles.bold)}>Postal code: </span>
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
                              <div className={cx(styles.title)}>2. Full name and address of the recipient</div>
                              <p>{dataToModalToPrintOrder.r_address}</p>
                            </div>
                            <div
                              style={{
                                flex: '1',
                              }}
                            >
                              <p className={cx(styles.bold)}>code orders</p>
                            </div>
                            <div
                              style={{
                                display: 'flex',
                              }}
                              className={cx(styles.flexTwoColumn)}
                            >
                              <p className={cx(styles.left)}>
                                <span className={cx(styles.bold)}>Customer's code: </span>
                                {dataToModalToPrintOrder.r_phone}
                              </p>
                              <p className={cx(styles.right)}>
                                <span className={cx(styles.bold)}>Phone: </span> {dataToModalToPrintOrder.r_phone}
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
                              <div className={cx(styles.title)}> 3. Shipment type</div>
                              <div
                                style={{
                                  flex: '1',
                                }}
                              >
                                <CheckBoxCustom label={'Document'} checked={true}></CheckBoxCustom>
                                <CheckBoxCustom label={'Package'} checked={false}></CheckBoxCustom>
                              </div>
                            </div>
                            <div>
                              <div className={cx(styles.title)}>4.Content of postage value</div>
                              <table
                                className={cx(styles.table)}
                                style={{
                                  height: '70%',
                                }}
                              >
                                <thead>
                                  <tr className={cx(styles.bold)}>
                                    <td className={cx(styles.td)}>Content</td>
                                    <td className={cx(styles.td)}>Quantity</td>
                                    <td className={cx(styles.td)}>Value</td>
                                    <td className={cx(styles.td)}>Attached documents</td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className={cx(styles.td)}>0</td>
                                    <td className={cx(styles.td)}>1</td>
                                    <td className={cx(styles.td)}>3</td>
                                    <td className={cx(styles.td)}>5</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <div>
                              <div className={cx(styles.title)}>5. Special Services/Plus</div>
                              <p></p>
                            </div>
                          </div>
                        </td>
                        <td className={cx(styles.td)} rowspan="2">
                          <div className={cx(styles.title)}>9. Fee</div>
                          <RowFlexTwoColumnWithFloat label={'a. Main fee'} amount={5000}></RowFlexTwoColumnWithFloat>
                          <RowFlexTwoColumnWithFloat label={'b. Surcharge'} amount={400}></RowFlexTwoColumnWithFloat>
                          <RowFlexTwoColumnWithFloat label={'c. VAT fee'} amount={3500}></RowFlexTwoColumnWithFloat>
                          <RowFlexTwoColumnWithFloat
                            label={'d. Total fare (including VAT)'}
                            amount={5000}
                          ></RowFlexTwoColumnWithFloat>
                          <RowFlexTwoColumnWithFloat
                            label={'e. Other revenue'}
                            amount={4000}
                          ></RowFlexTwoColumnWithFloat>
                          <div className={cx(styles.bold)}>
                            <RowFlexTwoColumnWithFloat
                              label={'f. total revenue'}
                              amount={5000}
                            ></RowFlexTwoColumnWithFloat>
                          </div>
                        </td>
                        <td className={cx(styles.td)}>
                          <div className={cx(styles.title)}>10. Mass(kg)</div>

                          <RowFlexTwoColumnWithFloat label={'Actual weight'} amount={9500}></RowFlexTwoColumnWithFloat>
                          <RowFlexTwoColumnWithFloat
                            label={'Conversion volume'}
                            amount={500}
                          ></RowFlexTwoColumnWithFloat>
                        </td>
                      </tr>
                      <tr>
                        {/* <td className={cx(styles.td)}>ABC2</td> */}
                        <td className={cx(styles.td)} rowspan="2">
                          <div className={cx(styles.title)}>12. Professional guide</div>
                        </td>
                      </tr>
                      <tr>
                        <td className={cx(styles.td)}>
                          <div className={cx(styles.title)}>
                            6. Instructions of the sender when the postal item cannot be delivered
                          </div>
                          <p>
                            <CheckBoxCustom label={'Call the sender'} checked={true}></CheckBoxCustom>
                            <CheckBoxCustom label={'Cancel'} checked={false}></CheckBoxCustom>
                          </p>
                        </td>
                        <td className={cx(styles.td)}>
                          <div className={cx(styles.title)}> 11. Recipient's collection</div>
                          <RowFlexTwoColumnWithFloat label={'COD'} amount={3500}></RowFlexTwoColumnWithFloat>
                          <RowFlexTwoColumnWithFloat label={'Other revenue'} amount={7000}></RowFlexTwoColumnWithFloat>
                          <RowFlexTwoColumnWithFloat label={'Total revenue'} amount={3500}></RowFlexTwoColumnWithFloat>
                        </td>
                      </tr>
                      <tr>
                        <td className={cx(styles.td)}>
                          <div>
                            <div className={cx(styles.title)}>7.Sender's commitment</div>
                            <p
                              style={{
                                fontSize: '0.875rem',
                              }}
                            >
                              I accept the terms on the back of the delivery slip and declare that this item does not
                              contain dangerous goods, consignment. In case you cannot play, follow the instructions at
                              Item 6, I will pay the return shipping fee
                            </p>
                            <div className={cx(styles.title)}>8. Date and time sent Sender's signature</div>
                            <p>abc</p>
                          </div>
                        </td>
                        <td className={cx(styles.td, styles.textCenter)}>
                          <div className={cx(styles.title)}>13. Post office accepts</div>
                          <div>GDV signature received</div>
                        </td>

                        <td className={cx(styles.td)}>
                          <div className={cx(styles.title)}>14. Date and time of receipt</div>
                          <p className={cx(styles.bold)}>29/05/2003 20h35p</p>
                          <div className={cx(styles.textCenter)}>
                            <p>Recipient/Authorized person</p>
                            <p>(Sign, write full name)</p>
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
    dataToModalToPrintOrder: state.staffTransaction.dataToModalToPrintOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // userDefaultClassSuccess: (userInfo) => dispatch(actions.userDefaultClassSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalClientInvoice);
