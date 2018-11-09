<template>
  <div class="tool">
    <el-dialog :visible.sync="showtoolForm" width="550px" @close="close" class="deepbackground" center>
      <p class="headerTitle">{{title}}</p>
      <el-form ref="toolForm" :model="toolForm" class="demo-form-inline toolForm" :rules="toolRules" label-width="70px">
        <el-form-item label="类型：">
          <el-input value="点" maxlength="10" disabled></el-input>
        </el-form-item>
        <el-form-item prop="toolName1" label="名称：" v-show="false">
          <el-input v-model="toolForm.toolName1" placeholder="请输入名称" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item prop="toolName" label="名称：">
          <el-input v-model="toolForm.toolName" placeholder="请输入名称" maxlength="10"  @change="filteremojifun($event,'toolForm','toolName')"></el-input>
        </el-form-item>
        <el-form-item prop="toolImage" label="图标：">
          <el-upload class="avatar-uploader" :data="{token:token}" :action="$serverUrl+'pc/file/fileOriginalUpload'" name="fileName" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-progress="avatarprogress" :on-error="avatarerror">
            <img v-if="uploaderIcon" :src="toolForm.toolImage" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="tool('toolForm')">确 定</el-button>
        <el-button type="primary" @click="close">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "tool",
  props: {
    // route object
    toolFormVisible: false,
    toolType: 0,
    toolId: 0
  },
  data() {
    return {
      imagestate: "",
      pleaseupimage: "",
      code: "获取验证码",
      showtoolForm: false,
      title: "新增图标申请",
      uploaderIcon: false,
      toolForm: {
        type: 1,
        toolName: "",
        toolImage: ""
      },
      toolRules: {
        toolName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { max: 10, message: "不得超过10个字符", trigger: "blur" }
        ],
        toolImage: [{ required: true, message: "请上传图标", trigger: "blur" }]
      }
    };
  },
  watch: {
    toolFormVisible(newValue, oldValue) {
      //监听父组件传来的值是否变化
      this.showtoolForm = newValue;
      this.getLableTool();
    }
  },
  created() {
    // this.getLableTool()
  },
  computed: {
    ...mapState("user", ["token"])
  },
  methods: {
    filteremojifun(e,ruleForm,name){
      this[ruleForm][name] = this.$utils.filteremoji(e);
    },
    close() {
      this.$refs["toolForm"].resetFields();
      this.$emit("closetoolForm");
    },
    beforeAvatarUpload(file) {
      // 上传图片限制大小，格式
      this.uploaderIcon = false;
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error("上传图标只能是 JPG、PNG 格式");
        return false
      }
      if (!isLt1M) {
        this.$message.error("上传图标大小不能超过 1MB");
        return false
      }
    },
    avatarprogress(event, file, fileList) {
      // 上传图片中
      // this.imagestate = "1";
      this.uploaderIcon = false;
    },
    handleAvatarSuccess(res, file) {
      // 上传图片成功
      this.imagestate = "";
      if (res.code == 200) {
        this.$toaster.ok("图标上传成功");
        this.uploaderIcon = true;
        this.toolForm.toolImage = res.data;
      } else {
        this.$toaster.error(res.msg);
      }
    },
    avatarerror(err, file, fileList) {
      // 上传图片失败
      this.imagestate = "";
      this.uploaderIcon = false;
      this.$toaster.error("图标上传失败");
    },
    tool(toolForm) {
      this.$refs[toolForm].validate(valid => {
        if (valid) {
          var toolForm = this.toolForm;
          if (this.toolType == 1) {
            this.$api.project
              .updateLableTool(
                this.toolId,
                toolForm.toolName,
                toolForm.toolImage,
                1
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
            this.$api.project
              .applyLableTool(toolForm.toolName, toolForm.toolImage, 1, 2)
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
    getLableTool() {
      if (this.toolType == 1) {
        this.title = "编辑图标申请";
        this.$api.project.getLableTool(this.toolId).then(res => {
          if (res.code == 200) {
            this.toolForm = res.data;
            if (res.data.toolImage) {
              this.uploaderIcon = true;
            }
          } else {
            this.$toaster.error(res.msg);
          }
        });
      } else {
        this.title = "新增图标申请";
        this.uploaderIcon = false;
        this.toolForm = {
          type: 1,
          toolName: "",
          toolImage: ""
        };
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.toolForm {
  width: 500px;
  margin: 0 auto;
  padding-left: 40px;
  padding-right: 45px;
  .el-input.is-disabled .el-input__inner,
  .el-textarea.is-disabled .el-textarea__inner {
    color: white !important;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;
    width: 60px !important;
    height: 60px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #5a7cd0;
  }
  .avatar-uploader-icon {
    font-size: 14px;
    color: #8c939d;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
  .avatar {
    width: 60px;
    height: 60px;
    display: inline-block;
  }
}
.tool {
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
.tool {
  .el-dialog__body {
    padding-bottom: 0px;
  }
}
</style>
