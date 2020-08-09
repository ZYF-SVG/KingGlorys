// 管理员集合
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const adminUserSchema = new mongoose.Schema({
  username: { type: String },
  password: { 
    type: String,
    select: false, // 数据库操作时，都不会操作到他，比如查取 和 修改 都不会修改到他；
    // 因为在编辑管理员账号时，查取的是 加密的密码，然后点击保存按钮，会把 加密密码进行再次加密，
    // 就不是我们原来的密码了。所以使用 false 来不然他查出来 。
    set (val) {
      // val 用户提交的数据
      return bcrypt.hashSync(val, 10);
    }
  }
})

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

module.exports = AdminUser;