module.exports = async (req, res) => {
  // 导入 Category 集合
  // const Category = require('../../model/Category');

  // 向集合中添加数据
  const model = await req.model.create(req.body);

  // 设置返回的 数据的格式
  res.send({
    "data": {
      model
    },
    "meta": {
      "mas": "提交成功",
      "status": 200
    }
  });
}