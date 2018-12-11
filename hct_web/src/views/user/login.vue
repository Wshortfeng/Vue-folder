<template>
  <div id="login-page">
    <div class="main">
      <div class="login-content">
        <div class="login-main">
          <div class="login-wrap">
            <p class="logo-title">好菜通后台管理系统</p>
            <div class="ruleForm">
              <el-row>
                <el-col :span="11" class="ruleForm-left">
                </el-col>
                <el-col :span="13" class="ruleForm-right">
                  <el-form ref="ruleForm" :model="ruleForm" class="demo-form-inline" :rules="rules">
                    <div>
                      <p class="login-title">登录</p>
                      <template>
                        <el-form-item prop="username" ref="phone">
                          <el-input @keyup.enter.native="submitForm()" placeholder="请输入账号" v-model="ruleForm.username" :prefix-icon="phoneclass" autocomplete="off" maxlength="10" @change="filteremojifun($event,'username','ruleForm')"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                          <i :class="xianshiclass" style="cursor:pointer;position:absolute;right:8px;top:15px;z-index:11;" @click="showpsd()"></i>
                          <el-input @keyup.enter.native="submitForm()" :type="passwordtype" placeholder="请输入密码" v-model="ruleForm.password" :prefix-icon="psdclass" autocomplete="off" maxlength="20" @change="filteremojifun($event,'password','ruleForm')"></el-input>
                        </el-form-item>
                        <el-form-item class="npassword-box">
                          <el-checkbox class="npassword" v-model="rememberpassword" id="npassword" ref="npassword">记住密码</el-checkbox>
                        </el-form-item>
                        <el-form-item class="login_btn_box">
                          <el-button type="primary" @click="submitForm()" class="login_btn">登录</el-button>
                        </el-form-item>
                      </template>
                    </div>
                  </el-form>
                </el-col>
              </el-row>

            </div>
            <p class="login-bottom"><span>技术支持：杭州百倍云科技 </span><span> 联系电话：0571-85784531</span></p>
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
    return {
      phoneclass: "el-icon-hct-username",
      psdclass: "el-icon-hct-password",
      xianshiclass: "el-icon-hct-hidepsd",
      rememberpassword: false,
      timeout: 0,
      passwordtype: "password",
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {required:true,message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        password: [
           {required:true,message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  mounted() {
    this.$utils.getCookie(this);
  },
  methods: {
    showpsd() {
      if (
        this.xianshiclass == "el-icon-hct-hidepsd"
      ) {
        this.xianshiclass = "el-icon-hct-showpsd";
        this.passwordtype = "text";
        return;
      } else {
        this.xianshiclass = "el-icon-hct-hidepsd";
        this.passwordtype = "password";
        return;
      }
    },
    filteremojifun(e, name, ruleForm) {
      this.$utils.filteremojifun(this, e, name, ruleForm);
    },
    submitForm: function() {
      //登录
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          var login = this.ruleForm;
          this.$api.user
            .login(
              this.ruleForm.username,
              this.$utils.calcuMD5(this.ruleForm.password)
            )
            .then(res => {
              if (res.code == 200) {
                this.$store.commit("user/SET_TOKEN", res.data.token);
                this.$store.commit("user/SET_USER_NAME", res.data.username);
								if(res.data.groupId){
									this.$store.commit("user/SET_GROUPID", res.data.groupId);
								}
								if(res.data.permission){
								this.$store.commit("user/SET_PERMISSION", res.data.permission);
								}else{
								}
                var remeberFlag;
                if (this.rememberpassword == true) {
                  remeberFlag = "true";
                  this.$utils.setCookie(
                    this.ruleForm.username,
                    this.ruleForm.password,
                    7,
                    remeberFlag
                  );
                } else {
                  remeberFlag == "false";
                  this.$utils.clearCookie();
                }
                this.$toaster.ok('登录成功');
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
  background: url("../../assets/img/login_bg.jpg") no-repeat 50% 100% !important;
  background-size: cover !important;
  // background: linear-gradient(to bottom, $background3 0%,$background4 50%, $background7 100%);
  .login-main {
    height: 100%;
    .login-wrap {
      position: absolute;
      top: 50%;
      right:35%;
      margin-right: -330px;
      margin-top: -280px;
      text-align: left;
      display: inline-block;
      height: 560px;
      width: 660px;
      box-sizing: border-box;
      .logo-title {
        text-align: center;
        font-size: $fontSize5 !important;
        line-height: 33px;
        margin: 0;
        color: $color2;
        margin-bottom: 89px;
        font-weight: bold;
      }
      .ruleForm {
        height: 370px;
        width: 660px;
        background: white;
        border-radius: $borderRadius2;
        box-shadow: 0 1px 5px $background7;
        .ruleForm-left {
          background: url("../../assets/img/login.jpg") no-repeat  !important;
          background-size: cover !important;
          background-position:20% 30% !important;
          height: 370px;
          width: 290px;
          border-top-left-radius: $borderRadius2;
          border-bottom-left-radius: $borderRadius2;
        }
        .ruleForm-right {
          height: 370px;
          padding: 40px;
          width: 370px;
          .login-title {
            font-size: $fontSize3;
            color: $color1;
            margin-bottom: 42px;
            display: inline-block;
            font-weight: 700;
            border-left: 5px solid $color1;
            line-height: $fontSize3;
            padding-left: 5px;
          }
          .login_btn_box {
            .login_btn {
              width: 100%;
            }
            margin-bottom: 10px;
          }
          .npassword-box {
            .el-form-item__content {
              line-height: 20px;
            }
            .el-checkbox__input.is-checked .el-checkbox__inner,
            .el-checkbox__input.is-indeterminate .el-checkbox__inner {
              background: $color1;
              border-color: $color1;
            }
            .el-checkbox__input.is-checked + .el-checkbox__label {
              color: $color1;
            }
          }
        }
      }
      .login-bottom {
        text-align: center;
        color: $color2;
        font-size: $fontSize;
        margin: 18px;
        span:first-child {
          margin-right: 25px;
        }
      }
    }
  }
}
</style>
