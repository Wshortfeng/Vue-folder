<template>
  <div class="capitalaccount content-padding" style="padding-bottom:50px;">
    <div class="surplusamount-box">
      <span>剩余额度：</span> <span>{{ useraccountBalance }} 元</span>
    </div>
    <div class="search-box">
      <span>流&nbsp;水&nbsp;号&nbsp;&nbsp;:&nbsp;&nbsp;</span>
      <el-input v-model="sn" placeholder="请输入流水号" class="keyword5 mg_right7" maxlength="50"></el-input>
      <span>单&nbsp;据&nbsp;号&nbsp;&nbsp;:&nbsp;</span>
      <el-input v-model="billNo" placeholder="请输入单据号" class="keyword5 mg_right7" maxlength="50"></el-input>
      <span>交易对象：</span>
      <el-input v-model="transactionObject" placeholder="请输入交易对象" class="keyword5 mg_right7" maxlength="50"></el-input>
      <span>交易类型：</span>
      <el-select v-model="transactionType" placeholder="请选择交易类型" style="width:130px;">
        <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="search-box">
      <span>交易时间：</span>
      <el-date-picker @change="chooseTimeRange" class="mg_right7" v-model="tradingtime" type="daterange" :default-time="['00:00:00', '23:59:59']" align="right" unlink-panels range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
      </el-date-picker>
      <el-button type="primary" @click="serchKey()">搜索</el-button>
    </div>

    <div class="capitalaccount-list tablecontent">
      <el-table :data="tableData" style="width: 2060px;" border :header-cell-style="{background:'#f6f6f6',color:'#333333'}" v-loading="isloading">
        <el-table-column label="流水号" width="220">
          <template slot-scope="scope">
            <p :title="scope.row.sn">{{scope.row.sn}}</p>
          </template>
        </el-table-column>
        <el-table-column label="交易类型" width="100">
          <template slot-scope="scope">
            <p>{{scope.row.transactionType|transactionType}}</p>
          </template>
        </el-table-column>
        <el-table-column label="交易金额" width="100">
          <template slot-scope="scope">
            <p>{{scope.row.transactionAmount}}</p>
          </template>
        </el-table-column>
        <el-table-column label="当前金额" width="100">
          <template slot-scope="scope">
            <p>{{scope.row.projectBalance}}</p>
          </template>
        </el-table-column>
        <el-table-column label="项目号" width="220">
          <template slot-scope="scope">
            <p @click="goTo('project',scope.row.projectId)" class="underlineColor">{{scope.row.projectNumber}}</p>
          </template>
        </el-table-column>
        <el-table-column label="批次号" width="220">
          <template slot-scope="scope">
            <p @click="goTo('batch',scope.row.batchId,scope.row.projectId)" class="underlineColor" v-if="scope.row.batchNumber">{{scope.row.batchNumber}}</p>
						<p  class="underlineColornot" v-else>{{scope.row.batchNumber}}</p>
          </template>
        </el-table-column>
        <el-table-column label="任务号" width="220">
          <template slot-scope="scope">
            <p @click="goTo('task',scope.row.taskId,scope.row.projectId)" class="underlineColor" v-if="scope.row.taskNumber">{{scope.row.taskNumber}}</p>
						<p  class="underlineColornot" v-else>{{scope.row.taskNumber}}</p>
          </template>
        </el-table-column>
        <el-table-column label="交易对象" width="150">
          <template slot-scope="scope">
            <p>{{scope.row.transactionObject}}</p>
          </template>
        </el-table-column>
        <el-table-column label="记录人" width="150">
          <template slot-scope="scope">
            <p>{{scope.row.noteTaker}}</p>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="交易时间" width="180">
          <template slot-scope="scope">
            <p>{{scope.row.createDate|zhDatetime}}</p>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="300">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="left-start" :content="scope.row.remark">
              <p slot="reference">{{scope.row.remark}}</p>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-show="tableData.length>0&&total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
        </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "capitalaccount",
  data() {
    return {
      isloading: false,
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "资金托管"
        },
        {
          value: "2",
          label: "余额返还"
        },
        {
          value: "3",
          label: "资金维护"
        },
        {
          value: "4",
          label: "标注"
        },
        {
          value: "5",
          label: "初审"
        },
        {
          value: "6",
          label: "复审"
        },
        {
          value: "7",
          label: "会诊"
        }
      ],
      sn: "",
      billNo: "",
      transactionObject: "",
      transactionType: "",
      noteTaker: "",
      currentPage: 1, //初始页
      pagesize: 8, //    每页的数据
      total: 0, //总数
      tableData: [],
      useraccountBalance: 0,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tradingtime: ["", ""]
    };
  },
  filters: {
    formatStatus(value) {
      if (value == 1) {
        return "待会诊";
      } else if (value == 2) {
        return "待验收";
      } else if (value == 3) {
        return "验收未通过";
      } else if (value == 4) {
        return "待仲裁";
      } else if (value == 5) {
        return " 待结算";
      } else if (value == 6) {
        return "已完成";
      }
    }
  },
  watch: {
    // tradingtime() {
    //   this.currentPage = 1;
    //   this.getIncomeExpenseList();
    // },
    // sn() {
    //   this.currentPage = 1;
    //   this.getIncomeExpenseList();
    // },
    // billNo() {
    //   this.currentPage = 1;
    //   this.getIncomeExpenseList();
    // },
    // transactionObject() {
    //   this.currentPage = 1;
    //   this.getIncomeExpenseList();
    // },
    transactionType() {
      this.currentPage = 1;
      this.getIncomeExpenseList();
    }
  },
  created() {
    this.getIncomeExpenseList();
  },
  mounted() {
  	
  },
  methods: {
    goTo(type, id, projectId) {
      if (type == "project") {
        this.$utils.setSession("projectId", id);
        this.$router.push({
          name: "CapitalAccountProjectDetail"
        });
      } else if (type == "batch") {
        this.$utils.setSession("projectId", projectId);
        this.$utils.setSession("batchId", id);
        this.$router.push({
          name: "CapitalAccountBatchDetail"
        });
      } else {
        this.$router.push({
          name: "CapitalAccountProjectViewsMarkingTool"
        });
      }
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getIncomeExpenseList();
    },
    getUserAccountBalance() {
      this.$store.dispatch("user/getUserAccountBalance").then(res => {
        this.useraccountBalance = res.data;
      });
    },
    serchKey() {
      this.currentPage = 1;
      this.getIncomeExpenseList();
    },
    chooseTimeRange(t) {},
    getIncomeExpenseList() {
      this.isloading = true;
      this.getUserAccountBalance();
      if (this.tradingtime == undefined || this.tradingtime == null) {
        var beginTime = "";
        var endTime = "";
      } else {
        var beginTime = this.$utils.zhDatetime(this.tradingtime[0]);
        var endTime = this.$utils.zhDatetime(this.tradingtime[1]);
      }
      this.$api.project
        .getIncomeExpenseList(
          this.currentPage,
          this.pagesize,
          this.sn,
          this.billNo,
          this.transactionObject,
          this.transactionType,
          beginTime,
          endTime,
          this.noteTaker
        )
        .then(res => {
          if (res.code == 200) {
            this.total = res.pageInfo.total;
            this.tableData = res.data;
            this.isloading = false;
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.capitalaccount {
  .surplusamount-box {
    line-height: 30px;
    margin-bottom: 15px;
  }
  .search-box {
    margin-bottom: 15px;
  }
  .capitalaccount-list {
    margin-top: 15px;
    height: 520px;
    // border: 1px solid #eee;
    position: relative;
    table {
      .el-table__body {
        table-layout: auto !important;
      }
      th,
      td {
        text-align: center;
        .cell {
          line-height: 23px !important;
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
