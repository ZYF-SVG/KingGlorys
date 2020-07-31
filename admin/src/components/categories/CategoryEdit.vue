<!-- 新建分类 -->
<template>
  <div class="activity_content">
    <!-- 根据 id 是否存在来 控制页码元素的显示与隐藏  -->
    <h1> {{id ? '修改' : '新建'}}分类</h1>
    <!-- 表单 @submit.native.prevent 提交表单阻止提交事件-->
    <el-form :model="activityForm" :rules="activityRules" ref="activityRuleForm" label-width="120px"
    @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <!-- activityForm.parent, 这个值，没有写在 data 的 activityForm 中，因为，
        这个值，有的时候，会添加到 activityForm 中，没有时，就没有添加到 activityForm 中，
        防止，mongoodb 的 `ObjectId`  类型报错； -->
        <el-select v-model="activityForm.parent" placeholder="请选择" clearable>
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="activityForm.name"></el-input>
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
        name: ''
      },
      // 表单的验证
      activityRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
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
        res = await this.$http.put(`rest/categories/${this.id}`, this.activityForm);
      } else {
        // 提交页面
        res = await this.$http.post('rest/categories', this.activityForm);
      }

      res = res.data;
      if (res.meta.status !== 200) {
        return this.$message.error(`表单${this.id ? '修改' : '提交'}提交失败`);
      }

      // 成功提示
      this.$message.success(`表单${this.id ? '修改' : '提交'}提交成功`);

      // 重定向到 list 页面
      this.$router.push('/categories/list');
    },
    // 根据 id 查询，当前的分类
    async fetch () {
      // 传递的id，使用 this.id 获取到
      const { data: res } = await this.$http.get(`rest/categories/${this.id}`);

      if (res.meta.status !== 200) {
        return this.$message.error('查询分类数据失败');
      }

      this.activityForm = res.data;
    },
    // 获取分类数据
    async fetchParent () {
      const { data: res } = await this.$http.get('rest/categories');

      if (res.meta.status !== 200) {
        return this.$message.error('查询数据失败');
      }
      // 把 res.data 转换为对象
      this.parents = res.data;
    }
  }
};
</script>

<style lang="less" scoped>
  .activity_content {
    // 提交按钮
    .el-button {
      margin-top: 10px;
    }
  }
</style>
