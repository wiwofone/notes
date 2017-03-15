import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import store from './store';

/* Enable hot module reloading */
if (module.hot) {
  module.hot.accept();

  // module.hot.accept('./reducers', () => {
  //   const nextRootReducer = rootReducer;
  //   store.replaceReducer(nextRootReducer);
  // });
}

/* Use react-router-redux to sync browser history with the store */
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider
    store={store}
    key={Math.random()}
  >
    <Router
      key={Math.random()}
      history={history}
      routes={routes}
    />
  </Provider>,
  document.getElementById('app'));
