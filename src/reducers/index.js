import { combineReducers } from 'redux';

import sessionReducer from './sessionReducer';
import usersReducer from './usersReducer'

const rootReducer = combineReducers({
  session: sessionReducer,
  users: usersReducer,
});

export default rootReducer;
