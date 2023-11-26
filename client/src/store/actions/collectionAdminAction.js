import actionTypes from './actionTypes';
import * as services from '../../services/index';
// action get all collection staff by Collection_zip_code
export const getCollectionStaffByIdAction = () => {
     return async (dispatch, getState) => {
          try {
               let res = await services.getCollectionStaffById();
               if (res && res.errorCode === 0) {
                    dispatch({
                         type: actionTypes.GET_ALL_TRANSACTION_STAFF_BY_ID_SUCCESS,
                         data: res.staff,
                    });
               }
          } catch (e) {
               console.log(e);
               dispatch({
                    type: actionTypes.GET_ALL_TRANSACTION_STAFF_BY_ID_FAILED,
               });
          }
     };
};
