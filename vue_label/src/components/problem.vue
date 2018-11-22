<template>
  <div class="problem">
    <el-dialog  :visible.sync="showproblemForm" width="550px" @close="close" class="deepbackground" center>
       <p class="headerTitle">{{title}}</p>
      <el-form ref="problemForm" :model="problemForm" class="demo-form-inline problemForm" :rules="problemRules"  label-width="80px">
        <el-form-item prop="type" label="类型：">
          <!-- <el-radio-group v-model="problemForm.type">
            <el-radio :label="1">选择题</el-radio>
            <el-radio :label="2">简答题</el-radio>
          </el-radio-group> -->
           <el-select v-model="problemForm.type"  placeholder="请选择类型" style="width:335px !important;">
            <el-option label="选择题" value="1"></el-option>
             <el-option label="问答题" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="subject1" label="名称" style="display:none">
          <el-input v-model="problemForm.subject1" placeholder="请输入名称"  maxlength="50"></el-input>
        </el-form-item>
        <el-form-item prop="subject" label="名称：">
          <el-input  v-model="problemForm.subject" placeholder="请输入名称"  maxlength="50" @change="filteremojifun($event,'problemForm','subject')"></el-input>
        </el-form-item>
        <el-form-item prop="questionOptionList" label="选项：" v-show="problemForm.type==1" >
          <!-- <el-input v-model="optionitem" placeholder="请输入选项" class="keyword"></el-input> -->
          <el-input class="input-new-tag keyword" v-if="inputVisible" v-model="optionitem" maxlength="25" ref="saveTagInput"  @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" @click="showInput">新增选项</el-button>
          <br>
          <!-- <el-button icon="el-icon-circle-plus" @click="addoption()"></el-button> -->
          <el-tag v-for="(item,index) in problemForm.questionOptionList" :key="index" closable :disable-transitions="false" @close="handleClose(index)">
            {{item.content}}
          </el-tag>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button  @click="problem('problemForm')">确 定</el-button>
        <el-button type="primary" @click="close">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "problem",
  props: {
    // route object
    problemFormVisible: false,
    problemType: 0,
    problemId: 0
  },
  data() {
    var isquestionOptionList = (rule, value, callback) => {
      //密码验证
      if (this.problemForm.type == 1) {
        if (value.length==0) {
          return callback(new Error("请添加字幕选项"));
        }
        callback();
      }
      callback();
    };
    return {
      title:'新增字幕申请',
      imagestate: "",
      pleaseupimage: "",
      code: "获取验证码",
      showproblemForm: false,
      inputVisible: false,
      optionitem: "",
      problemForm: {
        type: "1",
        subject: "",
        questionOptionList: []
      },
      problemRules: {
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        subject: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { max: 50, message: "不得超过50个字符", trigger: "blur" }
        ],
        questionOptionList: [
          {
            validator: isquestionOptionList,
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {
    problemFormVisible(newValue, oldValue) {
      //监听父组件传来的值是否变化
      this.showproblemForm = newValue;
      this.getProblem();
    }
  },
  created() {},
    computed: {
    ...mapState("user", ["token"])
  },
  methods: {
    filteremojifun(e,ruleForm,name){
      this[ruleForm][name] = this.$utils.filteremoji(e);
    },
    close() {
      this.$refs["problemForm"].resetFields();
      this.$emit("closeproblemForm");
    },
    handleClose(index) {
      this.problemForm.questionOptionList.splice(index, 1);
    },
    addoption() {
      var obj = {};
      if (this.optionitem == "") {
        this.$toaster.error("请添加字幕选项");
        return;
      }

      obj.name = this.optionitem;
      this.problemForm.questionOptionList.push(obj);
      this.optionitem = "";
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      var obj = {};
      this.optionitem=this.$utils.filteremoji(this.optionitem)
      if (this.optionitem == "") {
        this.$toaster.error("请添加字幕选项");
        return;
      }
     if(this.optionitem.length>25){
       this.$toaster.error("字幕选项名称不得超过25个字符");
        return;
     }
      var arr = this.problemForm.questionOptionList;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].content == this.optionitem) {
          this.$toaster.error("字幕选项名称不能重复");
          return;
        }
      }
      obj.content = this.optionitem;
      this.problemForm.questionOptionList.push(obj);
      this.$refs['problemForm'].validate()
      this.inputVisible = false;
      this.optionitem = "";
    },
    problem(problemForm) {
      this.$refs[problemForm].validate(valid => {
        if (valid) {
          if (this.problemType == 1) {
            if(this.problemForm.type == 2){
              this.problemForm.questionOptionList=[]
            }
            var problemForm = this.problemForm;
            this.$api.project
              .updateQuestion({
                id:this.problemId,
                questionOptionList: problemForm.questionOptionList,
                owner: 2,
                subject: problemForm.subject,
                type: problemForm.type,
                token: this.$token
              })
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.close();
                } else {
                  this.$toaster.error(res.msg);
                }
              });
          } else {
            if(this.problemForm.type == 2){
              this.problemForm.questionOptionList=[]
            }
            var problemForm = this.problemForm;
            this.$api.project
              .applyQuestion({
                questionOptionList: problemForm.questionOptionList,
                owner: 2,
                subject: problemForm.subject,
                type: problemForm.type,
                token: this.$token
              })
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.close();
                } else {
                  this.$toaster.error(res.msg);
                }
              });
          }
        } else {
          // this.$toaster.error("请确认验证项格式");
          return false;
        }
      });
    },
    getProblem() {
      if (this.problemType == 1) {
        this.title = '编辑字幕申请';
        this.$api.project.getProblem(this.problemId).then(res => {
          if (res.code == 200) {
            this.problemForm = res.data;
            this.problemForm.type = this.problemForm.type.toString();
            if(res.data.type==1){

            }else{
               this.problemForm.questionOptionList = []
            }
          } else {
            this.$toaster.error(res.msg);
          }
        });
      } else {
        this.title = '新增字幕申请';
        this.problemForm = {
          type: "1",
          subject: "",
          questionOptionList: []
        };
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.problemForm {
  width: 500px;
  margin: 0 auto;
  padding-left: 40px;
  padding-right: 45px;
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    vertical-align: bottom;
  }
}
.problem{
.el-dialog__header{
  padding: 0;
}
.headerTitle{
    color: white;
    text-align: center;
    font-size: 18px;
    margin-bottom: 30px;
  }
}
.problem{
.el-dialog__body{
  padding-bottom:0px;
}
}
</style>
