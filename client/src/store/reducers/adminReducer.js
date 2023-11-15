import actionTypes from '../actions/actionTypes';

const initialState = {
     arrUsersPending: [],
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
               console.log('redux : ', state.arrUsersPending);
               return {
                    ...state,
                    started: true,
               };
          default:
               return state;
     }
};

export default adminReducer;
