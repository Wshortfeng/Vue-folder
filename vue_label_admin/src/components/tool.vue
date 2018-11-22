<template>
  <div class="tool">
    <el-dialog :visible.sync="showtoolForm" width="450px" @close="close" class="deepbackground" center>
      <p class="headerTitle">{{title}}</p>
      <el-form ref="toolForm" :model="toolForm" class="demo-form-inline toolForm" :rules="toolRules" label-width="80px">
        <el-form-item label="类型：" prop="type">
          <el-select v-model="toolForm.type" filterable placeholder="请选择类型" class="mg_right1" maxlength="50">
            <el-option v-for="(item,index) in options" :key="index" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="toolName" label="名称：">
          <el-input v-model="toolForm.toolName" placeholder="请输入名称" class="keyword" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item prop="attribute" label="属性：" v-if="toolForm.type>1">
          <el-select v-model="toolForm.attribute" filterable placeholder="请选择属性" class="mg_right1" maxlength="50">
            <el-option v-for="(item,index) in options1" :key="index" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="sort" label="排序：">
          <el-input-number :controls="false" v-model="toolForm.sort" :min="0" :max="99999999" :precision="0" placeholder="请输入序号" class="keyword"></el-input-number>
        </el-form-item>
        <el-form-item prop="toolImage" label="图标：" v-if="toolForm.type==1">
          <el-upload class="avatar-uploader" :data="{token:$token}" :action="$serverUrl+'pc/file/fileOriginalUpload'" name="fileName" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-progress="avatarprogress" :on-error="avatarerror">
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
      options: [
        { name: "点", value: "1" },
        { name: "线", value: "2" },
        { name: "框", value: "3" }
      ],
      options1: [],
      lineattributeList: [
        { name: "横向细实线", value: "1" },
        { name: "横向粗实线", value: "2" },
        { name: "横向细虚线", value: "3" },
        { name: "横向粗虚线", value: "4" },
        { name: "竖向细实线", value: "5" },
        { name: "竖向粗实线", value: "6" },
        { name: "竖向细虚线", value: "7" },
        { name: "竖向粗虚线", value: "8" }
      ],
      frameattributeList:[
        { name: "细实框", value: "1" },
        { name: "粗实框", value: "2" },
        { name: "细虚框", value: "3" },
        { name: "粗虚框", value: "4" },
      ],
      showtoolForm: false,
      title: "新增标注工具",
      uploaderIcon: false,
      toolForm: {
        type: "",
        toolName: "",
        toolImage: "",
        sort: "",
        attribute:""
      },
      toolRules: {
        toolName: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { max: 10, message: "不得超过10个字符", trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        toolImage: [{ required: true, message: "请上传图片", trigger: "blur" }],
        sort: [{ required: true, message: "请输入序号", trigger: "blur" }],
        attribute:[{ required: true, message: "请选择属性", trigger: "change" }],
      }
    };
  },
  watch: {
    toolFormVisible(newValue, oldValue) {
      //监听父组件传来的值是否变化
      this.showtoolForm = newValue;
      this.getLableTool();
    },
    type(value){
     if(value==2){
       this.options1=this.lineattributeList
     }else if(value==3){
        this.options1=this.frameattributeList
     }else{
       this.toolForm.attribute=""
       this.options1=[]
     }
    },
  },
  created() {
    // this.getLableTool()
  },
  computed:{
    type(){
      return this.toolForm.type;
    }
  },
  methods: {
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
        this.$message.error("上传图片只能是 JPG、PNG 格式!");
      }
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 1MB!");
      }
      return isJPG && isLt1M;
    },
    avatarprogress(event, file, fileList) {
      // 上传图片中
      // this.imagestate = "1";
      this.uploaderIcon = false;
    },
    handleAvatarSuccess(res, file) {
      // 上传图片成功
      this.toolForm.toolImage = res.data;
      this.uploaderIcon = true;
      this.imagestate = "";
      this.$toaster.ok("图片上传成功");
    },
    avatarerror(err, file, fileList) {
      // 上传图片失败
      this.imagestate = "";
      this.uploaderIcon = false;
      this.$toaster.error("图片上传失败");
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
        this.title = "编辑标注工具";
        this.$api.project.getLableTool(this.toolId).then(res => {
          if (res.code == 200) {
            this.toolForm = res.data;
            this.toolForm.type = this.toolForm.type.toString();
            if (res.data.toolImage) {
              this.uploaderIcon = true;
            }
          } else {
            this.$toaster.error(res.msg);
          }
        });
      } else {
        this.title = "新增标注工具";
        this.uploaderIcon = false;
        this.toolForm = {
          type: "",
          toolName: "",
          toolImage: ""
        };
        this.$refs["toolForm"].resetFields();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
.toolForm {
  width: 400px;
  margin: 0 auto;
  padding-left: 40px;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    display: inline-block;
    width: 40px !important;
    height: 40px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #5a7cd0;
  }
  .avatar-uploader-icon {
    font-size: 14px;
    color: #8c939d;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }
  .avatar {
    width: 40px;
    height: 40px;
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
</style>
