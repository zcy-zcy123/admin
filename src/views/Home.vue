<template>
  <div>
    <el-container>
      <el-header>
        <h1>MMALL ADMIN</h1>
        <div>
          欢迎，{{ info.username }}
          <span @click="exit">退出</span>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="/home"
            class="el-menu-vertical-demo"
            background-color="#F8F8F8"
            text-color="#337ab7"
            active-text-color="#23527c"
            router
          >
            <el-menu-item index="/home">
              <i class="el-icon-menu"></i>
              <span slot="title">Home</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title"
                ><i class="el-icon-s-shop"></i>商品</template
              >
              <el-menu-item index="/home/shop">商品管理</el-menu-item>
              <el-menu-item index="/home/classify">品类管理</el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"
                ><i class="el-icon-s-order"></i>订单</template
              >
              <el-menu-item index="/home/order">订单管理</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <MyComponent />
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: JSON.parse(localStorage.getItem("userInfo")) || "",
    };
  },
  methods: {
    // 退出
    exit() {
      this.$API.exit().then((res) => {
        console.log(res);
        if (res.status == 0) {
          this.$router.push("/");
          this.$message("退出成功");
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid gainsboro;
  background: #f8f8f8;
  h1 {
    height: 100%;
    color: #777;
    font-size: 18px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  div {
    height: 100%;
    display: flex;
    align-items: center;
    span {
      padding: 0 15px;
      color: #337ab7;
      height: 100%;
      cursor: pointer;
      display: flex;
      align-items: center;
      &:hover {
        background: #eee;
        color: #23527c;
      }
    }
  }
}
aside {
  height: 91.8vh;
  ul {
    height: 100%;
  }
}
main {
  height: 91.8vh;
  overflow: auto;
  position: relative;
}
</style>