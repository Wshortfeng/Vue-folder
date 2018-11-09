<template>
  <div class="systemsetup  content-padding">
    <div class="systemsetup-main">
      <el-form ref="ruleForm" :model="ruleForm" class="demo-form-inline ruleForm" :rules="ruleFormRules" label-width="125px">
        <el-form-item label="自动验收时长：" prop="acceptancePeriod">
          <el-input-number v-model="ruleForm.acceptancePeriod" :min="0"  :max="99999999" :precision="0" style="width: 75%;"></el-input-number>
          <el-select v-model="ruleForm.acceptancePeriodUnit" style="width: 22%;float: right;">
            <el-option label="周" value="1" selected="selected"></el-option>
            <el-option label="天" value="2"></el-option>
            <el-option label="小时" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="提交复审时长：" prop="firstReviewFailPeriod">
          <el-input-number v-model="ruleForm.firstReviewFailPeriod" :min="0"  :max="99999999" :precision="0" style="width: 75%;"></el-input-number>
          <el-select v-model="ruleForm.firstReviewFailPeriodUnit" style="width: 22%;float: right;">
            <el-option label="周" value="1" selected="selected"></el-option>
            <el-option label="天" value="2"></el-option>
            <el-option label="小时" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发起仲裁时长：" prop="arbitrationPeriod">
          <el-input-number v-model="ruleForm.arbitrationPeriod" :min="0"  :max="99999999" :precision="0" style="width: 75%;"></el-input-number>
          <el-select v-model="ruleForm.arbitrationPeriodUnit" style="width: 22%;float: right;">
            <el-option label="周" value="1" selected="selected"></el-option>
            <el-option label="天" value="2"></el-option>
            <el-option label="小时" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="自动结算时长：" prop="settlementPeriod">
          <el-input-number v-model="ruleForm.settlementPeriod" :min="0"  :max="99999999" :precision="0" style="width: 75%;"></el-input-number>
          <el-select v-model="ruleForm.settlementPeriodUnit" style="width: 22%;float: right;">
            <el-option label="周" value="1" selected="selected"></el-option>
            <el-option label="天" value="2"></el-option>
            <el-option label="小时" value="3"></el-option>
          </el-select>
        </el-form-item>
        <div style="text-align:center;">
          <el-button type="primary" @click="confirm('ruleForm')" v-if="permission7_5_1||isAdmin">保存</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "systemsetup",
  data() {
    return {
      isloading: false,
      ruleForm: {
        acceptancePeriod: "2",
        acceptancePeriodUnit: "1",
        firstReviewFailPeriod: "",
        firstReviewFailPeriodUnit: "1",
        arbitrationPeriod: "",
        arbitrationPeriodUnit: "1",
        settlementPeriod: "",
        settlementPeriodUnit: "1"
      },
      ruleFormRules: {
        acceptancePeriod: [
          { required: true, message: "请输入自动验收时长", trigger: "blur" }
        ],
        firstReviewFailPeriod: [
          { required: true, message: "请输入提交复审时长", trigger: "blur" }
        ],
        arbitrationPeriod: [
          { required: true, message: "请输入发起仲裁时长", trigger: "blur" }
        ],
        settlementPeriod: [
          { required: true, message: "请输入自动结算时长", trigger: "blur" }
        ]
      },
      permission7_5_1:false,
    };
  },
  watch: {
  },
  created() {
     if (this.$utils.getStorage('PERMISSION')) {
       var permissionArr = this.$utils.getStorage('PERMISSION').split(",");
      for (var i = 0; i < permissionArr.length; i++) {
        this[permissionArr[i]] = true;
      }
    } else {
      this.isAdmin = true;
    }
  },
  mounted() {
    this.getQualificationTag();
  },
  methods: {
    getQualificationTag() {
      this.$api.admin.getQualificationTag().then(res => {
        if (res.code == 200) {
          if (res.data) {
          this.$refs["ruleForm"].resetFields();
            this.ruleForm.acceptancePeriod = res.data.acceptancePeriod;
            this.ruleForm.acceptancePeriodUnit = res.data.acceptancePeriodUnit.toString();
            this.ruleForm.firstReviewFailPeriod =res.data.firstReviewFailPeriod;
            this.ruleForm.firstReviewFailPeriodUnit = res.data.firstReviewFailPeriodUnit.toString();
            this.ruleForm.arbitrationPeriod = res.data.arbitrationPeriod;
            this.ruleForm.arbitrationPeriodUnit = res.data.arbitrationPeriodUnit.toString();
            this.ruleForm.settlementPeriod = res.data.settlementPeriod;
            this.ruleForm.settlementPeriodUnit = res.data.settlementPeriodUnit.toString();
          }
        } else {
          this.$toaster.error(res.msg);
        }
      });
    },
    confirm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.$api.admin.setSystemSetting(this.ruleForm).then(res => {
            if (res.code == 200) {
              this.$toaster.ok(res.msg);
              this.getQualificationTag();
            } else {
              this.$toaster.error(res.msg);
            }
          });
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
<style lang="less">
.systemsetup {
  height:100%;
  overflow: hidden;
  .el-tabs {
    height: 41px;
  }
  .systemsetup-main {
    width: 600px;
    margin: 50px auto;
  }
}
</style>
