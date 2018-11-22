<template>
  <div class="revenueexpenditurestatistics  content-padding">
    <div class="search-box" style="margin-bottom:0 !important;">
      <div class="search-item">
        <span>流&nbsp;水&nbsp;号&nbsp;&nbsp;:&nbsp;&nbsp;</span>
        <el-input v-model="sn" placeholder="请输入流水号" class="keyword mg_right" maxlength="50"></el-input>
      </div>
      <div class="search-item">
        <span>单&nbsp;据&nbsp;号&nbsp;&nbsp;:&nbsp;</span>
        <el-input v-model="billNo" placeholder="请输入单据号" class="keyword mg_right" maxlength="50"></el-input>
      </div>
      <div class="search-item">
        <span>交易对象：</span>
        <el-input v-model="transactionObject" placeholder="请输入交易对象" class="keyword mg_right" maxlength="50"></el-input>
      </div>
      <div class="search-item">
        <span>交易类型：</span>
        <el-select v-model="transactionType" placeholder="请选择交易类型" class="mg_right min_select" >
          <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="search-item">
        <span>交易时间：</span>
        <el-date-picker @change="chooseTimeRange" class="mg_right" v-model="tradingtime" type="daterange" :default-time="['00:00:00', '23:59:59']" align="right" unlink-panels range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
        </el-date-picker>
      </div>
      <div class="search-item">
        <el-button type="primary" @click="serchKey()">搜索</el-button>
      </div>
      <div class="search-item">
        <el-button type="primary" @click="showlayer(1)">资金托管</el-button>
      </div>
      <div class="search-item">
        <el-button type="primary" @click="showlayer(2)">余额返还</el-button>
      </div>
      <div class="search-item">
        <el-button type="primary" @click="showlayer(3)">资金维护</el-button>
      </div>
    </div>
    <div class="revenueexpenditurestatistics-main">
      <div class="revenueexpenditurestatistics-content tablecontent">
        <el-table :data="tableData" style="width: 2160px" border :header-cell-style="{background:'#f6f6f6',color:'#333333'}">
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
          <el-table-column label="交易金额" width="200">
            <template slot-scope="scope">
              <p>{{scope.row.transactionAmount}}</p>
            </template>
          </el-table-column>
          <el-table-column label="当前金额" width="200">
            <template slot-scope="scope">
              <p>{{scope.row.transactionAmount}}</p>
            </template>
          </el-table-column>
          <el-table-column label="项目号" width="220">
            <template slot-scope="scope">
              <p>{{scope.row.projectNumber}}</p>
            </template>
          </el-table-column>
          <el-table-column label="批次号" width="220">
            <template slot-scope="scope">
              <p>{{scope.row.batchNumber}}</p>
            </template>
          </el-table-column>
          <el-table-column label="任务号" width="220">
            <template slot-scope="scope">
              <p>{{scope.row.taskNumber}}</p>
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
          <el-table-column label="备注" width="200">
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
    <el-dialog title="资金托管" :visible.sync="fundtruSteeshipbox" width="500px" center class="deepbackground">
      <el-form ref="fundtruSteeshipForm" :model="fundtruSteeshipForm" label-width="130px" :rules="fundtruSteeshipRule">
        <el-form-item prop="phone" label="项目方手机号：">
          <el-input v-model="fundtruSteeshipForm.phone" placeholder="请输入项目方手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item prop="projectNumber" label="项目号：">
          <el-input v-model="fundtruSteeshipForm.projectNumber" placeholder="请输入项目号" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item prop="amount" label="交易金额：">
          <el-input-number v-model="fundtruSteeshipForm.amount" controls-position="right" :controls="true" :precision="2" :min="0.01" :step="0.01" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item prop="remark" label="备注：">
          <el-input type="textarea" v-model="fundtruSteeshipForm.remark" placeholder="至多20个字符" maxlength="20"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmfundtruSteeshipRuleForm()">确 定</el-button>
        <el-button type="primary" @click="fundtruSteeshipbox = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="余额返还" :visible.sync="returnBalancebox" width="500px" center class="deepbackground">
      <el-form ref="returnBalanceForm" :model="returnBalanceForm" label-width="130px" :rules="returnBalanceRule">
        <el-form-item prop="phone" label="项目方手机号：">
          <el-input v-model="returnBalanceForm.phone" placeholder="请输入项目方手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item prop="projectNumber" label="项目号：">
          <el-input v-model="returnBalanceForm.projectNumber" placeholder="请输入项目号" maxlength="30"></el-input>
        </el-form-item>
        <el-form-item prop="amount" label="交易金额：">
          <el-input-number v-model="returnBalanceForm.amount" controls-position="right" :controls="true" :precision="2" :min="0.01" :step="0.01" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item prop="remark" label="备注：">
          <el-input type="textarea" v-model="returnBalanceForm.remark" placeholder="至多20个字符" maxlength="20"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmreturnBalanceRuleForm()">确 定</el-button>
        <el-button type="primary" @click="returnBalancebox = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="资金维护" :visible.sync="capitalMaintenancebox" width="500px" center class="deepbackground">
      <el-form ref="returnBalanceForm" :model="capitalMaintenanceForm" label-width="130px" :rules="returnBalanceRule">
        <el-form-item prop="phone" label="项目方/标注方：">
          <el-input v-model="capitalMaintenanceForm.phone" placeholder="请输入项目方/标注方手机号" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="增加/减少：">
          <el-select v-model="capitalMaintenanceForm.type" placeholder="请选择增加/减少" style="width:320px;">
            <el-option label="增加" value="1"></el-option>
            <el-option label="减少" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="amount" label="交易金额：">
          <el-input-number v-model="capitalMaintenanceForm.amount" controls-position="right" :controls="true" :precision="2" :min="0.01" :step="0.01" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item prop="remark" label="备注：">
          <el-input type="textarea" v-model="capitalMaintenanceForm.remark" placeholder="至多20个字符" maxlength="20"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmreturnBalanceRuleForm()">确 定</el-button>
        <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "revenueexpenditurestatistics",
  data() {
    var isAmount = (rule, value, callback) => {
      //手机号验证
      if (!value) {
        return callback(new Error("交易金额不能为空"));
      } else if (value < 0.01) {
        return callback(new Error("交易最小金额为0.01"));
      } else if (value > 99999999) {
        return callback(new Error("交易最大金额为99999999"));
      } else {
        callback();
      }
    };
    var isPhone = (rule, value, callback) => {
      //手机号验证
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      if (!this.$utils.isString(value)) {
        return callback(new Error("手机号为11个字符"));
      } else {
        if (!this.$utils.telphone(value)) {
          return callback(new Error("手机号格式错误"));
        } else {
          callback();
        }
      }
    };
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
      tradingtime: ["", ""],
      fundtruSteeshipbox: false,
      fundtruSteeshipForm: {
        remark: "",
        phone: "",
        projectNumber: "",
        amount: ""
      },
      fundtruSteeshipRule: {
        amount: [{ required: true, validator: isAmount, trigger: "blur" }],
        phone: [{ required: true, validator: isPhone, trigger: "blur" }],
        projectNumber: [
          { required: true, message: "项目号不能为空", trigger: "blur" }
        ]
      },
      returnBalancebox: false,
      returnBalanceForm: {
        remark: "",
        phone: "",
        projectNumber: "",
        amount: ""
      },
      returnBalanceRule: {
        amount: [{ required: true, validator: isAmount, trigger: "blur" }],
        phone: [{ required: true, validator: isPhone, trigger: "blur" }],
        projectNumber: [
          { required: true, message: "项目号不能为空", trigger: "blur" }
        ]
      },
      capitalMaintenancebox: false,
      capitalMaintenanceForm: {
        remark: "",
        phone: "",
        type: "1",
        amount: ""
      },
      capitalMaintenanceRule: {
        amount: [{ required: true, validator: isAmount, trigger: "blur" }],
        phone: [{ required: true, validator: isPhone, trigger: "blur" }],
        type: [
          { required: true, message: "请选择增加/减少", trigger: "change" }
        ]
      }
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
    tradingtime() {
      this.currentPage = 1;
      this.getIncomeExpenseList();
    },
    sn() {
      this.currentPage = 1;
      this.getIncomeExpenseList();
    },
    billNo() {
      this.currentPage = 1;
      this.getIncomeExpenseList();
    },
    transactionObject() {
      this.currentPage = 1;
      this.getIncomeExpenseList();
    },
    transactionType() {
      this.currentPage = 1;
      this.getIncomeExpenseList();
    }
  },
  created() {
    // this.getIncomeExpenseList();
  },
  mounted() {
    jQuery(".el-table__body-wrapper").niceScroll({
      cursorcolor: "#000",
      cursoropacitymax: 0.2,
      cursorwidth: "10px"
    });
  },
  methods: {
    showlayer(type) {
      if (type == 1) {
        this.fundtruSteeshipbox = true;
      } else if (type == 2) {
        this.returnBalancebox = true;
      } else {
        this.capitalMaintenancebox = true;
      }
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getIncomeExpenseList();
    },
    serchKey() {
      this.currentPage = 1;
      this.getIncomeExpenseList();
    },
    chooseTimeRange(t) {},
    getIncomeExpenseList() {
      this.isloading = true;
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
          this.total = res.pageInfo.total;
          this.tableData = res.data;
          this.isloading = false;
        });
    },
    confirmfundtruSteeshipRuleForm() {
      //资金托管
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.revenueexpenditurestatistics {
  height: 100%;
  overflow: hidden;
  .el-tabs {
    height: 41px;
  }
  .revenueexpenditurestatistics-main {
    border-top: none;
    position: relative;
    padding-bottom: 50px;
    .revenueexpenditurestatistics-content {
      table {
        .el-table__body {
          table-layout: auto !important;
        }
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
