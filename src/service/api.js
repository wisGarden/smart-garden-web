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


export default {
  login,
  isLogged
}