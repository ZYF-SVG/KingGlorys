// 英雄集合
const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name是必填项']
  },
  // 头像
  avatar: { type: String },
  // 称号
  title: { type: String },
  // 展示图片
  banner: { type: String },
  // 职位, 多个职位，使用数组包裹对象，就可以添加多个 关联职位
  categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  // 评分
  scores: {
    difficult: { type: Number },  // 难度
    skills: { type: Number },     // 技能
    attack: { type: Number },     // 攻击
    survive: { type: Number }     // 生存
  },
  // 技能,有多个技能，所以使用数组括对象
  skills: [{
    icon: { type: String },
    name: { type: String },
    cooling: { type: String },
    consume: { type: String },
    description: { type: String },
    tips: { type: String }
  }],
  // 顺风出装,应有多个装备，所以用...
  item1: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  // 逆风出装
  item2: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
  // 使用技巧
  usageTips: { type: String },
  // 对抗技巧
  battleTips: { type: String },
  // 团战思路
  teamTips: { type: String },
  // 搭档英雄
  partners: [{
    hero: { type: mongoose.Schema.Types.ObjectId, ref: 'Hero' },
    description: { type: String }
  }]
})

const Hero = mongoose.model('Hero', heroSchema, 'heroes');

module.exports = Hero