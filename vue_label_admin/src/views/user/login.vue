<template>
  <div id="login-page">
    <div class="main">
      <div class="login-content">
        <div class="login-main">
          <p class="login-title">登录</p>
          <div class="login-wrap">
            <el-form ref="loginForm" :model="loginForm" class="demo-form-inline" :rules="rules">
              <div>
                <template v-if="state=='login'">
                  <el-form-item prop="userName" ref="phone">
                    <el-input @keyup.enter.native="submitForm()" placeholder="请输入手机号" v-model="loginForm.userName" :prefix-icon="phoneclass" autocomplete="off" maxlength="11"></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <i :class="xianshiclass" style="cursor:pointer;position:absolute;right:8px;top:15px;z-index:11;" @click="showpsd()"></i>
                    <el-input @keyup.enter.native="submitForm()" :type="passwordtype" placeholder="请输入密码" v-model="loginForm.password" :prefix-icon="psdclass" autocomplete="off" maxlength="20"></el-input>
                  </el-form-item>

                  <el-form-item class="npassword-box">
                    <el-checkbox class="npassword" v-model="rememberpassword" id="npassword" ref="npassword">记住登录状态</el-checkbox>
                  </el-form-item>
                  <el-form-item class="login_btn_box">
                    <el-button type="primary" @click="submitForm()" class="login_btn">登录</el-button>
                  </el-form-item>
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
  userName: "Login",
  data() {
    var isPhone = (rule, value, callback) => {
      //手机号验证
      if (!value) {
        return callback(new Error("请输入手机号"));
      }
      if (!this.$utils.isString(value)) {
        return callback(new Error("手机号为11个字符"));
      } else {
        if (!this.$utils.telphone(value)) {
          return callback(new Error("手机号格式错误"));
        } else {
          callback();
        }
      }
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
      state: "login",
      phoneclass: "el-icon-label-yonghu-change",
      psdclass: "el-icon-label-mima1-change",
      xianshiclass: "el-icon-label-buxianshimima-change",
      rememberpassword: false,
      timeout: 0,
      passwordtype: "password",
      loginForm: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
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
    focusInput(userName) {
      if (userName == "phone") {
        this.phoneclass = "el-icon-label-yonghu-change";
      } else {
        this.psdclass = "el-icon-label-mima1-change";
      }
    },
    blurInput(userName) {
      if (userName == "phone") {
        this.phoneclass = "el-icon-label-yonghu";
      } else {
        this.psdclass = "el-icon-label-mima1";
      }
    },
    showpsd() {
      if (this.xianshiclass == "el-icon-label-buxianshimima-change") {
        this.xianshiclass = "el-icon-label-xianshimima-change";
        this.passwordtype = "text";
        return;
      } else {
        this.xianshiclass = "el-icon-label-buxianshimima-change";
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
              this.loginForm.userName,
              this.$utils.calcuMD5(this.loginForm.password)
            )
            .then(res => {
              if (res.code == 200) {
                var token = res.data.token;
                var userType = res.data.userType;
                var status = res.data.status;
                if(userType==3){
                this.$store.commit("user/setToken", res.data.token);
                this.$store.commit("user/setRoleType", res.data.userType);
                this.$store.commit("user/setStatus", res.data.status);
                this.$store.commit("user/setUserId", res.data.userId);
                this.$store.commit("user/setNickName", res.data.nickName);
                this.$store.commit("user/setAccount", this.loginForm.userName);
                }
                if(res.data.role){
                this.$store.commit("user/setPermission", res.data.role.permission);
                }else{
                }
                //status1为未通过，2为审核中，3已通过，4未通过
                if (this.rememberpassword) {
                  this.$store.commit("user/setRememberloginstatus", true);
                } else {
                  this.$store.commit("user/setRememberloginstatus", false);
                }
                if (userType == 3) {
                  this.$toaster.ok(res.msg);
                  this.$router.push({
                    path: "/projecthallmanagement"
                  });
                  this.$store.commit("common/changeAdminNav", "2");
                  if (this.rememberpassword) {
                  } else {
                    this.loginForm.password = "";
                    this.loginForm.userName = "";
                    this.$refs["loginForm"].resetFields();
                  }
                } else {
                  this.$toaster.error("请输入平台方账号");
                }
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
<style lang="less" scope>
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
    .login-title {
      color: white;
      font-size: 19px;
      line-height: 90px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -19px;
      margin-top: -250px;
    }
    .login-wrap {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -220px;
      margin-top: -165px;
      text-align: left;
      display: inline-block;
      height: 330px;
      width: 440px;
      box-sizing: border-box;
      background: white;
      border-radius: 5px;
      box-shadow: 0 1px 5px #eeeeee;
      padding: 50px 60px;
      .login_btn_box {
        .login_btn {
          width: 100%;
        }
        margin-bottom: 10px;
      }
      .npassword-box {
        .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background: #6081d2;
          border-color: #6081d2;
        }
        .el-checkbox__input.is-checked + .el-checkbox__label {
          color: #6081d2;
        }
        .npassword {
          position: relative;
          top: -5px;
          color: #999999;
          font-size: 12px !important;
        }
        .el-checkbox__label {
          color: #999999;
          font-size: 12px !important;
        }
        margin-bottom: 10px;
        .el-form-item__content {
          line-height: 19px !important;
        }
      }

      .other_operations {
        text-align: left;
        position: relative;
        a {
          color: #6081d2;
        }
        .right {
          position: absolute;
          right: 0;
        }
      }
    }
  }
}
</style>
