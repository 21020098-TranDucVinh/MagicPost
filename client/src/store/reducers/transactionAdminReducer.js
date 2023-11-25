import actionTypes from '../actions/actionTypes';

const initialState = {
     arrTransactionById: [],
};

const adminReducer = (state = initialState, action) => {
     switch (action.type) {
          case actionTypes.GET_ALL_TRANSACTION_BY_ID_SUCCESS:
               state.arrTransactionById = action.data;
               return {
                    ...state,
                    started: true,
               };

          default:
               return state;
     }
};

export default adminReducer;
