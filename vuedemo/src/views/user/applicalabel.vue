<template>
  <div id="applicaprojecta">
    <user-nav />
    <div class="applicaprojecta-main" v-loading="isloading">
      <div class="applicaproject-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <p>
            申请成为标注方信息表
            <span class="redColor">*</span>为必填项
          </p>
          <b class="applicaproject-title">基本信息</b>
          <ul class="apppro-con-ul">
            <li>
              <el-form-item label="真实姓名：" prop="legalName">
                <el-input v-model="ruleForm.legalName" placeholder="请输入真实姓名" maxlength="10"  @change="filteremojifun($event,'ruleForm','legalName')"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="地区：" prop="region">
                <el-input v-model="ruleForm.region" placeholder="请输入地区" maxlength="50" @change="filteremojifun($event,'ruleForm','region')"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="电子邮箱：" prop="email">
                <el-input v-model="ruleForm.email" placeholder="请输入电子邮箱" maxlength="50"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="最高学历：" prop="educationDegree">
                <el-select v-model="ruleForm.educationDegree" placeholder="请选择最高学历">
                  <el-option label="博士" value="5"></el-option>
                  <el-option label="硕士" value="4"></el-option>
                  <el-option label="本科" value="3"></el-option>
                  <el-option label="大专" value="2"></el-option>
                  <el-option label="其他" value="1"></el-option>
                </el-select>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="所在单位：" prop="hospital">
                <el-input v-model="ruleForm.hospital" placeholder="请输入所在单位" maxlength="20" @change="filteremojifun($event,'ruleForm','hospital')"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="单位地址：" prop="address">
                <el-input v-model="ruleForm.address" placeholder="请输入单位地址" maxlength="50" @change="filteremojifun($event,'ruleForm','address')"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="单位电话（座机）：" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入单位电话" maxlength="12"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="科室：" prop="department">
                <el-input v-model="ruleForm.department" placeholder="请输入科室" maxlength="20" @change="filteremojifun($event,'ruleForm','department')"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="职称：" prop="professionalTitle">
                <el-select v-model="ruleForm.professionalTitle" placeholder="请选择职称">
                  <el-option label="初级职称" value="1"></el-option>
                  <el-option label="中级职称" value="2"></el-option>
                  <el-option label="副高职称" value="3"></el-option>
                  <el-option label="高级职称" value="4"></el-option>
                  <el-option label="未定职称" value="5"></el-option>
                </el-select>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="职业年限：" prop="yearsOfWorking">
                <el-input v-model="ruleForm.yearsOfWorking" placeholder="请输入职业年限" maxlength="8"></el-input>
              </el-form-item>
            </li>
          </ul>
          <b class="applicaproject-title">身份证照片（正反面上传）</b>
          <ul class="apppro-con-ul">
            <li>
              <el-form-item label="身份证号：" prop="citizenIdCardNumber">
                <el-input v-model="ruleForm.citizenIdCardNumber" placeholder="请输入身份证号" maxlength="18"></el-input>
              </el-form-item>
            </li>
            <li>
              <span class="apppro-con-ul-leftspan fl">
                <span class="apppro-con-ul-xing">*&nbsp;</span>选择照片：&nbsp;&nbsp;&nbsp;
              </span>
              <div class="apppro-con-ul-rightdiv" style="width:450px;">
                <el-upload class="avatar-uploader citizenIdCard" :data="{token:token}" :action="holturl" style="margin-right:0;"  name="fileName" :show-file-list="false" :on-success="citizenIdCardFrontSuccess" :before-upload="beforeAvatarUpload" :on-progress="citizenIdCardFrontprogress" :on-error="citizenIdCardFronterror">
                  <img v-if="ruleForm.citizenIdCardFront" :src="ruleForm.citizenIdCardFrontUrl" style="max-width:217px;max-height:130px;">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload class="avatar-uploader citizenIdCard" :data="{token:token}" :action="holturl" style="margin-left:10px;margin-right:0;"  name="fileName" :show-file-list="false" :on-success="citizenIdCardBackSuccess" :before-upload="beforeAvatarUpload" :on-progress="citizenIdCardBackprogress" :on-error="citizenIdCardBackerror">
                  <img v-if="ruleForm.citizenIdCardBack" :src="ruleForm.citizenIdCardBackUrl" style="max-width:217px;max-height:130px;">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span class="image-rule">请上传不大于1M的jpg、png图片</span>
                <span style="color: green;" v-if="citizenIdCardFrontimagestate==1">图片上传中...</span>
                <span style="color: green;" v-if="citizenIdCardFrontimagestate==2">图片上传成功</span>
                <span style="color: red;" v-if="citizenIdCardFrontimagestate==3">图片上传失败</span>
                <span v-if="citizenIdCardFrontupimage==1" style="color: #f56c6c;display: block;clear: both;">请上传图片</span>
              </div>
            </li>
          </ul>
          <b class="applicaproject-title">医师证/执业证（二选一）</b>
          <ul class="apppro-con-ul">
            <li>
              <span class="apppro-con-ul-leftspan fl">
                <span class="apppro-con-ul-xing">*&nbsp;</span>选择照片：&nbsp;&nbsp;&nbsp;
              </span>
              <div class="apppro-con-ul-rightdiv">
                <el-upload class="avatar-uploader certificate" :data="{token:token}" :action="holturl" name="fileName" :show-file-list="false" :on-success="physicianPracticeLicenseSuccess" :before-upload="beforeAvatarUpload" :on-progress="physicianPracticeLicenseprogress" :on-error="physicianPracticeLicenseerror">
                  <img v-if="ruleForm.physicianPracticeLicense" :src="ruleForm.physicianPracticeLicenseUrl" style="max-width:450px;max-height:300px;">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span class="image-rule">请上传不大于1M的jpg、png图片</span>
                <span style="color: green;" v-if="physicianPracticeLicenseimagestate==1">图片上传中...</span>
                <span style="color: green;" v-if="physicianPracticeLicenseimagestate==2">图片上传成功</span>
                <span style="color: red;" v-if="physicianPracticeLicenseimagestate==3">图片上传失败</span>
                <span v-if="physicianPracticeLicenseupimage==1" style="color: #f56c6c;display: block;clear: both;">请上传图片</span>
              </div>
            </li>
          </ul>
          <b class="applicaproject-title">财务信息</b>
          <ul class="apppro-con-ul">
            <li>
              <el-form-item label="银行账号：" prop="bankCard">
                <el-input v-model="ruleForm.bankCard" placeholder="请输入银行账号" maxlength="19"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="支付宝账号：" prop="alipay">
                <el-input v-model="ruleForm.alipay" placeholder="请输入支付宝账号" maxlength="50"></el-input>
              </el-form-item>
            </li>
          </ul>
          <el-form-item style="height:60px;margin-bottom:0;">
            <el-button type="primary" @click="submitForm('ruleForm')">提交申请</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <footer-bottom />
  </div>
</template>

<script>
import userNav from "../../components/usernav";
import footerBottom from "../../components/footerbottom";
import { mapState } from "vuex";
export default {
  name: "Applicalabel",
  components: {
    userNav,
    footerBottom
  },
  data() {
    var email = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入电子邮箱"));
      }
      if (!this.$utils.isEmail(value)) {
        return callback(new Error("电子邮箱格式错误"));
      } else {
        callback();
      }
    };
    var phone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入单位电话"));
      }
      if (!this.$utils.phonecode(value)) {
        return callback(new Error("单位电话格式错误"));
      } else {
        callback();
      }
    };
    var citizenIdCardNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入身份证号"));
      }
      if (!this.$utils.isID(value)) {
        return callback(new Error("身份证号格式错误"));
      } else {
        callback();
      }
    };
    var bankCard = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入银行账号"));
      }
      if (!this.$utils.bankaccount(value)) {
        return callback(new Error("银行账号格式错误"));
      } else {
        callback();
      }
    };
    var alipay = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入支付宝账号"));
      }
      if (this.$utils.telphone(value)) {
        callback();
      } else if (this.$utils.isEmail(value)) {
        callback();
      } else {
        return callback(new Error("支付宝账号格式错误"));
      }
    };
    var isInt = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入职业年限"));
      }
      if (!this.$utils.isInt(value)) {
        return callback(new Error("职业年限格式错误"));
      } else {
        callback();
      }
    };
    return {
      holturl: this.$serverUrl + "pc/file/fileUpload",
      citizenIdCardFrontimagestate: "",
      citizenIdCardFrontupimage: "",
      physicianPracticeLicenseimagestate: "",
      physicianPracticeLicenseupimage: "",
      isloading: false,
      ruleForm: {
        legalName: "",
        region: "",
        email: "",
        educationDegree: "",
        hospital: "",
        address: "",
        phone: "",
        department: "",
        professionalTitle: "",
        yearsOfWorking: "",
        citizenIdCardNumber: "",
        citizenIdCardFront: "",
        citizenIdCardFrontUrl: "",
        citizenIdCardBack: "",
        citizenIdCardBackUrl: "",
        physicianPracticeLicense: "",
        physicianPracticeLicenseUrl: "",
        bankCard: "",
        alipay: "",
        bank: ""
      },
      rules: {
        legalName: [
          {
            required: true,
            message: "请输入真实姓名",
            trigger: "blur"
          }
        ],
        region: [
          {
            required: true,
            message: "请输入地区",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            validator: email,
            trigger: "blur"
          }
        ],
        educationDegree: [
          {
            required: true,
            message: "请选择最高学历",
            trigger: "change"
          }
        ],
        hospital: [
          {
            required: true,
            message: "请输入所在单位",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "请输入单位地址",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            validator: phone,
            trigger: "blur"
          }
        ],
        department: [
          {
            required: true,
            message: "请输入科室",
            trigger: "blur"
          }
        ],
        professionalTitle: [
          {
            required: true,
            message: "请选择职称",
            trigger: "change"
          }
        ],
        yearsOfWorking: [
          {
            required: true,
            validator: isInt,
            trigger: "blur"
          }
        ],
        citizenIdCardNumber: [
          {
            required: true,
            validator: citizenIdCardNumber,
            trigger: "blur"
          }
        ],
        bankCard: [
          {
            required: true,
            validator: bankCard,
            trigger: "blur"
          }
        ],
        alipay: [
          {
            required: true,
            validator: alipay,
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState("user", ["status"]),
    ...mapState("user", ["token"])
  },
  created() {
    if (this.status == 4) {
      this.isloading = true;
    }
  },
  mounted() {
    // 默认执行的函数
    var that = this;
    if (this.status == 4) {
      this.$store.dispatch("user/GetUserInfo").then(res => {
        //获取用户信息
        this.ruleForm = {
          legalName: res.data.legalName,
          region: res.data.region,
          email: res.data.email,
          educationDegree: res.data.educationDegree.toString(),
          hospital: res.data.hospital,
          address: res.data.address,
          phone: res.data.phone,
          department: res.data.department,
          professionalTitle: res.data.professionalTitle.toString(),
          yearsOfWorking: res.data.yearsOfWorking,
          citizenIdCardNumber: res.data.citizenIdCardNumber,
          citizenIdCardFront: res.data.citizenIdCardFront,
          citizenIdCardFrontUrl: res.data.citizenIdCardFrontUrl,
          citizenIdCardBack: res.data.citizenIdCardBack,
          citizenIdCardBackUrl: res.data.citizenIdCardBackUrl,
          physicianPracticeLicense: res.data.physicianPracticeLicense,
          physicianPracticeLicenseUrl: res.data.physicianPracticeLicenseUrl,
          bankCard: res.data.bankCard,
          alipay: res.data.alipay,
          bank: res.data.bank
        };

        this.$refs["ruleForm"].resetFields();
      });
    }
    this.isloading = false;
  },
  methods: {
    filteremojifun(e,ruleForm,name){
      this[ruleForm][name] = this.$utils.filteremoji(e);
    },
    beforeAvatarUpload(file) {
      // 上传图片限制大小，格式
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG、PNG 格式");
        return false
      }
      if (!isLt1M) {
        this.$message.error("上传图片大小不能超过 1MB");
        return false
      }
    },
    citizenIdCardFrontprogress(event, file, fileList) {
      // 上传身份证正面图片中
      this.citizenIdCardFrontimagestate = "1";
      this.citizenIdCardFrontupimage = "";
    },
    citizenIdCardFrontSuccess(res, file) {
      // 上传身份证正面图片成功
      this.ruleForm.citizenIdCardFront = res.data.fileName;
      this.ruleForm.citizenIdCardFrontUrl = res.data.fileConnect;
      this.citizenIdCardFrontimagestate = "2";
      this.citizenIdCardFrontupimage = "";
    },
    citizenIdCardFronterror(err, file, fileList) {
      // 上传身份证正面图片失败
      this.citizenIdCardFrontimagestate = "3";
      this.citizenIdCardFrontupimage = "";
    },
    citizenIdCardBackprogress(event, file, fileList) {
      // 上传身份证反面图片中
      this.citizenIdCardFrontimagestate = "1";
      this.citizenIdCardFrontupimage = "";
    },
    citizenIdCardBackSuccess(res, file) {
      // 上传身份证反面图片成功
      this.ruleForm.citizenIdCardBack = res.data.fileName;
      this.ruleForm.citizenIdCardBackUrl = res.data.fileConnect;
      this.citizenIdCardFrontimagestate = "2";
      this.citizenIdCardFrontupimage = "";
    },
    citizenIdCardBackerror(err, file, fileList) {
      // 上传身份证反面图片失败
      this.citizenIdCardFrontimagestate = "3";
      this.citizenIdCardFrontupimage = "";
    },
    physicianPracticeLicenseprogress(event, file, fileList) {
      // 上传医师证图片中
      this.physicianPracticeLicenseimagestate = "1";
      this.physicianPracticeLicenseupimage = "";
    },
    physicianPracticeLicenseSuccess(res, file) {
      // 上传医师证图片成功
      this.ruleForm.physicianPracticeLicense = res.data.fileName;
      this.ruleForm.physicianPracticeLicenseUrl = res.data.fileConnect;
      this.physicianPracticeLicenseimagestate = "2";
      this.physicianPracticeLicenseupimage = "";
    },
    physicianPracticeLicenseerror(err, file, fileList) {
      // 上传医师证图片失败
      this.physicianPracticeLicenseimagestate = "3";
      this.physicianPracticeLicenseupimage = "";
    },
    submitForm(formName) {
      // 提交标注方资料申请
      this.$refs[formName].validate(valid => {
        if (this.ruleForm.citizenIdCardFront == "") {
          this.citizenIdCardFrontupimage = 1;
          if (this.ruleForm.physicianPracticeLicense == "") {
            this.physicianPracticeLicenseupimage = 1;
            return false;
          }
          return false;
        }
        if (this.ruleForm.citizenIdCardBack == "") {
          this.citizenIdCardFrontupimage = 1;
          if (this.ruleForm.physicianPracticeLicense == "") {
            this.physicianPracticeLicenseupimage = 1;
            return false;
          }
          return false;
        }
        if (this.ruleForm.physicianPracticeLicense == "") {
          this.physicianPracticeLicenseupimage = 1;
          return false;
        }
        if (valid) {
          this.$api.user
            .applyLabelerAccount(
              this.ruleForm.legalName,
              this.ruleForm.region,
              this.ruleForm.email,
              this.ruleForm.educationDegree,
              this.ruleForm.hospital,
              this.ruleForm.address,
              this.ruleForm.phone,
              this.ruleForm.department,
              this.ruleForm.professionalTitle,
              this.ruleForm.yearsOfWorking,
              this.ruleForm.citizenIdCardNumber,
              this.ruleForm.citizenIdCardFront,
              this.ruleForm.citizenIdCardBack,
              this.ruleForm.physicianPracticeLicense,
              this.ruleForm.bankCard,
              this.ruleForm.alipay,
              this.ruleForm.bank
            )
            .then(res => {
              if (res.code == 200) {
                this.$router.push({ path: "/" });
                this.$toaster.ok("申请成功，请等待审核结果");
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
  }
};
</script>

<style lang="less">
.applicaprojecta-main {
  padding-top: 20px;
  background: white;
  .image-rule {
    font-size: 12px;
  }
}
</style>
