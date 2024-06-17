import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import thunkMiddleware from "redux-thunk";
import reducer from "./reducers";

import { routerMiddleware } from "react-router-redux";
import { createBrowserHistory } from "history";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const myRouterMiddleware = routerMiddleware(history);

/**
 * Add all the state in local storage
 * @param getState
 * @returns {function(*): function(*=)}
 */
const localStorageMiddleware = ({ getState }) => {
  // <--- FOCUS HERE
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem("applicationState", JSON.stringify(getState()));
    return result;
  };
};

const getMiddleware = () => {
  if (process.env.NODE_ENV === "production") {
    return applyMiddleware(myRouterMiddleware, thunkMiddleware);
  } else {
    // Enable additional logging in non-production environments.
    return applyMiddleware(
      myRouterMiddleware,
      thunkMiddleware,
      localStorageMiddleware
      //   createLogger()
    );
  }
};

const store = createStore(
  persistedReducer,
  composeWithDevTools(getMiddleware())
);

let persistor = persistStore(store);
// eslint-disable-next-line import/no-anonymous-default-export
export default { store, persistor };
