import {createStore, applyMiddleware} from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const initialState = {};
const middleware = [thunk];

const store = creatStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;