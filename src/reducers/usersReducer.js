import * as actionTypes from 'actions/actionTypes';
import { updateObject } from '../utils/updateObject';

const initialState = {
  error: null,
  loading: false,
  users: [],
  count: null,
  pages: null,
};

const userCreateStart = ( state, action ) => {
  return updateObject( state, { error: null, loading: true } );
};

const userCreateSuccess = ( state, action ) => {
  return updateObject( state, { error: null, loading: false, users:[...state.users, action.user], user:action.user } );
};

const userCreateFail = ( state, action ) => {
  return updateObject( state, { error: action.error, loading: false } );
};


const userListStart = ( state, action ) => {
  return updateObject( state, { error: null, loading: true } );
};

const userListSuccess = ( state, action ) => {
  return updateObject( state, { error: null, loading: false, users:action.users, count:action.count, pages:action.pages } );
};

const userListFail = ( state, action ) => {
  return updateObject( state, { error: action.error, loading: false } );
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USERS_CREATE_START: return userCreateStart(state, action);
    case actionTypes.USERS_CREATE_SUCCESS: return userCreateSuccess(state, action);
    case actionTypes.USERS_CREATE_FAIL: return userCreateFail(state, action);
    case actionTypes.USERS_LIST_START: return userListStart(state, action);
    case actionTypes.USERS_LIST_SUCCESS: return userListSuccess(state, action);
    case actionTypes.USERS_LIST_FAIL: return userListFail(state, action);

    default: return state;
  }
};

export default usersReducer;
