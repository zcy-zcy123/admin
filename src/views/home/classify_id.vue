<template>
  <div>
    <el-button type="primary" class="add" @click="add">添加品类</el-button>
    <p style="margin-bottom: 15px">当前商品分类ID：{{ id }}</p>
    <el-table :data="list" border stripe style="width: 100%">
      <el-table-column prop="id" label="品类ID" width="200"> </el-table-column>
      <el-table-column prop="name" label="品类名称"> </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="set(scope.row)"
            >修改名称</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="请输入新的品类名称" :visible.sync="flag" width="30%">
      <el-form :model="form">
        <el-form-item label="">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="flag = false">取 消</el-button>
        <el-button type="primary" @click="update">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      id: 0,
      flag: false,
      form: {
        id: "",
        name: "",
      },
    };
  },
  mounted() {
    this.id = this.$route.query.id;
    this.$API.category(this.$route.query.id).then((res) => {
      // console.log(res);
      this.list = res.data;
    });
  },
  methods: {
    // 添加
    add() {
      this.$router.push("/home/classify_add");
    },
    // 修改
    set(item) {
      this.flag = true;
      this.form.id = item.id;
      this.form.name = item.name;
    },
    update() {
      this.flag = false;
      this.$API.setCategory(this.form.id, this.form.name).then((res) => {
        // console.log(res);
        if (res.status == 0) {
          this.$message(res.data);
          this.$API.category(this.id).then((res) => {
            // console.log(res);
            this.list = res.data;
          });
        }
      });
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