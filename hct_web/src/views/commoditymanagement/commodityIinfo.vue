<template>
	<div class="container  content-padding">
		<div class="container-main">
			<div class="container-content tablecontent"  v-loading="isloading">
				<div class="tabelForm commodityIinfo" style="width:800px;">
					<el-form ref="ruleForm" :model="ruleForm" class="demo-form-inline" label-width="140px" :rules="ruleFormRules">
						<el-form-item label="日期：" prop="date" v-if="type=='1'" class="date-box">
							<el-date-picker v-model="ruleForm.date" align="right" type="date" placeholder="请选择日期" :picker-options="pickerOptions1">
							</el-date-picker>
						</el-form-item>
						<el-button type="primary" @click="getProductbtn()" class="datebtn" v-if="type=='1'">确定</el-button>
						<el-form-item label="商品类型：" prop="productType" v-if="type=='0'">
							<el-select v-model="ruleForm.productType" filterable placeholder="请选择商品类型" class="mg_right1 centerfont"
							 maxlength="50" @change="changeProductType">
								<el-option label="正常商品" value="1"></el-option>
								<el-option label="秒杀商品" value="0"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="商品名称：" prop="productName">
							<el-input v-model="ruleForm.productName" @change="filteremojifun($event,'productName','ruleForm')" maxlength="50"
							 placeholder="请输入商品名称"></el-input>
						</el-form-item>
						<el-form-item label="商品详情：" prop="productDetail">
							<el-input v-model="ruleForm.productDetail" class="min_textarea" type="textarea" @change="filteremojifun($event,'productDetail','ruleForm')"
							 maxlength="100" placeholder="请输入商品详情"></el-input>
						</el-form-item>
						<el-form-item label="商品子类型：" prop="subCategoryId">
							<el-select v-model="ruleForm.subCategoryId" filterable placeholder="请选择商品子类型" class="mg_right1 centerfont"
							 maxlength="50">
								<el-option :label="item.subCategoryName" :value="item.id.toString()" v-for="(item,index) in productSubCategorysList"
								 :key="index">
									<span>{{ item.subCategoryName }}</span>
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="城 市：" prop="cityId">
							<el-select v-model="ruleForm.cityId" filterable placeholder="请选择城市" class="mg_right1 centerfont" maxlength="50"
							 @change="changecity">
								<el-option :label="item.cityName" :value="item.id.toString()" v-for="(item,index) in cityList" :key="index">
									<span>{{ item.cityName }}</span>
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="来 源：" prop="sourceId">
							<el-select v-model="ruleForm.sourceId" filterable placeholder="请选择来源" class="mg_right1 centerfont" maxlength="50">
								<el-option :label="item.sourceName" :value="item.id.toString()" v-for="(item,index) in luSourcesList" :key="index">
									<span>{{ item.sourceName }}</span>
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="用 量：" prop="consumption">
							<el-select v-model="ruleForm.consumption" filterable placeholder="请选择用量" class="mg_right1 centerfont" maxlength="50">
								<el-option label="大" value="1"></el-option>
								<el-option label="中" value="2"></el-option>
								<el-option label="小" value="3"></el-option>
							</el-select>
						</el-form-item>
						<div class="ruleForm-innerbox">
							<el-form-item label="单位进货价：" prop="price0" class="form-left">
								<el-input-number v-model="ruleForm.price0" :controls="false" :min="0" :max="9999999" :precision="2"></el-input-number>
							</el-form-item>
							<el-form-item label="计量单位：" prop="price0MeasureUnitId" class="form-right">
								<el-select v-model="ruleForm.price0MeasureUnitId" filterable placeholder="请选择计量单位" class="mg_right1 centerfont"
								 maxlength="50">
									<el-option :label="item.measureUnitName" :value="item.id.toString()" v-for="(item,index) in priceMeasureUnitsList"
									 :key="index">
										<span>{{ item.measureUnitName }}</span>
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="单位零售价1：" prop="price1" class="form-left">
								<el-input-number v-model="ruleForm.price1" :controls="false" :min="0" :max="9999999" :precision="2"></el-input-number>
							</el-form-item>
							<el-form-item label="计量单位：" prop="price1MeasureUnitId" class="form-right">
								<el-select v-model="ruleForm.price1MeasureUnitId" filterable placeholder="请选择计量单位" class="mg_right1 centerfont"
								 maxlength="50">
									<el-option :label="item.measureUnitName" :value="item.id.toString()" v-for="(item,index) in priceMeasureUnitsList"
									 :key="index">
										<span>{{ item.measureUnitName }}</span>
									</el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="单位零售价2：" prop="price2" class="form-left">
								<el-input-number v-model="ruleForm.price2" :controls="false" :min="0" :max="9999999" :precision="2"></el-input-number>
							</el-form-item>
							<el-form-item label="计量单位：" prop="price2MeasureUnitId" class="form-right">
								<el-select v-model="ruleForm.price2MeasureUnitId" filterable placeholder="请选择计量单位" class="mg_right1 centerfont"
								 maxlength="8">
									<el-option :label="item.measureUnitName" :value="item.id.toString()" v-for="(item,index) in priceMeasureUnitsList"
									 :key="index">
										<span>{{ item.measureUnitName }}</span>
									</el-option>
								</el-select>
							</el-form-item>
						</div>
						<el-form-item label="单位换算：" prop="measureUnit1And2Relation">
							<el-input-number v-model="ruleForm.measureUnit1And2Relation" :controls="false" :min="0" :max="9999999"
							 :precision="2"></el-input-number>
						</el-form-item>
						<el-form-item label="是否促销：" prop="isPromotion" v-show="ruleForm.productType!=0">
							<el-select v-model="ruleForm.isPromotion" filterable placeholder="请选择是否促销" class="mg_right1 centerfont disabledColr"
							 maxlength="50" @change="changeIsPromotione"   >
								<el-option label="是" value="1"></el-option>
								<el-option label="否" value="0"></el-option>
							</el-select>
						</el-form-item>
						<div v-if="ruleForm.isPromotion=='1'">
							<el-form-item label="促销价1：" prop="promotionPrice1">
								<el-input-number v-model="ruleForm.promotionPrice1" :controls="false" :min="0" :max="9999999" :precision="2"></el-input-number>
							</el-form-item>
							<el-form-item label="促销价2：" prop="promotionPrice2">
								<el-input-number v-model="ruleForm.promotionPrice2" :controls="false" :min="0" :max="9999999" :precision="2"></el-input-number>
							</el-form-item>
						</div>
						<el-form-item prop="image" label="图片：">
							<el-upload class="avatar-uploader" :data="{token:token}" :action="$serverUrl+'pc/file/fileUpload'" name="fileName"
							 :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" :on-progress="avatarprogress"
							 :on-error="avatarerror">
								<div v-if="uploaderIcon" class="avatar">
									<img :src="ruleForm.image">
								</div>
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
							</el-upload>
						</el-form-item>
            <div v-if="ruleForm.productType==0">
              	<el-form-item label="库存数量：" prop="stock">
							<el-input-number v-model="ruleForm.stock" :controls="false" :min="0" :max="999" :precision="0"></el-input-number>
						</el-form-item>
            	<el-form-item label="剩余库存数量：" prop="surplusStock">
							<el-input-number v-model="ruleForm.surplusStock" :controls="false" :min="0" :max="ruleForm.stock" :precision="0"></el-input-number>
						</el-form-item>
            	<el-form-item label="最大购买数量：" prop="maxBuyNum">
							<el-input-number v-model="ruleForm.maxBuyNum" :controls="false" :min="0" :max="ruleForm.surplusStock" :precision="0"></el-input-number>
						</el-form-item>
            </div>
						<el-form-item label="排序号：" prop="ordinalNumber">
							<el-input-number v-model="ruleForm.ordinalNumber" :controls="false" :min="0" :max="999" :precision="0"></el-input-number>
						</el-form-item>
						<el-form-item label="是否激活：" prop="active">
							<el-select v-model="ruleForm.active" filterable placeholder="请选择是否激活" class="mg_right1 centerfont" maxlength="50">
								<el-option label="是" value="1"></el-option>
								<el-option label="否" value="0"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="供应商手机号：" prop="supplierMobileNumber">
							<el-input v-model="ruleForm.supplierMobileNumber" @change="filteremojifun($event,'supplierMobileNumber','ruleForm')"
							 maxlength="11" placeholder="请输入供应商手机号"></el-input>
						</el-form-item>
						<el-form-item label="供应商姓名：" prop="supplierName">
							<el-input v-model="ruleForm.supplierName" @change="filteremojifun($event,'supplierName','ruleForm')" maxlength="50"
							 placeholder="请输入供应商姓名"></el-input>
						</el-form-item>
						<el-form-item label="供应商地址：" prop="supplierAddress">
							<el-input v-model="ruleForm.supplierAddress" @change="filteremojifun($event,'supplierAddress','ruleForm')"
							 maxlength="50" placeholder="请输入供应商地址"></el-input>
						</el-form-item>
						<el-form-item label="备注：" prop="remark">
							<el-input v-model="ruleForm.remark" class="min_textarea" type="textarea" @change="filteremojifun($event,'remark','ruleForm')"
							 maxlength="100" placeholder="请输入备注"></el-input>
						</el-form-item>
					</el-form>
					<div class="confirm-box">
						<el-button type="primary" @click="confirm('ruleForm')">保 存</el-button>
						<!-- <el-button @click="close('ruleForm')">取 消</el-button> -->
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "commodityIinfo",
		data() {
			var isPhone = (rule, value, callback) => {
				//手机号验证
				if (!value) {
					return callback(new Error("请输入供应商手机号"));
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
				isloading: false,
				uploaderIcon: false,
				type: '0',
				id: '0',
				productSubCategorysList: [],
				cityList: [],
				luSourcesList: [],
				priceMeasureUnitsList: [],
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}]
				},
				ruleForm: {
					date: '',
					productType: '1',
					productName: "",
					productDetail: "",
					subCategoryId: "",
					cityId: "",
					sourceId: "",
					consumption: "",
					price0: "",
					price0MeasureUnitId: "",
					price1: '',
					price1MeasureUnitId: '',
					price2: '',
					price2MeasureUnitId: '',
					measureUnit1And2Relation: '',
					isPromotion: '0',
					promotionPrice1:undefined,
					promotionPrice2: undefined,
					image: '',
					ordinalNumber: '',
					active: '',
					supplierMobileNumber: '',
					supplierName: '',
					supplierAddress: '',
					remark: '',
          stock:'',
          surplusStock:'',
          maxBuyNum:'',
				},
				ruleFormRules: {
					productType: [{
						required: true,
						message: "请选择商品类型",
						trigger: "change"
					}],
					productName: [{
							required: true,
							message: "请输入商品名称",
							trigger: "blur"
						},
						{
							max: 50,
							message: "不超过50个字符",
							trigger: "blur"
						}
					],
					productDetail: [{
							required: true,
							message: "请输入商品详情",
							trigger: "blur"
						},
						{
							max: 100,
							message: "不超过100个字符",
							trigger: "blur"
						}
					],
					subCategoryId: [{
						required: true,
						message: "请选择商品子类型",
						trigger: "change"
					}],
					cityId: [{
						required: true,
						message: "请选择城市：",
						trigger: "change"
					}],
					sourceId: [{
						required: true,
						message: "请选择来源：",
						trigger: "change"
					}],
					consumption: [{
						required: true,
						message: "请选择用量",
						trigger: "change"
					}],
					price0: [{
						required: true,
						message: "请输入单位进货价",
						trigger: "blur"
					}, ],
					price0MeasureUnitId: [{
						required: true,
						message: "请选择单位进货价计量单位",
						trigger: "change"
					}],
					price1: [{
						required: true,
						message: "请输入单位零售价1",
						trigger: "blur"
					}, ],
					price1MeasureUnitId: [{
						required: true,
						message: "请选择单位零售价1计量单位",
						trigger: "change"
					}],
					price2: [{
						required: true,
						message: "请输入单位零售价2",
						trigger: "blur"
					}, ],
					price2MeasureUnitId: [{
						required: true,
						message: "请选择单位零售价2计量单位",
						trigger: "change"
					}],
					measureUnit1And2Relation: [{
						required: true,
						message: "请输入单位换算",
						trigger: "blur"
					}, ],
					isPromotion: [{
						required: true,
						message: "请选择是否促销",
						trigger: "change"
          }],
          promotionPrice1:[{
						required: true,
						message: "请输入促销价1",
						trigger: "change"
          }],
          promotionPrice2:[{
						required: true,
						message: "请输入促销价2",
						trigger: "change"
          }],
					image: [{
						required: true,
						message: "请上传图片",
						trigger: "blur"
					}],
					ordinalNumber: [{
						required: true,
						message: "请输入排序号",
						trigger: "blur"
          }],
					active: [{
						required: true,
						message: "请选择是否激活",
						trigger: "change"
					}],
					supplierMobileNumber: [{
						required: true,
						validator: isPhone,
						trigger: "blur"
					}],
					supplierName: [{
						required: true,
						message: "请输入供应商姓名",
						trigger: "change"
					}],
					supplierAddress: [{
						required: true,
						message: "请输入供应商地址",
						trigger: "change"
          }],
          stock: [{
						required: true,
						message: "请输入库存数量",
						trigger: "change"
          }],
          surplusStock: [{
						required: true,
						message: "请输入剩余库存数量",
						trigger: "change"
          }],
          maxBuyNum: [{
						required: true,
						message: "请输入最大购买数量",
						trigger: "change"
					}]
				}
			};
		},
		created() {
			this.type = this.$route.params.type;
			this.id = this.$route.params.id;
			this.getCitys();
			this.getLuSourcesByCityId();
			this.getProductSubCategorys();
			this.getPriceMeasureUnits();
		},
		mounted() {
			if(this.type=='1'){
				this.getProduct();
			}
		},
		methods: {
			filteremojifun(e, name, ruleForm) {
				this.$utils.filteremojifun(this, e, name, ruleForm);
      },
      changeProductType(e){//变化商品类型
       if(e==0){
					this.ruleForm.isPromotion='1';
				}else{
          this.ruleForm.isPromotion='1';
        }
      },
			changeIsPromotione(e){//变化是否促销
				if(e==0){
					this.ruleForm.promotionPrice1=undefined;
					this.ruleForm.promotionPrice2=undefined;
				}else{
          this.ruleForm.promotionPrice1=0;
					this.ruleForm.promotionPrice2=0;
        }
			},
			getProductSubCategorys() {
				//获取所有子类
				this.$api.commoditymanagement
					.getProductSubCategorys(0)
					.then(res => {
						if (res.code == 200) {
							this.productSubCategorysList = res.data;
						}
					});
			},
			getCitys() {
				//获取城市列表
				this.$api.systemmanagement.getCitys().then(res => {
					if (res.code == 200) {
						this.cityList = res.data;
					}
				});
			},
			changecity(e) {
				//选择城市事件
				this.ruleForm.sourceId = ''
				this.getLuSourcesByCityId(e);
			},
			getLuSourcesByCityId() {
				//获取来源
				if (this.ruleForm.cityId == "") {
					var cityId = 0;
				} else {
					var cityId = this.ruleForm.cityId;
				}
				this.$api.commoditymanagement.getLuSourcesByCityId(cityId).then(res => {
					if (res.code == 200) {
						this.luSourcesList = res.data;
					}
				});
			},
			getPriceMeasureUnits() { //获取所有计量单位
				this.$api.commoditymanagement.getPriceMeasureUnits().then(res => {
					if (res.code == 200) {
						this.priceMeasureUnitsList = res.data;
					}
				});
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
					this.ruleForm.image = res.data;
				} else {
					this.$toaster.error(res.msg);
				}
			},
			avatarerror(err, file, fileList) {
				// 上传图片失败
				this.uploaderIcon = false;
				this.$toaster.error("图片上传失败");
			},
			getProductbtn(){
				if(this.ruleForm.date==''){
					this.$toaster.error("请选择日期");
					return
				}
				this.getProduct();
			},
			getProduct() {
				//获取商品详情
				this.isloading=true;
				this.$api.commoditymanagement.getProduct(this.id,this.$utils.zhDate2(this.ruleForm.date)).then(res => {
					if (res.code == 200) {
						this.close('ruleForm')
            this.ruleForm.productType=res.data.productType.toString();
            if(res.data.productType==0){
                this.ruleForm.stock=res.data.stock;
                this.ruleForm.surplusStock=res.data.surplusStock;
                this.ruleForm.maxBuyNum=res.data.maxBuyNum;
            }
						this.ruleForm.productName=res.data.productName;
						this.ruleForm.productDetail=res.data.productDetail;
						this.ruleForm.subCategoryId=res.data.subCategoryId.toString();
						this.ruleForm.cityId=res.data.cityId.toString();
						this.ruleForm.sourceId=res.data.sourceId.toString();
						this.ruleForm.consumption=res.data.consumption.toString();
						this.ruleForm.price0=res.data.price0;
						this.ruleForm.price0MeasureUnitId=res.data.price0MeasureUnitId.toString();
						this.ruleForm.price1=res.data.price1;
						this.ruleForm.price1MeasureUnitId=res.data.price1MeasureUnitId.toString();
						this.ruleForm.price2=res.data.price2;
						this.ruleForm.price2MeasureUnitId=res.data.price2MeasureUnitId.toString();
						this.ruleForm.measureUnit1And2Relation=res.data.measureUnit1And2Relation;
						this.ruleForm.isPromotion=res.data.isPromotion.toString();
						if(this.ruleForm.isPromotion=='0'){
							this.ruleForm.promotionPrice1=undefined;
							this.ruleForm.promotionPrice2=undefined;
						}else{
							this.ruleForm.promotionPrice1=res.data.promotionPrice1;
							this.ruleForm.promotionPrice2=res.data.promotionPrice2;
						}
						this.uploaderIcon = true;
						this.ruleForm.image=res.data.image;
						this.ruleForm.ordinalNumber=res.data.ordinalNumber;
						this.ruleForm.active=res.data.active.toString();
						this.ruleForm.supplierMobileNumber=res.data.supplierMobileNumber;
						this.ruleForm.supplierName=res.data.supplierName;
						this.ruleForm.supplierAddress=res.data.supplierAddress;
                	this.ruleForm.remark=res.data.remark;
					}
					this.isloading=false;
				});
			},
			close(ruleForm) {
				this.$refs[ruleForm].resetFields();
			},
			confirm(ruleForm) {
				if(this.type=='0'){//新增
					this.$refs[ruleForm].validate(valid => {
						if (valid) {
							var ruleForm = this.ruleForm;
							this.$api.commoditymanagement
								.addProduct(
									ruleForm.productType,
									ruleForm.productName,
									ruleForm.productDetail,
									ruleForm.subCategoryId,
									ruleForm.cityId,
									ruleForm.sourceId,
									ruleForm.consumption,
									ruleForm.price0,
									ruleForm.price0MeasureUnitId,
									ruleForm.price1,
									ruleForm.price1MeasureUnitId,
									ruleForm.price2,
									ruleForm.price2MeasureUnitId,
									ruleForm.measureUnit1And2Relation,
									ruleForm.isPromotion,
									ruleForm.promotionPrice1,
									ruleForm.promotionPrice2,
									ruleForm.image,
									ruleForm.ordinalNumber,
									ruleForm.active,
									ruleForm.supplierMobileNumber,
									ruleForm.supplierName,
									ruleForm.supplierAddress,
                  ruleForm.remark,
                  ruleForm.stock,
                  ruleForm.surplusStock,
                  ruleForm.maxBuyNum
								)
								.then(res => {
									if (res.code == 200) {
										this.$toaster.ok(res.msg);
										this.$router.push({
											name: "CommodityManagementList"
										});
									} else {
										this.$toaster.error(res.msg);
									}
								})
								.catch(() => {});
						} else {
							// this.$toaster.error("请确认验证项格式");
							return false;
						}
					});
				}else if(this.type=='1'){
					this.$refs[ruleForm].validate(valid => {
						if (valid) {
							var ruleForm = this.ruleForm;
							this.$api.commoditymanagement
								.updateProduct(
								    this.id,
									ruleForm.date,
									ruleForm.productName,
									ruleForm.productDetail,
									ruleForm.subCategoryId,
									ruleForm.cityId,
									ruleForm.sourceId,
									ruleForm.consumption,
									ruleForm.price0,
									ruleForm.price0MeasureUnitId,
									ruleForm.price1,
									ruleForm.price1MeasureUnitId,
									ruleForm.price2,
									ruleForm.price2MeasureUnitId,
									ruleForm.measureUnit1And2Relation,
									ruleForm.isPromotion,
									ruleForm.promotionPrice1,
									ruleForm.promotionPrice2,
									ruleForm.image,
									ruleForm.ordinalNumber,
									ruleForm.active,
									ruleForm.supplierMobileNumber,
									ruleForm.supplierName,
									ruleForm.supplierAddress,
                  ruleForm.remark,
                   ruleForm.stock,
                  ruleForm.surplusStock,
                  ruleForm.maxBuyNum
								)
								.then(res => {
									if (res.code == 200) {
										this.$toaster.ok(res.msg);
										this.$router.push({
											name: "CommodityManagementList"
										});
									} else {
										this.$toaster.error(res.msg);
									}
								})
								.catch(() => {});
						} else {
							// this.$toaster.error("请确认验证项格式");
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
