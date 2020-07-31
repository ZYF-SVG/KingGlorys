// 配置 axios
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
});

// 注意导出语句
export default http;
