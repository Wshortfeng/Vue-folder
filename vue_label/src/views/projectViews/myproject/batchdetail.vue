<template>
  <div class="batchdetail content-padding">
    <p style="margin-bottom:19px;font-size:16px;color:#666;">任务列表：</p>
    <div class="task-list tablecontent">
      <div style="border-bottom:1px solid #cec9c9;">
        <el-table :data="tasklist" border style="width: 100%" :header-cell-style="{background:'#f6f6f6',color:'#333333'}" v-loading="isloading">
          <el-table-column label="任务号">
            <template slot-scope="scope">
              <p>{{scope.row.taskNumber}}</p>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="120">
            <template slot-scope="scope">
              <p>{{scope.row.status|batchtaskstate1}}</p>
            </template>
          </el-table-column>
          <el-table-column label="医学图像">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start">
                <div>
                  <img :src="scope.row.image" :alt="scope.row.imageName">
                </div>
                <p slot="reference"> <img :src="scope.row.image" :alt="scope.row.imageName"></p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="批次截止时间" v-if="type==1">
            <template slot-scope="scope">
              <p>{{scope.row.expireDate|zhDatetime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.taskNumber,scope.row.data)" v-if='(scope.row.status!=5&&type==1)||scope.row.status==0'>查看</el-button>
              <el-button size="mini" type="text" @click="operationbtn('detail',scope.row.id)" v-if='scope.row.status!=5&&type==2'>查看</el-button>
              <el-button size="mini" type="text" @click="operationbtn('review',scope.row.id)" v-if='scope.row.status==5&&type==2'>验收</el-button>
              <el-button size="mini" type="text" @click="operationbtn('initiatearbitration',scope.row.id,scope.row.taskNumber)" v-if='scope.row.status==8&&type==2'>结算</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination v-show="tasklist.length>0&&total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="800px" center class="casedata">
      <p class="title">
        病历数据：
      </p>
      <span class="content">{{dialogcontent}}</span>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
    <el-dialog :title="title" :visible.sync="settlementtaskFormVisible" width="600px" @close="close" class="deepbackground" center>
      <el-form class="demo-form-inline settlementtaskForm" label-width="100px">
        <el-form-item label="标注报酬：">
          <el-input v-model="settlementtaskForm.totalTagging" maxlength="50" disabled></el-input>
        </el-form-item>
        <el-form-item label="初审报酬：">
          <el-input v-model="settlementtaskForm.totalFirstReview" maxlength="50" disabled></el-input>
        </el-form-item>
        <el-form-item label="复审报酬：">
          <el-input v-model="settlementtaskForm.totalSecondReview" maxlength="50" disabled></el-input>
        </el-form-item>
        <el-form-item label="总计：">
          <el-input :value="settlementtaskForm.totalTagging+settlementtaskForm.totalFirstReview+settlementtaskForm.totalSecondReview" maxlength="50" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="settlementtask()">确 定</el-button>
        <el-button type="primary" @click="close">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "batchdetail",
  data() {
    return {
      isloading: true,
      active: 1,
      status: "",
      currentPage: 1, //初始页
      pagesize: 9, //    每页的数据
      total: 1, //总数
      tasklist: [],
      dialogVisible: false,
      dialogcontent: "",
      type: 1,
      title: "",
      settlementtaskId: "",
      settlementtaskFormVisible: false, //是否结算弹框
      settlementtaskForm: {
        totalTagging: 0,
        totalFirstReview: 0,
        totalSecondReview: 0
      }
    };
  },
  created() {
    if (this.$utils.getSession("BATCHDETAILSTATUS")) {
      this.status = this.$utils.getSession("BATCHDETAILSTATUS");
      this.type = this.$utils.getSession("BATCHDETAILTYPE");
    } else {
      this.status = undefined;
    }
  },
  mounted() {
    this.getProjectBatchTaskList();
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getProjectBatchTaskList();
    },
    getProjectBatchTaskList() {
      this.$api.project
        .getProjectBatchTaskList(
          this.currentPage,
          this.pagesize,
          this.$utils.getSession("projectId"),
          this.$utils.getSession("batchId"),
          this.status
        )
        .then(res => {
          this.total = res.pageInfo.total;
          this.tasklist = res.data;
          this.isloading = false;
        });
    },
    operation(taskNumber, data) {
      //显示病历数据
      this.dialogcontent = data;
      this.dialogVisible = true;
    },
    operationbtn(type, id, taskNumber) {
      if (type == "detail" || type == "review") {
        this.$utils.setSession(
          "LABELPROJECTID",
          this.$utils.getSession("projectId")
        );
        this.$utils.setSession("LABELPROJECTBATCHTASKID", id);
        this.$utils.setSession("LABELTYPE", 1);
        this.$router.push({
          name: "BatchDeatilMarkingTool",
          query: {
            TYPE: "SPECIAL"
          }
        });
      } else {
        this.title = `是否确认结算【${taskNumber}】？`;
        this.settlementtaskId = id;
        this.$api.project.getSpecialBatchTaskAmount(id).then(res => {
          if (res.code == 200) {
            this.settlementtaskForm = res.data;
          }
        });
        this.settlementtaskFormVisible = true;
      }
    },
    close() {//关闭
      this.settlementtaskFormVisible = false;
      this.settlementtaskForm.totalTagging = 0;
      this.settlementtaskForm.totalFirstReview = 0;
      this.settlementtaskForm.totalSecondReview = 0;
    },
    settlementtask() {//结算
      this.$api.project
        .settleSpecialBatchTask(this.settlementtaskId)
        .then(res => {
          if (res.code == 200) {
            this.$toaster.ok("结算成功");
            this.getProjectBatchTaskList();
            this.close();
          } else {
            this.$toaster.error(res.msg);
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.batchdetail {
  .search-box {
    margin-bottom: 15px;
  }
  .task-list {
    // border: 1px solid #eee;
    .el-table--border::before {
      background-color: white !important;
      border-color: white !important;
    }
    min-height: 650px;
    table {
      th,
      td {
        text-align: center;
        .cell {
          white-space: nowrap;
          width: 100%; /* IE6 需要定义宽度 */
          overflow: hidden;
        }
        img {
          height: 23px;
          width: 23px;
        }
      }
    }
  }
  .settlementtaskForm {
    width: 500px;
    margin: 0 auto;
    .el-input.is-disabled .el-input__inner {
      color: white;
    }
  }
}
</style>
