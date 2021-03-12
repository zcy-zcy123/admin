<template>
  <div>
    <el-form ref="form" :model="form" label-width="180px">
      <el-form-item label="商品名称">
        <el-input v-model="form.name" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="商品描述">
        <el-input v-model="form.title" style="width: 300px"></el-input>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select
          v-model="form.value"
          placeholder="请选择"
          style="margin-right: 10px"
          @change="onChange"
        >
          <el-option
            v-for="item in option"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-select
          v-model="form.value1"
          placeholder="请选择"
          v-show="form.value != ''"
        >
          <el-option
            v-for="item in option1"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input-number
          v-model="form.price"
          controls-position="right"
          :min="1"
          :precision="2"
          :step="0.01"
        ></el-input-number>
        元
      </el-form-item>
      <el-form-item label="商品库存">
        <el-input-number
          v-model="form.num"
          controls-position="right"
          :min="1"
        ></el-input-number>
        件
      </el-form-item>
      <el-form-item label="商品图片">
        <img
          :src="form.imgs"
          alt=""
          style="width: 70px; height: 70px"
          v-show="form.imgs != ''"
          @click="setImg"
        />
        <el-upload class="upload-demo" action="#" :on-progress="toImg">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品详情">
        <div id="edit"></div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import E from "wangeditor";
export default {
  data() {
    return {
      form: {
        name: "",
        title: "",
        price: "",
        num: "",
        imgs: "",
        detail: "",
        status: "",
        vlaue: "",
        value1: "",
      },
      show: true,
      option: [],
      option1: [],
    };
  },
  mounted() {
    const editor = new E("#edit");
    editor.config.zIndex = 11;
    if (this.$route.query.id != undefined) {
      this.$route.meta.item = "修改商品";
      this.$API.detail(this.$route.query.id).then((res) => {
        // console.log(res);
        this.form.name = res.data.name;
        this.form.title = res.data.subtitle;
        this.form.price = res.data.price;
        this.form.status = res.data.status;
        this.form.num = res.data.stock;
        this.form.value = res.data.parentCategoryId;
        this.form.value1 = res.data.categoryId;
        this.form.detail = res.data.detail;
        editor.txt.html(this.form.detail);
        this.form.imgs = res.data.mainImage;
        this.$API.category(res.data.parentCategoryId).then((res) => {
          // console.log(res);
          this.option1 = res.data;
          this.option1.unshift({
            id: "",
            name: "请选择二级品类",
          });
        });
      });
    } else {
      this.$route.meta.item = "添加商品";
    }
    this.$API.category(0).then((res) => {
      // console.log(res);
      this.option = res.data;
      this.option.unshift({
        id: "",
        name: "请选择一级品类",
      });
    });
    let that = this;
    editor.config.onchange = function (newHtml) {
      that.form.detail = newHtml;
    };
    editor.create();
  },
  methods: {
    onChange(val) {
      this.form.value1 = "";
      this.$API.category(val).then((res) => {
        // console.log(res);
        this.option1 = res.data;
        this.option1.unshift({
          id: "",
          name: "请选择二级品类",
        });
      });
    },

    toImg(event, file, fileList) {
      let data = new FormData();
      data.append("upload_file", file.raw);
      this.$API.imgs(data).then((res) => {
        // console.log(res);
        this.form.imgs = res.data.url;
      });
    },
    // 提交
    onSubmit() {
      if (this.$route.query.id != undefined) {
        this.$API
          .setShop(
            this.form.value1,
            this.form.name,
            this.form.title,
            this.form.imgs,
            this.form.detail,
            this.form.price,
            this.form.num,
            this.form.status,
            this.$route.query.id
          )
          .then((res) => {
            console.log(res);
            if (res.status == 0) {
              this.$message(res.data);
              this.$router.back();
            }
          });
      } else {
        this.$API
          .getShop(
            this.form.value1,
            this.form.name,
            this.form.title,
            this.form.imgs,
            this.form.detail,
            this.form.price,
            this.form.num,
            this.form.status
          )
          .then((res) => {
            console.log(res);
            if (res.status == 0) {
              this.$message(res.data);
              this.$router.back();
            }
          });
      }
    },
    // 删除图片
    setImg() {
      this.form.imgs = "";
    },
  },
};
</script>