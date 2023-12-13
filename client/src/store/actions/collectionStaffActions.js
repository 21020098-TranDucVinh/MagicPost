import actionTypes from './actionTypes';
import * as services from '../../services/index';
//get All pending Parcel
export const getParcelsFromTranAction = (col_zip_code, accessToken) => {
     return async (dispatch, getState) => {
          try {
               let res = await services.getParcelsFromTran(col_zip_code, accessToken);

               if (res && res.errorCode === 0) {
                    dispatch({
                         type: actionTypes.GET_ALL_PARCEL_FROM_TRAN_SUCCESS,
                         payload: res.data,
                    });
               }
          } catch (e) {
               console.log(e);
               dispatch({
                    type: actionTypes.GET_ALL_PARCEL_FROM_TRAN_FAILED,
               });
          }
     };
};

export const getAllParcelsAction = (accessToken) => {
     return async (dispatch, getState) => {
          try {
               let res = await services.getAllParcelsService(accessToken);

               if (res && res.errorCode === 0) {
                    dispatch({
                         type: actionTypes.GET_ALL_PARCEL_SUCCESS,
                         payload: res.parcels,
                    });
               }
          } catch (e) {
               console.log(e);
               dispatch({
                    type: actionTypes.GET_ALL_PARCEL_FAILED,
               });
          }
     };
};
