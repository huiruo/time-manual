import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import userStore from './user.store';

const reducer = combineReducers({
  userStore,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));
// const store = createStore(reducer, applyMiddleware(thunk));

export default store;
