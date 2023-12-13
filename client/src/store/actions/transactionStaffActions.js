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
