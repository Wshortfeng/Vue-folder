<template>
  <div class="projectdetail content-padding">
    <div>
      <p class="secondTitle">项目基本信息：</p>
    </div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="ruleForm" v-loading="isloading1">
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
                  <div><span v-for="(item,index) in scope.row.content" :key="index">{{index+1}}）{{item.content}}&#X3000;</span></div>
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

    </el-form>

    <div v-if="showbatchlist">
      <div class="title">
        <p class="secondTitle">批次列表：</p>
        <div class="operation_box" style="padding-left:60px;height:23px;">
          <el-button :class="{operation_btn1:true,selectbtn:statusType ==item.value}" type="" size="mini" v-for="(item,index) in options" :key="index" @click="tapChange(item.value)">{{item.label}}</el-button>
        </div>
      </div>
      <div class="batch-list tablecontent" style="padding-left:60px;">
        <el-table :data="batchlist" border style="width: 100%" :header-cell-style="{background:'#f6f6f6',color:'#333333'}" v-loading="isloading2">
          <el-table-column prop="batchNumber" label="批次号" fixed>
            <template slot-scope="scope">
              <p>{{scope.row.batchNumber}}</p>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100px">
            <template slot-scope="scope">
              <p>{{statusType|projectdetailbatchstate}}</p>
            </template>
          </el-table-column>
          <el-table-column label="批次截止时间" width="160px">
            <template slot-scope="scope">
              <p>{{scope.row.expireDate|zhDatetime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100px">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'detail',scope.row.batchNumber,scope.row.status,scope.row.type)" v-if='statusType!=3||scope.row.type==2'>查看</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'checkaccept',scope.row.batchNumber)" v-if='statusType==3&&scope.row.type==1'>验收</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'settlement',scope.row.batchNumber)" v-if='statusType==6&&scope.row.type==1'>结算</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination v-show="batchlist.length>0&&total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
    <set-tlement-task :settlementtaskFormVisible="settlementtaskFormVisible" :showconsultation="showconsultation" :settlementtaskId="settlementtaskId" :title="title" @closesettlementtaskForm="closesettlementtaskForm" />
  </div>
</template>

<script>
import setTlementTask from "../../../components/settlementtask";
export default {
  name: "projectdetail",
  components: { setTlementTask },
  data() {
    return {
      settlementtaskFormVisible: false,
      showconsultation: false,
      settlementtaskId: 0,
      title: "是否确认结算？",
      isloading1: true,
      isloading2: true,
      showbatchlist: true,
      ruleForm: {
        projectName: ""
      },
      options: [
        // {
        //   value: "",
        //   label: "全部",
        //   isSelect: true
        // },
        {
          value: "1",
          label: "待分配"
        },
        {
          value: "2",
          label: "进行中"
        },
        {
          value: "3",
          label: "待验收"
        },
        {
          value: "4",
          label: "验收不通过"
        },
        {
          value: "5",
          label: "待仲裁"
        },
        {
          value: "6",
          label: "待结算"
        },
        {
          value: "7",
          label: "已完成"
        },
        {
          value: "8",
          label: "已失败"
        },
        {
          value: "9",
          label: "已过期"
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
      statusType: 1,
      batchlist: []
    };
  },
  created() {
    this.showbatchlist = true;
    var STATUS = this.$utils.getSession("PROJECTSTATUS");
    var ENTRY = this.$route.query.ENTRY;

    if (ENTRY == "LIST") {
      if (STATUS) {
        switch (STATUS) {
          case "1":
            this.showbatchlist = false;
            break;
          case "2":
            this.showbatchlist = false;
            break;
          case "3":
            this.showbatchlist = false;
            this.statusType = 1;
            break;
          case "4":
            this.statusType = 2;
            break;
          case "5":
            this.statusType = 3;
            break;
          case "6":
            this.statusType = 5;
            break;
          case "7":
            this.statusType = 6;
            break;
          case "8":
            this.statusType = 7;
            break;
          case "9":
            this.statusType = 8;
            break;
          case "10":
            this.statusType = 9;
            break;
          case "11":
            this.statusType = 4;
            break;
          default:
        }
      }
      this.$utils.setSession("STASTUSTYPE", this.statusType);
    } else {
      this.statusType = this.$utils.getSession("STASTUSTYPE")||1;
    }
  },
  mounted() {
    this.$api.project
      .getProject(this.$utils.getSession("projectId"))
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
    this.getProjectBatchList();
  },
  methods: {
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getProjectBatchList(this.statusType);
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
      this.$utils.setSession("STASTUSTYPE", index);
    },
    getProjectBatchList() {
      this.isloading2 = true;
      this.$api.project
        .getProjectBatchList(
          this.currentPage,
          this.pagesize,
          this.$utils.getSession("projectId"),
          this.statusType
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getProjectBatchList();
          } else {
            this.batchlist = res.data;
            this.isloading2 = false;
            if (this.statusType == 1) {
              this.total = 0;
            } else {
              this.total = res.pageInfo.total;
            }
          }
        });
    },
    operation(id, type, batchNumber, status,batchType) {
      if (status == 0) {
        this.$utils.setSession("batchId", 0);
      } else {
        this.$utils.setSession("batchId", id);
      }
      if (type == "detail") {
        if (this.statusType != 7||this.statusType != 3 ||batchType==2) {
          if(this.statusType<=7){
            var statusType = this.statusType*1+2
          }else if(this.statusType==8){
            var statusType = 12
          }else if(this.statusType==9){
            var statusType = 10
          }
          this.$utils.setSession("BATCHDETAILTYPE", batchType);
           this.$utils.setSession("BATCHDETAILSTATUS", statusType);
          this.$router.push({
            name: "批次详情",
          });
        } else {
          this.$utils.setSession(
            "LABELPROJECTID",
            this.$utils.getSession("projectId")
          );
          this.$utils.setSession("LABELPROJECTBATCHTASKID", id);
          this.$utils.setSession("LABELTYPE", 2);
          this.$router.push({
            name: "工作台"
          });
        }
      } else if (type == "checkaccept") {
        this.$utils.setSession(
          "LABELPROJECTID",
          this.$utils.getSession("projectId")
        );
        this.$utils.setSession("LABELPROJECTBATCHTASKID", id);
        this.$utils.setSession("LABELTYPE", 2);
        this.$router.push({
          name: "工作台"
        });
      } else if (type == "settlement") {
        this.settlementtaskId = id;
        this.title = `是否确认结算【${batchNumber}】批次？`;
        this.settlementtaskFormVisible = true;
      }
    }
  }
};
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style lang="less">
.projectdetail {
  width: 860px;
  margin: 0px auto;
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
  }
  .pagination {
    min-height: 30px;
  }
  .deepbackground .el-input.is-disabled .el-input__inner,
  .deepbackground
    .updateaccountForm
    .el-textarea.is-disabled
    .el-textarea__inner {
    background: transparent !important;
  }
}
</style>
