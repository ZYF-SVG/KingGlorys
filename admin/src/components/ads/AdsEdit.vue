<!-- 广告位添加 -->
<template>
  <div class="ads_content">
    <h1> {{id ? '修改' : '新建'}}广告位</h1>
    <el-form :model="adsForm" :rules="adsRules" ref="adsRuleForm" label-width="120px"
    @submit.native.prevent="save" label-position="right">
      <!-- 名称 -->
      <el-form-item label="名称" prop="name">
        <el-input v-model="adsForm.name"></el-input>
      </el-form-item>
      <!-- 广告 -->
      <el-form-item label="广告">
        <el-button type="primary" icon="el-icon-plus" plain size="small" @click="addSkill" style="margin-bottom: 20px;">添加广告</el-button>
        <!-- 循环一个数组，在点击按钮时，往数组中push个空对象，这样，就可以实现，点击按钮，添加一个技能的操作 -->
        <el-row type="flex" style="flex-direction: column">
          <el-col :md="24" v-for="(item, i) in adsForm.items" :key="i">
            <!-- 名称 -->
            <el-form-item label="跳转链接">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <!-- 图标 -->
            <el-form-item label="图标">
              <!-- 把函数直接写在了 html 里，因为这是在 for 循环中，item 是当前向，写在里面比较方便
              又因为，单纯的把图片的路径给 item.icon 不能显示出来，使用使用 $set 来设置； -->
              <el-upload
                class="avatar-uploader"
                :action="uploaUrl"
                :headers="getToken()"
                :show-file-list="false"
                :on-success="(res) => { $set(item, 'image', res); }">
                <img v-if="item.image" :src="item.image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <!-- 删除按钮 -->
            <el-form-item>
              <el-button type="danger" @click="adsForm.items.splice(i, 1)" style="margin-left: 120px;">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 提交按钮 -->
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
      adsForm: {
        name: '',
        items: []
      },
      // 表单的验证
      adsRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      // 存储获取的 分类数据
      parents: {},
      // 存储职位数据
      categories: [],
      // 存储装备数据
      items: []
    };
  },
  created () {
    this.id && this.fetch();
  },
  methods: {
    // 发起表单提交请求
    async save () {
      // 发起表单提交请求
      let res;
      if (this.id) {
        // 编辑页面
        res = await this.$http.put(`rest/ads/${this.id}`, this.adsForm);
      } else {
        // 提交页面
        res = await this.$http.post('rest/ads', this.adsForm);
      }

      res = res.data;
      if (res.meta.status !== 200) {
        return this.$message.error(`表单${this.id ? '修改' : '提交'}提交失败`);
      }

      // 成功提示
      this.$message.success(`表单${this.id ? '修改' : '提交'}提交成功`);

      // 重定向到 list 页面
      this.$router.push('/ads/list');
    },
    // 根据 id 查询，当前的分类
    async fetch () {
      // 传递的id，使用 this.id 获取到
      const { data: res } = await this.$http.get(`rest/ads/${this.id}`);

      if (res.meta.status !== 200) {
        return this.$message.error('查询分类数据失败');
      }

      this.adsForm = Object.assign(this.adsForm, res.data);
    },
    // 点击添加技能按钮触发
    addSkill () {
      this.adsForm.items.push({});
    }
  }
};
</script>

<style lang="less">
  .ads_content {
    // 提交按钮
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
      min-width: 350px;
      min-height: 200px;
      line-height: 200px;
      text-align: center;
    }
    .avatar {
      min-width: 350px;
      min-height: 200px;
      display: block;
    }
    // 技能列
    .el-col {
      padding: 0 10px;
      margin-bottom: 10px;
    }
    // 广告里的列
    .el-form-item {
      margin-bottom: 20px !important;
    }
  }
</style>
