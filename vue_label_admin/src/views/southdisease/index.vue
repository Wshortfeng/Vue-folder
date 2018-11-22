<template>
  <div class="southdisease  content-padding">
    <div class="search-box">
      <span>关键字：</span>
      <el-input v-model="keyWord" placeholder="请输入项目号、任务号" class="keyword mg_right" maxlength="50"></el-input>
      <span>状态：</span>
      <el-select v-model="status" placeholder="请选择" class="mg_right keyword3">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="serchKey()">搜索</el-button>
    </div>
    <div class="southdisease-main">
      <div class="southdisease-content tablecontent">
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#f6f6f6',color:'#333333'}" v-loading="isloading">
          <el-table-column prop="taskNumber" label="项目号">
          </el-table-column>
          <el-table-column prop="taskNumber" label="任务号">
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <p>{{scope.row.status|batchtaskstate}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id, 'detail',scope.row.taskNumber)" v-if="permission3_1_1||isAdmin">查看</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id, 'artificialdistribution',scope.row.taskNumber)" v-if="(permission3_1_2||isAdmin)&&scope.row.status==4&&scope.row.usePerson==1">人工分配</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id, 'delay',scope.row.taskNumber,scope.row.endDate)" v-if="(permission3_1_3||isAdmin)&&scope.row.status==4&&scope.row.usePerson==2">延期</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id, 'stop',scope.row.taskNumber)" v-if="(permission3_1_4||isAdmin)&&(scope.row.status==4||scope.row.status==5||scope.row.status==8)&scope.row.isStop==1">暂停</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id, 'run',scope.row.taskNumber)" v-if="(permission3_1_5||isAdmin)&&(scope.row.status==4||scope.row.status==5||scope.row.status==8)&scope.row.isStop==2">开启</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id, 'end',scope.row.taskNumber)" v-if="(permission3_1_6||isAdmin)&&scope.row.status==7">结束</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="tableData.length>0&&total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 人工分配弹框 -->
    <el-dialog :title="title" :visible.sync="showartificialdistribution" width="500px" center class="deepbackground" @close="close('artificialdistribution')">
      <el-form ref="artificialdistribution" :model="artificialdistribution" :rules="rules">
        <el-form-item prop="userId" label="指定标注员：">
          <el-select v-model="artificialdistribution.userId" placeholder="请选择标注员" style="width：250px !important; ">
            <el-option v-for="(item,index) in labeluserdata" :key="index" :label="item.nickName" :value="item.userId">
              <span style="float: left">{{ item.nickName }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.professionalTitle|professionalTitleType }}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmForm('artificialdistribution')">确 定</el-button>
        <el-button @click="close('artificialdistribution')" type="primary">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 延期 -->
    <el-dialog :title="title1" :visible.sync="showdelayForm" width="500px" center class="deepbackground" @close="close('delayForm')">
      <el-form ref="delayForm" :model="delayForm" :rules="rules" style="padding-left:30px;">
        <el-form-item prop="endDate" label="审核延长至：">
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
  name: "southdisease",
  data() {
    return {
      isloading: false,
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "4",
          label: "待会诊"
        },
        {
          value: "5",
          label: "待验收"
        },
        {
          value: "6",
          label: "验收未通过"
        },
        {
          value: "7",
          label: "待仲裁"
        },
        {
          value: "8",
          label: "待结算"
        },
        {
          value: "9",
          label: "已完成"
        }
      ],
      status: "",
      keyWord: "",
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 0, //总数
      tableData: [],
      showartificialdistribution: false,
      title: "",
      artificialdistribution: {
        userId: ""
      },
      rules: {
        userId: [{ required: true, message: "请选择标注员", trigger: "change" }]
      },
      labeluserdata: [], //标注员
      batchTaskId: "",
      permission3_1_1: false,
      permission3_1_2: false,
      permission3_1_3: false,
      permission3_1_4: false,
      permission3_1_5: false,
      permission3_1_6: false,
      showdelayForm: false, //审核延期弹框
      delayForm: {
        endDate: ""
      },
      rules: {
        endDate: [{ required: true, message: "请选择时间", trigger: "blur" }]
      },
      pickerOptions: {}, //选择时间前的限制
      title1: "审核延期"
    };
  },
  watch: {
    // keyWord() {
    //   this.currentPage = 1;
    //   this.getPuzzleList();
    // },
    status() {
      this.currentPage = 1;
      this.getPuzzleList();
    }
  },
  created() {
    //  this.permission = this.$utils.getStorage('PERMISSION');
    if (this.$utils.getStorage("PERMISSION")) {
      var permissionArr = this.$utils.getStorage("PERMISSION").split(",");
      for (var i = 0; i < permissionArr.length; i++) {
        this[permissionArr[i]] = true;
      }
    } else {
      this.isAdmin = true;
    }
  },
  mounted() {
    this.getPuzzleList();
  },
  methods: {
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getPuzzleList();
    },
    serchKey() {
      this.currentPage = 1;
      this.getPuzzleList();
    },
    getPuzzleList() {
      this.isloading = true;
      this.$api.admin
        .getPuzzleList(
          this.currentPage,
          this.pagesize,
          this.keyWord,
          this.status
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getPuzzleList();
          } else {
            this.total = res.pageInfo.total;
            this.tableData = res.data;
            this.isloading = false;
          }
        });
    },
    operation: function(taskId, name, taskNumber,endDate) {
      //操作
      if (name == "detail") {
        this.$utils.setSession("taskId", taskId);
        this.$router.push({
          name: "SouthDiseaseLabelViewsMarkingTool"
        });
      } else if (name == "artificialdistribution") {
        //人工分配
        this.batchTaskId = taskId;
        this.getAllAchieveQualificationUser();
        this.title = `人工分配【${taskNumber}】任务`;
        this.showartificialdistribution = true;
      } else if(name == "delay"){
         this.batchTaskId = taskId;
          this.pickerOptions = {
          disabledDate(time) {
            return time.getTime() <= endDate;
          }
        };
        this.title1 = `延期审核【${taskNumber}】任务`;
        this.showdelayForm = true;
      }else if (name == "stop") {
        this.$confirm("是否确定暂停【" + taskNumber + "】任务？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$api.admin.stopAndOpenPuzzleTask(taskId, 1).then(res => {
            if (res.code == 200) {
              this.getPuzzleList();
              this.$toaster.ok(res.msg);
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      } else if (name == "run") {
        this.$confirm("是否确定开启【" + taskNumber + "】任务？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$api.admin.stopAndOpenPuzzleTask(taskId, 2).then(res => {
            if (res.code == 200) {
              this.getPuzzleList();
              this.$toaster.ok(res.msg);
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      } else if (name == "end") {
        this.$confirm("是否确定结束【" + taskNumber + "】任务？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$api.admin.puzzleArbitrationResult(taskId).then(res => {
            if (res.code == 200) {
              this.getPuzzleList();
              this.$toaster.ok(res.msg);
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      }
    },
    getAllAchieveQualificationUser() {
      this.$api.admin
        .getAllAchieveQualificationUser(this.batchTaskId)
        .then(res => {
          this.labeluserdata = res.data;
        });
    },
    confirmForm(ruleForm) {
      //确定指定标注员
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.$api.admin
            .distributionReviewTask(
              this.batchTaskId,
              this.artificialdistribution.userId,
              3
            )
            .then(res => {
              if (res.code == 200) {
                this.$toaster.ok(res.msg);
                this.close(ruleForm);
                this.getPuzzleList();
              } else {
                this.$toaster.error(res.msg);
              }
            });
        } else {
          return false;
        }
      });
    },
    confirmdelay(ruleForm) {
      //确定延期
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          this.$api.admin
            .setReviewTaskDelay( this.batchTaskId, this.$utils.zhDatetime(this.delayForm.endDate))
            .then(res => {
              if (res.code == 200) {
                this.$toaster.ok(res.msg);
                this.close(ruleForm);
                this.getPuzzleList();
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.southdisease {
  height: 100%;
  overflow: hidden;
  .deepbackground {
    .el-dialog__body {
      padding: 30px 20px 10px 40px;
      .el-form-item__error {
        left: 105px;
      }
    }
    .el-button--primary {
      border-color: white;
    }
    .el-select-dropdown__item,
    .el-select .el-input__inner {
      width: 300px;
    }
  }
  .el-tabs {
    height: 41px;
  }
  .southdisease-main {
    border-top: none;
    position: relative;
    padding-bottom: 50px;
    .southdisease-content {
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
            img {
              height: 23px;
              width: 23px;
            }
          }
        }
      }
      .pageTap {
        margin-top: 15px;
        position: absolute;
        right: 0;
      }
      .search-box {
        padding-top: 15px;
        margin-top: 0;
        padding-bottom: 10px;
        padding-left: 15px;
        position: relative;
      }
    }
  }
}
</style>
