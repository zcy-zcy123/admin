<template>
  <div>
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="所属品类">
        <el-select v-model="form.value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="品类名称">
        <el-input
          v-model="form.name"
          style="width: 300px"
          placeholder="请输入品类名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        value: "",
        name: "",
      },
      options: [],
    };
  },
  mounted() {
    this.$API.category(0).then((res) => {
      // console.log(res);
      this.options = res.data;
      this.options.unshift({
        id: "",
        name: "所有",
      });
    });
  },
  methods: {
    onSubmit() {
      if (this.form.name.length == 0) {
        this.$message("请输入品类名称");
        return;
      }
      this.$API.addCategory(this.form.value, this.form.name).then((res) => {
        // console.log(res);
        if (res.status == 0) {
          this.$message(res.data);
          this.$router.back();
        }
      });
    },
  },
};
</script>