import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import statsReducer from './reducers/statsReducer';
import coursesReducer from './reducers/coursesReducer';

const rootReducer = combineReducers({
	statsReducer,
	coursesReducer,
});

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(ReduxThunk, logger))
);

export default store;
