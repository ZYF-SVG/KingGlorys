// 服务端的主程序
const express = require('express');
// 导入 处理post 请求的模块
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// app.set('secret', require('./key.js'));

// 处理 post 数据
app.use(bodyParser.json());
// 解决跨域
app.use(require('cors')());

// 挂载静态资源
app.use('/public',express.static(path.join(__dirname, 'public')));

// 引入前后端的父级路由,把 app 传递过去，就可以在 各这的文件中，设置父路由了
require('./router/admin.js')(app);
require('./router/web.js')(app);

// 导入 数据库连接模块
require('./model/connent.js')(app);

app.listen(3000, () => {
  console.log('http://localhost:3000');
})
