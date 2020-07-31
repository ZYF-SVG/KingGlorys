// 处理图片上传函数体
module.exports = (req, res) => {
  // 引入 formidable 模块，获取前端上传的文件信息
  const formidable = require('formidable');
  const path = require('path');

  // 创建表单解析对象
  const form = new formidable.IncomingForm();
  // 上传图片存储的地址
  form.uploadDir = path.join(__dirname, '../', '../', 'public');
  // 保存扩展名
  form.keepExtensions = true;
  // 获取上传文件的信息
  form.parse(req, (err, fields, files) => {
    // 执行到这步，就说明 图片上传到了服务端，但还没有存储到数据库里
    // 获取 图片的地址，然后拼接上 请求的路径
    const num = files.file.path.indexOf('public');
    let url = files.file.path.substr(num - 1);
    url = 'http://localhost:3000' + url;
    res.send(url);
  })
}
