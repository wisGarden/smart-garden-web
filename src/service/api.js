import axios from 'axios'
import config from './config'

const headers = {
  headers: {
    'Content-Type': 'multipart/form-data',
  }
};

function isLogged() {
  return localStorage.getItem('isLogged') && localStorage.getItem('isLogged') === 'true';
}

function login(userObj, callback) {
  const user = new FormData();
  user.append('user_name', userObj.user_name);
  user.append('user_pass', userObj.user_pass);
  axios.post(`${config.apiUrl}/user/login/`, user, headers)
    .then(callback)
    .catch(error => {
      throw error;
    });
}

function getUserInfo(user_name, callback) {
  const user = new FormData();
  user.append('user_name', user_name);
  axios.post(`${config.apiUrl}/user/show/`, user, headers)
    .then(callback)
    .catch(error => {
      throw error
    })
}

function updateUserInfo(userObj, callback) {
  const user = new FormData();
  user.append('is_logged', isLogged());
  user.append('user_mobile', userObj.user_mobile);
  user.append('user_email', userObj.user_email);
  user.append('user_name', userObj.user_name);
  user.append('user_new_name', userObj.user_new_name);
  axios.post(`${config.apiUrl}/user/update/`, user, headers)
    .then(callback)
    .catch(error => {
      throw error;
    })
}

function changePass(userObj, callback) {
  const user = new FormData();
  user.append('user_name', userObj.user_name);
  user.append('user_old_pass', user.user_old_pass);
  user.append('user_new_pass', user.user_new_pass);
  axios.post(`${config.apiUrl}/user/changePass/`, user, headers)
    .then(callback)
    .catch(error => {
      throw error;
    })
}

export default {
  login,
  isLogged,
  getUserInfo,
  updateUserInfo,
  changePass,
}