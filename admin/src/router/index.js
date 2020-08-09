import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../components/main/Main.vue';
import CategoryEdit from '../components/categories/CategoryEdit.vue';
import CategoryList from '../components/categories/CategoryList.vue';

import ItemEdit from '../components/item/ItemEdit.vue';
import ItemList from '../components/item/ItemList.vue';

import HeroEdit from '../components/hero/HeroEdit.vue';
import HeroList from '../components/hero/HeroList.vue';

import ArticleEdit from '../components/article/ArticleEdit.vue';
import ArticleList from '../components/article/ArticleList.vue';

import AdsEdit from '../components/ads/AdsEdit.vue';
import AdsList from '../components/ads/AdsList.vue';

import AdminUserEdit from '../components/admin_user/AdminUserEdit.vue';
import AdminUserList from '../components/admin_user/AdminUserList.vue';

import Login from '../components/login/Login.vue';

Vue.use(VueRouter);

// 重复点击路由不会出错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [
        // categories 类型
        { path: '/categories/create', component: CategoryEdit },
        // 编辑页面 使用 新建分类 组件一样，但可以根据 有无id 来显示内容
        // props 为 true，意思为 把路由中的所有参数，都存放到 CategoryEdit 这个组件中，
        // 在组件中，使用 props 接收，于 data 同级 。
        { path: '/categories/edit/:id', component: CategoryEdit, props: true },
        { path: '/categories/list', component: CategoryList },

        // item 类型
        { path: '/item/create', component: ItemEdit },
        { path: '/item/edit/:id', component: ItemEdit, props: true },
        { path: '/item/list', component: ItemList },

        // hero 类型
        { path: '/hero/create', component: HeroEdit },
        { path: '/hero/edit/:id', component: HeroEdit, props: true },
        { path: '/hero/list', component: HeroList },

        // articles 类型
        { path: '/article/create', component: ArticleEdit },
        { path: '/article/edit/:id', component: ArticleEdit, props: true },
        { path: '/article/list', component: ArticleList },

        // ads 类型
        { path: '/ads/create', component: AdsEdit },
        { path: '/ads/edit/:id', component: AdsEdit, props: true },
        { path: '/ads/list', component: AdsList },

        // admin_user 类型
        { path: '/admin_user/create', component: AdminUserEdit },
        { path: '/admin_user/edit/:id', component: AdminUserEdit, props: true },
        { path: '/admin_user/list', component: AdminUserList }
      ]
    }
  ]
});

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const tokenStr = localStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next();
});

export default router;
