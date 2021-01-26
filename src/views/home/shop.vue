<template>
  <div>
    <el-button type="primary" class="add" @click="add">添加商品</el-button>
    <el-form :inline="true" :model="search" class="demo-form-inline">
      <el-form-item label="">
        <el-select v-model="search.status" placeholder="请输入查询规格">
          <el-option label="按商品id查询" :value="0"></el-option>
          <el-option label="按商品名称查询" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="search.name" placeholder="关键词"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list.list" border stripe style="width: 100%">
      <el-table-column prop="id" label="id" width="100"> </el-table-column>
      <el-table-column label="信息">
        <template slot-scope="scope">
          {{ scope.row.name }}<br />{{ scope.row.subtitle }}
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" width="100"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          {{ scope.row.status == 1 ? "在售" : "已下架" }}
          <el-button type="warning" size="mini" @click="setSelect(scope.row)">{{
            scope.row.status == 2 ? "上架" : "下架"
          }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detail(scope.row.id)"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="set(scope.row.id)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      background
      :total="list.total"
      style="margin-top: 20px"
      :current-page="page"
      @current-change="pageNum"
      :hide-on-single-page="true"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  data() {
    return {
      search: {
        name: "",
        status: 0,
      },
      list: [],
      page: 1,
    };
  },
  mounted() {
    this.$API.shopList(this.page).then((res) => {
      // console.log(res);
      this.list = res.data;
    });
  },
  methods: {
    // 查询
    onSubmit() {
      if (this.search.status == 0) {
        this.$API.setSearch(this.search.name).then((res) => {
          // console.log(res);
          this.list = res.data;
        });
      } else {
        this.$API.getSearch(this.search.name).then((res) => {
          // console.log(res);
          this.list = res.data;
        });
      }
    },
    // 页数
    pageNum(val) {
      this.page = val;
      this.$API.shopList(this.page).then((res) => {
        // console.log(res);
        this.list = res.data;
      });
    },
    // 上架/下架
    setSelect(item) {
      if (item.status == 1) {
        var a = 2;
      } else {
        var a = 1;
      }
      this.$confirm(`确认要${a == 1 ? "上架" : "下架"}该商品？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$API.setStatus(item.id, a).then((res) => {
            // console.log(res);
            if (res.status == 0) {
              this.$message(res.data);
              this.$API.shopList(this.page).then((res) => {
                // console.log(res);
                this.list = res.data;
              });
            }
          });
        })
        .catch(() => {});
    },
    // 查看
    detail(id) {
      this.$router.push({ path: "/home/shop_details", query: { id } });
    },
    // 编辑
    set(id) {
      this.$router.push({ path: "/home/setShop", query: { id } });
    },
    // 添加
    add() {
      this.$router.push("/home/setShop");
    },
  },
};
</script>
<style lang="scss" scoped>
.add {
  position: absolute;
  right: 25px;
  top: 15px;
}
</style>