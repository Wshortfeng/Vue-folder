<template>
  <div class="batchdetail content-padding">
    <div class="task-list tablecontent">
      <p style="margin-bottom:19px;font-size:16px;color:#666;">{{batchNumber}} 任务列表：</p>
      <div class="operation_box" style="height:30px;">
        <el-button style="border:1px solid #606266;" :class="{operation_btn1:true,selectbtn:statusType ==item.value}" type="" size="mini" v-for="(item,index) in options" :key="index" @click="tapChange(item)" v-if="item.value!=4">{{item.label}}</el-button>
      </div>
      <el-table :data="tasklist" border style="width: 100%;border-bottom:1px solid #e5e0e0;" :header-cell-style="{background:'#f6f6f6',color:'#333333'}" v-loading="isloading">
        <el-table-column label="任务号">
          <template slot-scope="scope">
            <p>{{scope.row.taskNumber}}</p>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <p>{{status}}</p>
          </template>
        </el-table-column>
        <el-table-column label="批次截止时间">
          <template slot-scope="scope">
            <p>{{scope.row.expireDate|zhDatetime}}</p>
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
      statusType: 0,
      batchNumber:'',
      options: [
        // {
        //   value: "",
        //   label: "全部",
        //   isSelect: true
        // },
        {
          value: "0",
          label: "待提交"
        },
        {
          value: "1",
          label: "待初审"
        },
        {
          value: "2",
          label: "初审未通过"
        },
        {
          value: "3",
          label: "待复审"
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
        },
        {
          value: "12",
          label: "已失败"
        },
        {
          value: "10",
          label: "已过期"
        },
        {
          value: "11",
          label: "已放弃"
        }
      ]
    };
  },
  created() {
    var STATUS = this.$utils.getSession("LABELBATCHSTATUS");
    this.batchNumber = this.$route.query.BATCHNUMBER
    if (STATUS) {
      if (STATUS <= 10) {
        this.statusType = STATUS - 1;
      } else if (STATUS == 11) {
        this.statusType = 12;
      } else if (STATUS == 12) {
        this.statusType = 10;
      } else if (STATUS == 13) {
        this.statusType = 11;
      }
      this.status = this.options[STATUS-1].label||this.options[0].lable;
    }
    this.getLabelBatchTaskList();
  },
  methods: {
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getLabelBatchTaskList();
    },
     tapChange(item) {
      this.currentPage = 1;
      this.status=item.label;
      this.statusType = item.value;
      this.getLabelBatchTaskList();
    },
    getLabelBatchTaskList() {
      this.isloading = true;
      this.$api.label
        .getLabelBatchTaskList(
          this.currentPage,
          this.pagesize,
          this.$utils.getSession("LABELBATCHID"),
          this.statusType
        )
        .then(res => {
          this.total = res.pageInfo.total;
          this.tasklist = res.data;
          this.isloading = false;
        });
    }
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
