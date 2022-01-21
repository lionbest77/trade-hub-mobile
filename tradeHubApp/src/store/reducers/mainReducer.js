import { combineReducers } from "redux";
import {setUserProfile} from './userReducer';
import {tenderReducer} from './tenderReducer';
import {userDataLogin} from '../reducers/userReducer';
import chatReducer, {socketReducer} from './chatReducer';
import { tabRegistrationReducer } from "./tabRegistrationReducer";

export const reducer = combineReducers({
  chat: chatReducer,
  tender: tenderReducer,
  userData: userDataLogin,
  setSocket: socketReducer,
  userProfile: setUserProfile,
  reducerOne: tabRegistrationReducer,
});
