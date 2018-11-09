<template>
  <div class="application">
    <el-steps :active="1" align-center>
      <el-step title="1.项目描述" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="2.项目设置" icon="el-icon-label-time1"></el-step>
      <el-step title="3.标注资质" icon="el-icon-label-time1"></el-step>
      <el-step title="4.标注工具" icon="el-icon-label-time1"></el-step>
      <el-step title="5.验收设置" icon="el-icon-label-time1"></el-step>
      <el-step title="6.报酬方案" icon="el-icon-label-time1"></el-step>
      <el-step title="7.预览" icon="el-icon-label-time1"></el-step>
    </el-steps>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm" v-loading="isloading">
      <ul class="application-con-ul">
        <li>
          <el-form-item label="任务总数：" prop="taskTotal">
            <el-input-number v-model="ruleForm.taskTotal" :min="1" :max="99999999" :precision="0"></el-input-number>
          </el-form-item>
          <el-form-item label="批次任务数：" prop="batchTaskAmount">
            <el-input-number v-model="ruleForm.batchTaskAmount" :min="1" :max="ruleForm.taskTotal" :precision="0"></el-input-number>
          </el-form-item>
          <el-form-item label="批次任务时长：" prop="batchPeriod">
            <el-input-number v-model="ruleForm.batchPeriod" :min="1" :max="99999999" :precision="0" style="width: 75%;"></el-input-number>
            <el-select v-model="ruleForm.batchPeriodUnit" style="width: 22%;float: right;">
              <el-option label="周" value="1"></el-option>
              <el-option label="天" value="2"></el-option>
              <el-option label="小时" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="项目时长：" prop="projectPeriod">
            <el-input-number v-model="ruleForm.projectPeriod" :min="1" :max="99999999" :precision="0" style="width: 75%;"></el-input-number>
            <el-select v-model="ruleForm.projectPeriodUnit" style="width: 22%;float: right;">
              <el-option label="周" value="1" ></el-option>
              <el-option label="天" value="2"></el-option>
              <el-option label="小时" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="验收方式：" prop="acceptanceType">
            <el-select v-model="ruleForm.acceptanceType">
              <el-option label="直接验收" value="1" ></el-option>
              <el-option label="审核验收" value="2"></el-option>
            </el-select>
          </el-form-item>

        </li>
      </ul>
      <div class="application-button">
        <el-form-item>
          <el-button type="primary" @click="stepto1()">上一步</el-button>
          <el-button type="primary" @click="stepto3('ruleForm')">下一步</el-button>
          <el-button @click="resetForm('ruleForm') " style="border-color:#5A7CD0;">&nbsp;重&nbsp;置&nbsp;</el-button>
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
      ruleForm: {
        taskTotal: "",
        batchTaskAmount: "",
        batchPeriod: "",
        batchPeriodUnit: "1",
        projectPeriod: "",
        projectPeriodUnit: "1",
        id: "",
        token: "",
        step: 2,
        acceptanceType: 1
      },
      rules: {
        acceptanceType: [
          {
            required: true,
            message: "请选择验收方式"
          }
        ],
        taskTotal: [
          {
            required: true,
            message: "请输入任务总数",
            trigger: "blur"
          }
        ],
        batchTaskAmount: [
          {
            required: true,
            message: "请输入批次任务数",
            trigger: "blur"
          }
        ],
        batchPeriod: [
          {
            required: true,
            message: "请输入批次任务时长",
            trigger: "blur"
          }
        ],
        projectPeriod: [
          {
            required: true,
            message: "请输入项目时长",
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
            if (res.data.bzProject.remark.match(RegExp(/2/))) {
              this.isEdit = true;
            } else {
              this.isEdit = false;
            }
            this.ruleForm.taskTotal = res.data.bzProject.taskTotal;
            this.ruleForm.batchTaskAmount = res.data.bzProject.batchTaskAmount;
            this.ruleForm.batchPeriod = res.data.bzProject.batchPeriod;
            this.ruleForm.batchPeriodUnit = res.data.bzProject.batchPeriodUnit.toString();
            this.ruleForm.projectPeriod = res.data.bzProject.projectPeriod;
            this.ruleForm.projectPeriodUnit = res.data.bzProject.projectPeriodUnit.toString();
            this.ruleForm.acceptanceType = res.data.bzProject.acceptanceType.toString();

            this.isloading = false;
          } else {
            this.$toaster.error(res.msg);
          }
        })
        .catch(() => {});
    }
  },
  methods: {
    goTo() {
      if (sessionStorage.getItem("projectEditStatus")) {
        this.$router.push({
          path: `/project/myproject/projectedit/application${this.ruleForm
            .step + this.stepType}`
        });
      } else {
        this.$router.push({
          path: `/project/projectapplication/application${this.ruleForm.step +
            this.stepType}`
        });
      }
    },
    stepto1(formName) {
      // 上一步到1
      this.stepType = -1;
      if (this.isEdit) {
        // this.isSaveDraft = true;
        // this.closeSaveDraft(true)
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
    stepto3(formName) {
      // 下一步到3
      this.stepType = 1;
      if (this.isEdit) {
        // this.isSaveDraft = true;
        this.closeSaveDraft(true);
      } else {
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
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm.acceptanceType = "2";
      this.ruleForm.batchPeriodUnit= "1",
      this.ruleForm.projectPeriodUnit="1";
    }
  }
};
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style>
</style>
