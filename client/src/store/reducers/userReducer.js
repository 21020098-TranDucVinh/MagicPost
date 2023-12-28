import actionTypes from '../actions/actionTypes';

const initialState = {
     isLoggedIn: false,
     userInfo: null,
};

const appReducer = (state = initialState, action) => {
     switch (action.type) {
          case actionTypes.USER_LOGIN_SUCCESS:
               return {
                    ...state,
                    isLoggedIn: true,
                    userInfo: action.userInfo,
               };
          case actionTypes.USER_LOGIN_FAIL:
               return {
                    ...state,
                    isLoggedIn: false,
                    userInfo: null,
               };
          case actionTypes.PROCESS_LOGOUT:
               state.isLoggedIn = false;
               action.userInfo = null;
               return {
                    ...state,
               };
          default:
               return state;
     }
};

export default appReducer;
