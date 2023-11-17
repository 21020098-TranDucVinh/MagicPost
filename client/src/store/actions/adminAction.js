import actionTypes from './actionTypes';
import { toast } from 'react-toastify';
import {
     getAllUserPending,
     getAllTransitions,
     getAllCollections,
     handleCreateNewPotentialAdmin,
     editUserPending,
} from '../../services/adminService';

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

export const getAllUserPendingActionSuccess = (data) => ({
     type: actionTypes.GET_PENDING_USER_SUCCESS,
     data: data,
});

export const getAllTransitionsAction = () => {
     return async (dispatch, getState) => {
          try {
               let res = await getAllTransitions();
               if (res && res.errorCode === 0) {
                    dispatch(getAllTransitionSuccess(res.transactions));
               }
          } catch (e) {
               console.log('get all transitions success', e);
               dispatch({
                    type: actionTypes.GET_ALL_TRANSITIONS_FAILED,
               });
          }
     };
};

export const getAllTransitionSuccess = (data) => ({
     type: actionTypes.GET_ALL_TRANSITIONS_SUCCESS,
     data: data,
});

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

export const getAllCollectionsSuccess = (data) => ({
     type: actionTypes.GET_ALL_COLLECTIONS_SUCCESS,
     data: data,
});

export const updateUserAction = (data) => {
     return async (dispatch, getState) => {
          try {
               let res = await editUserPending(data);
               if (res && res.errorCode === 0) {
                    // toast.success(res.message);
                    // // console.log('check res : ', res);
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

export const updateUserFailed = () => ({
     type: actionTypes.CREATE_UPDATE_USER_PENDING_FAILED,
});
