import actionTypes from './actionTypes';
import * as services from '../../services/index';
//get All pending Parcel
export const getAllPendingParcelsAction = () => {
     return async (dispatch, getState) => {
          try {
               let res = await services.getAllPendingParcel();
               if (res && res.errorCode === 0) {
                    dispatch({
                         type: actionTypes.GET_ALL_PENDING_PARCEL_SUCCESS,
                         data: res.parcels,
                    });
               }
          } catch (e) {
               console.log(e);
               dispatch({
                    type: actionTypes.GET_ALL_PENDING_PARCEL_FAILED,
               });
          }
     };
};
//get All pending Parcel
export const getAllPendingParcelsBYTransactionIDAction = (transactionID, accessToken) => {
     return async (dispatch, getState) => {
          try {
               let res = await services.getAllPendingParcelByTransactionId(transactionID, accessToken);
               if (res && res.errorCode === 0) {
                    dispatch({
                         type: actionTypes.GET_ALL_PENDING_PARCEL_BY_TRANSACTION_ID_SUCCESS,
                         data: res.parcels,
                    });
               }
          } catch (e) {
               console.log(e);
               dispatch({
                    type: actionTypes.GET_ALL_PENDING_PARCEL_BY_TRANSACTION_ID_FAILED,
               });
          }
     };
};
export const fetchParcelsToSendColAction = (ArrParcels) => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.FETCH_PARCEL_TO_SEND_TO_COLLECTION_SUCCESS,
                    data: ArrParcels,
               });
          } catch (e) {
               console.log(e);
               dispatch({
                    type: actionTypes.FETCH_PARCEL_TO_SEND_TO_COLLECTION_FAILED,
               });
          }
     };
};
export const clearParcelsToSendColAction = () => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.CLEAR_PARCEL_TO_SEND_TO_COLLECTION_SUCCESS,
               });
          } catch (e) {
               console.log(e);
               dispatch({
                    type: actionTypes.CLEAR_PARCEL_TO_SEND_TO_COLLECTION_FAILED,
               });
          }
     };
};
export const fetchDataToModalToPrintOrder = (data) => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.FETCH_DATA_T0_MODAL_PRINT_ORDER_SUCCESS,
                    data: data,
               });
          } catch (e) {
               console.log(e);
               dispatch({
                    type: actionTypes.FETCH_DATA_T0_MODAL_PRINT_ORDER_FAILED,
               });
          }
     };
};
export const clearDataToModalToPrintOrder = (data) => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.FETCH_DATA_T0_MODAL_PRINT_ORDER_FAILED,
               });
          } catch (e) {
               console.log(e);
          }
     };
};
//get All delivering Parcel
export const getAllDeliveringParcelsBYTransactionIDAction = (transactionID, accessToken) => {
     return async (dispatch, getState) => {
          try {
               let res = await services.getAllDeliveringParcelByTransactionId(transactionID, accessToken);

               if (res && res.errorCode === 0) {
                    dispatch({
                         type: actionTypes.GET_ALL_PARCEL_IN_DELIVERING_BY_TRAN_ZIP_CODE_SUCCESS,
                         data: res.parcels,
                    });
               }
          } catch (e) {
               console.log(e);
               dispatch({
                    type: actionTypes.GET_ALL_PARCEL_IN_DELIVERING_BY_TRAN_ZIP_CODE_FAILED,
               });
          }
     };
};
//get All delivering Parcel
export const getAllParcelsBYTransactionIDAction = (transactionID) => {
     return async (dispatch, getState) => {
          try {
               let res = await services.getAllParcelByTransactionId(transactionID);
               console.log('check res action :', res);
               if (res && res.errorCode === 0) {
                    dispatch({
                         type: actionTypes.GET_ALL_PARCEL_BY_TRAN_ZIP_CODE_SUCCESS,
                         data: res.parcels,
                    });
               }
          } catch (e) {
               console.log(e);
               dispatch({
                    type: actionTypes.GET_ALL_PARCEL_BY_TRAN_ZIP_CODE_FAILED,
               });
          }
     };
};
