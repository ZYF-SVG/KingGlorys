<template>
  <div class="main_content">
    <!-- 布局容器 -->
    <el-container style="height: 100vh; border: 1px solid #eee">
      <!-- 左侧 -->
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']" :router="true">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>内容管理</template>
              <!-- 分类 -->
              <el-menu-item-group>
                <template slot="title">分类</template>
                <el-menu-item index="/categories/create">新建分类</el-menu-item>
                <el-menu-item index="/categories/list">分类列表</el-menu-item>
              </el-menu-item-group>
              <!-- 物品 -->
              <el-menu-item-group>
                <template slot="title">物品</template>
                <el-menu-item index="/item/create">新建物品</el-menu-item>
                <el-menu-item index="/item/list">物品列表</el-menu-item>
              </el-menu-item-group>
              <!-- 英雄 -->
              <el-menu-item-group>
                <template slot="title">英雄</template>
                <el-menu-item index="/hero/create">新建英雄</el-menu-item>
                <el-menu-item index="/hero/list">英雄列表</el-menu-item>
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

        <!-- 内容部分，子路由显示区 -->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="less">
  // 右边灰框的高度
  .el-header {
    line-height: 60px;
  }
  .el-menu {
    min-height: 60px;
  }
</style>
