import { combineReducers } from 'redux';
import alertssReducer3 from './AlertssReducers3';
import auth from './auth';
import profile from './ProfileReducer';
import roomReducer from './roomReducer';

export default combineReducers({
  alertssReducer3,
  auth,
  profile,
  roomReducer,
});
