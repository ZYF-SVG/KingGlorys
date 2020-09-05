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





# 4. web 端

## 1. 工具样式 和 sass

定义一些同样的类名，

下载 sass 解析包，scss 在 main.js 里引入文件



## 2. 样式重置

style.scss

```scss
* {
    box-sizing: border-box;
    outline: none; //高亮
}

html {
    font-size: 13px; 
    // 页面最多的大小；
}

body {
    margin: 0;
    font-famil: Arial, Helveitca, sans-swif;
    line-height: 1.2em;
    background: #f1f1f1;
}
a {
    color: #999;
}
```





## 3. 网站色彩 和 字体定义

整体方面的；

定义变量

``` {
$colors: (
	"primary": 橘黄色; // 主要颜色
    "white": #fff,
    "Light": #f9f9f9,
    "grey": #999,
    "dark-1": #333,
    "dark": #222,
    "black": #000,
);
// 循环生成 字体和背景颜色
@each $colorkey, $color in $colors {
    .text-#{$colorkey} {
        color: $color;
    }
    .bg-#{$colorkey} {
        background-color: $color;
    }
}


// text
// 文字的对齐方式,循环配置
@each $var in (left, conter, right) {
    .text-#{$var} {
        text-align: $val;
    }
}

// fon size
// 基础的字体大小, 转换为 rem
$base-font-size: 13px; 
$font-size: (
    xs: 10px,
    sm: 12px,
    md: 13px,
    lg: 14px;
    xl: 16px;
);
@each $sizekye, $size in $font-size {
    .fs-#{$sizekey} {
        font-size: $size * $base-font-size;
    }
}

// flex
.d-flex {
    display: flex;
}
.flex-column {
    flex-direction: column,
}
$flex-jc: (
	start: flex-start,
    emd: flex-end,
    center: center,
    between: space-between,
    aroud: spce-around,
);
@each $key, $value in $flex-jc {
  .jc-#{$key} {
    justify-content: $value;
  }
}
    
$flex-ai: (
	start: flex-start,
    emd: flex-end,
    center: center,
    stretch: stretch,
);
$each $key, $value $flex-ai {
    .ai-#{$key} {
        align-items: $value;
        }   
    }
.flex-1 {
    flex: 1;
}
.flex-grow-1 {
	flex-grow: 1;
}

// 外边距的设置
有全部方向的
有左右方向的
有上下方向的
他们各自有各自的大小
0-5 
.mt-1 => margin top 1级
$spacing-types: (m: margin, p: padding);
$spacing-directions:(
	t: top,
	r: right,
	b: bottom,
	l: left,
);
$spacing-base-size: 1rem;
$spacing-sizes: (
	0: 0,
	1: 0.25,
	2: 0.5,
	3: 1,
	4: 1.5,
	5. 3
)
```



## 4. Main.vue 

导航条 和 上部分的下载提示部分，下面部分为 3个组件，首页，攻略中心，赛事中心 。

### 1. 下载提示：

```html
<!-- 顶部下载 -->
<div class="bg-black d-flex py-1 px-2">
  <!-- logo -->
  <img class="logo" src="../../assets/logo.png" alt="">
  <div class="logo_title mx-1 text-white fs-sm flex-1">
    <p>王者荣耀</p>
    <p class="fs-xs text-grey-1">团队成就更多</p>
  </div>
  <button type="button" class="btn bg-primary fs-xs">立即下载</button>
</div>
```





### 2. 导航条：

```html
我自己的结构：
<!-- 导航栏 -->
<div class="bg-primary" style="height: 1.111111rem;">
  <ul class="d-flex jc-around ai-center text-white">
    <li class="active">首页</li>
    <li>攻略中心</li>
    <li>赛事中心</li>
  </ul>
</div>

老师的：
 <!-- 导航栏 -->
<div class="bg-primary py-1">
  <div class="nav text-white d-flex jc-around">
    <div class="nev-item active">
      <router-link class="nav-link" tag="div" to="/">首页</router-link>
    </div>
    <div class="nev-item">
      <router-link class="nav-link" tag="div" to="/hone">攻略中心</router-link>
    </div>
    <div class="nev-item">
      <router-link class="nav-link" tag="div" to="/dsdf">赛事中心</router-link>
    </div>
  </div>
</div>
```



## 5. Home.vue

### 1. 轮播图

轮播图我使用的是  **[ vue-swiper](https://github.com/zwhGithub/vue-swiper)** 

代码为：

```html
<!-- 轮播图 -->
    <Swiper :autoPlay='false'>
       <Slide>
         <img class="w-100" src="../../assets/images/6db1bc82007c5dacf854419fea538d3a.jpeg" alt="">
       </Slide>
       <Slide>
         <img class="w-100" src="../../assets/images/6db1bc82007c5dacf854419fea538d3a.jpeg" alt="">
       </Slide>
       <Slide>
         <img class="w-100" src="../../assets/images/6db1bc82007c5dacf854419fea538d3a.jpeg" alt="">
       </Slide>
    </Swiper>
```



### 2. 列表

```html
new-icons
```



icon-font



## 6. 封装简单的 卡片 组件

封装卡片组件，只传递 icon 和 每个卡片 的标题；

1，创建组件：

components > public > Card.vue

```html
<!-- 卡片组件 -->
<template>
  <div>
    <div class="card mt-2 p-2 bg-white">
      <div class="card-head d-flex pb-2">
        <!-- 标题图标 -->
        <i class="font_family mr-1" :class="`${icon}`" ></i>
        <!-- 标题 -->
        <span class="fs-xl flex-1">{{title}}</span>
        <i class="font_family icon-caidan"></i>
      </div>
      <div class="card-body mt-1">
        <!-- 插槽，在引用组件标签中写内容时，会显示在组件中 -->
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 接收父组件传递过来的数据的
  // props: ['title', 'icon'],
  // 也可以怎么写,他可以定义接收数据的类型 和 必填的
  props: {
    title: { type: String, required: true },
    icon: { type: String, required: true }
  }
}
</script>

<style lang="scss">
   // 卡片
  .card {
    border-top: solid .027778rem #D4D9DE;
    border-bottom: solid .027778rem #D4D9DE;
    .card-head {
      border-bottom: solid .027778rem #D4D9DE;
    }
  }
</style>

```

2，全局引用：

main.js：

```js
// 导入 card 组件
import Card from './components/public/Card.vue'
Vue.component('m-card', Card)
```



3，使用：

```html
<!-- 封装的组件 -->
<m-card title="英雄列表" icon="icon-Artifact-yingxiong">
  123
</m-card>
```

![封装简单的card组件](H:\javascript\Vue.js\KingGlorys\md\img\封装简单的card组件.png)





## 7. 封装包括内容数据的 卡片 组件

在之前要获取 数据，然后存储到数据库，在获取数据；

ListCard.vue

我们把数据传递到组件中，组件利用循环，把每一个数据循环出来，在 slot 中，利用作用域插槽 把循环后的每行数据，返回到 调用组件的 父组件 中；这样我们就可以操作 循环后的每行数据了。

```html
<!-- 封装包括数据的卡片组件 -->
<template>
  <div class="listCard-content card mt-2 p-2 bg-white">
    <div class="card-head d-flex pb-2">
      <!-- 标题图标 -->
      <i class="font_family mr-1" :class="`${icon}`" ></i>
      <!-- 标题 -->
      <span class="fs-xl flex-1">{{title}}</span>
      <i class="font_family icon-caidan"></i>
    </div>
    <div class="card-body mt-1">
      <!-- 导航文字 -->
      <div class="nav jc-between">
        <div class="nav-item" ref="actives" v-for="(item, i) in categories" :key="i" :class="i == index ? 'active' : ''"
        @click="index = i">
          <div class="nav-link" @click="activeInfo(i)">{{item.name}}</div>
        </div>
      </div>
      <!-- 轮播列表 -->
      <div class="nav-list">
        <Swiper :autoPlay="false" :showIndicator="false" v-if="categories.length > 0" ref="swiper" @transtionend="activeIs">
          <!-- 循环出和导航一样多的轮播图标签 -->
          <Slide v-for="(item, i) in categories" :key="i">
<!-- 里面的数据的展示模式，不是组件定死的，是可以自定义的，但用 slot 标签又不行，因为 slot 标签只是让父组件的数据，可以展示在组件里，但拿不到，子组件里的数据，我们要的是 父组件传递数据给组件，然后组件把数据渲染成列表的那个导航，然后把里面的数据提供给父组件，这样父组件，就可以自己想用什么格式展示数据，都可以，使用 作用域插槽，作用域插槽的作用就是让父组件可以获取到子组件中的数据。 -->
              <slot name="categories" :category="item"></slot>
          </Slide>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script>
// 引入轮播图组件
import { Swiper, Slide } from 'vue-swiper-component'
export default {
  components: {
    Swiper,
    Slide
  },
  // 传递到 卡片组件的数据
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true }
  },
  data () {
    return {
      index: 0
    }
  },
  methods: {
    // 点击新闻资讯导航，滑动内容列表
    activeInfo (index) {
      this.$refs.swiper.slideTo(index)
    },
    // 滑动列表，触发事件
    activeIs (data) {
      this.index = data
    }
  }
}
</script>
```



在 home.vue 中的使用：

```html
<!-- 新闻资讯 -->
<!-- 卡片组件,传递title，icons，categories 的数据； -->
<m-list-card title="新闻资讯" icon="icon-xinwen" :categories="newCats">
  <!-- 具名插槽 和 作用域插槽的使用 -->
  <template v-slot:categories="{category}">
    <div class="list d-flex ai-center" v-for="(item, i) in category.newsList" :key="i">
      <span class="mr-1 orange-border">{{item.categoryName}}</span>
      <span class="flex-1 ellipsis">{{item.title}}</span>
      <span class="ml-1 text-grey">{{item.updatedAt | date}}</span>
    </div>
  </template>
</m-list-card>
```



## 8. 英雄列表

### 1. 获取英雄数据

```js
$$('.hero-nav a').map(v => { return v.innerText })  英雄文字

let data1 = { name: $$('.hero-list a h3').map(v => { return v.innerHTML }) }  英雄名字


let a = {
    name: '路边',
    img: 'xxxx'
}
"<a href="//pvp.qq.com/web201605/herodetail/m/167.html" onclick="PTTSendClick('hero','hot_details','热门详情');"><img src="//game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" width="91px" alt="孙悟空"><h3>孙悟空</h3></a>"


"[{"categories":"热门","children":[{"name":"鲁班七号","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"]},{"name":"孙悟空","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"]},{"name":"后羿","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"]},{"name":"韩信","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"]},{"name":"铠","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"]},{"name":"妲己","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"]},{"name":"亚瑟","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"]},{"name":"百里守约","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"]},{"name":"小乔","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"]},{"name":"安琪拉","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"]}]},{"categories":"战士","children":[{"name":"赵云","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"]},{"name":"墨子","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"]},{"name":"钟无艳","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"]},{"name":"吕布","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"]},{"name":"夏侯惇","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"]},{"name":"曹操","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg"]},{"name":"典韦","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg"]},{"name":"宫本武藏","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg"]},{"name":"达摩","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"]},{"name":"老夫子","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg"]},{"name":"关羽","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg"]},{"name":"程咬金","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"]},{"name":"露娜","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"]},{"name":"花木兰","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"]},{"name":"橘右京","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"]},{"name":"亚瑟","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"]},{"name":"孙悟空","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"]},{"name":"刘备","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg"]},{"name":"钟馗","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"]},{"name":"杨戬","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg"]},{"name":"雅典娜","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg"]},{"name":"哪吒","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg"]},{"name":"铠","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"]},{"name":"苏烈","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"]},{"name":"裴擒虎","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"]},{"name":"狂铁","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg"]},{"name":"孙策","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"]},{"name":"李信","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg"]},{"name":"盘古","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg"]},{"name":"云中君","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"]},{"name":"曜","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/522/522.jpg"]},{"name":"马超","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"]},{"name":"蒙恬","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/527/527.jpg"]}]},{"categories":"法师","children":[{"name":"小乔","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg"]},{"name":"墨子","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg"]},{"name":"妲己","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg"]},{"name":"嬴政","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg"]},{"name":"高渐离","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg"]},{"name":"孙膑","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"]},{"name":"扁鹊","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg"]},{"name":"芈月","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"]},{"name":"周瑜","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg"]},{"name":"甄姬","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg"]},{"name":"武则天","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg"]},{"name":"貂蝉","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"]},{"name":"安琪拉","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg"]},{"name":"露娜","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg"]},{"name":"姜子牙","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"]},{"name":"王昭君","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg"]},{"name":"张良","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg"]},{"name":"不知火舞","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"]},{"name":"钟馗","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg"]},{"name":"诸葛亮","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg"]},{"name":"干将莫邪","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg"]},{"name":"女娲","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg"]},{"name":"杨玉环","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"]},{"name":"弈星","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg"]},{"name":"米莱狄","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg"]},{"name":"司马懿","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"]},{"name":"沈梦溪","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg"]},{"name":"上官婉儿","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"]},{"name":"嫦娥","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"]},{"name":"西施","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/523/523.jpg"]}]},{"categories":"坦克","children":[{"name":"廉颇","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg"]},{"name":"庄周","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"]},{"name":"刘禅","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"]},{"name":"钟无艳","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg"]},{"name":"白起","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg"]},{"name":"芈月","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg"]},{"name":"吕布","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg"]},{"name":"夏侯惇","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg"]},{"name":"达摩","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg"]},{"name":"项羽","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg"]},{"name":"程咬金","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg"]},{"name":"刘邦","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg"]},{"name":"亚瑟","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg"]},{"name":"牛魔","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"]},{"name":"张飞","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"]},{"name":"太乙真人","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"]},{"name":"东皇太一","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg"]},{"name":"铠","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg"]},{"name":"苏烈","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg"]},{"name":"梦奇","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg"]},{"name":"孙策","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg"]},{"name":"嫦娥","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg"]},{"name":"猪八戒","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg"]},{"name":"阿古朵","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/533/533.jpg"]}]},{"categories":"刺客","children":[{"name":"赵云","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg"]},{"name":"阿轲","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg"]},{"name":"李白","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg"]},{"name":"貂蝉","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg"]},{"name":"韩信","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg"]},{"name":"兰陵王","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg"]},{"name":"花木兰","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg"]},{"name":"不知火舞","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg"]},{"name":"娜可露露","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg"]},{"name":"橘右京","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg"]},{"name":"孙悟空","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg"]},{"name":"百里守约","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"]},{"name":"百里玄策","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg"]},{"name":"裴擒虎","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg"]},{"name":"元歌","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg"]},{"name":"司马懿","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg"]},{"name":"上官婉儿","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg"]},{"name":"云中君","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg"]},{"name":"马超","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/518/518.jpg"]},{"name":"镜","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/531/531.jpg"]}]},{"categories":"射手","children":[{"name":"孙尚香","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg"]},{"name":"鲁班七号","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg"]},{"name":"马可波罗","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg"]},{"name":"狄仁杰","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg"]},{"name":"后羿","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg"]},{"name":"李元芳","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg"]},{"name":"虞姬","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg"]},{"name":"成吉思汗","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg"]},{"name":"黄忠","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg"]},{"name":"百里守约","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg"]},{"name":"公孙离","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg"]},{"name":"伽罗","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg"]},{"name":"蒙犽","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/524/524.jpg"]}]},{"categories":"辅助","children":[{"name":"庄周","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg"]},{"name":"刘禅","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg"]},{"name":"孙膑","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg"]},{"name":"姜子牙","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg"]},{"name":"牛魔","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg"]},{"name":"张飞","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg"]},{"name":"蔡文姬","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg"]},{"name":"太乙真人","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg"]},{"name":"大乔","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg"]},{"name":"鬼谷子","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg"]},{"name":"明世隐","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg"]},{"name":"杨玉环","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg"]},{"name":"盾山","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg"]},{"name":"瑶","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg"]},{"name":"鲁班大师","avatar":["https://game.gtimg.cn/images/yxzj/img201606/heroimg/525/525.jpg"]}]}]"
```



## 9. 新闻资讯详情页面

在页底下的相关连接，给他设置了 `router-link` 到相应的页面上，但点击后，没有进行页面的跳转（数据刷新），是因为他和 现在正在浏览的 新闻详情 使用了同一个 组件，所以就不会进行跳转了，只是改变了 浏览器的地址栏中的 id：

![不会重新加载组件内容](H:\javascript\Vue.js\KingGlorys\md\img\不会重新加载组件内容.png)

所以，要在 组件中，监听传递过来的 id 的变化，使用 watch 监听属性，来监听



http://localhost:3000/public/upload_8dacbbd82bc94cf3eb8c1e45c6bc97df.jpg

http://localhost:3000\public\upload_8dacbbd82bc94cf3eb8c1e45c6bc97df.jpg



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



## 19. 一次性录入文章数据

1，在官网页面，分别浏览5个分类的数据，然后在浏览器控制台获取每个列的 innerHTML 文字；

![选中文字](H:\javascript\Vue.js\KingGlorys\md\img\选中文字.png)

可以看到这里的列表在 ul 他的类名为 `news_list 他下面的 title 就是我们想要的文字了，所以就可以这样获取到：

```js
$$('.news_list .title')
```

就可以获取到新闻资讯的每一列的文字了，但前面的 5 行数据是随机获取的，所以我们要跳过前面5条数据：

```js
$$('.news_list .title').slice(5)
```

然后，利用 map 把数据进行映射，获取每一项的 innerHTML：

```js
$$('.news_list .title').slice(5).map(v => { return v.innerHTML})
```

![获取文字](H:\javascript\Vue.js\KingGlorys\md\img\获取文字.png)



2，在 web 路由中，向文章插入数据，标题就是我们获取到的这些数据；

serve > router > web.js

```js
// 处理前端数据的 父路由
module.exports = (app) => {
  const express = require('express');
  // 导入文章 和 分类 集合
  const Article = require('../model/Article');
  const Category = require('../model/Category');

  // 设置子路由
  const web = express.Router();
  // 设置 前端页面的 父路由
  app.use('/web', web);

  // 设置 /web/list 接口  
  web.get('/list', async (req, res) => {
    // 找出新闻资讯类
    const parent = await Category.find({
      name: '新闻资讯'
    })
    /**[ { _id: 5f1ee8f5546e42061047581e, name: '新闻资讯', __v: 0 } ] */
    // 查询出 和 新闻资讯 进行关联的数据
    const data = await Category.find().where({
      parent: parent
    });
    const dataList = ["英雄调整情报丨杨戬/苏烈加强，阿古朵降温，蔡文姬优化", "主播入驻游戏圈，发帖赢大奖！", "《王者荣耀》品牌代言人首登场，欢迎真爱玩家加入战场", "“缘起峡谷，情定七夕”——《王者荣耀》七夕告白季，邀你来峡谷，表达爱！", "叮！你的潇潇子已抵达王者营地", "8月18日神秘商店维护完成公告", "8月18日服务器维护公告", "8月18日神秘商店维护公告", "英雄平衡性公告丨杨戬加强，阿古朵降温，蔡文姬优化", "8月18日全服不停机更新公告", "恭喜TS夺得世冠总冠军，回馈福利来袭，典韦-蓝屏警告星元上新", "【看世冠对决 赢豪华大礼】活动公告", "应援世冠得好礼，墨子两款皮肤重塑完成即将登场", "夏日盛典开启，新英雄阿古朵登场！送皮肤、抽内测惊喜好礼享不停", "【三分探险】活动开启公告", "2020年王者荣耀世界冠军杯总决赛门票8月10日正式开售", "8月7日【比赛服】版本更新公告", "7月29日【比赛服】版本更新公告", "7月13日【比赛服】版本更新公告", "2020年王者荣耀世界冠军杯小组赛赛程出炉"];
    const newList = dataList.map(item => {
      // 随机选取，把获取到的和新闻资讯管理的数据，进行随机的排序，然后选取前2个值；
      const randmCats = data.slice(0).sort((a, b) => Math.random() - 0.5);
      return {
        categories: randmCats.slice(0, 2),
        title: item
      };
    })
    // 删除文章的所有数据
    await Article.deleteMany({});
    // 插入数据
    await Article.insertMany(newList);
    res.send(newList);
  })
}

```

获取到的和 新闻资讯 管理的数据；（where）

![和新闻资讯关联的数据](H:\javascript\Vue.js\KingGlorys\md\img\和新闻资讯关联的数据.png)

## 20. 查询新闻资讯数据

录进数据后，就可以发起请求了，获取和我们在 `Home.vue` 中定义的数据一样的数据格式：

1，创建 新闻资讯 接口：

serve > router > web.js

```js
// 处理前端数据的 父路由
module.exports = (app) => {
  const express = require('express');

  // 设置子路由
  const web = express.Router();
  // 设置 前端页面的 父路由
  app.use('/web', web);

  // 新闻资讯列表数据
  web.get('/news/list', require('./web/newsList'));
}
```

2， 创建 newsList.js 文件，组成返回数据 和 我们的模拟数据一样的数据格式：

```js
我们模式的数据：
newCats: [
    {
      name: '热门',
      newList: new Array(5).fill({}).map(item => ({
        categoryName: '公告',
        title: '游戏家中国行·王者零距离”活动重启说明',
        date: '08/17'
      }))
    },
]
```

接口处理函数体：

```js
// 新闻资讯接口
module.exports = async (req, res) => {

}
```

方法一： 使用 分类集合 使用 子分类：

serve > model > Category.js

```js
// category 类别的集合
const mongoose = require("mongoose");

// 设置集合规则
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name是必填项']
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  icon: {
    type: String
  }
})

// 子分类, 和 本身进行关联
categorySchema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})

// 子分类，和 文章进行关联
categorySchema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})

// 创建集合
const Category = mongoose.model('Category', categorySchema);

// 导出集合
module.exports = Category;

```



 然后，在 newsList.js 中，才可以使用他来连续查询数据：

```js
// 新闻资讯接口
module.exports = async (req, res) => {
  const Article = require('../..//model/Article');
  const Category = require('../../model/Category');
    
  const newData = await Category.find({name: '新闻资讯'}).populate({
      path: children,
      populate: ({
          path: newsList
      })
  }).lean()
}
```

查询出来的数据为：

<img src="H:\javascript\Vue.js\KingGlorys\md\img\集合的字分类，关联，连续查询.png" alt="集合的字分类，关联，连续查询" style="zoom: 200%;" />



方法二： 使用 mongoodb 的聚合，来处理，他可以做到同样的功能，性能也比较好：

1，不需要在 `Category.js` 集合中书写子分类了。

2，在 newsList.js 中使用 聚合查询出数据：

1. 查询出 顶级的分类，新闻资讯：

   ```js
   const parent = await Category.findOne({name: '新闻资讯'});
   ```

2. 使用聚合，首先过滤掉其他的 分类，剩属于 新闻资讯 关联的分类了：：

   ```js
   const newData = await Category.aggregate([
       { $match: { parent: parent} },
   ])
   
   res.send(newsData);
   ```

   ![聚合管道 $lookup](H:\javascript\Vue.js\KingGlorys\md\img\聚合管道 $lookup.png)

3. 进行数据的关联查询：

   ```js
   const newData = await Category.aggregate([
       { $match: { parent: parent} },
       { 
          $lookup: {
             from: 'article',
             localField: '_id',
             foreighField: 'categories',
             as: 'newsList'
          }
       },
       { 
         $addFields: {
           newsList: { $slice: ['$newsList', 5] }  // 限制查询的数据
         }
       }
   ])
   
   res.send(newsData);	
   ```

   ![查询](H:\javascript\Vue.js\KingGlorys\md\img\查询.png)

还是可以实现和 之前一样的效果的。



4，给数据添加一个 热门数据，通过 map方法添加，先获取个分类的 id，然后，根据这几个 id ，去文章集合中查询数据，限制5个；

```js
  // 在数据中，添加一个热门
  const listId = newsData.map(v => v._id);
  newsData.unshift({
    name: '热门',
    newsList: await Article.find().where({
      categories: { $in: listId }
    }).populate('categories').limit(5).lean()
  })
```



5，给每个分类的 newsList 添加 `categoryName` 属性，为当前分类的name，但 热门 除外，因为热门里的数据，都是在 不同的 分类中获取的。

使用 2 层 map 来修改。



```js
// 添加 categories 类别，在热门下，显示 categories 的第一个 分类 ；在 公共下，显示公告等等
newsData.map(v => {
    v.newsList.map(val => {
      val.categoryName = (v.name == '热门') ? val.categories[0].name : v.name; 
    })
})
```







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



## 3. 改变 vue/lic 项目端口号：

修改使用 vue/lic 搭建项目打开项目时，所开启的端口号：

因为 vue/lic 是和 webpack 一起搭配使用的，所以一些配置和 webpack 是一样的；

修改端口号：

项目更目录 > package.json

```js
  "scripts": {
    "serve": "vue-cli-service serve --port 8181",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  }
```

直接写在快捷运行命令后；



## 4. 在浏览器F12 中，获取页面的元素

使用 `$$('选择器')` 他就像 `document.querySelector('')`一样；

```js
$$('p'); // 选中页面上所有的 p 标签；
```



## 5. 背景图片的路径问题

在发起请求后，获取到 背景图片的路径：

![banner路径](H:\javascript\Vue.js\KingGlorys\md\img\banner路径.png)

 然后在 html 中，使用行内式，书写背景图片：

```html
<!-- 图片展示 -->
<div class="banner" :style="{'backgroundImage':`url(require(${model.banner}))`}">
</div>
```

在浏览器中，查看元素的路径是这样的：

![错误的路径](H:\javascript\Vue.js\KingGlorys\md\img\错误的路径.png)

为什么，路径中没有斜杠了呢 ？





# 记：



2. npm install require-all 把某个文件夹下的所有文件都进入；



