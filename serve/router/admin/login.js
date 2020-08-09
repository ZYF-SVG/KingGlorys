module.exports = async (req, res) => {
  // 导入 管理员集合
  const AdminUser = require('../../model/AdminUser');
  const { username, password } = req.body;

  // 根据用户名找用户
  // 因为在管理员集合中 password 字段使用了 select：false，所以是查取不到他的，所以可以
  // 在 查询语句的末尾添加 select('+password');
  const user = await AdminUser.findOne({username}).select('+password');

  if (!user) {
    // 如果没有就为 null
    return res.status(422).send({
      message: '用户不存在'
    })
  }

  // 2. 校验密码, 返回一个 布尔值
  const isValid = require('bcryptjs').compareSync(password, user.password);
  if (!isValid) {
    // 密码不一致, 422 登录失败，使用 422状态码；
    return res.status(422).send({
      message: '密码错误'
    })
  }

  // 3. 返回 token
  const jwt = require('jsonwebtoken');
  const token = jwt.sign({id: user._id}, require('../../key.js'));
  res.send({
    token,
    name: user.username
  })
}

