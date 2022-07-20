import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import demoStore from "../pages/quick-start/react-node/store";

const middleware: any[] = [];

const composeEnhancers =
  // @ts-ignore
  (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;

const store = createStore(
  combineReducers({ demoStore }),
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
