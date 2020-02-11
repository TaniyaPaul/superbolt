import { combineReducers } from 'redux';
import imageReducer from './imageReducer';
import indexReducer from './indexReducer';
export default combineReducers({
	data:indexReducer,
	imageReducer
});