<template>
  <div class="labelmanagement  content-padding">
    <el-radio-group v-model="active" style="margin-bottom: 19px;">
      <el-radio-button :label="item.value" v-for="(item,index) in options" :key="index">{{item.name}}</el-radio-button>
    </el-radio-group>
    <div class="labelmanagement-main">
      <div class="labelmanagement-content tablecontent" v-if="active==1">
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
              <el-button size="mini" type="text" @click="operation(scope.row.id,'detail','appliy')" v-if="permission1_2_2||isAdmin">查看</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'edit','appliy')" v-if="permission1_2_3||isAdmin">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column label="申请时间">
            <template slot-scope="scope">
              <p>{{scope.row.createDate|zhDatetime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="资质评定">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'evaluatedetail','appliy')"  v-if="permission1_2_2||isAdmin">查看</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'evaluate','appliy')"  v-if="permission1_2_6||isAdmin">评定</el-button>
            </template>
          </el-table-column>
          <el-table-column label="审核状态">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'review','appliy',scope.row.nickName)" v-if="permission1_2_1||isAdmin">审核</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total1>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage1" :page-size="pagesize" :total="total1">
        </el-pagination>
      </div>
      <div class="labelmanagement-content tablecontent" v-if="active==2">
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
              <el-button size="mini" type="text" @click="operation(scope.row.id,'detail','existing')" v-if="permission1_2_2||isAdmin">查看</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'edit','existing')" v-if="permission1_2_3||isAdmin">编辑</el-button>
            </template>
          </el-table-column>
          <el-table-column label="账户余额">
            <template slot-scope="scope">
              <p>{{scope.row.balance}}</p>
            </template>
          </el-table-column>
          <el-table-column label="项目列表">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'projectdetail','existing')" v-if="permission1_2_2||isAdmin">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="资质评定">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'evaluatedetail','existing')" v-if="permission1_2_2||isAdmin">查看</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'evaluate','existing')" v-if="permission1_2_6||isAdmin">评定</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'disable','existing',scope.row.nickName)" v-if="scope.row.isDisable==1&&(permission1_2_4||isAdmin)">禁用</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'enable','existing',scope.row.nickName)" v-if="scope.row.isDisable==2&&(permission1_2_5||isAdmin)">启用</el-button>
              <!-- <el-button size="mini" type="text" @click="operation(scope.row.id,'del','existing')">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total2>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage2" :page-size="pagesize" :total="total2">
        </el-pagination>
      </div>
    </div>
    <!--资质类别弹框-->
    <div>
      <el-dialog :visible.sync="dialogQualifica" width="780px" center class="deepbackground notitle tablecontent">
        <div class="dialogQualifica-condition mg_right1">
          <el-form label-width="86px" class="demo-ruleForm ">
            <el-form-item label="资质类别：">
              <el-select v-model="tagTypeId">
                <el-option label="全部" value="" selected="selected"></el-option>
                <el-option v-for="(item,index) in QualificaLabelCategory" :key="index" :label="item.typeName" :value="item.id" v-cloak></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialogQualifica-condition mg_right4">
          <el-form label-width="86px" class="demo-ruleForm ">
            <el-form-item label="标签名称：">
              <el-input v-model="labelName" placeholder="请输入标签名称" maxlength="50"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button style="margin-left: 30px;" @click="qualificaSearch">搜 索</el-button>
        <el-table :data="QualificaLabelName.data" border :header-cell-style="{background:'#517AA4'}">
          <el-table-column property="typeName" label="资质类别" width="200">
          </el-table-column>
          <el-table-column label="标签名称">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.labelName">
                <p slot="reference">{{scope.row.labelName}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="60">
            <template slot-scope="scope">
              <el-checkbox label="" @change="changecheckbox(scope.row)" v-model="QualificaLabelName.data[scope.$index].checked"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
        <div style="overflow: hidden;">
          <el-button @click="showDialog('look')" size="mini" style="margin-top:10px" v-if="permission1_2_2||isAdmin">查看已选</el-button>
          <el-pagination background layout="prev, pager, next" :current-page="pageNum" :page-size="pageSize" :total="QualificaLabelName.pageInfo.total" @current-change="currentChange"></el-pagination>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="confirmQualifica('select')">保 存</el-button>
          <el-button type="primary" @click="close('select')">取 消</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 已选资质 -->
    <el-dialog :visible.sync="selectedQualifications" width="780px" center class="deepbackground slectdialog tablecontent">
      <div style="height:50px;position:relative;">
        <el-button style="position:absolute;right:0px;" size="mini" @click="showDialog('select')" v-if="permission1_2_6||isAdmin">返回选择</el-button>
      </div>
      <el-scrollbar style="height:100%;" :style="{height:maxheight}">
        <el-table :data="labelList" border :header-cell-style="{background:'#517AA4'}">
          <el-table-column property="typeName" label="资质类别" width="200"></el-table-column>
          <el-table-column label="标签名称">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.labelName">
                <p slot="reference">{{scope.row.labelName}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="60">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="changecheckbox(scope.row,'del')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer" style="padding-bottom:15px;">
        <el-button @click="confirmQualifica('look')">保 存</el-button>
        <el-button type="primary" @click="close('look')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "labelmanagement",
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
      selectedQualifications: false,
      QualificaLabelName: {
        data: [],
        pageInfo: {
          pageNum: 0,
          pages: 0,
          total: 0
        }
      },
      pageNum: 1,
      pageSize: 5,
      dialogQualifica: false,
      QualificaLabelCategory: [],
      aptitudeIds: [],
      cateNames: [],
      labelNames: [],
      labelList: [],
      tagTypeId: "",
      labelName: "",
      id: "",
      permission1_2_1:false,
      permission1_2_2:false,
      permission1_2_3:false,
      permission1_2_4:false,
      permission1_2_5:false,
      permission1_2_6:false,
    };
  },
  watch: {
    active() {
      this.serchKey();
    },
    tagTypeId() {
      this.pageNum = 1;
      this.qualificaSearch();
    }
  },
  created() {
    //  this.permission = this.$utils.getStorage('PERMISSION');
    if (this.$utils.getStorage('PERMISSION')) {
       var permissionArr = this.$utils.getStorage('PERMISSION').split(",");
      for (var i = 0; i < permissionArr.length; i++) {
        this[permissionArr[i]] = true;
      }
    } else {
      this.isAdmin = true;
    }
  },
  computed: {
    ...mapState("user", ["token"]),
    maxheight(value) {
      if (this.labelList.length <= 5 && this.labelList.length > 0) {
        return (this.labelList.length + 1) * 55 + 20 + "px";
      } else if (this.labelList.length == 0) {
        return 120 + "px";
      } else {
        return 360 + "px";
      }
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
        .getNewUserApplyList(this.currentPage1, this.pagesize, 2)
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
        .getNowUserList(this.currentPage2, this.pagesize, 2)
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
      } else if (type == "evaluate") {
        this.id = id;
        this.getUserQualification(id);
        this.changeQualifita();
      } else if (type == "evaluatedetail") {
        this.id = id;
        this.getUserQualification(id);
        this.selectedQualifications = true;
      } else if (type == "review") {
        this.$confirm("是否确定【" + nickName + "】通过审核？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "拒绝",
          type: "info"
        })
          .then(res => {
            this.$api.admin.setUserReview(id,1).then(res => {
              if (res.code == 200) {
                this.getNewUserApplyList();
                this.$toaster.ok(res.msg);
              } else {
                this.$toaster.error(res.msg);
              }
            });
          })
          .catch(() => {
            this.$api.admin.setUserReview(id,2).then(res => {
              if (res.code == 200) {
                this.getNewUserApplyList();
                this.$toaster.ok(res.msg);
              } else {
                this.$toaster.error(res.msg);
              }
            });
          });
      }else if(type=='detail'){
        this.$utils.setSession('USERID',id);
        this.$router.push({
          name:'LabelUserInfo',
          query:{
            TYPE:'DETAIL'
          }
        })
      }else if(type=='edit'){
         this.$utils.setSession('USERID',id);
        this.$router.push({
          name:'LabelUserInfo',
          query:{
            TYPE:'EDIT'
          }
        })
      }else if (type == "projectdetail") {
        this.$router.push({
          name:'LabelUserInfoProjectList',
          query:{
            USERTYPE:2,
            ID:id
          }
        })
      }
    },
    getUserQualification(id) {
      this.$api.admin.getUserQualification(id).then(res => {
        if (res.code == 200) {
          this.labelList = [];
          this.aptitudeIds = [];
          this.cateNames = [];
          this.labelNames = [];
          for (var i = 0; i < res.data.length; i++) {
            var id = res.data[i].qualificationTagId;
            var cateName = res.data[i].typeName;
            var labelName = res.data[i].labelName;
            var obj = {};
            obj.id = id;
            obj.typeName = cateName;
            obj.labelName = labelName;
            this.labelList.push(obj);
            if (this.aptitudeIds.indexOf(id) > -1) {
              this.aptitudeIds.splice(this.aptitudeIds.indexOf(id), 1);
              var index = this.cateNames.indexOf(cateName);
              if (this.labelNames[index].length == 1) {
                this.cateNames.splice(index, 1);
                this.labelNames.splice(index, 1);
              } else {
                var indexa = this.labelNames.indexOf(labelName);
                this.labelNames[index].splice(indexa, 1);
              }
            } else {
              this.aptitudeIds.push(id);
              var indexb = this.cateNames.indexOf(cateName);
              if (indexb > -1) {
                this.labelNames[indexb].push(labelName);
              } else {
                var a = [];
                a.push(labelName);
                this.cateNames.push(cateName);
                this.labelNames.push(a);
              }
            }
          }
        } else {
          this.$toaster.error(res.msg);
        }
      });
    },
    close(name) {
      if (name == "look") {
        this.selectedQualifications = false;
      } else {
        this.dialogQualifica = false;
      }
    },
    showDialog(name) {
      //显示弹框
      if (name == "look") {
        this.dialogQualifica = false;
        this.selectedQualifications = true;
      } else {
        this.qualificaSearch();
        this.$api.project
          .getAllQualificationTag()
          .then(res => {
            if ((res.code = 200)) {
              this.QualificaLabelCategory = res.data;
            }
          })
          .catch(() => {});
        this.selectedQualifications = false;
        this.dialogQualifica = true;
      }
    },
    changeQualifita() {
      // 点击选择资质
      this.dialogQualifica = true;
      this.qualificaSearch();
      this.$api.project
        .getAllQualificationTag()
        .then(res => {
          if ((res.code = 200)) {
            this.QualificaLabelCategory = res.data;
          }
        })
        .catch(() => {});
    },
    qualificaSearch() {
      // 搜索标签名称
      this.$api.project
        .getQualificationListTag(
          this.pageNum,
          this.pageSize,
          this.labelName,
          this.tagTypeId
        )
        .then(res => {
          if ((res.code = 200)) {
            this.QualificaLabelName = res;
            if (this.QualificaLabelName.data.length > 0) {
              for (var i = 0; i < this.QualificaLabelName.data.length; i++) {
                if (
                  this.aptitudeIds.indexOf(this.QualificaLabelName.data[i].id) >
                  -1
                ) {
                  this.QualificaLabelName.data[i].checked = true;
                } else {
                  this.QualificaLabelName.data[i].checked = false;
                }
              }
            }
          }
        })
        .catch(() => {});
    },
    currentChange(a) {
      //点击翻页
      this.pageNum = a;
      this.qualificaSearch();
    },
    changecheckbox(data, name) {
      // 点击复选框
      var id = data.id;
      var cateName = data.typeName;
      var labelName = data.labelName;
      if (this.aptitudeIds.indexOf(id) > -1) {
        var indexc = this.aptitudeIds.indexOf(id);
        this.aptitudeIds.splice(indexc, 1);
        this.labelList.splice(indexc, 1);
        var index = this.cateNames.indexOf(cateName);
        if (this.labelNames[index].length == 1) {
          this.cateNames.splice(index, 1);
          this.labelNames.splice(index, 1);
        } else {
          var indexa = this.labelNames.indexOf(labelName);
          this.labelNames[index].splice(indexa, 1);
        }
      } else {
        if (!name) {
          this.labelList.push(data);
          this.aptitudeIds.push(id);
          var indexb = this.cateNames.indexOf(cateName);
          if (indexb > -1) {
            this.labelNames[indexb].push(labelName);
          } else {
            var a = [];
            a.push(labelName);
            this.cateNames.push(cateName);
            this.labelNames.push(a);
          }
        }
      }
      this.qualificaSearch();
    },
    confirmQualifica(name) {
      this.$api.admin
        .setUserQualification(this.aptitudeIds.join(","), this.id)
        .then(res => {
          if (res.code == 200) {
            this.$toaster.ok(res.msg);
            this.labelList = [];
            this.aptitudeIds = [];
            this.cateNames = [];
            this.labelNames = [];
            this.qualificaSearch();
            if (name == "look") {
              this.selectedQualifications = false;
            } else {
              this.dialogQualifica = false;
            }
          } else {
            this.$toaster.error(res.msg);
          }
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.labelmanagement {
  height:100%;
  overflow: hidden;
  .el-tabs {
    height: 41px;
  }
  .labelmanagement-main {
    border-top: none;
    position: relative;
    padding-bottom: 50px;
    .labelmanagement-content {
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
