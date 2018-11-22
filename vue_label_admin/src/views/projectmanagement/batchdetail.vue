<template>
  <div class="batchdetail content-padding">
    <div class="task-list tablecontent">
      <p style="margin-bottom:19px;font-size:16px;color:#666;">{{batchNumber}} 任务列表：</p>
      <el-table :data="tasklist" border style="width: 100%;border-bottom:1px solid #e5e0e0;" :header-cell-style="{background:'#f6f6f6',color:'#333333'}" v-loading="isloading">
        <el-table-column label="任务号">
          <template slot-scope="scope">
            <p>{{scope.row.taskNumber}}</p>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <p>{{scope.row.status|batchtaskstate}}</p>
          </template>
        </el-table-column>
        <el-table-column label="批次截止时间">
          <template slot-scope="scope">
            <p>{{scope.row.expireDate|zhDatetime}}</p>
          </template>
        </el-table-column>
         <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation('detail',scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
      </el-table>
      <div class="pagination-box">
        <el-pagination v-show="tasklist.length>0&&total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "batchdetail",
  data() {
    return {
      isloading: false,
      active: 1,
      status: "",
      currentPage: 1, //初始页
      pagesize:8, //    每页的数据
      total: 1, //总数
      tasklist: [],
      batchNumber:'',
    };
  },
  created() {
    this.batchNumber = this.$route.query.BATCHNUMBER
    this.getBatchTaskList();
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getBatchTaskList();
    },
    getBatchTaskList() {
      this.isloading = true;
      this.$api.admin
        .getBatchTaskList(
          this.currentPage,
          this.pagesize,
          this.$route.query.BATCHID,
        )
        .then(res => {
          this.total = res.pageInfo.total;
          this.tasklist = res.data;
          this.isloading = false;
        });
    },
     operation(type, id, taskNumber) {
      if (type == "detail" || type == "review") {

      } else {

      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.batchdetail {
  padding-top: 15px;
  .search-box {
    margin-bottom: 15px;
  }
  .task-list {
    // border: 1px solid #eee;
    min-height: 700px;
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
}
</style>
