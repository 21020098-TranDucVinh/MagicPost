import actionTypes from './actionTypes';
import {
     getAllUserPending,
     getAllTransactions,
     getAllCollections,
     editUserPending,
     getAllAdminTransactions,
     getAllAdminCollections,
} from '../../services/adminService';
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

// get all admin transaction
export const getAllAdminTransactionsAction = () => {
     return async (dispatch, getState) => {
          try {
               let res = await getAllAdminTransactions();
               if (res && res.errorCode === 0) {
                    dispatch({
                         type: actionTypes.GET_ALL_ADMIN_TRANSACTIONS_SUCCESS,
                         data: res.data,
                    });
               }
          } catch (e) {
               console.log('get all admin transactions success', e);
               dispatch({
                    type: actionTypes.GET_ALL_ADMIN_TRANSACTIONS_FAILED,
               });
          }
     };
};

// get all admin collection
export const getAllAdminCollectionsAction = () => {
     return async (dispatch, getState) => {
          try {
               let res = await getAllAdminCollections();
               if (res && res.errorCode === 0) {
                    dispatch({
                         type: actionTypes.GET_ALL_ADMIN_COLLECTIONS_SUCCESS,
                         data: res.data,
                    });
               }
          } catch (e) {
               console.log('get all admin collections success', e);
               dispatch({
                    type: actionTypes.GET_ALL_ADMIN_COLLECTIONS_FAILED,
               });
          }
     };
};
// is edit collection
export const isEditCollectionAction = () => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.IS_EDIT_COLLECTION,
               });
          } catch (e) {
               console.log('not edit collection', e);
          }
     };
};
// is not edit collection
export const isNotEditCollectionAction = () => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.IS_NOT_EDIT_COLLECTION,
               });
          } catch (e) {
               console.log('edit collection', e);
          }
     };
};
// fetch data edit collection
export const fetchDataEditCollectionAction = (data) => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.FETCH_DATA_EDIT_COLLECTION,
                    data: data,
               });
          } catch (e) {
               console.log('fetch data edit collection failed', e);
          }
     };
};
// clear dât edit collection
export const clearDataEditCollectionAction = (data) => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.CLEAR_DATA_EDIT_COLLECTION,
                    data: {},
               });
          } catch (e) {
               console.log('clear data edit collection failed', e);
          }
     };
};
// is edit collection
export const isEditTransactionAction = () => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.IS_EDIT_TRANSACTION,
               });
          } catch (e) {
               console.log('not edit transaction', e);
          }
     };
};
// is not edit collection
export const isNotTransactionAction = () => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.IS_NOT_EDIT_TRANSACTION,
               });
          } catch (e) {
               console.log('edit transaction', e);
          }
     };
};

// fetch data edit collection
export const fetchDataEditTransactionAction = (data) => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.FETCH_DATA_EDIT_TRANSACTION,
                    data: data,
               });
          } catch (e) {
               console.log('fetch data edit transaction failed', e);
          }
     };
};
// clear data edit collection
export const clearDataEditTransactionAction = (data) => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.CLEAR_DATA_EDIT_TRANSACTION,
               });
          } catch (e) {
               console.log('clear data edit transaction failed', e);
          }
     };
};
// is edit collection
export const isEditAdminPendingAction = () => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.IS_EDIT_ADMIN_PENDING,
               });
          } catch (e) {
               console.log('not edit admin pending', e);
          }
     };
};
// is not edit collection
export const isNotEditAdminPendingAction = () => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.IS_NOT_EDIT_ADMIN_PENDING,
               });
          } catch (e) {
               console.log('edit admin pending', e);
          }
     };
};
// fetch data edit collection
export const fetchDataEditPendingAdminAction = (data) => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.FETCH_DATA_EDIT_ADMIN_PENDING,
                    data: data,
               });
          } catch (e) {
               console.log('fetch data edit pending admin failed', e);
          }
     };
};
// clear data edit collection
export const clearDataEditPendingAdminAction = () => {
     return async (dispatch, getState) => {
          try {
               dispatch({
                    type: actionTypes.CLEAR_DATA_EDIT_ADMIN_PENDING,
               });
          } catch (e) {
               console.log('clear data edit pending admin failed', e);
          }
     };
};
