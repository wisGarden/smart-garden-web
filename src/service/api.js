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

function uploadVideoFile(fileObj, callback, progressCallBack) {
  const file = new FormData();
  file.append('video_file', fileObj.video_file);
  file.append('file_site', fileObj.file_site);
  file.append('traffic_density_limit', fileObj.traffic_density_limit);
  file.append('analyse_type', fileObj.analyse_type);
  file.append('file_during_time', fileObj.file_during_time);
  axios.post(`${config.apiUrl}/video/insert/`, file, {
    headers: headers.headers,
    onUploadProgress: progressEvent => {
      const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total);
      progressCallBack(percentCompleted);
    }
  })
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

function getFixedPosTrafficData(param, callback) {
  const { start_date, end_date, file_uuid } = param;
  const fixedPosData = new FormData();
  fixedPosData.append('start_date', start_date);
  fixedPosData.append('end_date', end_date);
  fixedPosData.append('file_uuid', file_uuid);
  axios.post(`${config.apiUrl}/fixedPos/get_data/`, fixedPosData, headers)
    .then(callback)
    .catch(error => {
      throw error;
    })
}

function getFixedAreaTrafficData(param, callback) {
  const { start_date, end_date, file_uuid } = param;
  const fixedAreaData = new FormData();
  fixedAreaData.append('start_date', start_date);
  fixedAreaData.append('end_date', end_date);
  fixedAreaData.append('file_uuid', file_uuid);
  axios.post(`${config.apiUrl}/fixedArea/get_data/`, fixedAreaData, headers)
    .then(callback)
    .catch(error => {
      throw error;
    })
}

function getDensityLimit(file_uuid, callback) {
  const file = new FormData();
  file.append('file_uuid', file_uuid);
  axios.post(`${config.apiUrl}/video/densityLimit/`, file, headers)
    .then(callback)
    .catch(err => {
      throw  err;
    })
}

export default {
  login,  // 登录
  isLogged, // 是否登录
  getUserInfo, // 获取用户信息
  updateUserInfo, // 更新用户信息
  changePass, // 更改密码
  getUserList, // 获取用户列表
  resetUserPass, // 重置用户密码【管理员】
  deleteUser, // 删除用户
  authUser, // 授权用户
  getSetting, // 获取配置
  updateSetting, // 更新设置
  uploadVideoFile, // 上传视频文件
  getSites, // 获取地点
  getAllVideoFiles, // 获取所有视频文件
  deleteVideoFile, // 删除指定视频文件
  updateFileName, // 更新视频文件
  getFixedPosTrafficData, // 根据开始，结束日期获得fixedPOS的数据
  getFixedAreaTrafficData, // 根据开始，结束日期获得fixedArea的数据
  getDensityLimit, // 根据file_uuid，获得该地点的最大客流密度
}