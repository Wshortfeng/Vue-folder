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
					<span>订单类型：</span>
					<el-select v-model="orderType" filterable placeholder="请选择订单类型" class="mg_right1 min_width2" maxlength="50" style="width: 225px;">
						<el-option label="正单" value="0"></el-option>
						<el-option label="补单" value="1"></el-option>
					</el-select>
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
				<div class="search-item">
					<span>商户姓名：</span>
					<el-input v-model="greengrocerName" placeholder="请输入商户姓名" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'greengrocerName')"></el-input>
				</div>
				<div class="search-item">
					<span>商户手机：</span>
					<el-input v-model="greengrocerPhone" placeholder="请输入商户手机号" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'greengrocerPhone')"></el-input>
				</div>
				<div class="search-item">
					<span>菜&#x3000;场&#x3000;：</span>
					<el-input v-model="vegetableMarketName" placeholder="请输入菜场" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'vegetableMarketName')"></el-input>
				</div>
				<br>
				<div class="search-item" style="height: 40px;line-height: 40px;">
					<span class=" ">订单状态：</span>
					<el-checkbox-group v-model="statusIds" style="margin-right: 80px;">
						<el-checkbox label="1" name="statusIds">已接单</el-checkbox>
						<el-checkbox label="2" name="statusIds">已终止</el-checkbox>
						<el-checkbox label="3" name="statusIds">已完成</el-checkbox>
					</el-checkbox-group>
				</div>
				<div class="search-item" style="height: 40px;line-height: 40px;">
					<span class=" ">地址状态：</span>
					<el-checkbox-group v-model="addressIsConfirmeds" class="mg_right1 ">
						<el-checkbox label="1" name="addressIsConfirmeds">未确认</el-checkbox>
						<el-checkbox label="2" name="addressIsConfirmeds">已确认</el-checkbox>
					</el-checkbox-group>
				</div>
				<br>
				<div class="search-item mg_right1">
					<el-button type="primary" @click="serchKey()">搜索</el-button>
				</div>
			</div>
			<div v-loading="isloading" style="min-height: 100px;overflow: auto;"  >
				<div class="ordertable" v-show="isClick!=0" style="min-width: 1400px;" ref="content" id="content">
					<table class="table" style="width: 100%;">
						<thead>
							<tr>
								<td :style="{width:cunputewidth(80)}">门店编号</td>
								<td :style="{width:cunputewidth(173)}">门店</td>
								<td :style="{width:cunputewidth(113)}">下单时间</td>
								<td :style="{width:cunputewidth(106)}">数量1（重量）</td>
								<td :style="{width:cunputewidth(106)}">数量2（重量）</td>
								<td :style="{width:cunputewidth(74)}">销售金额</td>
								<td :style="{width:cunputewidth(113)}">实际支付（优惠后）</td>
								<td :style="{width:cunputewidth(152)}">预约配送时间</td>
								<td :style="{width:cunputewidth(60)}">支付状态</td>
								<td :style="{width:cunputewidth(60)}">订单状态</td>
								<td :style="{width:cunputewidth(74)}">下单人</td>
								<td :style="{width:cunputewidth(99)}">下单人电话</td>
								<td :style="{width:cunputewidth(99)}">地址</td>
								<td :style="{width:cunputewidth(74)}">联系人</td>
								<td :style="{width:cunputewidth(99)}">电话</td>
								<td :style="{width:cunputewidth(60)}">退款状态</td>
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
															<tr v-for="(itema,indexa) in item.addresrOrderList" :key="indexa">
																<td :style="{width:cunputewidth(80)}" v-if="indexa==0" :rowspan="item.addresrOrderList.length">{{itema.addressNumber==undefined?'':itema.addressNumber}}</td>
																<td :style="{width:cunputewidth(173)}" v-if="indexa==0" :rowspan="item.addresrOrderList.length">{{itema.deliverRestName==undefined?'':itema.deliverRestName}}</td>
																<td :style="{width:cunputewidth(113)}">{{itema.createDate==undefined?'':itema.createDate|zhDatetime1}}</td>
																<td :style="{width:cunputewidth(106)}">{{itema.currentOrderTotal.number1==undefined?'':itema.currentOrderTotal.number1}}</td>
																<td :style="{width:cunputewidth(106)}">{{itema.currentOrderTotal.number2==undefined?'':itema.currentOrderTotal.number2}}</td>
																<td :style="{width:cunputewidth(74)}">{{itema.currentOrderTotal.amountOfMoney==undefined?'':itema.currentOrderTotal.amountOfMoney}}</td>
																<td :style="{width:cunputewidth(113)}">{{itema.currentOrderTotal.actualPay==undefined?'':itema.currentOrderTotal.actualPay}}</td>

																<td :style="{width:cunputewidth(152)}">{{itema.requireDeliverOn==undefined?'':itema.requireDeliverOn}}</td>
																<td :style="{width:cunputewidth(60)}">{{ itema.payStatus==undefined?'':itema.payStatus=='0'?'未支付':'已支付'}}</td>
																<td :style="{width:cunputewidth(60)}">{{ itema.statusId==undefined?'':itema.statusId|statusIdFormat}}</td>
																<td :style="{width:cunputewidth(74)}">{{itema.consigneeName==undefined?'':itema.consigneeName}}</td>
																<td :style="{width:cunputewidth(99)}">{{itema.consigneePhone==undefined?'':itema.consigneePhone}}</td>
																<td :style="{width:cunputewidth(99)}" v-if="indexa==0" :rowspan="item.addresrOrderList.length">{{itema.deliverAddress==undefined?'':itema.deliverAddress}}</td>
																<td :style="{width:cunputewidth(74)}" v-if="indexa==0" :rowspan="item.addresrOrderList.length">{{itema.contact==undefined?'':itema.contact}}</td>
																<td :style="{width:cunputewidth(99)}" v-if="indexa==0" :rowspan="item.addresrOrderList.length">{{itema.contactPhone ==undefined?'':itema.contactPhone }}</td>
																<td :style="{width:cunputewidth(59.5)}">
																	<div v-if="isAdmin||permission.indexOf('permission3_1_2')>-1">
																		<el-button size="mini" type="primary" @click="updateRefundStatus(itema.id,1)" v-if="itema.refundStatus==1&&itema.refundStatus">待批</el-button>
																		<el-button size="mini" type="warning" @click="updateRefundStatus(itema.id,2)" v-if="itema.refundStatus==2&&itema.refundStatus">驳回</el-button>
																		<span v-if="(itema.refundStatus==0||itema.refundStatus==3)&&itema.refundStatus">{{itema.refundStatus ==undefined?'':itema.refundStatus|refundStatusFormat}}</span>
																	</div>
																	<div v-else>
																		<span>{{itema.refundStatus ==undefined?'':itema.refundStatus|refundStatusFormat}}</span>
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
												</td>
											</tr>
											<tr v-if="item.addresrOrderList.length>1" style="background: #e2e266;color: #666;">
												<td colspan="2" :style="{width:cunputewidth(253)}">本店合计</td>
												<td :style="{width:cunputewidth(113)}">{{item.addresrOrderTotal.addressCount==undefined?'':item.addresrOrderTotal.addressCount}}</td>
												<td :style="{width:cunputewidth(106)}">{{item.addresrOrderTotal.number1==undefined?'':item.addresrOrderTotal.number1}}</td>
												<td :style="{width:cunputewidth(106)}">{{item.addresrOrderTotal.number2==undefined?'':item.addresrOrderTotal.number2}}</td>
												<td :style="{width:cunputewidth(74)}">{{item.addresrOrderTotal.amountOfMoney==undefined?'':item.addresrOrderTotal.amountOfMoney}}</td>
												<td :style="{width:cunputewidth(113)}">{{item.addresrOrderTotal.actualPay==undefined?'':item.addresrOrderTotal.actualPay}}</td>
												<td colspan="9" :style="{width:cunputewidth(775)}"></td>
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
				deliverDate: [new Date()],
				deliverDate1: [],
				statusIds: [],
				addressIsConfirmeds: [],
				addressNumber: '',
				deliverRestName: '',
				consigneeName: '',
				consigneePhone: '',
				productName: '',
				greengrocerName: '',
				greengrocerPhone: '',
				vegetableMarketName: '',
				orderType: '0',
				tableData: [],
				itemWidth:'',
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
			orderType(val) {
				// this.serchKey();
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
			var that =this;
			window.onresize=function(){
				document.getElementById('content').style.maxHeight=document.body.clientHeight-100+'px';
				that.itemWidth = that.$refs.content.clientWidth;
			}
		},
		mounted() {},
		methods: {
			filteremojifun(e, name, ruleForm) {
				this.$utils.filteremojifun(this, e, name, ruleForm);
			},
			cunputewidth(num){//计算宽度
				return this.itemWidth*num/1660+'px';
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
				this.getAddressOrderCollectList();
			},
			getAddressOrderCollectList() {
				this.isloading = true;
				var that = this;
				this.deliverDate.forEach((item, index) => {
					that.deliverDate1[index] = that.$utils.zhDate(item);
				});
				this.$api.ordermanagement.getAddressOrderCollectList(this.cityIds, this.regionIds, this.deliverDate1.join(','),
					this.statusIds
					.join(','), this.addressIsConfirmeds.join(','),
					this.orderDisplayId, this.deliverRestName,
					this.consigneeName, this.consigneePhone, this.productName,
					this.orderType, this.addressNumber, this.greengrocerName,
					this.greengrocerPhone,
					this.vegetableMarketName, ).then(res => {
					if (res.code == 200) {
						this.isClick++
						this.tableData = res.data;
					}
					console.log(document.body.clientWidth)
					if(document.body.clientWidth<1400){
						this.itemWidth = 1400;
					}else{

						this.itemWidth = this.$refs.content.clientWidth;
					}
					document.getElementById('content').style.maxHeight=document.body.clientHeight-100+'px';
					this.isloading = false;
				})
			},
			updateRefundStatus(id, type) {
				if (type == 1) {
					this.$confirm("请选择退款状态", "", {
						confirmButtonText: "同意",
						cancelButtonText: "驳回",
						type: "info",
						distinguishCancelAndClose: true,
					}).then(res => {
						this.$api.ordermanagement.updateRefundStatus(id, 3).then(res => {
							if (res.code == 200) {
								this.$toaster.ok(res.msg);
								this.getAddressOrderCollectList();
							}
						})
					}).catch(action => {
						if (action == 'cancel') {
							this.$api.ordermanagement.updateRefundStatus(id, 2).then(res => {
								if (res.code == 200) {
									this.$toaster.ok(res.msg);
									this.getAddressOrderCollectList();
								}
							})
						}

					})
				} else {
					this.$confirm("请选择退款状态", "", {
						confirmButtonText: "同意",
						cancelButtonText: "待批",
						type: "info",
						distinguishCancelAndClose: true,
					}).then(res => {
						this.$api.ordermanagement.updateRefundStatus(id, 3).then(res => {
							if (res.code == 200) {
								this.$toaster.ok(res.msg);
								this.getAddressOrderCollectList();
							}
						})
					}).catch(action => {
						if (action == 'cancel') {
							this.$api.ordermanagement.updateRefundStatus(id, 1).then(res => {
								if (res.code == 200) {
									this.$toaster.ok(res.msg);
									this.getAddressOrderCollectList();
								}
							})
						}

					})
				}
			}

		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
