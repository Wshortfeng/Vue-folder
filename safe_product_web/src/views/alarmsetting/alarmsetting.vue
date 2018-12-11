<template>
	<div class="container  content-padding">
		<div class="container-header">
			<div class="container-header-content">
				<!-- <span class="back-box">
          <a href="javascript:;">
            <i class="el-icon-safetyproduction-fanhui"></i>
            <span>返回</span>
          </a>
        </span> -->
				<!-- <span class="conten-title">
          系统日志
        </span> -->
				<div class="header-tap">
					<el-radio-group v-model="type">
						<el-radio-button label="1">报警分屏</el-radio-button>|
						<el-radio-button label="2">告警模板</el-radio-button>
					</el-radio-group>
				</div>
			</div>
		</div>
		<div class="container-main">
			<div class="search-box">
				<div class="search-item">
					<transition name="fade" mode="out-in">
						<el-radio-group v-if="type==1">
							<el-radio-button class="nopadding"><i class="el-icon-safetyproduction-touping"></i>分屏选择</el-radio-button>
						</el-radio-group>
						<el-radio-group v-if="type==2">
							<el-radio-button><i class="el-icon-safetyproduction-touping"></i>系统告警模板</el-radio-button>|
							<el-radio-button class="grayColor" @click.native="operation('add')"><i class="el-icon-safetyproduction-add"></i>新增告警模板</el-radio-button>
						</el-radio-group>
					</transition>
				</div>
			</div>
			<div class="container-content tablecontent">
				<transition name="fade" mode="out-in">
					<div v-if="type==1" v-loading="isloading1">
						<div class="search-box">
							<div class="search-item mg_right1">
								<span>分屏数目：</span>
								<el-select v-model="number" filterable placeholder="请选择" class="min_select1" @change="changeNum">
									<el-option label="4" value="4"></el-option>
									<el-option label="9" value="9"></el-option>
									<el-option label="16" value="16"></el-option>
								</el-select>
							</div>
							<div class="search-item">
								<span>摄像机：</span>
								<el-select v-model="showDeviceIds" multiple placeholder="请选择摄像机" :multiple-limit="number" collapse-tags >
									<el-option v-for="item in cameraList" :key="item.id" :label="item.deviceName" :value="item.id" >
									</el-option>
								</el-select>
								<el-button type="primary" @click="preview" style="position:relative;right:5px;">预 览</el-button>
							</div>
							<div class="videoList">
								<el-row>
									<el-col :span="24/Math.sqrt(showNum)" v-for="(item, index) in videoList" :key="index">
										<el-card :body-style="{ padding: '0px' }">
											<img src="../../assets/img/videoImg1.png">
										</el-card>
									</el-col>
								</el-row>
								<div class="centerbox">
									<el-button type="primary" @click="saveSet">确 定</el-button>
								</div>
							</div>
						</div>
					</div>
					<div v-if="type==2" v-loading="isloading2">
						<el-table :data="tableData" border style="width: 100%" :header-cell-style="{background:'#F6F6F6'}">
							<el-table-column label="序号" width="100px;">
								<template slot-scope="scope">
									<p>{{scope.$index+1+(currentPage-1)*pagesize}}</p>
								</template>
							</el-table-column>
							<el-table-column label="告警图标">
								<template slot-scope="scope">
									<p>
										<img src="../../assets/img/warn1.png" v-if="scope.row.alarmColor==1">
										<img src="../../assets/img/warn2.png" v-if="scope.row.alarmColor==2">
										<img src="../../assets/img/warn3.png" v-if="scope.row.alarmColor==3">
									</p>
								</template>
							</el-table-column>
							<el-table-column label="告警类型">
								<template slot-scope="scope">
									<p>{{scope.row.alarmType|alarmTypeFormat}}</p>
								</template>
							</el-table-column>
							<el-table-column label="优先级">
								<template slot-scope="scope">
									<p>{{scope.row.priority|priorityFormat}}</p>
								</template>
							</el-table-column>
							<el-table-column label="告警文字">
								<template slot-scope="scope">
									<el-popover trigger="hover" placement="top-start" :content="scope.row.alarmText">
										<p slot="reference">{{scope.row.alarmText}}</p>
									</el-popover>
								</template>
							</el-table-column>
							<el-table-column label="同类报警间隔">
								<template slot-scope="scope">
									<p>{{scope.row.difIntreval}}s</p>
								</template>
							</el-table-column>
							<el-table-column label="异类报警间隔">
								<template slot-scope="scope">
									<p>{{scope.row.similarInterval}}s</p>
								</template>
							</el-table-column>
							<el-table-column label="发送人">
								<template slot-scope="scope">
									<p>{{scope.row.sendUser}}</p>
								</template>
							</el-table-column>
							<el-table-column label="操作" width="150px">
								<template slot-scope="scope">
									<el-button size="mini" type="primary" @click="operation('edit',scope.row.id)">修改</el-button>
									<el-button size="mini" type="primary" @click="operation('del',scope.row.id)">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-pagination v-show="total>0" background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange"
						 :current-page="currentPage" :page-size="pagesize" :total="total">
						</el-pagination>
					</div>
				</transition>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "alarmsetting",
		data() {
			return {
				isloading1: true,
				isloading2: true,
				currentPage: 1, //初始页
				pagesize: 9, //    每页的数据
				total: 0, //总数
				tableData: [],
				type: '',
				number: "",
				videoList: [],
				showDeviceIds:[],
				cameraList: []
			};
		},
		created() {
			this.type = this.$route.query.TYPE;
		},
		mounted() {
		},
		watch: {
			type(value) {
				this.$router.push({
					name: "AlarmSetting",
					query: {
						TYPE: value
					}
				});
				this.serchKey();
			},
		},
		methods: {
			changeNum(){//切换分屏数目
				this.showDeviceIds=[]
			},
			getDeviceChoseList(){
				//获取摄像机列表
				this.$api.alarmsetup.getDeviceChoseList().then(res => {
					if (res.code == 200) {
						this.cameraList = res.data;
						res.data.forEach((item,index)=>{
							if(item.isChose=='1'){
								this.showDeviceIds.push(item.id)
							}
						})
					}
				});
			},
			getSet() {
				//获取分屏数量
				this.$api.alarmsetup.getSet().then(res => {
					if (res.code == 200) {
						this.number = res.data.showNum;
					}
					this.preview();
					this.isloading1 = false;
				});
			},
			preview() {
				//预览
				var arr = [];
				this.showNum = this.number;
				for (var i = 0; i < this.showNum; i++) {
					arr.push({});
				}
				this.videoList = arr;
			},
			saveSet() {
				//确定分屏
				if(this.showDeviceIds.length>this.number){
					this.$toaster.error('选择的摄像机数目超过分屏数目，请重新选择');
					return
				}
				this.$api.alarmsetup.saveSet(this.number,this.showDeviceIds.join(',')).then(res => {
					if (res.code == 200) {
						this.$toaster.ok(res.msg);
					}
				});
			},
			serchKey() {
				if (this.type == 1) {
					this.getSet();
			    this.getDeviceChoseList();
				} else {
					this.currentPage = 1;
					this.getAlarmTemplateList();
				}
			},
			handleCurrentChange: function(currentPage) {
				this.currentPage = currentPage;
				this.getAlarmTemplateList();
			},
			getAlarmTemplateList() {
				//获取告警模板列表
				this.isloading2 = true;
				this.$api.alarmsetup
					.getAlarmTemplateList(this.currentPage, this.pagesize)
					.then(res => {
						if (this.currentPage != 1 && res.data.length == 0) {
							this.currentPage = this.currentPage - 1;
							this.getAlarmTemplateList();
						} else {
							this.total = res.pageInfo.total;
							this.tableData = res.data;
						}
						this.isloading2 = false;
					});
			},
			operation(type, id) {
				//操作
				if (type == "edit") {
					this.$router.push({
						name: "AddEditAlarm",
						query: {
							EDIT: true,
							WARN_ID: id
						}
					});
				} else if (type == "add") {
					this.$router.push({
						name: "AddEditAlarm",
						query: {
							EDIT: false
						}
					});
				} else if (type == "del") {
					this.$confirm("是否确定删除该告警模板？", "", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}).then(res => {
						this.$api.user
							.delfun("spAlarmTemplate/deleteAlarmTemplate", id)
							.then(res => {
								if (res.code == 200) {
									this.getAlarmTemplateList();
									this.$toaster.ok("删除成功");
								} else {
									this.$toaster.error(res.msg);
								}
							});
					});
				}
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
