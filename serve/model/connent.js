// 连接数据库文件
module.exports = (app) => {
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://wzry:wzry@localhost:27017/node-vue-moba', {
    useNewUrlParser: true , useUnifiedTopology: true
  }).then(() =>  console.log('数据库连接成功'))
    .catch(err => console.log('数据库连接失败' + err));
}