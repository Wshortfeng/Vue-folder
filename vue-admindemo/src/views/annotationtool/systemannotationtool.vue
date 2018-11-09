<template>
  <div class="systemannotationtool  content-padding">
    <div class="search-box" >
      <span>类型：</span>
      <el-select v-model="type" filterable placeholder="请搜索或选择类型" class="mg_right1 keyword3" maxlength="50">
         <el-option label="全部" value="" selected="selected"></el-option>
        <el-option v-for="(item,index) in options" :key="index" :label="item.name" :value="item.value">
        </el-option>
      </el-select>
      <span>名称：</span>
      <el-input v-model="toolName" placeholder="请输入名称"  class="keyword mg_right1" maxlength="50"></el-input>
      <el-button type="primary" @click="serchKey()">搜索</el-button>
      <el-button type="primary" @click="showbox(0)" class="right_btn">新增</el-button>
    </div>
    <div class="systemannotationtool-main">
      <div class="systemannotationtool-content tablecontent">
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#fafafa'}" v-loading="isloading">
          <el-table-column label="类型" width="80px">
            <template slot-scope="scope">
              <p>{{scope.row.type|labelType}}</p>
            </template>
          </el-table-column>
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
          <el-table-column label="排序">
            <template slot-scope="scope">
              <p>{{scope.row.status|labelState}}</p>
            </template>
          </el-table-column>
           <el-table-column label="属性">
            <template slot-scope="scope">
              <p>{{scope.row.status|labelState}}</p>
            </template>
          </el-table-column>
          <el-table-column label="是否默认">
            <template slot-scope="scope">
              <p>{{scope.row.status|labelState}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'edit',scope.row.toolName)">编辑</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'del',scope.row.toolName)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
        </el-pagination>
      </div>
    </div>
    <tool :toolFormVisible="toolFormVisible" :toolType="toolType" :toolId="toolId" @closetoolForm="closetoolForm" />
  </div>
</template>

<script>
import tool from "../../components/tool";
export default {
   components: { tool },
  name: "systemannotationtool",
  data() {
    return {
      toolFormVisible:false,
      isloading: false,
      type: "",
      currentPage: 1, //初始页
      pagesize:10, //    每页的数据
      total: 0, //总数
      toolName: "",
      tableData: [],
      options: [
        {name:'点',value:'1'},
        {name:'线',value:'2'},
        {name:'框',value:'3'},
      ],
      toolType:0,
      toolId:0,
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
  created() {
  },
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
          this.type,
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
     closetoolForm() {
      this.toolFormVisible = false;
      this.getLabelToolList();
    },
    showbox(type, id) {
      this.toolType = type;
      this.toolId = id;
      this.toolFormVisible = true;
    },
    operation(id, type, toolName) {
      if (type == "edit") {
        this.showbox(1, id);
      } else if (type == "del") {
        this.$confirm("是否确定删除【" + toolName + "】标注工具？", "提示", {
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
  min-height: calc(100% - 25px);
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
