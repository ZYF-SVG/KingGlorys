// 处理后端管理页面的 父路由
module.exports = app => {
  const express = require('express');

  // 设置子路由, 设置父路由的参数 和 并到子路由中，子路由，就可以获取到 父路由的参数
  const admin = express.Router({
    mergeParams: true
  });

  // 登录路由
  app.post('/admin/api/login', require('./admin/login'));

  // 登录拦截
  app.use('/admin', require('../middleware/auth')());

  // 配置 admin 为 父路由,设置接收参数，路径 rest/ 后面的数被当做参数，我们前端
  // 发起请求的地址我们可以获取到，后端接口 动态 的根据前端的请求地址 而改变 。
  // 我们可以将导入的 集合 存储在 req 里面，这样在 处理函数文件 中就可以获取到；
  app.use('/admin/api/rest/:resource', (req, res, next) => {
    const inflection  = require('inflection').classify(req.params.resource);
    req.model = require(`../model/${inflection}`);
    next();
  }, admin);
  
  // 处理 新建分类 的表单提交
  admin.post('/', require('./admin/index'));

  // 查询 分类列表 数据
  admin.get('/', require('./admin/categoryList'));

  // 根据 id 查询数据
  admin.get('/:id', require('./admin/categoryId'));

  // 修改分类的name
  admin.put('/:id', require('./admin/categoryPut'));

  // 删除分类操作
  admin.delete('/:id', require('./admin/categoryDelete'));

  // 上传图片路由
  app.post('/admin/api/upload', require('./admin/imgUpload'));

  // 错误处理中间件
  app.use(require('../middleware/resoutrce')());
}