<template>
  <div class="updateaccount">
    <el-dialog title="修改账号" :visible.sync="showupdateAccountForm" width="500px" @close="close" class="deepbackground" center>
      <el-form ref="updateaccountForm" :model="updateaccountForm" class="demo-form-inline updateaccountForm" :rules="updateaccountRules" label-width="100px">
        <el-form-item prop="oldaccount" label="原手机号：">
          <el-input v-model="updateaccountForm.oldaccount" placeholder="请输入手机号" disabled maxlength="11"></el-input>
        </el-form-item>
        <el-form-item prop="oldcode" label="验证码：">
          <el-input placeholder="请输入验证码" v-model="updateaccountForm.oldcode" maxlength="6">
            <a href="javascript:;" slot="append" class="unchecked-code" @click="onSubmit('old')" v-if="showOldCode">{{old_code}}</a>
            <a href="javascript:;" slot="append" class="unchecked-code" v-else>{{old_code}}</a>
          </el-input>
        </el-form-item>
        <el-form-item prop="newaccount" label="新手机号：">
          <el-input v-model="updateaccountForm.newaccount" placeholder="请输入新手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item prop="newcode" label="验证码：">
          <el-input placeholder="请输入验证码" v-model="updateaccountForm.newcode" maxlength="6">
            <a href="javascript:;" slot="append" class="unchecked-code" @click="onSubmit('new')" v-if="showNewCode">{{new_code}}</a>
            <a href="javascript:;" slot="append" class="unchecked-code" v-else>{{new_code}}</a>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateaccount('updateaccountForm')">确 定</el-button>
        <el-button type="primary" @click="close()">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
export default {
  name: "updateaccount",
  props: {
    // route object
    updateAccountFormVisible: {
      type: Boolean,
      default: false
    },
    oldaccount: {
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
    var isPhone1 = (rule, value, callback) => {
      //手机号验证
      if (!value) {
        return callback(new Error("请输入新手机号"));
      }
      if (!this.$utils.isString(value)) {
        return callback(new Error("新手机号为11个字符"));
      } else {
        if (!this.$utils.telphone(value)) {
          return callback(new Error("新手机号格式错误"));
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
    return {
      old_code: "获取验证码",
      new_code: "获取验证码",
      showupdateAccountForm: false,
      updateaccountForm: {
        oldaccount: "",
        oldcode: "",
        newaccount: "",
        newcode: ""
      },
      showNewCode: true,
      showOldCode: true,
      updateaccountRules: {
        oldaccount: [{ required: true, validator: isPhone, trigger: "blur" }],
        oldcode: [{ required: true, validator: isInt, trigger: "blur" }],
        newaccount: [{ required: true, validator: isPhone1, trigger: "blur" }],
        newcode: [{ required: true, validator: isInt, trigger: "blur" }]
      }
    };
  },
  watch: {
    updateAccountFormVisible(newValue, oldValue) {
      //监听父组件传来的值是否变化
      this.showupdateAccountForm = newValue;
    },
    oldaccount(newValue, oldValue) {
      //监听父组件传来的值是否变化
      this.updateaccountForm.oldaccount = newValue;
    }
  },
  created() {
    this.updateaccountForm.oldaccount = this.oldaccount;
  },
  methods: {
    close() {
      this.$refs["updateaccountForm"].resetFields();
      this.$emit("closeupdateAccountForm");
    },
    onSubmit(name) {
      var that = this;
      if (name == "old") {
        that.$api.user
          .getCode(that.updateaccountForm.oldaccount, 2)
          .then(res => {
            if (res.code == 200) {
              that.$toaster.ok("发送成功");
              that.old_code = "59s";
              var count1 = 58;
              var check1 = setInterval(function() {
                if (count1 == 0) {
                  that.old_code = "重新获取验证码";
                  that.showOldCode = true;
                } else {
                  that.old_code = count1 + "s";
                  that.showOldCode = false;
                }
                count1--;
                if (count1 == -1) {
                  clearInterval(check1);
                }
              }, 1000);
            } else {
              that.old_code = "获取验证码";
              that.showOldCode = true;
              clearInterval(check1);
              that.$toaster.error(res.msg);
            }
          });
      } else if (name == "new") {
        if (jQuery.trim(that.updateaccountForm.newaccount) == "") {
          that.$toaster.error("请先输入新手机号");
          return;
        } else {
          if (!that.$utils.telphone(that.updateaccountForm.newaccount)) {
            that.$toaster.error("新手机号格式错误");
            return;
          }
        }
        that.$api.user
          .getCode(that.updateaccountForm.newaccount, 1)
          .then(res => {
            if (res.code == 200) {
              that.$toaster.ok("发送成功");
              that.new_code = "59s";
              var count2 = 58;
              var check2 = setInterval(function() {
                if (count2 == 0) {
                  that.showNewCode = true;
                  that.new_code = "重新获取验证码";
                } else {
                  that.new_code = count2 + "s";
                  that.showNewCode = false;
                }
                count2--;
                if (count2 == -1) {
                  clearInterval(check2);
                }
              }, 1000);
            } else {
              that.showNewCode = true;
              that.new_code = "获取验证码";
              clearInterval(check2);
              that.$toaster.error(res.msg);
            }
          });
      }
    },
    updateaccount(updateaccountForm) {
      this.$refs[updateaccountForm].validate(valid => {
        if (valid) {
          var updateaccountForm = this.updateaccountForm;
          this.$api.user
            .updateAccount(
              updateaccountForm.oldaccount,
              updateaccountForm.oldcode,
              updateaccountForm.newaccount,
              updateaccountForm.newcode
            )
            .then(res => {
              if (res.code == 200) {
                this.$toaster.ok(res.msg);
                this.$utils.delAllStorage();
                this.$utils.delAllSession();
                this.$router.push({
                  name: "Login"
                });
                // this.$store.commit(
                //   "user/setAccount",
                //   updateaccountForm.newaccount
                // );
                this.updateaccountForm = {
                  oldaccount: updateaccountForm.newaccount,
                  oldcode: "",
                  newaccount: "",
                  newcode: ""
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
.updateaccountForm {
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
.updateaccount {
  .el-dialog--center .el-dialog__body {
    text-align: initial;
    padding: 25px 25px 5px 10px;
  }
}
</style>
