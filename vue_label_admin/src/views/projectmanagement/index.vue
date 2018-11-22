<template>
  <div class="projectHallmanafement  content-padding">
    <div class="search-box">
      <el-input v-model="keyWord" placeholder="请输入项目方、项目名称" class="keyword mg_right1" maxlength="50"></el-input>
      <el-button type="primary" @click="serchKey()">搜索</el-button>
    </div>
    <el-radio-group v-model="active" style="margin-bottom: 10px;" v-if="userType==2">
      <el-radio-button :label="item.value" v-for="(item,index) in options2" :key="index">{{item.name}}</el-radio-button>
    </el-radio-group>
    <el-radio-group v-model="active" style="margin-bottom: 10px;" v-else>
      <el-radio-button :label="item.value" v-for="(item,index) in options" :key="index">{{item.name}}</el-radio-button>
    </el-radio-group>
    <div class="projectHallmanafement-main">
      <el-row :gutter="12" class="projecthall-item" v-for="(item,index) in tableData" :key="index">
        <el-col :span="24" class="item-left">
          <el-card shadow="hover">
            <div class="item-left-box">
              <div class="title">
                <span @click="operation(item.id,'detail',item.projectName)">{{item.projectName}}</span>
              </div>
              <div class="content-content">
                <p class="graycolor"><span class="titlename">项目号：</span><span class="bottomcolor" @click="operation(item.id,'detail',item.projectName)">{{item.projectNumber}}</span> </p>
                <p class="graycolor"><span class="titlename">关键字：</span>{{item.productKey}}</p>
                <p class="graycolor"><span class="titlename">项目简介：</span>{{item.productContent|read}}</p>
                <p class="graycolor"><span class="titlename">创建时间：</span>{{item.createDate|zhDatetime}}</p>
                <p class="graycolor"><span class="titlename">截止时间：</span>{{item.endTime|zhDatetime}}</p>
              </div>
            </div>
          </el-card>
        </el-col>
        <div class="projectopration">
          <span  class="optoperation_btn "><a class="max_size" @click="operation(item.id,'detail',item.projectName)">查 看</a></span>
          <br>
          <br>
          <br>
          <span  class="optoperation_btn " v-if="item.status==2&&userType!=2"><a class="max_size" @click="operation(item.id,'review',item.projectName)">审 核</a></span>
          <span  class="optoperation_btn " v-if="item.status>=3&&item.status<=7&&userType!=2"><a class="max_size" @click="operation(item.id,'edit',item.projectName)">编 辑</a></span>
          <span  class="optoperation_btn " v-if="item.status>7&&userType!=2"><a class="max_size" @click="operation(item.id,'down',item.projectName)">下载数据</a></span>
        </div>
      </el-row>
      <el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
      </el-pagination>
      <div class="nocontent" v-if="total==0">
        <img :src="blankContent">
      </div>
      <el-dialog title="请填写审核不通过原因" :visible.sync="dialogVisible" width="500px" center class="deepbackground" @close="close">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
          <el-form-item prop="remark">
            <el-input type="textarea" v-model="ruleForm.remark" placeholder="至多20个字符" maxlength="20" @change="filteremojifun"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
          <el-button @click="confirmRuleForm()" style="margin-right:0;">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "projectHallmanafement",
  data() {
    var isvalidate = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入审核不通过原因"));
      }
      if (value.length > 20) {
        return callback(new Error("审核不通过原因至多20个字符"));
      } else {
        callback();
      }
    };
    return {
      blankContent: require("../../assets/img/blank_icon.png"),
      isloading: false,
      dialogVisible: false,
      active: "",
      keyWord: "",
      currentPage: 1, //初始页
      pagesize: 3, //    每页的数据
      total: 0, //总数
      tableData: [],
      userType: 3,
      userId: "",
      ruleForm: {
        projectId: "",
        type: 2,
        remark: ""
      },
      options: [
        {
          name: "全部",
          value: ""
        },
        {
          name: "待审核",
          value: "1"
        },
        {
          name: "待发布",
          value: "2"
        },
        {
          name: "进行中",
          value: "3"
        },
        {
          name: "已结束",
          value: "4"
        },
        {
          name: "已过期",
          value: "5"
        }
      ],
      options2: [
        {
          name: "全部",
          value: ""
        },
        {
          name: "进行中",
          value: "4"
        },
        {
          name: "待验收",
          value: "5"
        },
        {
          name: "待仲裁",
          value: "6"
        },
        {
          name: "待结算",
          value: "7"
        },
        {
          name: "已完成",
          value: "8"
        },
        {
          name: "已失败",
          value: "9"
        },
        {
          name: "已过期",
          value: "10"
        }
      ],
      rules: {
        remark: [
          {
            validator: isvalidate,
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    // keyWord(){
    //   this.serchKey();
    // },
    active() {
      this.serchKey();
    }
  },
  created() {
    if (this.$route.query.USERTYPE) {
      this.userType = this.$route.query.USERTYPE;
      this.userId = this.$route.query.ID;
    }
  },
  mounted() {
    this.getPlatformProjectList();
  },
  methods: {
    filteremojifun(e) {
      this.ruleForm.remark = this.$utils.filteremoji(e);
    },
    close() {
      this.dialogVisible = false;
      this.$refs["ruleForm"].resetFields();
    },
    serchKey() {
      this.currentPage = 1;
      this.getPlatformProjectList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getPlatformProjectList();
    },
    getPlatformProjectList() {
      //获取项目列表
      this.isloading = true;
      if (this.userType == 3) {
        //平台方
        this.$api.admin
          .getPlatformProjectList(
            this.currentPage,
            this.pagesize,
            this.keyWord,
            this.active
          )
          .then(res => {
            if (this.currentPage != 1 && res.data.length == 0) {
              this.currentPage = this.currentPage - 1;
              this.getPlatformProjectList();
            } else {
              this.total = res.pageInfo.total;
              this.tableData = res.data;
              this.isloading = false;
            }
          });
      } else if (this.userType == 2) {
        //标注方
        this.$api.admin
          .getLabelerUserProjectList(
            this.currentPage,
            this.pagesize,
            this.keyWord,
            this.active,
            this.userId
          )
          .then(res => {
            if (this.currentPage != 1 && res.data.length == 0) {
              this.currentPage = this.currentPage - 1;
              this.getPlatformProjectList();
            } else {
              this.total = res.pageInfo.total;
              this.tableData = res.data;
              this.isloading = false;
            }
          });
      } else if (this.userType == 1) {
        //项目方
        this.$api.admin
          .getPlatformProjectList(
            this.currentPage,
            this.pagesize,
            this.keyWord,
            this.active,
            this.userId
          )
          .then(res => {
            if (this.currentPage != 1 && res.data.length == 0) {
              this.currentPage = this.currentPage - 1;
              this.getPlatformProjectList();
            } else {
              this.total = res.pageInfo.total;
              this.tableData = res.data;
              this.isloading = false;
            }
          });
      }
    },
    operation(id, name, projectName) {
      if (name == "review") {
        this.$confirm("是否确定【" + projectName + "】项目通过审核？", "", {
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
          .catch(() => {
            this.dialogVisible = true;
            this.ruleForm.projectId = id;
          });
      } else if (name == "detail") {
        this.$utils.setSession("PROJECTID", id);
        if (this.userType == 3) {//平台方项目详情
          this.$router.push({
            name: "ProjectHallProjectDetail",
            query: {
              USERTYPE: this.userType,
              ID: this.userId
            }
          });
        } else if (this.userType == 1) {//项目方项目详情
          this.$router.push({
            name: "ProjectManagementProjectDetail",
            query: {
              USERTYPE: this.userType,
              ID: this.userId
            }
          });
        } else if (this.userType == 2) {//标注方项目详情
          this.$router.push({
            name: "LabelManagementProjectDetail",
            query: {
              USERTYPE: this.userType,
              ID: this.userId
            }
          });
        }
      } else if (name == "down") {
        this.$confirm("是否确定下载【" + projectName + "】项目数据？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info"
        }).then(() => {
          this.$api.admin.downloadProjectData(id).then(res => {
            if (res.code == 200) {
              location.href = res.data;
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      } else if (name == "edit") {
        this.$utils.setSession("projectEditId", id);
        this.$utils.setSession("projectEditStatus", true);
        if (this.userType == 3) {
          this.$router.push({
            name: "ProjectEdit"
          });
        } else if (this.userType == 1) {
          this.$router.push({
            name: "ProjectManagementProjectEdit"
          });
        }
      }
    },
    confirmRuleForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          this.$api.admin
            .reviewProject(
              this.ruleForm.projectId,
              this.ruleForm.type,
              this.ruleForm.remark
            )
            .then(res => {
              if (res.code == 200) {
                this.getPlatformProjectList();
                this.close();
                this.$toaster.ok(res.msg);
              } else {
                this.$toaster.error(res.msg);
              }
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.projectHallmanafement {
  height: 100%;
  overflow: hidden;
  .el-tabs {
    height: 41px;
  }
  .deepbackground {
    .el-dialog__body {
      padding: 25px 40px 30px;
    }
  }
  .projectHallmanafement-main {
    border-top: none;
    position: relative;
    .nocontent {
      padding-top: 80px;
      text-align: center;
    }
    .el-card__body {
      padding: 10px;
    }
    .projecthall-item {
      margin-top: 10px;
      position: relative;
      .projectopration {
        position: absolute;
        top: 65px;
        right: 50px;
        .el-button {
          font-size: 15px !important;
        }
      }
      .item-left {
        .item-left-box {
          // border: 1px solid #eeeeee;
          padding-left: 20px;
          padding-right: 150px;
          min-height: 160px;
          .title {
            span {
              font-size: 18px;
              line-height: 250%;
              border-bottom: 2px solid #5a7cd0;
              cursor: pointer;
            }
          }
          .content-content {
            width: 100%;
            p {
              line-height: 190%;
            }
            .bottomcolor {
              border-bottom: 1px solid #5a7cd0;
              cursor: pointer;
            }
            .graycolor {
              color: gray;
            }
            .titlename {
              color: black;
            }
          }
        }
      }
    }
  }
}
</style>
