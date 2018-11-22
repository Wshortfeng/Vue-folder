<template>
  <div class="application">
    <el-steps :active="4" align-center>
      <el-step title="1.项目描述" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="2.项目设置" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="3.标注资质" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="4.标注工具" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="5.验收设置" icon="el-icon-label-time1"></el-step>
      <el-step title="6.报酬方案" icon="el-icon-label-time1"></el-step>
      <el-step title="7.预览" icon="el-icon-label-time1"></el-step>
    </el-steps>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="155px" class="demo-ruleForm" v-loading="false">
      <ul class="application-con-ul">
        <li>
          <el-form-item label="审核时长：" prop="reviewPeriod" v-if="ruleForm.acceptanceType!=1">
            <el-input-number v-model="ruleForm.reviewPeriod" :min="1" :max="99999999" :precision="0" style="width: 75%;" ></el-input-number>
            <el-select v-model="ruleForm.reviewPeriodUnit" style="width: 22%;float: right;">
              <el-option label="周" value="1" ></el-option>
              <el-option label="天" value="2"></el-option>
              <el-option label="小时" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="reviewSamplingRateName" prop="reviewSamplingRate">
            <el-input-number v-model="ruleForm.reviewSamplingRate" :min="1" :max="100" :precision="0"></el-input-number>
          </el-form-item>
          <el-form-item :label="acceptancePassRateName" prop="acceptancePassRate">
            <el-input-number v-model="ruleForm.acceptancePassRate" :min="1" :max="100" :precision="0"></el-input-number>
          </el-form-item>
          <el-form-item label="是否复审：" prop="isSecondReview" v-if="ruleForm.acceptanceType!=1">
            <el-radio-group v-model="ruleForm.isSecondReview ">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否会诊：" prop="isConsultation" v-if="ruleForm.acceptanceType!=1&&ruleForm.isSecondReview==1">
            <el-radio-group v-model="ruleForm.isConsultation ">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="疑难杂症会诊次数：" prop="puzzleTimes" v-if="ruleForm.acceptanceType!=1&&ruleForm.isSecondReview==1&&ruleForm.isConsultation==1">
            <el-input-number v-model="ruleForm.puzzleTimes" :min="1" :max="99999999" :precision="0"></el-input-number>
          </el-form-item>
          <el-form-item label="审核资质要求：" v-if="ruleForm.acceptanceType!=1">
            <el-button style="border-color:#5A7CD0;"  @click="changeQualifita">选择</el-button>
            <span style="font-size:12px;margin-left:10px;color:#999;">
              <span style="color:red;font-size:12px;">提示：</span>如果不选，默认所有平台上注册的标注人均有资格审核任务</span>
            <br>
            <el-button style="border-color:#5A7CD0;margin-top:10px;"  @click="selectedQualifications=true">已选</el-button>
          </el-form-item>
        </li>
      </ul>
      <div class="application-button">
        <el-form-item>
          <el-button type="primary" @click="stepto4()">上一步</el-button>
          <el-button type="primary" @click="stepto6('ruleForm')">下一步</el-button>
          <el-button style="border-color:#5A7CD0;" @click="resetForm('ruleForm')">&nbsp;重&nbsp;置&nbsp;</el-button>
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
          <el-form label-width="86px" class="demo-ruleForm">
            <el-form-item label="标签名称：">
              <el-input v-model="labelName" placeholder="请输入标签名称" maxlength="50"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <el-button style="margin-left: 30px;" @click="qualificaSearch">搜 索</el-button>
        <el-table :data="QualificaLabelName.data" :header-cell-style="{background:'#517AA4'}" border>
          <el-table-column property="typeName" label="资质类别" width="200"></el-table-column>
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
    <el-dialog :visible.sync="selectedQualifications" width="780px" center class="deepbackground slectdialog tablecontent">
      <div style="height:50px;position:relative;">
        <el-button style="position:absolute;right:0px;" size="mini" @click="showDialog('select')">返回选择</el-button>
      </div>
      <el-scrollbar style="height:100%;" :style="{height:maxheight}">
        <el-table :data="reviewLabelList" border :header-cell-style="{background:'#517AA4'}">
          <el-table-column property="typeName" label="资质类别" width="200"></el-table-column>
          <el-table-column  label="标签名称" >
            <template slot-scope="scope">
               <el-popover trigger="hover" placement="top-start" :content="scope.row.labelName">
                <p slot="reference">{{scope.row.labelName}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80px">
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
    var isreviewSamplingRate = (rule, value, callback) => {
      if (!value) {
        if (this.ruleForm.acceptanceType == 1) {
          return callback(new Error("请输入验收抽样率"));
        } else {
          return callback(new Error("请输入审核抽样率"));
        }
      }
      callback();
    };
    var isacceptancePassRate = (rule, value, callback) => {
      if (!value) {
        if (this.ruleForm.acceptanceType == 1) {
          return callback(new Error("请输入验收通过率"));
        } else {
          return callback(new Error("请输入审核通过率"));
        }
      }
      callback();
    };
    return {
      isEdit: false,
      isSaveDraft: false,
      stepType: 1, //默认下一步
      selectedQualifications: false,
      reviewSamplingRateName: "审核抽样率（%）：",
      acceptancePassRateName: "审核通过率（%）：",
      isloading: false,
      id: "",
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
      reviewCateNames: [],
      reviewLabelNames: [],
      reviewLabelList: [],
      tagTypeId: "",
      labelName: "",
      ruleForm: {
        acceptanceType: 2,
        reviewSamplingRate: "",
        acceptancePassRate: "",
        qualifications: "",
        isConsultation: "2",
        reviewPeriod: "",
        reviewPeriodUnit: "1",
        isSecondReview: "1",
        puzzleTimes: "",
        step: 5
      },
      rules: {
        reviewSamplingRate: [
          {
            required: true,
            validator: isreviewSamplingRate
          }
        ],
        acceptancePassRate: [
          {
            required: true,
            validator: isacceptancePassRate
          }
        ],
        puzzleTimes: [
          {
            required: true,
            message: "请输入疑难杂症会诊次数",
            trigger: "blur"
          }
        ],
        reviewPeriod: [
          {
            required: true,
            message: "请输入审核时长",
            trigger: "blur"
          }
        ],
        isConsultation: [
          {
            required: true,
            message: "请选择是否会诊",
            trigger: "blur"
          }
        ],
        isSecondReview: [
          {
            required: true,
            message: "请选择是否复审",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    // labelName() {
    //   this.pageNum = 1;
    //   this.qualificaSearch();
    // },
    tagTypeId() {
      this.pageNum = 1;
      this.qualificaSearch();
    }
  },
  computed: {
    ...mapState("user", ["token"]),
    maxheight(value){
      if(this.reviewLabelList.length<=5&&this.reviewLabelList.length>0){
        return  (this.reviewLabelList.length+1)*55+20+'px'
      }else if(this.reviewLabelList.length==0){
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
            if (res.data.bzProject.remark.match(RegExp(/5/))) {
              this.isEdit = true;
            } else {
              this.isEdit = false;
            }
            for (var i = 0; i < res.data.reviewList.length; i++) {
              var id = res.data.reviewList[i].qualificationTagId;
              var cateName = res.data.reviewList[i].typeName;
              var labelName = res.data.reviewList[i].labelName;
              var obj = {};
              obj.id = id;
              obj.typeName = cateName;
              obj.labelName = labelName;
              this.reviewLabelList.push(obj);
              this.ruleForm.qualifications = "1";
              if (this.aptitudeIds.indexOf(id) > -1) {
                this.aptitudeIds.splice(this.aptitudeIds.indexOf(id), 1);
                var index = this.reviewCateNames.indexOf(cateName);
                if (this.reviewLabelNames[index].length == 1) {
                  this.reviewCateNames.splice(index, 1);
                  this.reviewLabelNames.splice(index, 1);
                } else {
                  var indexa = this.reviewLabelNames.indexOf(labelName);
                  this.reviewLabelNames[index].splice(indexa, 1);
                }
              } else {
                this.aptitudeIds.push(id);
                var indexb = this.reviewCateNames.indexOf(cateName);
                if (indexb > -1) {
                  this.reviewLabelNames[indexb].push(labelName);
                } else {
                  var a = [];
                  a.push(labelName);
                  this.reviewCateNames.push(cateName);
                  this.reviewLabelNames.push(a);
                }
              }
            }
            this.ruleForm.reviewSamplingRate =
              res.data.bzProject.reviewSamplingRate;
            this.ruleForm.acceptancePassRate =
              res.data.bzProject.acceptancePassRate;
            this.ruleForm.acceptanceType = res.data.bzProject.acceptanceType.toString();
            this.ruleForm.reviewPeriod = res.data.bzProject.reviewPeriod;
            this.ruleForm.reviewPeriodUnit = res.data.bzProject.reviewPeriodUnit.toString();
            this.ruleForm.isSecondReview = res.data.bzProject.isSecondReview;
            this.ruleForm.puzzleTimes = res.data.bzProject.puzzleTimes;
            this.ruleForm.isConsultation = res.data.bzProject.isConsultation;
            if (this.ruleForm.acceptanceType == 1) {
              this.reviewSamplingRateName = "验收抽样率（%）：";
              this.acceptancePassRateName = "验收通过率（%）：";
            } else {
              this.reviewSamplingRateName = "审核抽样率（%）：";
              this.acceptancePassRateName = "审核通过率（%）：";
            }

            this.isloading = false;
          } else {
            this.$toaster.error(res.msg);
          }
        })
        .catch(() => {});
    }
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
        this.reviewLabelList.splice(indexc, 1);
        var index = this.reviewCateNames.indexOf(cateName);
        if (this.reviewLabelNames[index].length == 1) {
          this.reviewCateNames.splice(index, 1);
          this.reviewLabelNames.splice(index, 1);
        } else {
          var indexa = this.reviewLabelNames.indexOf(labelName);
          this.reviewLabelNames[index].splice(indexa, 1);
        }
      } else {
        if (!name) {
          this.reviewLabelList.push(data);
          this.aptitudeIds.push(id);
          var indexb = this.reviewCateNames.indexOf(cateName);
          if (indexb > -1) {
            this.reviewLabelNames[indexb].push(labelName);
          } else {
            var a = [];
            a.push(labelName);
            this.reviewCateNames.push(cateName);
            this.reviewLabelNames.push(a);
          }
        }
      }
      this.qualificaSearch();
      if (this.aptitudeIds.length > 0) {
        this.ruleForm.qualifications = 1;
      } else {
        this.ruleForm.qualifications = "";
      }
    },
    goTo() {
       if (sessionStorage.getItem("projectEditStatus")) {
        this.$router.push({
          path: `/project/myproject/projectedit/application${this.ruleForm.step+ this.stepType}`
        });
      } else {
        this.$router.push({
          path: `/project/projectapplication/application${this.ruleForm.step +
            this.stepType}`
        });
      }
    },
    stepto4(formName) {
      // 上一步到4
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
        if (
          this.ruleForm.acceptanceType == 1 ||
          this.ruleForm.isSecondReview == 2 ||
          this.ruleForm.isConsultation == 2
        ) {
          this.ruleForm.puzzleTimes = 0;
        }
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.$api.project
              .applyProject({
                reviewQualificationList: this.aptitudeIds,
                acceptanceType: this.ruleForm.acceptanceType,
                reviewSamplingRate: this.ruleForm.reviewSamplingRate,
                acceptancePassRate: this.ruleForm.acceptancePassRate,
                isConsultation: this.ruleForm.isConsultation,
                reviewPeriod: this.ruleForm.reviewPeriod,
                puzzleTimes: this.ruleForm.puzzleTimes,
                isSecondReview:this.ruleForm.isSecondReview,
                id: this.id,
                token: this.token,
                step: 5
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
    stepto6(formName) {
      // 下一步到6
      this.stepType = 1;
      if (this.isEdit) {
        // this.isSaveDraft = true;
        this.closeSaveDraft(true);
      } else {
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.$api.project
              .applyProject({
                reviewQualificationList: this.aptitudeIds,
                acceptanceType: this.ruleForm.acceptanceType,
                reviewSamplingRate: this.ruleForm.reviewSamplingRate,
                acceptancePassRate: this.ruleForm.acceptancePassRate,
                isConsultation: this.ruleForm.isConsultation,
                reviewPeriod: this.ruleForm.reviewPeriod,
                puzzleTimes: this.ruleForm.puzzleTimes,
                isSecondReview:this.ruleForm.isSecondReview,
                id: this.id,
                token: this.token,
                step: 5
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
      this.ruleForm.isSecondReview = 1;
      this.ruleForm.isConsultation = 1;
      this.ruleForm.reviewPeriodUnit='1';
      this.aptitudeIds = [];
      this.reviewCateNames = [];
      this.reviewLabelNames = [];
      this.reviewLabelList = [];
    }
  }
};
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style>
</style>
