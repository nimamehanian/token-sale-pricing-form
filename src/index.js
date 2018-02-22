import React from 'react';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import { ConnectedRouter, routerMiddleware, routerReducer } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

import App from './components/app';
import pricingFormReducer from './components/pricingForm/reducer';
import computeFieldEpic from './components/pricingForm/epic';

import './styles/manifest.styl';

const epicMiddleware = createEpicMiddleware(combineEpics(computeFieldEpic));

const history = createHistory();
const routeMiddleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const mainStore = createStore(
  combineReducers({
    pricingForm: pricingFormReducer,
    routing: routerReducer,
  }),
  composeEnhancers(applyMiddleware(epicMiddleware, routeMiddleware))
);

const Root = props => (
  <Provider store={props.store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" render={() => <App />} />
      </div>
    </ConnectedRouter>
  </Provider>
);

render(
  <Root store={mainStore} />,
  document.getElementById('app')
);
