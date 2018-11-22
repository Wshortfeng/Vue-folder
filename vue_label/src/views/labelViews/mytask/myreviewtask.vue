<template>
  <div class="myreviewtask ">
    <div class="search-box">
      <el-input v-model="keyWord" placeholder="任务号、项目方、项目名称" class="keyword4 " maxlength="50"></el-input>
      <el-button type="primary" @click="serchKey()" style="position:relative;right:5px;">搜索</el-button>
    </div>

    <div class="mytask-main">
      <div class="nav-box">
        <ul>
          <li v-for="(item,index) in navList" :key="index" @click="selectnav($event,item.value)" :class="{selectNav:item.value==status}">{{item.name}}</li>
        </ul>
      </div>
      <div :class="{listcontent:true,tablecontent:true,nobottom:tableData.length>=11}">
        <el-table :data="tableData" style="width: 100%" border :header-cell-style="{background:'#f6f6f6',color:'#333333'}" :class="{tasktable:status==10||status==11}">
          <el-table-column label="任务号">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.taskNumber">
                <p slot="reference">{{scope.row.taskNumber}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="项目方">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.nickName">
                <p slot="reference">{{scope.row.nickName}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="项目名称">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.projectName">
                <p slot="reference"><span class="borderColor" @click="goTo(scope.row.projectId)">{{scope.row.projectName}}</span></p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="提交审核截止时间" v-if="status!=10&&status!=11" width="160px">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.endDate|zhDatetime">
                <p slot="reference">{{scope.row.endDate|zhDatetime}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220px" v-if="status!=10&&status!=11">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.taskReviewId,'review',scope.row.taskNumber,scope.row.projectId,scope.row.batchTaskId)" v-if="(status==1||status==3||status==4)&&scope.row.isAllow==1">审核</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.taskReviewId,'giveup',scope.row.taskNumber)" v-if="(status==1||status==3||status==4)&&scope.row.isAllow==1">放弃</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.taskReviewId,'detail',scope.row.taskNumber,scope.row.projectId,scope.row.batchTaskId)" v-if="status==2||status==5||status==6||status==7||status==8||status==9||(status==4&&scope.row.isAllow==2)||(status==3&&scope.row.isAllow==2)">查看</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.taskReviewId,'initiatearbitration',scope.row.taskNumber)" v-if="status==6">发起仲裁</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div class="pagination-box" style="height:40px;">
        <el-pagination v-show="tableData.length>0&&total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myreviewtask",
  data() {
    return {
      navList: [
        //1：待初审，2：初审未通过，3：待复审，4：待会诊，5：待验收，6：验收未通过，7：待仲裁，8：待结算，9：已完成，10,：已过期，11：已放弃

        {
          name: "待初审",
          value: 1
        },
        {
          name: "初审未通过",
          value: 2
        },
        {
          name: "待复审",
          value: 3
        },
        {
          name: "待会诊",
          value: 4
        },
        {
          name: "待验收",
          value: 5
        },
        {
          name: "验收未通过",
          value: 6
        },
        {
          name: "待仲裁",
          value: 7
        },
        {
          name: "待结算",
          value: 8
        },
        {
          name: "已完成",
          value: 9
        },
        {
          name: "已失败",
          value: 12
        },
        {
          name: "已过期",
          value: 10
        },
        {
          name: "已放弃",
          value: 11
        }
      ],
      keyWord: "",
      status: 1,
      currentPage: 1, //初始页
      pagesize: 11, //    每页的数据
      total: 0, //总数
      tableData: []
    };
  },
  watch: {
    // keyWord(value) {
    //   this.currentPage = 1;
    //   this.getUserReviewTaskList();
    // }
  },
  created() {
    this.status = this.$utils.getSession("LABELREVIEWTASKSTATUS") || 1;
    this.getUserReviewTaskList();
  },
  methods: {
    goTo(id) {
      this.$utils.setSession("PROJECTID", id);
      this.$router.push({
        name: "ReviewProjectLableReviewDetail"
      });
    },
    selectnav(e, status) {
      this.status = status;
      this.currentPage = 1;
      this.$utils.setSession("LABELREVIEWTASKSTATUS", status);
      this.getUserReviewTaskList();
    },
    serchKey() {
      this.currentPage = 1;
      this.getUserReviewTaskList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getUserReviewTaskList();
    },
    getUserReviewTaskList() {
      this.$api.label
        .getUserReviewTaskList(
          this.currentPage,
          this.pagesize,
          this.keyWord,
          this.status
        )
        .then(res => {
          this.total = res.pageInfo.total;
          this.tableData = res.data;
        });
    },
    operation: function(
      taskReviewId,
      name,
      taskNumber,
      projectId,
      batchTaskId
    ) {
      //操作
      if (name == "review" || name == "detail") {
        this.$utils.setSession("LABELPROJECTID", projectId);
        this.$utils.setSession("LABELPROJECTBATCHTASKID", batchTaskId);
        this.$utils.setSession("LABELTYPE", 1);
        this.$router.push({
          name: "ReviewMarkingTool"
        });
      } else if (name == "giveup") {
        this.$confirm("是否确定放弃【" + taskNumber + "】的审核？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        })
          .then(() => {
            this.$api.label.abandonReviewTask(taskReviewId, 1).then(res => {
              if (res.code == 200) {
                this.getUserReviewTaskList();
                this.$toaster.ok(res.msg);
              } else {
                this.$toaster.error(res.msg);
              }
            });
          })
          .catch(() => {});
      } else if (name == "initiatearbitration") {
        this.$confirm("是否确定【" + taskNumber + "】发起仲裁？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // this.$api.project.upAndDownProject(id).then(res => {
            //   this.getUserReviewTaskList();
            //   this.$message({
            //     type: "success",
            //     message: "提交成功!"
            //   });
            // });
          })
          .catch(() => {});
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.myreviewtask {
  padding-left: 80px;
  padding-right: 80px;
  padding-top: 40px;
  padding-bottom: 40px;
  .search-box {
    height: 40px;
  }
  .mytask-main {
    .nav-box {
      box-sizing: border-box;
      display: inline-block;
      width: 240px;
      height: 662px;
      ul {
        float: left;
        width: 240px;
        border-right: none;
        border: 1px solid #eff2f5;
        border-radius: 5px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        li {
          border-bottom: 1px solid #eff2f5;
          font-size: 16px;
          text-align: center;
          height: 55px;
          line-height: 55px;
          cursor: pointer;
        }
        li:last-child {
          border: none;
        }
        li:hover {
          background: #5a7cd0;
          color: white;
        }
      }
    }
    .listcontent {
      position: relative;
      float: right;
      box-sizing: border-box;
      width: 800px;
      height: 662px;
      border: 1px solid #cec9c9;
      border-left: none;

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
      .pageTap {
        margin-top: 15px;
        position: absolute;
        right: 0;
      }
    }
  }
}
</style>
