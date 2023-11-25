import actionTypes from './actionTypes';
import { getTransactionById } from '../../services/TransactionService';

export const getTransactionByIdAction = () => {
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
          }
     };
};
