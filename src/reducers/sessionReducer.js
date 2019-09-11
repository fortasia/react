import * as actionTypes from 'actions/actionTypes';
import { updateObject } from '../utils/updateObject';
import {jsonStorage} from '../config/storage';
import urlsPath from '../config/urlsConfig';


const initialState = {
  loggedIn: jsonStorage.getSession('session'),
  error: null,
  loading: false,
  refreshSession:false,
  auth: jsonStorage.getItem('session'),
  loginURL: urlsPath.auth.login,
  dashboardURL: urlsPath.dashboard.default,
};

const sessionStart = ( state, action ) => {
  return updateObject( state, { error: null, loading: true } );
};

const sessionLogin = ( state, action ) => {
  return updateObject( state, {
    auth: {
      ...action.session
    },
    error: null,
    loading: false,
    loggedIn: true,
  } );
};

const sessionFail = ( state, action ) => {
  return updateObject( state, {
    error: action.error,
    loading: false,
    loggedIn: false
  } );
};

const sessionLogout = ( state, action ) => {
  return updateObject( state, {
    loggedIn: false,
    error: null,
    loading: false,
    auth:{}
  });
};

const sessionUpdateUser = ( state, action ) => {
  return updateObject( state, {
    auth: {
      ...action.updates
    }
  } );
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_START: return sessionStart(state, action);
    case actionTypes.SESSION_LOGIN: return sessionLogin(state, action);
    case actionTypes.SESSION_UPDATE_USER: return sessionUpdateUser(state, action);
    case actionTypes.SESSION_FAIL: return sessionFail(state, action);
    case actionTypes.SESSION_LOGOUT: return sessionLogout(state, action);

    default: return state;
  }
};

export default sessionReducer;
