<template>
  <div class="capitalaccount content-padding" style="padding-bottom:50px;">
    <div class="surplusamount-box">
      <span>剩余额度：</span> <span class="mg_right7">{{ useraccountBalance }} 元</span>
      <el-button type="primary" size="mini" @click="showDialog('showapplypresentation')" style="cursor:pointer;">申请提现</el-button>
      <el-button size="mini" @click="showDialog('showaccountmanagement')" style="cursor:pointer;">账户管理</el-button>
    </div>
    <el-radio-group v-model="active" style="margin-bottom:19px;">
      <el-radio-button label="1">提现管理</el-radio-button>
      <el-radio-button label="2">收支记录</el-radio-button>
    </el-radio-group>
    <div class="search-box" style="height:auto;">
      <div v-if="active==1">
        <span>流水号：</span>
        <el-input v-model="sn1" placeholder="请输入流水号" class="keyword5 mg_right7" maxlength="50"></el-input>
        <span>提现状态：</span>
        <el-select v-model="status1" placeholder="提现状态" class="mg_right7" style="width:110px;">
          <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
         <span>申请时间：</span>
        <el-date-picker @change="chooseTimeRange" class="mg_right7" v-model="tradingtime1" type="daterange" :default-time="['00:00:00', '23:59:59']" align="right" unlink-panels range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
        </el-date-picker>
        <el-button type="primary" @click="serchKey(1)">搜索</el-button>
      </div>
      <div v-else>
        <span>流&nbsp;水&nbsp;号&nbsp;&nbsp;:&nbsp;&nbsp;</span>
        <el-input v-model="sn2" placeholder="请输入流水号" class="keyword5 mg_right7" maxlength="50"></el-input>
        <span>单&nbsp;据&nbsp;号&nbsp;&nbsp;:&nbsp;&nbsp;</span>
        <el-input v-model="billNo2" placeholder="请输入单据号" class="keyword5 mg_right7" maxlength="50"></el-input>
        <span>交易对象：</span>
        <el-input v-model="transactionObject2" placeholder="请输入交易对象" class="keyword5 mg_right7" maxlength="50"></el-input>
        <span>收支类型：</span>
        <el-select v-model="transactionType2" placeholder="收支类型" style="width:128px;">
          <el-option v-for="(item,index) in options2" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <div style="margin-top:15px;">
          <span>交易时间：</span>
          <el-date-picker @change="chooseTimeRange" class="mg_right7" type="daterange" :default-time="['00:00:00', '23:59:59']" v-model="tradingtime2" align="right" unlink-panels range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions">
          </el-date-picker>
          <el-button type="primary" @click="serchKey(2)">搜索</el-button>
        </div>
      </div>
    </div>

    <div class="capitalaccount-list tablecontent" v-if="active==1">
      <el-table :data="tableData1" border :header-cell-style="{background:'#f6f6f6',color:'#333333'}">
        <el-table-column label="流水号" width="220">
          <template slot-scope="scope">
            <p :title="scope.row.sn">{{scope.row.sn}}</p>
          </template>
        </el-table-column>
        <el-table-column label="提现金额" width="100">
          <template slot-scope="scope">
            <p>{{scope.row.withdrawalAmount}}</p>
          </template>
        </el-table-column>
        <el-table-column label="提现方式" width="120">
          <template slot-scope="scope">
            <p>{{scope.row.accountType|presentType}}</p>
          </template>
        </el-table-column>
         <el-table-column label="提现状态" width="120">
          <template slot-scope="scope">
            <p>{{scope.row.status|presentStatus}}</p>
          </template>
        </el-table-column>
         <el-table-column label="申请时间" width="160">
          <template slot-scope="scope">
            <p>{{scope.row.createDate|zhDatetime}}</p>
          </template>
        </el-table-column>
        <el-table-column label="审核时间" width="160">
          <template slot-scope="scope">
            <p>{{scope.row.reviewDate|zhDatetime}}</p>
          </template>
        </el-table-column>
        <el-table-column label="提现时间" width="160">
          <template slot-scope="scope">
            <p>{{scope.row.withdrawalDate|zhDatetime}}</p>
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
      <el-pagination v-show="tableData1.length>0&&total1>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange1" :current-page="currentPage1" :page-size="pagesize" :total="total1">
      </el-pagination>
    </div>

    <div class="capitalaccount-list tablecontent" v-else>
      <el-table :data="tableData2" border :header-cell-style="{background:'#f6f6f6',color:'#333333'}">
        <el-table-column label="流水号" width="220">
          <template slot-scope="scope">
            <p :title="scope.row.sn">{{scope.row.sn}}</p>
          </template>
        </el-table-column>
        <el-table-column label="收支类型" width="100">
          <template slot-scope="scope">
            <p>{{scope.row.transactionType|transactionType}}</p>
          </template>
        </el-table-column>
        <el-table-column label="交易金额" width="100">
          <template slot-scope="scope">
            <p>{{scope.row.transactionAmount}}</p>
          </template>
        </el-table-column>
        <el-table-column label="剩余金额" width="100">
          <template slot-scope="scope">
            <p>{{scope.row.labelerBalance}}</p>
          </template>
        </el-table-column>
        <el-table-column label="项目号" width="220">
          <template slot-scope="scope">
            <p v-if="scope.row.projectNumber" @click="goTo('project',scope.row.projectId)" class="underlineColor">{{scope.row.projectNumber}}</p>
            <p v-else class="underlineColornot">{{scope.row.projectNumber}}</p>
          </template>
        </el-table-column>
        <el-table-column label="批次号" width="220">
          <template slot-scope="scope">
            <p v-if="scope.row.batchNumber" @click="goTo('batch',scope.row.batchId,scope.row.projectId)" class="underlineColor">{{scope.row.batchNumber}}</p>
            <p v-else class="underlineColornot">{{scope.row.batchNumber}}</p>
          </template>
        </el-table-column>
        <el-table-column label="任务号" width="220">
          <template slot-scope="scope">
            <p v-if="scope.row.taskNumber" @click="goTo('task',scope.row.taskId,scope.row.projectId)" class="underlineColor">{{scope.row.taskNumber}}</p>
            <p v-else class="underlineColornot">{{scope.row.taskNumber}}</p>
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
      <el-pagination v-show="tableData2.length>0&&total2>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange2" :current-page="currentPage2" :page-size="pagesize" :total="total2">
      </el-pagination>
    </div>

    <!-- 申请提现 -->
    <el-dialog title="申请提现" :visible.sync="showapplypresentation" width="400px" class="deepbackground showapplypresentation" center style="padding:15px 20px;" @close="close('applypresentation')">
      <el-form ref="applypresentation" :model="applypresentation" class="demo-form-inline applypresentation" :rules="applypresentationRules" label-width="100px">
        <el-form-item prop="amount" label="提现金额：">
          <el-input-number v-model="applypresentation.amount" controls-position="right" :controls="true" :precision="2" :min="0.01" :step="0.01" :max="99999999"></el-input-number>
        </el-form-item>
        <el-form-item prop="type" label="提现方式：">
          <el-radio-group v-model="applypresentation.type">
            <el-radio :label="1">银行卡</el-radio>
            <el-radio :label="2">支付宝</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="applypresentationconfirm('applypresentation')">确 定</el-button>
        <el-button type="primary" @click="close('applypresentation')">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 账户管理 -->
    <el-dialog title="账户管理" :visible.sync="showaccountmanagement" width="500px" class="deepbackground showaccountmanagement" center @close="close('accountmanagement')">
      <el-form ref="accountmanagement" :model="accountmanagement" class="demo-form-inline accountmanagement" :rules="accountmanagementRules" label-width="120px">
        <el-form-item prop="phone" label="手机号：">
          <el-input v-model="accountmanagement.phone" placeholder="请输入手机号" disabled maxlength="11"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="验证码：">
          <el-input placeholder="请输入验证码" v-model="accountmanagement.code" maxlength="6">
            <a href="javascript:;" slot="append" class="unchecked-code" @click="onSubmit()" v-if="showcode">{{code}}</a>
            <a href="javascript:;" slot="append" class="unchecked-code" v-else>{{code}}</a>
          </el-input>
        </el-form-item>
        <el-form-item prop="bankCard" label="银行账号：">
          <el-input v-model="accountmanagement.bankCard" placeholder="请输入银行账号" maxlength="19"></el-input>
        </el-form-item>
        <el-form-item prop="alipay" label="支付宝账号：">
          <el-input v-model="accountmanagement.alipay" placeholder="请输入支付宝账号" maxlength="50"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="accountmanagementconfirm('accountmanagement')">确 定</el-button>
        <el-button type="primary" @click="close('accountmanagement')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
var check_cap;
export default {
  name: "capitalaccount",
  data() {
    var isAmount = (rule, value, callback) => {
      //手机号验证
      if (!value) {
        return callback(new Error("请输入提现金额"));
      } else if (value < 0.01) {
        return callback(new Error("提现最小金额为0.01"));
      } else if (value > 99999999) {
        return callback(new Error("提现最大金额为99999999"));
      } else if (value > this.useraccountBalance) {
        return callback(new Error("账户余额不足"));
      } else {
        callback();
      }
    };
    var isbankCard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入银行账号"));
      }
      if (!this.$utils.bankaccount(value)) {
        return callback(new Error("银行账号格式错误"));
      } else {
        callback();
      }
    };
    var isAlipay = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入支付宝账号"));
      }
      if (!this.$utils.isAlipay(value)) {
        return callback(new Error("支付宝账号格式错误"));
      } else {
        callback();
      }
    };
    var isPhone = (rule, value, callback) => {
      //手机号验证
      if (!value) {
        return callback(new Error("请输入手机号"));
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
    var isInt = (rule, value, callback) => {
      //验证码验证
      if (!value) {
        return callback(new Error("请输入验证码"));
      }
      if (!this.$utils.isString(value)) {
        return callback(new Error("验证码为6个字符"));
      } else {
        if (!this.$utils.isInt(value)) {
          return callback(new Error("验证码格式错误"));
        } else {
          callback();
        }
      }
    };
    return {
      active: 1,
      code: "获取验证码",
      showcode: true,
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "审核中"
        },
        {
          value: "2",
          label: "审核成功"
        },
        {
          value: "3",
          label: "审核失败"
        }
      ],
      options2: [
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
      transactionType2: "",
      sn1: "",
      sn2: "",
      billNo2: "",
      transactionObject2: "",
      status1: "",
      currentPage2: 1, //初始页
      currentPage1: 1, //初始页
      pagesize: 8, //    每页的数据
      total2: 0, //总数
      total1: 0, //总数
      tableData1: [],
      tableData2: [],
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
      tradingtime1: ["", ""],
      tradingtime2: ["", ""],
      showapplypresentation: false,
      applypresentation: {
        amount: "",
        type: 1
      },
      applypresentationRules: {
        amount: [{ required: true, validator: isAmount, trigger: "blur" }],
        type: [{ required: true, message: "请选择提现方式", trigger: "blur" }]
      },
      showaccountmanagement: false,
      accountmanagement: {
        bankCard: "",
        alipay: "",
        phone: "",
        code: ""
      },
      accountmanagementRules: {
        bankCard: [{ required: true, validator: isbankCard, trigger: "blur" }],
        alipay: [{ required: true, validator: isAlipay, trigger: "blur" }],
        phone: [{ required: true, validator: isPhone, trigger: "blur" }],
        code: [{ required: true, validator: isInt, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState("user", ["account"])
  },
  watch: {
    // tradingtime1() {
    //   this.serchKey(1);
    // },
    status1() {
      this.serchKey(1);
    },
    // sn1() {
    //   this.serchKey(1);
    // },
    // tradingtime2() {
    //   this.serchKey(2);
    // },
    // sn2() {
    //   this.serchKey(2);
    // },
    // billNo2() {
    //   this.serchKey(2);
    // },
    // transactionObject2() {
    //   this.serchKey(2);
    // },
    transactionType2() {
      this.serchKey(2);
    },
    active(value) {
      if (value == 1) {
        this.getApplyWithdrawalList();
      } else {
        this.getIncomeExpenseList();
      }
    }
  },
  created() {
    this.accountmanagement.phone = this.account;
    this.getUserInfo();
  },
  mounted() {
    this.serchKey(1);
  },
  methods: {
    goTo(type, id, projectId) {
      //跳转
      if (type == "project") {
        this.$utils.setSession("PROJECTID", id);
        this.$router.push({
          name: "CapitalAccountLabelProjectDetail"
        });
      } else if (type == "batch") {
        this.$utils.setSession("LABELPROJECTID", projectId);
        this.$utils.setSession("LABELPROJECTBATCHTASKID", id);
        this.$router.push({
          name: "CapitalAccountLookMarkTool"
        });
      } else {
        this.$utils.setSession("LABELPROJECTID", projectId);
        this.$utils.setSession("LABELPROJECTBATCHTASKID", id);
        this.$utils.setSession("LABELTYPE", 1);
        this.$router.push({
          name: "CapitalAccountMarkTool"
        });
      }
    },
    getUserInfo() {
      //获取用户信息
      this.$store.dispatch("user/GetUserInfo").then(res => {
        this.accountmanagement.alipay = res.data.alipay;
        this.accountmanagement.bankCard = res.data.bankCard;
      });
    },
    showDialog(name) {
      //打开弹框
      if (name == "showaccountmanagement") {
        this.getUserInfo();
      }
      this[name] = true;
    },
    close(rouleForm) {
      var name = "show" + rouleForm;
      this.$refs[rouleForm].resetFields();
      if (name == "showaccountmanagement") {
        this.code = "获取验证码";
        this.showcode = true;
        clearInterval(check_cap);
      }
      this[name] = false;
    },
    onSubmit() {
      //发送短信
      var that = this;
      if ($.trim(that.accountmanagement.phone) == "") {
        that.$toaster.error("请先输入手机号");
        return;
      } else {
        if (!that.$utils.telphone(that.accountmanagement.phone)) {
          that.$toaster.error("手机号格式错误");
          return;
        }
      }
      var count = 60;

      that.$api.user.getCode(that.accountmanagement.phone, 2).then(res => {
        if (res.code == 200) {
          that.$toaster.ok("发送成功");
          that.code = "59s";
          var count = 58;
          check_cap = setInterval(function() {
            if (count == 0) {
              that.code = "重新获取验证码";
              that.showcode = true;
            } else {
              that.showcode = false;
              that.code = count + "s";
            }
            count--;
            if (count == -1) {
              clearInterval(check_cap);
            }
          }, 1000);
        } else {
          that.code = "获取验证码";
          that.showcode = true;
          clearInterval(check_cap);
          that.$toaster.error(res.msg);
        }
      });
    },
    applypresentationconfirm(applypresentation) {
      //申请提现
      this.$refs[applypresentation].validate(valid => {
        if (valid) {
          var applypresentation = this.applypresentation;
          this.$api.label
            .applyWithdrawal(applypresentation.amount, applypresentation.type)
            .then(res => {
              if (res.code == 200) {
                this.$toaster.ok(res.msg);
                this.getApplyWithdrawalList();
                this.applypresentation = {
                  amount: "",
                  type: 1
                };
                this.close("applypresentation");
              } else {
                this.$toaster.error(res.msg);
              }
            })
            .catch(() => {});
        } else {
          // this.$toaster.error("请确认验证项格式");
          return false;
        }
      });
    },
    accountmanagementconfirm(accountmanagement) {
      //账户管理
      this.$refs[accountmanagement].validate(valid => {
        if (valid) {
          this.$api.label
            .updateUserAccount(this.accountmanagement)
            .then(res => {
              if (res.code == 200) {
                this.$toaster.ok(res.msg);
                this.getUserInfo();
                this.code = "获取验证码";
                this.showcode = true;
                clearInterval(check_cap);
                this.close("accountmanagement");
              } else {
                this.$toaster.error(res.msg);
              }
            })
            .catch(() => {});
        } else {
          // this.$toaster.error("请确认验证项格式");
          return false;
        }
      });
    },
    getUserAccountBalance() {
      this.$store.dispatch("user/getUserAccountBalance").then(res => {
        this.useraccountBalance = res.data;
      });
    },
    serchKey(type) {
      if (type == 1) {
        this.currentPage1 = 1;
        this.getApplyWithdrawalList();
      } else {
        this.currentPage2 = 1;
        this.getIncomeExpenseList();
      }
    },
    handleCurrentChange1: function(currentPage) {
      this.currentPage1 = currentPage;
      this.getApplyWithdrawalList();
    },
    handleCurrentChange2: function(currentPage) {
      this.currentPage2 = currentPage;
      this.getIncomeExpenseList();
    },
    chooseTimeRange(t) {},
    getApplyWithdrawalList() {
      //获取提现管理信息
      this.getUserAccountBalance();
      if (this.tradingtime1 == undefined || this.tradingtime1 == null) {
        var beginDate = "";
        var endDate = "";
      } else {
        var beginDate = this.$utils.zhDatetime(this.tradingtime1[0]);
        var endDate = this.$utils.zhDatetime(this.tradingtime1[1]);
      }
      this.$api.label
        .getApplyWithdrawalList(
          this.currentPage1,
          this.pagesize,
          this.sn1,
          this.status1,
          beginDate,
          endDate
        )
        .then(res => {
          this.total1 = res.pageInfo.total;
          this.tableData1 = res.data;
        });
    },
    getIncomeExpenseList() {
      //获取收支记录
      this.getUserAccountBalance();
      if (this.tradingtime2 == undefined || this.tradingtime2 == null) {
        var beginTime = "";
        var endTime = "";
      } else {
        var beginTime = this.$utils.zhDatetime(this.tradingtime2[0]);
        var endTime = this.$utils.zhDatetime(this.tradingtime2[1]);
      }
      this.$api.project
        .getIncomeExpenseList(
          this.currentPage2,
          this.pagesize,
          this.sn2,
          this.billNo2,
          this.transactionObject2,
          this.transactionType2,
          beginTime,
          endTime,
          ""
        )
        .then(res => {
          this.total2 = res.pageInfo.total;
          this.tableData2 = res.data;
        });
    },
  },
    beforeRouteLeave (to, from, next) {//离开页面时
    // console.log(to.name)
    // console.log(from.name)
    if(to.name==='CapitalAccountLabelProjectDetail'||to.name==='CapitalAccountMarkTool'||to.name==='CapitalAccountLookMarkTool'){
      from.meta.keepAlive=true;
    }else{
       from.meta.keepAlive=false;
    }
    next()//执行
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.applypresentation,
.accountmanagement {
  padding: 0 25px 0;
  .el-radio:first-child {
    margin-right: 15px;
  }
}
.showapplypresentation {
  .el-dialog__body {
    padding: 20px 30px 5px 10px;
  }
}
.el-input-number__increase {
  	border-radius: 0 !important;
  }
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
    min-height: 550px;
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
.accountmanagement {
  .el-input.is-disabled .el-input__inner,
  .el-textarea.is-disabled .el-textarea__inner {
    color: white !important;
  }
}
.showaccountmanagement {
  .el-dialog__body {
    padding: 20px 35px 5px 5px;
  }
}
</style>
