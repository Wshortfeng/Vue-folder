<template>
	<div class="container  content-padding">
		<div class="container-main">
			<div class="container-content tablecontent">
				<div class="tabelForm" style="margin:50px auto;" v-loading="isloading">
					<div class="search-box">
						<div class="search-item">
							<span>城 市：</span>
							<el-select v-model="cityId" filterable placeholder="请选择城市" class="mg_right1 centerfont" maxlength="50">
								<el-option label="全部" value="0" v-if="cityList.length>1"></el-option>
								<el-option :label="item.cityName" :value="item.id.toString()" v-for="(item,index) in cityList" :key="index">
									<span>{{ item.cityName }}</span>
								</el-option>
							</el-select>
						</div>
						<div class="search-item">
							<el-button type="primary" @click="confirm">保 存</el-button>
						</div>
					</div>
					<el-tree ref="tree" :data="permissionData" show-checkbox node-key="id" :expand-on-click-node="true"
					 :default-checked-keys="checkedList" :props="defaultProps" default-expand-all>
					</el-tree>
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
			return {
				isloading: false,
				cityId: "",
				cityList: [],
				permissionData: [{
						id: "permission1_0_0",
						label: "商品管理",
						children: [{
								id: "permission1_1_0",
								label: "商品管理",
								children: [{
										id: "permission1_1_1",
										label: "查看"
									},
									{
										id: "permission1_1_2",
										label: "新增"
									},
									{
										id: "permission1_1_3",
										label: "修改"
									},
									{
										id: "permission1_1_4",
										label: "删除"
									},
									{
										id: "permission1_1_5",
										label: "保存"
									}
								]
							},
							{
								id: "permission1_2_0",
								label: "秒杀时间",
								children: [{
										id: "permission1_2_1",
										label: "查看"
									},
									{
										id: "permission1_2_2",
										label: "新增"
									},
									{
										id: "permission1_2_3",
										label: "修改"
									},
									{
										id: "permission1_2_4",
										label: "删除"
									},
								]
							},
							{
								id: "permission1_3_0",
								label: "商品子类",
								children: [{
										id: "permission1_3_1",
										label: "查看"
									},
									{
										id: "permission1_3_2",
										label: "新增"
									},
									{
										id: "permission1_3_3",
										label: "修改"
									},
									{
										id: "permission1_3_4",
										label: "删除"
									},
								]
							},
							{
								id: "permission1_4_0",
								label: "商品大类",
								children: [{
										id: "permission1_4_1",
										label: "查看"
									},
									{
										id: "permission1_4_2",
										label: "新增"
									},
									{
										id: "permission1_4_3",
										label: "修改"
									},
									{
										id: "permission1_4_4",
										label: "删除"
									},
								]
							},
						]
					},
					{
						id: "permission2_0_0",
						label: "订单管理",
						children: [{
								id: "permission2_1_0",
								label: "正单管理",
								children: [{
										id: "permission2_1_1",
										label: "查看"
									},
									{
										id: "permission2_1_2",
										label: "导出配送单"
									},
									{
										id: "permission2_1_3",
										label: "保存"
									},
								]
							},
							{
								id: "permission2_2_0",
								label: "补单管理",
								children: [{
										id: "permission2_2_1",
										label: "查看"
									},
									{
										id: "permission2_2_2",
										label: "导出配送单"
									},
									{
										id: "permission2_2_3",
										label: "保存"
									},
								]
							},
						]
					},
					{
						id: "permission3_0_0",
						label: "财务报表",
						children: [{
								id: "permission3_1_0",
								label: "门店订单汇总",
								children: [{
									id: "permission3_1_1",
									label: "查看"
								}, {
									id: "permission3_1_2",
									label: "修改退款状态"
								}]
							},
							{
								id: "permission3_2_0",
								label: "月度分析",
								children: [{
									id: "permission3_2_1",
									label: "查看"
								}, ]
							}
						]
					},
					{
						id: "permission4_0_0",
						label: "用户管理",
						children: [{
								id: "permission4_1_0",
								label: "用户管理",
								children: [{
										id: "permission4_1_1",
										label: "查看"
									},
									{
										id: "permission4_1_2",
										label: "新增"
									},
									{
										id: "permission4_1_3",
										label: "修改"
									},
									{
										id: "permission4_1_4",
										label: "删除"
									}
								]
							},
							{
								id: "permission4_2_0",
								label: "组管理",
								children: [{
										id: "permission4_2_1",
										label: "查看"
									},
									{
										id: "permission4_2_2",
										label: "新增"
									},
									{
										id: "permission4_2_3",
										label: "修改"
									},
									{
										id: "permission4_2_4",
										label: "删除"
									},
									{
										id: "permission4_2_5",
										label: "权限"
									}
								]
							}
						]
					},
					{
						id: "permission5_0_0",
						label: "系统管理",
						children: [{
								id: "permission5_1_0",
								label: "门店管理",
								children: [{
										id: "permission5_1_1",
										label: "查看"
									},
									{
										id: "permission5_1_2",
										label: "修改"
									},
								]
							},
							{
								id: "permission5_2_0",
								label: "商户管理",
								children: [{
										id: "permission5_2_1",
										label: "查看"
									},
									{
										id: "permission5_2_2",
										label: "新增"
									},
									{
										id: "permission5_2_3",
										label: "修改"
									},
									{
										id: "permission5_2_4",
										label: "删除"
									}
								]
							},
							{
								id: "permission5_3_0",
								label: "公告管理",
								children: [{
										id: "permission5_3_1",
										label: "查看"
									},
									{
										id: "permission5_3_2",
										label: "新增"
									},
									{
										id: "permission5_3_3",
										label: "修改"
									},
									{
										id: "permission5_3_4",
										label: "删除"
									}
								]
							},
							{
								id: "permission5_4_0",
								label: "用户反馈",
								children: [{
									id: "permission5_3_1",
									label: "查看"
								}, ]
							},
							{
								id: "permission5_5_0",
								label: "系统日志",
								children: [{
									id: "permission5_5_1",
									label: "查看"
								}]
							}
						]
					}
				],
				defaultProps: {
					children: "children",
					label: "label"
				},
				permission: ''
			};
		},
		created() {},
		mounted() {
			this.getCitys();
			this.getAuthGroup();
		},
		watch: {},
		methods: {
			getCitys() {
				//获取城市列表
				this.$api.systemmanagement.getCitys().then(res => {
					if (res.code == 200) {
						this.cityList = res.data;
					}
				});
			},
			confirm() {
				this.permission = this.$refs.tree.getCheckedKeys().join(",");
				this.addCityIdAndPermission();
			},
			getAuthGroup() {
				//获取角色分组详情
				this.isloading = true;
				if (this.$route.params.groupId == "") {
					return;
				}
				this.$api.user.getAuthGroup(this.$route.params.groupId).then(res => {
					if (res.code == 200) {
						if (res.data.permission) {
							this.permission = res.data.permission;
							this.$refs.tree.setCheckedKeys(this.permission.split(","));
						}
						this.cityId = res.data.cityId == undefined ? 0 : res.data.cityId.toString();
					}
					this.isloading = false;
				});
			},
			addCityIdAndPermission() {
				if (this.cityId == '') {
					this.$toaster.error('请选择城市');
					return
				}
				if (this.permission == '') {
					this.$toaster.error('请勾选管理权限');
					return
				}
				this.$api.user.addCityIdAndPermission(this.$route.params.groupId, this.cityId, this.permission).then(res => {
					if (res.code == 200) {
						if (this.$utils.getSession('GROUPID') == this.$route.params.groupId) {
							this.$confirm("您正在该用户组中，确定保存后将会重新登录？", "", {
								confirmButtonText: "确定",
								cancelButtonText: "取消",
								type: "warning"
							}).then(res => {
								this.$store.dispatch('delAllViews')
								this.$utils.delAllStorage();
								this.$utils.delAllSession();
								this.$router.push({
									name: 'Login'
								})
							});
						} else {
							this.$toaster.ok(res.msg);
							this.$router.push({
								name: 'GroupManagement'
							})
						}

					}
				});


			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	.el-tree-node__children {
		.el-tree-node__children {
			.el-tree-node {
				display: inline-block;
			}
		}
	}

	// .el-tree-node__content > .el-tree-node__expand-icon,.el-tree-node__expand-icon.expanded{
	//   display: none;
	// }
	.el-tree-node:focus>.el-tree-node__content {
		background-color: transparent !important;
	}

	.el-tree-node__content:hover {
		background-color: transparent !important;
	}

	.el-tree>.el-tree-node>.el-tree-node__content {
		font-weight: bold;
		line-height: 50px;
		height: 50px;
	}
</style>
