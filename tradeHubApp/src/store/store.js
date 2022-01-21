import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducers/mainReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk)),
);

// console.log(store.getState(), "<<<--------------S_T_O_R_E");


export default store;
