<template>
  <div id="applicaprojecta ">
    <user-nav />
    <div class="applicaprojecta-main" v-loading="isloading">
      <div class="applicaproject-content ">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <p>
            申请成为项目方信息表
            <span class="redColor">*</span>为必填项
          </p>
          <b class="applicaproject-title">基本信息</b>
          <ul class="apppro-con-ul">
            <li>
              <el-form-item label="单位名称：" prop="company">
                <el-input v-model="ruleForm.company" placeholder="请输入单位名称" maxlength="50"  @change="filteremojifun($event,'ruleForm','company')"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="单位地址：" prop="address">
                <el-input v-model="ruleForm.address" placeholder="请输入单位地址" maxlength="50" @change="filteremojifun($event,'ruleForm','address')"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="统一社会信用证号：" prop="unifiedSocialCreditCode">
                <el-input v-model="ruleForm.unifiedSocialCreditCode" placeholder="请输入统一社会信用证号" maxlength="18"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="单位网址：">
                <el-input v-model="ruleForm.website" placeholder="请输入单位网址" maxlength="50" @change="filteremojifun($event,'ruleForm','website')"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="单位电话（座机）：" prop="companyPhone">
                <el-input v-model="ruleForm.companyPhone" placeholder="请输入单位电话" maxlength="12"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="单位联系人：" prop="contact">
                <el-input v-model="ruleForm.contact" placeholder="请输入单位联系人" maxlength="10" @change="filteremojifun($event,'ruleForm','contact')"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="单位联系人电话：" prop="contactTel">
                <el-input v-model="ruleForm.contactTel" placeholder="请输入单位联系人电话" maxlength="11"></el-input>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="单位联系人邮箱：" prop="contactEmail">
                <el-input v-model="ruleForm.contactEmail" placeholder="请输入单位联系人邮箱" maxlength="50"></el-input>
              </el-form-item>
            </li>
          </ul>
          <b class="applicaproject-title">营业执照照片</b>
          <ul class="apppro-con-ul">
            <li>
              <span class="apppro-con-ul-leftspan fl">
                <span class="apppro-con-ul-xing">*</span>单位营业执照：
              </span>
              <div class="apppro-con-ul-rightdiv">
                <el-upload class="avatar-uploader certificate" :data="{token:token}" :action="$serverUrl+'pc/file/fileUpload'" name="fileName" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-progress="avatarprogress" :on-error="avatarerror">
                  <img v-if="ruleForm.businessLicense" :src="ruleForm.imageUrl" style="max-width:450px;max-height:300px;">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span class="image-rule">请上传不大于1M的jpg、png图片</span>
                <span style="color: green;" v-if="imagestate==1">图片上传中...</span>
                <span style="color: green;" v-if="imagestate==2">图片上传成功</span>
                <span style="color: #f56c6c;" v-if="imagestate==3">图片上传失败</span>
                <span v-if="pleaseupimage==1" style="color: #f56c6c;display: block;clear: both;">请上传图片</span>
              </div>
            </li>
          </ul>
          <b class="applicaproject-title">财务信息</b>
          <ul class="apppro-con-ul">
            <li>
              <el-form-item label="对公的银行账号：" prop="bankCard">
                <el-input v-model="ruleForm.bankCard" placeholder="请输入对公的银行账号" maxlength="19"></el-input>
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
  name: "Applicaproject",
  components: {
    userNav,
    footerBottom
  },
  data() {
    var isPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入单位联系人电话"));
      }
      if (!this.$utils.telphone(value)) {
        return callback(new Error("单位联系人电话格式错误"));
      } else {
        callback();
      }
    };
    var isEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入单位联系人邮箱"));
      }
      if (!this.$utils.isEmail(value)) {
        return callback(new Error("单位联系人邮箱格式错误"));
      } else {
        callback();
      }
    };
    var credit = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入社会统一信用证号"));
      }
      if (!this.$utils.credit(value)) {
        return callback(new Error("社会统一信用证号格式错误"));
      } else {
        callback();
      }
    };
    var phonecode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入单位电话"));
      }
      if (!this.$utils.phonecode(value)) {
        return callback(new Error("单位电话格式错误"));
      } else {
        callback();
      }
    };
    var bankaccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入对公的银行账号"));
      }
      if (!this.$utils.bankaccount(value)) {
        return callback(new Error("银行账号格式错误"));
      } else {
        callback();
      }
    };
    return {
      holturl: this.$serverUrl + "pc/file/fileUpload",
      imagestate: "",
      pleaseupimage: "",
      isloading: false,
      ruleForm: {
        company: "",
        address: "",
        unifiedSocialCreditCode: "",
        website: "",
        businessLicense: "",
        imageUrl: "",
        companyPhone: "",
        contact: "",
        contactTel: "",
        contactEmail: "",
        certificatePractice: "",
        bankCard: "",
        bank: ""
      },
      rules: {
        company: [
          {
            required: true,
            message: "请输入单位名称",
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
        unifiedSocialCreditCode: [
          {
            required: true,
            validator: credit,
            trigger: "blur"
          }
        ],
        companyPhone: [
          {
            required: true,
            validator: phonecode,
            trigger: "blur"
          }
        ],
        contact: [
          {
            required: true,
            message: "请输入单位联系人",
            trigger: "blur"
          }
        ],
        contactTel: [
          {
            required: true,
            validator: isPhone,
            trigger: "blur"
          }
        ],
        contactEmail: [
          {
            required: true,
            validator: isEmail,
            trigger: "blur"
          }
        ],
        certificatePractice: [
          {
            required: true,
            message: "请上传单位营业执照",
            trigger: "blur"
          }
        ],
        bankCard: [
          {
            required: true,
            validator: bankaccount,
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    if (this.status == 4) {
      this.isloading = true;
    }
  },
  computed: {
    ...mapState("user", ["status"]),
    ...mapState("user", ["token"])
  },
  mounted() {
    // 默认执行的函数
    var that = this;
    if (this.status == 4) {
      this.$store.dispatch("user/GetUserInfo").then(res => {
        //获取用户信息
        this.ruleForm = {
          company: res.data.company,
          address: res.data.address,
          unifiedSocialCreditCode: res.data.unifiedSocialCreditCode,
          website: res.data.website,
          businessLicense: res.data.businessLicense,
          imageUrl: res.data.businessLicenseUrl,
          companyPhone: res.data.companyPhone,
          contact: res.data.contact,
          contactTel: res.data.contactTel,
          contactEmail: res.data.contactEmail,
          certificatePractice: res.data.certificatePractice,
          bankCard: res.data.bankCard,
          bank: res.data.bank
        };

      });
      this.$refs["ruleForm"].resetFields();
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
    avatarprogress(event, file, fileList) {
      // 上传图片中
      this.imagestate = "1";
      this.pleaseupimage = "";
    },
    handleAvatarSuccess(res, file) {
      // 上传图片成功
      if(res.code==200){
        this.$toaster.ok("图片上传成功");
      this.ruleForm.imageUrl = res.data.fileConnect;
      this.ruleForm.businessLicense = res.data.fileName;
      this.imagestate = "2";
      this.pleaseupimage = "";
     }else{
        this.$toaster.error(res.msg);
     }
    },
    avatarerror(err, file, fileList) {
      // 上传图片失败
      this.imagestate = "3";
      this.pleaseupimage = "";
    },
    submitForm(formName) {
      // 提交项目方资料申请
      this.$refs[formName].validate(valid => {
        if (this.ruleForm.businessLicense == "") {
          this.pleaseupimage = 1;
          return false;
        }
        if (valid) {
          this.$api.user
            .applyProjectAccount(
              this.ruleForm.company,
              this.ruleForm.address,
              this.ruleForm.unifiedSocialCreditCode,
              this.ruleForm.website,
              this.ruleForm.companyPhone,
              this.ruleForm.contact,
              this.ruleForm.contactTel,
              this.ruleForm.contactEmail,
              this.ruleForm.businessLicense,
              this.ruleForm.bankCard,
              this.bank
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

<style lang="less" >
.applicaprojecta-main {
  padding-top: 20px;
  background: white;
}
</style>
