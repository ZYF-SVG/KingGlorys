// 英雄详情函数体
module.exports =  async (req, res) => {
  // 导入英雄集合
  const Hero = require('../../model/Hero');

  const data = await 
    Hero.findById(req.params.id)
        .populate('categories item1 item2 partners.hero')
        .lean();
  res.send(data);
}