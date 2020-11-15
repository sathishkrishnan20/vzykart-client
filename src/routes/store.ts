import {compose, combineReducers, createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import auth from '../providers/auth.provider';
const rootReducer = combineReducers({
  auth,
});

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
