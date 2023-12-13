import actionTypes from '../actions/actionTypes';

const initialState = {
     arrParcelFromTran: [],
     allParcels: [],
};

const colStaffReducer = (state = initialState, action) => {
     switch (action.type) {
          case actionTypes.GET_ALL_PARCEL_FROM_TRAN_SUCCESS:
               state.arrParcelFromTran = action.payload;
               // console.log('redux parcel from tran : ', state.arrParcelFromTran);
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.GET_ALL_PARCEL_SUCCESS:
               state.allParcels = action.payload;
               // console.log('redux  : ', state.allParcels);
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.GET_ALL_PARCEL_FAILED:
               state.allParcels = [];
               return {
                    ...state,
                    started: true,
               };
          default:
               return state;
     }
};

export default colStaffReducer;
