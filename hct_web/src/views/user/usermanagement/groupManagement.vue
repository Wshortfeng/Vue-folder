<template>
  <div class="container  content-padding">
    <div class="container-main">
      <div class="search-box">
        <div class="search-item">
          <span>组名：</span>
          <el-input v-model="name" placeholder="请输入组名" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'name')"></el-input>
        </div>
        <div class="search-item mg_right1">
           <el-button type="primary" @click="serchKey()" >搜索</el-button>
        </div>
        <div class="search-item">
           <el-button type="primary" @click="show('addeditbox',0)" v-if="isAdmin||permission.indexOf('permission4_2_2')>-1">新增</el-button>
        </div>
      </div>
      <div class="container-content tablecontent">
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#F6F6F6'}" v-loading="isloading">
          <el-table-column label="序号" width="100px;">
            <template slot-scope="scope">
              <p>{{scope.$index+1+(currentPage-1)*pagesize}}</p>
            </template>
          </el-table-column>
          <el-table-column label="组名">
            <template slot-scope="scope">
              <p>{{scope.row.name}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="220px">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="operation(scope.row.id,'edit')" v-if="isAdmin||permission.indexOf('permission4_2_3')>-1">修改</el-button>
              <el-button size="mini" type="danger" @click="operation(scope.row.id,'del')" v-if="isAdmin||permission.indexOf('permission4_2_4')>-1">删除</el-button>
							<el-button size="mini" type="success" @click="operation(scope.row.id,'jurisdiction')" v-if="isAdmin||permission.indexOf('permission4_2_5')>-1">权限</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 新增修改用户 -->
    <el-dialog :visible.sync="showaddeditbox" :title="showaddeditboxtitle" width="550px" class="addeditbox" center style="padding:15px 20px;" @close="close('addeditbox')">
      <el-form ref="addeditbox" :model="addeditbox" class="demo-form-inline" :rules="addeditboxRules" label-width="110px">
        <el-form-item prop="name" label="组名：" >
          <el-input v-model="addeditbox.name" placeholder="请输入组名" maxlength="50" @change="filteremojifun($event,'name','addeditbox')"></el-input>
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
  name: "groupManagement",
  data() {
    return {
      isloading: true,
      name: "",
      currentPage: 1, //初始页
      pagesize: 11, //    每页的数据
      total: 0, //总数
      tableData: [],
      showaddeditbox: false,
      showaddeditboxtitle: "新增组",
      addeditbox: {
        name: "",
      },
      addeditboxRules: {
        name: [
          { required: true, message: "请输入组名", trigger: "blur" }
        ],
      },
      ruleFormType: 0,
      ruleFormId: ""
    };
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
	},
  mounted() {
    this.getAuthGroupList();
  },
  methods: {
    filteremojifun(e, name, ruleForm) {
      this.$utils.filteremojifun(this, e, name, ruleForm);
    },
    serchKey() {
      this.currentPage = 1;
      this.getAuthGroupList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getAuthGroupList();
    },
    getAuthGroupList() {//获取分组列表
      this.isloading = true;
      this.$api.user.getAuthGroupList(this.currentPage, this.pagesize,this.name).then(res => {
        if (this.currentPage != 1 && res.data.length == 0) {
          this.currentPage = this.currentPage - 1;
          this.getAuthGroupList();
        } else {
          this.total = res.pageInfo.total;
          this.tableData = res.data;
        }
        this.isloading = false;
      });
    },
    operation(id, type) {//操作
      if (type == "edit") {
        this.getUser(id);
        this.show("addeditbox", 1, id);
      } else if (type == "del") {
        this.$confirm("是否确定删除该组？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(res => {
            this.$api.user.delfun('pc/authGroup/deleteAuthGroup',id).then(res => {
              if (res.code == 200) {
                this.getAuthGroupList();
                this.$toaster.ok("删除成功");
              } else {
                this.$toaster.error(res.msg);
              }
            });
          })
      }else if(type=='jurisdiction'){
				this.$router.push({
					name:'JurisDiction',
					params:{
						groupId:id
					}
				})
			}
    },
    getUser(id) {
      //获取组详情
      this.$api.user.getAuthGroup(id).then(res => {
        if (res.code == 200) {
          this.addeditbox = res.data;
        }
      });
    },
    show(ruleForm, ruleFormType, ruleFormId) {
      //开启弹框
      this["show" + ruleForm] = true;
      if (ruleFormType == 0) {
        this.showaddeditboxtitle = "新增组";
      } else {
        this.showaddeditboxtitle = "修改组";
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
              .addAuthGroup(
                addeditbox.name,
              )
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.getAuthGroupList();
                  this.close("addeditbox");
                } else {
                  this.$toaster.error(res.msg);
                }
              })
              .catch(() => {});
          } else {
            return false;
          }
        });
      } else if (this.ruleFormType == 1) {
        //修改
        this.$refs[ruleForm].validate(valid => {
          var addeditbox = this.addeditbox;
          if (valid) {
            this.$api.user
              .updateAuthGroup(this.ruleFormId,addeditbox.name)
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.getAuthGroupList();
                  this.close("addeditbox");
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
