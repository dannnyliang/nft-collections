import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducer";

const middleware = [thunk];

const __DEV__ = process.env.NODE_ENV;

const composeEnhancers =
  __DEV__ === "development" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export default createStore(
  reducer,
  undefined,
  composeEnhancers(applyMiddleware(...middleware))
);
