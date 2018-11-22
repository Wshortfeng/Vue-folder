<template>
  <div class="projectlist content-padding">
    <el-input v-model="keyWord" placeholder="请输入项目名称" class="keyword4 " maxlength="50"></el-input>
    <el-button type="primary" @click="serchKey()" style="position:relative;left:-5px;">搜索</el-button>
    <div class="myproject-main">
      <div class="nav-box">
        <ul>
          <li v-for="(item,index) in navList" :key="index" @click="selectnav($event,item.value)" :class="{selectNav:item.value==status}">{{item.name}}</li>
        </ul>
      </div>
      <div :class="{listcontent:true,tablecontent:true,tableclass:status==4,nobottom:tableData.length>=10}" style="border-top-right-radius: 2px;border-bottom-right-radius: 2px;">
        <el-table :data="tableData" border style="width: 100%;" :header-cell-style="{background:'#f6f6f6',color:'#333333'}" v-loading="isloading">
          <el-table-column label="项目号">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.projectNumber">
                <p slot="reference">{{scope.row.projectNumber}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="项目名称">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.projectName">
                <p slot="reference">{{scope.row.projectName}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" v-if="status==1">
            <template slot-scope="scope">
              <p>{{scope.row.createDate|zhDatetime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="申请时间" v-if="status==2">
            <template slot-scope="scope">
              <p>{{scope.row.applyDate|zhDatetime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="项目截止时间" v-if="status>=3">
            <template slot-scope="scope">
              <p>{{scope.row.endTime|zhDatetime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="项目进度" v-if="status==4">
            <template slot-scope="scope">
              <el-progress type="circle" :percentage="(scope.row.process*100).toFixed(0)" :width=45 :stroke-width=4></el-progress>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'detail')">查看</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'edit')" v-if="status==1">编辑</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'del',scope.row.projectName)" v-if="status==1">删除</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'withdraw',scope.row.projectName)" v-if="status==2">取消申请</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'adddata')" v-if="status==3">添加数据</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'grounding',scope.row.projectName)" v-if="status==3">上架</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'cancelground',scope.row.projectName)" v-if="status==4">取消上架</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'downloaddata',scope.row.projectName)" v-if="status==8">下载数据</el-button>
            </template>
          </el-table-column>
        </el-table>

      </div>
      <div class="clear"></div>
     <div class="pagination-box" style="height:40px;">
         <el-pagination v-show="tableData.length>0&&total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
      </el-pagination>
     </div>
    </div>
  </div>
</template>

<script>
import breadcrumbProject from "../../../components/breadcrumbproject";
export default {
  components: { breadcrumbProject },
  name: "projectlist",
  data() {
    return {
      isloading: true,
      navList: [
        {
          name: "待申请",
          value: 1
        },
        {
          name: "待审核",
          value: 2
        },
        {
          name: "待发布",
          value: 3
        },
        {
          name: "进行中",
          value: 4
        },
        {
          name: "待验收",
          value: 5
        },
        {
          name: "验收不通过",
          value: 11
        },
        {
          name: "待仲裁",
          value: 6
        },
        {
          name: "待结算",
          value: 7
        },
        {
          name: "已完成",
          value: 8
        },
        {
          name: "已失败",
          value: 9
        },
        {
          name: "已过期",
          value: 10
        }
      ],
      keyWord: "",
      status: 1,
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 0, //总数
      tableData: []
    };
  },
  watch: {
    keyWord(value) {
      // this.currentPage = 1;
      // this.isloading = true;
      // this.getUserProjectList();
      //  this.keyWord = this.keyWord.replace(/[^A-Za-z0-9\u4e00-\u9fa5]/g,'');
    }
  },
  created() {
    this.status = this.$utils.getSession("PROJECTSTATUS") || 1;
    this.getUserProjectList();
  },
  methods: {
    selectnav(e, status) {
      this.status = status;
      this.currentPage = 1;
      this.$utils.setSession("PROJECTSTATUS", status);
      this.getUserProjectList();
    },
    serchKey() {
      this.currentPage = 1;
      this.isloading = true;
      this.getUserProjectList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.isloading = true;
      this.getUserProjectList();
    },
    getUserProjectList() {
      this.$api.project
        .getUserProjectList(
          this.currentPage,
          this.pagesize,
          this.keyWord,
          this.status
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getUserProjectList();
          } else {
            this.total = res.pageInfo.total;
            this.tableData = res.data;
            this.isloading = false;
          }
        });
    },
    operation: function(id, name, projectName) {
      //操作
      this.$utils.setSession("projectId", id);
      if (name == "detail") {
        this.$router.push({
          name: "项目详情",
          query: {
            ENTRY: "LIST"
          }
        });
      } else if (name == "edit") {
        this.$utils.setSession("projectEditId", id);
        this.$utils.setSession("projectEditStatus", true);
        this.$router.push({
          name: "项目编辑"
        });
      } else if (name == "del") {
        this.$confirm("是否确定删除【" + projectName + "】项目？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        })
          .then(() => {
            this.$api.project.delfun("pc/project/delProject", id).then(res => {
              if (res.code == 200) {
                this.getUserProjectList();
                this.$toaster.ok(res.msg);
              } else {
                this.$toaster.error(res.msg);
              }
            });
          })
      } else if (name == "withdraw") {
        this.$confirm("是否确定取消申请【" + projectName + "】项目？", "", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "warning"
        }).then(() => {
          this.$api.project.removeApplyProject(id).then(res => {
            if (res.code == 200) {
              this.getUserProjectList();
              this.$toaster.ok(res.msg);
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      } else if (name == "adddata") {
        this.$router.push({
          name: "添加数据"
        });
      } else if (name == "grounding") {
        this.$confirm(
          "项目上架后若被接单将无法取消，是否上架【" + projectName + "】项目？",
          "",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "success"
          }
        ).then(() => {
          this.$api.project.upAndDownProject(id).then(res => {
            if (res.code == 200) {
              this.getUserProjectList();
              this.$toaster.ok(res.msg);
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      } else if (name == "cancelground") {
        this.$confirm("是否取消上架【" + projectName + "】项目？", "", {
          confirmButtonText: "是",
          cancelButtonText: "否",
          type: "info"
        }).then(() => {
          this.$api.project.upAndDownProject(id).then(res => {
            if (res.code == 200) {
              this.getUserProjectList();
              this.$toaster.ok(res.msg);
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      } else if (name == "downloaddata") {
        this.$confirm("是否确定下载【" + projectName + "】项目数据？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        }).then(() => {
          this.$api.project.downloadProjectData(id).then(res => {
            if (res.code == 200) {
              location.href = res.data;
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.projectlist {
  .listcontent {
    position: relative;
    float: right;
    box-sizing: border-box;
    width: 800px;
    height: 607px;
    border: 1px solid #eee;
    border-left: none;
    .el-table--border,
    .el-table--group {
      border: none;
    }
    table {
      th,
      td {
        text-align: center;
        .cell {
          white-space: nowrap;
          width: 100%; /* IE6 需要定义宽度 */
          overflow: hidden;

          p {
            line-height: 47px;
            white-space: nowrap;
            width: 100%; /* IE6 需要定义宽度 */
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .el-button {
            line-height: 30px;
          }
        }
      }
      tr {
        td {
          padding: 0 !important;
          .cell {
            height: 49px !important;
            box-sizing: border-box;
            padding-top: 2px;
            .el-progress__text {
              font-size: 12px !important;
            }
          }
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
