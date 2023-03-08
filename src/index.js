import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux";
import { applyMiddleware, createStore } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import reducer from "./_reducers";

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <BrowserRouter>
      <Provider store={createStoreWithMiddleware(
          reducer,
          window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )}>
          <App />
      </Provider>
  </BrowserRouter>,

  document.getElementById("root")
);

serviceWorker.unregister();
