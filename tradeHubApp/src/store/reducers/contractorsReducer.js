import {
    GET_ALL_CONTRACTORS, SET_CONTRACTORS
  } from '../reduxConstants';
  
  export const initialState = {
    contractorsKeyValuePairs: {}
  };
  
  export const contractorsReducer = (state = initialState, {type, payload}) => {
    switch (type) {
      case GET_ALL_CONTRACTORS:
        // return state.contractors;
        return {
            ...state,
            contractorsKeyValuePairs: payload
          };
      case SET_CONTRACTORS:
        //   console.log(payload);
        return {
          ...state,
          contractorsKeyValuePairs: payload
        };
      default:
        return state;
    }
  };
  