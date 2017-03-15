import { compose, createStore } from 'redux';
import persistState from 'redux-localstorage';
import rootReducer from './reducers';


const enhancer = compose(
  persistState(),
  /* eslint-disable no-underscore-dangle */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  /* eslint-enable */
);

const store = createStore(
  rootReducer,
  {},
  enhancer,
);

export default store;
