import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createLogger } from "redux-logger";
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
//import './styles/index.scss';
require('./styles/index.scss');

const middleware = applyMiddleware(thunk, createLogger());
/** add comment **/
const store = createStore(reducer, middleware);


store.subscribe(() => {
  //console.log("store changed", store.getState());
})
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
