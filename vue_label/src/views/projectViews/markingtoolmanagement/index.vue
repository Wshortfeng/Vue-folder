<template>
  <div class="markingtoolmanagement  content-padding">
    <div class="operation_box">
       <el-radio-group v-model="active">
        <el-radio-button label="1" >我的图标</el-radio-button>
        <el-radio-button label="2" >我的字幕</el-radio-button>
      </el-radio-group>
      <el-button type="primary" class="addclass" v-if="active==1" @click="showtoolbox(0)">新增</el-button>
      <el-button type="primary" class="addclass" v-else @click="showproblembox(0)">新增</el-button>
    </div>
    <div class="markingtoolmanagement-main">
      <div class="markingtoolmanagement-content tablecontent" v-if="active==1">
        <el-table :data="toolList" border style="width: 100%" :header-cell-style="{background:'#f6f6f6',color:'#333333'}" v-loading="isloading1">
          <el-table-column label="类别" width="80px">
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
             <p > <img :src="scope.row.toolImage"></p>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <p>{{scope.row.status|labelState}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'edit','label')" v-if="scope.row.status==1||scope.row.status==4">编辑</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'apply','label',scope.row.toolName)" v-if="scope.row.status==1||scope.row.status==4">申请</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'del','label',scope.row.toolName)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total1>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange1" :current-page="currentPage1" :page-size="pagesize" :total="total1">
        </el-pagination>
      </div>
      <div class="markingtoolmanagement-content tablecontent" v-else>
        <el-table :data="problemList" border style="width: 100%" :header-cell-style="{background:'#f6f6f6',color:'#333333'}" v-loading="isloading2">
          <el-table-column label="字幕名称" width="200px;">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left-start" :content="scope.row.subject">
                <p slot="reference">{{scope.row.subject}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="字幕选项">
            <template slot-scope="scope">
              <el-popover placement="top-start" trigger="hover">
                <div><span v-for="(item,index) in scope.row.questionOptionList" :key="index">&#X3000;{{index+1}}）{{item.content}}&#X3000;</span></div>
                <p slot="reference"><span v-for="(item,index) in scope.row.questionOptionList" :key="index">&#X3000;{{index+1}}）{{item.content}}&#X3000;</span></p>
              </el-popover>
            </template>
          </el-table-column>
           <el-table-column label="类型">
            <template slot-scope="scope">
              <p>{{scope.row.type|problemType}}</p>
            </template>
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <p>{{scope.row.status|labelState}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'edit','problem',scope.row.subject)" v-if="scope.row.status==1||scope.row.status==4">编辑</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'apply','problem',scope.row.subject)" v-if="scope.row.status==1||scope.row.status==4">申请</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'del','problem',scope.row.subject)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total2>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange2" :current-page="currentPage2" :page-size="pagesize" :total="total2">
        </el-pagination>
      </div>
    </div>
    <tool :toolFormVisible="toolFormVisible" :toolType="toolType" :toolId="toolId" @closetoolForm="closetoolForm" />
    <problem :problemFormVisible="problemFormVisible" :problemType="problemType" :problemId="problemId" @closeproblemForm="closeproblemForm" />
  </div>
</template>

<script>
import tool from "../../../components/tool";
import problem from "../../../components/problem";
export default {
  components: { tool, problem },
  name: "markingtoolmanagement",
  data() {
    return {
      isloading1: true,
      isloading2: true,
      toolFormVisible: false,
      problemFormVisible: false,
      active: "1",
      currentPage1: 1, //初始页
      currentPage2: 1, //初始页
      pagesize: 10, //    每页的数据
      total1: 0, //总数
      total2: 0, //总数
      toolName: "",
      type: "",
      toolType: 0,
      toolId: 0,
      toolList: [], //图标列表
      problemType: 0,
      problemId: 0,
      problemList: []
    };
  },
  watch: {
    toolName(value) {
      this.currentPage1 = 1;
      this.getUserLableToolList();
    },
    type(value) {
      this.currentPage1 = 1;
      this.getUserLableToolList();
    },
    currentPage1(value) {
      this.getUserLableToolList();
    },
    currentPage2(value) {
      this.getUserQuestionList();
    },
    active(value){
      if (value == 1) {
        this.getUserLableToolList();
      } else {
        this.getUserQuestionList();
      }
    }
  },
  mounted() {
    this.getUserLableToolList();
  },
  methods: {
    handleCurrentChange1: function(currentPage) {
      this.currentPage1 = currentPage;
    },
    getUserLableToolList() {
      //获取图标列表
      this.isloading1 = true;
      this.$api.project
        .getUserLableToolList(this.currentPage1, this.pagesize)
        .then(res => {
          if (this.currentPage1 != 1 && res.data.length == 0) {
            this.currentPage1 = this.currentPage1 - 1;
            this.getUserLableToolList();
          } else {
            this.total1 = res.pageInfo.total;
            this.toolList = res.data;
            this.isloading1 = false;
          }
        });
    },
    getUserQuestionList() {
      this.isloading2 = true;
      this.$api.project
        .getUserQuestionList(this.currentPage2, this.pagesize)
        .then(res => {
          if (this.currentPage2 != 1 && res.data.length == 0) {
            this.currentPage2 = this.currentPage2 - 1;
            this.getUserQuestionList();
          } else {
            this.total2 = res.pageInfo.total;
            this.problemList = res.data;
            this.isloading2 = false;
          }
        });
    },
    showtoolbox(type, id) {
      this.toolType = type;
      this.toolId = id;
      this.toolFormVisible = true;
    },
    closetoolForm() {
      this.toolFormVisible = false;
      this.getUserLableToolList();
    },
    handleCurrentChange2: function(currentPage) {
      this.currentPage2 = currentPage;
    },
    closeproblemForm() {
      this.problemFormVisible = false;
      this.getUserQuestionList();
    },
    showproblembox(type, id) {
      this.problemType = type;
      this.problemId = id;
      this.problemFormVisible = true;
    },
    operation(id, type, name, toolNmae) {
      if (name == "label") {
        if (type == "edit") {
          this.showtoolbox(1, id);
        } else if (type == "apply") {
          this.$confirm("是否确定申请【" + toolNmae + "】标注工具？", "", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(res => {
              this.$api.project.applyUserLabelTool(id).then(res => {
                if (res.code == 200) {
                  this.getUserLableToolList();
                  this.$toaster.ok(res.msg);
                } else {
                  this.$toaster.error(res.msg);
                }
              });
            })
            .catch(() => {
              // this.$toaster.info("已取消申请");
            });
        } else if (type == "del") {
          this.$confirm("是否确定删除【" + toolNmae + "】标注工具？", "", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "error"
          })
            .then(res => {
              this.$api.project
                .delfun("pc/labelTool/delLabelTool", id)
                .then(res => {
                  if (res.code == 200) {
                    this.getUserLableToolList();
                    this.$toaster.ok("删除成功");
                  } else {
                    this.$toaster.error(res.msg);
                  }
                });
            })
            .catch(() => {
              // this.$toaster.info("已取消删除");
            });
        }
      } else if (name == "problem") {
        if (type == "edit") {
          this.showproblembox(1, id);
        } else if (type == "apply") {
          this.$confirm("是否确定申请【" + toolNmae + "】字幕？", "", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          })
            .then(res => {
              this.$api.project.applyUserQuestion(id).then(res => {
                if (res.code == 200) {
                  this.getUserQuestionList();
                  this.$toaster.ok(res.msg);
                } else {
                  this.$toaster.error(res.msg);
                }
              });
            })
            .catch(() => {
              // this.$toaster.info("已取消申请");
            });
        } else if (type == "del") {
          this.$confirm("是否确定删除【" + toolNmae + "】字幕？", "", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "error"
          })
            .then(res => {
              this.$api.project
                .delfun("pc/question/delQuestion", id)
                .then(res => {
                  if (res.code == 200) {
                    this.getUserQuestionList();
                    this.$toaster.ok("删除成功");
                  } else {
                    this.$toaster.error(res.msg);
                  }
                });
            })
            .catch(() => {
              // this.$toaster.info("已取消删除");
            });
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.markingtoolmanagement {
  .el-tabs {
    height: 41px;
  }
  .markingtoolmanagement-main {
    height: 590px;
    border-top: none;
    position: relative;
    .markingtoolmanagement-content {
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
