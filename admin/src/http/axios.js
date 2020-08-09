// 配置 axios
import axios from 'axios';
import vue from 'vue';
import router from '../router/index';

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
});

// 请求拦截
http.interceptors.request.use(config => {
  // 添加请求头, 并判断，如果 token 存在才发起请求
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});

// 响应拦截
http.interceptors.response.use(config => {
  // 正确时，执行
  return config;
}, err => {
  // 当响应错误时，执行, 所以，在后端，返回信息时，必须携带 message 自动，这样
  // 前端，可以获取到错误的信息；
  vue.prototype.$message.error(err.response.data.message);

  //  401 状态码，就重定向到 login 页面；
  if (err.response.status === 401) {
    // TypeError: Cannot read property '_route' of undefined 访问不到，所以引进 router 模块
    router.push('/login');
  }
  return Promise.reject(err);
});

// 注意导出语句
export default http;
