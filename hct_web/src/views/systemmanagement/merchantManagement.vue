<template>
  <div class="container  content-padding">
    <div class="container-main">
      <div class="search-box">
        <div class="search-item">
          <span>关 键 字：</span>
          <el-input v-model="keyword" placeholder="商户编号、手机号、菜场名称" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'keyword')"></el-input>
        </div>
        <div class="search-item">
          <span>城 市：</span>
          <el-select v-model="cityId" filterable placeholder="请选择城市" class="mg_right1 centerfont" maxlength="50">
            <el-option :label="item.cityName" :value="item.id.toString()" v-for="(item,index) in cityList" :key="index">
              <span>{{ item.cityName }}</span>
            </el-option>
          </el-select>
        </div>
        <div class="search-item mg_right1">
          <span>日期范围：</span>
          <el-date-picker v-model="dateRange" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
        <div class="search-item mg_right1">
          <el-button type="primary" @click="serchKey()">搜索</el-button>
        </div>
        <div class="search-item">
          <el-button type="primary" @click="show('addeditbox',0)" v-if="isAdmin||permission.indexOf('permission5_2_2')>-1">新增</el-button>
        </div>
      </div>
      <div class="container-content tablecontent">
        <el-table :data="tableData" border :header-cell-style="{background:'#F6F6F6'}" v-loading="isloading">
          <el-table-column label="序号" width="45px;">
            <template slot-scope="scope">
              <p>{{scope.$index+1+(currentPage-1)*pagesize}}</p>
            </template>
          </el-table-column>
          <el-table-column label="商户编号" width="70">
            <template slot-scope="scope">
              <p>{{scope.row.number}}</p>
            </template>
          </el-table-column>
          <el-table-column label="商户姓名" width="120">
            <template slot-scope="scope">
              <p>{{scope.row.realName}}</p>
            </template>
          </el-table-column>
          <el-table-column label="手机号" width="100">
            <template slot-scope="scope">
              <p>{{scope.row.phone}}</p>
            </template>
          </el-table-column>
          <el-table-column label="菜场名称" width="200">
            <template slot-scope="scope">
              <p>{{scope.row.vegetableMarketName}}</p>
            </template>
          </el-table-column>
          <el-table-column label="城市" width="60">
            <template slot-scope="scope">
              <p>{{scope.row.cityName }}</p>
            </template>
          </el-table-column>
          <el-table-column label="区域" width="100">
            <template slot-scope="scope">
              <p>{{scope.row.regionName }}</p>
            </template>
          </el-table-column>
          <el-table-column label="菜场地址" >
            <template slot-scope="scope">
              <p>{{scope.row.vegetableMarketAddress }}</p>
            </template>
          </el-table-column>
          <el-table-column label="摊位号" width="150">
            <template slot-scope="scope">
              <p>{{scope.row.boothNumber}}</p>
            </template>
          </el-table-column>
          <el-table-column label="订单总数" width="80">
            <template slot-scope="scope">
              <p>{{scope.row.orderCount}}</p>
            </template>
          </el-table-column>
          <el-table-column label="订单总金额" width="90">
            <template slot-scope="scope">
              <p>{{scope.row.orderPriceCount}}</p>
            </template>
          </el-table-column>
          <el-table-column label="未接订单总数" width="100">
            <template slot-scope="scope">
              <p>{{scope.row.unOrderCount}}</p>
            </template>
          </el-table-column>
          <el-table-column label="未收款总金额" width="100">
            <template slot-scope="scope">
              <p>{{scope.row.unOrderUnPriceCount}}</p>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150px" fixed="right">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="operation(scope.row.id,'edit')" v-if="isAdmin||permission.indexOf('permission5_2_3')>-1">修改</el-button>
              <el-button size="mini" type="danger" @click="operation(scope.row.id,'del')" v-if="isAdmin||permission.indexOf('permission5_2_4')>-1">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 新增修改商户 -->
    <el-dialog :visible.sync="showaddeditbox" :title="showaddeditboxtitle" width="800px" class="addeditbox" center style="padding:20px 20px;" @close="close('addeditbox')">
      <el-form ref="addeditbox" :model="addeditbox" class="demo-form-inline" :rules="addeditboxRules" label-width="110px">
        <el-form-item prop="realName" label="商户姓名：" class="addeditbox-left">
          <el-input v-model="addeditbox.realName" placeholder="请输入商户姓名" maxlength="50" @change="filteremojifun($event,'realName','addeditbox')"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号：" class="addeditbox-right">
          <el-input v-model="addeditbox.phone" placeholder="请输入手机号" maxlength="50" @change="filteremojifun($event,'phone','addeditbox')"></el-input>
        </el-form-item>
        <el-form-item prop="vegetableMarketName" label="菜场名称：" class="addeditbox-left">
          <el-input v-model="addeditbox.vegetableMarketName" placeholder="请输入菜场名称" maxlength="50" @change="filteremojifun($event,'vegetableMarketName','addeditbox')"></el-input>
        </el-form-item>
        <el-form-item prop="vegetableMarketAddress" label="菜场地址：" class="addeditbox-right">
          <el-input v-model="addeditbox.vegetableMarketAddress" placeholder="请输入菜场地址" maxlength="50" @change="filteremojifun($event,'vegetableMarketAddress','addeditbox')"></el-input>
        </el-form-item>
        <el-form-item prop="cityId" label="城市：" class="addeditbox-left">
          <el-select v-model="addeditbox.cityId" filterable placeholder="请选择城市" class="mg_right1 " maxlength="50" @change="changecity">
            <el-option :label="item.cityName" :value="item.id.toString()" v-for="(item,index) in cityList" :key="index">
              <span>{{ item.cityName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="regionId" label="区域：" class="addeditbox-right">
          <el-select v-model="addeditbox.regionId" filterable placeholder="请选择区域" class="mg_right1 " maxlength="50">
            <el-option :label="item.regionName" :value="item.id.toString()" v-for="(item,index) in regionList" :key="index">
              <span>{{ item.regionName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="boothNumber" label="摊位号：" class="addeditbox-left">
          <el-input v-model="addeditbox.boothNumber" placeholder="请输入摊位号" maxlength="50" @change="filteremojifun($event,'boothNumber','addeditbox')"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码：" class="addeditbox-right">
          <el-input v-model="addeditbox.password" placeholder="请输入密码：" type="password" maxlength="50" @change="filteremojifun($event,'password','addeditbox')"></el-input>
        </el-form-item>
        <el-form-item prop="remark" label="备注：">
          <el-input v-model="addeditbox.remark" type="textarea" placeholder="请输入备注" maxlength="100" @change="filteremojifun($event,'remark','addeditbox')"></el-input>
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
  name: "merchantManagement",
  data() {
    var isPhone = (rule, value, callback) => {
      //手机号验证
      if (!value) {
        return callback(new Error("请输入手机号"));
      }
      if (!this.$utils.isString(value)) {
        return callback(new Error("手机号为11个字符"));
      } else {
        if (!this.$utils.telphone(value)) {
          return callback(new Error("手机号格式错误"));
        } else {
          callback();
        }
      }
    };
    return {
      isloading: true,
      keyword: "",
      cityId: "",
      cityList: [],
      regionList: [],
      dateRange: ["", ""],
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 500 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 500 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 500 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      currentPage: 1, //初始页
      pagesize: 14, //    每页的数据
      total: 0, //总数
      tableData: [],
      showaddeditbox: false,
      showaddeditboxtitle: "新增商户",
      addeditbox: {
        realName: "",
        phone: "",
        vegetableMarketName: "",
        vegetableMarketAddress: "",
        cityId: "",
        regionId: "",
        boothNumber: "",
        password: "",
        remark: ""
      },
      addeditboxRules: {
        realName: [
          { required: true, message: "请输入商户姓名", trigger: "blur" }
        ],
        phone: [
          {
            required: true,
            validator: isPhone,
            trigger: "blur"
          }
        ],
        vegetableMarketName: [
          { required: true, message: "请输入菜场名称", trigger: "blur" }
        ],
        vegetableMarketAddress: [
          { required: true, message: "请输入菜场地址", trigger: "blur" }
        ],
        cityId: [{ required: true, message: "请选择城市", trigger: "change" }],
        regionId: [
          { required: true, message: "请选择区域", trigger: "change" }
        ],
        boothNumber: [
          { required: true, message: "请输入摊位号", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
          // { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      },
      ruleFormType: 0,
      ruleFormId: ""
    };
  },
  watch: {
    cityId() {
      this.serchKey();
    },
    dateRange() {
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
    this.getGreengrocerList();
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
    changecity(e) {
      //选择城市事件
      this.addeditbox.regionId=''
      if (e) {
        this.getLuRegionsByCityId(e);
      }
    },
    getLuRegionsByCityId(id) {
      //获取城市下区域列表
      this.$api.systemmanagement.getLuRegionsByCityId(id).then(res => {
        if (res.code == 200) {
          this.regionList = res.data;
        }
      });
    },
    serchKey() {
      this.currentPage = 1;
      this.getGreengrocerList();
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.getGreengrocerList();
    },
    getGreengrocerList() {
      //获取商户列表
      this.isloading = true;
      if (this.dateRange == undefined || this.dateRange == null|| this.dateRange=='') {
        var beginDate = "";
        var endDate = "";
      } else {
        var beginDate = this.$utils.zhDate(this.dateRange[0]);
        var endDate = this.$utils.zhDate(this.dateRange[1]);
      }
      this.$api.systemmanagement
        .getGreengrocerList(
          this.currentPage,
          this.pagesize,
          this.keyword,
          this.cityId,
          beginDate,
          endDate
        )
        .then(res => {
          if (this.currentPage != 1 && res.data.length == 0) {
            this.currentPage = this.currentPage - 1;
            this.getGreengrocerList();
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
        this.getGreengrocer(id);
        this.show("addeditbox", 1, id);
      } else if (type == "del") {
        this.$confirm("是否确定删除该商户？", "", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(res => {
          this.$api.user
            .delfun("pc/greengrocer/deleteGreengrocer", id)
            .then(res => {
              if (res.code == 200) {
                this.getGreengrocerList();
                this.$toaster.ok("删除成功");
              } else {
                this.$toaster.error(res.msg);
              }
            });
        });
      }
    },
    getGreengrocer(id) {
      //获取商户详情
      this.$api.systemmanagement.getGreengrocer(id).then(res => {
        if (res.code == 200) {
          this.addeditbox.cityId = res.data.cityId.toString();
          this.addeditbox.realName = res.data.realName;
          this.addeditbox.phone = res.data.phone;
          this.addeditbox.vegetableMarketName = res.data.vegetableMarketName;
          this.addeditbox.vegetableMarketAddress =res.data.vegetableMarketAddress;
          this.addeditbox.cityId = res.data.cityId.toString();
          this.getLuRegionsByCityId(res.data.cityId)
          this.addeditbox.regionId = res.data.regionId.toString();
          this.addeditbox.boothNumber = res.data.boothNumber;
          this.addeditbox.password = res.data.password;
          this.addeditbox.remark = res.data.remark;
        }
      });
    },
    show(ruleForm, ruleFormType, ruleFormId) {
      //开启弹框
      this["show" + ruleForm] = true;
      if (ruleFormType == 0) {
        this.showaddeditboxtitle = "新增商户";
      } else {
        this.showaddeditboxtitle = "修改商户";
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
              .addGreengrocer(
                addeditbox.realName,
                addeditbox.phone,
                addeditbox.vegetableMarketName,
                addeditbox.vegetableMarketAddress,
                addeditbox.cityId,
                addeditbox.regionId,
                addeditbox.boothNumber,
                addeditbox.password,
                addeditbox.remark
              )
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.getGreengrocerList();
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
              .updateGreengrocer(
                this.ruleFormId,
                addeditbox.realName,
                addeditbox.phone,
                addeditbox.vegetableMarketName,
                addeditbox.vegetableMarketAddress,
                addeditbox.cityId,
                addeditbox.regionId,
                addeditbox.boothNumber,
                addeditbox.password,
                addeditbox.remark
              )
              .then(res => {
                if (res.code == 200) {
                  this.$toaster.ok(res.msg);
                  this.getGreengrocerList();
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
