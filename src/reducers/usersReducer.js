import * as consts from '../constants';
import {browserHistory} from 'react-router';

const initialState = {
  users:[],
  fetching: false,
  fetched: false,
  error: null
};

export default function userReducer(state=initialState, action = {}) {
  switch(action.type) {
    case consts.FETCH_USERS: {
      return {...state, fetching: false}
    }
    case consts.FETCH_USERS_FULFILLED: {
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      }
    }
    case consts.FETCH_USERS_REJECTED: {
      return {
        ...state,
        fetching: false,
        error: action.payload
      }
    }
    case consts.UPDATE_USER_SUCCESS: {
      const users = [
        ...state.users.filter(user => user.id != action.user.id),
        Object.assign({}, action.user)
      ];
      return {
        ...state,
        users
      }
    }
    case consts.CREATE_USER_SUCCESS: {
      browserHistory.push(`/users/${action.user.id}`);
      return {
        ...state,
        users: [...state.users.filter(user => user.id != action.user.id),
        Object.assign({}, action.user)]
      }
    }
    case consts.DELETE_USER_SUCCESS: {
       const users = [
        ...state.users.filter(user => user.id != action.user.id)        
      ];
      browserHistory.push('/users');

      return {
        ...state,
        users
      }
      
    }
    
    default:
      return state;
  }
}