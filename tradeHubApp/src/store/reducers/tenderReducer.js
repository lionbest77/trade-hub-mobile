import {
  ADD_NEW_TENDER, GET_ALL_TENDERS
} from '../reduxConstants';

export const initialState = {
tenders: []
};

export const tenderReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_ALL_TENDERS:
      return {
        ...state,
        tenders: [...state, payload]
      };
    case ADD_NEW_TENDER:
      return {
        ...state,
        tenders: [...state, payload]
      };

    default:
      return state;
  }
};

