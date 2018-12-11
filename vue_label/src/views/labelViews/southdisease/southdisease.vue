<template>
  <div class="southdisease  content-padding">
    <div class="search-box">
      <span>关键字：</span>
      <el-input v-model="keyWord" placeholder="请输入项目号、任务号" class="keyword mg_right" maxlength="50"></el-input>
      <span>状态：</span>
      <el-select v-model="status" placeholder="请选择" class="mg_right">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="serchKey()">搜索</el-button>
    </div>
    <div class="southdisease-list tablecontent">
      <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#f6f6f6',color:'#333333'}" v-loading="isloading">
        <el-table-column prop="projectNumber" label="项目号">
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
            <el-button size="mini" type="text" @click="operation(scope.row.id, 'review',scope.row.taskNumber,scope.row.isStop,scope.row.projectId)" v-if="scope.row.status==9&&userId==scope.row.reviewUserId&&scope.row.isAllow==1">审核</el-button>
            <el-button size="mini" type="text" @click="operation(scope.row.id, 'detail',scope.row.taskNumber,scope.row.isStop,scope.row.projectId)" v-else>查看</el-button>
            <el-button size="mini" type="text" @click="operation(scope.row.id, 'nitiatearbitration',scope.row.taskNumber,scope.row.isStop)" v-if="scope.row.status==12">发起仲裁</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-show="tableData.length>0&&total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
      </el-pagination>
    </div>
    <set-tlement-task :settlementtaskFormVisible="settlementtaskFormVisible" :showconsultation="showconsultation" :settlementtaskId="settlementtaskId" :title="title" @closesettlementtaskForm="closesettlementtaskForm" />
  </div>
</template>

<script>
import setTlementTask from "../../../components/settlementtask";

import { mapState } from "vuex";
export default {
  name: "southdisease",
  components: { setTlementTask },
  data() {
    return {
      settlementtaskFormVisible: false,
      isloading: true,
      showconsultation: true,
      settlementtaskId: 0,
      title: "是否确认结算？",
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "9",
          label: "待会诊"
        },
        {
          value: "10",
          label: "待验收"
        },
        {
          value: "12",
          label: "验收未通过"
        },
        {
          value: "13",
          label: "待仲裁"
        },
        {
          value: "14",
          label: "待结算"
        },
        {
          value: "15",
          label: "已完成"
        },
        {
          value: "16",
          label: "已过期"
        },
        {
          value: "17",
          label: "已放弃"
        },
        {
          value: "18",
          label: "已失败"
        }
      ],
      status: "",
      keyWord: "",
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 0, //总数
      tableData: []
    };
  },
  watch: {
    // keyWord() {
    //   this.currentPage = 1;
    //   this.getUserPuzzleTaskList();
    // },
    status() {
      this.currentPage = 1;
      this.getUserPuzzleTaskList();
    }
  },
  computed: {
    ...mapState("user", ["userId"])
  },
  mounted() {
    this.getUserPuzzleTaskList();
  },
  methods: {
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getUserPuzzleTaskList();
    },
    serchKey() {
      this.currentPage = 1;
      this.getUserPuzzleTaskList();
    },
    getUserPuzzleTaskList() {
      this.isloading = true;
      this.$api.label
        .getUserPuzzleTaskList(
          this.currentPage,
          this.pagesize,
          this.keyWord,
          this.status
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getUserPuzzleTaskList();
          } else {
            this.total = res.pageInfo.total;
            this.tableData = res.data;
            this.isloading = false;
          }
        });
    },
    operation: function(id, name, taskNumber, isStop, projectId) {
      //操作
      if (name == "detail") {
        this.$utils.setSession("LABELPROJECTID", projectId);
        this.$utils.setSession("LABELPROJECTBATCHTASKID", id);
        this.$utils.setSession("LABELTYPE", 1);
        this.$router.push({
          name: "SouthDiseaseLabelViewsMarkingTool"
        });
      } else if (name == "review") {
        if (isStop == 2) {
          this.$toaster.error("该疑难杂症任务已被暂停，暂时无法审核");
        } else {
          this.$utils.setSession("LABELPROJECTID", projectId);
          this.$utils.setSession("LABELPROJECTBATCHTASKID", id);
          this.$utils.setSession("LABELTYPE", 1);
          this.$router.push({
            name: "SouthDiseaseLabelViewsMarkingTool"
          });
        }
      } else if (name == "nitiatearbitration") {
        if (isStop == 2) {
          this.$toaster.error("该疑难杂症任务已被暂停，暂时无法发起仲裁");
        } else {
          this.$confirm("是否确定【" + taskNumber + "】任务发起仲裁？", "", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.$api.label.arbitrationPuzzleTask(id).then(res => {
              if (res.code == 200) {
                this.getUserPuzzleTaskList();
                this.$toaster.ok(res.msg);
              } else {
                this.$toaster.error(res.msg);
              }
            });
          });
        }
      }
    },
    closesettlementtaskForm() {
      this.settlementtaskFormVisible = false;
      this.getUserPuzzleTaskList();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.southdisease {
  .search-box {
    height: 40px;
  }
  .southdisease-list {
    height: 650px !important;
    // border: 1px solid #eee;
    position: relative;

    table {
      th,
      td {
        text-align: center;
        .cell {
          white-space: nowrap;
          width: 100%; /* IE6 需要定义宽度 */
          overflow: hidden;
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
</style>
