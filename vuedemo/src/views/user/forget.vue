<template>
  <div id="forget-page">
    <user-nav />
    <div class="main">
      <div class="forget-content">
        <div class="forget-title">
          忘记密码
        </div>
        <div class="forget-main">
          <div class="forget-warp">
            <el-form ref="forgetForm" :model="forgetForm" class="demo-form-inline" :rules="forgetRules">
              <el-form-item prop="phone">
                <el-input v-model="forgetForm.phone" placeholder="请输入手机号" :prefix-icon="phoneclass" maxlength="11"></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input placeholder="请输入验证码" v-model="forgetForm.code" :prefix-icon="checkphoneclass" maxlength="6">
                  <a href="javascript:;" slot="append" class="unchecked-code" @click="onSubmit()" v-if="showcode">{{check_code}}</a>
                  <a href="javascript:;" slot="append" class="unchecked-code" v-else>{{check_code}}</a>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="forgetForm.password" placeholder="请输入6至20位密码" :prefix-icon="psdclass" maxlength="20" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="confirmpassword">
                <el-input type="password" v-model="forgetForm.confirmpassword" placeholder="请再次输入密码" :prefix-icon="psdclass1" maxlength="20" autocomplete="off"></el-input>
              </el-form-item>
              <div class="forget-div">
                <el-button type="primary" class="forget-buttun" @click="forgetform('forgetForm')">确定</el-button>
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
  name: "forget",
  components: { userNav, footerBottom },
  data() {
    var isPhone = (rule, value, callback) => {
      //手机号验证
      if (!value) {
        return callback(new Error("请输入手机号"));
      }
      if (!this.$utils.telphone(value)) {
        return callback(new Error("手机号格式错误"));
      } else {
        callback();
      }
    };
    var isPassword = (rule, value, callback) => {
      //密码验证
      if (!value) {
        return callback(new Error("请输入密码"));
      }
      if (!this.$utils.isString(value)) {
        return callback(new Error("密码为6~20个字符"));
      }
      if (!this.$utils.isPsd(value)) {
        return callback(
          new Error("包含大写字母、小写字母、数字、英文符号至少三种")
        );
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.forgetForm.password) {
        callback(new Error("两次输入密码不一致!"));
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
      isRead: false,
      showcode: true,
      forgetForm: {
        phone: "",
        code: "",
        password: "",
        confirmpassword: ""
      },
      forgetRules: {
        phone: [{ validator: isPhone, trigger: "blur" }],
        code: [{ validator: isInt, trigger: "blur" }],
        password: [{ validator: isPassword, trigger: "blur" }],
        confirmpassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
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
      if (jQuery.trim(that.forgetForm.phone) == "") {
        that.$toaster.error("请先输入手机号");
        return;
      } else {
        if (!that.$utils.telphone(that.forgetForm.phone)) {
          that.$toaster.error("手机号格式错误");
          return;
        }
      }

      that.$api.user.getCode(that.forgetForm.phone, 2).then(res => {
        if (res.code == 200) {
          that.$toaster.ok(res.msg);
          that.check_code = "59s";
          var count = 58;
          var check = setInterval(function() {
            if (count == 0) {
              that.check_code = "重新获取验证码";
              that.showcode = true;
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
          that.check_code = "获取验证码";
          that.showcode = true;
          clearInterval(check);
          that.$toaster.error(res.msg);
        }
      });
    },
    forgetform(forgetForm) {
      //确定
      this.$refs[forgetForm].validate(valid => {
        if (valid) {
          var forgetForm = this.forgetForm;
          this.$api.user
            .forgetPassword(
              forgetForm.phone,
              forgetForm.code,
              this.$utils.calcuMD5(forgetForm.password)
            )
            .then(res => {
              if (res.code == 200) {
                this.$toaster.ok(res.msg);
                this.$router.push({
                  path: "/login"
                });
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
#forget-page {
  background: white;
}
.forget-content {
  height: 720px !important;
  margin-top: 30px !important;
  text-align: center;
  background: url("../../assets/img/login_bg.jpg") no-repeat !important ;
  background-size: cover !important;
  padding-top: 80px;
  .forget-title {
    line-height: 90px;
    text-align: center;
    font-size: 19px;
    color: white;
  }
  .forget-main {
    text-align: left;
    display: inline-block;
    height: 400px;
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
    .forget-buttun {
      width: 100%;
    }
    .forget-tip {
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
    .userprotocol {
      cursor: pointer;
      margin-left: 10px;
    }
    .el-input-group__append {
      background: #5a7cd0 !important;
      padding: 0;
      color: #fff !important;
      border: 1px solid #5a7cd0;
      width: 100px;
      text-align: center;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
}
</style>
