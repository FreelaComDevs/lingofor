import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import 'font-awesome/css/font-awesome.css'
import { unregister } from './registerServiceWorker'
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducers";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
)

unregister()
