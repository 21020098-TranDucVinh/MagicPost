import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
     type: actionTypes.ADD_USER_SUCCESS,
});
export const userLoginSuccess = (userInformation) => ({
     type: actionTypes.USER_LOGIN_SUCCESS,
     userInfo: userInformation,
});
export const userLoginFail = () => ({
     type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
     type: actionTypes.PROCESS_LOGOUT,
});
