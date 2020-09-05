// 英雄数据列表函数体
module.exports = async (req, res) => {
  const Hero = require('../../model/Hero');
  const Category = require('../../model/Category')

  // 聚合查询，拼接数据
  const parenta = await Category.findOne({name: '英雄职位'})
 
  const newData = await Category.aggregate([
    { $match: { parent: parenta._id } },
    {
      $lookup: {
        from: 'heroes',       // 关联集合，模型复数形式
        localField: '_id',   // 本地键，以本地的 id 去 外地找，外地键 进行关联
        foreignField: 'categories',  // 外地键
        as: 'heroList'
      }
    }
  ])

  // 在数据中，添加一个热门
  const listId = newData.map(v => v._id);
  newData.unshift({
    name: '热门',
    heroList: await Hero.find().where({
      categories: { $in: listId }
    }).populate('categories').limit(10).lean()
  })

  // 添加 categories 类别，在热门下，显示 categories 的第一个 分类 ；在 公共下，显示公告等等
  newData.map(v => {
    v.heroList.map(val => {
      val.categoryName = (v.name == '热门') ? val.categories[0].name : v.name; 
    })
  })

  res.send(newData);
}