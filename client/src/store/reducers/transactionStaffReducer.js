import actionTypes from '../actions/actionTypes';

const initialState = {
     arrPendingParcels: [],
     arrParcelsToSendCol: [],
     ParcelPendingEachTransaction: [],
     dataToModalToPrintOrder: '',
     arrDeliveringParcels: [],
     arrParcelsByTransaction: [],
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
          case actionTypes.GET_ALL_PENDING_PARCEL_BY_TRANSACTION_ID_SUCCESS:
               state.ParcelPendingEachTransaction = action.data;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.FETCH_DATA_T0_MODAL_PRINT_ORDER_SUCCESS:
               state.dataToModalToPrintOrder = action.data;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.FETCH_DATA_T0_MODAL_PRINT_ORDER_FAILED:
               state.dataToModalToPrintOrder = '';
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.GET_ALL_PARCEL_IN_DELIVERING_BY_TRAN_ZIP_CODE_SUCCESS:
               state.arrDeliveringParcels = action.data;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.GET_ALL_PARCEL_IN_DELIVERING_BY_TRAN_ZIP_CODE_FAILED:
               state.arrDeliveringParcels = [];
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.GET_ALL_PARCEL_BY_TRAN_ZIP_CODE_SUCCESS:
               state.arrParcelsByTransaction = action.data;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.GET_ALL_PARCEL_BY_TRAN_ZIP_CODE_FAILED:
               state.arrParcelsByTransaction = [];
               return {
                    ...state,
                    started: true,
               };
          default:
               return state;
     }
};

export default transactionStaffReducer;
