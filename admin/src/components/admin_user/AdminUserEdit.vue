<!-- 新建管理员 -->
<template>
  <div class="adminUser_content">
    <!-- 根据 id 是否存在来 控制页码元素的显示与隐藏  -->
    <h1> {{id ? '修改' : '新建'}}管理员</h1>
    <!-- 表单 @submit.native.prevent 提交表单阻止提交事件-->
    <el-form :model="items" :rules="adminUserRules" ref="adminUserRuleForm" label-width="120px"
    @submit.native.prevent="save">
      <!-- 用户名 -->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="items.username"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="items.password" show-password></el-input>
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item>
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
      items: {},
      // 表单的验证
      adminUserRules: {
        user_name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      },
      // 存储获取的 分类数据
      parents: {}
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
        res = await this.$http.put(`rest/adminUser/${this.id}`, this.items);
      } else {
        // 提交页面
        res = await this.$http.post('rest/adminUser', this.items);
      }

      res = res.data;
      if (res.meta.status !== 200) {
        return this.$message.error(`表单${this.id ? '修改' : '提交'}提交失败`);
      }

      // 成功提示
      this.$message.success(`表单${this.id ? '修改' : '提交'}提交成功`);

      // 重定向到 list 页面
      this.$router.push('/admin_user/list');
    },
    // 根据 id 查询，当前的分类
    async fetch () {
      // 传递的id，使用 this.id 获取到
      const { data: res } = await this.$http.get(`rest/adminUser/${this.id}`);

      if (res.meta.status !== 200) {
        return this.$message.error('查询分类数据失败');
      }

      this.items = res.data;
    }
  }
};
</script>

<style lang="less" scoped>
  .adminUser_content {
    // 提交按钮
    .el-button {
      margin-top: 10px;
    }
  }
</style>
