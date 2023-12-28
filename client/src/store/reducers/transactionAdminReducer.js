import actionTypes from '../actions/actionTypes';

const initialState = {
     arrTransactionById: [],
     isEditStaff: false,
     dataEditStaff: '',
};

const adminReducer = (state = initialState, action) => {
     switch (action.type) {
          case actionTypes.GET_ALL_TRANSACTION_BY_ID_SUCCESS:
               state.arrTransactionById = action.data;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.FETCH_DATA_EDIT_STAFF_SUCCESS:
               state.dataEditStaff = action.data;
               console.log('redux : ', state.dataEditStaff);
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.FETCH_DATA_EDIT_STAFF_FAILED:
               state.dataEditStaff = [];
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.IS_EDIT_STAFF:
               state.isEditStaff = true;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.IS_NOT_EDIT_STAFF:
               state.isEditStaff = false;
               return {
                    ...state,
                    started: true,
               };
          default:
               return state;
     }
};

export default adminReducer;
