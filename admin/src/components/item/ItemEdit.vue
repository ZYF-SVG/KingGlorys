<!-- 新建分类 -->
<template>
  <div class="item_content">
    <h1> {{id ? '修改' : '新建'}}物品</h1>
    <el-form :model="activityForm" :rules="activityRules" ref="activityRuleForm" label-width="120px"
    @submit.native.prevent="save">
      <el-form-item label="名称" prop="name">
        <el-input v-model="activityForm.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploadHttp"
          :show-file-list="false"
          :on-success="handleAvatarSuccess">
          <img v-if="activityForm.icon" :src="activityForm.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <!-- 设置按钮为 原生的提交按钮 -->
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
        icon: ''
      },
      // 表单的验证
      activityRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      // 存储获取的 分类数据
      parents: {},
      // 存储上传图片时，发起的请求地址
      uploadHttp: 'http://localhost:3000/admin/api/upload'
    };
  },
  created () {
    this.id && this.fetch();
    this.fetchParent();
  },
  methods: {
    // 发起表单提交请求
    async save () {
      // 发起表单提交请求
      let res;
      if (this.id) {
        // 编辑页面
        res = await this.$http.put(`rest/item/${this.id}`, this.activityForm);
      } else {
        // 提交页面
        res = await this.$http.post('rest/item', this.activityForm);
      }

      res = res.data;
      if (res.meta.status !== 200) {
        return this.$message.error(`表单${this.id ? '修改' : '提交'}提交失败`);
      }

      // 成功提示
      this.$message.success(`表单${this.id ? '修改' : '提交'}提交成功`);

      // 重定向到 list 页面
      this.$router.push('/item/list');
    },
    // 根据 id 查询，当前的分类
    async fetch () {
      // 传递的id，使用 this.id 获取到
      const { data: res } = await this.$http.get(`rest/item/${this.id}`);

      if (res.meta.status !== 200) {
        return this.$message.error('查询分类数据失败');
      }

      this.activityForm = res.data;
    },
    // 获取分类数据
    async fetchParent () {
      const { data: res } = await this.$http.get('rest/item');

      if (res.meta.status !== 200) {
        return this.$message.error('查询数据失败');
      }
      // 把 res.data 转换为对象
      this.parents = res.data;
    },
    // 图片上传成功后，触发事件
    handleAvatarSuccess (response) {
      this.activityForm.icon = response;
    }
  }
};
</script>

<style lang="less">
  .item_content {
    // 提交按钮
    .el-button {
      margin-top: 10px;
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
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
