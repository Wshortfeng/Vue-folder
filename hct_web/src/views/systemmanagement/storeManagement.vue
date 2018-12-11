<template>
  <div class="container  content-padding">
    <div class="container-main">
      <div class="search-box">
        <div class="search-item">
          <span>关 键 字：</span>
          <el-input v-model="keyword" placeholder="门店编号、餐馆名、联系电话" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'keyword')"></el-input>
        </div>
        <div class="search-item">
          <span>城 市：</span>
          <el-select v-model="cityId" filterable placeholder="请选择城市" class="mg_right1 centerfont" maxlength="50">
            <el-option :label="item.cityName" :value="item.id.toString()" v-for="(item,index) in cityList" :key="index">
              <span>{{ item.cityName }}</span>
            </el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span>是否确认：</span>
          <el-select v-model="isConfirmed" filterable placeholder="请选择" class="mg_right1 min_width" maxlength="50">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </div>
        <div class="search-item">
          <span>是否黑名单：</span>
          <el-select v-model="isBlackList" filterable placeholder="请选择" class="mg_right1 min_width" maxlength="50">
            <el-option label="全部" value=""></el-option>
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </div>
        <div class="search-item mg_right1">
          <el-button type="primary" @click="serchKey()">搜索</el-button>
        </div>
      </div>
      <div class="container-content tablecontent">
        <el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#F6F6F6'}" v-loading="isloading">
          <el-table-column label="序号" width="45px;">
            <template slot-scope="scope">
              <p>{{scope.$index+1+(currentPage-1)*pagesize}}</p>
            </template>
          </el-table-column>
          <el-table-column label="门店编号" width="70">
            <template slot-scope="scope">
              <p>{{scope.row.number}}</p>
            </template>
          </el-table-column>
          <el-table-column label="餐馆名" width="200">
            <template slot-scope="scope">
              <p>{{scope.row.name}}</p>
            </template>
          </el-table-column>
          <el-table-column label="城市" width="60">
            <template slot-scope="scope">
              <p>{{scope.row.cityName}}</p>
            </template>
          </el-table-column>
          <el-table-column label="地址" width="200">
            <template slot-scope="scope">
              <p>{{scope.row.address}}</p>
            </template>
          </el-table-column>
          <el-table-column label="联系人" width="120">
            <template slot-scope="scope">
              <p>{{scope.row.contact}}</p>
            </template>
          </el-table-column>
          <el-table-column label="联系电话" width="100">
            <template slot-scope="scope">
              <p>{{scope.row.contactPhone}}</p>
            </template>
          </el-table-column>
          <el-table-column label="积分" width="200" v-if="false">
            <template slot-scope="scope">
              <p>{{scope.row.integral}}</p>
            </template>
          </el-table-column>
          <el-table-column label="是否确认" width="70">
            <template slot-scope="scope">
              <p>{{scope.row.isConfirmed|is01choice}}</p>
            </template>
          </el-table-column>
          <el-table-column label="确认人" width="120">
            <template slot-scope="scope">
              <p>{{scope.row.firstName}} {{scope.row.lastName}}</p>
            </template>
          </el-table-column>
          <el-table-column label="确认时间" width="140">
            <template slot-scope="scope">
              <p>{{scope.row.confirmeDate|zhDatetime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="140">
            <template slot-scope="scope">
              <p>{{scope.row.createDate|zhDatetime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="是否黑名单门店" width="110">
            <template slot-scope="scope">
              <p>{{scope.row.isBlackList|is01choice}}</p>
            </template>
          </el-table-column>
          <el-table-column label="活跃状态" width="70">
            <template slot-scope="scope">
              <p>{{scope.row.activeStatus|activeStatusFormat}}</p>
            </template>
          </el-table-column>
          <el-table-column label="最后下单时间" width="140">
            <template slot-scope="scope">
              <p>{{scope.row.latestOrderTime|zhDatetime}}</p>
            </template>
          </el-table-column>
          <el-table-column label="商户姓名" width="110">
            <template slot-scope="scope">
              <p>{{scope.row.greengrocerName}}</p>
            </template>
          </el-table-column>
          <el-table-column label="商户手机号" width="100">
            <template slot-scope="scope">
              <p>{{scope.row.greengrocerPhone}}</p>
            </template>
          </el-table-column>
					<el-table-column label="菜场" width="100">
						<template slot-scope="scope">
							<p>{{scope.row.vegetableMarketName}}</p>
						</template>
					</el-table-column>
          <el-table-column label="操作" width="75px" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="operation(scope.row.id,'edit')" v-if="isAdmin||permission.indexOf('permission5_1_2')>-1">修改</el-button>
              <!-- <el-button size="mini" type="danger" @click="operation(scope.row.id,'del')">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 新增修改门店 -->
    <el-dialog :visible.sync="showaddeditbox" :title="showaddeditboxtitle" width="800px" class="addeditbox" center style="padding:15px 20px;" @close="close('addeditbox')">
      <el-form ref="addeditbox" :model="addeditbox" class="demo-form-inline" :rules="addeditboxRules" label-width="125px">
        <el-form-item prop="name" label="餐馆名：" class="addeditbox-left">
          <el-input v-model="addeditbox.name" placeholder="请输入餐馆名" maxlength="50" @change="filteremojifun($event,'name','addeditbox')" disabled></el-input>
        </el-form-item>
        <el-form-item prop="address" label="门店地址：" class="addeditbox-right">
          <el-input v-model="addeditbox.address" placeholder="请输入门店地址" maxlength="50" @change="filteremojifun($event,'address','addeditbox')" disabled></el-input>
        </el-form-item>
        <el-form-item prop="contact" label="联系人：" class="addeditbox-left">
          <el-input v-model="addeditbox.contact" placeholder="请输入联系人" maxlength="10" @change="filteremojifun($event,'contact','addeditbox')" disabled></el-input>
        </el-form-item>
        <el-form-item prop="contactPhone" label="联系电话：" class="addeditbox-right">
          <el-input v-model="addeditbox.contactPhone" placeholder="请输入联系电话" maxlength="11" @change="filteremojifun($event,'contactPhone','addeditbox')" disabled></el-input>
        </el-form-item>
        <el-form-item label="是否确认：" prop="isConfirmed" class="addeditbox-left">
          <el-radio-group v-model="addeditbox.isConfirmed">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否黑名单：" prop="isBlackList" class="addeditbox-right">
          <el-radio-group v-model="addeditbox.isBlackList">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
				<el-form-item prop="cityId" label="城市：">
					<el-select v-model="addeditbox.cityId" filterable placeholder="请选择城市" class="mg_right1 centerfont" maxlength="50">
						<el-option :label="item.cityName" :value="item.id.toString()" v-for="(item,index) in cityList" :key="index">
							<span>{{ item.cityName }}</span>
						</el-option>
					</el-select>
				</el-form-item>
        <el-form-item prop="greengrocerId" label="商户：">
          <el-select v-model="addeditbox.greengrocerId 	" filterable placeholder="请选择商户" class="mg_right1 centerfont" maxlength="50">
            <el-option :label="item.realName" :value="item.id.toString()" v-for="(item,index) in greengrocersList" :key="index">
             <p style="text-align: center;">
							 <span style="float: left">姓名：{{ item.realName }}</span>
							 <span >手机号：{{ item.phone}}</span>
							 <span style="float: right; color: #8492a6; font-size: 13px">菜场：{{ item.vegetableMarketName }}</span>
						 </p>
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
  name: "storeManagement",
  data() {
    var isPhone = (rule, value, callback) => {
      //手机号验证
      if (!value) {
        return callback(new Error("请输入联系电话"));
      }
      if (!this.$utils.isString(value)) {
        return callback(new Error("联系电话为11个字符"));
      } else {
        if (!this.$utils.telphone(value)) {
          return callback(new Error("联系电话格式错误"));
        } else {
          callback();
        }
      }
    };
    return {
      isloading: true,
      keyword: "",
      cityId: "",
      isConfirmed: "",
      isBlackList: "",
      cityList: [],
      greengrocersList: [],
      currentPage: 1, //初始页
      pagesize: 14, //    每页的数据
      total: 0, //总数
      tableData: [],
      showaddeditbox: false,
      showaddeditboxtitle: "新增门店",
      addeditbox: {
        name: "",
        address: "",
        contact: "",
        contactPhone: "",
        isConfirmed: "0",
        isBlackList: "0",
        greengrocerId: "",
				cityId:''
      },
      addeditboxRules: {
        name: [{ required: true, message: "请输入餐馆名", trigger: "blur" }],
        address: [
          { required: true, message: "请输入门店地址", trigger: "blur" }
        ],
        contact: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        contactPhone: [
          {
            required: true,
            validator: isPhone,
            trigger: "blur"
          }
        ],
        isConfirmed: [
          { required: true, message: "请选择是否确认", trigger: "change" }
        ],
        isBlackList: [
          { required: true, message: "请选择是否黑名单", trigger: "change" }
        ],
        greengrocerId: [
          { required: true, message: "请选择商户", trigger: "change" }
        ],
				cityId: [
          { required: true, message: "请选择城市", trigger: "change" }
        ],
      },
      ruleFormType: 0,
      ruleFormId: ""
    };
  },
  watch: {
    isBlackList() {
      this.serchKey();
    },
    cityId() {
      this.serchKey();
    },
    isConfirmed() {
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
    this.getCitys();
  },
  mounted() {
    this.getAddressList();
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
					this.cityId=res.data[0].id.toString();
        }
      });
    },
    getGreengrocers() {
      //获取商户
      this.$api.systemmanagement.getGreengrocers(this.addeditbox.cityId).then(res => {
        if (res.code == 200) {
          this.greengrocersList = res.data;
        }
      });
    },
    serchKey() {
      this.currentPage = 1;
      this.getAddressList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getAddressList();
    },
    getAddressList() {
      //获取门店列表
      this.isloading = true;
      this.$api.systemmanagement
        .getAddressList(
          this.currentPage,
          this.pagesize,
          this.keyword,
          this.cityId,
          this.isConfirmed,
          this.isBlackList
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getAddressList();
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
        this.getAddress(id);
        this.show("addeditbox", 1, id);
      } else if (type == "del") {
        // this.$confirm("是否确定删除该公告？", "", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning"
        // }).then(res => {
        //   this.$api.user
        //     .delfun("pc/announcement/deleteAnnouncement", id)
        //     .then(res => {
        //       if (res.code == 200) {
        //         this.getAddressList();
        //         this.$toaster.ok("删除成功");
        //       } else {
        //         this.$toaster.error(res.msg);
        //       }
        //     });
        // });
      }
    },
    getAddress(id) {
      //获取门店详情
      this.$api.systemmanagement.getAddress(id).then(res => {
        if (res.code == 200) {
          this.addeditbox.name = res.data.name;
          this.addeditbox.address = res.data.address;
          this.addeditbox.contact = res.data.contact;
          this.addeditbox.contactPhone = res.data.contactPhone;
          this.addeditbox.isConfirmed = res.data.isConfirmed.toString();
          this.addeditbox.isBlackList = res.data.isBlackList.toString();
					this.addeditbox.cityId= res.data.cityId.toString();
          this.getGreengrocers();
          if (res.data.greengrocerId) {
            this.addeditbox.greengrocerId = res.data.greengrocerId.toString();
          }
        }
      });
    },
    show(ruleForm, ruleFormType, ruleFormId) {
      //开启弹框
      this["show" + ruleForm] = true;
      if (ruleFormType == 0) {
        this.showaddeditboxtitle = "新增门店";
      } else {
        this.showaddeditboxtitle = "修改门店";
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
        // this.$refs[ruleForm].validate(valid => {
        //   if (valid) {
        //     var addeditbox = this.addeditbox;
        //     this.$api.systemmanagement
        //       .updateAddress(addeditbox.cityId, addeditbox.content)
        //       .then(res => {
        //         if (res.code == 200) {
        //           this.$toaster.ok(res.msg);
        //           this.getAddressList();
        //           this.close("addeditbox");
        //         } else {
        //           this.$toaster.error(res.msg);
        //         }
        //       })
        //       .catch(() => {});
        //   } else {
        //     return false;
        //   }
        // });
      } else if (this.ruleFormType == 1) {
        //修改
        this.$refs[ruleForm].validate(valid => {
          var addeditbox = this.addeditbox;
          if (valid) {
            this.$api.systemmanagement
              .updateAddress(
                this.ruleFormId,
                addeditbox.isConfirmed,
                addeditbox.isBlackList,
                addeditbox.greengrocerId,
								addeditbox.cityId
              )
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.getAddressList();
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
