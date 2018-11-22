<template>
  <div class="application">
    <el-steps :active="2" align-center>
      <el-step title="1.项目描述" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="2.项目设置" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="3.标注资质" icon="el-icon-label-time1"></el-step>
      <el-step title="4.标注工具" icon="el-icon-label-time1"></el-step>
      <el-step title="5.验收设置" icon="el-icon-label-time1"></el-step>
      <el-step title="6.报酬方案" icon="el-icon-label-time1"></el-step>
      <el-step title="7.预览" icon="el-icon-label-time1"></el-step>
    </el-steps>
    <el-form :model="ruleForm" ref="ruleForm" label-width="130px" class="demo-ruleForm" v-loading="isloading">
      <ul class="application-con-ul">
        <li>
          <el-form-item label="资质要求：">
            <el-button style="border-color:#5A7CD0;"  @click="changeQualifita">选择</el-button>
            <span style="font-size:12px;margin-left:10px;color:#999;">
              <span style="color:red;font-size:12px;">提示：</span>如果不选，默认所有平台上注册的标注人均有资格申请标注任务</span>
            <br>
            <el-button style="border-color:#5A7CD0;margin-top:10px;" @click="selectedQualifications=true">已选</el-button>
          </el-form-item>
        </li>
      </ul>
      <div class="application-button">
        <el-form-item>
          <el-button type="primary" @click="stepto2()">上一步</el-button>
          <el-button type="primary" @click="stepto4('ruleForm')">下一步</el-button>
          <el-button @click="resetForm('ruleForm')" style="border-color:#5A7CD0;">&nbsp;重&nbsp;置&nbsp;</el-button>
        </el-form-item>
      </div>
    </el-form>

    <!--资质类别弹框-->
    <div>
      <el-dialog :visible.sync="dialogQualifica" width="780px" center class="deepbackground notitle tablecontent">
        <div class="dialogQualifica-condition mg_right1">
          <el-form label-width="86px" class="demo-ruleForm">
            <el-form-item label="资质类别：">
              <el-select v-model="tagTypeId">
                <el-option label="全部" value="" selected="selected"></el-option>
                <el-option v-for="(item,index) in QualificaLabelCategory" :key="index" :label="item.typeName" :value="item.id" v-cloak></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialogQualifica-condition mg_right4">
          <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="标签名称：">
              <el-input v-model="labelName" placeholder="请输入标签名称" maxlength="50"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-button style="margin-left: 30px;" @click="qualificaSearch">搜 索</el-button>
        <el-table :data="QualificaLabelName.data" border :header-cell-style="{background:'#517AA4'}">
          <el-table-column property="typeName" label="资质类别" width="200">
          </el-table-column>
          <el-table-column label="标签名称" >
             <template slot-scope="scope">
               <el-popover trigger="hover" placement="top-start" :content="scope.row.labelName">
                <p slot="reference">{{scope.row.labelName}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="60px">
            <template slot-scope="scope">
              <el-checkbox label="" @change="changecheckbox(scope.row)" v-model="QualificaLabelName.data[scope.$index].checked"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
        <div style="overflow: hidden;">
          <el-button @click="showDialog('look')" size="mini" style="margin-top:10px">查看已选</el-button>
          <el-pagination background layout="prev, pager, next" :current-page="pageNum" :page-size="pageSize" :total="QualificaLabelName.pageInfo.total" @current-change="currentChange"></el-pagination>
        </div>
      </el-dialog>
    </div>
    <!-- 已选资质 -->
    <el-dialog :visible.sync="selectedQualifications" width="780px" center class="deepbackground slectdialog tablecontent"  >
      <div style="height:50px;position:relative;">
        <el-button style="position:absolute;right:0px;" size="mini" @click="showDialog('select')">返回选择</el-button>
      </div>
      <el-scrollbar style="height:100%;" :style="{height:maxheight}">
        <el-table :data="labelList" border :header-cell-style="{background:'#517AA4'}">
          <el-table-column property="typeName" label="资质类别" width="200"></el-table-column>
          <el-table-column label="标签名称" >
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
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <!-- 是否保存草稿 -->
    <el-dialog title="是否保存草稿" :visible.sync="isSaveDraft" width="500px" center class="deepbackground">
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeSaveDraft(true)" class="mg_right">保 存</el-button>
        <el-button type="primary" @click="closeSaveDraft(false)">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "projectapplication",
  data() {
    return {
      isEdit: false,
      isSaveDraft: false,
      stepType: 1, //默认下一步
      isloading: false,
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
      ruleForm: {
        tasks: ""
      }
    };
  },
  computed: {
    ...mapState("user", ["token"]),
    maxheight(value){
      if(this.labelList.length<=5&&this.labelList.length>0){
        return  (this.labelList.length+1)*55+20+'px'
      }else if(this.labelList.length==0){
        return 120+'px'
      }else{
        return 360+'px'
      }
    }
  },
  created() {},
  mounted() {
    var projectEditId = sessionStorage.getItem("projectEditId"); // 获取修改时的项目id
    if (projectEditId == undefined || projectEditId == null) {
      this.id = "";
    } else {
      this.isloading = true;
      this.$refs["ruleForm"].resetFields();
      this.id = projectEditId;
      this.$api.project
        .getProject(this.id)
        .then(res => {
          if (res.code == 200) {
            if (res.data.bzProject.remark.match(RegExp(/3/))) {
              this.isEdit = true;
            } else {
              this.isEdit = false;
            }
            for (var i = 0; i < res.data.labelList.length; i++) {
              var id = res.data.labelList[i].qualificationTagId;
              var cateName = res.data.labelList[i].typeName;
              var labelName = res.data.labelList[i].labelName;
              var obj = {};
              obj.id = id;
              obj.typeName = cateName;
              obj.labelName = labelName;
              this.labelList.push(obj);
              this.ruleForm.tasks = "1";
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
            this.isloading = false;
          } else {
            this.$toaster.error(res.msg);
          }
        })
        .catch(() => {});
    }
  },
  watch: {
    tagTypeId() {
      this.pageNum = 1;
      this.qualificaSearch();
    },
    // labelName() {
    //   this.pageNum = 1;
    //   this.qualificaSearch();
    // }
  },
  methods: {
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
      if (this.aptitudeIds.length > 0) {
        this.ruleForm.tasks = 1;
      } else {
        this.ruleForm.tasks = "";
      }
    },
    goTo() {
      if (sessionStorage.getItem("projectEditStatus")) {
        this.$router.push({
          path: `/project/myproject/projectedit/application${3 + this.stepType}`
        });
      } else {
        this.$router.push({
          path: `/project/projectapplication/application${3 + this.stepType}`
        });
      }
    },
    stepto2(formName) {
      // 上一步到2
      this.stepType = -1;
      if (this.isEdit) {
        // this.isSaveDraft = true;
        this.goTo();
      } else {
        this.goTo();
      }
    },
    closeSaveDraft(type) {
      if (type) {
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.$api.project
              .applyProject({
                labelQualificationList: this.aptitudeIds,
                id: this.id,
                token: this.token,
                step: 3
              })
              .then(res => {
                if (res.code == 200) {
                  sessionStorage.setItem("projectEditId", res.data);
                  this.$toaster.ok("草稿保存成功");
                  this.goTo();
                } else {
                  this.$toaster.error(res.msg);
                }
              })
              .catch(() => {});
          } else {
            this.$toaster.error("草稿保存失败，请先完善项目信息");
            this.isSaveDraft = false;
            return false;
          }
        });
      } else {
        this.goTo();
      }
    },
    stepto4(formName) {
      // 下一步到4
      this.stepType = 1;
      if (this.isEdit) {
        // this.isSaveDraft = true;
        this.closeSaveDraft(true);
      } else {
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.$api.project
              .applyProject({
                labelQualificationList: this.aptitudeIds,
                id: this.id,
                token: this.token,
                step: 3
              })
              .then(res => {
                if (res.code == 200) {
                  sessionStorage.setItem("projectEditId", res.data);
                  this.goTo();
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
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.cateNames = [];
      this.labelNames = [];
      this.aptitudeIds = [];
      this.labelList = [];
    }
  }
};
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style lang="less">
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
</style>
