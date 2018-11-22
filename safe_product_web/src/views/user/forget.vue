<template>
  <div id="forget-page">
    <div class="main">
      <div class="forget-content">

        <div class="forget-main">
          <div class="forget-warp">
            <p class="logo-title">
              忘记密码
            </p>
            <el-form ref="forgetForm" :model="forgetForm" class="demo-form-inline " :rules="forgetRules" label-width="110px" style="padding-right:40px;">
              <el-form-item prop="email" label="电子邮箱：">
                <el-input v-model="forgetForm.email" placeholder="请输入电子邮箱"  maxlength="50"></el-input>
              </el-form-item>
              <el-form-item prop="code" label="验证码：">
                <el-input placeholder="请输入验证码" v-model="forgetForm.code"  maxlength="6">
                  <a href="javascript:;" slot="append" class="unchecked-code" @click="onSubmit()" v-if="showcode">{{check_code}}</a>
                  <a href="javascript:;" slot="append" class="unchecked-code" v-else>{{check_code}}</a>
                </el-input>
              </el-form-item>
              <el-form-item prop="password" label="新密码：">
                <el-input type="password" v-model="forgetForm.password" placeholder="请输入6至20位密码"  maxlength="20" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item prop="confirmpassword" label="确认新密码：">
                <el-input type="password" v-model="forgetForm.confirmpassword" placeholder="请再次输入密码"  maxlength="20" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div class="forget-div">
                <el-button type="primary"  @click="forgetform('forgetForm')">确定</el-button>
                 <el-button   @click="goTo('Login')">返回登录</el-button>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "forget",
  data() {
    var isemail = (rule, value, callback) => {
      //邮箱验证
      if (!value) {
        return callback(new Error("请输入电子邮箱"));
      }
      if (!this.$utils.isEmail(value)) {
        return callback(new Error("电子邮箱格式错误"));
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
      check_code: "获取验证码",
      isRead: false,
      showcode: true,
      forgetForm: {
        email: "",
        code: "",
        password: "",
        confirmpassword: ""
      },
      forgetRules: {
        email: [{ validator: isemail, trigger: "blur" }],
        code: [{ validator: isInt, trigger: "blur" }],
        password: [{ validator: isPassword, trigger: "blur" }],
        confirmpassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    goTo(name){
      this.$router.push({
        name:name
      })
    },
    onSubmit() {
      var that = this;
      if (that.forgetForm.email.trim() == "") {
        that.$toaster.error("请先输入邮箱");
        return;
      } else {
        if (!that.$utils.isEmail(that.forgetForm.email)) {
          that.$toaster.error("邮箱格式错误");
          return;
        }
      }
      that.$api.user.getEmailCode(that.forgetForm.email, 2).then(res => {
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
              forgetForm.email,
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
<style lang="scss">
  @import "src/styles/common.scss";
#forget-page {
  height: 100%;
  .main {
    height: 100%;
  }
}

.forget-content {
  height: 100%;
  text-align: center;
  background: url("../../assets/img/login_bg.jpg") no-repeat !important;
  background-size: cover !important;
  .forget-main {
    height: 100%;
    .forget-warp {
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
      padding: 0px 60px 50px;
      .logo-title {
        text-align: center;
        font-size: 20px !important;
        line-height: 120px;
        margin: 0;
        color: $fontSizeTitle;
      }
      .el-select {
        width: 100%;
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
      .forget-div{
        text-align: center;
        .el-button{
          width: 98px;
          margin:0px 15px 0px 15px;
        }
      }
    }
  }
}
</style>
