import actionTypes from '../actions/actionTypes';

const initialState = {
     arrParcelFromAnotherNode: [],
     allParcels: [],
     allParcelEachNodeAfterConfirm: [],
};

const colStaffReducer = (state = initialState, action) => {
     switch (action.type) {
          case actionTypes.GET_ALL_PARCEL_FROM_ANOTHER_NODE_SUCCESS:
               state.arrParcelFromAnotherNode = action.payload;
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
          case actionTypes.NODE_GET_ALL_PARCEL_SUCCESS:
               state.allParcelEachNodeAfterConfirm = action.payload;

               return {
                    ...state,
                    started: true,
               };
          default:
               return state;
     }
};

export default colStaffReducer;
