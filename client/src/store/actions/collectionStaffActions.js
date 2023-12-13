import actionTypes from './actionTypes';
import * as services from '../../services/index';
//get All pending Parcel
export const getParcelsFromTranAnotherNodeAction = (zip_code, accessToken) => {
     return async (dispatch, getState) => {
          try {
               let res = await services.getParcelsFromAnotherNode(zip_code, accessToken);
               if (res && res.errorCode === 0) {
                    dispatch({
                         type: actionTypes.GET_ALL_PARCEL_FROM_ANOTHER_NODE_SUCCESS,
                         payload: res.data,
                    });
               }
          } catch (e) {
               console.log(e);
               dispatch({
                    type: actionTypes.GET_ALL_PARCEL_FROM_ANOTHER_NODE_FAILED,
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

export const getALlReceivedParcels = (zip_code, accessToken) => {
     return async (dispatch, getState) => {
          try {
               console.log('check  zipcode & token : ', zip_code, accessToken);
               let res = await services.getAllReceivedParcels(zip_code, accessToken);
               console.log('check res :', res);
               if (res && res.errorCode === 0) {
                    dispatch({
                         type: actionTypes.NODE_GET_ALL_PARCEL_SUCCESS,
                         payload: res.data,
                    });
               }
          } catch (e) {
               console.log(e);
               dispatch({
                    type: actionTypes.NODE_GET_ALL_PARCEL_FAILED,
               });
          }
     };
};
