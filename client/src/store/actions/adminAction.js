import actionTypes from './actionTypes';
import { getAllUserPending, getAllTransactions, getAllCollections, editUserPending } from '../../services/adminService';
// get all user pending
export const getAllUserPendingAction = () => {
     return async (dispatch, getState) => {
          try {
               let res = await getAllUserPending();
               if (res && res.errorCode === 0) {
                    dispatch(getAllUserPendingActionSuccess(res.admin));
               }
          } catch (e) {
               console.log('fetchGenderStart', e);
          }
     };
};
// get all user pending success
export const getAllUserPendingActionSuccess = (data) => ({
     type: actionTypes.GET_PENDING_USER_SUCCESS,
     data: data,
});
//get all transaction
export const getAllTransactionsAction = () => {
     return async (dispatch, getState) => {
          try {
               let res = await getAllTransactions();
               if (res && res.errorCode === 0) {
                    dispatch(getAllTransactionSuccess(res.transactions));
               }
          } catch (e) {
               console.log('get all transactions success', e);
               dispatch({
                    type: actionTypes.GET_ALL_TRANSACTIONS_FAILED,
               });
          }
     };
};
// get all transaction success
export const getAllTransactionSuccess = (data) => ({
     type: actionTypes.GET_ALL_TRANSACTIONS_SUCCESS,
     data: data,
});

// get all collection
export const getAllCollectionsAction = () => {
     return async (dispatch, getState) => {
          try {
               let res = await getAllCollections();
               if (res && res.errorCode === 0) {
                    dispatch(getAllCollectionsSuccess(res.collections));
               }
          } catch (e) {
               console.log('get all collections success', e);
               dispatch({
                    type: actionTypes.GET_ALL_COLLECTIONS_FAILED,
               });
          }
     };
};
// get all collection success
export const getAllCollectionsSuccess = (data) => ({
     type: actionTypes.GET_ALL_COLLECTIONS_SUCCESS,
     data: data,
});
// update user pending
export const updateUserAction = (data) => {
     return async (dispatch, getState) => {
          try {
               let res = await editUserPending(data);
               if (res && res.errorCode === 0) {
                    dispatch({
                         type: actionTypes.CREATE_UPDATE_USER_PENDING_SUCCESS,
                         data: data,
                    });
               }
          } catch (e) {
               console.log('get all collections success', e);
               dispatch({
                    type: actionTypes.CREATE_UPDATE_USER_PENDING_FAILED,
               });
          }
     };
};
// case update user failed
export const updateUserFailed = () => ({
     type: actionTypes.CREATE_UPDATE_USER_PENDING_FAILED,
});
