<template>
  <div class="application" >
    <el-steps :active="3" align-center>
      <el-step title="1.项目描述" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="2.项目设置" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="3.标注资质" icon="el-icon-circle-check-outline"></el-step>
      <el-step title="4.标注工具" icon="el-icon-label-time1"></el-step>
      <el-step title="5.验收设置" icon="el-icon-label-time1"></el-step>
      <el-step title="6.报酬方案" icon="el-icon-label-time1"></el-step>
      <el-step title="7.预览" icon="el-icon-label-time1"></el-step>
    </el-steps>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm" v-loading="isloading" >
      <ul class="application-con-ul" style="width:305px;">
        <li>
          <el-form-item label="图形标注工具：">
            <el-button style="border-color:#5A7CD0;" @click="changeLabelTool" >选择</el-button>
            <el-button style="border-color:#5A7CD0;"  @click="selectedLabelTool=true">已选</el-button>
          </el-form-item>
          <el-form-item label="字幕标注工具：" prop="problem">
            <el-button style="border-color:#5A7CD0;" @click="changeProblem" >选择</el-button>
            <el-button style="border-color:#5A7CD0;"  @click="selectedProblem=true">已选</el-button>
          </el-form-item>
        </li>
      </ul>
      <div class="application-button">
        <el-form-item>
          <el-button type="primary" @click="stepto3()">上一步</el-button>
          <el-button type="primary" @click="stepto5('ruleForm')">下一步</el-button>
          <el-button style="border-color:#5A7CD0;" @click="resetForm('ruleForm')">&nbsp;重&nbsp;置&nbsp;</el-button>
        </el-form-item>
      </div>
    </el-form>

    <!--标注工具弹框-->
    <div>
      <el-dialog :visible.sync="label.dialogLabelTool" width="780px" center class="deepbackground notitle tablecontent">

        <div class="dialogQualifica-condition mg_right1">
          <el-form label-width="60px" class="demo-ruleForm">
            <el-form-item label="名称：">
              <el-input v-model="labelToolName" placeholder="请输入名称" maxlength="50"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialogQualifica-condition mg_right4">
          <el-form label-width="60px" class="demo-ruleForm">
            <el-form-item label="类型：">
              <el-select v-model="labelType">
                <el-option label="全部" value="" selected="selected"></el-option>
                <el-option label="点" value="1"></el-option>
                <el-option label="线" value="2"></el-option>
                <el-option label="框" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <el-button style="margin-left: 30px;" @click="labelToolSearch">搜 索</el-button>

        <el-table :data="QualificaLabelName.data" border :header-cell-style="{background:'#517AA4'}">
          <el-table-column label="序号">
            <template slot-scope="scope">
              <p>{{scope.$index+1+(pageNum-1)*pageSize}}</p>
            </template>
          </el-table-column>
          <el-table-column property="toolName" label="名称" width="200"></el-table-column>
          <el-table-column label="图标">
            <template slot-scope="scope">
              <p> <img :src="scope.row.toolImage"></p>
            </template>
          </el-table-column>
          <el-table-column label="类型">
            <template slot-scope="scope">
              <p>{{scope.row.type|labelType}}</p>
            </template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-checkbox label="" @change="changeLabelToolcheckbox(scope.row)" v-model="scope.row.checked"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
        <div style="overflow: hidden;">
          <el-button @click="showDialog('labeltool','look')" size="mini" style="margin-top:10px">查看已选</el-button>
          <el-pagination background layout="prev, pager, next" :current-page="pageNum" :page-size="pageSize" :total="QualificaLabelName.pageInfo.total" @current-change="currentLabelToolChange"></el-pagination>
        </div>
      </el-dialog>
    </div>
    <!-- 已选标注工具 -->
    <el-dialog :visible.sync="selectedLabelTool" width="780px" center class="deepbackground slectdialog tablecontent">
      <div style="height:50px;position:relative;">
        <el-button style="position:absolute;right:0px;" size="mini" @click="showDialog('labeltool','select')">返回选择</el-button>
      </div>
      <el-scrollbar style="height:100%;" :style="{height:maxheight1}">
        <el-table :data="labelToolList" border :header-cell-style="{background:'#517AA4'}">
          <el-table-column label="序号">
            <template slot-scope="scope">
              <p>{{scope.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column property="toolName" label="名称" width="200"></el-table-column>
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
          <el-table-column label="类型">
            <template slot-scope="scope">
              <p>{{scope.row.type|labelType}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="text" v-if="scope.$index!=0" @click="sortfun(scope.$index,'labeltool',1)">上移</el-button>
              <el-button size="mini" type="text" v-if="scope.$index!=labelToolList.length-1" @click="sortfun(scope.$index,'labeltool',-1)">下移</el-button>
              <el-button size="mini" type="text" @click="changeLabelToolcheckbox(scope.row,'del')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>

    <!--字幕问题弹框-->
    <div>
      <el-dialog :visible.sync="problem.dialogProblem" width="900px" center class="deepbackground notitle tablecontent">
        <div class="dialogQualifica-condition mg_right1">
          <el-form label-width="86px" class="demo-ruleForm">
            <el-form-item label="字幕名称：">
              <el-input v-model="problemSubject" placeholder="请输入字幕名称" maxlength="50"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="dialogQualifica-condition mg_right5">
          <el-form label-width="60px" class="demo-ruleForm">
            <el-form-item label="类型：">
              <el-select v-model="problemType">
                <el-option label="全部" value="" selected="selected"></el-option>
                <el-option label="选择题" value="1"></el-option>
                <el-option label="问答题" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <el-button style="margin-left: 30px;" @click="problemSearch">搜 索</el-button>
        <el-table :data="QualificaProblem.data" border :header-cell-style="{background:'#517AA4'}" >
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">
              <p>{{scope.$index+1+(pageNum1-1)*pageSize}}</p>
            </template>
          </el-table-column>
          <el-table-column label="字幕名称" style="height:40px;overflow:hidden;white-space: nowrap;" >
            <template slot-scope="scope" >
              <el-popover trigger="hover" placement="top-start" :content="scope.row.subject">
                <p slot="reference">{{scope.row.subject}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="字幕选项" >
            <template slot-scope="scope">
              <el-popover placement="top-start" trigger="hover">
                <div><span v-for="(item,index) in scope.row.problemOptionList" :key="index">{{index+1}}）{{item.content}}&#X3000;</span></div>
                <p slot="reference"><span v-for="(item,index) in scope.row.problemOptionList" :key="index">{{index+1}}）{{item.content}}&#X3000;</span></p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="类型" width="80">
            <template slot-scope="scope">
              <p>{{scope.row.type|problemType}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="60" fixed="right">
            <template slot-scope="scope">
              <el-checkbox label="" @change="changeProblemcheckbox(scope.row)" v-model="scope.row.checked"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
        <div style="overflow: hidden;">
          <el-button @click="showDialog('problem','look')" size="mini" style="margin-top:10px">查看已选</el-button>
          <el-pagination background layout="prev, pager, next" :current-page="pageNum1" :page-size="pageSize" :total="QualificaProblem.pageInfo.total" @current-change="currentProblemChange"></el-pagination>
        </div>
      </el-dialog>
    </div>

    <!-- 已选问题 -->
    <el-dialog :visible.sync="selectedProblem" width="900px" center class="deepbackground slectdialog tablecontent">
      <div style="height:50px;position:relative;">
        <el-button style="position:absolute;right:0px;" size="mini" @click="showDialog('problem','select')">返回选择</el-button>
      </div>
      <el-scrollbar style="height:100%;" :style="{height:maxheight2}">
        <el-table :data="problemList" border :header-cell-style="{background:'#517AA4'}">
          <el-table-column label="序号" width="60">
            <template slot-scope="scope">
              <p>{{scope.$index+1}}</p>
            </template>
          </el-table-column>
          <el-table-column label="字幕名称" style="height:40px;overflow:hidden;white-space: nowrap;">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.subject">
                <p slot="reference">{{scope.row.subject}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="字幕选项">
            <template slot-scope="scope">
              <el-popover placement="top-start" trigger="hover">
                <div><span v-for="(item,index) in scope.row.problemOptionList" :key="index">{{index+1}}）{{item.content}}&#X3000;</span></div>
                <p slot="reference"><span v-for="(item,index) in scope.row.problemOptionList" :key="index">{{index+1}}）{{item.content}}&#X3000;</span></p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="类型" width="80">
            <template slot-scope="scope">
              <p>{{scope.row.type|problemType}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button size="mini" type="text" v-if="scope.$index!=0" @click="sortfun(scope.$index,'problem',1)">上移</el-button>
              <el-button size="mini" type="text" v-if="scope.$index!=problemList.length-1" @click="sortfun(scope.$index,'problem',-1)">下移</el-button>
              <el-button size="mini" type="text" @click="changeProblemcheckbox(scope.row,'del')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>

    <el-dialog :visible.sync="isSaveDraft" width="500px" center class="deepbackground messagebox">
      <p class="headerTitle">{{title}}</p>
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
  name: "application4",
  data() {
    var isValidate = (rule, value, callback) => {
      //手机号验证
      if (!value) {
        return callback(new Error("尚未设置字幕/标注工具"));
      }
      callback();
    };
    return {
      title: "是否保存草稿",
      isEdit: false,
      isSaveDraft: false,
      stepType: 1, //默认下一步
      selectedLabelTool: false,
      selectedProblem: false,
      labelToolList: [],
      problemList: [],
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
      QualificaProblem: {
        data: [],
        pageInfo: {
          pageNum: 0,
          pages: 0,
          total: 0
        }
      },
      pageNum: 1,
      pageNum1: 1,
      pageSize: 5,
      label: {
        dialogLabelTool: false,
        type: "",
        toolName: "",
        labelToolIds: [],
        labelToolTypes: [],
        labelToolNames: []
      },
      labelType: "",
      labelToolName: "",
      problem: {
        dialogProblem: false,
        subject: "",
        type: "",
        status: "",
        problemIds: [],
        problemSubjects: []
      },
      problemType: "",
      problemSubject: "",
      ruleForm: {
        labelTool: "",
        problem: ""
      },
      rules: {
        problem: [
          {
            validator: isValidate,
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState("user", ["token"]),
     maxheight1(value){
      if(this.labelToolList.length<=5&&this.labelToolList.length>0){
        return  (this.labelToolList.length+1)*55+20+'px'
      }else if(this.labelToolList.length==0){
        return 120+'px'
      }else{
        return 360+'px'
      }
    },
     maxheight2(value){
      if(this.problemList.length<=5&&this.problemList.length>0){
        return  (this.problemList.length+1)*55+20+'px'
      }else if(this.problemList.length==0){
        return 120+'px'
      }else{
        return 360+'px'
      }
    }
  },
  created() {},
  watch: {
    labelType() {
      this.pageNum = 1;
      this.getlabelTool();
    },
    // labelToolName() {
    //   this.pageNum = 1;
    //   this.getlabelTool();
    // },
    // problemSubject() {
    //   this.pageNum1 = 1;
    //   this.getproblem();
    // },
    problemType() {
      this.pageNum1 = 1;
      this.getproblem();
    }
  },
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
            this.isloading = false;
            if (res.data.bzProject.remark.match(RegExp(/4/))) {
              this.isEdit = true;
            } else {
              this.isEdit = false;
            }
            for (var i = 0; i < res.data.projectLabelToolList.length; i++) {
              var id = res.data.projectLabelToolList[i].projectToolId;
              var toolName = res.data.projectLabelToolList[i].toolName;
              var toolImage = res.data.projectLabelToolList[i].toolImage;
              var type = res.data.projectLabelToolList[i].type;
              var toolobj = {};
              toolobj.id = id;
              toolobj.toolName = toolName;
              toolobj.toolImage = toolImage;
              toolobj.type = type;
              this.labelToolList.push(toolobj);
              this.ruleForm.labelTool = "1";
              if (res.data.projectLabelToolList[i].type == 1) {
                var type = "点";
              } else if (res.data.projectLabelToolList[i].type == 2) {
                var type = "线";
              } else if (res.data.projectLabelToolList[i].type == 3) {
                var type = "框";
              }
              if (this.label.labelToolIds.indexOf(id) > -1) {
                this.label.labelToolIds.splice(
                  this.label.labelToolIds.indexOf(id),
                  1
                );
                var index = this.label.labelToolTypes.indexOf(type);
                if (this.label.labelToolNames[index].length == 1) {
                  this.label.labelToolTypes.splice(index, 1);
                  this.label.labelToolNames.splice(index, 1);
                } else {
                  var indexa = this.label.labelToolNames.indexOf(toolName);
                  this.label.labelToolNames[index].splice(indexa, 1);
                }
              } else {
                this.label.labelToolIds.push(id);
                var indexb = this.label.labelToolTypes.indexOf(type);
                if (indexb > -1) {
                  this.label.labelToolNames[indexb].push(toolName);
                } else {
                  var a = [];
                  a.push(toolName);
                  this.label.labelToolTypes.push(type);
                  this.label.labelToolNames.push(a);
                }
              }
            }

            for (var j = 0; j < res.data.projectQuestionList.length; j++) {
              var obj = {};
              obj.id = res.data.projectQuestionList[j].questionId;
              obj.problemOptionList = res.data.projectQuestionList[j].content;
              obj.subject = res.data.projectQuestionList[j].subject;
              obj.type = res.data.projectQuestionList[j].type;
              this.problemList.push(obj);
            }
            for (var j = 0; j < res.data.projectQuestionList.length; j++) {
              var id = res.data.projectQuestionList[j].questionId;
              var problemSubject = res.data.projectQuestionList[j];
              if (this.problem.problemIds.indexOf(id) > -1) {
                var index = this.problem.problemIds.indexOf(id);
                this.problem.problemIds.splice(index, 1);
                this.problem.problemSubjects.splice(index, 1);
              } else {
                this.problem.problemIds.push(id);
                this.problem.problemSubjects.push(problemSubject);
              }
            }

            if (
              this.problemList.length == 0 &&
              this.labelToolList.length == 0
            ) {
              this.ruleForm.problem = "";
            } else {
              this.ruleForm.problem = "1";
            }
          } else {
            this.$toaster.error(res.msg);
          }
        })
        .catch(() => {});
    }
  },
  methods: {
    sortfun(index, name, type) {
      if (name == "labeltool") {
        var labeltoolobj = {};
        labeltoolobj = this.labelToolList[index - type];
        this.labelToolList.splice(index - type, 1, this.labelToolList[index]);
        this.labelToolList.splice(index, 1, labeltoolobj);
        var labelToolIdsobj = {};
        labelToolIdsobj = this.label.labelToolIds[index - type];
        this.label.labelToolIds.splice(
          index - type,
          1,
          this.label.labelToolIds[index]
        );
        this.label.labelToolIds.splice(index, 1, labelToolIdsobj);
      } else {
        var problemobj = {};
        problemobj = this.problemList[index - type];
        this.problemList.splice(index - type, 1, this.problemList[index]);
        this.problemList.splice(index, 1, problemobj);
        var problemIdsobj = {};
        problemIdsobj = this.problem.problemIds[index - type];
        this.problem.problemIds.splice(
          index - type,
          1,
          this.problem.problemIds[index]
        );
        this.problem.problemIds.splice(index, 1, problemIdsobj);
      }
    },
    showDialog(name, type) {
      //显示弹框
      if (name == "labeltool") {
        if (type == "look") {
          this.label.dialogLabelTool = false;
          this.selectedLabelTool = true;
        } else {
          this.selectedLabelTool = false;
          this.changeLabelTool();
        }
      } else {
        if (type == "look") {
          this.problem.dialogProblem = false;
          this.selectedProblem = true;
        } else {
          this.selectedProblem = false;
          this.changeProblem();
        }
      }
    },
    changeLabelTool() {
      // 点击选择标注工具
      this.label.dialogLabelTool = true;
      this.labelToolSearch();
    },
    labelToolSearch() {
      // 标注工具搜索
      this.pageNum = 1;
      this.getlabelTool();
    },
    getlabelTool() {
      // 获取标注工具
      this.$api.project
        .getLabelToolList(
          this.pageNum,
          this.pageSize,
          this.labelToolName,
          this.labelType
        )
        .then(res => {
          if ((res.code = 200)) {
            this.QualificaLabelName = res;
            if (this.QualificaLabelName.data.length > 0) {
              for (var i = 0; i < this.QualificaLabelName.data.length; i++) {
                if (
                  this.label.labelToolIds.indexOf(
                    this.QualificaLabelName.data[i].id
                  ) > -1
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
    currentLabelToolChange(a) {
      //点击标注工具搜索的翻页
      this.pageNum = a;
      this.getlabelTool();
    },
    changeLabelToolcheckbox(data, name) {
      // 标注工具的点击复选框
      var id = data.id;
      var toolName = data.toolName;
      if (data.type == 1) {
        var type = "点";
      } else if (data.type == 2) {
        var type = "线";
      } else if (data.type == 3) {
        var type = "框";
      }
      if (this.label.labelToolIds.indexOf(id) > -1) {
        var indexc = this.label.labelToolIds.indexOf(id);
        this.label.labelToolIds.splice(indexc, 1);
        this.labelToolList.splice(indexc, 1);
        var index = this.label.labelToolTypes.indexOf(type);
        if (this.label.labelToolNames[index].length == 1) {
          this.label.labelToolTypes.splice(index, 1);
          this.label.labelToolNames.splice(index, 1);
        } else {
          var indexa = this.label.labelToolNames.indexOf(toolName);
          this.label.labelToolNames[index].splice(indexa, 1);
        }
      } else {
        if (!name) {
          this.label.labelToolIds.push(id);
          this.labelToolList.push(data);
          var indexb = this.label.labelToolTypes.indexOf(type);
          if (indexb > -1) {
            this.label.labelToolNames[indexb].push(toolName);
          } else {
            var a = [];
            a.push(toolName);
            this.label.labelToolTypes.push(type);
            this.label.labelToolNames.push(a);
          }
        }
      }
      this.getlabelTool();
      if (this.problemList.length == 0 && this.labelToolList.length == 0) {
        this.ruleForm.problem = "";
      } else {
        this.ruleForm.problem = "1";
      }
    },
    changeProblem() {
      // 点击选择问题
      this.problem.dialogProblem = true;
      this.pageNum = 1;
      this.problemSearch();
    },
    problemSearch() {
      // 选择问题的搜索
      this.getproblem();
    },
    getproblem() {
      // 获取问题列表
      this.$api.project
        .getQuestionList(
          this.pageNum1,
          this.pageSize,
          this.problemSubject,
          this.problemType,
          this.problem.status
        )
        .then(res => {
          if ((res.code = 200)) {
            this.QualificaProblem = res;
            if (this.QualificaProblem.data.length > 0) {
              for (var i = 0; i < this.QualificaProblem.data.length; i++) {
                if (
                  this.problem.problemIds.indexOf(
                    this.QualificaProblem.data[i].id
                  ) > -1
                ) {
                  this.QualificaProblem.data[i].checked = true;
                } else {
                  this.QualificaProblem.data[i].checked = false;
                }
              }
            }
          }
        })
        .catch(() => {});
    },
    currentProblemChange(a) {
      //点击字幕问题搜索的翻页
      this.pageNum1 = a;
      this.getproblem();
    },
    changeProblemcheckbox(data, name) {
      // 字幕问题的点击复选框
      var id = data.id;
      data.content = data.problemOptionList;
      var problemSubject = data;
      if (this.problem.problemIds.indexOf(id) > -1) {
        var index = this.problem.problemIds.indexOf(id);
        this.problem.problemIds.splice(index, 1);
        this.problemList.splice(index, 1);
        this.problem.problemSubjects.splice(index, 1);
      } else {
        if (!name) {
          this.problem.problemIds.push(id);
          this.problemList.push(data);
          this.problem.problemSubjects.push(problemSubject);
        }
      }
      this.getproblem();
      if (this.problemList.length == 0 && this.labelToolList.length == 0) {
        this.ruleForm.problem = "";
      } else {
        this.ruleForm.problem = "1";
      }
    },
    goTo() {
      var pathArr = this.$route.path.split("/");
      pathArr.splice(pathArr.length - 1, 1, `projecteditapplication${4 + this.stepType}`);
      pathArr = pathArr.join("/");
      if (sessionStorage.getItem("projectEditStatus")) {
        this.$router.push({
          path: pathArr
        });
      }
    },
    stepto3(formName) {
      // 上一步到3
      this.stepType = -1;
      if (this.isEdit) {
        // if (this.problemList.length == 0 && this.labelToolList.length > 0) {
        //   this.title = "尚未设置问题，是否保存草稿";
        //   this.isSaveDraft = true;
        // } else if (
        //   this.labelToolList.length == 0 &&
        //   this.problemList.length > 0
        // ) {
        //   this.title = "尚未设置标注工具，是否保存草稿";
        //   this.isSaveDraft = true;
        // } else if (
        //   this.labelToolList.length == 0 &&
        //   this.problemList.length == 0
        // ) {
        //   this.isSaveDraft = true;
        //   this.title = "是否保存草稿";
        // } else {
        //   this.title = "是否保存草稿";
        //   this.isSaveDraft = true;
        // }
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
                toolList: this.label.labelToolIds,
                questionList: this.problem.problemIds,
                id: this.id,
                token: this.token,
                step: 4
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
    stepto5(formName) {
      // 下一步到5
      this.stepType = 1;
      if (this.isEdit) {
        // if (this.problemList.length == 0 && this.labelToolList.length > 0) {
        //   this.title = "尚未设置问题，是否保存草稿";
        //   this.isSaveDraft = true;
        // } else if (
        //   this.labelToolList.length == 0 &&
        //   this.problemList.length > 0
        // ) {
        //   this.title = "尚未设置标注工具，是否保存草稿";
        //   this.isSaveDraft = true;
        // } else if (
        //   this.labelToolList.length == 0 &&
        //   this.problemList.length == 0
        // ) {
        //   this.$refs["ruleForm"].validate(valid => {
        //     if (valid) {
        //     } else {
        //       return false;
        //     }
        //   });
        //   this.title = "尚未设置问题/标注工具，无法保存草稿";
        // } else {
        //   this.title = "是否保存草稿";
        //   this.isSaveDraft = true;
        // }
        this.closeSaveDraft(true);
      } else {
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.$api.project
              .applyProject({
                toolList: this.label.labelToolIds,
                questionList: this.problem.problemIds,
                id: this.id,
                token: this.token,
                step: 4
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
      this.problem = {
        dialogProblem: false,
        subject: "",
        type: "",
        status: "",
        problemIds: [],
        problemSubjects: []
      };
      this.label = {
        dialogLabelTool: false,
        type: "",
        toolName: "",
        labelToolIds: [],
        labelToolTypes: [],
        labelToolNames: []
      };
      this.labelToolList = [];
      this.problemList = [];
    }
  }
};
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style lang="less">
table {
  th,
  td {
    height: 55px;
    text-align: center !important;
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
.messagebox {
  .el-dialog__header {
    padding: 0;
  }
  .headerTitle {
    color: white;
    text-align: center;
    font-size: 18px;
    margin-bottom: 30px;
  }
}
</style>
