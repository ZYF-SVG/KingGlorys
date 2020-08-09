import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import http from './http/axios.js';

Vue.config.productionTip = false;

// 全局配置 axios
Vue.prototype.$http = http;

// 创建全局的属性 和 方法，各个组件都可以调用
Vue.mixin({
  // 计算属性
  computed: {
    // 上传图片的路由地址
    uploaUrl () {
      return 'http://localhost:3000/admin/api/upload';
    }
  },
  methods: {
    // 设置上传图片的 头部
    getToken () {
      return {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      };
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
