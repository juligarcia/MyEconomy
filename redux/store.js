import { createStore, combineReducers } from 'redux';
import { reducer as cards } from './cards/reducer'; 

const store = createStore(combineReducers({ cards }));

export default store;