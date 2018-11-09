<template>
  <div class="qualificationlabelmanagement  content-padding">
    <div class="search-box">
      <span>资质类别：</span>
      <el-select v-model="cateId" filterable placeholder="请搜索或选择资质类别" class="mg_right1 min_select" maxlength="50">
        <el-option v-for="(item,index) in options" :key="index" :label="item.typeName" :value="item.id">
        </el-option>
      </el-select>
      <span>资质名称：</span>
      <el-input v-model="labelName" placeholder="请输入资质标签" class="keyword mg_right1" maxlength="50"></el-input>
      <el-button type="primary" @click="serchKey()">搜索</el-button>
      <el-button type="primary" @click="showbox(0)" class="right_btn"  v-if="permission7_2_1||isAdmin">新增</el-button>
    </div>
    <div class="qualificationlabelmanagement-main">
      <div class="qualificationlabelmanagement-content tablecontent">
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#fafafa'}" v-loading="isloading">
          <el-table-column label="资质类别名称">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.typeName">
                <p slot="reference">{{scope.row.typeName}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="资质标签名称">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.labelName">
                <p slot="reference">{{scope.row.labelName}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="创建人">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.createName">
                <p slot="reference">{{scope.row.createName}}</p>
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'edit',scope.row.labelName)"  v-if="permission7_2_2||isAdmin">编辑</el-button>
              <el-button size="mini" type="text" @click="operation(scope.row.id,'del',scope.row.labelName)"  v-if="permission7_2_3||isAdmin">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 新增编辑资质类别名称 -->
    <el-dialog :visible.sync="showaddeditbox" width="500px" class="deepbackground editbox" center style="padding:15px 20px;">
      <p class="headerTitle">{{title}}</p>
      <el-form ref="addeditbox" :model="addeditbox" class="demo-form-inline addeditbox" :rules="addeditboxRules" label-width="125px">
        <el-form-item prop="cateId" label="所属标签类别：">
          <el-select v-model="addeditbox.cateId" filterable placeholder="请搜索或选择资质类别" class="mg_right1">
            <el-option v-for="(item,index) in options1" :key="index" :label="item.typeName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="labelName" label="资质标签名称：">
          <el-input v-model="addeditbox.labelName" placeholder="请输入资质标签名称" maxlength="30"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="confirm('addeditbox')">确 定</el-button>
        <el-button type="primary" @click="showaddeditbox=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "qualificationlabelmanagement",
  data() {
    return {
      isloading: false,
      cateId: "",
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 0, //总数
      labelName: "",
      tableData: [],
      showaddeditbox: false,
      addeditbox: {
        labelName: "",
        cateId: ""
      },
      options: [],
      options1: [],
      addeditboxRules: {
        labelName: [
          { required: true, message: "请输入资质标签名称", trigger: "blur" }
        ],
        cateId: [
          { required: true, message: "请选择资质类别", trigger: "change" }
        ]
      },
      type: 0,
      id: "",
      title: "新增资质类别",
      permission7_2_1: false,
      permission7_2_2: false,
      permission7_2_3: false
    };
  },
  watch: {
    // labelName(value) {
    //   this.serchKey();
    // },
    cateId(value) {
      this.serchKey();
    }
  },
  created() {
    if (this.$utils.getStorage("PERMISSION")) {
      //获取权限
      var permissionArr = this.$utils.getStorage("PERMISSION").split(",");
      for (var i = 0; i < permissionArr.length; i++) {
        this[permissionArr[i]] = true;
      }
    } else {
      this.isAdmin = true;
    }
    this.$api.admin.getAllQualificationTag().then(res => {
      //获取类别
      if (res.code == 200) {
        this.options1 = JSON.parse(JSON.stringify(res.data));
        this.options = JSON.parse(JSON.stringify(res.data));
        if (this.options.length > 0) {
          this.options.splice(0, 0, { typeName: "全部", id: "" });
        }
      } else {
        this.$toaster.error(res.msg);
      }
    });
  },
  mounted() {
    this.getQualificationTagList();
  },
  methods: {
    serchKey() {
      this.currentPage = 1;
      this.getQualificationTagList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getQualificationTagList();
    },
    getQualificationTagList() {
      this.isloading = true;
      this.$api.admin
        .getQualificationTagList(
          this.currentPage,
          this.pagesize,
          this.cateId,
          this.labelName
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getQualificationTagList();
          } else {
            this.total = res.pageInfo.total;
            this.tableData = res.data;
          }
          this.isloading = false;
        });
    },
    showbox(type, id) {
      this.type = type;
      this.id = id;
      if (type == 0) {
        this.title = "新增资质标签";
      } else {
        this.title = "编辑资质标签";
        this.$api.admin.getQualificationTag(id).then(res => {
          this.addeditbox.labelName = res.data.labelName;
          this.addeditbox.cateId = res.data.tagTypeId;
        });
      }
      this.showaddeditbox = true;
      this.$refs["addeditbox"].resetFields();
    },
    close() {
      this.addeditbox.cateId = "";
      this.addeditbox.labelName = "";
      this.getQualificationTagList();
      this.showaddeditbox = false;
    },
    confirm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          var addeditbox = this.addeditbox;
          if (this.type == 1) {
            this.$api.admin
              .updateQualificationTag(
                this.id,
                addeditbox.cateId,
                addeditbox.labelName
              )
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.close();
                } else {
                  this.$toaster.error(res.msg);
                }
              })
              .catch(() => {});
          } else {
            this.$api.admin
              .addQualificationTag(addeditbox.cateId, addeditbox.labelName)
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.close();
                } else {
                  this.$toaster.error(res.msg);
                }
              })
              .catch(() => {});
          }
        } else {
          // this.$toaster.error("请确认验证项格式");
          return false;
        }
      });
    },
    operation(id, type, labelName) {
      if (type == "edit") {
        this.showbox(1, id);
      } else if (type == "del") {
        this.$confirm("是否确定删除【" + labelName + "】标注工具？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        })
          .then(res => {
            this.$api.admin
              .delfun("pc/qualificationTag/delQualificationTag", id)
              .then(res => {
                if (res.code == 200) {
                  this.getQualificationTagList();
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
.qualificationlabelmanagement {
  height: 100%;
  overflow: hidden;
  .el-tabs {
    height: 41px;
  }
  .qualificationlabelmanagement-main {
    border-top: none;
    position: relative;
    padding-bottom: 50px;
    .qualificationlabelmanagement-content {
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
