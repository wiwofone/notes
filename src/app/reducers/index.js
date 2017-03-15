import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import notes from './notes';

const rootReducer = combineReducers({
  notes,
  routing: routerReducer,
});

export default rootReducer;
