<template>
  <div class="userdefinedproblem  content-padding">
    <div class="search-box" style="margin-bottom:0 !important;">
      <div class="search-item">
        <span>问题名称：</span>
        <el-input v-model="subject" placeholder="请输入问题名称" class="keyword mg_right1" maxlength="50"></el-input>
      </div>
      <div class="search-item">
        <span>类型：</span>
        <el-select v-model="type" filterable placeholder="请搜索或选择类型" class="mg_right1 keyword3" maxlength="50">
          <el-option label="全部" value="" selected="selected"></el-option>
          <el-option v-for="(item,index) in options" :key="index" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="search-item">
        <span>申请人：</span>
        <el-input v-model="subject" placeholder="请输入申请人" class="keyword mg_right1" maxlength="50"></el-input>
      </div>
      <div class="search-item">
        <el-button type="primary" @click="serchKey()">搜索</el-button>
      </div>
    </div>
    <div class="userdefinedproblem-main">
      <div class="userdefinedproblem-content tablecontent">
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#fafafa'}" v-loading="isloading">
          <el-table-column label="问题名称" width="200px;">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left-start" :content="scope.row.subject">
                <p slot="reference">{{scope.row.subject}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="问题选项">
            <template slot-scope="scope">
              <el-popover placement="top-start" trigger="hover">
                <div><span v-for="(item,index) in scope.row.problemOptionList	" :key="index">&#X3000;{{item.content}}&#X3000;</span></div>
                <p slot="reference"><span v-for="(item,index) in scope.row.problemOptionList	" :key="index">&#X3000;{{item.content}}&#X3000;</span></p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">
              <p>{{scope.row.type|problemType}}</p>
            </template>
          </el-table-column>
          <el-table-column label="创建人">
            <template slot-scope="scope">
              <p>{{scope.row.status|labelState}}</p>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <p>{{scope.row.status|zhDatetime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'review',scope.row.subject)">审核</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'del',scope.row.subject)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userdefinedproblem",
  data() {
    return {
      isloading: false,
      type: "",
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 0, //总数
      subject: "",
      tableData: [],
      options: [{ name: "选择题", value: "1" }, { name: "问答题", value: "2" }]
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
        this.$confirm("是否确定【" + subject + "】字幕问题通过审核？", "", {
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
      } else if (type == "del") {
        this.$confirm("是否确定删除【" + subject + "】字幕问题？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
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
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.userdefinedproblem {
  height: 100%;
  overflow: hidden;
  .el-tabs {
    height: 41px;
  }
  .userdefinedproblem-main {
    border-top: none;
    position: relative;
    padding-bottom: 50px;
    .userdefinedproblem-content {
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
