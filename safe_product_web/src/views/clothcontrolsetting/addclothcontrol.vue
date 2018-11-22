<template>
  <div class="container  content-padding">
    <div class="container-header">
      <div class="container-header-content">
        <span class="back-box" @click="goTo('ClothControlSetting')">
          <a href="javascript:;">
            <i class="el-icon-safetyproduction-fanhui"></i>
            <span>返回</span>
          </a>
        </span>
        <span class="conten-title">
          添加布控
        </span>
      </div>
    </div>
    <div class="container-main">
      <div class="container-content tablecontent">
        <div class="tabelForm tabelForm1" style="width:800px;">
          <el-form ref="ruleForm" :model="ruleForm" class="demo-form-inline" :rules="ruleFormRules" label-width="110px">
            <el-form-item prop="controlObject" label="布控对象：">
              <el-input v-model="ruleForm.controlObject" placeholder="请输入布控对象" maxlength="50" class="min_input" @change="filteremojifun($event,'ruleForm','controlObject')"></el-input>
            </el-form-item>
            <el-form-item prop="controlTime" label="布控时间：">
              <el-date-picker class="min_input" v-model="ruleForm.controlTime" type="datetimerange" align="right" start-placeholder="开始时间" end-placeholder="结束时间" :picker-options="pickerOptions" :default-time="['00:00:00', '23:59:590']">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="controlType" label="布控类型：">
              <el-select v-model="ruleForm.controlType" multiple placeholder="请选择布控类型" style="width:505px !important;" @change="changeTag">
                <el-option label="越界检测" value="1"></el-option>
                <el-option label="工服检测" value="2"></el-option>
                <el-option label="防护检测" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="alarmTempId" label="告警模板：">
              <el-button type="primary" style="margin-left:5px;" size="mini" @click="showselct()">请选择告警模板</el-button>
            </el-form-item>

          </el-form>
          <div class="confirm-box">
            <el-button type="primary" @click="confirm('ruleForm')" style="margin-right:60px;">确 定</el-button>
            <el-button @click="close('ruleForm')">取 消</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="showselebox" @close="closePlay" class="noheader-box" width="850px">
      <div class="tablebox">
        <ul class="tablenbox-nav">
          <li v-for="(item,index) in ruleForm.controlType" :key="index" :class="{checkColor:item==selectItem}" @click="selectNav(item)">{{item|alarmTypeFormat}}<i class="el-icon-safetyproduction-arrow-right-copy-copy-copy"></i></li>
        </ul>
        <div class="tablebox-content">
          <el-table :data="alarmTemplateData" border :header-cell-style="{background:'#F6F6F6'}" v-if="selectItem">
            <el-table-column label="选择" width="60">
              <template slot-scope="scope">
                <el-checkbox label="" @change="changecheckbox(scope.row)" v-model="alarmTemplateData[scope.$index].checked"></el-checkbox>
              </template>
            </el-table-column>
            <el-table-column label="告警图标">
              <template slot-scope="scope">
                <p>
                  <img src="../../assets/img/warn1.png" v-if="scope.row.alarmColor==1">
                  <img src="../../assets/img/warn2.png" v-if="scope.row.alarmColor==2">
                  <img src="../../assets/img/warn3.png" v-if="scope.row.alarmColor==3">
                </p>
              </template>
            </el-table-column>
            <el-table-column label="告警类型">
              <template slot-scope="scope">
                <p>{{scope.row.alarmType|alarmTypeFormat}}</p>
              </template>
            </el-table-column>
            <el-table-column label="优先级" width="70">
              <template slot-scope="scope">
                <p>{{scope.row.priority|priorityFormat}}</p>
              </template>
            </el-table-column>
            <el-table-column label="告警文字">
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top-start" :content="scope.row.alarmText">
                  <p slot="reference">{{scope.row.alarmText}}</p>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="同类报警间隔">
              <template slot-scope="scope">
                <p>{{scope.row.difIntreval}}ms</p>
              </template>
            </el-table-column>
            <el-table-column label="异类报警间隔">
              <template slot-scope="scope">
                <p>{{scope.row.similarInterval}}ms</p>
              </template>
            </el-table-column>
            <el-table-column label="发送人">
              <template slot-scope="scope">
                <p>{{scope.row.sendUser}}</p>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="clear"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "addclothcontrol",
  data() {
    return {
      isloading: true,
      selectItem: "",
      showselebox: false,
      ruleForm: {
        controlObject: "",
        controlTime: "",
        controlType: "",
        alarmTempId: ""
      },
      ruleFormRules: {
        controlObject: [
          { required: true, message: "请输入布控对象", trigger: "blur" }
        ],
        controlTime: [
          { required: true, message: "请选择或输入布控时间", trigger: "change" }
        ],
        controlType: [
          { required: true, message: "请选择布控类型", trigger: "change" }
        ],
        alarmTempId: [
          { required: true, message: "请选择告警模板", trigger: "change" }
        ]
      },
      alarmTempIds: [],
      controlTypes: [],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      alarmTemplateData: [],
      type: ""
    };
  },
  mounted() {
    this.close("ruleForm");
  },
  methods: {
     filteremojifun(e,ruleForm,name){//限制输入表情
      this[ruleForm][name] = this.$utils.filteremoji(e);
    },
    goTo(name) {
      //跳转
      this.$router.push({
        name: name
      });
    },
    showselct() {
      //显示选择告警模板
      if (this.ruleForm.controlType.length > 0) {
        this.getAlarmTemplateByType();
        this.showselebox = true;
      } else {
        this.$toaster.error("请先选择布控类型");
      }
    },
    getAlarmTempId() {//获取变化后的模板ID
      var arr = [];
      for (var j = 0; j < this.alarmTempIds.length; j++) {
        arr = arr.concat(this.alarmTempIds[j]);
      }
      this.ruleForm.alarmTempId = arr.join(",");
    },
    closePlay() {//关闭弹框
      this.showselebox = false;
      this.alarmTemplateData = [];
     this.getAlarmTempId();
    },
    changeTag(e) {
      //选择告警类型
      var arr = this.alarmTempIds;
      for (var i = 0; i < 3 - this.alarmTempIds.length; i++) {
        arr.push([]);
      }
      this.alarmTempIds = arr;
      for (var j = 0; j < this.controlTypes.length; j++) {//删除
        if (e.indexOf(this.controlTypes[j]) > -1) {
        } else {
          this.alarmTempIds.splice(j, 1);
        }
      }
      this.controlTypes = e;
      if (e.length > 0) {//默认选中第一个
        this.selectItem = this.controlTypes[0];
        this.type = this.controlTypes[0];
      } else {
        this.selectItem = "";
        this.type = "";
      }
       this.getAlarmTempId();
    },
    getAlarmTemplateByType() {
      //获取告警模板
      if (this.type) {
        this.$api.clothcontrolsetup
          .getAlarmTemplateByType(this.type)
          .then(res => {
            if (res.code == 200) {
              this.alarmTemplateData = res.data;
              if (this.alarmTemplateData.length > 0) {
                if (this.controlTypes.indexOf(this.type) > -1) {
                  var index = this.controlTypes.indexOf(this.type);
                  for (var i = 0; i < this.alarmTemplateData.length; i++) {
                    if (
                      this.alarmTempIds[index].indexOf(
                        this.alarmTemplateData[i].id
                      ) > -1
                    ) {
                      this.alarmTemplateData[i].checked = true;
                    } else {
                      this.alarmTemplateData[i].checked = false;
                    }
                  }
                }
              }
            }
          });
      }
    },
    selectNav(item) {
      //选择告警类型搜索
      this.selectItem = item;
      this.type = item;
      this.getAlarmTemplateByType();
    },
    changecheckbox(data) {
      //选择告警模板
      var id = data.id;
      if (this.controlTypes.indexOf(this.type) > -1) {
        var index = this.controlTypes.indexOf(this.type);
        if (this.alarmTempIds[index].indexOf(data.id) > -1) {
          var indexc = this.alarmTempIds[index].indexOf(data.id);
          this.alarmTempIds[index].splice(indexc, 1);
        } else {
          this.alarmTempIds[index].push(id);
        }
      } else {
        this.controlTypes.push(this.type);
        var index = this.controlTypes.indexOf(this.type);
        if (this.alarmTempIds[index].indexOf(data.id) > -1) {
          var indexc = this.alarmTempIds[index].indexOf(data.id);
          this.alarmTempIds[index].splice(indexc, 1);
        } else {
          this.alarmTempIds[index].push(id);
        }
      }
      this.getAlarmTemplateByType();
    },
    confirm(ruleForm) {
      //确定
      if (
        this.ruleForm.controlTime == undefined ||
        this.ruleForm.controlTime == null
      ) {
        var controlStartDate = "";
        var controlEndDate = "";
        this.$toaster.err("请先选择布控时间");
        return;
      } else {
        var controlStartDate = this.$utils.zhDatetime(
          this.ruleForm.controlTime[0]
        );
        var controlEndDate = this.$utils.zhDatetime(
          this.ruleForm.controlTime[1]
        );
      }

      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          var ruleForm = this.ruleForm;
          this.$api.clothcontrolsetup
            .addControl(
              this.$route.query.DEVICE_ID,
              ruleForm.controlObject,
              controlStartDate,
              controlEndDate,
              ruleForm.controlType.join(","),
              ruleForm.alarmTempId
            )
            .then(res => {
              if (res.code == 200) {
                this.$toaster.ok(res.msg);
                this.goTo("ClothControlSetting");
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
    },
    close(ruleForm) {
      this.$refs[ruleForm].resetFields();
      this.controlTypes = [];
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "src/styles/index.scss";
.noheader-box {
  .el-dialog__header {
    padding: 0;
  }
  .el-dialog__headerbtn {
    display: none;
  }
  .tablebox {
    border: 1px solid #ebeef5;
    .tablenbox-nav {
      float: left;
      width: 108px;
      padding: 10px 0 10px 20px;
      li {
        line-height: 170%;
        font-size: $fontSize1;
        cursor: pointer;
        i {
          margin-left: 5px;
        }
      }
      li.checkColor {
        color: $background2;
      }
    }
    .tablebox-content {
      float: right;
      width: 700px;
    }
    table {
      th,
      td {
        text-align: center;
        .cell {
          white-space: nowrap;
          width: 100%;
          /* IE6 需要定义宽度 */
          overflow: hidden;
          p {
            white-space: nowrap;
            width: 100%;
            /* IE6 需要定义宽度 */
            overflow: hidden;
            text-overflow: ellipsis;
          }
          img {
            height: 23px;
            width: 23px;
          }
        }
      }
      td {
        padding: 0;
      }
    }
  }
}
</style>
