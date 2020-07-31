// 根据 id 查询分类数据
module.exports = async (req, res) => {
  // d导入分类集合
  // const category = require('../../model/Category');

  const data = await req.model.findById(req.params.id);
  
  res.send({
    "data": data,
    "meta": {
      "mas": "查询成功",
      "status": 200
    }
  });
}