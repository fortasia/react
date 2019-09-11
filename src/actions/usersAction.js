import axios from 'config/axios';
import apiUrls from 'config/apiUrlsConfig'
import * as actionTypes from './actionTypes'

const createUserStart = () => {
  return {
    type: actionTypes.USERS_CREATE_START
  };
};

const createUserSuccess = (user) => {
  return {
    type: actionTypes.USERS_CREATE_SUCCESS,
    user:user,
  };
};

const createUserFail = (error) => {
  return {
    type: actionTypes.USERS_CREATE_FAIL,
    error:error
  };
};

const usersListStart = () => {
  return {
    type: actionTypes.USERS_LIST_START,
  };
};

const usersListSuccess = (users, count, pages) => {
  return {
    type: actionTypes.USERS_LIST_SUCCESS,
    users:users,
    count:count,
    pages:pages,
  };
};

const usersListFail = (error) => {
  return {
    type: actionTypes.USERS_LIST_FAIL,
    error:error
  };
};



export const createUser = (date)  => {

  return dispatch => {
    dispatch(createUserStart());
    let authData = {
      phoneNumber: date.phoneNumber,
      emailVerified: true,
      phoneNumberVerified: true,
      MFA: true,
      email: date.email,
      password: date.password,
      firstName: date.firstName,
      lastName: date.lastName,
      role: [
        date.role
      ]
    };
    axios({
      method: apiUrls.users.create.method,
      url: apiUrls.users.create.url,
      data: authData
    }).then(response => {
      dispatch(createUserSuccess(response.data));
    }).catch(err => {
      dispatch(createUserFail(err.response.statusText));
    });
  };
};

export const getUserList = (limit, skip)=>{
  return dispatch => {
    dispatch(usersListStart());
    axios({
      method: apiUrls.users.list.method,
      url: apiUrls.users.list.getURL(limit, skip),
    }).then(response => {
      let users = response.data.users;
      let count = response.data.count;
      let pages = Math.ceil(count/limit);
      dispatch(usersListSuccess(users, count, pages));
    }).catch(err => {
      dispatch(usersListFail(err.response.statusText));
    });
  };
};
