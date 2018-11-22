<template>
  <div class="mylabeltask task">
    <div class="search-box">
      <el-input v-model="keyWord" placeholder="批次号、项目方、项目名称" class="keyword4" maxlength="50"></el-input>
      <el-button type="primary" @click="serchKey()" style="position:relative;right:5px;">搜索</el-button>
    </div>

    <div class="mytask-main">
      <div class="nav-box">
        <ul>
          <li v-for="(item,index) in navList" :key="index" @click="selectnav($event,item.value)" :class="{selectNav:item.value==status}">{{item.name}}</li>
        </ul>
      </div>
      <div :class="{listcontent:true,tablecontent:true,nobottom:tableData.length>=11}">
        <el-table :data="tableData" style="width: 100%" border :header-cell-style="{background:'#f6f6f6',color:'#333333'}" :class="{tasktable:status==13,tasktable1:status==12||status==11}">
          <el-table-column label="批次号">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.batchNumber">
                <p slot="reference"><span class="borderColor" @click="goTo(scope.row.id,scope.row.batchNumber)">{{scope.row.batchNumber}}</span></p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="项目方">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.company">
                <p slot="reference">{{scope.row.company}}</p>
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
          <el-table-column label="批次截止时间" v-if="status!=13" width="160px">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.expireDate|zhDatetime">
                <p slot="reference">{{scope.row.expireDate|zhDatetime}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="190px" v-if="status!=11&&status!=12&&status!=13">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'startlabel',scope.row.batchNumber,scope.row.projectId)" v-if="status==1">开始标注</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'giveuplabel',scope.row.batchNumber)" v-if="status==1">放弃标注</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'submission',scope.row.batchNumber)" v-if="status==1">提交</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'detail',scope.row.batchNumber,scope.row.projectId)" v-if="status!=1">查看</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'initiatereview',scope.row.batchNumber)" v-if="status==3">发起复审</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'initiatearbitration',scope.row.batchNumber)" v-if="status==7">发起仲裁</el-button>
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
  name: "mylabeltask",
  data() {
    return {
      navList: [
        // 1：待提交，2：审核中，3：初审未通过，4：待复审，5：复审未通过，6：待验收，7：验收未通过，8:待仲裁，9：待结算，10：完成，11：失败，12：过期，13：放弃
        {
          name: "待提交",
          value: 1
        },
        {
          name: "待初审",
          value: 2
        },
        {
          name: "初审未通过",
          value: 3
        },
        {
          name: "待复审",
          value: 4
        },
        // {
        //   name: "复审未通过",
        //   value: 5
        // },
        {
          name: "待验收",
          value: 6
        },
        {
          name: "验收未通过",
          value: 7
        },
        {
          name: "待仲裁",
          value: 8
        },
        {
          name: "待结算",
          value: 9
        },
        {
          name: "已完成",
          value: 10
        },
        {
          name: "已失败",
          value: 11
        },
        {
          name: "已过期",
          value: 12
        },
        {
          name: "已放弃",
          value: 13
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
    //   this.getUserLabelTaskList();
    // }
  },
  created() {
    this.status = this.$utils.getSession("LABELBATCHSTATUS") || 1;
    this.$utils.setSession("LABELBATCHSTATUS", this.status);
    this.getUserLabelTaskList();
  },
  methods: {
    goTo(id, batchNumber) {
      if (batchNumber) {
        this.$utils.setSession("LABELBATCHID", id);
        this.$router.push({
          name: "MyLabelTaskBatchDetail",
          query: {
            BATCHNUMBER: batchNumber
          }
        });
      } else {
        this.$utils.setSession("PROJECTID", id);
        this.$router.push({
          name: "LabelProjectLableReviewDetail"
        });
      }
    },
    selectnav(e, status) {
      this.status = status;
      this.currentPage = 1;
      this.$utils.setSession("LABELBATCHSTATUS", status);
      this.getUserLabelTaskList();
    },
    serchKey() {
      this.currentPage = 1;
      this.getUserLabelTaskList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getUserLabelTaskList();
    },
    getUserLabelTaskList() {
      this.$api.label
        .getUserLabelTaskList(
          this.currentPage,
          this.pagesize,
          this.keyWord,
          this.status
        )
        .then(res => {
          this.total = res.data.total;
          this.tableData = res.data.list;
        });
    },
    operation: function(id, name, batchNumber, projectId) {
      //操作
      if (name == "startlabel") {
        this.$utils.setSession("LABELPROJECTID", projectId);
        this.$utils.setSession("LABELPROJECTBATCHTASKID", id);
        this.$utils.setSession("LABELTYPE", 2);
        this.$router.push({
          name: "LabelMarkingTool"
        });
      } else if (name == "detail") {
        if (id == 0) {
          this.$utils.setSession("LABELBATCHID", id);
          this.$router.push({
            name: "MyLabelTaskBatchDetail",
            query: {
              BATCHNUMBER: batchNumber
            }
          });
        } else {
          this.$utils.setSession("LABELPROJECTID", projectId);
          this.$utils.setSession("LABELPROJECTBATCHTASKID", id);
          this.$utils.setSession("LABELTYPE", 2);
          this.$router.push({
            name: "LookLabelMarkingTool"
          });
        }
      } else if (name == "giveuplabel") {
        this.$confirm("是否确定放弃【" + batchNumber + "】的标注？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        })
          .then(() => {
            this.$api.label.abandonLabelBatchTask(id).then(res => {
              if (res.code == 200) {
                this.getUserLabelTaskList();
                this.$toaster.ok(res.msg);
              } else {
                this.$toaster.error(res.msg);
              }
            });
          })
          .catch(() => {});
      } else if (name == "submission") {
        this.$confirm("是否确定提交【" + batchNumber + "】的标注？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success"
        }).then(() => {
          this.$api.label.submitBatchTask(id).then(res => {
            if (res.code == 200) {
              this.getUserLabelTaskList();
              this.$toaster.ok(res.msg);
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      } else if (name == "initiatereview") {
        this.$confirm("是否确定发起复审【" + batchNumber + "】的标注？", "", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning"
        })
          .then(() => {
            this.$api.label.secondReviewBatchTask(id).then(res => {
              if (res.code == 200) {
                this.getUserLabelTaskList();
                this.$toaster.ok(res.msg);
              } else {
                this.$toaster.error(res.msg);
              }
            });
          })
          .catch(() => {
            this.$api.label.abandonSecondReview(id).then(res => {
              if (res.code == 200) {
                this.getUserLabelTaskList();
                this.$toaster.ok(res.msg);
              } else {
                this.$toaster.error(res.msg);
              }
            });
          });
      } else if (name == "initiatearbitration") {
        this.$confirm("是否确定发起仲裁【" + batchNumber + "】的标注？", "", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning"
        })
          .then(() => {
            this.$api.label.arbitrationBatchTask(id).then(res => {
              if (res.code == 200) {
                this.getUserLabelTaskList();
                this.$toaster.ok(res.msg);
              } else {
                this.$toaster.error(res.msg);
              }
            });
          })
          .catch(() => {
            this.$api.label.abandonArbitrationBatch(id).then(res => {
              if (res.code == 200) {
                this.getUserLabelTaskList();
                this.$toaster.ok(res.msg);
              } else {
                this.$toaster.error(res.msg);
              }
            });
          });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.mylabeltask {
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
              display: inline-block;
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
