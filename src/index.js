import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { applyMiddleware, compose, createStore } from '@reduxjs/toolkit';
import { Provider, useSelector } from 'react-redux';

import thunk from 'redux-thunk';
import allReducers from './Slices/index';

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  composeEnhancers(applyMiddleware(thunk)),
);

const useAppDispatch = () => store.dispatch;

export const useAppSelector = useSelector;

export { useAppDispatch };

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
