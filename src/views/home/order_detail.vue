<template>
  <div>
    <el-form ref="form" label-width="180px">
      <el-form-item label="订单号：">{{ info.orderNo }}</el-form-item>
      <el-form-item label="创建时间："> {{ info.createTime }}</el-form-item>
      <el-form-item label="收件人：">
        {{ info.shippingVo != null ? info.shippingVo.receiverName : "" }}，
        {{ info.shippingVo != null ? info.shippingVo.receiverProvince : "" }}
        {{ info.shippingVo != null ? info.shippingVo.receiverCity : "" }}，
        {{ info.shippingVo != null ? info.shippingVo.receiverAddress : "" }}
      </el-form-item>
      <el-form-item label="订单状态："> {{ info.statusDesc }} </el-form-item>
      <el-form-item label="支付方式：">
        {{ info.paymentTypeDesc }}
      </el-form-item>
      <el-form-item label="订单金额："> ￥{{ info.payment }} </el-form-item>
    </el-form>
    <el-table :data="info.orderItemVoList" border stripe style="width: 100%">
      <el-table-column label="商品图片">
        <template slot-scope="scope">
          <img
            :src="'http://img.happymmall.com/' + scope.row.productImage"
            alt=""
            style="width: 80px; height: 80px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="productName" label="商品信息" width="400">
      </el-table-column>
      <el-table-column label="单价">
        <template slot-scope="scope">
          ￥{{ scope.row.currentUnitPrice }}
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="数量"> </el-table-column>
      <el-table-column label="合计">
        <template slot-scope="scope"> ￥{{ scope.row.totalPrice }} </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: [],
    };
  },
  mounted() {
    this.$API.order_detail(this.$route.query.id).then((res) => {
      // console.log(res);
      this.info = res.data;
    });
  },
};
</script>