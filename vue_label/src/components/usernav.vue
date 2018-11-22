<template>
  <div class="header">
    <div class="nav-header">
      <div class="usernav">
        <div class="noLogin">
          <router-link :to="{name:'Home'}" class="gohome"><img src="../assets/logo.png" alt="logo" class="logoImg"></router-link>
          <div class="login-btn " @click="goTo('Login')">
            <img src="../assets/img/login-icon.png"> 登录
          </div>
          <div class="register-btn" @click="goTo('Register')">
            <img src="../assets/img/register-icon.png"> 注册
          </div>
          <!-- <el-button  class="login-btn" @click="goTo('Login')" icon="el-icon-label-login">登录</el-button> -->
          <!-- <el-button class="register-btn" @click="goTo('Register')" icon="el-icon-label-register">注册</el-button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "usernav",
  data() {
    return {
      msg: "Welcome to Your Vue.js usernav"
    };
  },
  methods: {
    goTo(name) {
      this.$router.push({ name: name });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.gohome {
  margin-left: 20px;
  font-size: 16px;
  background: white;
  padding: 20px;
  color: black;
}
a:active {
  color: #66b1ff;
}
</style>
