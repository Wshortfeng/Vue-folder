<template>
  <div class="container  content-padding">
    <div class="container-main">
      <div class="container-content tablecontent">
        <div class="tabelForm">
          <el-form ref="ruleForm" :model="ruleForm" class="demo-form-inline" label-width="150px" disabled>
             <el-form-item label="姓氏：">
                <el-input v-model="ruleForm.firstName" class="disabledColr"></el-input>
              </el-form-item>
             <el-form-item label="名字：">
                <el-input v-model="ruleForm.lastName" class="disabledColr"></el-input>
              </el-form-item>
            <el-form-item label="用户名：">
              <el-input v-model="ruleForm.username" class="disabledColr"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：">
              <el-input v-model="ruleForm.email" class="disabledColr"></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyInfo",
  data() {
    return {
      isloading: true,
      isSynchro: false,
      ruleForm: {
        firstName: "",
        lastName: "",
        username:'',
        email:''
      }
    };
  },
  created() {},
  mounted() {
    this.getMyAuthUser();
  },
  watch: {},
  methods: {
    getMyAuthUser() {
      this.$api.user.getMyAuthUser().then(res => {
        if (res.code == 200) {
          this.ruleForm = res.data;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
