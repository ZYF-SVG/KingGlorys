// 广告位集合
const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  name: { type: String },
  items: [{
    image: { type: String },
    url: { type: String }
  }]
})

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad