import axios from '../config/axios';
// import axios from 'axios';
import apiUrls from '../config/apiUrlsConfig'
import * as actionTypes from './actionTypes'

import { jsonStorage } from '../config/storage'

const sessionStart = () => {
  return {
    type: actionTypes.SESSION_START
  };
};

const sessionLogin = (session) => {
  return {
    type: actionTypes.SESSION_LOGIN,
    session: session
  };
};

const sessionLogout = () => {
  return {
    type: actionTypes.SESSION_LOGOUT,
  };
};

const sessionFail = (error) => {
  return {
    type: actionTypes.SESSION_FAIL,
    error: error
  };
};

const sessionUpdateUser = (updates) => {
  return {
    type: actionTypes.SESSION_UPDATE_USER,
    updates: updates
  };
};

const sessionChangePassword = (updates) => {
  return {
    type: actionTypes.SESSION_CHANGE_PASSWORD,
    updates: updates
  };
};

export const updateUserInfo = (firstName, lastName)  => {
  return dispatch => {
    let session = jsonStorage.getItem('session');
    let authData = {
      firstName: firstName,
      lastName: lastName
    };
    axios({
      method: apiUrls.admin.update.method,
      url: apiUrls.admin.update.url,
      data: authData,
    }).then(response => {
      let update = {
        ...session,
        ...response.data
      };
      jsonStorage.setItem('session', update);
      dispatch(sessionUpdateUser(update));
    }).catch(err => {
      dispatch(sessionFail(err.response.statusText));
    });
  };
};



export const login = (email, password)  => {
  return dispatch => {
    dispatch(sessionStart());
    let requestData = {
      method: apiUrls.admin.login.method,
      url: apiUrls.admin.login.url,
      data: {
        email: email,
        password: password
      }
    };
    axios(requestData).then(response => {
      let data = response.data;
      let session = {
        phoneNumber: data.phoneNumber,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumberVerified: data.phoneNumberVerified,
        emailVerified: data.emailVerified,
        token: data.token
      };
      jsonStorage.setSession('session', 'true');
      jsonStorage.setItem('session', session);
      dispatch(sessionLogin(session));
    }).catch(err => {
      if(err.response){
        dispatch(sessionFail(err.response.statusText));
      }else{
        dispatch(sessionFail('Internal Server Error'));
      }

    });
  };
};


export const logout = () =>{
  return dispatch => {
    jsonStorage.clear();
    jsonStorage.removeSession('session');
    dispatch(sessionLogout());
  }
};


