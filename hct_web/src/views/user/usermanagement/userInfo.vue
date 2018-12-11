<template>
  <div class="container  content-padding">
    <div class="container-main">
      <div class="container-content tablecontent">
        <div class="tabelForm" style="margin:80px auto;" v-loading="isloading">
          <el-form ref="ruleForm" :model="ruleForm" class="demo-form-inline" label-width="120px" :rules="ruleFormRules" >
            <el-form-item label="姓氏：" prop="firstName">
              <el-input v-model="ruleForm.firstName" @change="filteremojifun($event,'firstName','ruleForm')" maxlength="5" placeholder="请输入姓氏"></el-input>
            </el-form-item>
            <el-form-item label="名字：" prop="lastName">
              <el-input v-model="ruleForm.lastName" @change="filteremojifun($event,'lastName','ruleForm')" maxlength="10" placeholder="请输入名字"></el-input>
            </el-form-item>
            <el-form-item label="用户名：" prop="username">
              <el-input v-model="ruleForm.username" @change="filteremojifun($event,'username','ruleForm')" maxlength="10" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码：" prop="password">
              <el-input v-model="ruleForm.password" @change="filteremojifun($event,'password','ruleForm')" maxlength="10" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
              <el-input v-model="password" style="display:none;"></el-input>
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="ruleForm.email" @change="filteremojifun($event,'email','ruleForm')" maxlength="50" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="是否有效：" prop="isActive">
              <el-radio-group v-model="ruleForm.isActive" >
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="职员状态：" prop="isStaff">
              <el-radio-group v-model="ruleForm.isStaff">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- <el-form-item label="用户类型：" prop="isSuperuser">
              <el-radio-group v-model="ruleForm.isSuperuser">
                <el-radio label="1">超级用户</el-radio>
                <el-radio label="2">普通用户</el-radio>
              </el-radio-group>
            </el-form-item> -->
						<el-form-item prop="groupIds" label="用户组：" >
							<el-select v-model="ruleForm.groupIds" filterable placeholder="请选择用户组" class="mg_right1 " maxlength="50" >
								<el-option :label="item.name" :value="item.id.toString()" v-for="(item,index) in groupList" :key="index">
									<el-popover trigger="hover" placement="top-start" :content="item.name" v-if="item.name.length>35">
										<p slot="reference"><span class="min_width_select">{{ item.name }}</span></p>
									</el-popover>
									<span class="min_width_select" v-else>{{ item.name }}</span>
								</el-option>
							</el-select>
						</el-form-item>
          </el-form>
          <div style="font-size:12px;height:50px;padding-left:50px;">
            <p>最后一次登录时间：{{lastLogin|zhDatetime}}</p>
          </div>
          <div class="confirm-box">
            <el-button type="primary" @click="confirm('ruleForm')" >保 存</el-button>
            <!-- <el-button @click="close('ruleForm')">取 消</el-button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyInfo",
  data() {
    var isPassword = (rule, value, callback) => {
      //密码验证
      if (!value) {
        return callback(new Error("请输入密码"));
      }
      if (value == this.password) {
        callback();
      } else {
        if (value.length < 6 || value.length > 20) {
          return callback(new Error("长度在 6 到 20 个字符"));
        } else {
          callback();
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
      isloading: false,
      password:'',
			groupList:[],
      ruleForm: {
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        email: "",
        isActive: "2",
        isStaff: "2",
        // isSuperuser: "2",
				groupIds:''
      },
      ruleFormRules: {
        firstName: [
          { required: true, message: "请输入姓氏", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5个字符", trigger: "blur" }
        ],
        lastName: [
          { required: true, message: "请输入名字", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min:1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ],
        password: [
          {
            required: true,
            validator: isPassword,
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            validator: isEmail,
            trigger: "blur"
          }
        ],
        isActive: [
          { required: true, message: "请选择是否有效：", trigger: "change" }
        ],
        isStaff: [
          { required: true, message: "请选择职员状态：", trigger: "change" }
        ],
        // isSuperuser: [
        //   { required: true, message: "请选择用户类型：", trigger: "change" }
        // ],
				groupIds: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ],
      }
    };
  },
  created() {},
  mounted() {
		this.getAuthGroups();
		this.getAuthUser();
  },
  watch: {},
  methods: {
    	filteremojifun(e, name, ruleForm) {
        console.log(e)
				this.$utils.filteremojifun(this, e, name, ruleForm);
      },
		getAuthGroups() {
			//获取用户组列表
			this.$api.user.getAuthGroups().then(res => {
				if (res.code == 200) {
					this.groupList = res.data;
				}
			});
		},
    getAuthUser() {
      //获取用户详情
			this.isloading=true;
      this.$api.user.getAuthUser(this.$route.params.userId).then(res => {
        if (res.code == 200) {
          this.ruleForm.firstName = res.data.authUser.firstName;
          this.ruleForm.lastName = res.data.authUser.lastName;
          this.ruleForm.username = res.data.authUser.username;
          this.ruleForm.password = res.data.authUser.password;
          this.password = res.data.authUser.password;
          this.ruleForm.email = res.data.authUser.email;
          this.ruleForm.isActive = res.data.authUser.isActive.toString();
          this.ruleForm.isStaff = res.data.authUser.isStaff.toString();
          // this.ruleForm.isSuperuser = res.data.authUser.isSuperuser.toString();
          this.ruleForm.groupIds = res.data.groupIds==undefined?'':res.data.groupIds.toString();
          this.lastLogin= res.data.authUser.lastLogin;
        }
				this.isloading=false;
      });
    },
    close(ruleForm) {
      this.$refs[ruleForm].resetFields();
    },
    confirm(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          var ruleForm = this.ruleForm;
          if(ruleForm.password== this.password){
            var password=this.password;
          }else{
            var password =this.$utils.calcuMD5(ruleForm.password);
          }
          this.$api.user
            .updateAuthUser(
              this.$route.params.userId,
              ruleForm.firstName,
              ruleForm.lastName,
              ruleForm.username,
              password,
              ruleForm.email,
              ruleForm.isActive,
              ruleForm.isStaff,
              // ruleForm.isSuperuser,
							ruleForm.groupIds
            )
            .then(res => {
              if (res.code == 200) {
                this.$toaster.ok(res.msg);
                this.$router.push({
                  name: "UserManagementList"
                });
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
