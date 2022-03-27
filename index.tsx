
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {applyMiddleware, combineReducers, compose, configureStore, createStore} from "@reduxjs/toolkit";
import {Provider, TypedUseSelectorHook, useSelector} from "react-redux";
import fleetTypeApi from "./Slices/FleetType";
import revisionNoApi from "./Slices/RevisionNo";
import revisionDateApi from "./Slices/RevisionDate";
import newRevisionApi from "./Slices/NewRevision";

import thunk from 'redux-thunk';
import allReducers from "./Slices";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/*const rootReducer = combineReducers({
  fleetType: fleetTypeApi,
  revisionNo: revisionNoApi,
  revisionDate:revisionDateApi,
  postSaveNewRevision,
});*/

const store = createStore(allReducers, composeEnhancers(applyMiddleware(thunk)));

const useAppDispatch = () => store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch };

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
