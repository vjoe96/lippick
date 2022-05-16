import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "antd/dist/antd.min.css";

import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "@reduxjs/toolkit";

import { BrowserRouter } from "react-router-dom";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import { applyMiddleware } from "redux";
import Reducer from "./_reducers";
import ScrollToTop from "./components/ScrollToTop";

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider> */}
    <Provider
      store={createStoreWithMiddleware(
        Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )}
    >
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// [store, createStoreWithMiddleware(Reducer,
//window.__REDUX_DEVTOOLS_EXTENSION__ &&
//window.__REDUX_DEVTOOLS_EXTENSION__())]
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
