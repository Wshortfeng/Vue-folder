<template>
  <div class="container  content-padding">
    <div class="container-header">
      <div class="container-header-content">
        <!-- <span class="back-box">
          <a href="javascript:;">
            <i class="el-icon-safetyproduction-fanhui"></i>
            <span>返回</span>
          </a>
        </span> -->
        <span class="conten-title">
          邮箱服务器
        </span>
      </div>
    </div>
    <div class="container-main">
      <div class="container-content tablecontent">
        <div class="tabelForm" style="width:820px;">
          <el-form ref="ruleForm" :model="ruleForm" class="demo-form-inline" :rules="ruleFormRules" label-width="180px">
            <el-form-item prop="smtpService" label="服务器：">
              <el-select v-model="ruleForm.smtpService" filterable placeholder="请选择服务器">
                <el-option label="smtp.qq.com" value="smtp.qq.com"></el-option>
                <el-option label="smtp.163.com" value="smtp.163.com"></el-option>
                <el-option label="smtp.tom.com" value="smtp.tom.com"></el-option>
              </el-select>
              <!-- <el-button type="primary" @click="emailSynchro(1)">立即更新</el-button> -->
            </el-form-item>
            <el-form-item prop="hairBox" label="发件箱：">
              <el-autocomplete class="inline-input" v-model="ruleForm.hairBox" :fetch-suggestions="hairBoxSearch" placeholder="请选择或输入发件箱地址"></el-autocomplete>
            </el-form-item>
            <el-form-item prop="username" label="用户名：">
              <el-input v-model="ruleForm.username" placeholder="请输入用户名" maxlength="50" class="min_input" @change="filteremojifun($event,'ruleForm','username')"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码：">
              <el-input v-model="ruleForm.password" placeholder="请输入密码" maxlength="50" class="min_input" type="password" @change="filteremojifun($event,'ruleForm','password')"></el-input>
            </el-form-item>
            <el-form-item prop="port" label="端口：">
              <el-input v-model.number="ruleForm.port" placeholder="请输入端口" maxlength="10" class="min_input"></el-input>
            </el-form-item>
            <el-form-item prop="mailTo" label="邮件发送地址：">
              <el-input v-model="ruleForm.mailTo" placeholder="请输入邮件发送地址" maxlength="50" class="min_input" @change="filteremojifun($event,'ruleForm','mailTo')"></el-input>
              <el-button type="primary" @click="emailSynchro(2)">测试发送邮件</el-button>
            </el-form-item>
          </el-form>
          <div class="confirm-box">
            <el-button type="primary" @click="emailSynchro(1)" style="margin-right:60px;">确 定</el-button>
            <el-button @click="close('ruleForm')">取 消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "timeserver",
  data() {
    var isEmail = (rule, value, callback) => {
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
    var isEmail1 = (rule, value, callback) => {
      //邮箱验证
      if (this.type == 2) {
        if (!value) {
          return callback(new Error("请输入邮件发送地址"));
        }
        if (!this.$utils.isEmail(value)) {
          return callback(new Error("电子邮箱格式错误"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var isPort = (rule, value, callback) => {
      //端口号验证
      if (this.type == 1) {
        if (!value) {
          return callback(new Error("请输入端口"));
        } else {
          if (!this.$utils.isPort(value)) {
            return callback(new Error("端口格式错误"));
          } else {
            callback();
          }
        }
      } else {
        callback();
      }
    };
    return {
      isloading: true,
      type: 1,
      ruleForm: {
        smtpService: "",
        hairBox: "",
        username: "",
        password: "",
        port: "",
        mailTo: ""
      },
      ruleFormRules: {
        smtpService: [
          { required: true, message: "请选择服务器", trigger: "change" }
        ],
        hairBox: [
          {
            required: true,
            validator: isEmail,
            trigger: "change"
          }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        port: [{ required: true, validator: isPort, trigger: "blur" }],
        mailTo: [
          {
            validator: isEmail1,
            trigger: "blur"
          }
        ]
      },
      emailArrs: [
        { value: "1509378532@qq.com" },
        { value: "1486918650@qq.com" }
      ]
    };
  },
  mounted() {
    this.getEmailServiceInfo();
  },
  methods: {
    filteremojifun(e, ruleForm, name) {
      //限制输入表情
      this[ruleForm][name] = this.$utils.filteremoji(e);
    },
    hairBoxSearch(queryString, cb) {
      //弹出已有邮箱
      //搜索邮箱
      var emailArrs = this.emailArrs;
      var results = queryString
        ? emailArrs.filter(this.createFilter(queryString))
        : emailArrs;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return emailArr => {
        return (
          emailArr.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },

    getEmailServiceInfo() {
      this.$api.systemsetup.getEmailServiceInfo().then(res => {
        if (res.code == 200) {
          this.close("ruleForm");
          this.ruleForm.password = res.data.password;
          this.ruleForm.mailTo = res.data.sendEmail;
          this.ruleForm.hairBox = res.data.hairBox;
          this.ruleForm.port = res.data.port;
          this.ruleForm.smtpService	 = res.data.smtpService	;
          this.ruleForm.username = res.data.username;
        }
      });
    },
    emailSynchro(type) {
      //配置邮箱服务器
      this.type = type;
      if (type == 1) {
        //邮箱更新
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            var ruleForm = this.ruleForm;
            this.$api.systemsetup
              .renewEmailService(
                ruleForm.smtpService,
                ruleForm.hairBox,
                ruleForm.username,
                ruleForm.password,
                ruleForm.port
              )
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
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
      } else if (type == 2) {
        //邮箱测试
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            var ruleForm = this.ruleForm;
            this.$api.systemsetup
              .sendEmailTest(
                ruleForm.smtpService,
                ruleForm.hairBox,
                ruleForm.username,
                ruleForm.password,
                ruleForm.mailTo
              )
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
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
    },
    close(ruleForm) {
      this.$refs[ruleForm].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
