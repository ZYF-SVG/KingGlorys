// 新闻详情函数体
module.exports = async (req, res) => {
  const Article = require('../../model/Article');
  const Category = require('../../model/Category');
  
  const id = req.params.id;

  const data = await Article.findById(id).lean();
  data.related = await Article.find().skip(2).where({
    categories: { $in: data.categories }
  }).limit(2);
  res.send(data);
}