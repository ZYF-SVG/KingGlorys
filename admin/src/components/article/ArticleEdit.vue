<!-- 文章 -->
<template>
  <div class="article_content">
    <h1> {{id ? '修改' : '新建'}}文章</h1>
    <!-- 表单 @submit.native.prevent 提交表单阻止提交事件-->
    <el-form :model="articleForm" :rules="articleRules" ref="articleRuleForm" label-width="120px"
    @submit.native.prevent="save">
    <!-- 所属分类 -->
      <el-form-item label="所属分类">
        <el-select v-model="articleForm.categories" placeholder="请选择" clearable multiple>
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <!-- 标题 -->
      <el-form-item label="标题" prop="title">
        <el-input v-model="articleForm.title"></el-input>
      </el-form-item>
      <!-- 详情,富文本编辑器 -->
      <el-form-item>
        <vue-editor id="editor" v-model="articleForm.body" useCustomImageHandler @image-added="handleImageAdded">
        </vue-editor>
      </el-form-item>
      <el-form-item>
        <!-- 设置按钮为 原生的提交按钮 -->
        <el-button type="primary" plain native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 引入富文本编辑器
import { VueEditor } from 'vue2-editor';

export default {
  // 接收路由，传递过来的参数, 接收值应为 对象
  props: {
    id: {}
  },
  // 注册富文本编辑器
  components: { VueEditor },
  data () {
    return {
      // 绑定表单数据
      articleForm: {
        title: ''
      },
      // 表单的验证
      articleRules: {
        title: [
          { required: true, message: '请输入文章的标题', trigger: 'blur' }
        ]
      },
      // 存储获取的 分类数据
      parents: {}
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
        res = await this.$http.put(`rest/article/${this.id}`, this.articleForm);
      } else {
        // 提交页面
        res = await this.$http.post('rest/article', this.articleForm);
      }

      res = res.data;
      if (res.meta.status !== 200) {
        return this.$message.error(`表单${this.id ? '修改' : '提交'}提交失败`);
      }

      // 成功提示
      this.$message.success(`表单${this.id ? '修改' : '提交'}提交成功`);

      // 重定向到 list 页面
      this.$router.push('/article/list');
    },
    // 根据 id 查询，当前的分类
    async fetch () {
      // 传递的id，使用 this.id 获取到
      const { data: res } = await this.$http.get(`rest/article/${this.id}`);

      if (res.meta.status !== 200) {
        return this.$message.error('查询分类数据失败');
      }

      this.articleForm = res.data;
    },
    // 获取分类数据
    async fetchParent () {
      const { data: res } = await this.$http.get('rest/category');

      if (res.meta.status !== 200) {
        return this.$message.error('查询数据失败');
      }
      // 把 res.data 转换为对象
      this.parents = res.data;
    },
    // 富文本编辑器的图片上传函数
    async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append('file', file);

      // 上传图片的请求
      const res = await this.$http.post('upload', formData);
      console.log(res.data);
      Editor.insertEmbed(cursorLocation, 'image', res.data);
      resetUploader();
    }
  }
};
</script>

<style lang="less" scoped>
  .article_content {
    // 提交按钮
    .el-button {
      margin-top: 10px;
    }
  }
</style>
