import {compose, combineReducers, createStore, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import auth from '../providers/auth.provider';
import cart from '../providers/cart.provider';

const rootReducer = combineReducers({
  auth,
  cart,
});

export const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
