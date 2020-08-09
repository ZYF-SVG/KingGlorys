// 登录拦截中间件
module.exports = () => {
  const jwt = require('jsonwebtoken');
  const AdminUser = require('../model/AdminUser');
  const assert = require('http-assert');
  
  return async (req, res, next) => {
    // 判断是否有发送 token，没有就为 null
    const token = (req.headers.authorization || '').split(' ').pop();
    // token为空
    assert(token, 401, '请登录');
  
    // token 存在，就解析出 id，到数据库找用户是否存在, tokenDate就是当前登录用户的信息；
    // 解析 token 中加密的 id，如果 解析出来的数据里没有，包含 id，也报错，可以会有人使用伪造的 token
    const tokenDate = jwt.verify(token, require('../key'));
    // token中不存在用户id
    assert(tokenDate, 401, '请登录');
  
    // 在数据库里查询用户信息，如果不存在改用户，就报错；然后把查取到是用户信息，存储到 
    // req.user 里面；
    req.user = await AdminUser.findById({_id: tokenDate.id});
    assert(req.user, 401, '请先登录');
  
    next();
  }
}