import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { reducer as homeReducer } from "../pages/home/store";

const reducer = combineReducers({
  home: homeReducer,
});

// 使用函数，避免共用一个实例
export const getStore = () => {
  return createStore(reducer, applyMiddleware(thunk));
  // return createStore(reducer);
};

export const getClientStore = () => {
  // return createStore(reducer, applyMiddleware(thunk));
  const defaultState = window.context.state;
  return createStore(reducer, defaultState, applyMiddleware(thunk));
  // return createStore(reducer);
};
