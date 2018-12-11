<template>
	<div class="container  content-padding">
		<div class="container-main">
			<div class="search-box">
				<div class="search-item">
					<span>大类名称：</span>
					<el-select v-model="categoryId" filterable placeholder="请选择大类" class="mg_right1 centerfont" maxlength="50">
						<el-option label="全部" value=""></el-option>
						<el-option :label="item.categoryName" :value="item.id.toString()" v-for="(item,index) in productCategorysList"
						 :key="index">
							<span>{{ item.categoryName }}</span>
						</el-option>
					</el-select>
				</div>
				<div class="search-item">
					<span>子类名称：</span>
					<el-input v-model="subCategoryName" placeholder="请输入子类名称" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'subCategoryName')"></el-input>
				</div>
				<div class="search-item">
					<span>是否激活：</span>
					<el-select v-model="active" filterable placeholder="请选择" class="mg_right1 min_width" maxlength="50">
						<el-option label="全部" value=""></el-option>
						<el-option label="是" value="1"></el-option>
						<el-option label="否" value="0"></el-option>
					</el-select>
				</div>
				<div class="search-item mg_right1">
					<el-button type="primary" @click="serchKey()">搜索</el-button>
				</div>
				<div class="search-item">
					<el-button type="primary" @click="show('addeditbox',0)" v-if="isAdmin||permission.indexOf('permission1_3_2')>-1">新增</el-button>
				</div>
			</div>
			<div class="container-content tablecontent">
				<el-table :data="tableData" border :header-cell-style="{background:'#F6F6F6'}" v-loading="isloading">
					<el-table-column label="序号" width="50px;">
						<template slot-scope="scope">
							<p>{{scope.$index+1+(currentPage-1)*pagesize}}</p>
						</template>
					</el-table-column>
					<el-table-column label="大类名称">
						<template slot-scope="scope">
							<p>{{scope.row.categoryName }}</p>
						</template>
					</el-table-column>
					<el-table-column label="子类名称">
						<template slot-scope="scope">
							<p>{{scope.row.subCategoryName }}</p>
						</template>
					</el-table-column>
					<el-table-column label="是否激活">
						<template slot-scope="scope">
							<p>{{scope.row.active|is01choice}}</p>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="150px" fixed="right">
						<template slot-scope="scope">
							<el-button size="mini" type="primary" @click="operation(scope.row.id,'edit')" v-if="isAdmin||permission.indexOf('permission1_3_3')>-1">修改</el-button>
							<el-button size="mini" type="danger" @click="operation(scope.row.id,'del')" v-if="isAdmin||permission.indexOf('permission1_3_4')>-1">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange"
				 :current-page="currentPage" :page-size="pagesize" :total="total">
				</el-pagination>
			</div>
		</div>
		<!-- 新增修改子类 -->
		<el-dialog :visible.sync="showaddeditbox" :title="showaddeditboxtitle" width="550px" class="addeditbox" center style="padding:20px 20px;"
		 @close="close('addeditbox')">
			<el-form ref="addeditbox" :model="addeditbox" class="demo-form-inline" :rules="addeditboxRules" label-width="110px">
				<el-form-item prop="categoryId" label="大类名称：">
					<el-select v-model="addeditbox.categoryId" filterable placeholder="请选择大类" class="mg_right1 centerfont" maxlength="50">
						<el-option :label="item.categoryName" :value="item.id.toString()" v-for="(item,index) in productCategorysList"
						 :key="index">
							<span>{{ item.categoryName }}</span>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item prop="subCategoryName" label="子类名称：">
					<el-input v-model="addeditbox.subCategoryName" placeholder="请输入子类名称" maxlength="50" @change="filteremojifun($event,'categoryName','addeditbox')"></el-input>
				</el-form-item>
				<el-form-item prop="image" label="图片：">
					<el-upload class="avatar-uploader" :data="{token:token}" :action="$serverUrl+'pc/file/fileUpload'" name="fileName"
					 :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-progress="avatarprogress"
					 :on-error="avatarerror">
						<div v-if="uploaderIcon" class="avatar">
							<img :src="addeditbox.image">
						</div>
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				</el-form-item>
				<el-form-item label="是否激活：" prop="active">
					<el-radio-group v-model="addeditbox.active">
						<el-radio label="1">是</el-radio>
						<el-radio label="0">否</el-radio>
					</el-radio-group>
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
		name: "commoditySubclass",
		data() {
			return {
				isloading: true,
				uploaderIcon: false,
				subCategoryName: "",
				categoryId: "",
				productCategorysList: [],
				active: "",
				currentPage: 1, //初始页
				pagesize: 11, //    每页的数据
				total: 0, //总数
				tableData: [],
				showaddeditbox: false,
				showaddeditboxtitle: "新增大类",
				addeditbox: {
					subCategoryName: "",
					image: "",
					active: "0",
					categoryId: ""
				},
				addeditboxRules: {
					subCategoryName: [{
						required: true,
						message: "请输入子类名称",
						trigger: "blur"
					}],
					image: [{
						required: true,
						message: "请上传图片",
						trigger: "blur"
					}],
					active: [{
						required: true,
						message: "请选择是否激活",
						trigger: "change"
					}],
					categoryId: [{
						required: true,
						message: "请选择大类",
						trigger: "change"
					}]
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
			this.getProductCategorys();
		},
		mounted() {
			this.getProductSubCategoryList();
		},
		methods: {
			filteremojifun(e, name, ruleForm) {
				this.$utils.filteremojifun(this, e, name, ruleForm);
			},
			serchKey() {
				this.currentPage = 1;
				this.getProductSubCategoryList();
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				this.getProductSubCategoryList();
			},
			getProductCategorys() {
				//获取所有大类
				this.$api.commoditymanagement.getProductCategorys().then(res => {
					if (res.code == 200) {
						this.productCategorysList = res.data;
					}
				});
			},
			getProductSubCategoryList() {
				//获取子类列表
				this.$api.commoditymanagement
					.getProductSubCategoryList(
						this.currentPage,
						this.pagesize,
						this.subCategoryName,
						this.categoryId,
						this.active
					)
					.then(res => {
						if (this.currentPage != 1 && res.data.length == 0) {
							this.currentPage = this.currentPage - 1;
							this.getProductSubCategoryList();
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
					this.getProductSubCategory(id);
					this.show("addeditbox", 1, id);
				} else if (type == "del") {
					this.$confirm("是否确定删除该商品子类？", "", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}).then(res => {
						this.$api.user
							.delfun("pc/productSubCategory/deleteProductSubCategory", id)
							.then(res => {
								if (res.code == 200) {
									this.getProductSubCategoryList();
									this.$toaster.ok("删除成功");
								} else {
									this.$toaster.error(res.msg);
								}
							});
					});
				}
			},
			getProductSubCategory(id) {
				//获取商品子类详情
				this.$api.commoditymanagement.getProductSubCategory(id).then(res => {
					if (res.code == 200) {
						this.addeditbox.subCategoryName = res.data.subCategoryName;
						this.addeditbox.image = res.data.image;
						this.addeditbox.active = res.data.active.toString();
						this.addeditbox.categoryId = res.data.categoryId.toString();
					}
				});
			},
			show(ruleForm, ruleFormType, ruleFormId) {
				//开启弹框
				this["show" + ruleForm] = true;
				if (ruleFormType == 0) {
					this.showaddeditboxtitle = "新增子类";
				} else {
					this.showaddeditboxtitle = "修改子类";
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
			beforeAvatarUpload(file) {
				// 上传图片限制大小，格式
				this.uploaderIcon = false;
				const isJPG = file.type === "image/jpeg" || file.type === "image/png";
				const isLt1M = file.size / 1024 / 1024 < 1;
				if (!isJPG) {
					this.$message.error("上传图标只能是 JPG、PNG 格式");
					return false;
				}
				if (!isLt1M) {
					this.$message.error("上传图标大小不能超过 1MB");
					return false;
				}
			},
			avatarprogress(event, file, fileList) {
				// 上传图片中
				this.uploaderIcon = false;
			},
			handleAvatarSuccess(res, file) {
				// 上传图片成功
				if (res.code == 200) {
					this.$toaster.ok("图片上传成功");
					this.uploaderIcon = true;
					this.addeditbox.image = res.data;
				} else {
					this.$toaster.error(res.msg);
				}
			},
			avatarerror(err, file, fileList) {
				// 上传图片失败
				this.uploaderIcon = false;
				this.$toaster.error("图片上传失败");
			},
			confirm(ruleForm) {
				if (this.ruleFormType == 0) {
					//新增
					this.$refs[ruleForm].validate(valid => {
						if (valid) {
							var addeditbox = this.addeditbox;
							this.$api.commoditymanagement
								.addProductSubCategory(
									addeditbox.subCategoryName,
									addeditbox.categoryId,
									addeditbox.image,
									addeditbox.active
								)
								.then(res => {
									if (res.code == 200) {
										this.$toaster.ok(res.msg);
										this.getProductSubCategoryList();
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
							this.$api.commoditymanagement
								.updateProductSubCategory(
									this.ruleFormId,
									addeditbox.subCategoryName,
									addeditbox.categoryId,
									addeditbox.image,
									addeditbox.active
								)
								.then(res => {
									if (res.code == 200) {
										this.$toaster.ok(res.msg);
										this.getProductSubCategoryList();
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
