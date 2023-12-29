import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import * as actions from '../../../store/actions/index';
import './ProgressOrder.scss';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as services from '../../../services/index';
import { styled } from '@mui/material/styles';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const steps = ['Name tran1', 'name col1', 'name col2', 'name tran2', 'Your home'];
class ProgressOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: '',
      parcel: '',
      dataProgressParcel: '',
      parcel_id: '',
      stepsMain: '',
    };
  }
  async componentDidMount() {
    this.props.getAllCollections();
    this.props.getAllTransactions();
    let parcel_id = this.props.match.params.parcel_id;
    const { arrTransactions, arrCollections } = this.props;
    let res = await services.getTrackingByParcelId(parcel_id);
    console.log('check respone  :', res);
    if (res && res.errorCode === 0) {
      this.setState({
        dataProgressParcel: res,
        steps: res.steps,
        parcel: res.parcel,
      });
    }

    this.setState({
      stepsMain: await this.buildStepStepParcels(arrTransactions, arrCollections),
    });
  }
  getIdEachNode = (steps) => {
    let res = [];
    for (let i = steps.length - 1; i >= 0; i--) {
      res.push(steps[i]?.s_zip_code);
    }
    console.log('list zip code : ', res);
    return res;
  };

  buildStepStepParcels = async (arrTransactions, arrCollections) => {
    // console.log('arrTransactions, arrCollections: ', arrTransactions, arrCollections);
    let result = [];
    let { parcel, dataProgressParcel } = this.state;
    let listIdZipCode = await this.getIdEachNode(dataProgressParcel.steps);
    // result = this.buildGetAddressByZipCode(listIdZipCode, arrTransactions);
    // console.log('list zip code OK :', listIdZipCode);
    for (let i = 0; i < arrCollections.length; i++) {
      for (let j = i; j < listIdZipCode.length; j++) {
        if (arrCollections[i].zip_code === listIdZipCode[j]) {
          result.push(arrCollections[i].address);
        }
      }
    }
    for (let i = 0; i < arrTransactions.length; i++) {
      for (let j = i; j < listIdZipCode.length; j++) {
        if (arrTransactions[i].zip_code === listIdZipCode[j]) {
          result.push(arrTransactions[i].address);
        }
      }
    }
    let uniqueArr = [...new Set(result)].reverse();
    result = ['Start', ...uniqueArr, parcel.r_address];
    console.log('check main step : ', result);
    return result;
  };
  backHomePage = () => {
    this.props.history.push('/home');
  };
  render() {
    let { stepsMain, parcel } = this.state;
    console.log('parcel : ', parcel);
    return (
      <div className="container progress-container border border-white vw-100 vh-100">
        <div className="row">
          <div className="col-12 border w-auto p-3 progress-header mb-4 ">
            {/* <img src="../../../assets/images/logo2.jpg" alt="" class="rounded-circle logo-img"></img> */}
            <div className="logo-img border border-white rounded-circle" onClick={() => this.backHomePage()}></div>
          </div>
          <div className="col-12 mb-3">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Sender name</StyledTableCell>
                    <StyledTableCell>Sender phone</StyledTableCell>
                    <StyledTableCell>Receiver name</StyledTableCell>
                    <StyledTableCell>Receiver phone</StyledTableCell>
                    <StyledTableCell>Type</StyledTableCell>
                    <StyledTableCell>Cost</StyledTableCell>
                    <StyledTableCell>Weight</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {parcel && (
                    <StyledTableRow>
                      <StyledTableCell component="th" scope="row">
                        {parcel.s_name}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {parcel.s_phone}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {parcel.r_name}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {parcel.r_phone}
                      </StyledTableCell>
                      <StyledTableCell align="left">{parcel.type}</StyledTableCell>
                      <StyledTableCell align="left">{parcel.cost}</StyledTableCell>
                      <StyledTableCell align="left">{parcel.weight}</StyledTableCell>
                    </StyledTableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="col-12 border progress-content w-auto p-5  rounded">
            <Box sx={{ width: '100%' }}>
              <Stepper activeStep={stepsMain.length - 1}>
                {stepsMain &&
                  stepsMain.length > 0 &&
                  stepsMain.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    labelProps.optional = <Typography variant="caption">{label}</Typography>;
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}></StepLabel>
                      </Step>
                    );
                  })}
              </Stepper>
            </Box>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arrTransactions: state.admin.arrTransactions,
    arrCollections: state.admin.arrCollections,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTransactions: () => dispatch(actions.getAllTransactionsAction()),
    getAllCollections: () => dispatch(actions.getAllCollectionsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressOrder);
