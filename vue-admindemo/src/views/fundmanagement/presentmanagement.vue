<template>
  <div class="presentmanagement  content-padding">
    <div class="search-box" style="margin-bottom:0 !important;">
      <div class="search-item">
        <span>申请人：</span>
        <el-input v-model="subject" placeholder="请输入申请人" class="keyword mg_right1" maxlength="50"></el-input>
      </div>
      <div class="search-item">
        <span>提现状态：</span>
        <el-select v-model="status" filterable placeholder="请搜索或选择提现状态" class="mg_right1 min_select" maxlength="50">
          <el-option v-for="(item,index) in options1" :key="index" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="search-item">
        <span>提现方式：</span>
        <el-select v-model="type" filterable placeholder="请搜索或选择提现方式" class="mg_right1 min_select" maxlength="50">
          <el-option v-for="(item,index) in options2" :key="index" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="search-item">
        <el-button type="primary" @click="serchKey()">搜索</el-button>
      </div>
    </div>
    <div class="presentmanagement-main">
      <div class="presentmanagement-content tablecontent">
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#fafafa'}" v-loading="isloading">
          <el-table-column label="申请人">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.subject">
                <p slot="reference">{{scope.row.subject}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="提现账号">
            <template slot-scope="scope">
              <p>{{scope.row.type}}</p>
            </template>
          </el-table-column>
          <el-table-column label="提现方式">
            <template slot-scope="scope">
              <p>{{scope.row.status|presentType}}</p>
            </template>
          </el-table-column>
          <el-table-column label="提现状态">
            <template slot-scope="scope">
              <p>{{scope.row.status|presentStatus}}</p>
            </template>
          </el-table-column>
          <el-table-column label="提现金额">
            <template slot-scope="scope">
              <p>{{scope.row.type|problemType}}</p>
            </template>
          </el-table-column>
          <el-table-column label="提现时间">
            <template slot-scope="scope">
              <p>{{scope.row.status|zhDatetime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'review',scope.row.subject)">审核</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'success',scope.row.subject)">提现成功</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'error',scope.row.subject)">提现失败</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="是否确定提现失败" :visible.sync="dialogVisible" width="500px" center class="deepbackground">
      <el-form ref="ruleForm" :model="ruleForm" label-width="60px">
        <el-form-item prop="remark" label="备注：">
          <el-input type="textarea" v-model="ruleForm.remark" placeholder="至多20个字符" maxlength="20"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="confirmRuleForm()">确 定</el-button>
        <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "presentmanagement",
  data() {
    return {
      isloading: false,
      dialogVisible: false,
      type: "",
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 0, //总数
      subject: "",
      tableData: [],
      status: "",
      options1: [
        { name: "全部", value: "" },
        { name: "待审核", value: "1" },
        { name: "审核失败", value: "2" },
        { name: "提现中", value: "3" },
        { name: "提现成功", value: "4" },
        { name: "提现失败", value: "5" }
      ],
      options2: [
        { name: "全部", value: "" },
        { name: "银行卡", value: "1" },
        { name: "支付宝", value: "2" }
      ],
      ruleForm: {
        remark: ""
      }
    };
  },
  watch: {
    subject(value) {
      this.serchKey();
    },
    type(value) {
      this.serchKey();
    }
  },
  created() {},
  mounted() {
    this.getQuestionList();
  },
  methods: {
    serchKey() {
      this.currentPage = 1;
      this.getQuestionList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getQuestionList();
    },
    getQuestionList() {
      this.isloading = true;
      this.$api.admin
        .getQuestionList(
          this.currentPage,
          this.pagesize,
          this.subject,
          this.type
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getQuestionList();
          } else {
            this.total = res.pageInfo.total;
            this.tableData = res.data;
          }
          this.isloading = false;
        });
    },
    operation(id, type, subject) {
      if (type == "review") {
        this.$confirm("是否确定【" + subject + "】提现申请？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "拒绝",
          type: "info"
        })
          .then(res => {
            this.$api.admin.reviewProject(id, 1, "").then(res => {
              if (res.code == 200) {
                this.getPlatformProjectList();
                this.$toaster.ok(res.msg);
              } else {
                this.$toaster.error(res.msg);
              }
            });
          })
          .catch(() => {});
      } else if (type == "success") {
        this.$confirm("是否确定【" + subject + "】提现成功？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success"
        })
          .then(res => {
            this.$api.admin.delfun("pc/question/delQuestion", id).then(res => {
              if (res.code == 200) {
                this.getQuestionList();
                this.$toaster.ok("删除成功");
              } else {
                this.$toaster.error(res.msg);
              }
            });
          })
          .catch(() => {
            this.$toaster.info("已取消删除");
          });
      } else {
        this.dialogVisible = true;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.presentmanagement {
  height: 100%;
  overflow: hidden;
  .el-tabs {
    height: 41px;
  }
  .presentmanagement-main {
    border-top: none;
    position: relative;
    padding-bottom: 50px;
    .presentmanagement-content {
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
