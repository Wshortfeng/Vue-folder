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
          时间服务器
        </span>
      </div>
    </div>
    <div class="container-main">
      <div class="container-content tablecontent">
        <div class="tabelForm">
          <el-form ref="ruleForm" :model="ruleForm" class="demo-form-inline" :rules="ruleFormRules" label-width="90px">
            <el-checkbox v-model="ruleForm.isSynchro" class="el-form-item">与Internet时间服务器同步</el-checkbox>
            <el-form-item prop="serviceType" label="服务器：">
              <el-select v-model="ruleForm.serviceType" filterable placeholder="请选择服务器">
                <el-option label="asia.pool.ntp.org" value="1"></el-option>
                <el-option label="ntp.api.bz" value="2"></el-option>
                <el-option label="time.windows.com" value="3"></el-option>
              </el-select>
              <el-button type="primary" @click="timeSynchro(1)">立即更新</el-button>
            </el-form-item>
          </el-form>
          <div class="confirm-box">
            <el-button type="primary" @click="timeSynchro(2)" style="margin-right:60px;">确 定</el-button>
             <el-button  @click="close('ruleForm')">取 消</el-button>
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
    return {
      isloading: true,
      isSynchro: false,
      ruleForm: {
        serviceType: "",
        isSynchro: ""
      },
      ruleFormRules: {
        serviceType: [
          { required: true, message: "请选择服务器", trigger: "change" }
        ]
      }
    };
  },
  created() {},
  mounted() {
    this.getTimeService();
  },
  watch: {},
  methods: {
    getTimeService() {
      this.$api.systemsetup.getTimeService().then(res => {
        if (res.code == 200) {
          if (res.data.timeType) {
            if (res.data.isSynchro == 1) {
              this.ruleForm.isSynchro = true;
            } else {
              this.ruleForm.isSynchro = false;
            }
            this.close("ruleForm");
            this.ruleForm.serviceType = res.data.timeType.toString();
          }
        }
      });
    },
    timeSynchro(isNowSynchro) {
      //配置时间服务器
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          var ruleForm = this.ruleForm;
          if (ruleForm.isSynchro) {
            var isSynchro = 1;
          } else {
            var isSynchro = 2;
          }
          this.$api.systemsetup
            .timeSynchro(ruleForm.serviceType, isSynchro, isNowSynchro)
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
