// 处理前端数据的 父路由
module.exports = (app) => {
  const express = require('express');

  // 设置子路由
  const web = express.Router();
  // 设置 前端页面的 父路由
  app.use('/web', web);
}