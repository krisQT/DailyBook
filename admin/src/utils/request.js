import {Base64} from 'js-base64'
import axios from 'axios';
import { notification } from 'antd';

const http = axios.create({
  timeout: 15000,
});

export default http;


http.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = _encode();

    return config;
  },
);

http.interceptors.response.use(
  (response) => {
    if (response.data.errorCode === 0) {
      return response.data.data
    }

    const errorMessage = response.data.msg;
    notification.error({
      message: `请求错误`,
      description: errorMessage,
    });
    return Promise.reject({
      message: errorMessage,
    });
  },
  (error) => {
    const errorMessage = error.response.data.msg

    notification.error({
      message: `服务报错`,
      description: errorMessage,
    });

    return Promise.reject({
      message: errorMessage,
    });
  }
);

function _encode() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsInJvbGUiOjIsImlhdCI6MTYwNTQ0NzczOCwiZXhwIjoxNjA2MDUyNTM4fQ.JDMoO3FmMGrTWmDb1CR1cMeI-UIa8LJmaBMi3ExAfJQ';
  const base64 = Base64.encode(token + ':');
  return 'Basic ' + base64
}
