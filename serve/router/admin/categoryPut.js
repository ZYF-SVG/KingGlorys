// 处理修改数据路由
module.exports = async (req, res) => {
  // const category = require('../../model/Category');

  const data = await req.model.updateOne({_id: req.params.id}, req.body);
  
  res.send({
    "data": data,
    "meta": {
      "msg": "修改成功",
      "status": 200
    }
  })
}