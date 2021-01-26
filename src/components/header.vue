<template>
  <div class="container">
    <el-breadcrumb separator="/" v-if="$route.meta.header">
      <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-breadcrumb separator="/" v-else>
      <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.meta.item }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<style lang="scss" scoped>
.container {
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid gainsboro;
  margin-bottom: 20px;
  > div {
    font-size: 28px;
  }
}
</style>