<template>
  <div class="application7">
    <el-steps :active="6" align-center>
      <el-step title="1.项目描述" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="2.项目设置" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="3.标注资质" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="4.标注工具" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="5.报酬方案" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="6.审核验收" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="7.预览" icon="el-icon-label-time1"></el-step>
    </el-steps>
    <el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="ruleForm" v-loading="isloading">
      <el-form-item label="项目名称：">
        <el-input v-model="projectapplicationdata.bzProject.projectName" disabled></el-input>
      </el-form-item>
      <el-form-item label="项目关键字：">
        <el-input v-model="projectapplicationdata.bzProject.productKey" disabled></el-input>
      </el-form-item>
      <el-form-item label="项目介绍：">
        <div v-html="projectapplicationdata.bzProject.productContent" class="textareaClass"></div>
      </el-form-item>

      <el-form-item label="任务总数：">
        <el-input v-model="projectapplicationdata.bzProject.taskTotal" disabled></el-input>
      </el-form-item>
      <el-form-item label="批次任务数：">
        <el-input v-model="projectapplicationdata.bzProject.batchTaskAmount" disabled></el-input>
      </el-form-item>
      <el-form-item label="批次任务时长：">
        <div class="inputClass">{{projectapplicationdata.bzProject.batchPeriod}} {{projectapplicationdata.bzProject.batchPeriodUnit|timeType}}</div>
      </el-form-item>
      <el-form-item label="项目时长：">
        <div class="inputClass">{{projectapplicationdata.bzProject.projectPeriod}} {{projectapplicationdata.bzProject.projectPeriodUnit|timeType}}</div>
      </el-form-item>
      <el-form-item label="验收方式：">
        <div class="inputClass">{{projectapplicationdata.bzProject.acceptanceType|acceptanceType}}</div>
      </el-form-item>

      <el-form-item label="标注资质：">
        <div v-if="typeNameList.length>0" v-for="(item,index) in typeNameList" :key="index">
          <el-row>
            <el-col :span="4" style="color:#A1A1A1;">{{item}}：</el-col>
            <el-col :span="20" class="elbtnbox">
              <el-button type="primary" size="mini" v-for="(i,indexi) in labelNameList[index]" :key="indexi">{{i.labelName}}</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form-item>

      <el-form-item label="图形标注工具：">
        <p class="elbtnbox">
          <el-button type="primary" size="mini" v-for="(item,index) in projectapplicationdata.projectLabelToolList" :key="index">{{item.toolName}}</el-button>
        </p>
      </el-form-item>

       <el-form-item label="字幕标注工具：">
        <div class="tablecontent" style="padding-top:13px;margin-bottom:20px;">
          <el-table :data="projectapplicationdata.projectQuestionList" border style="width: 100%" :header-cell-style="{background:'#f6f6f6',color:'#333333'}">
            <el-table-column label="字幕名称">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="left-start" :content="scope.row.subject">
                  <p slot="reference">{{scope.row.subject}}</p>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="字幕选项">
              <template slot-scope="scope">
                <el-popover placement="top-start" trigger="hover">
                  <div><span v-for="(item,index) in scope.row.content" :key="index">{{index+1}}）;{{item.content}}&#X3000;</span></div>
                  <p slot="reference"><span v-for="(item,index) in scope.row.content" :key="index">{{index+1}}）{{item.content}}&#X3000;</span></p>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="类型" width="100">
              <template slot-scope="scope">
                <p>{{scope.row.type|problemType}}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-form-item>


      <div v-if="projectapplicationdata.bzProject.acceptanceType==1">
        <el-form-item label="验收抽样率：">
          <div class="inputClass">{{projectapplicationdata.bzProject.reviewSamplingRate}}%</div>
        </el-form-item>
        <el-form-item label="验收通过率：">
          <div class="inputClass">{{projectapplicationdata.bzProject.acceptancePassRate}}%</div>
        </el-form-item>
      </div>
      <div v-else>
        <el-form-item label="审核时长：">
          <div class="inputClass">{{projectapplicationdata.bzProject.reviewPeriod}} {{projectapplicationdata.bzProject.reviewPeriodUnit|timeType}}</div>
        </el-form-item>
        <el-form-item label="审核抽样率：">
          <div class="inputClass">{{projectapplicationdata.bzProject.reviewSamplingRate}}%</div>
        </el-form-item>
        <el-form-item label="审核通过率：">
          <div class="inputClass">{{projectapplicationdata.bzProject.acceptancePassRate}}%</div>
        </el-form-item>
        <el-form-item label="审核资质：">
          <div v-if="reviewTypeNameList.length>0" v-for="(item,index) in reviewTypeNameList" :key="index">
            <el-row>
              <el-col :span="4" style="color:#A1A1A1;">{{item}}：</el-col>
              <el-col :span="20" class="elbtnbox">
                <el-button type="primary" size="mini" v-for="(i,indexi) in reviewLabelNameList[index]" :key="indexi">{{i.labelName}}</el-button>
              </el-col>
            </el-row>
          </div>
        </el-form-item>
        <el-form-item label="是否复审：">
          <div class="inputClass">{{projectapplicationdata.bzProject.isSecondReview|isSecondReview}}</div>
        </el-form-item>
        <el-form-item label="是否会诊：" v-if="projectapplicationdata.bzProject.isSecondReview==1">
          <div class="inputClass">{{projectapplicationdata.bzProject.isConsultation|isSecondReview}}</div>
        </el-form-item>
        <el-form-item label="疑难杂症会诊次数：" v-if="projectapplicationdata.bzProject.isSecondReview==1&&projectapplicationdata.bzProject.isConsultation==1">
          <el-input v-model="projectapplicationdata.bzProject.puzzleTimes" disabled></el-input>
        </el-form-item>
      </div>

      <el-form-item label="标注单价：">
        <div class="inputClass">{{projectapplicationdata.bzProject.labelPrice}}元/个</div>
      </el-form-item>
      <el-form-item label="审核单价：" v-if="projectapplicationdata.bzProject.acceptanceType==2">
        <div class="inputClass">{{projectapplicationdata.bzProject.reviewPrice}}元/个</div>
      </el-form-item>
       <el-form-item label="会诊单价：" v-if="projectapplicationdata.bzProject.acceptanceType==2&&projectapplicationdata.bzProject.isSecondReview==1&&projectapplicationdata.bzProject.isConsultation==1">
        <div class="inputClass">{{projectapplicationdata.bzProject.consultationPrice}}元/个</div>
      </el-form-item>

      <el-form-item>
        <div class="application-button" style="text-align:center;">
          <el-button type="primary" @click="stepto6()" style=" width: 120px;">上一步</el-button>
          <el-button type="primary" @click="applyUserProject()" style=" width: 120px;">&nbsp;提&nbsp;交&nbsp;</el-button>
        </div>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "projectapplication",
  data() {
    return {
      isloading: false,
      id: "",
      ruleForm: {},
      rules: {},
      labelNameList: [],
      typeNameList: [],
      reviewLabelNameList: [],
      reviewTypeNameList: [],
      projectapplicationdata: {
        bzProject: {
          projectName: "",
          productKey: "",
          productContent: "",
          taskTotal: "",
          batchTaskAmount: "",
          puzzleTimes: "",
          batchPeriod: "",
          batchPeriodUnit: "",
          reviewPeriod: "",
          reviewPeriodUnit: "",
          projectPeriod: "",
          projectPeriodUnit: "",
          isSecondReview: "",
          labelPrice: "",
          reviewPrice: "",
          consultationPrice: "",
          acceptanceType: "",
          reviewSamplingRate: "",
          acceptancePassRate: ""
        },
        labelList: [
          {
            labelName: "",
            typeName: ""
          }
        ],
        projectLabelToolList: [],
        projectQuestionList: [],
        reviewList: [
          {
            labelName: "",
            typeName: ""
          }
        ]
      }
    };
  },
  computed: {
    ...mapState("user", ["token"])
  },
  created() {},
  mounted() {
    var projectEditId = sessionStorage.getItem("projectEditId"); // 获取修改时的项目id
    if (projectEditId == undefined || projectEditId == null) {
      this.id = "";
    } else {
      this.isloading = true;
      this.$refs["ruleForm"].resetFields();
      this.id = projectEditId;
      this.$api.project
        .getProject(this.id)
        .then(res => {
          if (res.code == 200) {
            this.projectapplicationdata = res.data;
            var labelList = res.data.labelList;
            var reviewList = res.data.reviewList;
            var that = this;
            for (var i = 0; i < labelList.length; i++) {
              var indexb = that.typeNameList.indexOf(labelList[i].typeName);
              if (indexb > -1) {
                that.labelNameList[indexb].push(labelList[i]);
              } else {
                var a = [];
                a.push(labelList[i]);
                that.typeNameList.push(labelList[i].typeName);
                that.labelNameList.push(a);
              }
            }
            for (var i = 0; i < reviewList.length; i++) {
              var indexb = that.reviewTypeNameList.indexOf(
                reviewList[i].typeName
              );
              if (indexb > -1) {
                that.reviewLabelNameList[indexb].push(reviewList[i]);
              } else {
                var a = [];
                a.push(reviewList[i]);
                that.reviewTypeNameList.push(reviewList[i].typeName);
                that.reviewLabelNameList.push(a);
              }
            }
            this.isloading = false;
          } else {
            this.$toaster.error(res.msg);
          }
        })
        .catch(() => {});
    }
  },
  methods: {
    stepto6() {
      // 上一步到6
      if (sessionStorage.getItem("projectEditStatus")) {
        this.$router.push({
          path: "/project/myproject/projectedit/application6"
        });
      } else {
        this.$router.push({
          path: "/project/projectapplication/application6"
        });
      }
    },
    applyUserProject() {
      //提交申请
      console.log(this.id);
      this.$api.project
        .applyUserProject(this.id)
        .then(res => {
          if (res.code == 200) {
            sessionStorage.removeItem("projectEditId");
            this.$toaster.ok("提交成功");
            this.$store.commit("common/changeProjectNav", "1-1");
            this.$utils.setSession('PROJECTSTATUS',2);
            this.$router.push({
              path: "/project"
            });
          } else {
            this.$toaster.error(res.msg);
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style lang="less">
.application7 {
  .ruleForm {
    width: 700px;
    margin: 20px auto;
    .el-form-item {
      p {
        margin-top: 8px;
        line-height: 25px;
      }
    }
  }
  table {
    th,
    td {
      text-align: center;
      .cell {
        white-space: nowrap;
        width: 100%; /* IE6 需要定义宽度 */
        overflow: hidden;
        p {
          white-space: nowrap;
          width: 100%; /* IE6 需要定义宽度 */
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
