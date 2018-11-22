<template>
  <div class="application">
    <el-steps :active="5" align-center>
      <el-step title="1.项目描述" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="2.项目设置" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="3.标注资质" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="4.标注工具" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="5.验收设置" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="6.报酬方案" icon="el-icon-label-time1"></el-step>
      <el-step title="7.预览" icon="el-icon-label-time1"></el-step>
    </el-steps>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="160px" class="demo-ruleForm" v-loading="isloading">
      <ul class="application-con-ul">
        <li>
          <el-form-item label="标注单价（元/个）：" prop="labelPrice">
            <el-input-number v-model="ruleForm.labelPrice" :min="0" :max="99999999" :precision="2" :step="0.01"></el-input-number>
          </el-form-item>
          <el-form-item label="审核单价（元/个）：" prop="reviewPrice" v-if="acceptanceType!=1">
            <el-input-number v-model="ruleForm.reviewPrice" :min="0" :max="99999999" :precision="2" :step="0.01"></el-input-number>
          </el-form-item>
          <el-form-item label="会诊单价（元/个）：" prop="consultationPrice" v-if="acceptanceType==2&&isConsultation==1">
            <el-input-number v-model="ruleForm.consultationPrice" :min="0" :max="99999999" :precision="2" :step="0.01"></el-input-number>
          </el-form-item>
        </li>
      </ul>
      <div class="application-button">
        <el-form-item>
          <el-button type="primary" @click="stepto5()">上一步</el-button>
          <el-button type="primary" @click="stepto7('ruleForm')">下一步</el-button>
          <el-button style="border-color:#5A7CD0;" @click="resetForm('ruleForm')">&nbsp;重&nbsp;置&nbsp;</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-dialog title="是否保存草稿" :visible.sync="isSaveDraft" width="500px" center class="deepbackground">
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeSaveDraft(true)" class="mg_right">保 存</el-button>
        <el-button type="primary" @click="closeSaveDraft(false)">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "projectapplication",
  data() {
    return {
      isEdit: false,
      isSaveDraft: false,
      stepType: 1, //默认下一步
      isloading: false,
      acceptanceType: 1,
      isConsultation: 2,
      ruleForm: {
        labelPrice: "",
        reviewPrice: "",
        consultationPrice: "",
        id: "",
        token: "",
        step: 6
      },
      rules: {
        labelPrice: [
          {
            required: true,
            message: "请输入标注单价",
            trigger: "blur"
          }
        ],
        reviewPrice: [
          {
            required: true,
            message: "请输入审核单价",
            trigger: "blur"
          }
        ],
        consultationPrice: [
          {
            required: true,
            message: "请输入会诊单价",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState("user", ["token"])
  },
  created() {
    this.ruleForm.token = this.token;
  },
  mounted() {
    var projectEditId = sessionStorage.getItem("projectEditId"); // 获取修改时的项目id
    if (projectEditId == undefined || projectEditId == null) {
      this.ruleForm.id = "";
    } else {
      this.isloading = true;
      this.$refs["ruleForm"].resetFields();
      this.ruleForm.id = projectEditId;
      this.$api.project
        .getProject(this.ruleForm.id)
        .then(res => {
          if (res.code == 200) {
            if (res.data.bzProject.remark.match(RegExp(/6/))) {
              this.isEdit = true;
            } else {
              this.isEdit = false;
            }
            this.isloading = false;
            this.ruleForm.labelPrice = res.data.bzProject.labelPrice;
            this.ruleForm.reviewPrice = res.data.bzProject.reviewPrice;
            this.acceptanceType = res.data.bzProject.acceptanceType.toString();
            this.isConsultation = res.data.bzProject.isConsultation.toString();
            this.ruleForm.consultationPrice =
              res.data.bzProject.consultationPrice;
          } else {
            this.$toaster.error(res.msg);
          }
        })
        .catch(() => {});
    }
  },
  methods: {
    goTo() {
     var pathArr = this.$route.path.split("/");
      pathArr.splice(pathArr.length - 1, 1, `projecteditapplication${6 + this.stepType}`);
      pathArr = pathArr.join("/");
      if (sessionStorage.getItem("projectEditStatus")) {
        this.$router.push({
          path: pathArr
        });
      }
    },
    stepto5(formName) {
      // 上一步到5
      this.stepType = -1;
      if (this.isEdit) {
        // this.isSaveDraft = true;
        this.goTo();
      } else {
        this.goTo();
      }
    },
    closeSaveDraft(type) {
      if (type) {
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.$api.project
              .applyProject(this.ruleForm)
              .then(res => {
                if (res.code == 200) {
                  sessionStorage.setItem("projectEditId", res.data);
                  this.$toaster.ok("草稿保存成功");
                  this.goTo();
                } else {
                  this.$toaster.error(res.msg);
                }
              })
              .catch(() => {});
          } else {
            this.$toaster.error("草稿保存失败，请先完善项目信息");
            this.isSaveDraft = false;
            return false;
          }
        });
      } else {
        this.goTo();
      }
    },
    stepto7(formName) {
      // 下一步到7
      this.stepType = 1;
      if (this.isEdit) {
        // this.isSaveDraft = true;
        this.closeSaveDraft(true);
      } else {
        this.$refs["ruleForm"].validate(valid => {
          this.$refs["ruleForm"].validate(valid => {
            if (valid) {
              this.$api.project
                .applyProject(this.ruleForm)
                .then(res => {
                  if (res.code == 200) {
                    sessionStorage.setItem("projectEditId", res.data);
                    this.goTo();
                  } else {
                    this.$toaster.error(res.msg);
                  }
                })
                .catch(() => {});
            } else {
              return false;
            }
          });
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.labelPrice=0;
      this.ruleForm.reviewPrice=0;
      this.ruleForm.consultationPrice=0;
    }
  }
};
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style>
</style>
