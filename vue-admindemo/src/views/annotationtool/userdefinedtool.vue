<template>
  <div class="systemannotationtool  content-padding">
    <div class="search-box" style="margin-bottom:0 !important;">
      <div class="search-item">
        <span>名称：</span>
        <el-input v-model="toolName" placeholder="请输入名称" class="keyword mg_right1" maxlength="50"></el-input>
      </div>
      <div class="search-item">
        <span>状态：</span>
        <el-select v-model="type" filterable placeholder="请搜索或选择类型" class="mg_right1 keyword3" maxlength="50">
          <el-option label="全部" value="" selected="selected"></el-option>
          <el-option v-for="(item,index) in options" :key="index" :label="item.name" :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="search-item">
        <span>申请人：</span>
        <el-input v-model="toolName" placeholder="请输入申请人" class="keyword mg_right1" maxlength="50"></el-input>
      </div>
      <div class="search-item">
        <el-button type="primary" @click="serchKey()">搜索</el-button>
      </div>
    </div>
    <div class="systemannotationtool-main">
      <div class="systemannotationtool-content tablecontent">
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#fafafa'}" v-loading="isloading">
          <el-table-column label="名称">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left-start" :content="scope.row.toolName">
                <p slot="reference">{{scope.row.toolName}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="图标">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start">
                <div>
                  <img :src="scope.row.toolImage">
                </div>
                <p slot="reference"> <img :src="scope.row.toolImage"></p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <p>{{scope.row.status|labelState}}</p>
            </template>
          </el-table-column>
          <el-table-column label="申请人">
            <template slot-scope="scope">
              <p>{{scope.row.status|labelState}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'review',scope.row.toolName)">审核</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'del',scope.row.toolName)">删除</el-button>
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
  name: "systemannotationtool",
  data() {
    return {
      isloading: false,
      type: "",
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 0, //总数
      toolName: "",
      tableData: [],
      options: [
        { name: "待审核", value: "1" },
        { name: "未通过", value: "2" },
        { name: "已通过", value: "3" }
      ]
    };
  },
  watch: {
    toolName(value) {
      this.serchKey();
    },
    type(value) {
      this.serchKey();
    }
  },
  created() {},
  mounted() {
    this.getLabelToolList();
  },
  methods: {
    serchKey() {
      this.currentPage = 1;
      this.getLabelToolList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getLabelToolList();
    },
    getLabelToolList() {
      this.isloading = true;
      this.$api.admin
        .getLabelToolList(
          this.currentPage,
          this.pagesize,
          this.toolName,
          this.type
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getLabelToolList();
          } else {
            this.total = res.pageInfo.total;
            this.tableData = res.data;
          }
          this.isloading = false;
        });
    },
    operation(id, type, toolName) {
      if (type == "review") {
        this.$confirm("是否确定【" + toolName + "】标注工具通过审核？", "", {
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
        this.$confirm("是否确定删除【" + toolName + "】标注工具？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        })
          .then(res => {
            this.$api.admin
              .delfun("pc/labelTool/delLabelTool", id)
              .then(res => {
                if (res.code == 200) {
                  this.getLabelToolList();
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
.systemannotationtool {
  height: 100%;
  overflow: hidden;
  .el-tabs {
    height: 41px;
  }
  .systemannotationtool-main {
    border-top: none;
    position: relative;
    padding-bottom: 50px;
    .systemannotationtool-content {
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
