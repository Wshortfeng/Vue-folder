<template>
  <div class="container  content-padding">
    <div class="container-header">
      <div class="container-header-content">
        <span class="back-box" @click="goTo('AddCamera','2')">
          <a href="javascript:;">
            <i class="el-icon-safetyproduction-fanhui"></i>
            <span>返回</span>
          </a>
        </span>
        <span class="conten-title">
          {{title}}
        </span>
      </div>
    </div>
    <div class="container-main">
      <div class="search-box">
        <div class="search-item">
          <transition name="fade" mode="out-in">
            <el-radio-group v-if="type==2" v-model="type">
              <el-radio-button class="grayColor" label="1" @click.native="goTo('AddCamera','1')"><i class="el-icon-safetyproduction-dvr"></i>分组DVR</el-radio-button>|
              <el-radio-button label="2" @click.native="goTo('AddCamera','2')"><i class="el-icon-safetyproduction-vcr"></i>数码摄像机</el-radio-button>
            </el-radio-group>
          </transition>
        </div>
      </div>
      <div class="search-box">
        <div class="search-item">
          <span>频道：</span>
          <el-input v-model.number="ruleForm.channel" placeholder="请输入频道" class="min_input1" maxlength="50" disabled></el-input>
        </div>
      </div>
      <div class="container-content tablecontent ">
        <div class="tabelForm tabelForm2 camerForm" style="width:780px; margin:10px auto;">
          <el-form ref="ruleForm" :model="ruleForm" class="demo-form-inline" :rules="ruleFormRules" label-width="120px">
            <el-form-item prop="deviceName" label="摄像机名称：">
              <el-input v-model="ruleForm.deviceName" placeholder="请输入摄像机名称" maxlength="50" @change="filteremojifun($event,'ruleForm','deviceName')"></el-input>
            </el-form-item>
            <el-form-item prop="address" label="摄像机位置：">
              <el-input v-model="ruleForm.address" placeholder="请输入摄像机位置" maxlength="50" @change="filteremojifun($event,'ruleForm','address')"></el-input>
            </el-form-item>
            <el-form-item prop="protocolType" label="协议类型：">
              <el-input v-model="ruleForm.protocolType" placeholder="请输入协议类型" maxlength="50" @change="filteremojifun($event,'ruleForm','protocolType')"></el-input>
            </el-form-item>
            <el-form-item prop="deviceIp" label="主机（IP）：">
              <el-input v-model="ruleForm.deviceIp" placeholder="请输入主机IP地址" maxlength="50"></el-input>
            </el-form-item>
            <el-form-item prop="username" label="用户名：">
              <el-input v-model="ruleForm.username" placeholder="请输入用户名" maxlength="50" @change="filteremojifun($event,'ruleForm','username')"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="密码：">
              <el-input v-model="ruleForm.password" placeholder="请输入密码" maxlength="50" type="password" @change="filteremojifun($event,'ruleForm','password')"></el-input>
            </el-form-item>
            <div class="min_input_box">
              <el-form-item label="控制协议：" class="min_input_box_title"></el-form-item>
              <el-form-item prop="cotrolType" label="型号：" class="min_el_form_item">
                <el-input v-model="ruleForm.cotrolType" placeholder="请输入控制协议型号" maxlength="50" @change="filteremojifun($event,'ruleForm','cotrolType')"></el-input>
              </el-form-item>
              <el-form-item prop="controlPort" label="端口：" class="min_el_form_item">
                <el-input v-model="ruleForm.controlPort" placeholder="请输入控制协议端口" maxlength="10"></el-input>
              </el-form-item>
            </div>
            <div class="min_input_box">
              <el-form-item label="视频协议：" class="min_input_box_title"></el-form-item>
              <el-form-item prop="videoParam" label="参数：" class="min_el_form_item">
                <el-input v-model="ruleForm.videoParam" placeholder="请输入视频协议参数" maxlength="50" @change="filteremojifun($event,'ruleForm','address')"></el-input>
              </el-form-item>
              <el-form-item prop="videoPort" label="端口：" class="min_el_form_item">
                <el-input v-model="ruleForm.videoPort" placeholder="请输入视频协议端口" maxlength="10"></el-input>
              </el-form-item>
              <el-form-item prop="url1" label="URL1：" class="min_el_form_item">
                <el-input v-model="ruleForm.url1" placeholder="请输入视频协议url1" maxlength="50" @change="filteremojifun($event,'ruleForm','url1')"></el-input>
              </el-form-item>
              <el-form-item prop="url2" label="URL2：" class="min_el_form_item">
                <el-input v-model="ruleForm.url2" placeholder="请输入视频协议url2" maxlength="50" @change="filteremojifun($event,'ruleForm','url2')"></el-input>
              </el-form-item>
            </div>
          </el-form>
          <div class="confirm-box">
            <el-button type="primary" @click="confirm('ruleForm')" style="margin-right:60px;">确 定</el-button>
            <el-button @click="close('ruleForm')">取 消</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addeditdigitalvideocamera",
  data() {
    var isIp = (rule, value, callback) => {
      //IP验证
      if (!value) {
        return new Error("请输入主机IP地址");
      } else {
        if (!this.$utils.isIp(value)) {
          callback(new Error("设备IP格式错误"));
        } else {
          callback();
        }
      }
    };
    var isPort1 = (rule, value, callback) => {
      //端口号验证
      if (!value) {
        return callback(new Error("请输入控制协议端口"));
      } else {
        if (!this.$utils.isPort(value)) {
          return callback(new Error("端口格式错误"));
        } else {
          callback();
        }
      }
    };
    var isPort2 = (rule, value, callback) => {
      //端口号验证
      if (!value) {
        return callback(new Error("请输入视频协议端口"));
      } else {
        if (!this.$utils.isPort(value)) {
          return callback(new Error("端口格式错误"));
        } else {
          callback();
        }
      }
    };
    return {
      isloading: true,
      type: "2",
      edit: false,
      title: "",
      ruleForm: {
        channel: "",
        deviceName: "",
        address: "",
        protocolType: "",
        deviceIp: "",
        username: "",
        password: "",
        cotrolType: "",
        controlPort: "",
        videoParam: "",
        videoPort: "",
        url1: "",
        url2: ""
      },
      ruleFormRules: {
        deviceName: [
          { required: true, message: "请输入摄像机名称", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入摄像机位置", trigger: "blur" }
        ],
        protocolType: [
          { required: true, message: "请输入协议类型", trigger: "blur" }
        ],
        deviceIp: [{ required: true, validator: isIp, trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        cotrolType: [
          { required: true, message: "请输入控制协议型号", trigger: "blur" }
        ],
        controlPort: [
          {
            required: true,
            validator: isPort1,
            trigger: "blur"
          }
        ],
        videoParam: [
          { required: true, message: "请输入视频协议参数", trigger: "blur" }
        ],
        videoPort: [
          {
            required: true,
            validator: isPort2,
            trigger: "blur"
          }
        ],
        url1: [
          { required: true, message: "请输入视频协议URL1", trigger: "blur" }
        ],
        url2: [
          { required: true, message: "请输入视频协议URL2", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  mounted() {
    this.edit = this.$route.query.EDIT;
    if (this.edit&&this.edit!='false') {
      this.title = "编辑数码摄像机";
      this.getDVCameraInfo();
    } else {
      this.title = "新增数码摄像机";
      this.getAddChannel();
    }
  },
  methods: {
     filteremojifun(e,ruleForm,name){//限制输入表情
      this[ruleForm][name] = this.$utils.filteremoji(e);
    },
    goTo(name, type) {
      //跳转
      this.$router.push({
        name: name,
        query: {
          TYPE: type
        }
      });
    },
    getAddChannel() {
      //获取新增时的频道
      this.$api.camerasetup.getAddChannel().then(res => {
        if (res.code == 200) {
          this.ruleForm.channel = res.data;
        }
      });
    },
    getDVCameraInfo() {
      //获取摄像机详情
      this.$api.camerasetup
        .getDVCameraInfo(this.$route.query.DEVICE_ID)
        .then(res => {
          if (res.code == 200) {
            this.close("ruleForm");
            this.ruleForm = res.data;
          }
        });
    },
    confirm(ruleForm) {
      if (this.edit) {
        //编辑数码摄像机
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var ruleForm = this.ruleForm;
            this.$api.camerasetup
              .updateDvCamera(
                this.$route.query.DEVICE_ID,
                ruleForm.channel,
                ruleForm.deviceName,
                ruleForm.address,
                ruleForm.protocolType,
                ruleForm.deviceIp,
                ruleForm.username,
                ruleForm.password,
                ruleForm.cotrolType,
                ruleForm.controlPort,
                ruleForm.videoPort,
                ruleForm.videoParam,
                ruleForm.url1,
                ruleForm.url2
              )
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.goTo("AddCamera", "2");
                } else {
                  this.$toaster.error(res.msg);
                }
              })
              .catch(() => {});
          } else {
            // this.$toaster.error("请确认验证项格式");
            return false;
          }
        });
      } else {
        //新增数码摄像机
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var ruleForm = this.ruleForm;
            this.$api.camerasetup
              .addDVCamera(
                ruleForm.channel,
                ruleForm.deviceName,
                ruleForm.address,
                ruleForm.protocolType,
                ruleForm.deviceIp,
                ruleForm.username,
                ruleForm.password,
                ruleForm.cotrolType,
                ruleForm.controlPort,
                ruleForm.videoPort,
                ruleForm.videoParam,
                ruleForm.url1,
                ruleForm.url2
              )
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.goTo("AddCamera", "2");
                } else {
                  this.$toaster.error(res.msg);
                }
              })
              .catch(() => {});
          } else {
            // this.$toaster.error("请确认验证项格式");
            return false;
          }
        });
      }
    },
    close(ruleForm) {
      this.$refs[ruleForm].resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
