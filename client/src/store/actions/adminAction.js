import actionTypes from './actionTypes';
import { getAllUserPending } from '../../services/userService';

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
