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
        <el-table-column label="会诊人">
          <template slot-scope="scope">
            <el-dropdown>
              <span class="el-dropdown-link">
                {{scope.row.hashMapList[0].title}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-popover trigger="hover" placement="top-start" v-for="(item,index) in scope.row.hashMapList" :key="index">
                  <div v-for="(a,i) in item.info" :key="i" class="tooltip-item">
                    姓名：{{a.legalName}}<br>
                    所在地区：{{a.address}}<br>
                    职称： {{a.professionalTitle|professionalTitleType}}<br>
                    接单数：{{a.num}}<br>
                  </div>
                  <p slot="reference">
                    <el-dropdown-item>{{item.title}}</el-dropdown-item>
                  </p>
                </el-popover>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120px">
          <template slot-scope="scope">
            <p>{{scope.row.status|batchtaskstate}}</p>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="operation(scope.row.id, 'review',scope.row.taskNumber,scope.row.isStop,scope.row.projectId)" v-if="scope.row.status==10">验收</el-button>
            <el-button size="mini" type="text" @click="operation(scope.row.id, 'detail',scope.row.taskNumber,scope.row.isStop,scope.row.projectId)" v-else>查看</el-button>
            <el-button size="mini" type="text" @click="operation(scope.row.id, 'initiatearbitration',scope.row.taskNumber,scope.row.isStop)" v-if="scope.row.status==14">结算</el-button>
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
    //   this.getPuzzleTaskList();
    // },
    status() {
      this.currentPage = 1;
      this.getPuzzleTaskList();
    }
  },
  created() {
    this.getPuzzleTaskList();
  },
  methods: {
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getPuzzleTaskList();
    },
    serchKey() {
      this.currentPage = 1;
      this.getPuzzleTaskList();
    },
    getPuzzleTaskList() {
      this.isloading = true;
      this.$api.project
        .getPuzzleTaskList(
          this.currentPage,
          this.pagesize,
          this.keyWord,
          this.status
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getPuzzleTaskList();
          } else {
            this.total = res.pageInfo.total;
            this.tableData = res.data;
            this.isloading = false;
          }
        });
    },
    operation: function(taskId, name, taskNumber, isStop, projectId) {
      //操作
      if (name == "detail") {
        this.$utils.setSession("LABELPROJECTID", projectId);
        this.$utils.setSession("LABELPROJECTBATCHTASKID", taskId);
        this.$utils.setSession("LABELTYPE", 1);
        this.$router.push({
          name: "DiseaseProjectViewsMarkingTool"
        });
      } else if (name == "review") {
        if (isStop == 2) {
          this.$toaster.error("该疑难杂症任务已被暂停，暂时无法验收");
        } else {
          this.$utils.setSession("LABELPROJECTID", projectId);
          this.$utils.setSession("LABELPROJECTBATCHTASKID", taskId);
          this.$utils.setSession("LABELTYPE", 1);
          this.$router.push({
            name: "DiseaseProjectViewsMarkingTool"
          });
        }
      } else if (name == "initiatearbitration") {
        if (isStop == 2) {
          this.$toaster.error("该疑难杂症任务已被暂停，暂时无法结算");
        } else {
         this.settlementtaskId = taskId;
        this.settlementtaskFormVisible = true;
        this.title = `是否确认结算【${taskNumber}】任务？`;
        }
      }
    },
    closesettlementtaskForm() {
      this.settlementtaskFormVisible = false;
      this.getPuzzleTaskList();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.southdisease {
  .southdisease-list {
    height: 600px;
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
