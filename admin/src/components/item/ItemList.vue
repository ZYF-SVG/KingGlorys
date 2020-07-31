<!-- 分类列表 -->
<template>
  <div class="list_content">
    <h1>分类列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="250"></el-table-column>
      <el-table-column prop="name" label="物品名称"></el-table-column>
      <el-table-column prop="icon" label="图标">
        <template slot-scope="scope">
          <img :src="scope.row.icon || noiocn " alt="未上传图标" style="width: 4rem; height: 4rem;">
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <!-- scope.row 为当前每列的数据 -->
          <el-button type="text" size="small" @click="edit(scope.row._id)">编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row._id, scope.row.name)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [],
      // 没有上传图标时，显示的图片
      noiocn: 'http://localhost:3000/public/%E4%B8%8A%E4%BC%A0%E5%9B%BE%E6%A0%87.png'
    };
  },
  created () {
    this.fetch();
  },
  methods: {
    // 发起查询分类的数据请求
    async fetch () {
      const { data: res } = await this.$http.get('rest/item');

      if (res.meta.status !== 200) {
        return this.$message.error('查询数据失败');
      }

      this.items = res.data;
    },
    // 点击编辑触,进行路由的跳转
    edit (id) {
      // 跳转到编辑页面，进行路由的跳转，携带当前列的id过去，跳转的页面和添加页面一样；
      this.$router.push(`/item/edit/${id}`);
    },
    // 删除操作
    async remove (id, name) {
      // 弹出消息确认框
      const data = await this.$confirm(`是否要删除分类 ${name}, 是否继续?`, '提示', {
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

      const { data: res } = await this.$http.delete(`rest/item/${id}`);

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
