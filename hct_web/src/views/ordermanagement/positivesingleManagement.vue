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
					<span>日&#x3000;期&#x3000;：</span>
					<el-date-picker v-model="deliverDate" align="right" type="dates" placeholder="选择日期" class="mg_right1 centerfont" style="width: 225px;">
					</el-date-picker>
				</div>
				<div class="search-item">
					<span>订单号&#x3000;：</span>
					<el-input v-model="orderDisplayId" placeholder="请输入订单号" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'orderDisplayId')"></el-input>
				</div>

				<div class="search-item">
					<span>门店编号：</span>
					<el-input v-model="addressNumber" placeholder="请输入门店" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'addressNumber')"></el-input>
				</div>
				<div class="search-item">
					<span>门店名称：</span>
					<el-input v-model="deliverRestName" placeholder="请输入门店" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'deliverRestName')"></el-input>
				</div>
				<div class="search-item">
					<span>联系人&#x3000;：</span>
					<el-input v-model="consigneeName" placeholder="请输入联系人" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'consigneeName')"></el-input>
				</div>
				<div class="search-item">
					<span>电&#x3000;话&#x3000;：</span>
					<el-input v-model="consigneePhone" placeholder="请输入电话" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'consigneePhone')"></el-input>
				</div>
				<div class="search-item">
					<span>菜&#x3000;名&#x3000;：</span>
					<el-input v-model="productName" placeholder="请输入菜名" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'productName')"></el-input>
				</div>
				<br>
				<div class="search-item" style="height: 40px;line-height: 40px;margin-right: 80px;">
					<span >订单状态：</span>
					<el-checkbox-group v-model="statusIds" class="mg_right1 ">
						<el-checkbox label="1" name="statusIds">已接单</el-checkbox>
						<el-checkbox label="2" name="statusIds">已终止</el-checkbox>
						<el-checkbox label="3" name="statusIds">已完成</el-checkbox>
					</el-checkbox-group>
				</div>
				<div class="search-item" style="height: 40px;line-height: 40px;">
					<span >地址状态：</span>
					<el-checkbox-group v-model="addressIsConfirmeds" class="mg_right1 ">
						<el-checkbox label="1" name="addressIsConfirmeds">未确认</el-checkbox>
						<el-checkbox label="2" name="addressIsConfirmeds">已确认</el-checkbox>
					</el-checkbox-group>
				</div>
				<br>
				<div class="search-item mg_right1">
					<el-button type="primary" @click="serchKey()">搜索</el-button>
				</div>
				<div class="search-item mg_right1">
					<el-button type="primary" @click="exportOrders()" v-if="isAdmin||permission.indexOf('permission2_1_2')>-1">导出配送单</el-button>
				</div>
			</div>
			<div v-loading="isloading" style="min-height: 100px;">
				<div class="ordertable" v-show="isClick!=0" style="max-width:1800px;overflow: auto;" id="content">
					<table class="table">
						<thead>
							<tr>
								<td style="width: 120px;">
									<input id="quan" type="checkbox" @click="checkedAll($event)">订单号
								</td>
								<td style="width: 53px;">菜名</td>
								<td style="width: 43px;">规格</td>
								<td style="width: 43px;">用量</td>
								<td style="width:80px;">数量1</td>
								<td style="width:80px;">数量2</td>
								<td style="width:54px;">单价</td>
								<td style="width:54px;">进价</td>
								<td style="width:66px;">金额</td>
								<td style="width:66px;">成本</td>
								<td style="width:43px;">满减</td>
								<td style="width:43px;">积分</td>
								<td style="width:65px;">其他优惠</td>
								<td style="width:66px;">实际支付</td>
								<td style="width:60px;">收益</td>
								<td style="width:109px;">门店</td>
								<td style="width:73px;">地址</td>
								<td style="width:54px;">联系人</td>
								<td style="width:87px;">电话</td>
								<td style="width:66px;">下单时间</td>
								<td style="width:65px;">配送日期</td>
								<td style="width:65px;">配送时段</td>
								<td style="width:43px;">订单</td>
								<td style="width:57px;">地址确认</td>
								<td style="width:57px;">支付状态</td>
								<td style="width:65px;">订单状态</td>
								<td>备注</td>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(itemaa,indexaa) in everyDeliverDateTotal" :key="indexaa" style="width: 100% !important;">
								<td colspan="27" class="noborder">
									<table style="width:100%;">
										<tbody>
											<tr style="width: 100% !important; background:#FEB500;">
												<td style="width:259px;" class="noborderleft nobordertop" colspan="4">{{itemaa.deliverDate==undefined?'':itemaa.deliverDate}}合计</td>
												<td style="width:80px;" class="nobordertop">{{itemaa.number1==undefined?'':itemaa.number1}}</td>
												<td style="width:80px;" class="nobordertop">{{itemaa.number2==undefined?'':itemaa.number2}}</td>
												<td style="width:54px;" class="nobordertop">{{itemaa.price1==undefined?'':itemaa.price1.toFixed(2)}}</td>
												<td style="width:54px;" class="nobordertop">{{itemaa.price0==undefined?'':itemaa.price0.toFixed(2)}}</td>
												<td style="width:66px;" class="nobordertop">{{itemaa.amountOfMoney==undefined?'':itemaa.amountOfMoney.toFixed(2)}}</td>
												<td style="width:66px;" class="nobordertop">{{itemaa.cost==undefined?'':itemaa.cost}}</td>
												<td style="width:43px;" class="nobordertop">{{itemaa.fullReduction==undefined?'':itemaa.fullReduction.toFixed(2)}}</td>
												<td style="width:43px;" class="nobordertop">{{itemaa.integralReduction==undefined?'':itemaa.integralReduction.toFixed(2)}}</td>
												<td style="width:65px;" class="nobordertop">{{itemaa.otherDiscount==undefined?'':itemaa.otherDiscount.toFixed(2)}}</td>
												<td style="width:66px;" class="nobordertop">{{itemaa.actualPay==undefined?'':itemaa.actualPay.toFixed(2)}}</td>
												<td style="width:60px;" class="nobordertop">{{itemaa.profit==undefined?'':itemaa.profit.toFixed(2)}}</td>
												<td style="width:109px;" class="nobordertop">{{itemaa.addressCount==undefined?'':itemaa.addressCount}}</td>
												<td class=" nobordertop " colspan="6" style="width:410px"></td>
												<td style="width:43px;" class="nobordertop">{{itemaa.orderCount==undefined?'':itemaa.orderCount}}</td>
												<td class="nobordertop" style="width:57px;"></td>
												<td class="nobordertop" style="width:57px;"></td>
												<td class="nobordertop" style="width:65px;"></td>
												<td class="nobordertop noborderright" style="width:120px;"></td>
											</tr>

											<tr v-for="(itema,indexa) in orderList[indexaa]" :key="indexa">
												<td colspan="27" class="noborder">
													<table>
														<tbody>
															<tr v-for="(itemb,indexb) in itema.productDetailList" :key="indexb" class="lineheight">
																<td v-if="indexb==0" :rowspan="itema.productDetailList.length" v-show="indexb==0" style="border: 0;width: 120px ;"
																 :class="{nobordertop:indexb==0}">
																	<input class="checkItem" type="checkbox" :value="itema.id" v-model="checkboxList" @change="singleChecked">{{itema.orderDisplayId}}
																</td>
																<td style="width: 53px;" :class="{nobordertop:indexb==0}">{{itemb.productName==undefined?'':itemb.productName}}</td>
																<td style="width: 43px;" :class="{nobordertop:indexb==0}">{{itemb.measureUnit1An2Relation==undefined?'':itemb.measureUnit1An2Relation+''+itemb.price1MeasureUnit+'/'+itemb.price2MeasureUnit}}</td>
																<td style="width: 43px;" :class="{nobordertop:indexb==0}">{{itemb.consumption==undefined?'':itemb.consumption.toFixed(2)}}</td>
																<td style="width:80px;" :class="{nobordertop:indexb==0}">{{itemb.quantity==undefined?'':itemb.quantity+itemb.price1MeasureUnit}}</td>
																<td style="width:80px;" :class="{nobordertop:indexb==0}">{{itemb.number2==undefined?'':itemb.number2+itemb.price2MeasureUnit}}</td>
																<td style="width:54px;" :class="{nobordertop:indexb==0}">{{itemb.price1==undefined?'':itemb.price0.toFixed(2)+'元/'+itemb.price1MeasureUnit}}</td>
																<td style="width:54px;" :class="{nobordertop:indexb==0}">{{itemb.price0==undefined?'':itemb.price0.toFixed(2)+'元/'+itemb.price0MeasureUnit}}</td>
																<td style="width:66px;" :class="{nobordertop:indexb==0}">{{itemb.amountOfMoney==undefined?'':itemb.amountOfMoney.toFixed(2)}}</td>
																<td style="width:66px;" :class="{nobordertop:indexb==0}">{{itemb.cost==undefined?'':itemb.cost}}</td>
																<td style="width:43px;" :class="{nobordertop:indexb==0}">{{itemb.fullReduction==undefined?'':itemb.fullReduction.toFixed(2)}}</td>
																<td style="width:43px;" :class="{nobordertop:indexb==0}">{{itemb.integralReduction==undefined?'':itemb.integralReduction.toFixed(2)}}</td>
																<td style="width:65px;" :class="{nobordertop:indexb==0}">{{itemb.otherDiscount==undefined?'':itemb.otherDiscount.toFixed(2)}}</td>
																<td style="width:66px;" :class="{nobordertop:indexb==0}">{{itemb.actualPay==undefined?'':itemb.actualPay.toFixed(2)}}</td>
																<td style="width:60px;" :class="{nobordertop:indexb==0}">{{itemb.profit==undefined?'':itemb.profit.toFixed(2)}}</td>
																<td style="width:109px;" :class="{nobordertop:indexb==0}" v-if="indexb==0" :rowspan="itema.productDetailList.length">{{itema.addressNumber==undefined?'':(itema.deliverRestName==undefined?'':itema.deliverRestName)+'('+itema.addressNumber+')'}}</td>
																<td style="width:73px;" :class="{nobordertop:indexb==0}" v-if="indexb==0" :rowspan="itema.productDetailList.length">{{itema.deliverAddress==undefined?'':itema.deliverAddress}}</td>
																<td style="width:54px;" :class="{nobordertop:indexb==0}" v-if="indexb==0" :rowspan="itema.productDetailList.length">{{itema.consigneeName==undefined?'':itema.consigneeName}}</td>
																<td style="width:87px;" :class="{nobordertop:indexb==0}" v-if="indexb==0" :rowspan="itema.productDetailList.length">{{itema.consigneePhone==undefined?'':itema.consigneePhone}}</td>
																<td style="width:66px;" :class="{nobordertop:indexb==0}" v-if="indexb==0" :rowspan="itema.productDetailList.length">{{itema.createDate==undefined?'':itema.createDate|zhDatetime1}}</td>
																<td style="width:65px;" :class="{nobordertop:indexb==0}" v-if="indexb==0" :rowspan="itema.productDetailList.length">{{itema.requireDeliverOnDate==undefined?'':itema.requireDeliverOnDate}}</td>
																<td style="width:65px;" :class="{nobordertop:indexb==0}" v-if="indexb==0" :rowspan="itema.productDetailList.length">{{itema.requireDeliverOntime==undefined?'':itema.requireDeliverOntime}}</td>
																<td style="width:43px;" :class="{nobordertop:indexb==0}" v-if="indexb==0" :rowspan="itema.productDetailList.length">{{itema.orderCount==undefined?'':itema.orderCount}}</td>
																<td style="width:57px;" :class="{nobordertop:indexb==0}" v-if="indexb==0" :rowspan="itema.productDetailList.length">{{ itema.addressisConfirmed==undefined?'':itema.addressisConfirmed|is01choice}}</td>
																<td style="width:57px;" :class="{nobordertop:indexb==0}" v-if="indexb==0" :rowspan="itema.productDetailList.length">
																	<el-select v-model="itema.payStatus" class="select-input" size="small" style="border: 0;" v-if="isAdmin||permission.indexOf('permission2_1_3')>-1">
																		<el-option label="是" value="1"></el-option>
																		<el-option label="否" value="0"></el-option>
																	</el-select>
																	<span v-else>{{ itema.payStatus==undefined?'':itema.payStatus|is01choice}}</span>
																</td>
																<td style="width:65px;" :class="{nobordertop:indexb==0}" v-if="indexb==0" :rowspan="itema.productDetailList.length">
																	<el-select v-model="itema.statusId" class="select-input" size="small" v-if="isAdmin||permission.indexOf('permission2_1_3')>-1">
																		<el-option label="已接单" value="1"></el-option>
																		<el-option label="已终止" value="2"></el-option>
																		<el-option label="已完成" value="3"></el-option>
																	</el-select>
																	<span v-else>{{ itema.statusId==undefined?'':itema.statusId|statusIdFormat}}</span>
																</td>
																<td :class="{nobordertop:indexb==0}" v-if="indexb==0" :rowspan="itema.productDetailList.length">
																	<el-input type="textarea" v-model="itema.remark" maxlength="100" size="small" v-if="isAdmin||permission.indexOf('permission2_1_3')>-1"></el-input>
																	<span v-else>{{itema.remark}}</span>
																	<el-button size="mini" type="primary" @click="updateOrder(itema.id,itema.payStatus,itema.statusId,itema.remark)"
																	 v-if="isAdmin||permission.indexOf('permission2_1_3')>-1">保存</el-button>
																</td>
															</tr>
															<tr>
																<td colspan="4" class="colspan4">本单合计</td>
																<td>{{itema.currentOrderTotal.number1==undefined?'':itema.currentOrderTotal.number1}}</td>
																<td>{{itema.currentOrderTotal.number2==undefined?'':itema.currentOrderTotal.number2}}</td>
																<td>{{itema.currentOrderTotal.price1==undefined?'':itema.currentOrderTotal.price1.toFixed(2)}}</td>
																<td>{{itema.currentOrderTotal.price0==undefined?'':itema.currentOrderTotal.price0.toFixed(2)}}</td>
																<td>{{itema.currentOrderTotal.amountOfMoney==undefined?'':itema.currentOrderTotal.amountOfMoney.toFixed(2)}}</td>
																<td>{{itema.currentOrderTotal.cost==undefined?'':itema.currentOrderTotal.cost}}</td>
																<td>{{itema.currentOrderTotal.fullReduction==undefined?'':itema.currentOrderTotal.fullReduction.toFixed(2)}}</td>
																<td>{{itema.currentOrderTotal.integralReduction==undefined?'':itema.currentOrderTotal.integralReduction.toFixed(2)}}</td>
																<td>{{itema.currentOrderTotal.otherDiscount==undefined?'':itema.currentOrderTotal.otherDiscount.toFixed(2)}}</td>
																<td>{{itema.currentOrderTotal.actualPay==undefined?'':itema.currentOrderTotal.actualPay.toFixed(2)}}</td>
																<td>{{itema.currentOrderTotal.profit==undefined?'':itema.currentOrderTotal.profit.toFixed(2)}}</td>
																<td>{{itema.currentOrderTotal.addressCount==undefined?'':itema.currentOrderTotal.addressCount}}</td>
																<td colspan="6"></td>
																<td>{{itema.currentOrderTotal.orderCount==undefined?'':itema.currentOrderTotal.orderCount}}</td>
																<td colspan="4"></td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>

										</tbody>
									</table>
								</td>
							</tr>

						</tbody>
					</table>

				</div>
				<div class="container-content tablecontent" style="margin-top:10px;" v-show="isClick!=0">
					<el-table :data="allProductTotalByCategroyList" border style="width: 100%" :header-cell-style="{background:'#F6F6F6'}">
						<el-table-column label="序号" width="100px;">
							<template slot-scope="scope">
								<p>{{scope.$index+1}}</p>
							</template>
						</el-table-column>
						<el-table-column label="菜名">
							<template slot-scope="scope">
								<p>{{scope.row.productName}}</p>
							</template>
						</el-table-column>
						<el-table-column label="规格" width="115">
							<template slot-scope="scope">
								<p>{{scope.row.measureUnit1An2Relation}}{{scope.row.price1MeasureUnit}}/{{scope.row.price2MeasureUnit}}</p>
							</template>
						</el-table-column>
						<el-table-column label="用量">
							<template slot-scope="scope">
								<p>{{scope.row.consumption|consumptionFormat}}</p>
							</template>
						</el-table-column>
						<el-table-column label="数量1">
							<template slot-scope="scope">
								<p>{{scope.row.price1}}元/{{scope.row.price1MeasureUnit}}</p>
							</template>
						</el-table-column>
						<el-table-column label="数量2">
							<template slot-scope="scope">
								<p>{{scope.row.price1}}元/{{scope.row.price1MeasureUnit}}</p>
							</template>
						</el-table-column>
						<el-table-column label="单价">
							<template slot-scope="scope">
								<p>{{scope.row.price1}}元/{{scope.row.price1MeasureUnit}}</p>
							</template>
						</el-table-column>

						<el-table-column label="进价">
							<template slot-scope="scope">
								<p>{{scope.row.price0}}元/{{scope.row.price0MeasureUnit}}</p>
							</template>
						</el-table-column>

						<el-table-column label="金额">
							<template slot-scope="scope">
								<p>{{scope.row.amountOfMoney}}</p>
							</template>
						</el-table-column>
						<el-table-column label="成本">
							<template slot-scope="scope">
								<p>{{scope.row.cost}}</p>
							</template>
						</el-table-column>
						<el-table-column label="供应商手机号">
							<template slot-scope="scope">
								<p>{{scope.row.supplierMobileNumber}}</p>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: "positivesinglemanagement",
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
				deliverDate: [new Date()],
				deliverDate1: [],
				statusIds: [],
				addressIsConfirmeds: [],
				addressNumber:'',
				deliverRestName: '',
				consigneeName: '',
				consigneePhone: '',
				productName: '',
				orderCount: 0, //本页所有订单合计
				allProductTotalByCategroyList: [],
				checkboxList: [],
				orderList: [],
				everyDeliverDateTotal: [],
			};
		},
		watch: {
			checkboxList: {
				handler: function(val, oldVal) {
					if (this.checkboxList.length === this.orderCount) {
						document.querySelector('#quan').checked = true;
					} else {
						document.querySelector('#quan').checked = false;
					}
				},
				deep: true
			},
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
			regionIds(val) {}
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
				document.getElementById('content').style.maxHeight=document.body.clientHeight-100+'px';
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
				if (!this.deliverDate) {
					this.$toaster.error('请选择日期');
					return
				}
				if (this.cityIds == '') {
					this.$toaster.error('请选择城市');
					return
				}
				if (this.regionIds == '') {
					this.$toaster.error('请选择区域');
					return
				}
				this.getOrderList();
			},
			getOrderList() {
				this.isloading = true;
				var that = this;
				this.deliverDate.forEach((item, index) => {
					that.deliverDate1[index] = that.$utils.zhDate(item);
				});
				this.$api.ordermanagement.getOrderList(this.cityIds, this.regionIds, this.deliverDate1.join(','), this.statusIds
					.join(','), this.addressIsConfirmeds.join(','),
					this.orderDisplayId, this.deliverRestName,
					this.consigneeName, this.consigneePhone, this.productName, 0, this.addressNumber).then(res => {
					if (res.code == 200) {
						this.isClick++
						this.everyDeliverDateTotal = res.data.everyDeliverDateTotal;
						this.orderList = res.data.orderList;
						this.allProductTotalByCategroyList = res.data.allProductTotalByCategroyList;
						var orderCount = 0;
						this.orderList.forEach((item, index) => {
							item.forEach((itema, indexa) => {
								that.orderList[index][indexa].payStatus = itema.payStatus.toString();
								that.orderList[index][indexa].statusId = itema.statusId.toString();
								orderCount++
							});
						});
						this.orderCount = orderCount;
					}
					this.isloading = false;
					document.getElementById('content').style.maxHeight=document.body.clientHeight-100+'px';
				})

			},
			exportOrders() { //导出配送单
				if (this.checkboxList.join(',') == '') {
					this.$toaster.error('请选择订单');
					return
				}
				this.$api.ordermanagement.exportOrders(this.checkboxList.join(',')).then(res => {
					if (res.code == 200) {
						location.href = res.data;
					}
				})
			},
			checkedAll(e) { //全选/反选
				var checkObj = document.querySelectorAll('.checkItem');
				if (e.target.checked) { // 判定全选checkbox的勾选状态
					for (var i = 0; i < checkObj.length; i++) {
						if (!checkObj[i].checked) {
							// 将未勾选的checkbox选项push到绑定数组中
							this.checkboxList.push(checkObj[i].value.toString());
						}
					}
				} else { // 如果是去掉全选则清空checkbox选项绑定数组
					this.checkboxList = [];
				}
			},
			updateOrder(id, payStatus, statusId, remark) { //修改订单支付状态，订单状态，备注
				this.$api.ordermanagement.updateOrder(id, payStatus, statusId, remark).then(res => {
					if (res.code == 200) {
						this.$toaster.ok(res.msg)
						this.getOrderList();
					}
				})
			},
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
