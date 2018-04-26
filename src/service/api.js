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
  user.append('user_old_pass', userObj.user_old_pass);
  user.append('user_new_pass', userObj.user_new_pass);
  axios.post(`${config.apiUrl}/user/changePass/`, user, headers)
    .then(callback)
    .catch(error => {
      throw error;
    })
}

function getUserList(callback) {
  axios.get(`${config.apiUrl}/user/users/`)
    .then(callback)
    .catch(error => {
      throw error;
    })
}

function resetUserPass(userObj, callback) {
  const user = new FormData();
  user.append('user_name', userObj.user_name);
  user.append('reset_user_name', userObj.reset_user_name);
  user.append('reset_new_pass', userObj.reset_new_pass);
  axios.post(`${config.apiUrl}/user/resetPass/`, user, headers)
    .then(callback)
    .catch(error => {
      throw error;
    })
}

function deleteUser(userObj, callback) {
  const user = new FormData();
  user.append('user_name', userObj.user_name);
  user.append('delete_user_name', userObj.delete_user_name);
  axios.post(`${config.apiUrl}/user/delete/`, user, headers)
    .then(callback)
    .catch(error => {
      throw error;
    });
}

function authUser(userObj, callback) {
  const user = new FormData();
  user.append('user_name', userObj.user_name);
  user.append('user_role', userObj.user_role);
  user.append('user_pass', userObj.user_pass);
  axios.post(`${config.apiUrl}/user/auth/`, user, headers)
    .then(callback)
    .catch(error => {
      throw error;
    })
}

function getSetting(set_key, callback) {
  const setting = new FormData();
  setting.append('set_key', set_key);
  axios.post(`${config.apiUrl}/setting/get/`, setting, headers)
    .then(callback)
    .catch(error => {
      throw error;
    })
}

function updateSetting(settingObj, callback) {
  const setting = new FormData();
  setting.append('set_key', settingObj.set_key);
  setting.append('set_value', settingObj.set_value);
  axios.post(`${config.apiUrl}/setting/update/`, setting, headers)
    .then(callback)
    .catch(error => {
      throw error;
    })
}

function uploadVideoFile(fileObj, callback) {
  const file = new FormData();
  file.append('file_info', JSON.stringify(fileObj));
  axios.post(`${config.apiUrl}/video/insert/`, file, headers)
    .then(callback)
    .catch(error => {
      throw error;
    })
}

function getSites(callback) {
  axios.get(`${config.apiUrl}/video/getSites/`)
    .then(callback)
    .catch(error => {
      throw error;
    })
}

function getAllVideoFiles(callback) {
  axios.get(`${config.apiUrl}/video/videoList/`)
    .then(callback)
    .catch(error => {
      throw error;
    })
}

function deleteVideoFile(file_uuid, callback) {
  const file = new FormData();
  file.append('file_uuid', file_uuid);
  axios.post(`${config.apiUrl}/video/delete/`, file, headers)
    .then(callback)
    .catch(error => {
      throw error;
    })
}

function updateFileName(fileObj, callback) {
  const { file_uuid, file_name } = fileObj;
  const file = new FormData();
  file.append('file_uuid', file_uuid);
  file.append('file_name', file_name);
  axios.post(`${config.apiUrl}/video/update/`, file, headers)
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
  getUserList,
  resetUserPass,
  deleteUser,
  authUser,
  getSetting,
  updateSetting,
  uploadVideoFile,
  getSites,
  getAllVideoFiles,
  deleteVideoFile,
  updateFileName,
}