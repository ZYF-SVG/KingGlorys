// 新闻资讯接口
module.exports = async (req, res) => {
  const Article = require('../..//model/Article');
  const Category = require('../../model/Category');

  // 查询分类为新闻资讯的数据
  /* 1.在 Category 集合中，创建一个子分类，名为 children，他和他本身进行关联，关联自动为 新闻资讯的id，
     就可以查询出 与新闻资讯 关联的 分类了；不用写2句查询语句；
    const newsData = await Category.find({name: '新闻资讯'}).populate({
      path: 'children'
    }).lean();

    2.要在分类中，查询出关联的文章
    const newsData = await Category.find({name: '新闻资讯'}).populate({
      path: 'children',
      populate: ({
        path: 'newsList'
      })
    }).lean();
    */

  // 使用聚合查询
  const parent = await Category.findOne({name: '新闻资讯'});

  const newsData = await Category.aggregate([
    // 过滤/条件 查询
    { $match: { parent: parent._id} },
    {
      $lookup: {
        from: 'articles',       // 关联集合，模型复数形式
        localField: '_id',   // 本地键，以本地的 id 去 外地找，外地键 进行关联
        foreignField: 'categories',  // 外地键
        as: 'newsList'
      }
    },
    { 
      $addFields: {
        newsList: { $slice: ['$newsList', 5] }  // 限制查询的数据
      }
    }
  ])

  // 在数据中，添加一个热门
  const listId = newsData.map(v => v._id);
  newsData.unshift({
    name: '热门',
    newsList: await Article.find().where({
      categories: { $in: listId }
    }).populate('categories').limit(5).lean()
  })

  // 添加 categories 类别，在热门下，显示 categories 的第一个 分类 ；在 公共下，显示公告等等
  newsData.map(v => {
    v.newsList.map(val => {
      val.categoryName = (v.name == '热门') ? val.categories[0].name : v.name; 
    })
  })

  res.send(newsData);
}
