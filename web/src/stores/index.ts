import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import userStore from './user.store';
import { composeWithDevTools } from 'redux-devtools-extension';

const reducer = combineReducers({
  userStore,
});

/*
const store = createStore(reducer, composeWithDevTools());
const store = createStore(reducer, applyMiddleware(thunk, logger));
const store = createStore(reducer, applyMiddleware(thunk));
const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk, logger)
));

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
console.log('process.env.APP_ENV', process.env.APP_ENV);
*/

// const enhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools(
const enhancers = process.env.APP_ENV === 'dev' ? composeWithDevTools(
  applyMiddleware(thunk, logger)
) : applyMiddleware(thunk);

const store = createStore(reducer, enhancers);

export default store;
