import * as consts from '../constants';
import axios from "axios";

export function fetchUsers(){
  return function(dispatch){
    axios.get('/api/users')
      .then((response) => {
        dispatch({type: consts.FETCH_USERS_FULFILLED, payload:response.data});
      })
      .catch((err) => {
        dispatch({type: consts.FETCH_USERS_REJECTED, payload:err})
      })
  }
}

export function updateUser(user) {  
  return function (dispatch) {
    axios.put('/api/users/' + user.id, user)
      .then((response) => {
        dispatch(updateUserSuccess(response.data));
      })
      .catch((err) => {        
        dispatch(updateUserError(err));
        console.error(err);
      })
  };
}

export function updateUserSuccess(user) {  
  return {type: consts.UPDATE_USER_SUCCESS, user};
}

export function updateUserError(error) {  
  return {type: consts.UPDATE_USER_REJECTED, payload: error};
}


export function createUser(user) {  
  return function (dispatch) {
    axios.post('/api/users', user)
      .then((response) => {
        dispatch(createUserSuccess(response.data));
      })
      .catch((err) => {        
        dispatch(createUserError(err));
        console.error(err);
      })
  };
}

export function createUserSuccess(user) {  
  return {type: consts.CREATE_USER_SUCCESS, user};
}

export function createUserError(error) {  
  return {type: consts.CREATE_USER_REJECTED, payload: error};
}