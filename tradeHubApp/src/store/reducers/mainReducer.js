import { combineReducers } from "redux";
import {setUserProfile} from './userReducer';
import {tenderReducer} from './tenderReducer';
import {contractorsReducer} from './contractorsReducer';
import {userDataLogin} from '../reducers/userReducer';
import chatReducer, {socketReducer} from './chatReducer';
import { tabRegistrationReducer } from "./tabRegistrationReducer";

export const reducer = combineReducers({
  chat: chatReducer,
  tender: tenderReducer,
  contractor: contractorsReducer,
  userData: userDataLogin,
  setSocket: socketReducer,
  userProfile: setUserProfile,
  reducerOne: tabRegistrationReducer,
});
