<template>
	<div class="container  content-padding">
		<div class="container-main">
			<div class="search-box">
				<div class="search-item">
					<span>标题：</span>
					<el-input v-model="title" placeholder="请输入标题" class="keyword mg_right1" maxlength="50" @change="filteremojifun($event,'title')"></el-input>
				</div>
				<div class="search-item">
					<span>类型：</span>
					<el-select v-model="type" filterable placeholder="请选择类型" class="mg_right1 " maxlength="50">
						<el-option label="全部" value=""></el-option>
						<el-option label="PC" value="0"></el-option>
						<el-option label="门店" value="1"></el-option>
						<el-option label="商户" value="2"></el-option>
						<!-- <el-option label="APP" value="2"></el-option> -->
					</el-select>
				</div>
				<div class="search-item">
					<span>创建时间：</span>
					<el-date-picker class="mg_right1" v-model="dateRange" type="daterange" align="right" unlink-panels range-separator="至"
					 start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"  >>
					</el-date-picker>
				</div>
				<div class="search-item">
					<el-button type="primary" @click="serchKey">搜索</el-button>
				</div>
			</div>
			<div class="container-content tablecontent">
				<el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#F6F6F6'}" v-loading="isloading">
					<el-table-column label="序号" width="100px;">
						<template slot-scope="scope">
							<p>{{scope.$index+1+(currentPage-1)*pagesize}}</p>
						</template>
					</el-table-column>
					<el-table-column label="标题">
						<template slot-scope="scope">
							<p>{{scope.row.title}}</p>
						</template>
					</el-table-column>
					<el-table-column label="内容">
						<template slot-scope="scope">
							<el-popover trigger="hover" placement="top-start" :content="scope.row.content">
								<p slot="reference">{{scope.row.content}}</p>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column label="类型" width="100">
						<template slot-scope="scope">
							<p>{{scope.row.type|logType}}</p>
						</template>
					</el-table-column>
					<el-table-column label="创建时间" width="180">
						<template slot-scope="scope">
							<p>{{scope.row.createDate|zhDatetime}}</p>
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
		name: "systemLog",
		data() {
			return {
				isloading: true,
				currentPage: 1, //初始页
				pagesize: 15, //    每页的数据
				total: 0, //总数
				tableData: [],
				title: "",
				type: "",
				dateRange: ["", ""],
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
				}
			};
		},
		watch: {
			type() {
				this.serchKey();
			},
			dateRange() {
				this.serchKey();
			}
		},
		created() {},
		mounted() {
			this.getLogList();
		},
		methods: {
			filteremojifun(e, name, ruleForm) {
				this.$utils.filteremojifun(this, e, name, ruleForm);
			},
			serchKey() {
				this.currentPage = 1;
				this.getLogList();
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				this.getLogList();
			},
			getLogList() {
				this.isloading = true;
				if (this.dateRange == undefined || this.dateRange == null || this.dateRange[0] == '') {
					var startDate = undefined;
					var endDate = undefined;
				} else {
					var startDate = this.$utils.zhDate(this.dateRange[0]);
					console.log(this.$utils.zhDatetime(this.dateRange[0]),this.$utils.zhDatetime(this.dateRange[1]))
					var endDate = this.$utils.zhDate(this.dateRange[1]);
				}
				this.$api.systemmanagement
					.getLogList(
						this.currentPage,
						this.pagesize,
						this.title,
						this.type,
						startDate,
						endDate
					)
					.then(res => {
						if (this.currentPage != 1 && res.data.length == 0) {
							this.currentPage = this.currentPage - 1;
							this.getLogList();
						} else {
							this.total = res.pageInfo.total;
							this.tableData = res.data;
						}
						this.isloading = false;
					});
			}

		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
