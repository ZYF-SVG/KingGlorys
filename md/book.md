# 1. 环境布置

- node
- mongodb
- vue/lic



# 2. 多端分类

serve 服务端，为客户端 和 后台管理界面 提供 api 接口；

web 客户端， 王者移动端的展示页面；

admin 后台管理界面，王者后端数据的管理展示页面；



# 3. 拉取 项目

在 github 创建一个 KingGlorys 项目，创建 LLCENSE 开源协议 和.gitignore git省略文件，然后拉取到本地：

```js
git clone git@github.com:ZYF-SVG/KingGlorys.git
```

会创建一个文件夹，我们就在 文件夹中，书写项目 。



# 4. admin 端

## 1. 安装 element-ui

1.下载：

```js
npm i element-ui -S
```

2.安装 babel 包：

安装 babel-plugin-component 的 babel 语法转义包；

```bash
npm install babel-plugin-component -D
```

3.配置 babel 包的语法：

在 babel.config.js 中写入，element-ui 官网的格式：

```js
module.exports = {
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
```

4.按需导入组件：

然后在 src 下创建 plugins 文件夹，创建 element.js 用于按需导入 组件：

src > plugins > element.js

```js
import vue from 'vue';

import {
  Button
} from 'element-ui';

vue.use(Button);
```

然后在 main.js  中导入文件：

```js
import './plugins/element.js';
```

重启项目，就 ok 了。



## 2. 创建 Main.vue 组件

这个组件，主要是 显示 后台管理页面的主页面。

### 1. 删除文件

在 App.vue 中删除之前的路由链接，剩下一个 路由占位符；



### 2. 创建文件主页面文件

components > main > Main.vue

使用 element-ui 的 布局容器组件，

```html
<template>
  <div class="main_content">
    <!-- 布局容器 -->
    <el-container style="height: 100vh; border: 1px solid #eee">
      <!-- 左侧 -->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']" :router="true">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>内容管理</template>
              <el-menu-item-group>
                <template slot="title">分类</template>
                <el-menu-item index="/categoryEdit">新建分类</el-menu-item>
                <el-menu-item index="/adfa">分类列表</el-menu-item>
              </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 顶部 -->
      <el-container>
        <el-header style="text-align: right; font-size: 12px; background: #B3C0D1">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>

        <!-- 子路由显示区 -->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

```

根据写的标签名，按需导入 element-ui 组件， el 不写进入，字母以大写开头，驼峰命名法： plugins > element.js

```js
import vue from 'vue';

import {
  Button,
  Container,
  Aside,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Header,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Main,
  Table,
  Form,
  FormItem,
  Input
} from 'element-ui';

vue.use(Button);
vue.use(Container);
vue.use(Aside);
vue.use(Menu);
vue.use(Submenu);
vue.use(MenuItemGroup);
vue.use(MenuItem);
vue.use(Header);
vue.use(Dropdown);
vue.use(DropdownMenu);
vue.use(DropdownItem);
vue.use(Main);
vue.use(Table);
vue.use(Form);
vue.use(FormItem);
vue.use(Input);

```

侧边栏内容为：

```js
- 内容管理
  - 新建分类
  - 分类列表

  - 新建物品
  - 物品列表

  - 新建英雄
  - 英雄列表

  - 新建文章
  - 文章列表

- 运营管理
  - 新建广告位
  - 广告位列表

- 系统管理
  - 新建管理员
  - 管理员列表


```





然后，修改路由配置，router > index.js， 当访问 / 时，就显示 Main.vue 组件。

```js
import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '../components/main/Main.vue';

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
    component: Main
  }
];

const router = new VueRouter({
  routes
});

export default router;

```



## 3. 创建子路由 CategoryEdit.vue

在 Main.vue 中想点击 左侧 的菜单，右边的主体内容，作为 子路由组件 进行替换 。

### 1. 开启路由模式

给 左侧的 `el-menu` 开启路由模式

在 element-ul 中的  `menu` 有一个 路由属性，默认为 关闭的

![菜单路由](H:\javascript\Vue.js\电商后台数据管理项目\Vue-CLI\md\images\菜单路由.png)

```html
<el-menu :router="true"></el-menu>   <!--注意要数据绑定-->
```

开启他， 他会以标签中的 index 的值，为路由的 请求地址，

给他们添加 路由地址：

```html
Main.js：
<el-menu-item index="/categoryEdit">新建分类</el-menu-item>
<el-menu-item index="/adfa">分类列表</el-menu-item>
```



### 2. 添加 子路由占位符

在 Main.vue 中的内容部分，修改为 子路由的显示区域：

```html
<!-- 内容部分，子路由显示区 -->
<el-main>
  <router-view/>
</el-main>
```



### 3. 新建 CategoryEdit.vue 组件

components > classification > CategoyEdit.vue

```html
<!-- 新建分类 -->
<template>
  <div class="activity_content">
    <h1>新建内容</h1>
    <!-- 表单 @submit.native.prevent 提交表单阻止提交事件-->
    <el-form :model="activityForm" :rules="activityRules" ref="activityRuleForm" label-width="120px"
    @submit.native.prevent="save">
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
  data () {
    return {
      // 绑定表单数据
      activityForm: {
        name: ''
      },
      activityRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ]
      }
    };
  },
}
```

![CategoryEdit.vue](H:\javascript\Vue.js\KingGlorys\md\img\CategoryEdit.vue.png)



### 4. 设置子路由

添加为 Main.vue 的子路由，就可以在嵌套在 Main.vue  里；

```js
router > index.js:

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: '/categoryEdit', component: CategoryEdit }
    ]
  }
];
```



### 5. 给按钮 添加 原生属性

就是给 按钮 修改为 提交按钮：点击按钮，会发起表单提交的请求；

```html
<!-- 设置按钮为 原生的提交按钮 -->
<el-button type="primary" plain native-type="submit">保存</el-button>
```



### 6 .阻止表单的 提交行为

```text
当一个 form 元素中只有一个输入框时，在该输入框中按下回车应提交该表单。如果希望阻止这一默认行为，可以在 <el-form> 标签上添加 @submit.native.prevent。
```

```html
<el-form @submit.native.prevent="save"> </el-form>
```

在 点击 提交按钮 时，就会触发 表单的提交 事件，但我们阻止了他的行为，改成 

但 表单发起提交行为 时，触发我们绑定的事件 save ，我们可以在函数中发起提交请求 。

```js
methods: {
    // 发起表单提交请求
    async save () {
      const { data: res } = await this.$http.post('/categories', this.activityForm);
      console.log(res);

      if (res.meta.status !== 200) {
        return this.$message.error(`表单提交失败`);
      }

      // 成功提示
      this.$message.success(`表单提交成功`);
      // 重定向到 list 页面
      this.$router.push('/categories/list');
    }
  }
```

要发起请求，就要设置 axios 。然后去配置 serve 端，连接数据库，然后配置  router > admin > index.js



跳转到 /categories/list (分类列表页面) 页面 



## 4.配置 axios

### 1.下载

```js
npm install axios
```

### 2. 设置 axios

在 scr > http > axios ： 配置根请求路径，并导出；

```js
// 配置 axios
import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
});

// 注意导出语句
export default http;

```

### 3. 导入，全局配置

```js
main.js
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugins/element.js';
import http from './http/axios.js';

Vue.config.productionTip = false;

// 全局配置 axios
Vue.prototype.$http = http;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

```

完成 。

发送请求，获取数据，就要有 服务端接口，所以现在就去完成 serve 端的这部分的 api 接口；



## 5. 创建 CategoryList.vue 

admin > src > components > categories > CategoryLise.vue

### 1.创建文件

1，在页面初始化时，发起请求所有分类数据，然后渲染到 页面上；

2，配置 后端 的查询数据库 分类的所有数据，然后返回给前端页面；

3，给表格添加操作列，有编辑 和 删除 2个操作；

```html
<!-- 分类列表 -->
<template>
  <div class="list_content">
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <!-- scope.row 为当前每列的数据 -->
          <el-button type="text" size="small" @click="edit(scope.row._id)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: []
    };
  },
  created () {
    this.fetch();
  },
  methods: {
    // 发起查询分类的数据请求
    async fetch () {
      const { data: res } = await this.$http.get('categories');

      if (res.meta.status !== 200) {
        return this.$message.error('查询数据失败');
      }

      this.items = res.data;
    },
    // 点击编辑触,进行路由的跳转
    edit (id) {
      // 跳转到编辑页面，进行路由的跳转，携带当前列的id过去，跳转的页面和添加页面一样；
      this.$router.push(`/categories/edit/${id}`);
    },
    // 删除操作
    async remove (id) {
      const { data: res } = await this.$http.delete(`/categories/${id}`);

      if (res.meta.status !== 200) {
        return this.$message.error('删除分类失败!');
      }

      this.$message.success('删除成功');
      this.fetch();
    }
  }
};
</script>

<style lang="less">
</style>

```

配置路由：

```js
import CategoryList from '../components/categories/CategoryList';

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    // categories 类型
    children: [
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/list', component: CategoryList }
    ]
  }
];
```

4，点击 编辑，会跳转到 编辑页面，但是呢，编辑页面 和 添加分类 页面使用的页面是一样的，只是路由请求地址不一样，在配置路由时，多了一个参数 proms ，值设置为 true，就可以把 传递的参数，都传递到 跳转的路由中，在路由中，使用 proms 来接收；

```js
const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    // categories 类型
    children: [
      { path: '/categories/create', component: CategoryEdit },
      // 编辑页面 使用 新建分类 组件一样，但可以根据 有无id 来显示内容
      // props 为 true，意思为 把路由中的所有参数，都存放到 CategoryEdit 这个组件中，
      // 在组件中，使用 props 接收，于 data 同级 。
      { path: '/categories/edit/:id', component: CategoryEdit, props: true },
      { path: '/categories/list', component: CategoryList }
    ]
  }
];
```



5，在 CategoryEdit.vue 页面中，接收参数 id，并判断页面上，有无 id，来控制页面元素的显示 与 隐藏；

```html
CateorEdit.vue

<!-- 新建分类 -->
<template>
  <div class="activity_content">
    <!-- 根据 id 是否存在来 控制页码元素的显示与隐藏  -->
    {{id}}
    <h1> {{id ? '修改' : '新建'}}分类</h1>
    <!-- 表单 @submit.native.prevent 提交表单阻止提交事件-->
    <el-form :model="activityForm" :rules="activityRules" ref="activityRuleForm" label-width="120px"
    @submit.native.prevent="save">
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
      }
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
        res = await this.$http.put(`/categories/${this.id}`, this.activityForm);
      } else {
        // 提交页面
        res = await this.$http.post('/categories', this.activityForm);
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
      const { data: res } = await this.$http.get(`/categories/${this.id}`);

      if (res.meta.status !== 200) {
        return this.$message.error('查询分类数据失败');
      }

      this.activityForm.name = res.data.name;
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

```

其中有几个主要的点：

1. 获取 传递 过来的 id 值：

   ```html
   <script>
   export default {
     // 接收路由，传递过来的参数, 接收值应为 对象
     props: {
       id: {}
     },
     data () {}
   </script>
   ```

   

2. 根据 id，获取当前的分类 name，然后渲染到 文本输入框内，定义函数 fetch()，在 created 钩子中发起请求，但要判断页面 有无 id 这个值

   ```js
   created () {
       this.id && this.fetch();
     },
   // 根据 id 查询，当前的分类
   async fetch () {
     // 传递的id，使用 this.id 获取到
     const { data: res } = await this.$http.get(`/categories/${this.id}`);
   
     if (res.meta.status !== 200) {
       return this.$message.error('查询分类数据失败');
     }
   
     this.activityForm.name = res.data.name;
   }
   }
   ```

3. 点击按钮时，判断 是 添加分类 还是 修改分类；

   ```js
   // 发起表单提交请求
       async save () {
         // 发起表单提交请求
         let res;
         if (this.id) {
           // 编辑页面
           res = await this.$http.put(`/categories/${this.id}`, this.activityForm);
         } else {
           // 提交页面
           res = await this.$http.post('/categories', this.activityForm);
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
   ```

   





临时笔记：

**关于height:100%和height:100vh的区别**：


vh就是当前屏幕可见高度的1%，也就是说

height:100vh == height:100%;

但是当元素没有内容时候，设置height:100%，该元素不会被撑开，此时高度为0，

但是设置height:100vh，该元素会被撑开屏幕高度一致。





## 6. 创建 ItemEdit.vue 和 ItemList.vue

因为，我们使用了通用的 CRUD 接口，所以我们这2个页面，和 分类页面基本相同，所以只要改变发起的请求的路径就可以了，之前发起请求是 

```js
rest/categories
```

现在改成：

```js
rest/item
```

就好了，这样后端就接收到 item 这个参数，中间件中转换为复数形式 和 首字母大小，然后导入 Item 这个集合，我们就可以创建 和这个名字一样的集合，就可以了；

前端页面有些不一样，

- 列表页面的展示字段为，name icon 操作 3个列；
- edit 页面，没有上级分类，只有物品名称 和 上传图标；



### 1. 上传文件

使用 element-ui 的 Upload 上传 组件

![文件上传web](H:\javascript\Vue.js\KingGlorys\md\img\文件上传web.png)

结构：

```html
  <el-form-item label="图标">
    <el-upload
      class="avatar-uploader"
      :action="uploadHttp"      // 文件上传，发起请求的地址，没有使用我们配置的axios，是组件自己的
      :show-file-list="false"
      :on-success="handleAvatarSuccess">   // 上传成功，触发是函数
      // activityForm.icon 图片在服务器的地址
      <img v-if="activityForm.icon" :src="activityForm.icon" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>

    <!-- 设置按钮为 原生的提交按钮 -->
    <el-button type="primary" plain native-type="submit">保存</el-button>
  </el-form-item>

<script>
  data () {
    return {
      // 绑定表单数据
      activityForm: {
        name: '',
        icon: ''
      },
 	  // 存储上传图片时，发起的请求地址
      uploadHttp: 'http://localhost:3000/admin/api/upload'
	}
  }
  methods: {
    // 图片上传成功后，触发事件
    handleAvatarSuccess (response) {
      // response => http://localhost:3000/public/文件名'
      this.activityForm.icon = response;
    }
  }
</script>
```



### 2. 把上传的文件上传到数据库

上传的文件，只是文件本身，上传到服务器的文件夹中，我们还有把 文件的 完整地址保存到数据库中，这样就可以获取 物品 对应的图标了。

之前就有的事件，点击按钮，进行表单数据的提交；之前就把他改成的上传到 Item 集合中了，所以不用修改什么了，**但**：

可以添加物品，不添加 图标吗？ 试试，可以的



## 7. 新建 HeroEdit.vue  和 HeroList.vue 文件

英雄页面

### 1. HeroEdit.vue

在英雄添加，编辑页面中分为2个 tabs 一个为 基本的信息 一个为 技能信息；

![英雄编辑和添加](H:\javascript\Vue.js\KingGlorys\md\img\英雄编辑和添加.png)

![英雄技能](H:\javascript\Vue.js\KingGlorys\md\img\英雄技能.png)

1、基本信息的结构为：

```html
<el-tab-pane label="基本信息" name="first">
  <!-- 名称 -->
  <el-form-item label="名称" prop="name">
    <el-input v-model="activityForm.name"></el-input>
  </el-form-item>
  <!-- 头像 -->
  <el-form-item label="头像">
    <el-upload
      class="avatar-uploader"
      :action="uploadHttp"
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
```

2、技能的基本结构为：

使用 for 循环，渲染出多个 el-col 列，循环的数据源为 `activityForm.skills` 为一个空数组

```html
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
          :action="uploadHttp"
          :show-file-list="false"
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
```

data 数据：

```js
  // 绑定表单数据
  activityForm: {
    skills: []
  },
```

原来什么都没有的，点击 添加技能按钮，给这个数组，添加一个空对象，就会循环出一个技能的填写区域出来；

```html
 <el-button type="primary" @click="addSkill">添加技能</el-button>

<script>
	// 点击添加技能按钮触发
    addSkill () {
      this.activityForm.skills.push({});
    }
</script>
```

然后，循环里的 item 就是  `activityForm.skills` 这个值。我们在 技能添加区域 使用 v-model 绑定对应的值；

不用改变上传图片的请求，但要修改上传图片后，触发的函数，我们发生图片，会返回一串 图片的地址；所以呢，我们要添加到 技能图标 的 src 上；触发函数中，是给 `item.icon` 添加值，所以函数还是写在 标签 上面会比较好：

```html
  <!-- 图标 -->
  <el-form-item label="图标">
    <!-- 把函数直接写在了 html 里，因为这是在 for 循环中，item 是当前向，写在里面比较方便
    又因为，单纯的把图片的路径给 item.icon 不能显示出来，使用使用 $set 来设置； -->
    <el-upload
      class="avatar-uploader"
      :action="uploadHttp"
      :show-file-list="false"
      :on-success="(res) => { $set(item, 'icon', res); }">
      <img v-if="item.icon" :src="item.icon" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </el-form-item>
```

使用 `$set` 是为了防止 图标 在页面中显示不出来；



### 2. HeroList.vue

和上一个基本一样；



## 8. 新建 articleEdit.vue  和 articleList.vue

编辑，添加文章 和 文章列表：

![文章页面](H:\javascript\Vue.js\KingGlorys\md\img\文章页面.png)

编辑，添加文章 使用到了富文本编辑器：

- 富文本编辑器： 在 admin 里使用 

  我们使用 <a href="https://www.vue2editor.com/guide.html">vue2Editor</a> 这个插件：

  **下载**：

  ```js
  npm install vue2-editor
  ```

  **局部配置基本使用**：

  ```html
  <template>
    <div>
        <!-- 组件占位符 -->
        <vue-editor v-model="富文本编辑器绑定的内容"></vue-editor>    
    </div>
  </template>
  
  <script>
      // 导入
      import { VueEditor } from "vue2-editor";
      // 注册组件
      export default {
      	components: { VueEditor }
      };
  </script>
  ```

  **配置上传图片**：

  在我们还没有设置，上传图片时， 你在富文本编辑器中，添加图片，这个图片会被转成 倍s64什么什么的格式，存储在篇文章的数据中，这样虽然不用上传图片；但是，接口请求的 数据太过大；导致请求上传不了，报错 ：

  ```js
  PayloadTooLargeError: request entity too large
  => 
  PayloadTooLargeError:请求实体太大
  ```

  所以我们要上传图片，然后在读取图片的在 服务器的路径，然后渲染数据，这样比较好；

  我们就要使用到  <a href="https://www.vue2editor.com/guide.html">vue2Editor</a>  的上传图片功能了：

  1、在标签上添加一个属性 和 一个方法，告诉富文本编辑器 我们要自己设置图片

  ```html
  <vue-editor id="editor" useCustomImageHandler @imageAdded="handleImageAdded" v-model="htmlForEditor"> </vue-editor>
  ```

  2，在上传图片时，触发函数 `imageAdded` 但是，但是，这里有一个坑，**就是函数不能使用 驼峰命名 法的方式 来命名，不然不能触发函数的；** 要改变成这个 `image-added`：

  ```js
  // 富文本编辑器的图片上传函数
  async handleImageAdded (file, Editor, cursorLocation, resetUploader) {
    const formData = new FormData();
    // 第一个 file 是我们上传图片时，返回的格式；
    formData.append('file', file);
  
    // 上传图片的请求
    const res = await this.$http.post('upload', formData);
    // 这里接收的 res 是不确定的，你要输出来看看，要得到 图片的路径，我这里是  res.data
    // image 是图片的格式吗 哈哈
    Editor.insertEmbed(cursorLocation, 'image', res.data);
    resetUploader();
  }
  ```

  这样就可以了

  ![富文本编辑器上传图片](H:\javascript\Vue.js\KingGlorys\md\img\富文本编辑器上传图片.png)

  ![地址也改变了](H:\javascript\Vue.js\KingGlorys\md\img\地址也改变了.png)

。



![文章列表](H:\javascript\Vue.js\KingGlorys\md\img\文章列表.png)





## 9. 新建 AdsEdit.vue  和 AdsList.vue

广告位页面，广告位有很多，有页面的轮播图区，有列表的形式，有图片的形式 等等。。

![广告位的添加](H:\javascript\Vue.js\KingGlorys\md\img\广告位的添加.png)

一个广告位有多个 子广告，比如： 首页幻灯片广告有

- 图片；
- 点击图片的跳转地址；



![广告位的列表](H:\javascript\Vue.js\KingGlorys\md\img\广告位的列表.png)





## 10. 新建 adminUserEdit.vue  和 adminUserList.vue

管理员账号管理

后端先，建 admin_user.js 集合，然后导出，我们再创建2个服务端文件；内容为：

![新建管理员](H:\javascript\Vue.js\KingGlorys\md\img\新建管理员.png)



![管理员列表](H:\javascript\Vue.js\KingGlorys\md\img\管理员列表.png)

关于管理员的密码安全，所以要使用密码加密：在后端接口进行加密处理，在 AdminUser.js 集合中，进行处理，而不是在 处理函数体中；

**加密**：

是在 管理员集合中进行处理的；

set 就是数据要存储前执行的函数；

![加密](H:\javascript\Vue.js\KingGlorys\md\img\加密.png)

设置 select 为 false 后，编辑页面就没有查出 密码，然后提交时，我以为会提交一个空密码呢，会改变数据库里的密码，但不会的；

![select为false](H:\javascript\Vue.js\KingGlorys\md\img\select为false.png)

证明： 

把 select 设置为 true，然后点击编辑用户，查看用户加密后的密码，然后再设置为 false；然后添加用户；

```js
// $2a$10$oHrqmnvyWj0qmEMQpPZBpejdUeC7OPxGc14VMOhWvjl/7BNjaxXxu

// $2a$10$oHrqmnvyWj0qmEMQpPZBpejdUeC7OPxGc14VMOhWvjl/7BNjaxXxu
```

在次点击编辑用户，然后把 select设置为 true，查看 密码会不会和之前的一样，答案是会；



## 11. 新建 Login.vue 登录页面

![登录页面](H:\javascript\Vue.js\KingGlorys\md\img\登录页面.png)

重点：

- 主要是 app 和 整个页面的body 的高度为 0，展示不了背景图片了，所以可以给他们都添加 `height: 100vh`;
- 把 获取到的 token 存储到 浏览器中；

```html
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
          <el-input v-model="model.password"></el-input>
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
      model: {}
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

```

![获取不到password](H:\javascript\Vue.js\KingGlorys\md\img\获取不到password.png)

因为在之前，设置管理用户集合时，设置 密码 select 为 false，所以根据用户 名，查取不到 密码，在查询语句后添加 `select('+password')；`就可以查询到了。

![select+](H:\javascript\Vue.js\KingGlorys\md\img\select+.png)





**错误处理**：

如果，用户不存在，不是在 login.vue 中提示的，一般是在 axios 的拦截响应 中处理的；

http > axios.js

```js
// 配置 axios
import axios from 'axios';
import vue from 'vue';

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
});

// 响应拦截
http.interceptors.response.use(config => {
  // 正确时，执行
  return config;
}, err => {
  // 当响应错误时，执行
  vue.prototype.$message.error(err.response.data.message);
  return Promise.reject(err);
});

// 注意导出语句
export default http;

```

在 axios.js 里是获取不到 vue 中的 $message 方法的，所以要导入 vue，然后获取 vue 的全局属性？，你可以输出看看：

![在别的文件中，获取到vue里的方法](H:\javascript\Vue.js\KingGlorys\md\img\在别的文件中，获取到vue里的方法.png)





## 12. 登录拦截

要是发起的请求的请求头中，没有携带 token 的话，就重定向到 登录页面；用户没有登录就不能访问 后台管理页面，大概就是这样，操作要点赋值：

### 1. 客户端 设置请求拦截器

在 axios 设置 请求拦截器，把 token 携带在请求头中：

admin > http > axios.js

```js
// 请求拦截
http.interceptors.request.use(config => {
  // 添加请求头
  const token = localStorage.getItem('token');
  // 并判断，如果 token 存在才发起请求， Bearer 后面有一个空格
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  return config;
});
```



### 2. 服务端接收请求头

服务端接收请求头，井进行 解析，把解析出来的 数据（因为我们之前把 用户的 id ，使用  jsonwebtoken 加密成一个 token，所以解析出来的是一个 用户 id； 并到 数据库里进行查找，看看是否有这个用户；

serve > router > admin.js 

1. 获取 前端传递过来的 token：如果为 空，就报错，前端的响应拦截器，会拦截到的；

   ```js
    // 登录拦截
     app.use('/admin', (req, res, next) => {
       // 判断是否有发送 token，要是前端没有发送 token，这里的 token 的 .split 方法
       // 就会报错。不是在整个 语句后添加 ||, 是在里面。
      const token = (req.headers.authorization || '').split(' ').pop();
       if (token == null) {
         return res.status(401).send({
           message: 'token为空'
         })
       }
       next();
     })
   ```

2. token 存在，就解析出 id；如果没有 id 就报错；

   ```js
   // token 存在，就解析出 id，到数据库找用户是否存在, tokenDate就是当前登录用户的信息；
   // 解析 token 中加密的 id，如果 解析出来的数据里没有，包含 id，也报错，可以会有人使用伪造的 token
   const tokenDate = jwt.verify(token, require('../key'));
   if (!tokenDate) {
     return res.status(401).send({
       message: 'token中不存在用户id'
     })
   }
   ```

   ![token 中的用户id](H:\javascript\Vue.js\KingGlorys\md\img\token 中的用户id.png)



3. 根据解析出来的id，到数据库里进行查询，如果没有用户报错；

   ```js
   // 在数据库里查询用户信息，如果不存在改用户，就报错；
   const data = await AdminUser.findById({_id: tokenDate.id});
   if (!data) {
     return res.status(401).send({
       message: '用户不存在'
     })
   }
   ```



4. 整体代码：

   ```js
    // 登录拦截
     app.use('/admin', async (req, res, next) => {
       // 判断是否有发送 token，没有就为 null
       const token = req.headers.authorization.split(' ').pop();
       if (token == null) {
         return res.status(401).send({
           message: 'token为空'
         })
       }
       // token 存在，就解析出 id，到数据库找用户是否存在, tokenDate就是当前登录用户的信息；
       // 解析 token 中加密的 id，如果 解析出来的数据里没有，包含 id，也报错，可以会有人使用伪造的 token
       const tokenDate = jwt.verify(token, require('../key'));
       if (!tokenDate) {
         return res.status(401).send({
           message: 'token中不存在用户id'
         })
       }
       // 在数据库里查询用户信息，如果不存在改用户，就报错；
       const data = await AdminUser.findById({_id: tokenDate.id});
       if (!data) {
         return res.status(401).send({
           message: '用户不存在'
         })
       }
       next();
     })
   ```

   

5. 但是呢，每次都要使用到判断，然后返回错误信息，这个我们可以使用一个 插件 `http-assert` 简化判断：

   下载：

   ```js
   npm install http-assert
   ```

   替换 if 判断：

   ```js
   app.use('/admin', async (req, res, next) => {
       // 判断是否有发送 token，没有就为 null，注意判断 token 不存在就为 空字符串；
       let token = (req.headers.authorization || '').split(' ').pop();
       assert(token, 401, 'token为空');
       // if (token == null) {
       //   return res.status(401).send({
       //     message: 'token为空'
       //   })
       // }
   ```

   修改后结构为：

   ```js
   // 登录拦截
     app.use('/admin', async (req, res, next) => {
       // 判断是否有发送 token，没有就为 null
       const token = (req.headers.authorization || '').split(' ').pop();
       assert(token, 401, 'token为空');
   
       // token 存在，就解析出 id，到数据库找用户是否存在, tokenDate就是当前登录用户的信息；
       // 解析 token 中加密的 id，如果 解析出来的数据里没有，包含 id，也报错，可以会有人使用伪造的 token
       const tokenDate = jwt.verify(token, require('../key'));
       assert(tokenDate, 401, 'token中不存在用户id');
   
       // 在数据库里查询用户信息，如果不存在改用户，就报错；然后把查取到是用户信息，存储到 
       // req.user 里面；
       req.user = await AdminUser.findById({_id: tokenDate.id});
       assert(req.user, 401, '请先登录');
   
       next();
     })
   ```

   

   然后要使用 错误处理中间件 来向 客户端返回错误信息：

   ```js
   ....................  
   
     // 错误处理中间件
     app.use((err, req, res, next) => {
       // 要添加多一个状态码，要不然，前端的响应拦截器，没有获取到这个 状态码，会报错
       res.status(err.statusCode).send({
         message: err.message
       })
     })
   ```

   写在最底部；

6. 前端要根据我们返回的状态码，来决定，是否用户登录了的，比如，状态码为 401 就是用户没有登录，就重定向到 login 登录页面；在 axios 响应拦截器中设置：

   ```js
   http > axios.js
   
   import router from '../router/index';
   
   // 响应拦截
   http.interceptors.response.use(config => {
     // 正确时，执行
     return config;
   }, err => {
     // 当响应错误时，执行, 所以，在后端，返回信息时，必须携带 message 自动，这样
     // 前端，可以获取到错误的信息；
     vue.prototype.$message.error(err.response.data.message);
   
     //  401 状态码，就重定向到 login 页面；
     if (err.response.status === 401) {
       // TypeError: Cannot read property '_route' of undefined 访问不到，所以引进 router 模块
       router.push('/login');
     }
     return Promise.reject(err);
   });
   ```

   这样，在没有 token 就不能访问 后台管理页面了；



### 3. 前端设置路由守卫

![设置路由守卫](H:\javascript\Vue.js\KingGlorys\md\img\设置路由守卫.png)

因为，服务端的登录拦截 是要发起请求才会进行拦截，要是 后台管理页面 有一个不用发送请求，那 服务端的登录拦截 就没有作用了 。所以要设置 路由守卫 。

```js
http > axios.js

// 路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next();
  const tokenStr = localStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next();
});
```



## 13. 设置图片上传的 请求头

如果在每个页面上，使用 `headers` 属性获取 token 的值，有时，会获取到了，但发起请求时，没有携带在头部，使用使用别的方法 ；

```js
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
```

这样，在每个组件中，就可以怎么使用：

在装备上：

```html
 <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="uploaUrl"
          :show-file-list="false"
          :headers="getToken()"
          :on-success="handleAvatarSuccess">
          <img v-if="activityForm.icon" :src="activityForm.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <!-- 设置按钮为 原生的提交按钮 -->
        <el-button type="primary" plain native-type="submit">保存</el-button>
      </el-form-item>
```





# 4. serve 端

## 1.初始化项目

使用 `npm init -y` 初始化项目；

自定义启动命令： 

```js
  "scripts": {
    "serve": "nodemon index.js"
  },
```

就要下载 `nodemon` 模块、

还有搭建 服务端就要下载 `express`模块、

连接 mongoDB 数据库要下载  `mongoose`模块、

解决跨域问题的 `cors`模块，

处理 post 请求的 `body-parser`模块：

```npm
npm install nodemon express@next mongoose cors body-parser
```



## 2. 创建 服务器

serve > app.js 创建 主程序：创建一个服务器 。

```js
// 服务端的主程序
const express = require('express');
// 导入 处理post 请求的模块
const bodyParser = require('body-parser');

const app = express();

// 处理 post 数据
app.use(bodyParser.json());
// 解决跨域
app.use(require('cors')());

// 测试
app.get('/',(req, res) => {
    res.send('ok');
})


app.listen(3000, () => {
  console.log('http://localhost:3000');
})
```

把刚刚下载的 模块，都引入，在 命令行运行

```js
npm run serve
```

开启服务，然后到浏览器访问这个地址，看看有没有显示 ok 字样，如果有，简单的服务器搭建成功 。



## 3. 设置请求路由

serve > router

设置 admin.js 和 web.js 一个为 后端页面 ，一个为 前端页面的  父级路由，在他们下面再设置 各种的子路由，这样可以 分比较请求，

把后端页面的请求路由处理函数，放在 admin文件夹中；

把前端页面的请求路由处理函数，放在 web文件夹中；

目录结构：

```text
- router
-- admin    	// 子路由处理函数
--- index.js
-- web      	// 子路由处理函数
-- admin.js  	// 父级路由
-- web.js   	// 父级路由
```

在 admin.js 中，导出一个函数，参数为 app，创建他为一个 父级路由，之后 访问他的子路由的地址就要是这样

`/admin/xxx` 在前面都要有  `/admin` 这个地址，才能访问到他下面的子路由；

```js
admin.js:

// 处理后端管理页面的 父路由
module.exports = app => {
  const express = require('express');
  // 设置子路由
  const admin = express.Router();
  // 配置 admin 为 父路由
  app.use('/admin', admin);
  

  // 路由测试
  admin.get('/as', (req, res) => {
    res.send('ok');
  })

}
```

测试，开启服务器后，在浏览器访问 /as 这个地址，就是

```http
http://localhost:3000/admin/as
```

成功的话，应该是可以访问这个地址的 。



**上级**：就是在哪里到导入呢，在 app.js 中导入，然后传递 app.js 中的 app 给他：

```js
app.js:
const app = express();

// 引入前后端的父级路由,把 app 传递过去，就可以在 各这的文件中，设置父路由了
require('./router/admin.js')(app);
require('./router/web.js')(app);
```

所以我们才能在 admin.js 中使用 app。



**下级**：本来子路由的请求处理都是写在这个 admin.js 里面的，但这样会使文件太 复杂，所以可以创建 admin  文件夹，在里面写 子路由，然后在 admin.js 中导入，这样层次会比较分明：

接下来，我们写 后端页面 的那个表单的提交请求的路由处理函数：

router > admin > index.js

```js
module.exports = async (req, res) => {
  	res.send(req.body); // 响应 表单请求的数据
}
```

然后在 admin.js 中导入：

```js
admin.js

// 处理后端管理页面的 父路由
module.exports = app => {
  const express = require('express');
  // 设置子路由
  const admin = express.Router();
  // 配置 admin 为 父路由
  app.use('/admin', admin);
  
  // 处理 新建分类 的表单提交
  admin.post('/api/categories', require('../router/admin/index'));

}
```

这样在 `CateoryEdit.vue` 中访问 

```js
http://localhost:3000/admin/api/categories 

// 发起表单提交请求
async save () {
  const res = await this.$http.post('/categories', this.activityForm);
  console.log(res);
}
```

就可以访问到 这个子路由了；返回表单提交的数据 。

成功后，再设置 数据库部分；



## 4. 连接 数据库集合

serve > model > conent.js

用于连接数据库的文件：

```js
// 连接数据库文件
module.exports = (app) => {
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost:27017/node-vue-moba', {
    useNewUrlParser: true , useUnifiedTopology: true
  }).then(() =>  console.log('数据库连接成功'))
    .catch(err => console.log('数据库连接失败' + err));
}
```





因为我的 mongodb 之前设置了 账号，所以操作数据库时，要身份验证；但是还没有给这个数据库设置 账号 和 密码，因为我只有一个 root 用户，是对 admin 数据库的；

给 新建的数据库设置账号 和 密码：

1. 连接数据库 mongo；

   ```js
   mongo
   ```

2. 然后切换到 admin 数据库，这是个存储用户的数据库，切换到他，验证超级用户身份，才能给 `node-vue-moba` 数据库设置 账号；

   ```js
   > use admin
   switched to db admin   // 切换成功
   ```

3. 验证身份：

   ```js
   > db.auth('root','root') // 然后验证，1成功，0失败；
   1
   ```

4. 然后切换到我们创建的数据库`node-vue-moba`，创建用户：

   ```js
   use node-vue-moba
   switched to db node-vue-moba
   ```

5. 创建用户，设置账号 密码 权限

   ```js
   > db.createUser({user: 'wzry',pwd:'wzry',roles:['readWrite']})
   Successfully added user: { "user" : "wzry", "roles" : [ "readWrite" ] }
   ```

6. 再次连接，添加上账号

   ```js
   // 连接数据库文件
   module.exports = (app) => {
     const mongoose = require('mongoose');
   
     mongoose.connect('mongodb://wzry:wzry@localhost:27017/node-vue-moba', {
       useNewUrlParser: true , useUnifiedTopology: true
     }).then(() =>  console.log('数据库连接成功'))
       .catch(err => console.log('数据库连接失败' + err));
   }
   ```

![mongoDB 账号和密码](H:\javascript\Vue.js\KingGlorys\md\img\mongoDB 账号和密码.png)



## 5. 创建 Category.js 集合：

```js
// category 类别的集合
const mongoose = require("mongoose");

// 设置集合规则
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name是必填项']
  }
})

// 创建集合
const Category = mongoose.model('Category', categorySchema);

// 导出集合
module.exports = Category;

```

那里要用到这个 集合 ，就在哪里引入这个文件 。



## 6. 创建表单提交的响应值

在 接收表单提交的 router > admin > index.js

```js
module.exports = async (req, res) => {
  // 导入 Category 集合
  const Category = require('../../model/Category');

  // 向集合中添加数据
  const model = await Category.create({
    name: req.body.name
  })
  // 设置返回的 数据的格式
  res.send({
    "data": {
      model
    },
    "meta": {
      "mas": "提交成功",
      "status": 200
    }
  });
}
```

然后，管理度页面发起提交 分类的请求，提交成功，就向前端返回特定的数据；

设置返回的 数据的格式，前端就可以判断响应的状态，来作出提示用户，请求的成功 或 失败；

```js
 *res*.send({
  "data": {   // 数据
   model
  },
  "meta": {   // 响应内容
   "mas": "提交成功",
   "status": 200
  }
 });
```

返回 前端页面  CategoryEdit.vue



## 7. 添加 分类列表 的请求接口

router > admin.js

```js
  // 查询 分类列表 数据
  admin.get('/categories', require('./admin/categoryList'));
```

admin > categoryList.js

```js
module.exports = async (req, res) => {
  // d导入分类集合
  const category = require('../../model/Category');

  // 查询 分类集合 中的数据
  const data = await category.find();

  res.send({
    "data": data,
    "meta": {
      "mas": "查询成功",
      "status": 200
    }
  })
}
```



## 8. 根据id，查寻分类数据 接口

router > admin.js

```js
  // 根据 id 查询数据
  admin.get('/categories/:id', require('./admin/categoryId'));
```

admin > categoryId.js

```js
// 根据 id 查询分类数据
module.exports = async (req, res) => {
  // d导入分类集合
  const category = require('../../model/Category');

  const data = await category.findById(req.params.id);
  
  res.send({
    "data": data,
    "meta": {
      "mas": "查询成功",
      "status": 200
    }
  });
}
```



## 9. 提交修改分类 接口

router > admin.js

```js
  // 修改分类的name
  admin.put('/categories/:id', require('./admin/categoryPut'));
```

admin > categoryPut.js

```js
// 处理修改数据路由
module.exports = async (req, res) => {
  const category = require('../../model/Category');

  const data = await category.updateOne({_id: req.params.id}, {name: req.body.name});
  
  res.send({
    "data": data,
    "meta": {
      "msg": "修改成功",
      "status": 200
    }
  })
}
```



## 10. 分类 删除 接口

router > admin.js

```js
  // 删除分类操作
  admin.delete('/categories/:id', require('./admin/categoryDelete'));
```

admin > categoryDelete.js

```js
// 删除分类操作
module.exports = async (req, res) => {
  const category = require('../../model/Category');

  const data = await category.findOneAndDelete({_id: req.params.id});

  res.send({
    "data": data,
    "meta": {
      "mas": "删除成功",
      "status": 200
    }
  })
}
```





删除提示，总结 MessageBox 弹框 的使用；

```js
// 删除操作
    async remove (id) {
      // 弹出消息确认框
      const data = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        // 要接收错误，才不会报错
        return err;
      });

      if (data === 'cancel') {
        // 点击取消按钮
        return this.$message.info('已取消删除');
      }

      const { data: res } = await this.$http.delete(`/categories/${id}`);

      if (res.meta.status !== 200) {
        return this.$message.error('删除分类失败!');
      }

      this.$message.success('删除成功');
      this.fetch();
    }
  }
```

创建子分类； parent  父级分类；

parents 存储父级分类数据

fetchParents() 请求父级分类数据；

设置 分类集合，添加一个 parent 字段，属性为 id，关联自己的集合；



## 11. 通用 CRUD 接口：

因为我们的请求都是 增删改查 ，数据库操作语句，基本是一样的，你请看，我们前端请求的地址 和 后端的api地址：

```js
// 内容列表的数据
const { data: res } = await this.$http.get('/categories');

admin.get('/categories', require('./admin/categoryList'));

// 删除数据
 const { data: res } = await this.$http.delete(`/categories/${id}`);

 admin.delete('/categories/:id', require('./admin/categoryDelete'));

 // 根据 id 查询数据
  admin.get('/categories/:id', require('./admin/categoryId'));

  // 修改分类的name
  admin.put('/categories/:id', require('./admin/categoryPut'));
```

我们前端请求的  `/categories` 和 后端接口地址 `/categories` 是一样的；不同的操作，只是请求的方式不同罢了；

**所以**：我们可以把前端的请求地址，当做 参数，分类系列的发起 `categories` ,  新系列的发起 `new`请求，根据传递的参数，不同，动态的改变 后端api地址，这样的接口有很好的复用性；

**操作**：

1，改变 父路由 的请求地址，以 `/rest` 后面的参数为 参数；

```js
admin.js
 // 设置子路由, 设置父路由的参数 和 并到子路由中，子路由，就可以获取到 父路由的参数
  const admin = express.Router({
    mergeParams: true
  });

  // 配置 admin 为 父路由,设置接收参数，路径 rest/ 后面的数被当做参数，我们前端
  // 发起请求的地址我们可以获取到，后端接口 动态 的根据前端的请求地址 而改变 。
  app.use('/admin/api/rest/:resource', admin);
```

2，我们先以 分类列表 为例，他的api地址为：

```js
// 查询 分类列表 数据
  admin.get('/', require('./admin/categoryList'));
```

​	咦，为什么是 `/` 呢，因为啊，前端发起的请求改变了，改成了

```js
 const { data: res } = await this.$http.get('/rest/categories');
```

他请求的地址为： `http://localhost:3000/admin/api/rest/categories`，这个 `categories` 会被当做 参数；api地址 要是改成：

```js
// 查询 分类列表 数据
  admin.get('/categories', require('./admin/categoryList'));
```

要是地址为： `/admin/api/rest/:resource/categories` 那这个请求地址是不会被请求到；

这样在 `categoryList.js` 获取到

```js
console.log(req.params);  // => { resource: 'categories' }
```



3，在 接口处理函数 中可以得到 传递过来的参数，将其转换为 复数形式 就是 我们想要引入的 集合 的名字；

```js
categories  =>  Category 
```

使用 inflection  模块，来进行 复数的转换 和 首字母大小 操作；

```js
categoryList.js

module.exports = async (req, res) => {
  // 导入分类集合
  // const category = require('../../model/Category');
  /* 根据获取的参数，引入对应的集合，categories 转化为 复数，就是 Category，
     我们可以根据这一点，来 动态引入 集合 */
  const inflection  = require('inflection').classify(req.params.resource);
  // inflection => Category，
  const model = require(`../../model/${inflection}`);

  // 查询 分类集合 中的数据
  const data = await model.find().populate('parent');

  // console.log(req.params);

  res.send({
    "data": data,
    "meta": {
      "mas": "查询成功",
      "status": 200
    }
  })
}
```

是可以 请求到 数据的， ok，但我们要在没个 接口处理函数文件 中写 复数 的转换吗？不用，使用 中间件，来处理吧，使用中间件，拦截每个请求 `/admin/api/rest` 的，并给这个中间件中，把获取到的 参数，转换为 复数形式，并导入 对象的数据库集合，给 req 添加 model 属性，就是引入的集合，然后在每个 处理函数体 中就可以获取到 动态导入的集合了。

```js
admin.js

  app.use('/admin/api/rest/:resource', (req, res, next) => {
    const inflection  = require('inflection').classify(req.params.resource);
    req.model = require(`../model/${inflection}`);
    next();
  }, admin);
```

在 列表数据 路由处理函数体中，改一种方式：

```js
module.exports = async (req, res) => {
  // 1.导入分类集合
  // const category = require('../../model/Category');
    
  /* 2.根据获取的参数，引入对应的集合，categories 转化为 复数，就是 Category，
     我们可以根据这一点，来 动态引入 集合 */
  /* const inflection  = require('inflection').classify(req.params.resource);
     inflection => Category，
     const model = require(`../../model/${inflection}`);
     const data = await model.find().populate('parent'); */

  // 3.查询 分类集合 中的数据, 获取在 中间件 的时候，存储在 req 中的 集合模型；
  // const data = await req.model.find().populate('parent');

  // 判断，是否是查询 category 集合，如果是就，就使用 populate 关联查询
  const queryOptions = {};
  // req.model.modelName： 获取集合的名称
  if (req.model.modelName === 'Category') {
    queryOptions.populate = 'parent';
  }
  
  // 4. 接收在中间件中导入的集合 req.model  并使用他
  const data = await req.model.find().setOptions(queryOptions);


  res.send({
    "data": data,
    "meta": {
      "mas": "查询成功",
      "status": 200
    }
  })
}
```

还有一个问题，就是我们的 列表处理函数体 中使用了 关联查询，但我们并不是每个列表的查询，都要使用到 关联查询 所以 要进行判断，如果查询的是 分类列表 就使用关联查询

```js
  // 判断，是否是查询 category 集合，如果是就，就使用 populate 关联查询
  const queryOptions = {};
  // req.model.modelName： 获取集合的名称
  if (req.model.modelName === 'Category') {
    queryOptions.populate = 'parent';
  }
  const data = await req.model.find().setOptions(queryOptions);
```



## 12. 创建 Item 集合

根据 参数 转换为复数形式，后形成的名称，我们创建一个一样名字的集合：

添加 name 和 icon （图标） 2个字段；

```js
serve > model > Item.js
// 物品集合
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name是必填项']
  },
  icon: {
    type: String
  }
})

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
```



## 13. 创建接收文件上传的接口

serve > admin.js

```js
  // 上传图片路由
  app.post('/admin/api/upload', require('./admin/imgUpload'));
```

不能写成：

```js
admin.post('/', require('./admin/imgUpload'));
```

因为，因为 admin 的请求完整地址为：

```js
http://localhost:3000/admin/api/rest/:参数
```

前端，上传的地址为： `http://localhost:3000/admin/api/upload` admin 是接收不到这个地址的，所以要用 app.post 的方法，来接收；

**在 函数处理体中，我们要使用 模块，把上传的文件，存储到服务端上，然后把存储文件的 服务端地址 返回给 前端，服务端使用静态资源的挂载，把存储上传文件的文件夹开发；前端就可以使用这个地址，访问到 这个文件了。**

1, 首先，在 app.js 中挂载静态资源：

```js
// 挂载静态资源
app.use('/public',express.static(path.join(__dirname, 'public')));
```

记住，开发资源要定义个地址，如果访问以  `/public` 开头的，就可以访问这个文件夹；

2，在 express 中获取上传文件的信息：

有2个模块可以使用

1. formidable

   ```js
   router > admin > imgUpload.js
   // 处理图片上传函数体
   module.exports = (req, res) => {
     // 引入 formidable 模块，获取前端上传的文件信息
     const formidable = require('formidable');
     const path = require('path');
   
     // 创建表单解析对象
     const form = new formidable.IncomingForm();
     // 上传图片存储的地址
     form.uploadDir = path.join(__dirname, '../', '../', 'public');
     // 保存扩展名
     form.keepExtensions = true;
     // 获取上传文件的信息
     form.parse(req, (err, fields, files) => {
       // 执行到这步，就说明 图片上传到了服务端，但还没有存储到数据库里
       // 获取 图片的地址，然后拼接上 完整的请求路径
       const num = files.file.path.indexOf('public');
       let url = files.file.path.substr(num - 1);
       url = 'http://localhost:3000' + url;
       res.send(url);
     })
   }
   ```

   

2. multer

   ![文件上传](H:\javascript\Vue.js\KingGlorys\md\img\文件上传.png)

   

   ```js
   const multer = require('nulter');
   // 文件的存储地址
   const upload = multer(path.join(__dirname, '../', '../', 'public'));
   .... 不清楚
   ```

这样，后台的 文件上传 操作，就差不多完成了。





## 14. 创建英雄集合

如下显示，因为一个字段要是想要有多个值，外层要用 数组包裹：

```js
// 英雄集合
const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name是必填项']
  },
  // 头像
  avatar: { type: String },
  // 称号
  title: { type: String },
  // 职位, 多个职位，使用数组包裹对象，就可以添加多个 关联职位
  categories: [{type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  // 评分
  scores: {
    difficult: { type: Number },  // 难度
    skills: { type: Number },     // 技能
    attack: { type: Number },     // 攻击
    survive: { type: Number }     // 生存
  },
  // 技能,有多个技能，所以使用数组括对象
  skills: [{
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String }
  }],
  // 顺风出装,应有多个装备，所以用...
  item1: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
  // 逆风出装
  item2: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item'}],
  // 使用技巧
  usageTips: { type: String },
  // 对抗技巧
  battleTips: { type: String },
  // 团战思路
  teamTips: { type: String },
  // 搭档英雄
  partners: [{
    hero: { type: mongoose.Schema.Types.ObjectId, ref: 'Hero' },
    description: { type: String }
  }]
})

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero
```



## 15. 创建文章集合

```js
// 文章集合
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  // 文章标题
  title: { type: String },
  // 文章类别
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
  // 文章内容
  body: { type: String }
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
```



## 16. 创建广告位集合

```js
// 广告位集合
const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  name: { type: String },
  items: [{
    image: { type: String },
    url: { type: String }
  }]
})

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad
```





## 17. 新建管理员集合

使用到了加密操作：

```js
// 管理员集合
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const adminUserSchema = new mongoose.Schema({
  username: { type: String },
  password: { 
    type: String,
    select: false, // 数据库操作时，都不会操作到他，比如查取 和 修改 都不会修改到他；
    // 因为在编辑管理员账号时，查取的是 加密的密码，然后点击保存按钮，会把 加密密码进行再次加密，
    // 就不是我们原来的密码了。所以使用 false 来不然他查出来 。
    set (val) {
      // val 用户提交的数据
      return bcrypt.hashSync(val, 10);
    }
  }
})

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

module.exports = AdminUser;
```



## 18. 登录接口

router > admin.js

添加处理登录操作的接口；

```js
// 登录路由
app.post('/admin/api/login', require('./admin/login'));
```

router > admin > login.js

向数据库查询用户是否存在，不存在向前端返回错误信息和状态码；

```js
module.exports = async (req, res) => {
  // 导入 管理员集合
  const AdminUser = require('../../model/AdminUser');
  const { username, password } = req.body;

  // 根据用户名找用户
  // 因为在管理员集合中 password 字段使用了 select：false，所以是查取不到他的，所以可以
  // 在 查询语句的末尾添加 select('+password');
  const user = await AdminUser.findOne({username}).select('+password');

  if (!user) {
    // 如果没有就为 null
    return res.status(422).send({
      message: '用户不存在'
    })
  }

  // 2. 校验密码, 返回一个 布尔值
  const isValid = require('bcryptjs').compareSync(password, user.password);
  if (!isValid) {
    // 密码不一致, 422 登录失败，使用 422状态码；
    return res.status(422).send({
      message: '密码错误'
    })
  }

  // 3. 返回 token
  const jwt = require('jsonwebtoken');
  const token = jwt.sign({id: user._id}, require('../../key.js'));
  res.send({
    token,
    name: user.username
  })
}


```





401 用户的



**创建数据库账号 wzry**

**密码也一样。

# 错误：

 `this.$set()`

## 1. 没有分清楚数据源

```html
<el-select v-model="activityForm.parent" placeholder="nihao">
  <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id">
  </el-option>
</el-select>

v-model 和 v-for 循环的数据源是不一样的，笨蛋。
```





## 2. mongoose 的 ObjectId 类型：

分类集合是这样定义的：

```js
// 设置集合规则
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name是必填项']
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
})
```

向集合中添加数据：

```js
req.body: { name: 'img' } 

const model = await Category.create(req.body);
```

这样是可以的，

但改成这样就不可以了， 是为什么：

```js
req.body: { name: '辅助', parent: '' }

const model = await Category.create(req.body);

报： ValidationError: Category validation failed: parent: Cast to ObjectId failed for value '' at path
"parent"
```

回答：

- 如果要想不传入 `ObjectId`  类型的字段，想设置为 空，不能传入 `''` , 这样他会把他 当做 字符串，就会把字符串 转为 `ObjectId` 类型的，不能转换会报错，

- 所以，当你想不传入 `ObjectId` 类型的字段，就不写传入字段，就不会报错；

  ```js
  就像这样： req.body: { name: 'img' }
  而不是这样： req.body: { name: '辅助', parent: '' }
  ```

总结：

**你的 `parent` 没有设置必须的，所以可以不用传递值，但他是 `ObjectId`   类型的，不能传入其他类型的，这个要注意；**

那前端，想要有这个参数时，想发送；没有这个参数时，就不发送；要怎么样实现呢？

在表格绑定的数据源中，不用添加 2级属性，例如

```html
<el-form-item label="上级分类">
    <el-select v-model="activityForm.parent" placeholder="请选择" clearable>
      <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id">
      </el-option>
    </el-select>
</el-form-item>
```

activityForm.parent, 这个值，没有写在 data 的 activityForm 中，因为，这个值，有的时候，会添加到 activityForm 中，没有时，就没有添加到 activityForm 中，防止，mongoodb 的 `ObjectId`  类型报错；

在 data 中：

```js
 data () {
    return {
      // 绑定表单数据
      activityForm: {
        name: ''
      },
    }
 }
```



3.在别的文件中，然后获取 父文件中的 app

是这样的：

app.js

```js
// 服务端的主程序
const express = require('express');

const app = express();

app.set('secret', require('./key.js')); // 这个

// 导入 admin.js, 并传递 app 给他
require('./router/admin.js')(app);

app.listen(3000, () => {
  console.log('http://localhost:3000');
})
```



router > admin.js

```js
module.exports = app => {

 // 可以获取到
 console.log(app.get('secret'));
    
 // 登录路由
 app.post('/admin/api/login', require('./admin/login'));
}
```

在 login 文件中，想要获取到 现在这个页面的 app，要什么获取呢？

router > admin > login.js

```js
module.exports = (req, res) => {
 // 可以获取到
 console.log(app.get('secret'));  // 没有这个 app
}
```

