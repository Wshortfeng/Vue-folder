<template>
  <div class="projectmanagement  content-padding">
    <el-radio-group v-model="active" style="margin-bottom: 19px;">
      <el-radio-button :label="item.value" v-for="(item,index) in options" :key="index">{{item.name}}</el-radio-button>
    </el-radio-group>
    <div class="projectmanagement-main">
      <div class="projectmanagement-content tablecontent" v-if="active==1">
        <el-table :data="tableData1" border style="width: 100%" :header-cell-style="{background:'#fafafa'}" v-loading="isloading1">
          <el-table-column label="申请人" >
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left-start" :content="scope.row.nickName">
                <p slot="reference">{{scope.row.nickName}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="申请资料">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'detail','appliy')" v-if="permission1_3_2||isAdmin">查看</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'edit','appliy')" v-if="permission1_3_3||isAdmin">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column label="申请时间">
            <template slot-scope="scope">
              <p>{{scope.row.createDate|zhDatetime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="审核状态">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'review','appliy',scope.row.nickName)" v-if="permission1_3_1||isAdmin">审核</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total1>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage1" :page-size="pagesize" :total="total1">
        </el-pagination>
      </div>
      <div class="projectmanagement-content tablecontent" v-if="active==2">
        <el-table :data="tableData2" border style="width: 100%" :header-cell-style="{background:'#fafafa'}" v-loading="isloading2">
          <el-table-column label="用户名">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left-start" :content="scope.row.nickName">
                <p slot="reference">{{scope.row.nickName}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="用户资料">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'detail','existing')" v-if="permission1_3_2||isAdmin">查看</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'edit','existing')" v-if="permission1_3_3||isAdmin">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column label="账户余额">
            <template slot-scope="scope">
              <p>{{scope.row.balance}}</p>
            </template>
          </el-table-column>
          <el-table-column label="项目列表">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'projectdetail','existing')" v-if="permission1_3_2||isAdmin">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'disable','existing')" v-if="scope.row.isDisable==1&(permission1_3_4||isAdmin)">禁用</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'enable','existing')" v-if="scope.row.isDisable==2&(permission1_3_5||isAdmin)">启用</el-button>
              <!-- <el-button size="mini" type="text" @click="operation(scope.row.id,'del','existing')">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total2>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage2" :page-size="pagesize" :total="total2">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "projectmanagement",
  data() {
    return {
      isloading1: false,
      isloading2: false,
      active: "1",
      currentPage1: 1, //初始页
      pagesize: 10, //    每页的数据
      total1: 0, //总数
      currentPage1: 2, //初始页
      total2: 0, //总数
      nickName: "",
      tableData1: [],
      tableData2: [],
      options: [
        { name: "新用户申请", value: "1" },
        { name: "现有用户管理", value: "2" }
      ],
      permission1_3_1: false,
      permission1_3_2: false,
      permission1_3_3: false,
      permission1_3_4: false,
      permission1_3_5: false
    };
  },
  watch: {
    active() {
      this.serchKey();
    }
  },
  created() {
    //  this.permission = this.$utils.getStorage('PERMISSION');
    if (this.$utils.getStorage("PERMISSION")) {
      var permissionArr = this.$utils.getStorage("PERMISSION").split(",");
      for (var i = 0; i < permissionArr.length; i++) {
        this[permissionArr[i]] = true;
      }
    } else {
      this.isAdmin = true;
    }
  },
  mounted() {
    this.getNewUserApplyList();
  },
  methods: {
    serchKey() {
      if (this.active == 1) {
        this.currentPage1 = 1;
        this.getNewUserApplyList();
      } else {
        this.currentPage2 = 1;
        this.getNowUserList();
      }
    },
    handleCurrentChange: function(currentPage) {
      if (this.active == 1) {
        this.currentPage1 = currentPage;
        this.getNewUserApplyList();
      } else {
        this.currentPage2 = currentPage;
        this.getNowUserList();
      }
    },
    getNewUserApplyList() {
      this.isloading1 = true;
      this.$api.admin
        .getNewUserApplyList(this.currentPage1, this.pagesize, 1)
        .then(res => {
          if (this.currentPage1 != 1 && res.data.length == 0) {
            this.currentPage1 = this.currentPage1 - 1;
            this.getNewUserApplyList();
          } else {
            this.total1 = res.pageInfo.total;
            this.tableData1 = res.data;
          }
          this.isloading1 = false;
        });
    },
    getNowUserList() {
      this.isloading2 = true;
      this.$api.admin
        .getNowUserList(this.currentPage2, this.pagesize, 1)
        .then(res => {
          if (this.currentPage2 != 1 && res.data.length == 0) {
            this.currentPage2 = this.currentPage2 - 1;
            this.getNowUserList();
          } else {
            this.total2 = res.pageInfo.total;
            this.tableData2 = res.data;
          }
          this.isloading2 = false;
        });
    },
    operation(id, type, operationType, nickName) {
      if (type == "disable") {
        this.$confirm("是否确定禁用【" + nickName + "】？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(res => {
            this.$api.admin.disableAndEnableUser(id).then(res => {
              if (res.code == 200) {
                this.getNowUserList();
                this.$toaster.ok("禁用成功");
              } else {
                this.$toaster.error(res.msg);
              }
            });
          })
          .catch(() => {});
      } else if (type == "enable") {
        this.$confirm("是否确定重新启用【" + nickName + "】？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        }).then(res => {
          this.$api.admin.disableAndEnableUser(id).then(res => {
            if (res.code == 200) {
              this.getNowUserList();
              this.$toaster.ok("启用成功");
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      } else if (type == "review") {
        this.$confirm("是否确定【" + nickName + "】通过审核？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "拒绝",
          type: "info"
        })
          .then(res => {
            this.$api.admin.setUserReview(id, 1).then(res => {
              if (res.code == 200) {
                this.getNewUserApplyList();
                this.$toaster.ok(res.msg);
              } else {
                this.$toaster.error(res.msg);
              }
            });
          })
          .catch(() => {
            this.$api.admin.setUserReview(id, 2).then(res => {
              if (res.code == 200) {
                this.getNewUserApplyList();
                this.$toaster.ok(res.msg);
              } else {
                this.$toaster.error(res.msg);
              }
            });
          });
      } else if (type == "detail") {
        this.$utils.setSession("USERID", id);
        this.$router.push({
          name: "ProjectUserInfo",
          query: {
            TYPE: "DETAIL"
          }
        });
      } else if (type == "edit") {
        this.$utils.setSession("USERID", id);
        this.$router.push({
          name: "ProjectUserInfo",
          query: {
            TYPE: "EDIT"
          }
        });
      } else if (type == "projectdetail") {
        this.$router.push({
          name:'ProjectUserInfoProjectList',
          query:{
            USERTYPE:1,
            ID:id
          }
        })
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.projectmanagement {
  height: 100%;
  overflow: hidden;
  .el-tabs {
    height: 41px;
  }
  .projectmanagement-main {
    border-top: none;
    position: relative;
    padding-bottom: 50px;
    .projectmanagement-content {
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
.el-tree-node__children {
  .el-tree-node__children {
    .el-tree-node {
      display: inline-block;
    }
  }
}
// .el-tree-node__content > .el-tree-node__expand-icon,.el-tree-node__expand-icon.expanded{
//   display: none;
// }
.el-tree-node__content:hover {
  background-color: transparent !important;
}
.el-tree > .el-tree-node > .el-tree-node__content {
  font-weight: bold;
  line-height: 50px;
  height: 50px;
}
</style>
