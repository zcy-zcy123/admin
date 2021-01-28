<template>
  <div>
    <el-form :inline="true" :model="search" class="demo-form-inline">
      <el-form-item label="">
        <el-select v-model="search.status" placeholder="请输入查询规格">
          <el-option label="按订单号查询" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input v-model="search.name" placeholder="订单号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list.list" border stripe style="width: 100%">
      <el-table-column label="订单号" width="300">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="detail(scope.row.orderNo)"
            >{{ scope.row.orderNo }}</el-button
          >
        </template>
      </el-table-column>
      <el-table-column prop="receiverName" label="收件人"> </el-table-column>
      <el-table-column label="订单状态" prop="statusDesc"> </el-table-column>
      <el-table-column label="订单总价" width="150">
        <template slot-scope="scope"> ￥{{ scope.row.payment }} </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime"> </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detail(scope.row.orderNo)"
            >查看</el-button
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
    this.$API.order(this.page).then((res) => {
      // console.log(res);
      this.list = res.data;
    });
  },
  methods: {
    // 查询
    onSubmit() {
      if (this.search.name.length == 0) {
        this.$API.order(this.page).then((res) => {
          // console.log(res);
          this.list = res.data;
        });
        return;
      }
      this.$API.order_search(this.search.name).then((res) => {
        // console.log(res);
        if (res.status == 1) {
          this.$message(res.msg);
          return;
        }
        this.list = res.data;
      });
    },
    // 页数
    pageNum(val) {
      this.page = val;
      this.$API.order(this.page).then((res) => {
        // console.log(res);
        this.list = res.data;
      });
    },
    // 查看
    detail(id) {
      this.$router.push({ path: "/home/order_detail", query: { id } });
    },
  },
};
</script>