<template>
	<div class="container  content-padding">
		<div class="container-main">
			<div class="search-box search-box1">
				<div class="search-item" v-if="cityList.length>1||cityList.length==0">
					<span>城&#x3000;市&#x3000;：</span>
					<el-select v-model="selectCityArr" filterable placeholder="请选择城市" multiple collapse-tags class="mg_right1 centerfont"
					 @change="selectCityChange" maxlength="50">
						<el-option label="全部" value="0" v-if="cityList.length>1"></el-option>
						<el-option :label="item.cityName" :value="item.id.toString()" v-for="(item,index) in cityList" :key="index">
							<span>{{ item.cityName }}</span>
						</el-option>
					</el-select>
				</div>
				<div class="search-item" v-if="cityList.length==1">
					<span>城&#x3000;市&#x3000;：</span>
					<el-select v-model="cityId" filterable placeholder="请选择城市" class="mg_right1 centerfont" maxlength="50" v-if="cityId!=''">
						<el-option :label="item.cityName" :value="item.id.toString()" v-for="(item,index) in cityList" :key="index"
						 disabled>
							<span>{{ item.cityName }}</span>
						</el-option>
					</el-select>
				</div>
				<div class="search-item">
					<span>区&#x3000;域&#x3000;：</span>
					<el-select v-model="selectRegionArr" filterable placeholder="请选择区域" multiple collapse-tags class="mg_right1 centerfont"
					 @change="selectRegionChange" maxlength="50">
						<el-option label="全部" value="0" v-if="regionList.length>0"></el-option>
						<el-option :label="item.regionName" :value="item.id.toString()" v-for="(item,index) in regionList" :key="index">
							<span>{{ item.regionName }}</span>
						</el-option>
					</el-select>
				</div>
				<div class="search-item">
					<span>日期范围：</span>
					<el-date-picker class="mg_right1" v-model="dateRange" type="daterange" align="right" unlink-panels range-separator="至"
					 start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">>
					</el-date-picker>
				</div>
				<br>
				<div class="search-item">
					<span>门店编号：</span>
					<el-input v-model="addressNumber" placeholder="请输入门店" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'addressNumber')"></el-input>
				</div>
				<div class="search-item">
					<span>门店名称：</span>
					<el-input v-model="deliverRestName" placeholder="请输入门店" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'deliverRestName')"></el-input>
				</div>
				<div class="search-item mg_right1">
					<el-button type="primary" @click="serchKey()">搜索</el-button>
				</div>
				<!-- <div class="search-item mg_right1">
					<el-button type="primary" @click="exportMonthlyTotal()" v-if="isAdmin||permission.indexOf('permission3_2_2')>-1">导出报表</el-button>
				</div> -->
			</div>
			<div v-loading="isloading" style="min-height: 100px;" ref="content">
				<div class="ordertable" v-show="isClick!=0">
					<table class="table" style="width: 100%;">
						<thead>
							<tr>
								<td style="width: calc(100% / 7 );">日期</td>
								<td style="width: calc(100% / 7 );">销售收入</td>
								<td style="width: calc(100% / 7 );">采购成本</td>
								<td style="width: calc(100% / 7 );">毛利润</td>
								<td style="width: calc(100% / 7 );">销售量(斤)</td>
								<td style="width: calc(100% / 7 );">订单量</td>
								<td style="width: calc(100% / 7 );">服务门店量</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(item,index) in tableData" :key="index" v-if="tableData.length>0">
								<td colspan="27" class="noborder">
									<table>
										<tbody>
											<tr>
												<td colspan="27" class="noborder">
													<table>
														<tbody>
															<tr v-for="(itema,indexa) in item.everyWeekOrderList" :key="indexa">
																<td :style="{width:itemWidth}">{{itema.date}}</td>
																<td :style="{width:itemWidth}">{{itema.salesRevenue.toFixed(2)}}</td>
																<td :style="{width:itemWidth}">{{itema.procurementCost.toFixed(2)}}</td>
																<td :style="{width:itemWidth}">{{itema.grossProfit}}</td>
																<td :style="{width:itemWidth}">{{itema.salesVolume}}</td>
																<td :style="{width:itemWidth}">{{itema.orderCount}}</td>
																<td :style="{width:itemWidth}">{{itema.addressCount}}</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
											<tr style="background:#FF6803;color: #666;">
												<td :style="{width:itemWidth}">本周日均</td>
												<td :style="{width:itemWidth}">{{item.dayAverageOfWeek.salesRevenue.toFixed(2)}}</td>
												<td :style="{width:itemWidth}">{{item.dayAverageOfWeek.procurementCost.toFixed(2)}}</td>
												<td :style="{width:itemWidth}">{{item.dayAverageOfWeek.grossProfit}}</td>
												<td :style="{width:itemWidth}">{{item.dayAverageOfWeek.salesVolume}}</td>
												<td :style="{width:itemWidth}">{{item.dayAverageOfWeek.orderCount}}</td>
												<td :style="{width:itemWidth}">{{item.dayAverageOfWeek.addressCount}}</td>
											</tr>
											<tr style="background:#E2E266;color: #666;">
												<td :style="{width:itemWidth}">本周合计</td>
												<td :style="{width:itemWidth}">{{item.weekTotal.salesRevenue.toFixed(2)}}</td>
												<td :style="{width:itemWidth}">{{item.weekTotal.procurementCost.toFixed(2)}}</td>
												<td :style="{width:itemWidth}">{{item.weekTotal.grossProfit}}</td>
												<td :style="{width:itemWidth}">{{item.weekTotal.salesVolume}}</td>
												<td :style="{width:itemWidth}">{{item.weekTotal.orderCount}}</td>
												<td :style="{width:itemWidth}">{{item.weekTotal.addressCount}}</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
							<tr v-if="tableData.length==0">
								<td :colspan="15">暂无数据</td>
							</tr>
						</tbody>
					</table>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: "storeOrderSummary",
		data() {
			return {
				isloading: false,
				isClick: 0,
				cityList: [],
				selectAllCity: false,
				selectCityArr: [],
				cityId: '',
				cityIds: '',
				regionList: [],
				selectAllRegion: false,
				selectRegionArr: [],
				regionIds: '',
				dateRange: [new Date(), new Date()],
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
				addressNumber: '',
				deliverRestName: '',
				productName: '',
				tableData: [],
				itemWidth: '',
			};
		},
		watch: {
			cityIds(val) {
				if (!val) {
					this.regionList = [];
					this.selectRegionArr = [];
					this.selectAllRegion = false;
					this.regionIds = '';
				} else {
					this.getLuRegionsByCityIds();
				}
			},
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
			var that = this;
			window.onresize = function() {
				that.itemWidth = that.$refs.content.clientWidth / 7 + 'px';
			}
		},
		mounted() {},
		methods: {
			filteremojifun(e, name, ruleForm) {
				this.$utils.filteremojifun(this, e, name, ruleForm);
			},
			getCitys() { //获取城市列表
				this.$api.systemmanagement.getCitys().then(res => {
					if (res.code == 200) {
						this.cityList = res.data;
						this.cityIds = res.data[0].id.toString()
						if (res.data.length == 1) {
							this.cityId = res.data[0].id.toString();
						}
						this.selectCityArr.push(res.data[0].id.toString())
					}
				});
			},
			selectCityChange(e) { //多选城市
				// console.log(e)
				// 定义一个变量，用来存储当前下拉框是否选中了全部
				if (this.selectAllCity) {
					// 只有下拉框的值发生了变化才会进入此方法
					// 如果之前选中了全部，则变化后肯定不包含全部了
					this.selectAllCity = false
					// 则删除第一个全部
					this.selectCityArr.splice(0, 1)
				} else {
					// 如果之前没有选中全部
					// 判断此次是否选中了全部
					this.selectAllCity = this.selectCityArr.some(value => value === '0')
					// 如果此次选中了全部
					// console.log(this.selectAllCity)
					if (this.selectAllCity) {
						// 则去除其他，只保留全部，默认value=0 是全部
						this.selectCityArr = ['0']
					} else {
						// 如果当前不包含全部，则判断是否其他的七个日期全选了
						if (this.selectCityArr.length === this.cityList.length) {
							// 去过其他七个日期全选了，则也将当前置为全部
							this.selectCityArr = ['0']
							this.selectAllCity = true
						}
					}
				}
				if (this.selectAllCity) {
					var arr = []
					this.cityList.forEach((item, index) => {
						arr.push(item.id);
					});
					this.cityIds = arr.join(',')
				} else {
					if (this.cityList.length > 0) {
						this.cityIds = this.selectCityArr.join(',')
					} else {
						this.cityIds = this.cityId;
					}
				}
			},
			selectRegionChange(e) { //多选区域
				// 定义一个变量，用来存储当前下拉框是否选中了全部
				if (this.selectAllRegion) {
					// 只有下拉框的值发生了变化才会进入此方法
					// 如果之前选中了全部，则变化后肯定不包含全部了
					this.selectAllRegion = false
					// 则删除第一个全部
					this.selectRegionArr.splice(0, 1)
				} else {
					// 如果之前没有选中全部
					// 判断此次是否选中了全部
					this.selectAllRegion = this.selectRegionArr.some(value => value === '0')
					// 如果此次选中了全部
					// console.log(this.selectAllRegion)
					if (this.selectAllRegion) {
						// 则去除其他，只保留全部，默认value=0 是全部
						this.selectRegionArr = ['0']
					} else {
						// 如果当前不包含全部，则判断是否其他的七个日期全选了
						if (this.selectRegionArr.length === this.regionList.length) {
							// 去过其他七个日期全选了，则也将当前置为全部
							this.selectRegionArr = ['0']
							this.selectAllRegion = true
						}
					}
				}
				if (this.selectAllRegion) {
					var arr = []
					this.regionList.forEach((item, index) => {
						arr.push(item.id);
					});
					this.regionIds = arr.join(',')
				} else {
					this.regionIds = this.selectRegionArr.join(',')
				}
			},
			getLuRegionsByCityIds() { //根据ids获取对应区域
				this.$api.systemmanagement.getLuRegionsByCityIds(this.cityIds).then(res => {
					if (res.code == 200) {
						this.regionList = res.data;
						var arr = []
						this.regionList.forEach((item, index) => {
							arr.push(item.id);
						});
						this.regionIds = arr.join(',')
						this.selectRegionArr = ['0']
						this.selectAllRegion = true
					}
				});
			},
			serchKey() { //搜索
				if (this.cityIds == '') {
					this.$toaster.error('请选择城市');
					return
				}
				if (this.regionIds == '') {
					this.$toaster.error('请选择区域');
					return
				}
				if (this.dateRange == undefined || this.dateRange == null || this.dateRange[0] == '') {
					this.$toaster.error('请选择日期范围');
					return
				}
				if (this.addressNumber == '') {
					this.addressNumber = undefined;
				}
				if (this.deliverRestName == '') {
					this.deliverRestName = undefined;
				}
				this.getMonthlyTotalList();
			},
			getMonthlyTotalList() { //获取月度分析
				this.isloading = true;
				var startTime = this.$utils.zhDate(this.dateRange[0]) + ' ' + '00:00:00';
				var endTime = this.$utils.zhDate(this.dateRange[1]) + ' ' + '23:59:59';
				this.$api.ordermanagement.getMonthlyTotalList(this.cityIds, this.regionIds, startTime, endTime, this.addressNumber,
					this.deliverRestName).then(res => {
					if (res.code == 200) {
						this.isClick++
						this.tableData = res.data;
					}
					this.itemWidth = this.$refs.content.clientWidth / 7 + 'px';
					this.isloading = false;
				})
			},
			exportMonthlyTotal() {
				if (this.cityIds == '') {
					this.$toaster.error('请选择城市');
					return
				}
				if (this.regionIds == '') {
					this.$toaster.error('请选择区域');
					return
				}
				if (this.dateRange == undefined || this.dateRange == null || this.dateRange[0] == '') {
					this.$toaster.error('请选择日期范围');
					return
				}
				if (this.addressNumber == '') {
					this.addressNumber = undefined;
				}
				if (this.deliverRestName == '') {
					this.deliverRestName = undefined;
				}
				var startTime = this.$utils.zhDate(this.dateRange[0]) + ' ' + '00:00:00';
				var endTime = this.$utils.zhDate(this.dateRange[1]) + ' ' + '23:59:59';
				this.$api.ordermanagement.exportMonthlyTotal(this.cityIds, this.regionIds, startTime, endTime, this.addressNumber,
					this.deliverRestName).then(res => {
					if (res.code == 200) {
						this.$toaster.ok(res.msg)
					}
				})
			}

		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
