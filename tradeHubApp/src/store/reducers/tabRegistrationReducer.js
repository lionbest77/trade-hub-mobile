import {
  GET_SCREEN,
  GET_TAB,
  GET_AUTH_TAB
} from "../reduxConstants";

export const initialState = {
  tabNumber: 0,
  screenNumber: 0,
  authTabNumber: 0
};

export const tabRegistrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TAB:
      return {
        ...state,
        tabNumber: action.tabNumber
      };

    case GET_SCREEN:
      return {
        ...state,
        screenNumber: action.screenNumber
      };

    case GET_AUTH_TAB:
      return {
        ...state,
        authTabNumber: action.authTabNumber
      };

    default:
      return state;
  }
};
