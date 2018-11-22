<template>
  <div class="systemlog  content-padding">
    <div class="search-box" style="margin-bottom:0 !important;">
      <div class="search-item">
        <span>标题：</span>
        <el-input v-model="title" placeholder="请输入标题" class="keyword mg_right1" maxlength="50"></el-input>
      </div>
      <div class="search-item">
        <span>创建时间：</span>
        <el-date-picker class="mg_right" v-model="tradingtime" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" align="right">
        </el-date-picker>
      </div>
      <div class="search-item">
        <el-button type="primary" @click="serchKey()">搜索</el-button>
      </div>
    </div>
    <div class="systemlog-main">
      <div class="systemlog-content tablecontent">
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#fafafa'}" v-loading="isloading">
          <el-table-column label="标题">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.title">
                <p slot="reference">{{scope.row.title}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="内容">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.content">
                <p slot="reference">{{scope.row.content}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="创建人">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.name">
                <p slot="reference">{{scope.row.name}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.createDate|zhDatetime">
                <p slot="reference">{{scope.row.createDate|zhDatetime}}</p>
              </el-popover>
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
  name: "systemlog",
  data() {
    return {
      isloading: false,
      cateId: "",
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 0, //总数
      title: "",
      tableData: [],
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
  watch: {
    // title(value) {
    //   this.serchKey();
    // },
    // tradingtime(value) {
    //   this.serchKey();
    // }
  },
  created() {},
  mounted() {
    this.getSystemLog();
  },
  methods: {
    serchKey() {
      this.currentPage = 1;
      this.getSystemLog();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getSystemLog();
    },
    getSystemLog() {
      this.isloading = true;
      if (this.tradingtime == undefined || this.tradingtime == null) {
        var startDate = "";
        var endDate = "";
      } else {
        var startDate = this.$utils.zhDatetime(this.tradingtime[0]);
        var endDate = this.$utils.zhDatetime(this.tradingtime[1]);
      }
      this.$api.admin
        .getSystemLog(
          this.currentPage,
          this.pagesize,
          this.title,
          startDate,
          endDate
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getSystemLog();
          } else {
            this.total = res.pageInfo.total;
            this.tableData = res.data;
          }
          this.isloading = false;
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.systemlog {
  height: 100%;
  overflow: hidden;
  .el-tabs {
    height: 41px;
  }
  .systemlog-main {
    border-top: none;
    position: relative;
    padding-bottom: 50px;
    .systemlog-content {
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
