<template>
  <div>
    <div class="warp">
      <h3>请登录</h3>
      <el-form :model="login" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="login.user" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-input
            v-model="login.pass"
            placeholder="密码"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 100%"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      login: {
        user: "",
        pass: "",
      },
    };
  },
  methods: {
    // 登录
    onSubmit() {
      if (this.login.user.length == 0 || this.login.pass.length == 0) {
        this.$message({
          message: "请输入用户名或密码",
          type: "warning",
        });
        return;
      }
      this.$API.login(this.login.user, this.login.pass).then((res) => {
        // console.log(res);
        if (res.status == 1) {
          this.$message.error(res.msg);
          return;
        }
        this.$message({
          message: "登录成功",
          type: "success",
        });
        this.$router.push("/home");
        localStorage.setItem("userInfo", JSON.stringify(res.data));
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.warp {
  width: 300px;
  padding: 30px 20px;
  border: 1px solid gainsboro;
  border-radius: 5px;
  margin: 150px auto;
  h3 {
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>