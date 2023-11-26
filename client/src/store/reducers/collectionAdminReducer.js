import actionTypes from '../actions/actionTypes';

const initialState = {
     arrCollectionStaff: [],
};

const adminReducer = (state = initialState, action) => {
     switch (action.type) {
          case actionTypes.GET_ALL_TRANSACTION_STAFF_BY_ID_SUCCESS:
               state.arrCollectionStaff = action.data;
               console.log('redux :', state.arrCollectionStaff);
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.GET_ALL_TRANSACTION_STAFF_BY_ID_FAILED:
               state.arrCollectionStaff = [];
               return {
                    ...state,
                    started: true,
               };
          default:
               return state;
     }
};

export default adminReducer;
