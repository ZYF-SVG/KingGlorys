// 物品集合
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name是必填项']
  },
  icon: {
    type: String
  }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;