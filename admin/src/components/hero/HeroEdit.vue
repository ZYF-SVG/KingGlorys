<!-- 新建分类 -->
<template>
  <div class="item_content">
    <h1> {{id ? '修改' : '新建'}}英雄</h1>
    <el-form :model="activityForm" :rules="activityRules" ref="activityRuleForm" label-width="120px"
    @submit.native.prevent="save" label-position="right">
      <!-- tabs 切换栏 -->
      <el-tabs value="first" type="border-card">
        <!-- 基本信息选项卡 -->
        <el-tab-pane label="基本信息" name="first">
          <!-- 名称 -->
          <el-form-item label="名称" prop="name">
            <el-input v-model="activityForm.name"></el-input>
          </el-form-item>
          <!-- 头像 -->
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploaUrl"
              :headers="getToken()"
              :show-file-list="false"
              :on-success="handleAvatarSuccess">
              <img v-if="activityForm.avatar" :src="activityForm.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 称号 -->
          <el-form-item label="称号">
            <el-input v-model="activityForm.title"></el-input>
          </el-form-item>
          <!-- 职位 -->
          <el-form-item label="职位">
            <el-select v-model="activityForm.categories" multiple placeholder="请选择">
              <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 评分 -->
          <el-form-item label="难度">
            <el-rate v-model="activityForm.scores.difficult" show-score :max="9"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate v-model="activityForm.scores.skills" show-score :max="9"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="activityForm.scores.attack" show-score :max="9"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate v-model="activityForm.scores.survive" show-score :max="9"></el-rate>
          </el-form-item>
          <!-- 顺风出装 -->
          <el-form-item label="顺风出装">
            <el-select v-model="activityForm.item1" multiple placeholder="请选择">
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 逆风出装 -->
          <el-form-item label="逆风出装">
            <el-select v-model="activityForm.item2" multiple placeholder="请选择">
              <el-option
                v-for="item in items"
                :key="item._id"
                :label="item.name"
                :value="item._id">
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 使用技巧 -->
          <el-form-item label="使用技巧">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="activityForm.usageTips"
              autosize>
            </el-input>
          </el-form-item>
          <!-- 对抗技巧 -->
          <el-form-item label="对抗技巧">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="activityForm.battleTips"
              autosize>
            </el-input>
          </el-form-item>
          <!-- 使用技巧 -->
          <el-form-item label="团战思路">
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="activityForm.teamTips"
              autosize>
            </el-input>
          </el-form-item>
        </el-tab-pane>
        <!-- 技能信息选项卡 -->
        <el-tab-pane label="技能信息" class="skills" name="skill">
          <el-button type="primary" icon="el-icon-plus" plain size="small" @click="addSkill" style="margin-bottom: 20px;">添加技能</el-button>
          <!-- 循环一个数组，在点击按钮时，往数组中push个空对象，这样，就可以实现，点击按钮，添加一个技能的操作 -->
          <el-row type="flex" style="flex-wrap: wrap;">
            <el-col :md="12" v-for="(item, i) in activityForm.skills" :key="i">
              <!-- 名称 -->
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <!-- 图标 -->
              <el-form-item label="图标">
                <!-- 把函数直接写在了 html 里，因为这是在 for 循环中，item 是当前向，写在里面比较方便
                又因为，单纯的把图片的路径给 item.icon 不能显示出来，使用使用 $set 来设置； -->
                <el-upload
                  class="avatar-uploader"
                  :action="uploaUrl"
                  :show-file-list="false"
                  :headers="getToken()"
                  :on-success="(res) => { $set(item, 'icon', res); }">
                  <img v-if="item.icon" :src="item.icon" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <!-- 技能描述 -->
              <el-form-item label="技能描述">
                <el-input type="textarea" placeholder="请输入内容" v-model="item.description" autosize>
                </el-input>
              </el-form-item>
                <!-- 小提示 -->
              <el-form-item label="小提示">
                <el-input placeholder="请输入内容" v-model="item.tips" autosize>
                </el-input>
              </el-form-item>
              <!-- 删除按钮 -->
              <el-form-item>
                <el-button type="danger" @click="activityForm.skills.splice(i, 1)" style="margin-top: 0;">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <!-- 设置按钮为 原生的提交按钮 -->
      <el-form-item class="submitBut">
        <el-button type="primary" plain native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // 接收路由，传递过来的参数, 接收值应为 对象
  props: {
    id: {}
  },
  data () {
    return {
      // 绑定表单数据
      activityForm: {
        name: '',
        avatar: '',
        title: '',
        categories: [],
        scores: {},
        item1: [],
        item2: [],
        usageTips: '',
        battleTips: '',
        teamTips: '',
        skills: []
      },
      // 表单的验证
      activityRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      // 存储获取的 分类数据
      parents: {},
      // 存储职位数据
      categories: [],
      // 存储装备数据
      items: [],
      // 设置上传图片的 头部
      headersToken: {
        Authorization: localStorage.getItem('token')
      }
    };
  },
  created () {
    this.id && this.fetch();
    this.fetchCategories();
    this.fetchItem();
  },
  methods: {
    // 发起表单提交请求
    async save () {
      // 发起表单提交请求
      let res;
      if (this.id) {
        // 编辑页面
        res = await this.$http.put(`rest/hero/${this.id}`, this.activityForm);
      } else {
        // 提交页面
        res = await this.$http.post('rest/hero', this.activityForm);
      }

      res = res.data;
      if (res.meta.status !== 200) {
        return this.$message.error(`表单${this.id ? '修改' : '提交'}提交失败`);
      }

      // 成功提示
      this.$message.success(`表单${this.id ? '修改' : '提交'}提交成功`);

      // 重定向到 list 页面
      this.$router.push('/hero/list');
    },
    // 根据 id 查询，当前的分类
    async fetch () {
      // 传递的id，使用 this.id 获取到
      const { data: res } = await this.$http.get(`rest/hero/${this.id}`);

      if (res.meta.status !== 200) {
        return this.$message.error('查询分类数据失败');
      }

      // 从数据库中查取到的数据中，没有难度这一项，我们自直接把数据赋给了
      // this.activityForm 了，那么他里面的 scores: {} 就会被覆盖掉了；
      // 又因为，我们的评分绑定了 this.activityForm 里的 scores ，但又被
      // 覆盖了，没有了，所以会报错；
      // 使用对象的
      this.activityForm = Object.assign(this.activityForm, res.data);
      console.log(this.activityForm);
    },
    // 图片上传成功后，触发事件
    handleAvatarSuccess (response) {
      this.activityForm.avatar = response;
    },
    // 发送获取分类的请求
    async fetchCategories () {
      const { data: res } = await this.$http.get('rest/categories');
      if (res.meta.status !== 200) {
        return this.$message.error('获取分类失败');
      }
      this.categories = res.data;
    },
    // 获取装备的请求
    async fetchItem () {
      const { data: res } = await this.$http.get('/rest/item');

      if (res.meta.status !== 200) {
        return this.$message.error('获取装备请求失败');
      }

      this.items = res.data;
      console.log(this.items);
    },
    // 点击添加技能按钮触发
    addSkill () {
      this.activityForm.skills.push({});
    }
  }
};
</script>

<style lang="less">
  .item_content {
    // 提交按钮
    .el-button {
      margin-top: 20px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
    // 评分样式
    .el-rate {
      margin-top: 0.6rem;
    }
    .el-tabs__content {
      padding: 15px 30px 0px !important;
    }
    // input 文本提示宽度
    .el-form-item__label {
      width: auto !important;
    }
    // input 的左外边距
    .el-form-item__content {
     margin-left: 5rem !important;
    }
    // 技能列
    .el-col {
      padding: 0 10px;
      margin-bottom: 10px;
    }
    .skills {
      // 技能文本输入框
      .el-textarea__inner {
        height: 100px !important;
      }
    }
    // 提交按钮的 el-form-item
    .submitBut{
      .el-form-item__content {
        margin-left: 0px !important;
      }
    }
  }
</style>
