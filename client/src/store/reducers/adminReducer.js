import actionTypes from '../actions/actionTypes';

const initialState = {};

const adminReducer = (state = initialState, action) => {
     switch (action.type) {
          case actionTypes.FETCH_ALL_DOCTOR__FAILED:
               // state.allDoctors = [];
               return {
                    ...state,
                    started: true,
               };
          default:
               return state;
     }
};

export default adminReducer;
