<template>
	<div class="container  content-padding">
		<div class="container-main">
			<div class="search-box">
				<div class="search-item">
					<span>城 市：</span>
					<el-select v-model="cityId" filterable placeholder="请选择城市" class="mg_right1 centerfont" maxlength="50">
						<el-option :label="item.cityName" :value="item.id.toString()" v-for="(item,index) in cityList" :key="index">
							<span>{{ item.cityName }}</span>
						</el-option>
					</el-select>
				</div>
				<div class="search-item">
					<span>来 源：</span>
					<el-select v-model="sourceId" filterable placeholder="请选择来源" class="mg_right1 centerfont" maxlength="50">
						<el-option label="全部" value=""></el-option>
						<el-option :label="item.sourceName" :value="item.id.toString()" v-for="(item,index) in luSourcesList" :key="index">
							<span>{{ item.sourceName }}</span>
						</el-option>
					</el-select>
				</div>
				<div class="search-item">
					<span>大 类：</span>
					<el-select v-model="categoryId" filterable placeholder="请选择大类" class="mg_right1 centerfont" maxlength="50">
						<el-option label="全部" value=""></el-option>
						<el-option :label="item.categoryName" :value="item.id.toString()" v-for="(item,index) in productCategorysList"
						 :key="index">
							<span>{{ item.categoryName }}</span>
						</el-option>
					</el-select>
				</div>
				<div class="search-item">
					<span>子 类：</span>
					<el-select v-model="subCategoryId" filterable placeholder="请选择子类" class="mg_right1 centerfont" maxlength="50">
						<el-option label="全部" value=""></el-option>
						<el-option :label="item.subCategoryName" :value="item.id.toString()" v-for="(item,index) in productSubCategorysList"
						 :key="index">
							<span>{{ item.subCategoryName }}</span>
						</el-option>
					</el-select>
				</div>
				<div class="search-item mg_right1">
					<span>日 期：</span>
					<el-date-picker v-model="histroyProductDate" align="right" class=" centerfont dateselect" type="date" placeholder="请选择日期"
					 :picker-options="pickerOptions">
					</el-date-picker>
				</div>
				<div class="search-item">
					<span>菜 名：</span>
					<el-input v-model="productName" placeholder="请输入菜名" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'productName')"></el-input>
				</div>
				<div class="search-item">
					<span>供应商手机号：</span>
					<el-input v-model="supplierMobileNumber" placeholder="请输入供应商手机号" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'supplierMobileNumber')"></el-input>
				</div>
				<div class="search-item mg_right1">
					<el-button type="primary" @click="serchKey()">搜索</el-button>
				</div>
				<div class="search-item">
					<el-button type="primary" @click="show(0,0)" v-if="isAdmin||permission.indexOf('permission1_1_2')>-1">新增</el-button>
				</div>
			</div>
			<div class="container-content tablecontent">
				<el-table :data="tableData" border :header-cell-style="{background:'#F6F6F6'}" v-loading="isloading">
					<el-table-column label="序号" width="55px;">
						<template slot-scope="scope">
							<p>{{scope.$index+1+(currentPage-1)*pagesize}}</p>
						</template>
					</el-table-column>
					<el-table-column label="菜名" width="200">
						<template slot-scope="scope">
							<p>{{scope.row.productName}}</p>
						</template>
					</el-table-column>
					<el-table-column label="来源" width="91">
						<template slot-scope="scope">
							<p>{{scope.row.sourceName}}</p>
						</template>
					</el-table-column>
					<el-table-column label="规格" width="115">
						<template slot-scope="scope">
							<p>{{scope.row.measureUnit1And2Relation}}{{scope.row.price1MeasureUnitName}}/{{scope.row.price2MeasureUnitName}}</p>
						</template>
					</el-table-column>
					<el-table-column label="用量" width="45">
						<template slot-scope="scope">
							<p>{{scope.row.consumption|consumptionFormat}}</p>
						</template>
					</el-table-column>
					<el-table-column label="单价" width="180">
						<template slot-scope="scope">
							<p class="text-left">
								<el-input-number v-model="scope.row.price1" :controls="false" :min="0" :max="9999999" :precision="2" size="small"
								 style="width:100px;"></el-input-number>
								元/{{scope.row.price1MeasureUnitName}}
							</p>
						</template>
					</el-table-column>
					<el-table-column label="进价" width="180">
						<template slot-scope="scope">
							<p class="text-left">
								<el-input-number v-model="scope.row.price0" :controls="false" :min="0" :max="9999999" :precision="2" size="small"
								 style="width:100px;" @change="getPriceCalculationFormula(scope.row.id,scope.row.price0,scope.$index)"></el-input-number>
								元/{{scope.row.price0MeasureUnitName}}
							</p>
						</template>
					</el-table-column>
					<el-table-column label="促销价" width="180">
						<template slot-scope="scope">
							<p class="text-left">
								<el-input-number v-model="scope.row.promotionPrice1" :controls="false" :min="0" :max="9999999" :precision="2"
								 size="small" style="width:100px;"></el-input-number>
								元/{{scope.row.price1MeasureUnitName}}
							</p>
						</template>
					</el-table-column>
					<el-table-column label="促销" width="80">
						<template slot-scope="scope">
							<el-select v-model="scope.row.isPromotion" class="select-input" size="small" @change="changeIsPromotion(scope.row.isPromotion,scope.$index)">
								<el-option label="是" value="1"></el-option>
								<el-option label="否" value="0"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<!-- <el-table-column label="满减" width="100">
            <template slot-scope="scope">
               <el-select
                v-model="scope.row.isFullCut"
                class="select-input select"
                size="small"
              >
                <el-option
                  label="是"
                  value="1"
                ></el-option>
                <el-option
                  label="否"
                  value="0"
                ></el-option>
              </el-select>
            </template>
          </el-table-column> -->
					<el-table-column label="激活" width="80">
						<template slot-scope="scope">
							<el-select v-model="scope.row.active" class="select-input select" size="small">
								<el-option label="是" value="1"></el-option>
								<el-option label="否" value="0"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column label="供应商手机号" width="130">
						<template slot-scope="scope">
							<el-input class="select-input" v-model="scope.row.supplierMobileNumber" maxlength="11" size="small"></el-input>
						</template>
					</el-table-column>

					<el-table-column label="备注" width="200">
						<template slot-scope="scope">
							<el-input v-model="scope.row.remark" maxlength="100" size="small"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="220px" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini" type="success" @click="preservation(scope.row.id,scope.row.price1,scope.row.price0,scope.row.promotionPrice1,scope.row.isPromotion,scope.row.active,scope.row.supplierMobileNumber,scope.row.remark)" v-if="isAdmin||permission.indexOf('permission1_1_5')>-1">保存</el-button>
							<el-button size="mini" type="primary" @click="operation(scope.row.id,'edit')" v-if="isAdmin||permission.indexOf('permission1_1_3')>-1">修改</el-button>
							<el-button size="mini" type="danger" @click="operation(scope.row.id,'del')" v-if="isAdmin||permission.indexOf('permission1_1_4')>-1">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange"
				 :current-page="currentPage" :page-size="pagesize" :total="total">
				</el-pagination>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: "commodityManagement",
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
				sourceId: "",
				luSourcesList: [],
				categoryId: "",
				productCategorysList: [],
				subCategoryId: "",
				productSubCategorysList: [],
				histroyProductDate: "",
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
							text: "今天",
							onClick(picker) {
								picker.$emit("pick", new Date());
							}
						},
						{
							text: "昨天",
							onClick(picker) {
								const date = new Date();
								date.setTime(date.getTime() - 3600 * 1000 * 24);
								picker.$emit("pick", date);
							}
						},
						{
							text: "一周前",
							onClick(picker) {
								const date = new Date();
								date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
								picker.$emit("pick", date);
							}
						}
					]
				},
				currentPage: 1, //初始页
				pagesize: 11, //    每页的数据
				total: 0, //总数
				tableData: []
			};
		},
		watch: {
			cityId() {
				this.sourceId = "";
				this.getLuSourcesByCityId();
				this.serchKey();
			},
			sourceId() {
				this.serchKey();
			},
			categoryId() {
				this.subCategoryId = "";
				this.getProductSubCategorys();
				this.serchKey();
			},
			subCategoryId() {
				this.serchKey();
			},
			histroyProductDate() {
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
			this.getLuSourcesByCityId();
			this.getProductCategorys();
			this.getProductSubCategorys();
		},
		mounted() {
			// this.getProductList();
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
			getLuSourcesByCityId() {
				//获取来源
				if (this.cityId == "") {
					var cityId = 0;
				} else {
					var cityId = this.cityId;
				}
				this.$api.commoditymanagement.getLuSourcesByCityId(cityId).then(res => {
					if (res.code == 200) {
						this.luSourcesList = res.data;
					}
				});
			},
			getProductCategorys() {
				//获取所有大类
				this.$api.commoditymanagement.getProductCategorys().then(res => {
					if (res.code == 200) {
						this.productCategorysList = res.data;
					}
				});
			},
			getProductSubCategorys() {
				//获取所有子类
				if (this.categoryId == "") {
					var categoryId = 0;
				} else {
					var categoryId = this.categoryId;
				}
				this.$api.commoditymanagement
					.getProductSubCategorys(categoryId)
					.then(res => {
						if (res.code == 200) {
							this.productSubCategorysList = res.data;
						}
					});
			},
			serchKey() {
				this.currentPage = 1;
				this.getProductList();
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				this.getProductList();
			},
			getProductList() {
				//获取商品列表
				this.isloading = true;
				if (
					this.histroyProductDate == undefined ||
					this.histroyProductDate == null
				) {
					var histroyProductDate = "";
				} else {
					var histroyProductDate = this.$utils.zhDate2(this.histroyProductDate);
				}
				this.$api.commoditymanagement
					.getProductList(
						this.currentPage,
						this.pagesize,
						this.cityId,
						this.sourceId,
						this.categoryId,
						this.subCategoryId,
						this.isFullCut,
						histroyProductDate,
						this.productName,
						this.supplierMobileNumber
					)
					.then(res => {
						if (this.currentPage != 1 && res.data.length == 0) {
							this.currentPage = this.currentPage - 1;
							this.getProductList();
						} else {
							this.total = res.pageInfo.total;
							var data = res.data;
							for (var i = 0; i < data.length; i++) {
								data[i].isPromotion = data[i].isPromotion.toString();
								data[i].active = data[i].active.toString();
								if(data[i].isPromotion.toString()=='0'){
									data[i].promotionPrice1=undefined;
								}
								// data[i].isFullCut = data[i].isFullCut.toString();
							}
							this.tableData = data;
						}
						this.isloading = false;
					});
			},
			operation(id, type) {
				//操作
				if (type == "edit") {
					this.show(1, id);
				} else if (type == "del") {
          	if (
					this.histroyProductDate == undefined ||
					this.histroyProductDate == null
				) {
					var histroyProductDate = "";
				} else {
					var histroyProductDate = this.$utils.zhDate2(this.histroyProductDate);
				}
					this.$confirm("是否确定删除该商品？", "", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}).then(res => {
						this.$api.user
							.delfun("pc/product/deleteProduct", id,histroyProductDate)
							.then(res => {
								if (res.code == 200) {
									this.getProductList();
									this.$toaster.ok("删除成功");
								} else {
									this.$toaster.error(res.msg);
								}
							});
					});
				}
			},
			show(ruleFormType, ruleFormId) {
				this.$router.push({
					name: 'CommodityIinfo',
					params: {
						type: ruleFormType,
						id: ruleFormId
					}
				})
			},
			changeIsPromotion(isPromotion, index) { //是否促销
				if (isPromotion == '0') {
					this.tableData[index].promotionPrice1 = undefined
				}
			},
			getPriceCalculationFormula(id, price0, index) { //单价计算
				if (!price0) {
					this.$toaster.error('请输入进价');
					return
				}
				this.$api.commoditymanagement.getPriceCalculationFormula(id, price0, this.histroyProductDate).then(res => {
					if (res.code == 200) {
						this.tableData[index].price1 = res.data.price1;
					}
				});
			},
			preservation(id, price1, price0, promotionPrice1, isPromotion, active, supplierMobileNumber, remark) { //保存
				if (!price1) {
					this.$toaster.error('请输入单价');
					return
				}
				if (!price0) {
					this.$toaster.error('请输入进价');
					return
				}
				if(isPromotion=='1'){
					if (!promotionPrice1) {
						this.$toaster.error('请输入促销价');
						return
					}
				}
				if (!this.$utils.isString(supplierMobileNumber)) {
					this.$toaster.error('手机号为11个字符');
					return;
				} else {
					if (!this.$utils.telphone(supplierMobileNumber)) {
						this.$toaster.error('手机号格式错误');
						return;
					} else {

					}
				}
				if (isPromotion == '0') {
					promotionPrice1 = ''
				}
				this.$api.commoditymanagement.updateProductInfo(id, price1, price0, promotionPrice1, isPromotion, active,
					supplierMobileNumber, this.date, remark).then(res => {
					if (res.code == 200) {
						this.getProductList();
					}
				});
			},
		},
		beforeRouteLeave(to, from, next) { //离开页面时
			// console.log(to.name)
			// console.log(from.name)
// 			if (to.name === 'CommodityIinfo') {
// 				from.meta.keepAlive = true;
// 			} else {
// 				from.meta.keepAlive = false;
// 			}
			next() //执行
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
