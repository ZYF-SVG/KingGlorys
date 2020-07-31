import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../components/main/Main.vue';
import CategoryEdit from '../components/categories/CategoryEdit.vue';
import CategoryList from '../components/categories/CategoryList';

import ItemEdit from '../components/item/ItemEdit.vue';
import ItemList from '../components/item/ItemList';

import HeroEdit from '../components/hero/HeroEdit.vue';
import HeroList from '../components/hero/HeroList';

Vue.use(VueRouter);

// 重复点击路由不会出错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
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
      { path: '/hero/list', component: HeroList }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
