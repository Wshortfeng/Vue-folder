<template>
	<div class="container  content-padding">
		<div class="container-main">
			<div class="search-box">
				<div class="search-item">
					<el-button type="primary" @click="show('addeditbox',0)" v-if="isAdmin||permission.indexOf('permission1_2_2')>-1">新增</el-button>
				</div>
			</div>
			<div class="container-content tablecontent">
				<el-table :data="tableData" border :header-cell-style="{background:'#F6F6F6'}" v-loading="isloading">
					<el-table-column label="序号" width="50px;">
						<template slot-scope="scope">
							<p>{{scope.$index+1+(currentPage-1)*pagesize}}</p>
						</template>
					</el-table-column>
					<el-table-column label="开始日期">
						<template slot-scope="scope">
							<p>{{scope.row.startDate|zhDate}}</p>
						</template>
					</el-table-column>
					<el-table-column label="结束日期">
						<template slot-scope="scope">
							<p>{{scope.row.endDate|zhDate}}</p>
						</template>
					</el-table-column>
					<el-table-column label="开始时间">
						<template slot-scope="scope">
							<p>{{scope.row.startTime }}</p>
						</template>
					</el-table-column>
					<el-table-column label="结束时间">
						<template slot-scope="scope">
							<p>{{scope.row.endTime }}</p>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="150px" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="operation(scope.row.id,'edit')" v-if="isAdmin||permission.indexOf('permission1_2_3')>-1">修改</el-button>
							<el-button size="mini" type="danger" @click="operation(scope.row.id,'del')" v-if="isAdmin||permission.indexOf('permission1_2_4')>-1">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange"
				 :current-page="currentPage" :page-size="pagesize" :total="total">
				</el-pagination>
			</div>
		</div>
		<!-- 新增修改大类 -->
		<el-dialog :visible.sync="showaddeditbox" :title="showaddeditboxtitle" width="580px" class="addeditbox" center style="padding:20px 20px;"
		 @close="close('addeditbox')">
			<el-form ref="addeditbox" :model="addeditbox" class="demo-form-inline" :rules="addeditboxRules" label-width="110px">
				<el-form-item prop="dateRange" label="日期范围：">
					<el-date-picker class="mg_right1" v-model="addeditbox.dateRange" type="daterange" align="right" unlink-panels
					 range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" placeholder="请选择日期范围">
					</el-date-picker>
				</el-form-item>
				<el-form-item prop="dateTimeRange" label="时间范围：">
					<el-time-picker is-range v-model="addeditbox.dateTimeRange" range-separator="至" start-placeholder="开始时间"
					 end-placeholder="结束时间" placeholder="请选择时间范围">
					</el-time-picker>
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
		name: "spikeTime",
		data() {
			var isDate = (rule, value, callback) => {
				//日期范围
				if (value[0] == '') {
					return callback(new Error("请选择日期范围"));
				}
				callback();
			};
			var isDatetime = (rule, value, callback) => {
				//时间范围
				if (value[0] == '') {
					return callback(new Error("请选择时间范围"));
				}
				callback();
			};
			return {
				isloading: true,
				currentPage: 1, //初始页
				pagesize: 11, //    每页的数据
				total: 0, //总数
				tableData: [],
				showaddeditbox: false,
				showaddeditboxtitle: "新增秒杀时间",
				addeditbox: {
					dateRange: '',
					dateTimeRange: '',
				},
				addeditboxRules: {
					dateRange: [{
						required: true,
						message: "请选择日期范围",
						trigger: "change"
					}],
					dateTimeRange: [{
						required: true,
						message: "请选择时间范围",
						trigger: "change"
					}],
				},
				pickerOptions: {
					shortcuts: [{
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
				ruleFormType: 0,
				ruleFormId: ""
			};
		},
		watch: {
			active() {
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
		},
		mounted() {
			this.getProductBuyDateList();
		},
		methods: {
			filteremojifun(e, name, ruleForm) {
				this.$utils.filteremojifun(this, e, name, ruleForm);
			},
			serchKey() {
				this.currentPage = 1;
				this.getProductBuyDateList();
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				this.getProductBuyDateList();
			},
			getProductBuyDateList() {
				//获取秒杀时间列表
				this.$api.commoditymanagement
					.getProductBuyDateList(
						this.currentPage,
						this.pagesize,
					)
					.then(res => {
						if (this.currentPage != 1 && res.data.length == 0) {
							this.currentPage = this.currentPage - 1;
							this.getProductBuyDateList();
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
					this.getProductBuyDate(id);
					this.show("addeditbox", 1, id);
				} else if (type == "del") {
					this.$confirm("是否确定删除该秒杀时间？", "", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}).then(res => {
						this.$api.user
							.delfun("pc/productBuyDate/deleteProductBuyDate", id)
							.then(res => {
								if (res.code == 200) {
									this.getProductBuyDateList();
									this.$toaster.ok("删除成功");
								} else {
									this.$toaster.error(res.msg);
								}
							});
					});
				}
			},
			getProductBuyDate(id) {
				//获取秒杀详情
				this.$api.commoditymanagement.getProductBuyDate(id).then(res => {
					if (res.code == 200) {
						this.addeditbox.dateRange = [res.data.startDate, res.data.endDate]
						var date = new Date();
						var Y = date.getFullYear();
						var M = date.getMonth() + 1;
						var D = date.getDate();
						var arr1 = res.data.startTime.split(':');
						var arr2 = res.data.endTime.split(':');
						this.addeditbox.dateTimeRange = [new Date(Y, M, D, arr1[0], arr1[1], arr1[2]), new Date(Y, M, D, arr2[0], arr2[
							1], arr2[2])];
					}
				});
			},
			show(ruleForm, ruleFormType, ruleFormId) {
				//开启弹框
				this["show" + ruleForm] = true;
				if (ruleFormType == 0) {
					this.showaddeditboxtitle = "新增秒杀时间";
				} else {
					this.showaddeditboxtitle = "修改秒杀时间";
				}
				this.ruleFormType = ruleFormType;
				this.ruleFormId = ruleFormId;
			},
			close(ruleForm) {
				//关闭弹框
				this.$refs[ruleForm].resetFields();
				this["show" + ruleForm] = false;
				this.addeditbox.dateTimeRange = ''
			},
			confirm(ruleForm) {
				if (this.ruleFormType == 0) {
					//新增
					this.$refs[ruleForm].validate(valid => {
						if (valid) {
							var startDate = this.$utils.zhDate(this.addeditbox.dateRange[0]);
							var endDate = this.$utils.zhDate(this.addeditbox.dateRange[1]);
							var startTime = this.$utils.zhDatetime1(this.addeditbox.dateTimeRange[0]);
							var endTime = this.$utils.zhDatetime1(this.addeditbox.dateTimeRange[1]);
							this.$api.commoditymanagement
								.addProductBuyDate(
									startDate,
									endDate,
									startTime,
									endTime,
								)
								.then(res => {
									if (res.code == 200) {
										this.$toaster.ok(res.msg);
										this.getProductBuyDateList();
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
							var startDate = this.$utils.zhDate(this.addeditbox.dateRange[0]);
							var endDate = this.$utils.zhDate(this.addeditbox.dateRange[1]);
							var startTime = this.$utils.zhDatetime1(this.addeditbox.dateTimeRange[0]);
							var endTime = this.$utils.zhDatetime1(this.addeditbox.dateTimeRange[1]);
							this.$api.commoditymanagement
								.updateProductBuyDate(
									this.ruleFormId,
									startDate,
									endDate,
									startTime,
									endTime,
								)
								.then(res => {
									if (res.code == 200) {
										this.$toaster.ok(res.msg);
										this.getProductBuyDateList();
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
