<template>
  <div>
    <el-form ref="form" label-width="180px">
      <el-form-item label="商品名称">{{ info.name }}</el-form-item>
      <el-form-item label="商品描述"> {{ info.subtitle }}</el-form-item>
      <el-form-item label="当前状态">
        {{ info.status == 1 ? "在售" : "已下架" }}</el-form-item
      >
      <el-form-item label="所属分类">
        <el-select
          v-model="info.parentCategoryId"
          placeholder="请选择"
          style="margin-right: 10px"
        >
          <el-option
            v-for="item in option"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            disabled
          >
          </el-option>
        </el-select>
        <el-select v-model="info.categoryId" placeholder="请选择">
          <el-option
            v-for="item in option1"
            :key="item.id"
            :label="item.name"
            :value="item.id"
            disabled
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input
          placeholder="请输入内容"
          v-model="info.price"
          style="width: 300px"
          disabled
        >
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input
          placeholder="请输入内容"
          v-model="info.stock"
          style="width: 300px"
          disabled
        >
          <template slot="append">件</template>
        </el-input>
      </el-form-item>
      <el-form-item label="商品图片">
        <img
          :src="info.mainImage"
          alt=""
          style="width: 80px; height: 80px; border: 1px solid gray"
        />
      </el-form-item>
      <el-form-item label="商品详情"><div v-html="info.detail"></div></el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: [],
      option: [],
      option1: [],
    };
  },
  mounted() {
    this.$API.detail(this.$route.query.id).then((res) => {
      // console.log(res);
      this.info = res.data;
      this.$API.category(res.data.parentCategoryId).then((res) => {
        // console.log(res);
        this.option1 = res.data;
      });
    });
    this.$API.category(0).then((res) => {
      // console.log(res);
      this.option = res.data;
    });
  },
};
</script>