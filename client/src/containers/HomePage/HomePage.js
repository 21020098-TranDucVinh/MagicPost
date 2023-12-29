import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomePage.scss';
import HomeHeader from './HomeHeader';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import * as actions from '../../store/actions/index';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import * as services from '../../services/index';
import Typography from '@mui/material/Typography';
import HomeFooter from './HomeFooter';
// const stepss = ['Name tran1', 'name col1', 'name col2', 'name tran2', 'Your home'];
class Homepage extends Component {
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
  }

  handleOnchangeInput = (event, id) => {
    let copyState = this.state;
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleSearchParcel = async () => {
    const { arrTransactions, arrCollections } = this.props;
    let res = await services.getTrackingByParcelId(this.state.parcel_id);
    console.log('check respone  :', res);
    if (res && res.errorCode === 0) {
      this.setState({
        dataProgressParcel: res,
        steps: res.steps,
        parcel: res.parcel,
        stepsMain: await this.buildStepStepParcels(arrTransactions, arrCollections),
      });
    }
  };
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
    let { steps, parcel } = this.state;
    let listIdZipCode = await this.getIdEachNode(steps);
    // result = this.buildGetAddressByZipCode(listIdZipCode, arrTransactions);
    console.log('list zip code OK :', listIdZipCode);
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

  render() {
    let { dataProgressParcel, parcel, stepsMain } = this.state;
    console.log('check mainStep : ', stepsMain);
    return (
      <div className="homepage-container">
        <HomeHeader />
        <div className="homepage-banner-container row">
          <div className="company-info col-12 container py-3">
            <div className="px-5 company-info-detail">
              <div className="info-top">
                <h1 className="text-header-rps text-center">Welcome to MagicPost Center</h1>
              </div>
              <div className="info-middle info text-content-rps ">
                <ul className="">
                  What make us unique?
                  <li>Same day fulfillment and delivery within VietNam</li>
                  <li>02 days delivery within Canada</li>
                </ul>
              </div>
              <div className="info-bottom info ">
                <AvatarGroup max={4}>
                  <Avatar alt="Remy Sharp" src="../../assets/images/logo_tiger.jpg" />
                  <Avatar alt="Travis Howard" src="../../assets/images/logo2.jpg" />
                  <Avatar alt="Cindy Baker" src="../../assets/images/logo2.jpg" />
                  <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                  <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
                </AvatarGroup>
              </div>
            </div>
          </div>
          <div className="search-parcel-container col-12 container">
            <div className="search-content p-5">
              <div className="search-box container">
                <div className="title-search-parcel text-center p-3">Search parcel</div>
                <div className="box-search-parcel-container">
                  <div className="box-search-parcel-content p-3">
                    <Paper
                      component="form"
                      sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                        width: 400,
                      }}
                    >
                      <IconButton sx={{ p: '10px' }} aria-label="menu">
                        <MenuIcon />
                      </IconButton>
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Ex:P00001"
                        inputProps={{ 'aria-label': 'search google maps' }}
                        onChange={(event) => this.handleOnchangeInput(event, 'parcel_id')}
                      />
                      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon onClick={() => this.handleSearchParcel()} />
                      </IconButton>
                    </Paper>
                  </div>
                  <div className="box-search-parcel-result  ">
                    <div className="result-info p-3 text-content-rps ">
                      <div>
                        Tracking number: <span>{dataProgressParcel?.parcel?.parcel_id}</span>
                      </div>
                      <div>
                        Shipping date:<span>{dataProgressParcel?.parcel?.s_time}</span>
                      </div>
                      <div>
                        Estimated delivery date:<span>14/09/2023</span>
                      </div>
                      <div>
                        Status:
                        <span>{parcel.status}</span>
                      </div>
                    </div>
                    <div className="result-chart p-3 ">
                      <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={stepsMain.length - 2}>
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
              </div>
            </div>
          </div>
        </div>
        <div className="welcome-magicpost-info-container container">
          <div className="row welcome-magicpost-info-content">
            <div className="col-8 left-content-info">
              <h1 className="text-header-rps">Welcome to MagicPost</h1>
              <p className="lead text-content-rps">
                We're a Vietnamese owned & operated courier company that offers express delivery as standard, real-time
                tracking in the palm of your hand and a transparent fixed price model. With Click couriers you're in the
                driver's seat.
              </p>
              <p className="lead">
                <a className="btn btn-primary btn-lg" href="google.com" role="button">
                  contact us
                </a>
              </p>
            </div>
            <div className="col-4 right-content-info">
              <h1 className="text-header-rps">Features</h1>
              <ul className="">
                <li>Largest coverage in Ontario than any other courier for same day delivery</li>
                <li>Fixed Rate $6 for all your shipments.</li>
                <li>Latest cut-off time int market 2pm for same delivery.</li>
                <li>Monday to Saturday service.</li>
              </ul>
            </div>
          </div>
        </div>
        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
