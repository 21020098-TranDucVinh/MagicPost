import actionTypes from '../actions/actionTypes';

const initialState = {
     arrPendingParcels: [],
};

const transactionStaffReducer = (state = initialState, action) => {
     switch (action.type) {
          case actionTypes.GET_ALL_PENDING_PARCEL_SUCCESS:
               state.arrPendingParcels = action.data;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.GET_ALL_PENDING_PARCEL_FAILED:
               state.arrPendingParcels = [];
               return {
                    ...state,
                    started: true,
               };

          default:
               return state;
     }
};

export default transactionStaffReducer;
