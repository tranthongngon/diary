import {createStore,combineReducers} from 'redux';
import codeReducer from './reducers/codeReducers';

const rootReducers = combineReducers({
 codeReducer
})

const store = createStore(rootReducers);

export default store;