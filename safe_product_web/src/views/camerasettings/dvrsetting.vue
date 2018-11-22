<template>
  <div class="container  content-padding">
    <div class="container-header">
      <div class="container-header-content">
        <!-- <span class="back-box">
          <a href="javascript:;">
            <i class="el-icon-safetyproduction-fanhui"></i>
            <span>返回</span>
          </a>
        </span> -->
        <span class="conten-title">
          DVR设置
        </span>
      </div>
    </div>
    <div class="container-main">
      <div class="search-box">
        <div class="search-item">
          <span>设备IP：</span>
          <el-input v-model="deviceIp" placeholder="请输入设备IP" class="keyword" maxlength="15" @change="filteremojifun1($event,'deviceIp')"></el-input>
          <el-button type="primary" @click="serchKey" class="mg_right1" style="position:relative;right:5px;">搜索</el-button>
        </div>
        <div class="search-item">
          <el-button type="primary" @click="show('addeditbox',0)">新增</el-button>
        </div>
      </div>
      <div class="container-content tablecontent">
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#F6F6F6'}" v-loading="isloading">
          <el-table-column label="序号" width="100px;">
            <template slot-scope="scope">
              <p>{{scope.$index+1+(currentPage-1)*pagesize}}</p>
            </template>
          </el-table-column>
          <el-table-column label="设备IP">
            <template slot-scope="scope">
              <p>{{scope.row.deviceIp}}</p>
            </template>
          </el-table-column>
          <el-table-column label="端口号">
            <template slot-scope="scope">
              <p>{{scope.row.dvrPort}}</p>
            </template>
          </el-table-column>
          <el-table-column label="用户名">
            <template slot-scope="scope">
              <p>{{scope.row.userName}}</p>
            </template>
          </el-table-column>
          <el-table-column label="密码">
            <template slot-scope="scope">
              <p>{{scope.row.password}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="operation(scope.row.id,'edit')">编辑</el-button>
              <el-button size="mini" type="primary" @click="operation(scope.row.id,'del')">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 新增编辑用户 -->
    <el-dialog :visible.sync="showaddeditbox" :title="showaddeditboxtitle" width="550px" class="addeditbox" center style="padding:15px 20px;" @close="close('addeditbox')">
      <el-form ref="addeditbox" :model="addeditbox" class="demo-form-inline" :rules="addeditboxRules" label-width="95px">
        <el-form-item prop="deviceIp" label="设备IP：">
          <el-input v-model="addeditbox.deviceIp" placeholder="请输入设备IP" maxlength="15"></el-input>
        </el-form-item>
        <el-form-item prop="port" label="端口：">
          <el-input v-model.number="addeditbox.port" placeholder="请输入端口" maxlength="10"></el-input>
        </el-form-item>
        <el-form-item prop="userName" label="用户名：">
          <el-input v-model="addeditbox.userName" placeholder="请输入用户名" maxlength="50" @change="filteremojifun($event,'addeditbox','userName')"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码：">
          <el-input v-model="addeditbox.password" placeholder="请输入密码" type="password" maxlength="50"  @change="filteremojifun($event,'addeditbox','password')"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm('addeditbox')">确 定</el-button>
        <el-button @click="close('addeditbox')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "adddvr",
  data() {
    var isIp = (rule, value, callback) => {
      //IP验证
      if (!value) {
        return new Error("请输入设备IP");
      } else {
        if (!this.$utils.isIp(value)) {
          callback(new Error("设备IP格式错误"));
        } else {
          callback();
        }
      }
    };
    var isPort = (rule, value, callback) => {
      //端口号验证
     if (!value) {
          return callback(new Error("请输入端口"));
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
      deviceIp: "", //设备IP
      type: "",
      currentPage: 1, //初始页
      pagesize: 9, //    每页的数据
      total: 0, //总数
      tableData: [],
      port: "",
      showaddeditbox: false,
      showaddeditboxtitle: "新增管理员",
      addeditbox: {
        deviceIp: "",
        port: "",
        userName: "",
        password: ""
      },
      addeditboxRules: {
        deviceIp: [{ required: true, validator: isIp, trigger: "blur" }],
        port: [
          {
            required: true,
            validator: isPort,
            trigger: "blur"
          }
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      ruleFormType: 0,
      ruleFormId: ""
    };
  },
  created() {},
  mounted() {
    this.detDvrList();
  },
  methods: {
      filteremojifun(e,ruleForm,name){//限制输入表情
      this[ruleForm][name] = this.$utils.filteremoji(e);
    },
     filteremojifun1(e,name){//限制输入表情
      this[name] = this.$utils.filteremoji(e);
    },
    serchKey() {
      this.currentPage = 1;
      this.detDvrList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.detDvrList();
    },
    detDvrList() {
      //获取DVR列表
      this.isloading = true;
      this.$api.camerasetup
        .detDvrList(this.currentPage, this.pagesize, this.deviceIp)
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.detDvrList();
          } else {
            this.total = res.pageInfo.total;
            this.tableData = res.data;
          }
          this.isloading = false;
        });
    },
    operation(id, type) {
      //操作
      if (type == "edit") {
        this.getDvrInfo(id);
        this.show("addeditbox", 1, id);
      } else if (type == "del") {
        this.$confirm("是否确定删除该DVR？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(res => {
          this.$api.user.delfun("sysUser/delDvr", id).then(res => {
            if (res.code == 200) {
              this.detDvrList();
              this.$toaster.ok("删除成功");
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
      }
    },
    getDvrInfo(id) {
      //获取DVR信息
      this.$api.camerasetup.getDvrInfo(id).then(res => {
        if (res.code == 200) {
          this.addeditbox.deviceIp = res.data.deviceIp;
          this.addeditbox.port = res.data.dvrPort;
          this.addeditbox.userName = res.data.username;
          this.addeditbox.password = res.data.password;
        }
      });
    },
    show(ruleForm, ruleFormType, ruleFormId) {
      //开启弹框
      this["show" + ruleForm] = true;
      if (ruleFormType == 0) {
        this.showaddeditboxtitle = "新增DVR";
      } else {
        this.showaddeditboxtitle = "编辑DVR";
      }
      this.ruleFormType = ruleFormType;
      this.ruleFormId = ruleFormId;
    },
    close(ruleForm) {
      //关闭弹框
      this.$refs[ruleForm].resetFields();
      this["show" + ruleForm] = false;
    },
    confirm(ruleForm) {
      if (this.ruleFormType == 0) {
        //新增
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var addeditbox = this.addeditbox;
            this.$api.camerasetup
              .addDvr(
                addeditbox.deviceIp,
                addeditbox.port,
                addeditbox.userName,
                addeditbox.password
              )
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.detDvrList();
                  this.close("addeditbox");
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
      } else if (this.ruleFormType == 1) {
        //编辑
        this.$refs[ruleForm].validate(valid => {
          var addeditbox = this.addeditbox;
          if (valid) {
            this.$api.camerasetup
              .updateDvr(
                this.ruleFormId,
                addeditbox.deviceIp,
                addeditbox.port,
                addeditbox.userName,
                addeditbox.password
              )
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.detDvrList();
                  this.close("addeditbox");
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
