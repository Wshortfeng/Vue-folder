<template>
  <div id="login-page">
    <div class="login-main">
      <div class="login-title">
        后台管理系统
      </div>
      <div class="login-wrap">
        <el-form ref="login" :model="login " class="demo-form-inline">
          <div>
            <template v-if='state=="login"'>
              <el-form-item prop="name" >
                <el-input placeholder="请输入手机号" v-model="login.name"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="login.password"></el-input>
              </el-form-item>
              <el-form-item>
                 <el-checkbox class="npassword">记住账号</el-checkbox>
                <el-button type="primary" @click="submitForm()">登录</el-button>
              </el-form-item>
            </template>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      state: "login",
      timeout: 0,
      login: {
        name: "",
        password: ""
      }
    };
  },
  mounted() {},
  methods: {
    submitForm: function(data) {
      let login = this.login;
      if (!this.$utils.telphone(login.name)) {
        this.$toaster.error("请填写手机号"); //13625543323
        return;
      }
      if (!this.$utils.isString(login.password)) {
        this.$toaster.error("请填写密码");
        return;
      }
      this.$api.user
        .login(this.login.name, this.$utils.calcuMD5(this.login.password))
        .then(res => {
          if (res.code == 200) {
            let token = res.data.token;
            this.$utils.setCookie("TokenKey", token);
              this.$toaster.ok('登录成功')
            this.$router.push({ path: "/" });
          } else {
            this.$toaster.error(res.msg);
          }
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="less" >
html,
body {
  height: 100%;
  background: rgb(4, 17, 73);
}
.login-main {
  height: 300px;
  width: 350px;
  box-sizing: border-box;
  background: white;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -175px;
  margin-top: -150px;
  padding: 0 30px;
  border-radius: 5px;
  .login-title {
    font-size: 25px;
    line-height: 300%;
  }
  .npassword {
    position: relative;
    right: 20px;
  }
}
</style>
