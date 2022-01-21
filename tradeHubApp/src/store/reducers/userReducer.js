import {
  SET_USER_DATA, SET_USER_PROFILE, SET_COMPANY_PROFILE, SET_EMPLOYEES, UPDATE_EMPLOYEES, SET_USER_FROM_LS,
} from '../reduxConstants';

export const initialState = {
  userData: {
      user_ID: null,
      company_ID: null,
      role: null,
      token: null,
    },
  profile: {
    profile: {
      id: null,
      name: null,
      surname: null, //отчество
      lastName: null, // фамилия
      email: null,
      phone: null,
      additional_phone: null,
      notifications_enabled: true,
      twoFA: false,
      role:  {},
      fullName: null,
   },
    company: {
      _id: null,
      name: null,
      edrpou: null,
      payment_account: null,
      mfi: null,
      bank_name: null,
      email: null,
      phone: null,
      additional_phone: null,
      documents_delivery_address: null,
      goods_delivery_address: null,
      users: []
      },
    }
};

export const userDataLogin =(state= initialState, {type, payload}) => {
  switch (type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: payload,
      };
    case SET_USER_FROM_LS:
      return {
        ...state,
        userData: payload,
      };
    default:
      return state;
  }
 };

export const setUserProfile =( state= initialState, {type, payload}) => {
  switch (type) {
    case SET_USER_PROFILE:
      return {
        ...state,
        profile:{...state.profile,
          profile: {...state.profile.profile, ...payload}},
      };
    case SET_COMPANY_PROFILE:
      return {
        ...state,
        profile:{...state.profile,
          company:  {...state.profile.company, ...payload}},
      };
    case SET_EMPLOYEES:
      return {
        ...state,
        profile:{...state.profile,
          company: {...state.profile.company,
            users: payload}},
      };
    case UPDATE_EMPLOYEES:
      return {
        ...state,
        profile:{...state.profile,
          company: {...state.profile.company,
            users: [...state.profile.company.users, ...payload]
        }
          },
      };

    default:
      return state;
  }
};

