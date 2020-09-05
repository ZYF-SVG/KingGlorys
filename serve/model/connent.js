// 连接数据库文件
module.exports = (app) => {
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://wzry:wzry@localhost:27017/node-vue-moba', {
    useNewUrlParser: true , useUnifiedTopology: true
  }).then(() =>  console.log('数据库连接成功'))
    .catch(err => console.log('数据库连接失败' + err));

  // 导入使用模型,后面的括号里的是文件夹路径，防止在使用关联集合，导入后，没有使用集合产生的错误
  require('require-all')(__dirname);
  }