// 文章集合
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  body: { type: String }
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;