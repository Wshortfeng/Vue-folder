<template>
  <div id="register-page">
    <user-nav />
    <div class="main">
      <div class="register-content">
        <div class="register-title">
          注册
        </div>
        <div class="register-main">
          <div class="register-warp">
            <el-form ref="registerForm" :model="registerForm" class="demo-form-inline" :rules="registerRules">
              <el-form-item prop="userType">
                <i :class="userTypeclass" id="userTypeClass"></i>
                <el-select v-model="registerForm.userType" placeholder="请选择用户类型">
                  <el-option label="项目方" value="1"></el-option>
                  <el-option label="标注方" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item prop="nickName">
                <el-input v-model="registerForm.nickName" placeholder="请输入昵称" :prefix-icon="nameclass" maxlength="10" @change="filteremojifun"></el-input>
              </el-form-item>
              <el-form-item prop="account">
                <el-input v-model="registerForm.account" placeholder="请输入手机号" :prefix-icon="phoneclass" maxlength="11"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input placeholder="请输入验证码" v-model="registerForm.code" :prefix-icon="checkphoneclass" maxlength="6">
                  <a href="javascript:;" slot="append" class="unchecked-code" v-if="showcode" @click="onSubmit()">{{check_code}}</a>
                  <a href="javascript:;" slot="append" class="unchecked-code" v-else>{{check_code}}</a>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="registerForm.password" placeholder="请输入6至20位密码" :prefix-icon="psdclass" maxlength="20" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="confirmpassword">
                <el-input type="password" v-model="registerForm.confirmpassword" placeholder="请再次输入密码" :prefix-icon="psdclass1" maxlength="20" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item class="isRead">
                <el-checkbox id="isReaduserprotocol" v-model="isRead"></el-checkbox>
                <span class="userprotocol">我已同意并阅读“<span @click="goTo()" style="color:#5A7CD0;border-bottom: 1px solid #5a7cd0;">{{msg}}</span>”</span>
              </el-form-item>
              <div class="register-div">
                <el-button type="primary" class="long-buttun" @click="register('registerForm')">注册</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <footer-bottom />
  </div>
</template>
<script>
import userNav from "../../components/usernav";
import footerBottom from "../../components/footerbottom";
export default {
  name: "Register",
  components: { userNav, footerBottom },
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
          return callback(
            new Error("包含大写字母、小写字母、数字、英文符号至少三种")
          );
        } else {
          callback();
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    var isInt = (rule, value, callback) => {
      //验证码验证
      if (!value) {
        return callback(new Error("请输入验证码"));
      }
      if (!this.$utils.isString(value)) {
        return callback(new Error("验证码为6个字符"));
      } else {
        if (!this.$utils.isInt(value)) {
          return callback(new Error("验证码格式错误"));
        } else {
          callback();
        }
      }
    };
    return {
      userTypeclass: "el-icon-label-user-group-change",
      nameclass: "el-icon-label-github-change",
      phoneclass: "el-icon-label-shoujihao-change",
      checkphoneclass: "el-icon-label-yanzhengma-change",
      psdclass: "el-icon-label-mima1-change",
      psdclass1: "el-icon-label-mima1-change",
      check_code: "获取验证码",
      msg: "用户协议",
      isRead: false,
      showcode: true,
      registerForm: {
        userType: "",
        nickName: "",
        account: "",
        code: "",
        password: "",
        confirmpassword: ""
      },
      registerRules: {
        userType: [
          { required: true, message: "请选择用户", trigger: "change" }
        ],
        nickName: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10个字符", trigger: "blur" }
        ],
        account: [{ validator: isPhone, trigger: "blur" }],
        code: [{ validator: isInt, trigger: "blur" }],
        password: [{ validator: isPassword, trigger: "blur" }],
        confirmpassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  created() {},
  mounted() {},
  watch: {
    type(value) {
      if (value == 1) {
        this.msg = "项目方协议";
      } else if (value == 2) {
        this.msg = "标注方协议";
      } else {
        this.msg = "用户协议";
      }
    }
  },
  computed: {
    type() {
      return this.registerForm.userType;
    }
  },
  methods: {
    filteremojifun(e){
      this.registerForm.nickName = this.$utils.filteremoji(e);
    },
    focusInput(name) {
      if (name == "phone") {
        this.phoneclass = "el-icon-label-shoujihao-change";
      } else if (name == "password") {
        this.psdclass = "el-icon-label-mima1-change";
      }
      if (name == "password1") {
        this.psdclass1 = "el-icon-label-mima1-change";
      } else if (name == "userType") {
        this.userTypeclass = "el-icon-label-user-group-change";
      } else if (name == "name") {
        this.nameclass = "el-icon-label-github-change";
      } else if (name == "checkphone") {
        this.checkphoneclass = "el-icon-label-yanzhengma-change";
      }
    },
    blurInput(name) {
      if (name == "phone") {
        this.phoneclass = "el-icon-label-shoujihao";
      } else if (name == "password") {
        this.psdclass = "el-icon-label-mima1";
      }
      if (name == "password1") {
        this.psdclass1 = "el-icon-label-mima1";
      } else if (name == "userType") {
        this.userTypeclass = "el-icon-label-user-group";
      } else if (name == "name") {
        this.nameclass = "el-icon-label-github";
      } else if (name == "checkphone") {
        this.checkphoneclass = "el-icon-label-yanzhengma";
      }
    },
    onSubmit() {
      var that = this;
      if (jQuery.trim(that.registerForm.account) == "") {
        that.$toaster.error("请先输入手机号");
        return;
      } else {
        if (!that.$utils.telphone(that.registerForm.account)) {
          that.$toaster.error("手机号格式错误");
          return;
        }
      }

      that.$api.user.getCode(that.registerForm.account, 1).then(res => {
        if (res.code == 200) {
          that.$toaster.ok(res.msg);
          that.check_code = "59s";
          var count = 58;
          var check = setInterval(function() {
            if (count == 0) {
              that.showcode = true;
              that.check_code = "重新获取验证码";
            } else {
              that.showcode = false;
              that.check_code = count + "s";
            }
            count--;
            if (count == -1) {
              clearInterval(check);
            }
          }, 1000);
        } else {
          that.showcode = true;
          that.check_code = "获取验证码";
          clearInterval(check);
          that.$toaster.error(res.msg);
        }
      });
    },
    goTo() {
      this.isRead = true;
      this.$router.push({
        path: "/userprotocol"
      });
    },
    register(registerForm) {
      //登录
      this.$refs[registerForm].validate(valid => {
        if (valid) {
          if (!this.isRead) {
            this.$toaster.info("请确认已经阅读用户协议");
            return;
          }
          var registerForm = this.registerForm;
          this.$api.user
            .register(
              registerForm.userType,
              registerForm.account,
              registerForm.code,
              this.$utils.calcuMD5(registerForm.password),
              registerForm.nickName
            )
            .then(res => {
              if (res.code == 200) {
                this.$toaster.ok("注册成功，请填写申请表");
                this.$store.commit("user/setToken", res.data.token);
                this.$store.commit("user/setRoleType", res.data.userType);
                this.$store.commit("user/setStatus", res.data.status);
                this.$store.commit("user/setLoginStatus", res.data.loginStatus);
                this.$store.commit("user/setUserId", res.data.userId);
                this.$store.commit("user/setNickName", res.data.nickName);
                this.$store.commit("user/setRememberloginstatus", false);
                if (this.registerForm.userType == 1) {
                  this.$router.push({
                    path: "/applicaproject"
                  });
                } else if (this.registerForm.userType == 2) {
                  this.$router.push({
                    path: "/applicalabel"
                  });
                }
              } else {
                this.$toaster.error(res.msg);
              }
            })
            .catch(() => {});
        } else {
          // this.$toaster.error("请确认验证项格式");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
#register-page {
  background: white;
}
.register-content {
  height: 720px !important;
  margin-top: 30px !important;
  text-align: center;
  background: url("../../assets/img/login_bg.jpg") no-repeat !important ;
  background-size: cover !important;
  padding-top: 30px;
  .register-title {
    color: white;
    font-size: 19px;
    line-height: 90px;
  }
  .register-main {
    text-align: left;
    display: inline-block;
    height: 555px;
    width: 440px;
    box-sizing: border-box;
    background: white;
    border-radius: 5px;
    box-shadow: 0 1px 5px #eeeeee;
    padding: 50px 60px;

    .el-select {
      width: 100%;
    }
    .el-input__inner {
      padding-left: 27px;
    }
    #userTypeClass {
      position: absolute;
      z-index: 1111;
      left: 10px;
      top: 12px;
    }
    .long-buttun {
      width: 100%;
    }
    .register-tip {
      box-sizing: border-box;
      padding: 0px 40px;
      margin-bottom: 20px;
      a {
        display: inline-block;
        font-size: 14px;
        color: #999;
      }
    }
    .unchecked-code {
      color: white;
      padding: 10px 20px 10px 20px;
    }
    .isRead {
      .el-checkbox__input.is-checked .el-checkbox__inner,
      .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background: #6081d2;
        border-color: #6081d2;
      }
      .el-checkbox__input.is-checked + .el-checkbox__label {
        color: #6081d2;
      }
      .el-form-item__content {
        line-height: 19px;
      }
    }
    .userprotocol {
      cursor: pointer;
      margin-left: 10px;
    }
    .el-input-group__append {
      background: #5a7cd0 !important;
      color: #fff !important;
      border: 1px solid #5a7cd0;
      padding: 0;
      width: 100px;
      text-align: center;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
}
</style>
