<template>
  <div class="footer-bottom">
    <div class="footer-box">
      <el-row :gutter="20">
        <el-col :span="10" style="color:#9B9B9B;">
          <ul>
          <li class="title">浙江省杭州市滨江区六和路368号</li>
          <li>客服邮箱：help@ethosth.com</li>
        </ul>
        </el-col>
        <el-col :span="10" style="color:#9B9B9B;">
          <ul>
          <li >Copyright © 2018 杭州医素科技有限公司</li>
          <li> 浙lCP备：17057750号</li>
        </ul>
        </el-col>
        <el-col :span="4" style="text-align:right;">
          <img src="../assets/img/qrCode_icon.png" style="position:relative;top:-5px;">
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "footer-bottom"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
