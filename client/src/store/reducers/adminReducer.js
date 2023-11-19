import actionTypes from '../actions/actionTypes';

const initialState = {
     arrAdminsPending: [],
     arrTransactions: [],
     arrCollections: [],
     resCreateUser: '',
     arrAllAdminTransaction: [],
     isEditUserSuccess: false,
     isEditCollection: false,
     isEditTransaction: false,
     isEditPendingAdmin: false,
     dataEditCollection: '',
     dataEditTransaction: '',
     dataEditAdminPending: '',
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
               state.arrAdminsPending = action.data;
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
          case actionTypes.GET_ALL_ADMIN_TRANSACTIONS_SUCCESS:
               state.arrAllAdminTransaction = action.data;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.GET_ALL_ADMIN_TRANSACTIONS_FAILED:
               state.arrAllAdminTransaction = [];
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.GET_ALL_ADMIN_COLLECTIONS_SUCCESS:
               state.arrAllAdminCollections = action.data;

               return {
                    ...state,
                    started: true,
               };
          case actionTypes.GET_ALL_ADMIN_COLLECTIONS_FAILED:
               state.arrAllAdminCollections = [];
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.IS_EDIT_COLLECTION:
               state.isEditCollection = true;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.IS_NOT_EDIT_COLLECTION:
               state.isEditCollection = false;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.FETCH_DATA_EDIT_COLLECTION:
               state.dataEditCollection = action.data;
               console.log('redux : ', state.dataEditCollection);
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.CLEAR_DATA_EDIT_COLLECTION:
               state.dataEditCollection = '';
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.IS_EDIT_TRANSACTION:
               state.isEditTransaction = true;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.IS_NOT_EDIT_TRANSACTION:
               state.dataEditCollection = {}; // Data here is {}
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.FETCH_DATA_EDIT_TRANSACTION:
               state.dataEditTransaction = action.data;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.CLEAR_DATA_EDIT_TRANSACTION:
               state.dataEditTransaction = '';

               return {
                    ...state,
                    started: true,
               };
          case actionTypes.IS_EDIT_ADMIN_PENDING:
               state.isEditPendingAdmin = true;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.IS_NOT_EDIT_ADMIN_PENDING:
               state.isEditPendingAdmin = false;
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.FETCH_DATA_EDIT_ADMIN_PENDING:
               state.dataEditAdminPending = action.data;
               console.log('redux : ', state.dataEditAdminPending);
               return {
                    ...state,
                    started: true,
               };
          case actionTypes.CLEAR_DATA_EDIT_ADMIN_PENDING:
               state.dataEditAdminPending = '';
               return {
                    ...state,
                    started: true,
               };
          default:
               return state;
     }
};

export default adminReducer;
