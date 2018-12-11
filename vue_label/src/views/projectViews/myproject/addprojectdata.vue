<template>
  <div class="addprojectdata content-padding"  >
    <div class=" addprojectdata-form" v-loading="isloading1" style="margin-top:0 !important;">
      <el-form label-width="150px" class="demo-ruleForm" >
         <el-form-item style="margin:0;">
        <b class="applicaproject-title" style="position:relative;right:150px;">项目基本信息：</b>
        </el-form-item>
        <el-form-item label="项目名称：">
          <el-input v-model="projectapplicationdata.bzProject.projectName" placeholder="项目名称" disabled></el-input>
        </el-form-item>
        <el-form-item label="项目介绍：" class="productContent">
          <div v-html="projectapplicationdata.bzProject.productContent" class="textareaClass"></div>
        </el-form-item>
        <el-form-item label="任务总数：">
          <el-input v-model="projectapplicationdata.bzProject.taskTotal" placeholder="任务总数" maxlength="50" disabled></el-input>
        </el-form-item>
        <el-form-item label="已上传任务数：">
          <el-input placeholder="已上传任务数" v-model="total" maxlength="50" disabled></el-input>
        </el-form-item>
        <el-form-item label="选择文件：" style="text-align:center;">
          <!-- <el-upload class="upload-demo"
          accept=".jpg,.jpeg,.png,.zip,.xlsx,.xls,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF"
          drag :data="{token:$token}"
          :action="$serverUrl+'pc/file/fileOriginalUpload'"
          name="fileName"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :on-progress="avatarprogress"
          :on-error="avatarerror"> -->
          <el-upload
          class="upload-box"
           :disabled="isDisable"
           :before-upload="beforeAvatarUpload"
           drag action="" name="name"
            :show-file-list="false"
             accept=".jpg,.jpeg,.png,.zip,.xlsx,.xls,.JPG,.JPEG,.PNG,.XLSX,.XLS,.ZIP"
               :http-request="uploadFile">
           <div   v-loading="uploading">
              <i class="el-icon-upload"></i>
            <div class="el-upload__text" v-html="eluploadtext"></div>
           </div>
            <!-- <el-progress v-else type="circle" :percentage="uploadPercent" style="margin-top:30px;"></el-progress> -->
            <div class="el-upload__tip" slot="tip" style="font-size:12px;color:#999;line-height:20px;">
              <!-- 支持文件格式 .jpg、.jpeg、.png、.zip、.xlsx、.xls&#X3000;<br> -->
              请先上传医学图像，文件格式： .jpg、.jpeg、.png等，再上传病历数据，文件格式：.xlsx、.xls，也可以都放在一个.zip压缩包中。<a href="http://122.152.212.188:8080/labelcloud/template.xlsx" style="color:#5A7CD0;">病历数据模板下载</a>
            </div>
          </el-upload>
        </el-form-item>
          <el-form-item style="margin:0;">
        <b class="applicaproject-title" style="position:relative;right:150px;">已上传任务列表：</b>
        </el-form-item>
      </el-form>
      <div style="padding-left:70px;" class="tablecontent">
        <el-table :data="tableData" border style="width: 100%;position:relative;left:80px;" :header-cell-style="{background:'#f6f6f6',color:'#333333'}" v-loading="isloading2">
          <el-table-column label="任务号">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="left-start" :content="scope.row.taskNumber">
                <p slot="reference">{{scope.row.taskNumber}}</p>
              </el-popover>
            </template>
          </el-table-column>
           <el-table-column label="图像名称"  width="85">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start">
                <div>
                 <p>{{scope.row.imageName}}</p>
                </div>
                <p slot="reference">{{scope.row.imageName}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="医学图像"  width="85">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start">
                <div>
                  <img :src="scope.row.image" :alt="scope.row.imageName">
                </div>
                <p slot="reference"> <img :src="scope.row.image" :alt="scope.row.imageName"></p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="病历数据"  width="85">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'detail',scope.row.taskNumber,scope.row.data)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="55">
            <template slot-scope="scope">
              <el-button size="mini" type="text" @click="operation(scope.row.id,'del',scope.row.taskNumber)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="height:40px;">
          <el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
   <el-dialog  :visible.sync="dialogVisible" width="800px" center class="casedata">
     <p class="title">
      病历数据：
     </p>
      <span class="content">{{dialogcontent}}</span>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "addprojectdata",
  data() {
    return {
      uploading:false,
      // uploadPercent:0,
      isDisable:false,
      isloading1: true,
      isloading2: true,
      sampleList:'',
      eluploadtext: "将文件拖到此处，或<em>点击上传</em>",
      projectapplicationdata: {
        bzProject: {
          projectName: "",
          productKey: "",
          productContent: "",
          taskTotal: "",
          batchTaskAmount: "",
          puzzleTimes: "",
          batchPeriod: "",
          batchPeriodUnit: "",
          reviewPeriod: "",
          reviewPeriodUnit: "",
          projectPeriod: "",
          projectPeriodUnit: "",
          isSecondReview: "",
          labelPrice: "",
          reviewPrice: "",
          consultationPrice: "",
          acceptanceType: "",
          reviewSamplingRate: "",
          acceptancePassRate: ""
        }
      },
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      total: 0, //总数
      title: "病历数据",
      dialogVisible: false,
      dialogcontent: "",
      tableData: []
    };
  },
  created() {
    if (this.$utils.getSession("projectId")) {
      this.$api.project
        .getProject(this.$utils.getSession("projectId"))
        .then(res => {
          if (res.code == 200) {
            this.isloading1 = false;
            this.projectapplicationdata = res.data;
          } else {
            this.$toaster.error(res.msg);
          }
        });
      this.getProjectTaskList();
    } else {
      return;
    }
  },
  methods: {
    beforeAvatarUpload(file) {
      // 上传图片限制大小，格式
      var type = file.name.substring(file.name.length-4,file.name.length)
      const isTrue = type === ".png" ||type === "jpeg" || type === ".jpg"||type === "xlsx"||type===".xls"||type===".zip"||type === ".PNG" || type === ".JPG"||type === "JPEG" ||type === "XLSX"||type===".XLS"||type===".ZIP";
      if (!isTrue) {
        this.$message.error("上传文件格式错误");
      }
      return isTrue;
    },
    uploadFile(obj) {
      this.uploading = true;
      this.isDisable = true;
      var fd = new FormData();
      fd.append("fileName", obj.file);
      fd.append("projectId", this.$utils.getSession("projectId"));
      this.$api.project
        .addProjectData(fd)
        .then(res => {
           this.uploading = false;
             this.isDisable = false;
          if (res.code == 200) {
            this.$toaster.ok(res.msg);
            this.getProjectTaskList();
          } else {
            this.$toaster.error(res.msg);
          }
        })
        .catch(err => {
        });
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getProjectTaskList();
    },
    getProjectTaskList() {
      this.isloading2 = true;
      this.$api.project
        .getProjectTaskList(
          this.currentPage,
          this.pagesize,
          this.$utils.getSession("projectId")
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getProjectTaskList();
          } else {
            this.total = res.pageInfo.total;
            this.tableData = res.data;
            this.isloading2 = false;
          }
        });
    },
    operation(id, type, name, data) {
      if (type == "detail") {
        this.title = "【" + name + "】病历数据";
        this.dialogcontent = data;
        this.dialogVisible = true;
      } else if (type == "del") {
        this.$confirm("是否确定删除【" + name + "】？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api.project
              .delfun("pc/projectTask/delProjectTask", id)
              .then(res => {
                this.getProjectTaskList();
                this.$message({
                  type: "success",
                  message: "删除成功"
                });
              });
          })
          .catch(() => {
            // this.$message({
            //   type: "info",
            //   message: "已取消删除"
            // });
          });
      }
    }
  }
};
</script>

<!-- Add "scoped " attribute to limit CSS to this component only -->
<style lang="less">
.addprojectdata {
   .productContent {
    .el-form-item__content {
      line-height: 170%;
    }
  }
  .addprojectdata-form {
    width: 600px;
    margin: 20px auto;
    position: relative;
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
  }
}
</style>
