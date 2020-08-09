<!-- 登录页面 -->
<template>
  <div class="login_content">
    <el-card>
      <h2>请先登录</h2>
      <el-form @submit.native.prevent="logins" :model="model">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      model: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    // 点击登录按钮，触发表单提交事件
    async logins () {
      const { data: res } = await this.$http.post('login', this.model);
      // 把 token 存储到浏览器的 localStorage 中；
      localStorage.setItem('token', res.token);
      // 跳转到后台管理页面
      this.$router.push('/');
      // 提示用户登录成功
      this.$message.success(`欢迎登录 ${res.name}`);
    }
  }
};
</script>

<style lang="less">
.login_content {
  height: 100vh;
  background: url(../../../public/background.jpeg) no-repeat left top;
  background-size: 100%;
  .el-card {
    position: absolute;
    top: 8rem;
    left: 50%;
    width: 30rem;
    height: 23rem;
    transform: translateX(-50%);
    opacity: .8;
  }
}
</style>
