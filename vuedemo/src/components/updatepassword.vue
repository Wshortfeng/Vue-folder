<template>
  <div class="updatepassword">
    <el-dialog title="修改密码" :visible.sync="showupdatePasswordForm" width="500px" @close="close" class="deepbackground" center>
      <el-form ref="updatepasswordForm" :model="updatepasswordForm" class="demo-form-inline updatepasswordForm" :rules="updatepasswordRules" label-width="100px">
        <el-form-item prop="account" label="手机号：">
          <el-input v-model="updatepasswordForm.account" placeholder="请输入手机号" disabled maxlength="11"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="验证码：">
          <el-input placeholder="请输入验证码" v-model="updatepasswordForm.code" maxlength="6">
            <a href="javascript:;" slot="append" class="unchecked-code" @click="onSubmit()" v-if="showcode">{{code}}</a>
            <a href="javascript:;" slot="append" class="unchecked-code" v-else>{{code}}</a>
          </el-input>
        </el-form-item>
        <el-form-item prop="oldpassword" label="原密码：">
          <el-input type="password" v-model="updatepasswordForm.oldpassword" placeholder="请输入原密码" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="newpassword" label="新密码：">
          <el-input type="password" v-model="updatepasswordForm.newpassword" placeholder="请输入新密码" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item prop="confirmpassword" label="确认密码：">
          <el-input type="password" v-model="updatepasswordForm.confirmpassword" placeholder="请再次输入密码" maxlength="20"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updatepassword('updatepasswordForm')">确 定</el-button>
        <el-button type="primary" @click="close">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "updatepassword",
  props: {
    // route object
    updatePasswordFormVisible: {
      type: Boolean,
      default: false
    },
    account: {
      type: String,
      default: ""
    }
  },
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
        return callback(new Error("请输入原密码"));
      }
      if (!this.$utils.isString(value)) {
        return callback(new Error("原密码为6~20个字符"));
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
    var isPassword1 = (rule, value, callback) => {
      //密码验证
      if (!value) {
        return callback(new Error("请输入新密码"));
      }
      if (!this.$utils.isString(value)) {
        return callback(new Error("新密码为6~20个字符"));
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.updatepasswordForm.newpassword) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    return {
      code: "获取验证码",
      showupdatePasswordForm: false,
      showcode: true,
      updatepasswordForm: {
        account: "",
        code: "",
        oldpassword: "",
        newpassword: "",
        confirmpassword: ""
      },
      updatepasswordRules: {
        account: [{ required: true, validator: isPhone, trigger: "blur" }],
        code: [{ required: true, validator: isInt, trigger: "blur" }],
        oldpassword: [
          { required: true, validator: isPassword, trigger: "blur" }
        ],
        newpassword: [
          { required: true, validator: isPassword1, trigger: "blur" }
        ],
        confirmpassword: [
          { required: true, validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    updatePasswordFormVisible(newValue, oldValue) {
      //监听父组件传来的值是否变化
      this.showupdatePasswordForm = newValue;
    }
  },
  created() {
    this.updatepasswordForm.account = this.account;
  },
  methods: {
    close() {
      this.$refs["updatepasswordForm"].resetFields();
      this.$emit("closeupdatepasswordForm");
    },
    onSubmit() {
      var that = this;
      if (jQuery.trim(that.updatepasswordForm.account) == "") {
        that.$toaster.error("请先输入手机号");
        return;
      } else {
        if (!that.$utils.telphone(that.updatepasswordForm.account)) {
          that.$toaster.error("手机号格式错误");
          return;
        }
      }

      that.$api.user.getCode(that.updatepasswordForm.account, 2).then(res => {
        if (res.code == 200) {
          that.$toaster.ok(res.msg);
          that.code = "59s";
          var count = 58;
          var check = setInterval(function() {
            if (count == 0) {
              that.showcode = true;
              that.code = "重新获取验证码";
            } else {
              that.showcode = false;
              that.code = count + "s";
            }
            count--;
            if (count == -1) {
              clearInterval(check);
            }
          }, 1000);
        } else {
          that.showcode = true;
          that.code = "获取验证码";
          clearInterval(check);
          that.$toaster.error(res.msg);
        }
      });
    },
    updatepassword(updatepasswordForm) {
      this.$refs[updatepasswordForm].validate(valid => {
        if (valid) {
          var updatepasswordForm = this.updatepasswordForm;
          this.$api.user
            .updatePassword(
              updatepasswordForm.account,
              updatepasswordForm.code,
              this.$utils.calcuMD5(updatepasswordForm.oldpassword),
              this.$utils.calcuMD5(updatepasswordForm.newpassword)
            )
            .then(res => {
              if (res.code == 200) {
                this.$toaster.ok(res.msg);
                this.updatepasswordForm = {
                  account: updatepasswordForm.account,
                  code: "",
                  oldpassword: "",
                  newpassword: "",
                  confirmpassword: ""
                };
                this.close();
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.updatepasswordForm {
  width: 400px;
  margin: 0 auto;
  .el-input.is-disabled .el-input__inner,
  .el-textarea.is-disabled .el-textarea__inner {
    color: white !important;
  }
}
.unchecked-code {
  color: #5a7cd0;
  padding: 10px 20px 10px 20px;
}

.userprotocol {
  cursor: pointer;
  margin-left: 10px;
}
.el-input-group__append {
  background: white !important;
  color: #5a7cd0 !important;
  border: 1px solid #5a7cd0;
  padding: 0;
  width: 100px;
  text-align: center;
  box-sizing: border-box;
  cursor: pointer;
}
.updatepassword {
  .el-dialog--center .el-dialog__body {
    text-align: initial;
    padding: 25px 25px 5px 10px;
  }
}
</style>
