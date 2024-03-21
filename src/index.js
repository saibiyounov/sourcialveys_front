import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import './i18n';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import appReducer from './store/reducers/app';
import authReducer from './store/reducers/auth';
import invoiceReducer from './store/reducers/invoice'
import commandeReducer from './store/reducers/commande'
import clientsReducer from './store/reducers/clients'
import suppliersReducer from './store/reducers/suppliers'
import documentationReducer from './store/reducers/documentation'
import entitiesReducer from './store/reducers/entities'
import entitiesPPFReducer from './store/reducers/entitiesPPF'
import echangePDPReducer from './store/reducers/echangePDP'
import campaignsReducer from './store/reducers/campaigns'
import accountantsReducer from './store/reducers/accountants'
import logsReducer from './store/reducers/logs'
import usersReducer from './store/reducers/users'
import supplierRequest from './store/reducers/supplierRequest'
import paymentSignature from './store/reducers/paymentSignature'
import invoiceDetailReducer from './store/reducers/invoiceDetail'
import supplierRequestDetailReducer from './store/reducers/supplierRequestDetail'
import extractionReducer from './store/reducers/extraction'
import reportingReducer from './store/reducers/reporting'
import invoiceHomeClientsReducer from './store/reducers/invoiceHomeClients.js'
import commandesDeadlineExceededReducer from './store/reducers/commandesDeadlineExceeded.js'
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import { AuthProvider, TAuthConfig, TRefreshTokenExpiredEvent } from "react-oauth2-code-pkce"
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  invoice: invoiceReducer,
  clients: clientsReducer,
  suppliers: suppliersReducer,
  accountants: accountantsReducer,
  logs: logsReducer,
  users: usersReducer,
  supplierRequest: supplierRequest,
  paymentSignature: paymentSignature,
  invoiceDetail: invoiceDetailReducer,
  documentation: documentationReducer,
  campaigns: campaignsReducer,
  supplierRequestDetail: supplierRequestDetailReducer,
  entities: entitiesReducer,
  extraction : extractionReducer,
  reporting:reportingReducer,
  invoiceHomeClients:invoiceHomeClientsReducer,
  commande:commandeReducer,
  commandesDeadlineExceeded:commandesDeadlineExceededReducer,
  entitiesPPF:entitiesPPFReducer,
  echangePDP:echangePDPReducer
})
const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
))
const authConfig = {

    clientId: 'WebAppUiClient' || '',
    clientSecret: 'webUiSourcialVeysSecret',
    authorizationEndpoint: process.env.REACT_APP_AUTHORIZATION_ENDPOINT ,
    tokenEndpoint: process.env.REACT_APP_TOKEN_ENDPOINT ,
    redirectUri: 'https://localhost:3000',
    scope: ['openid offline_access apiSourcialVeys'], 
    //tokenExpiresIn: ((int)process.env.REACT_APP_TOKEN_EXPIRES_SECONDS) || 600,
    autoLogin: false,
    onRefreshTokenExpire: (event) => {

    },
    preLogin: () => {
        localStorage.setItem('preLoginUri', "teste");
    },
    postLogin: () => {
        const redirectUri = localStorage.getItem('preLoginUri') || '';
        localStorage.setItem('redirectUri', redirectUri);
        localStorage.removeItem('preLoginUri');
    }
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider authConfig={authConfig}>
  <Provider store={store}>
  <Suspense fallback={(<div>loading ...</div>)}>
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
 
  </React.StrictMode>
  </Suspense>
        </Provider>
    </AuthProvider>
);

reportWebVitals();
