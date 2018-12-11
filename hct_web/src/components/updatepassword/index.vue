<template>
  <div class="updatePassword">
    <el-dialog title="修改密码" :visible.sync="showupdatePasswordForm" width="500px" @close="close" class="deepbackground" center>
      <el-form ref="updatePasswordForm" :model="updatePasswordForm" class="demo-form-inline updatePasswordForm" :rules="updatePasswordRules" label-width="105px">
        <el-form-item prop="oldpassword" label="旧密码：">
          <el-input type="password" v-model="updatePasswordForm.oldpassword" placeholder="请输入旧密码" maxlength="20"  @change="filteremojifun($event,'oldpassword','updatePasswordForm')"></el-input>
        </el-form-item>
        <el-form-item prop="newpassword" label="新密码：">
          <el-input type="password" v-model="updatePasswordForm.newpassword" placeholder="请输入新密码" maxlength="20"  @change="filteremojifun($event,'newpassword','updatePasswordForm')"></el-input>
        </el-form-item>
        <el-form-item prop="confirmpassword" label="确认密码：">
          <el-input type="password" v-model="updatePasswordForm.confirmpassword" placeholder="请输入确认密码" maxlength="20"  @change="filteremojifun($event,'confirmpassword','updatePasswordForm')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updatePassword('updatePasswordForm')">确 定</el-button>
        <el-button  @click="close">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "updatePassword",
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.updatePasswordForm.newpassword) {
        callback(new Error("确认密码与新密码不一致"));
      } else {
        callback();
      }
    };
    return {
      showupdatePasswordForm: false,
      showcode: true,
      updatePasswordForm: {
        oldpassword: "",
        newpassword: "",
        confirmpassword: ""
      },
      updatePasswordRules: {
        oldpassword: [
          {required:true,message: "请输入旧密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        newpassword: [
          {required:true,message: "请输入新密码", trigger: "blur" },
          {min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        confirmpassword: [
          { required:true,validator: validatePass, trigger: "blur" }
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
  methods: {
    filteremojifun(e, name, ruleForm) {
      this.$utils.filteremojifun(this, e, name, ruleForm);
    },
    close() {
      this.$refs["updatePasswordForm"].resetFields();
      this.$emit("closeupdatePasswordForm");
    },
    updatePassword(updatePasswordForm) {
      this.$refs[updatePasswordForm].validate(valid => {
        if (valid) {
          var updatePasswordForm = this.updatePasswordForm;
          this.$api.user
            .updatePassword(
              this.$utils.calcuMD5(updatePasswordForm.oldpassword),
              this.$utils.calcuMD5(updatePasswordForm.newpassword)
            )
            .then(res => {
              if (res.code == 200) {
                this.$toaster.ok(res.msg);
                this.updatePasswordForm = {
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
<style lang="scss" >
.updatePasswordForm {
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
.updatePassword {
  .el-dialog--center .el-dialog__body {
    text-align: initial;
    padding: 25px 25px 5px 10px;
  }
}
</style>
