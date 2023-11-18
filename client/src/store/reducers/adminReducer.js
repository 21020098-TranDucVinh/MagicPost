import actionTypes from '../actions/actionTypes';

const initialState = {
     arrUsersPending: [],
     arrTransactions: [],
     arrCollections: [],
     resCreateUser: '',
     isEditUserSuccess: false,
};

const adminReducer = (state = initialState, action) => {
     switch (action.type) {
          case actionTypes.FETCH_ALL_DOCTOR__FAILED:
               // state.allDoctors = [];
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.GET_PENDING_USER_SUCCESS:
               state.arrUsersPending = action.data;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.GET_ALL_TRANSACTIONS_SUCCESS:
               state.arrTransactions = action.data;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.GET_ALL_TRANSACTIONS_FAILED:
               state.arrTransactions = [];
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.GET_ALL_COLLECTIONS_SUCCESS:
               state.arrCollections = action.data;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.GET_ALL_COLLECTIONS_FAILED:
               state.arrCollections = [];
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.CREATE_UPDATE_USER_PENDING_SUCCESS:
               state.isEditUserSuccess = true;

               return {
                    ...state,
                    started: true,
               };
          case actionTypes.CREATE_UPDATE_USER_PENDING_FAILED:
               state.resCreateUser = false;
               return {
                    ...state,
                    started: true,
               };
          default:
               return state;
     }
};

export default adminReducer;
