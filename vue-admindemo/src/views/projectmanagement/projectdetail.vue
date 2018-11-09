<template>
  <div class="projectdetail-box content-padding">
    <div style="width:840px;margin:0 auto;">
      <div>
        <h5>项目基本信息：</h5>
        <br>
      </div>
      <el-form :model="delayForm" ref="delayForm" label-width="150px" class="delayForm" v-loading="isloading1">
        <el-form-item label="项目名称：">
          <el-input v-model="projectapplicationdata.bzProject.projectName" disabled></el-input>
        </el-form-item>
        <el-form-item label="项目关键字：">
          <el-input v-model="projectapplicationdata.bzProject.productKey" disabled></el-input>
        </el-form-item>
        <el-form-item label="项目介绍：" class="productContent">
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
              <el-col :span="3" style="color:#A1A1A1;">{{item}}：</el-col>
              <el-col :span="21" class="elbtnbox">
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
                    <div><span v-for="(item,index) in scope.row.content" :key="index">&#X3000;{{item.content}}&#X3000;</span></div>
                    <p slot="reference"><span v-for="(item,index) in scope.row.content" :key="index">&#X3000;{{item.content}}&#X3000;</span></p>
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
                <el-col :span="3" style="color:#A1A1A1;">{{item}}：</el-col>
                <el-col :span="21" class="elbtnbox">
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

      </el-form>

      <div v-if="showbatchlist">
        <div class="title">
          <p>批次列表：</p>
          <div class="operation_box" v-if="$route.query.USERTYPE!=2" style="height:90px;">
            <el-button style="margin-bottom:10px;margin-left:0;margin-right:10px;" :class="{operation_btn1:true,selectbtn:statusType ==item.value}" type="" size="mini" v-for="(item,index) in options" :key="index" @click="tapChange(item.value)">{{item.label}}</el-button>
          </div>
        </div>
        <div class="batch-list tablecontent">
          <el-table :data="batchlist" border style="width: 100%" :header-cell-style="{background:'#f6f6f6',color:'#333333'}" v-loading="isloading2">
            <el-table-column prop="batchNumber" label="批次号" width="250">
              <template slot-scope="scope">
                <p>{{scope.row.batchNumber}}</p>
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <p>{{statusType|projectdetailbatchstate}}</p>
              </template>
            </el-table-column>
            <el-table-column label="批次截止时间">
              <template slot-scope="scope">
                <p>{{scope.row.expireDate|zhDatetime}}</p>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="operation(scope.row.id,'detail',scope.row.batchNumber)" v-if='statusType!=3'>查看</el-button>
                <el-button size="mini" type="text" @click="operation(scope.row.id,'stop',scope.row.batchNumber)" v-if='(statusType!=3||statusType!=5||statusType!=7)&&statusType<=8&&scope.row.isStop==1'>暂停</el-button>
                <el-button size="mini" type="text" @click="operation(scope.row.id,'run',scope.row.batchNumber)" v-if='(statusType!=3||statusType!=5||statusType!=7)&&statusType<=8&&scope.row.isStop==2'>开启</el-button>
                <el-button size="mini" type="text" @click="operation(scope.row.id,'submitacceptance',scope.row.batchNumber)" v-if='statusType==5'>提交验收</el-button>
                <el-button size="mini" type="text" @click="operation(scope.row.id,'changeacceptance',scope.row.batchNumber)" v-if='statusType==7'>平台改判验收通过</el-button>
                <el-button size="mini" type="text" @click="operation(scope.row.id,'delay',scope.row.batchNumber,scope.row.expireDate)" v-if='statusType==0'>延期</el-button>
                <el-button size="mini" type="text" @click="operation(scope.row.id,'end',scope.row.batchNumber)" v-if='statusType==8'>结束</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination v-show="batchlist.length>0&&total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="title" :visible.sync="showdelayForm" width="500px" center class="deepbackground" @close="close('delayForm')">
      <el-form ref="delayForm" :model="delayForm" :rules="rules">
        <el-form-item prop="endDate" label="批次延长至：">
          <el-date-picker v-model="delayForm.endDate" type="datetime" placeholder="选择时间" default-time="23:59:59" :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmdelay('delayForm')">确 定</el-button>
        <el-button @click="close('delayForm')" type="primary">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "projectdetail",
  data() {
    return {
      isloading1: true,
      isloading2: true,
      showbatchlist: true,
      delayForm: {
        projectName: ""
      },
      // 0：待分配，1：待提交，2：审核中，3：初审未通过，4：待复审，5：复审未通过，6：待验收，7：验收未通过，8:待仲裁，9：待结算，10：完成，11：失败，12：过期，13：放弃
      options: [
        {
          value: "0",
          label: "待分配"
        },
        {
          value: "1",
          label: "待提交"
        },
        {
          value: "2",
          label: "审核中"
        },
        {
          value: "3",
          label: "初审未通过"
        },
        {
          value: "4",
          label: "待复审"
        },
        {
          value: "5",
          label: "复审未通过"
        },
        {
          value: "6",
          label: "待验收"
        },
        {
          value: "7",
          label: "验收未通过"
        },
        {
          value: "8",
          label: "待仲裁"
        },
        {
          value: "9",
          label: "待结算"
        },
        {
          value: "10",
          label: "已完成"
        },
        {
          value: "11",
          label: "已失败"
        },
        {
          value: "12",
          label: "已过期"
        },
        {
          value: "13",
          label: "已放弃"
        }
      ],
      batchType: "",
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 1, //总数
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
      },
      statusType: 0,
      batchlist: [],
      showdelayForm: false, //批次延期弹框1
      delayForm: {
        endDate: ""
      },
      rules: {
        endDate: [{ required: true, message: "请选择时间", trigger: "blur" }]
      },
      pickerOptions: {}, //选择时间前的限制
      batchId: "",
      title: "延期批次"
    };
  },
  mounted() {
    this.$api.project
      .getProject(this.$utils.getSession("PROJECTID"))
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
          this.isloading1 = false;
        } else {
          this.$toaster.error(res.msg);
        }
      });
    this.statusType = this.$utils.getSession("STASTUSTYPE") || 1;
    this.getProjectBatchList();
  },
  methods: {
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getProjectBatchList();
    },
    closesettlementtaskForm() {
      this.currentPage = 1;
      this.settlementtaskFormVisible = false;
      this.getProjectBatchList();
    },
    tapChange(index) {
      this.currentPage = 1;
      this.statusType = index;
      this.getProjectBatchList();
    },
    getProjectBatchList() {
      this.$utils.setSession("STASTUSTYPE", this.statusType);
      //获取批次详情
      this.isloading2 = true;
      if (this.$route.query.USERTYPE == 2) {
        //标注方批次列表
        this.$api.admin
          .getUserProjectBatchList(
            this.$route.query.ID,
            this.$utils.getSession("PROJECTID")
          )
          .then(res => {
            this.batchlist = res.data;
            this.isloading2 = false;
          });
      } else if (
        this.$route.query.USERTYPE == 1 ||
        this.$route.query.USERTYPE == 3
      ) {
        //项目方,项目管理批次列表
        this.$api.admin
          .getProjectBatch(
            this.currentPage,
            this.pagesize,
            this.$utils.getSession("PROJECTID"),
            this.statusType
          )
          .then(res => {
            if (this.currentPage != 1 && res.data.length == 0) {
              this.currentPage = this.currentPage - 1;
              this.getProjectBatchList();
            } else {
              this.batchlist = res.data;
              this.isloading2 = false;
              if (this.statusType == 0) {
                this.total = 0;
              } else {
                this.total = res.pageInfo.total;
              }
            }
          });
      }
    },
    operation(id, type, batchNumber, expireDate) {
      if (this.statusType == 0) {
        this.$utils.setSession("batchId", 0);
      } else {
        this.$utils.setSession("batchId", id);
      }

      if (type == "detail") {
        //查看
        if (this.statusType <= 2 || this.statusType > 7) {
          this.$router.push({
            name: "批次详情"
          });
        } else {
          this.$router.push({
            name: "工作台"
          });
        }
      } else if (type == "submitacceptance") {
        //提交验收
        this.$confirm("是否确定提交验收【" + batchNumber + "】批次？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        }).then(() => {
          this.$api.admin.submitBatchAcceptance(id).then(res => {
            if (res.code == 200) {
              this.$toaster.ok(res.msg);
              this.getProjectBatchList();
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      } else if (type == "stop") {
        //暂停
        this.$confirm("是否确定暂停【" + batchNumber + "】批次？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        }).then(() => {
          this.$api.admin.setBatchStopOrOpen(id, 1).then(res => {
            if (res.code == 200) {
              this.$toaster.ok(res.msg);
              this.getProjectBatchList();
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      } else if (type == "run") {
        //开启
        this.$confirm("是否确定开启【" + batchNumber + "】批次？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        }).then(() => {
          this.$api.admin.setBatchStopOrOpen(id, 2).then(res => {
            if (res.code == 200) {
              this.$toaster.ok(res.msg);
              this.getProjectBatchList();
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      } else if (type == "delay") {
        //延期
        this.batchId = id;
        this.pickerOptions = {
          disabledDate(time) {
            return time.getTime() < new Date(expireDate).getTime();
          }
        };
        this.title = `延期【${batchNumber}】批次`;
        this.showdelayForm = true;
      } else if (type == "end") {
        //结束
      } else if (type == "changeacceptance") {
        //平台改判验收通过
      }
    },
    confirmdelay(ruleForm) {
      //确定延期
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.$api.admin
            .setProjectBatchDelay(this.batchId, this.delayForm.endDate)
            .then(res => {
              if (res.code == 200) {
                this.$toaster.ok(res.msg);
                this.close(ruleForm);
                this.getProjectBatchList();
              } else {
                this.$toaster.error(res.msg);
              }
            });
        } else {
          return false;
        }
      });
    },
    close(ruleForm) {
      //关闭弹框
      this.$refs[ruleForm].resetFields();
      this["show" + ruleForm] = false;
    }
  }
};
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style lang="less">
.el-picker-panel__footer {
  .el-button--text {
    border: none !important;
  }
  .el-button--default {
    border: 1px solid #dcdfe6 !important;
    color: #606266 !important;
  }
}
.projectdetail-box {
  padding: 20px 40px 20px;
  .deepbackground {
    .el-dialog__body {
      padding: 25px 30px 25px 75px;
      .el-form-item__error {
        left: 105px;
      }
    }
    .el-button--primary {
      border-color: white;
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
  .el-form-item {
    margin-bottom: 10px;
  }
  .productContent {
    .el-form-item__content {
      line-height: 170%;
    }
  }
  .title {
    margin-top: 30px;
    margin-bottom: 0px;
    p {
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
  .pagination {
    min-height: 30px;
  }
}
</style>
