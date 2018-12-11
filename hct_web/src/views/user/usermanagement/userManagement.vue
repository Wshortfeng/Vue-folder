<template>
  <div class="container  content-padding">
    <div class="container-main">
      <div class="search-box">
        <div class="search-item">
          <span>用户名：</span>
          <el-input v-model="username" placeholder="请输入用户名" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'username')"></el-input>
        </div>
        <div class="search-item">
          <span>职员状态：</span>
          <el-select v-model="isStaff" filterable placeholder="请选择职员状态" class="mg_right1 min_width" maxlength="50">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="2"></el-option>
          </el-select>
        </div>
        <!-- <div class="search-item">
          <span>用户状态：</span>
          <el-select v-model="isSuperuser" filterable placeholder="请选择用户类型" class="mg_right1 min_width" maxlength="50">
            <el-option label="全部" value=""></el-option>
            <el-option label="超级用户" value="1"></el-option>
            <el-option label="普通用户" value="2"></el-option>
          </el-select>
        </div> -->
        <div class="search-item">
          <span>有效状态：</span>
          <el-select v-model="isActive" filterable placeholder="请选择有效状态" class="mg_right1 min_width" maxlength="50">
            <el-option label="全部" value=""></el-option>
            <el-option label="有效" value="1"></el-option>
            <el-option label="无效" value="2"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span>组&#X3000;名：</span>
          <el-select v-model="groupId" filterable placeholder="请选择组" class="mg_right1 min_width min_width1" maxlength="50">
            <el-option label="全部" value=""></el-option>
            <el-option :label="item.name" :value="item.id" v-for="(item,index) in groupList" :key="index">
              <el-popover trigger="hover" placement="top-start" :content="item.name" v-if="item.name.length>12">
                <p slot="reference"><span class="min_width_select min_width1_select">{{ item.name }}</span></p>
              </el-popover>
              <span class="min_width_select min_width1_select" v-else>{{ item.name }}</span>
            </el-option>
          </el-select>
        </div>
        <div class="search-item mg_right1">
          <el-button type="primary" @click="serchKey()">搜索</el-button>
        </div>
        <div class="search-item">
          <el-button type="primary" @click="show('addeditbox',0)" v-if="isAdmin||permission.indexOf('permission4_1_2')>-1">新增</el-button>
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
          <el-table-column label="电子邮箱">
            <template slot-scope="scope">
              <p>{{scope.row.email}}</p>
            </template>
          </el-table-column>
          <el-table-column label="名字">
            <template slot-scope="scope">
              <p>{{scope.row.lastName}}</p>
            </template>
          </el-table-column>
          <el-table-column label="姓氏">
            <template slot-scope="scope">
              <p>{{scope.row.firstName}}</p>
            </template>
          </el-table-column>
          <el-table-column label="职员状态">
            <template slot-scope="scope">
              <p>{{scope.row.isStaff|isStaffFormat}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="operation(scope.row.id,'edit')" v-if="isAdmin||permission.indexOf('permission4_1_3')>-1">修改</el-button>
              <el-button size="mini" type="danger" @click="operation(scope.row.id,'del')" v-if="isAdmin||permission.indexOf('permission4_1_4')>-1">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 新增修改用户 -->
    <el-dialog :visible.sync="showaddeditbox" :title="showaddeditboxtitle" width="550px" class="addeditbox" center style="padding:15px 20px;" @close="close('addeditbox')">
      <el-form ref="addeditbox" :model="addeditbox" class="demo-form-inline" :rules="addeditboxRules" label-width="130px">
        <el-form-item prop="username" label="用户名：" v-if="ruleFormType==0">
          <el-input v-model="addeditbox.username" placeholder="请输入用户名" maxlength="10" @change="filteremojifun($event,'username','addeditbox')"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码：">
          <el-input v-model="addeditbox.password" placeholder="请输入密码" maxlength="20" type="password" @change="filteremojifun($event,'password','addeditbox')"></el-input>
        </el-form-item>
        <el-form-item prop="confirmpassword" label="确认密码：">
          <el-input v-model="addeditbox.confirmpassword" placeholder="请输入确认密码" maxlength="20" type="password" @change="filteremojifun($event,'confirmpassword','addeditbox')"></el-input>
        </el-form-item>
				<el-form-item prop="groupIds" label="用户组：" >
					<el-select v-model="addeditbox.groupIds" filterable placeholder="请选择用户组" class="mg_right1 " maxlength="50" >
						<el-option :label="item.name" :value="item.id.toString()" v-for="(item,index) in groupList" :key="index">
							<el-popover trigger="hover" placement="top-start" :content="item.name" v-if="item.name.length>20">
								<p slot="reference"><span class="min_width_select min_width2_select">{{ item.name }}</span></p>
							</el-popover>
							<span class="min_width_select min_width2_select" v-else>{{ item.name }}</span>
						</el-option>
					</el-select>
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
  name: "userManagement",
  data() {
     var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.addeditbox.password) {
        callback(new Error("两次密码输入不一致"));
      } else {
        callback();
      }
    };
    return {
      isloading: true,
      username: "",
      isStaff: "",
      isSuperuser: "",
      isActive: "",
      groupId: "",
      groupList: [],
      currentPage: 1, //初始页
      pagesize: 11, //    每页的数据
      total: 0, //总数
      tableData: [],
      password: "",
      showaddeditbox: false,
      showaddeditboxtitle: "新增用户",
      addeditbox: {
        username: "",
        password: "",
        confirmpassword:'',
				groupIds:''
      },
      addeditboxRules: {
        username: [
          {required:true,message: "请输入用户名", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        password: [
           {required:true,message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
          confirmpassword: [
          { required:true, validator: validatePass, trigger: "blur" }
        ],
				groupIds: [
					{ required: true, message: "请选择用户组", trigger: "change" }
				],
      },
      ruleFormType: 0,
      ruleFormId: ""
    };
  },
  watch: {
    isStaff() {
      this.serchKey();
    },
    isSuperuser() {
      this.serchKey();
    },
    isActive() {
      this.serchKey();
    },
    groupId() {
      this.serchKey();
    }
  },
  created() {
		this.permission = this.$utils.getSession('PERMISSION');
		if (this.$utils.getSession("PERMISSION")) {
			var permissionArr = this.$utils.getSession("PERMISSION").split(",");
			for (var i = 0; i < permissionArr.length; i++) {
				this[permissionArr[i]] = true;
			}
		} else {
			this.isAdmin = true;
		}
    this.getAuthGroups();
  },
  mounted() {
    this.getAuthUserList();
  },
  methods: {
    filteremojifun(e, name, ruleForm) {
      this.$utils.filteremojifun(this, e, name, ruleForm);
    },
    getAuthGroups() {
      //获取组列表
      this.$api.user.getAuthGroups().then(res => {
        if (res.code == 200) {
          this.groupList = res.data;
        }
      });
    },
    serchKey() {
      this.currentPage = 1;
      this.getAuthUserList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getAuthUserList();
    },
    getAuthUserList() {
      //获取用户列表
      this.isloading = true;
      this.$api.user
        .getAuthUserList(
          this.currentPage,
          this.pagesize,
          this.username,
          this.isStaff,
          // this.isSuperuser,
          this.isActive,
          this.groupId
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getAuthUserList();
          } else {
            this.total = res.pageInfo.total;
            this.tableData = res.data;
          }
          this.isloading = false;
        });
    },
    operation(id, type) {
      if (type == "edit") {
        // this.getUser(id);
        this.show("addeditbox", 1, id);
      } else if (type == "del") {
        this.$confirm("是否确定删除该用户？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(res => {
          this.$api.user.delfun("pc/authUser/deleteAuthUser", id).then(res => {
            if (res.code == 200) {
              this.getAuthUserList();
              this.$toaster.ok("删除成功");
            } else {
              this.$toaster.error(res.msg);
            }
          });
        });
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
      this.ruleFormType = ruleFormType;
      this.ruleFormId = ruleFormId;
      if (ruleFormType == 0) {
      this["show" + ruleForm] = true;
        this.showaddeditboxtitle = "新增用户";
      } else {
        // this.showaddeditboxtitle = "修改用户";
        this.$router.push({
          name:'UserInfo',
          params:{
            userId:ruleFormId
          }
        })
      }
    },
    close(ruleForm) {
      //关闭弹框
      this.$refs[ruleForm].resetFields();
      this["show" + ruleForm] = false;
      this.addeditbox.userType = "";
      this.addeditbox.username = "";
    },
    confirm(ruleForm) {
      if (this.ruleFormType == 0) {
        //新增
        this.$refs[ruleForm].validate(valid => {
          if (valid) {
            var addeditbox = this.addeditbox;
            this.$api.user
              .addAuthUser(
                addeditbox.username,
                this.$utils.calcuMD5(addeditbox.password),
								addeditbox.groupIds
              )
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.getAuthUserList();
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
        //修改
        this.$refs[ruleForm].validate(valid => {
          var addeditbox = this.addeditbox;
          var password;
          if (addeditbox.password == this.password) {
            password = addeditbox.password;
          } else {
            password = this.$utils.calcuMD5(addeditbox.password);
          }
          if (valid) {
            this.$api.user
              .updateUser(
                this.ruleFormId,
                password,
                addeditbox.phone,
                addeditbox.email
              )
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.getAuthUserList();
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
  },
	beforeRouteLeave(to, from, next) { //离开页面时
		// console.log(to.name)
		// console.log(from.name)
// 		if (to.name === 'UserInfo') {
// 			from.meta.keepAlive = true;
// 		} else {
// 			from.meta.keepAlive = false;
// 		}
		next() //执行
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
