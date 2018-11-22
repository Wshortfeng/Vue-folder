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
           添加管理员
        </span>
      </div>
    </div>
    <div class="container-main">
      <div class="search-box">
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
          <el-table-column label="用户名">
            <template slot-scope="scope">
              <p>{{scope.row.username}}</p>
            </template>
          </el-table-column>
          <el-table-column label="用户角色">
            <template slot-scope="scope">
              <p>{{scope.row.userType|userTypeFormat}}</p>
            </template>
          </el-table-column>
          <el-table-column label="手机号码">
            <template slot-scope="scope">
              <p>{{scope.row.phone}}</p>
            </template>
          </el-table-column>
          <el-table-column label="电子邮箱">
            <template slot-scope="scope">
              <p>{{scope.row.email}}</p>
            </template>
          </el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              <p>{{scope.row.createDate|zhDatetime}}</p>
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
      <el-form ref="addeditbox" :model="addeditbox" class="demo-form-inline" :rules="addeditboxRules" label-width="110px">
        <el-form-item prop="username" label="用户名：" v-if="ruleFormType==0">
          <el-input v-model="addeditbox.username" placeholder="请输入用户名" maxlength="10" @change="filteremojifun($event,'addeditbox','username')"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="用户密码：">
          <el-input v-model="addeditbox.password" placeholder="请输入用户密码" maxlength="20" type="password"></el-input>
        </el-form-item>
        <el-form-item prop="userType" label="用户角色：" v-if="ruleFormType==0">
          <el-select v-model="addeditbox.userType" filterable placeholder="请选择用户角色">
            <el-option label="超级管理员" value="1"></el-option>
            <el-option label="管理员" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="phone" label="手机号码：">
          <el-input v-model="addeditbox.phone" placeholder="请输入手机号码" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="电子邮箱：">
          <el-input v-model="addeditbox.email" placeholder="请输入电子邮箱" maxlength="50"></el-input>
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
  name: "addadministrator",
  data() {
    var isPhone = (rule, value, callback) => {
      //手机号验证
      if (!value) {
        return callback(new Error("手机号不能为空"));
      }
      if (!this.$utils.isString(value)) {
        return callback(new Error("手机号为11个字符"));
      } else {
        if (!this.$utils.telphone(value)) {
          this.$notify.error({
            duration: "2000",
            title: "错误",
            message: "手机号格式错误"
          });
          return callback(new Error(" "));
        } else {
          callback();
        }
      }
    };
    var isPassword = (rule, value, callback) => {
      //密码验证
      if (!value) {
        return callback(new Error("密码不能为空"));
      }
      if (this.password == value) {
        callback();
      } else {
        if (!this.$utils.isString(value)) {
          return callback(new Error("密码为6~20个字符"));
        } else {
          if (!this.$utils.isPsd(value)) {
            return callback(new Error("密码格式错误"));
          } else {
            callback();
          }
        }
      }
    };
    var isEmail = (rule, value, callback) => {
      //邮箱验证
      if (!value) {
        return callback(new Error("请输入电子邮箱"));
      }
      if (!this.$utils.isEmail(value)) {
        return callback(new Error("电子邮箱格式错误"));
      } else {
        callback();
      }
    };
    return {
      isloading: true,
      type: "",
      currentPage: 1, //初始页
      pagesize: 9, //    每页的数据
      total: 0, //总数
      tableData: [],
      password: "",
      showaddeditbox: false,
      showaddeditboxtitle: "新增管理员",
      addeditbox: {
        username: "",
        password: "",
        userType: "",
        phone: "",
        email: ""
      },
      addeditboxRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            validator: isPassword,
            trigger: "blur"
          }
        ],
        userType: [
          { required: true, message: "请选择用户角色", trigger: "change" }
        ],
        phone: [
          {
            required: true,
            validator: isPhone,
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            validator: isEmail,
            trigger: "blur"
          }
        ]
      },
      ruleFormType: 0,
      ruleFormId: ""
    };
  },
  created() {},
  mounted() {
    this.getUserList();
  },
  methods: {
     filteremojifun(e,ruleForm,name){//限制输入表情
      this[ruleForm][name] = this.$utils.filteremoji(e);
    },
    serchKey() {
      this.currentPage = 1;
      this.getUserList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getUserList();
    },
    getUserList() {
      this.isloading = true;
      this.$api.user.getUserList(this.currentPage, this.pagesize).then(res => {
        if (this.currentPage != 1 && res.data.length == 0) {
          this.currentPage = this.currentPage - 1;
          this.getUserList();
        } else {
          this.total = res.pageInfo.total;
          this.tableData = res.data;
        }
        this.isloading = false;
      });
    },
    operation(id, type) {
      if (type == "edit") {
        this.getUser(id);
        this.show("addeditbox", 1, id);
      } else if (type == "del") {
        this.$confirm("是否确定删除该管理员？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(res => {
            this.$api.user.delfun('sysUser/deleteUser',id).then(res => {
              if (res.code == 200) {
                this.getUserList();
                this.$toaster.ok("删除成功");
              } else {
                this.$toaster.error(res.msg);
              }
            });
          })
      }
    },
    getUser(id) {
      //获取用户信息
      this.$api.user.getUser(id).then(res => {
        if (res.code == 200) {
          this.password = res.data.password;
          this.addeditbox = res.data;
        }
      });
    },
    show(ruleForm, ruleFormType, ruleFormId) {
      //开启弹框
      this["show" + ruleForm] = true;
      if (ruleFormType == 0) {
        this.showaddeditboxtitle = "新增管理员";
      } else {
        this.showaddeditboxtitle = "编辑管理员";
      }
      this.ruleFormType = ruleFormType;
      this.ruleFormId = ruleFormId;
    },
    close(ruleForm) {
      //关闭弹框
      this.$refs[ruleForm].resetFields();
      this["show" + ruleForm] = false;
      this.addeditbox.userType='';
      this.addeditbox.username="";
    },
    confirm(ruleForm) {
      if (this.ruleFormType == 0) {
        //新增
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var addeditbox = this.addeditbox;
            this.$api.user
              .addUser(
                addeditbox.username,
                this.$utils.calcuMD5(addeditbox.password),
                addeditbox.userType,
                addeditbox.phone,
                addeditbox.email
              )
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.getUserList();
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
          var password;
          if (addeditbox.password == this.password) {
            password = addeditbox.password;
          }else{
             password = this.$utils.calcuMD5(addeditbox.password);
          }
          if (valid) {
            this.$api.user
              .updateUser(this.ruleFormId,password, addeditbox.phone, addeditbox.email)
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.getUserList();
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
