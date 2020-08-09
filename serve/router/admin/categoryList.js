module.exports = async (req, res) => {
  // 1.导入分类集合
  // const category = require('../../model/Category');
  /* 2.根据获取的参数，引入对应的集合，categories 转化为 复数，就是 Category，
     我们可以根据这一点，来 动态引入 集合 */
  /* const inflection  = require('inflection').classify(req.params.resource);
     inflection => Category，
     const model = require(`../../model/${inflection}`);
     const data = await model.find().populate('parent'); */

  // 3.查询 分类集合 中的数据, 获取在 中间件 的时候，存储在 req 中的 集合模型；
  // const data = await req.model.find().populate('parent');

  // 4.判断，是否是查询 category 集合，如果是就，就使用 populate 关联查询
  const queryOptions = {};
  // req.model.modelName： 获取集合的名称
  if (req.model.modelName === 'Category') {
    queryOptions.populate = 'parent';
  } else if (req.model.modelName === 'Hero') {
    queryOptions.populate = 'categories';
  }
  const data = await req.model.find().setOptions(queryOptions);


  res.send({
    "data": data,
    "meta": {
      "mas": "查询成功",
      "status": 200
    }
  })
}