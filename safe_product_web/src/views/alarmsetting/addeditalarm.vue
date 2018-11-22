<template>
  <div class="container  content-padding">
    <div class="container-header">
      <div class="container-header-content">
        <span class="back-box" @click="goTo('AlarmSetting','2')">
          <a href="javascript:;">
            <i class="el-icon-safetyproduction-fanhui"></i>
            <span>返回</span>
          </a>
        </span>
        <!-- <span class="conten-title">
          系统日志
        </span> -->
        <div class="header-tap">
          <el-radio-group v-model="type">
            <el-radio-button label="1">报警分屏</el-radio-button>|
            <el-radio-button label="2">告警模板</el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="container-main">
      <div class="search-box">
        <div class="search-item">
          <transition name="fade" mode="out-in">
            <el-radio-group v-if="type==2">
              <el-radio-button class="grayColor" @click.native="goTo('AlarmSetting','2')"><i class="el-icon-safetyproduction-touping"></i>系统告警模板</el-radio-button>|
              <el-radio-button><i class="el-icon-safetyproduction-add"></i>{{title}}</el-radio-button>
            </el-radio-group>
          </transition>
        </div>
      </div>
      <div class="container-content tablecontent">
        <div class="tabelForm" style="width:780px; margin:50px auto;">
          <el-form ref="ruleForm" :model="ruleForm" class="demo-form-inline" :rules="ruleFormRules" label-width="180px">
            <el-form-item prop="alarmType" label="告警类型：">
              <el-select v-model="ruleForm.alarmType" filterable placeholder="请选择告警类型">
                <el-option label="越界检测" value="1"></el-option>
                <el-option label="工服检测" value="2"></el-option>
                <el-option label="防护检测" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="alarmColor" label="图标颜色：">
              <el-select v-model="ruleForm.alarmColor" filterable placeholder="请选择图标颜色">
                <el-option label="红" value="1"></el-option>
                <el-option label="黄" value="2"></el-option>
                <el-option label="绿" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="priority" label="优先级：">
              <el-select v-model="ruleForm.priority" filterable placeholder="请选择优先级">
                <el-option label="普通" value="1"></el-option>
                <el-option label="中等" value="2"></el-option>
                <el-option label="严重" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="alarmText" label="告警文字：">
              <el-input type="textarea" v-model="ruleForm.alarmText" placeholder="请输入告警文字" maxlength="120" class="min_textarea " @change="filteremojifun($event,'ruleForm','alarmText')"></el-input>
            </el-form-item>
            <el-form-item prop="similarInterval" label="同类报警间隔(ms)：">
              <el-autocomplete class="inline-input" v-model="ruleForm.similarInterval" :fetch-suggestions="hairBoxSearch" placeholder="请选择或输入同类报警间隔"   ></el-autocomplete>
            </el-form-item>
            <el-form-item prop="difInterval" label="异类报警间隔(ms)：">
              <el-autocomplete class="inline-input" v-model="ruleForm.difInterval" :fetch-suggestions="hairBoxSearch" placeholder="请选择或输入异类报警间隔"  ></el-autocomplete>
            </el-form-item>
            <el-form-item prop="sendUser" label="发送人：">
              <el-select v-model="ruleForm.sendUser" filterable placeholder="请选择发送人列表">
                <el-option v-for="(item,index) in senderList" :label="item.username" :value="item.id" :key="index"></el-option>
              </el-select>
            </el-form-item>
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
  name: "addeditalarm",
  data() {
    var checkNum1 = (rule, value, callback) => {
      if (!value) {
        return new Error("请选择或输入同类报警间隔");
      } else {
        if (!this.$utils.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
         if(value>9999999){
           callback(new Error("最大值为99999999"));
         }else{
           callback();
         }
        }
      }
    };
    var checkNum2 = (rule, value, callback) => {
      if (!value) {
        return new Error("请选择或输入异类报警间隔");
      } else {
        if (!this.$utils.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
         if(value>9999999){
           callback(new Error("最大值为99999999"));
         }else{
           callback();
         }
        }
      }
    };
    return {
      isloading: true,
      type: "2",
      edit: false,
      title: "",
      ruleForm: {
        alarmType: "",
        alarmColor: "",
        priority: "",
        alarmText: "",
        similarInterval: "",
        difInterval: "",
        sendUser: ""
      },
      ruleFormRules: {
        alarmType: [
          { required: true, message: "请选择告警类型", trigger: "change" }
        ],
        alarmColor: [
          { required: true, message: "请选择图表类型", trigger: "change" }
        ],
        priority: [
          { required: true, message: "请选择优先级", trigger: "change" }
        ],
        alarmText: [
          { required: true, message: "请输入告警文字", trigger: "blur" }
        ],
        similarInterval: [
          { required: true, validator: checkNum1, trigger: "change" }
        ],
        difInterval: [
          { required: true, validator: checkNum2, trigger: "change" }
        ],
        sendUser: [
          { required: true, message: "请选择发送人", trigger: "change" }
        ]
      },
      timeArrs: [
        //时间间隔数组
        { value: '1' },
        { value: '3' },
        { value: '5' },
        { value: '7' },
        { value: '9' },
        { value: '11' },
        { value: '13' },
        { value: '15'},
        { value: '17' },
        { value: '19' },
        { value: '21' }
      ],
      senderList: [] //发送人列表
    };
  },
  created() {},
  mounted() {
    this.edit = this.$route.query.EDIT;
    if (this.edit&&this.edit!='false') {
      this.title = "编辑告警模板";
      this.getAlarmTemplate();
    } else {
      this.title = "新增告警模板";
    }
    this.getSenderList();
  },
  watch: {
    type(value) {
      this.goTo("AlarmSetting", value);
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
    hairBoxSearch(queryString, cb) {
      //弹出时间间隔
      var timeArrs = this.timeArrs;
      var results = queryString
        ? timeArrs.filter(this.createFilter(queryString))
        : timeArrs;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return timeArr => {
        return (
          timeArr.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    getSenderList() {
      //获取发送人列表
      this.$api.alarmsetup.getSenderList().then(res => {
        if (res.code == 200) {
          this.senderList = res.data;
        }
      });
    },
    getAlarmTemplate() {
      //获取告警模板详情
      this.$api.alarmsetup
        .getAlarmTemplate(this.$route.query.WARN_ID)
        .then(res => {
          if (res.code == 200) {
            this.close("ruleForm");
            this.ruleForm.alarmType = res.data.alarmType.toString();
            this.ruleForm.alarmColor = res.data.alarmColor.toString();
            this.ruleForm.priority = res.data.priority.toString();
            this.ruleForm.alarmText = res.data.alarmText.toString();
            this.ruleForm.similarInterval = res.data.similarInterval.toString();
            this.ruleForm.difInterval = res.data.difInterval.toString();
            this.ruleForm.sendUser = res.data.sendUser;
          }
        });
    },
    confirm(ruleForm) {
      if (this.edit) {
        //编辑告警模板
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var ruleForm = this.ruleForm;
            this.$api.alarmsetup
              .updateAlarmTemplate(
                this.$route.query.WARN_ID,
                ruleForm.alarmType,
                ruleForm.alarmColor,
                ruleForm.priority,
                ruleForm.alarmText,
                ruleForm.similarInterval,
                ruleForm.difInterval,
                ruleForm.sendUser
              )
              .then(res => {
                if (res.code == 200) {
                 this.$toaster.ok(res.msg);
                  this.goTo("AlarmSetting", "2");
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
        //新增告警模板
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var ruleForm = this.ruleForm;
            this.$api.alarmsetup
              .addAlarmTemplate(
                ruleForm.alarmType,
                ruleForm.alarmColor,
                ruleForm.priority,
                ruleForm.alarmText,
                ruleForm.similarInterval,
                ruleForm.difInterval,
                ruleForm.sendUser
              )
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.goTo("AlarmSetting", "2");
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
