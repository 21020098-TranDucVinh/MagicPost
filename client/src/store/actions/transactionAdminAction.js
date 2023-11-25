import actionTypes from './actionTypes';
import { getTransactionById } from '../../services/TransactionService';

export const getTransactionStaffByIdAction = () => {
     return async (dispatch, getState) => {
          try {
               let res = await getTransactionById();
               if (res && res.errorCode === 0) {
                    dispatch({
                         type: actionTypes.GET_ALL_TRANSACTION_BY_ID_SUCCESS,
                         data: res.staff,
                    });
               }
          } catch (e) {
               console.log(e);
               dispatch({
                    type: actionTypes.GET_ALL_TRANSACTION_BY_ID_FAILED,
               });
          }
     };
};

export const fetchDataEditStaffAction = (data) => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.FETCH_DATA_EDIT_STAFF_SUCCESS,
                    data: data,
               });
          } catch (e) {
               console.log(e);
               dispatch({
                    type: actionTypes.FETCH_DATA_EDIT_STAFF_FAILED,
               });
          }
     };
};
export const clearDataEditStaffAction = (data) => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.FETCH_DATA_EDIT_STAFF_SUCCESS,
                    data: '',
               });
          } catch (e) {
               console.log(e);
               dispatch({
                    type: actionTypes.FETCH_DATA_EDIT_STAFF_FAILED,
               });
          }
     };
};
export const isEditStaffAction = () => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.IS_EDIT_STAFF,
               });
          } catch (e) {
               console.log(e);
               dispatch({
                    type: actionTypes.IS_NOT_EDIT_STAFF,
               });
          }
     };
};
export const isNotEditStaffAction = () => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.IS_NOT_EDIT_STAFF,
               });
          } catch (e) {
               console.log(e);
               dispatch({
                    type: actionTypes.IS_EDIT_STAFF,
               });
          }
     };
};
