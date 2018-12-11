<template>
  <div class="container  content-padding">
    <div class="container-main">
      <div class="search-box">
        <div class="search-item">
          <span>公告内容：</span>
          <el-input v-model="content" placeholder="请输入组名" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'content')"></el-input>
        </div>
        <div class="search-item mg_right1">
          <el-button type="primary" @click="serchKey()">搜索</el-button>
        </div>
        <div class="search-item">
          <el-button type="primary" @click="show('addeditbox',0)" v-if="isAdmin||permission.indexOf('permission5_3_2')>-1">新增</el-button>
        </div>
      </div>
      <div class="container-content tablecontent">
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#F6F6F6'}" v-loading="isloading">
          <el-table-column label="序号" width="100px;">
            <template slot-scope="scope">
              <p>{{scope.$index+1+(currentPage-1)*pagesize}}</p>
            </template>
          </el-table-column>
          <el-table-column label="公告内容">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.content">
                <p slot="reference">{{scope.row.content}}</p>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.createDate|zhDatetime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="修改时间" width="180">
            <template slot-scope="scope">
              <p>{{scope.row.updateDate|zhDatetime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="operation(scope.row.id,'edit')" v-if="isAdmin||permission.indexOf('permission5_3_3')>-1">修改</el-button>
              <el-button size="mini" type="danger" @click="operation(scope.row.id,'del')" v-if="isAdmin||permission.indexOf('permission5_3_4')>-1">删除</el-button>
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
         <el-form-item prop="cityId" label="城市：">
           <el-select v-model="addeditbox.cityId" filterable placeholder="请选择城市" class="mg_right1 " maxlength="50">
            <el-option :label="item.cityName" :value="item.id.toString()" v-for="(item,index) in cityList" :key="index">
             <span >{{ item.cityName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="content" label="公告内容：">
          <el-input v-model="addeditbox.content" type="textarea" placeholder="请输入公告内容" maxlength="100" @change="filteremojifun($event,'name','addeditbox')"></el-input>
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
  name: "announceMentmanagement",
  data() {
    return {
      isloading: true,
      content: "",
      cityList: [],
      currentPage: 1, //初始页
      pagesize: 15, //    每页的数据
      total: 0, //总数
      tableData: [],
      showaddeditbox: false,
      showaddeditboxtitle: "新增公告",
      addeditbox: {
        cityId: "",
        content: ""
      },
      addeditboxRules: {
        cityId: [{ required: true, message: "请选择城市", trigger: "change" }],
        content: [
          { required: true, message: "请输入公告内容", trigger: "blur" }
        ]
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
    this.getCitys();
  },
  mounted() {
    this.getUAnnouncementList();
  },
  methods: {
    filteremojifun(e, name, ruleForm) {
      this.$utils.filteremojifun(this, e, name, ruleForm);
    },
    getCitys() {
      //获取城市列表
      this.$api.systemmanagement.getCitys().then(res => {
        if (res.code == 200) {
          this.cityList = res.data;
        }
      });
    },
    serchKey() {
      this.currentPage = 1;
      this.getUAnnouncementList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getUAnnouncementList();
    },
    getUAnnouncementList() {
      //获取公告
      this.isloading = true;
      this.$api.systemmanagement
        .getUAnnouncementList(this.currentPage, this.pagesize, this.content)
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getUAnnouncementList();
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
        this.getUser(id);
        this.show("addeditbox", 1, id);
      } else if (type == "del") {
        this.$confirm("是否确定删除该公告？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(res => {
          this.$api.user
            .delfun("pc/announcement/deleteAnnouncement", id)
            .then(res => {
              if (res.code == 200) {
                this.getUAnnouncementList();
                this.$toaster.ok("删除成功");
              } else {
                this.$toaster.error(res.msg);
              }
            });
        });
      }
    },
    getUser(id) {
      //获取公告详情
      this.$api.systemmanagement.getAnnouncement(id).then(res => {
        if (res.code == 200) {
          this.addeditbox.cityId = res.data.cityId.toString();
          this.addeditbox.content = res.data.content;
        }
      });
    },
    show(ruleForm, ruleFormType, ruleFormId) {
      //开启弹框
      this["show" + ruleForm] = true;
      if (ruleFormType == 0) {
        this.showaddeditboxtitle = "新增公告";
      } else {
        this.showaddeditboxtitle = "修改公告";
      }
      this.ruleFormType = ruleFormType;
      this.ruleFormId = ruleFormId;
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
            this.$api.systemmanagement
              .addAnnouncement(addeditbox.cityId, addeditbox.content)
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.getUAnnouncementList();
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
            this.$api.systemmanagement
              .updateAnnouncement(this.ruleFormId,addeditbox.cityId, addeditbox.content)
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.getUAnnouncementList();
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
