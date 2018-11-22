<template>
  <div id="login-page">
    <div class="main">
      <div class="login-content">
        <div class="login-main">
          <div class="login-wrap">
            <p class="logo-title">安全生产防控平台</p>
            <el-form ref="loginForm" :model="loginForm" class="demo-form-inline" :rules="rules">
              <div>
                <template>
                  <el-form-item prop="account" ref="phone">
                    <el-input @keyup.enter.native="submitForm()" placeholder="请输入用户名/手机号/邮箱" v-model="loginForm.account" :prefix-icon="phoneclass" autocomplete="off" maxlength="50"></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <i :class="xianshiclass" style="cursor:pointer;position:absolute;right:8px;top:15px;z-index:11;" @click="showpsd()"></i>
                    <el-input @keyup.enter.native="submitForm()" :type="passwordtype" placeholder="请输入密码" v-model="loginForm.password" :prefix-icon="psdclass" autocomplete="off" maxlength="20"></el-input>
                  </el-form-item>

                  <el-form-item class="login_btn_box">
                    <el-button type="primary" @click="submitForm()" class="login_btn">登录</el-button>
                  </el-form-item>
                  <div class="other_operations">
                    <router-link :to="{name:'Forget'}" class="right">忘记密码？</router-link>
                  </div>
                </template>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    var isPhone = (rule, value, callback) => {
      //用户名验证
      if (!value) {
        return callback(new Error("请输入用户名/手机号/邮箱"));
      }
      callback();
      // if (!this.$utils.isString(value)) {
      //   return callback(new Error("手机号为11个字符"));
      // } else {
      //   if (!this.$utils.telphone(value)) {
      //     return callback(new Error("手机号格式错误"));
      //   } else {
      //     callback();
      //   }
      // }
    };
    var isPassword = (rule, value, callback) => {
      //密码验证
      if (!value) {
        return callback(new Error("请输入密码"));
      }
      if (!this.$utils.isString(value)) {
        return callback(new Error("密码为6~20个字符"));
      } else {
        if (!this.$utils.isPsd(value)) {
          return callback(new Error("密码格式错误"));
        } else {
          callback();
        }
      }
    };
    return {
      phoneclass: "el-icon-safetyproduction-yonghu-change",
      psdclass: "el-icon-safetyproduction-mima1-change",
      xianshiclass: "el-icon-safetyproduction-buxianshimima-change",
      rememberpassword: false,
      timeout: 0,
      passwordtype: "password",
      loginForm: {
        account: "",
        password: ""
      },
      rules: {
        account: [
          {
            validator: isPhone,
            trigger: "blur"
          }
        ],
        password: [
          {
            validator: isPassword,
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    showpsd() {
      if (
        this.xianshiclass == "el-icon-safetyproduction-buxianshimima-change"
      ) {
        this.xianshiclass = "el-icon-safetyproduction-xianshimima-change";
        this.passwordtype = "text";
        return;
      } else {
        this.xianshiclass = "el-icon-safetyproduction-buxianshimima-change";
        this.passwordtype = "password";
        return;
      }
    },
    submitForm: function() {
      //登录
      this.$refs["loginForm"].validate(valid => {
        if (valid) {
          var login = this.loginForm;
          this.$api.user
            .login(
              this.loginForm.account,
              this.$utils.calcuMD5(this.loginForm.password)
            )
            .then(res => {
              if (res.code == 200) {
                this.$store.commit("user/SET_TOKEN", res.data.token);
                this.$store.commit("user/SET_USER_TYPE", res.data.userType);
                this.$store.commit(
                  "user/SET_ONLINE_DEVICE",
                  res.data.onlineDevice
                );
                this.$store.commit(
                  "user/SET_CONTROL_DEVICE",
                  res.data.controlDevice
                );
                this.$store.commit("user/SET_USER_NAME", res.data.userName);
                this.$router.push({
                  name: "Home"
                });
              }
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scope>
@import "src/styles/common.scss";
#login-page {
  height: 100%;
  .main {
    height: 100%;
  }
}

.login-content {
  height: 100%;
  text-align: center;
  background: url("../../assets/img/login_bg.jpg") no-repeat !important;
  background-size: cover !important;
  .login-main {
    height: 100%;
    .login-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -300px;
      margin-top: -240px;
      text-align: left;
      display: inline-block;
      height: 480px;
      width: 600px;
      box-sizing: border-box;
      background: white;
      border-radius: 5px;
      box-shadow: 0 1px 5px #eeeeee;
      padding: 0px 80px 50px;
      .logo-title {
        text-align: center;
        font-size: 20px !important;
        line-height: 170px;
        margin: 0;
        margin-bottom: 15px;
        font-weight: bold;
      }
      .login_btn_box {
        .login_btn {
          width: 100%;
        }
        margin-bottom: 10px;
      }
      .npassword-box {
        .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background: $color1;
          border-color: $color1;
        }
        .el-checkbox__input.is-checked + .el-checkbox__label {
          color: $color1;
        }
      }

      .other_operations {
        text-align: left;
        position: relative;
        a {
          color: $color1;
        }
        .right {
          position: absolute;
          right: -5px;
        }
      }
    }
  }
}
</style>
