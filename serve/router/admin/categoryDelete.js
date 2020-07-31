// 删除分类操作
module.exports = async (req, res) => {
  // const category = require('../../model/Category');

  const data = await req.model.findOneAndDelete({_id: req.params.id});

  res.send({
    "data": data,
    "meta": {
      "mas": "删除成功",
      "status": 200
    }
  })
}