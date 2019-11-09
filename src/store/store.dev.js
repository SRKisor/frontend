import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

import {monitorReducerEnhancer} from './middleware'

import {rootReducer} from '../reducers'

const loggerMiddleware = createLogger();

export default function configureStore(preloadedState) {
  const middlewares = [loggerMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
  const composedEnhancers = compose(
    ...enhancers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  const store = createStore(
    rootReducer,
    preloadedState,
    composedEnhancers
  );

  module.hot.accept("../reducers", () => store.replaceReducer(rootReducer));

  return store;
}
