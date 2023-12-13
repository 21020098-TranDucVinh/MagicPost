import actionTypes from '../actions/actionTypes';

const initialState = {
     arrPendingParcels: [],
     arrParcelsToSendCol: [],
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
          case actionTypes.FETCH_PARCEL_TO_SEND_TO_COLLECTION_SUCCESS:
               state.arrParcelsToSendCol = action.data;
               // console.log('redux :', state.arrParcelsToSendCol);
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.FETCH_PARCEL_TO_SEND_TO_COLLECTION_FAILED:
               state.arrParcelsToSendCol = [];
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.CLEAR_PARCEL_TO_SEND_TO_COLLECTION_SUCCESS:
               state.arrParcelsToSendCol = '';
               return {
                    ...state,
                    started: true,
               };

          default:
               return state;
     }
};

export default transactionStaffReducer;
