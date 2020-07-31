// category 类别的集合
const mongoose = require("mongoose");

// 设置集合规则
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name是必填项']
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  icon: {
    type: String
  }
})

// 创建集合
const Category = mongoose.model('Category', categorySchema);

// 导出集合
module.exports = Category;
