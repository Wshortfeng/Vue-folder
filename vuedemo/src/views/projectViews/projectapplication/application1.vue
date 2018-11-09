<template>
  <div class="application">
    <el-steps :active="0" align-center>
      <el-step title="1.项目描述" icon="el-icon-label-time1"></el-step>
      <el-step title="2.项目设置" icon="el-icon-label-time1"></el-step>
      <el-step title="3.标注资质" icon="el-icon-label-time1"></el-step>
      <el-step title="4.标注工具" icon="el-icon-label-time1"></el-step>
      <el-step title="5.验收设置" icon="el-icon-label-time1"></el-step>
      <el-step title="6.报酬方案" icon="el-icon-label-time1"></el-step>
      <el-step title="7.预览" icon="el-icon-label-time1"></el-step>
    </el-steps>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm" v-loading="isloading">
      <ul class="application-con-ul">
        <li>
          <el-form-item label="项目名称：" prop="projectName">
            <el-input v-model="ruleForm.projectName" placeholder="请输入项目名称" maxlength="20"   @change="filteremojifun($event,'ruleForm','projectName')"></el-input>
          </el-form-item>
          <el-form-item label="项目关键字：" prop="productKey">
            <el-input v-model.number="ruleForm.productKey" placeholder="请输入项目关键字" maxlength="20" @change="filteremojifun($event,'ruleForm','productKey')"></el-input>
          </el-form-item>
          <el-form-item label="项目介绍：" prop="productContent" v-loading="imageLoading">
            <quill-editor v-model="ruleForm.productContent" ref="newEditor" class="editer" :options="editorOption" placeholder="请输入项目介绍" @change="alertValue($event,2000,1000)"> </quill-editor>
          </el-form-item>
          <el-upload style="display:none" :action="$serverUrl + 'pc/file/fileOriginalUpload'" :data="{token:token}" name="fileName" :show-file-list="false" :before-upload='newEditorbeforeupload' :on-success='newEditorSuccess' ref="uniqueId" id="uniqueId">
          </el-upload>
        </li>
      </ul>
      <div class="application-button">
        <el-form-item>
          <el-button type="primary" @click="stepto2('ruleForm')">下一步</el-button>
          <el-button style="border-color:#5A7CD0;" @click="resetForm('ruleForm')">&nbsp;重&nbsp;置&nbsp;</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-dialog title="是否保存草稿" :visible.sync="isSaveDraft" width="500px" center class="deepbackground">
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeSaveDraft(true)" class="mg_right">保 存</el-button>
        <el-button type="primary" @click="closeSaveDraft(false)">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { quillRedefine } from "vue-quill-editor-upload";
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { mapState } from "vuex";
export default {
  name: "projectapplication",
  components: {
    quillEditor,
    quillRedefine
  },
  data() {
    return {
      isloading: false,
      isEdit: false,
      isSaveDraft: false,
      imageLoading: false,
      editorOption: {},
      ruleForm: {
        projectName: "",
        productKey: "",
        productContent: "",
        id: "",
        token: "",
        step: 1
      },
      rules: {
        projectName: [
          {
            required: true,
            message: "请输入项目名称",
            trigger: "blur"
          }
        ],
        productKey: [
          {
            required: true,
            message: "请输入项目关键字",
            trigger: "blur"
          }
        ],
        productContent: [
          {
            required: true,
            message: "请输入项目介绍",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.ruleForm.token = this.token;
    this.editorOption = quillRedefine({
      toolOptions: [
        [
          "bold",
          "italic",
          "underline",
          "strike",
          { color: [] },
          { background: [] },
          { size: ["small", false, "large", "huge"] },
          { indent: "-1" },
          { indent: "+1" },
          {
            align: []
          },
          { list: "ordered" },
          { list: "bullet" },
          "image"
        ]
      ],
      placeholder: "请输入项目介绍"
      // 图片上传的设置
      // uploadConfig: {
      //   action: this.$serverUrl + "pc/file/fileOriginalUpload", // 必填参数 图片上传地址
      //   // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
      //   // 你必须把返回的数据中所包含的图片地址 return 回去
      //   res: respnse => {
      //     return respnse.data;
      //   },
      //   // size: 1024, // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
      //   accept: "image/png, image/gif, image/jpeg",
      //   name: "fileName", // 图片上传参数名
      //   token: this.token
      // }
    });
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    ...mapState("user", ["token"])
  },
  mounted() {
    var imgHandler = async function(state) {
      if (state) {
        var fileInput = document.querySelector("#uniqueId input"); //隐藏的file元素
        fileInput.click(); //触发事件
      }
    };
    this.$refs.newEditor.quill
      .getModule("toolbar")
      .addHandler("image", imgHandler);
    var projectEditId = sessionStorage.getItem("projectEditId"); // 获取修改时的项目id
    if (projectEditId == undefined || projectEditId == null) {
      this.ruleForm.id = "";
    } else {
      this.isloading = true;
      this.$refs["ruleForm"].resetFields();
      this.ruleForm.id = projectEditId;
      this.$api.project
        .getProject(this.ruleForm.id)
        .then(res => {
          if (res.code == 200) {
            if (res.data.bzProject.remark.match(RegExp(/1/))) {
              this.isEdit = true;
            } else {
              this.isEdit = false;
            }
            this.ruleForm.projectName = res.data.bzProject.projectName;
            this.ruleForm.productKey = res.data.bzProject.productKey;
            this.ruleForm.productContent = res.data.bzProject.productContent;
            this.isloading = false;
          } else {
            this.$toaster.error(res.msg);
          }
        })
        .catch(() => {});
    }
  },
  methods: {
    newEditorbeforeupload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG或PNG 格式");
        return false;
      }
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 1MB");
        return false;
      }
      this.imageLoading = true;
    },
    //上传图片回调
    newEditorSuccess(response, file, fileList) {
      console.log(response);
      if (response.code === 200) {
        this.addImgRange = this.$refs.newEditor.quill.getSelection();
        this.$refs.newEditor.quill.insertEmbed(
          this.addImgRange != null ? this.addImgRange.index : 0,
          "image",
          response.data
          // Quill.sources.USER
        );
      } else {
        this.$toaster.error(res.msg);
      }
      this.imageLoading = false;
    },
    alertValue(e, strValue, decimalNum) {
      //  e.text=this.$utils.filteremoji(e.text)
      e.quill.deleteText(decimalNum, 1, strValue); //保留 strValue 的 前 decimalNum 位字符，
      // this.ruleForm.productContent = this.$utils.filteremoji(e.text)
    },
    filteremojifun(e,ruleForm,name){
      this[ruleForm][name] = this.$utils.filteremoji(e);
    },
    goTo() {
      if (sessionStorage.getItem("projectEditStatus")) {
        this.$router.push({
          path: `/project/myproject/projectedit/application${this.ruleForm
            .step + 1}`
        });
      } else {
        this.$router.push({
          path: `/project/projectapplication/application${this.ruleForm.step +
            1}`
        });
      }
    },
    closeSaveDraft(type) {
      if (type) {
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.$api.project.applyProject(this.ruleForm).then(res => {
              if (res.code == 200) {
                sessionStorage.setItem("projectEditId", res.data);
                this.$toaster.ok("草稿保存成功");
                this.goTo();
              } else {
                this.$toaster.error(res.msg);
              }
            });
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
    stepto2(formName) {
      // 下一步到2
      if (this.isEdit) {
        // this.isSaveDraft = true;
        this.closeSaveDraft(true);
      } else {
        this.$refs["ruleForm"].validate(valid => {
          if (valid) {
            this.$api.project.applyProject(this.ruleForm).then(res => {
              if (res.code == 200) {
                sessionStorage.setItem("projectEditId", res.data);
                this.goTo();
              } else {
                this.$toaster.error(res.msg);
              }
            });
          } else {
            return false;
          }
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
