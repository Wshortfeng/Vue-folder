<template>
	<div id="home">
		<img src="../assets/img/home_bg.jpg" class="home-bg">
		<div class="main" ref="main">
			<el-row :gutter="20">
				<!-- 左边 -->
				<el-col :span="7">
					<el-row>
						<el-col :span="24">
							<div class="grid-content left-top">
								<img src="../assets/img/home-logo.png">
							</div>
						</el-col>
						<el-col :span="24">
							<div class="grid-content left-center border-blue">
								<span class="horn"></span>
								<span class="horn"></span>
								<span class="horn"></span>
								<span class="horn"></span>
								<span class="title">报警总数</span>
								<p>
									<span class="mintitle">今日报警</span>
									<span class="mintitle" style="margin:0">历史报警：{{historyAlarm}}</span>
								</p>
								<div class="time-box">
									<span class="timeitem">{{todayAlarm[todayAlarm.length-4]}}</span>
									<span class="timesymbol">,</span>
									<span class="timeitem">{{todayAlarm[todayAlarm.length-3]}}</span>
									<span class="timeitem">{{todayAlarm[todayAlarm.length-2]}}</span>
									<span class="timeitem">{{todayAlarm[todayAlarm.length-1]}}</span>
								</div>
							</div>
						</el-col>
						<el-col :span="24">
							<div class="grid-content left-bottom border-blue">
								<span class="horn"></span>
								<span class="horn"></span>
								<span class="horn"></span>
								<span class="horn"></span>
								<div class="left-bottom-top">
									<span class="title">分布区域</span>
									<div id="distributionarea"></div>
								</div>
								<div class="left-bottom-bottom">
									<span class="title">报警类型</span>
									<div id="alarmtype"></div>
								</div>
							</div>
						</el-col>
					</el-row>
				</el-col>
				<!-- 中间 -->
				<el-col :span="10">
					<el-row>
						<el-col :span="24">
							<div class="grid-content  ">
								<span class="goto-btn" @click="goTo('AddCamera')">摄像机设置</span>
								<span class="home-title">湃道视觉化工智慧平台</span>
							</div>
						</el-col>
						<el-col :span="24">
							<div class="grid-content border-blue noradius">
								<span class="horn"></span>
								<span class="horn"></span>
								<span class="horn"></span>
								<span class="horn"></span>
								<span class="title">实时报警</span>
								<el-row class="video-box" ref="videobox">
									<el-col :span="24/Math.sqrt(showNum)" v-for="(item, index) in videoList" :key="index">

											<!-- <el-card style="padding:0"> -->
											    	<!-- <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="item.playerOptions"
											    	@play="onPlayerPlay($event)" @pause="onPlayerPause($event)"></video-player> -->
														<iframe :src="item" :width="itemWidth" :height="itemWidth*9/16"   scrolling="no" allowfullscreen></iframe>
											    <!-- </el-card> -->
									</el-col>
									</el-row>
							</div>
						</el-col>
						<el-col :span="24">
							<div class="grid-content border-blue center-bottom">
								<span class="horn"></span>
								<span class="horn"></span>
								<span class="horn"></span>
								<span class="horn"></span>
								<span class="title">报警发生时段</span>
								<div id="realtimealarm"></div>
							</div>
						</el-col>
					</el-row>
				</el-col>
				<!-- 右边 -->
				<el-col :span="7">
					<el-row>
						<el-col :span="24">
							<div class="grid-content right-top1">
								<span class="goto-btn" @click="goTo('CameraStatus')">状态查询</span>
								<span class="goto-btn" @click="goTo('ClothControlSetting')">布控设置</span>
								<span class="goto-btn" @click="goTo('AlarmSetting')">报警设置</span>
							</div>
						</el-col>
						<el-col :span="24">
							<div class="grid-content border-blue right-top2">
								<span class="horn"></span>
								<span class="horn"></span>
								<span class="horn"></span>
								<span class="horn"></span>
								<span class="title">历史报警</span>
								<p>
									<span class="mintitle">总告警数</span>
								</p>
								<el-row>
									<el-col :span="12" class="right-top2-left">
										<img src="../assets/img/alarm_icon.png" alt="">
										<div class="historyAlarm-box">
											<span class="historyAlarm">{{historyAlarm}}</span>
										</div>
									</el-col>
									<el-col :span="12" class="right-top2-right">
										<el-row>
											<el-col :span="12">
												<ul>
													<li><span class="mintitle">告警类型</span></li>
													<li v-for="(item,index) in alarmHistoryList" :key="index"><i></i>{{item.alarmType|alarmTypeFormat}}</li>
												</ul>
											</el-col>
											<el-col :span="12">
												<ul>
													<li><span class="mintitle">告警数量</span></li>
													<li v-for="(item,index) in alarmHistoryList" :key="index">{{item.count}}</li>
												</ul>
											</el-col>
										</el-row>
									</el-col>
								</el-row>
							</div>
						</el-col>
						<el-col :span="24">
							<div class="grid-content border-blue right-bottom1">
								<span class="horn"></span>
								<span class="horn"></span>
								<span class="horn"></span>
								<span class="horn"></span>
								<span class="title">Camera统计</span>
								<p class="mintitle-box mintitle-box1">
									<span class="mintitle">摄像机在线率</span>
									<span class="mintitle right">摄像机总数：{{cameraList.totalCamera}}</span>
								</p>
								<div class="el-progress-box">
									<el-progress v-if="cameraList.totalCamera==0" type="circle" :percentage="0" color="#12E6F2"></el-progress>
									<el-progress v-else type="circle" :percentage="(cameraList.onlineRate/cameraList.totalCamera)*100" color="#12E6F2"></el-progress>
								</div>
								<p class="mintitle-box">
									<span class="mintitle">离线摄像机：{{cameraList.offlineCamera}}</span>
								</p>
							</div>
						</el-col>
						<el-col :span="24" class="right-bottom2">
							<div class="grid-content-top">
								<img src="../assets/img/top-left.png" alt="">
								<img src="../assets/img/top-right.png" alt="">
							</div>
							<div class="grid-content alarmimagelist">
								<div class="img-box">
									<img src="../assets/img/arrow-left.png" class="left" @click="scrollTo(-1)" v-if="alarmImageList.length>4">
									<img src="../assets/img/arrow-right.png" class="right" @click="scrollTo(1)" v-if="alarmImageList.length>4">
									<div class="img-box-content" ref="scollbox">
										<div class="imgItem" v-for="(item,index) in alarmImageList" :key="index">
											<img :src="item.url" :class="{active:active==index}" @click="selectalarm(index)" @mousemove="selectalarm(index)">
										</div>
									</div>
								</div>
								<div class="warnalarm-box" v-if="alarmImageList.length>0">
									<div><span :class="{mintitle:true,redColor:alarmImageList[active].alarmColor==1,warnColor:alarmImageList[active].alarmColor==2,greenColor:alarmImageList[active].alarmColor==3}">
											<img src="../assets/img/warn1.png" v-if="alarmImageList[active].alarmColor==1">
											<img src="../assets/img/warn2.png" v-if="alarmImageList[active].alarmColor==2">
											<img src="../assets/img/warn3.png" v-if="alarmImageList[active].alarmColor==3">
											{{alarmImageList[active].alarmType|alarmTypeFormat}}</span>
									</div>
									<div>
										<span class="mintitle">{{alarmImageList[active].alarmText }}</span>
									</div>
									<div class="minsize-box">
										<span>发送人：{{alarmImageList[active].username }}&#X3000;&#X3000;&#X3000;</span>
										<span>报警时间：{{alarmImageList[active].createDate|zhDatetime}}</span>
									</div>
								</div>
							</div>
							<div class="grid-content-bottom">
								<img src="../assets/img/bottom.png" alt="">
							</div>
						</el-col>
					</el-row>
				</el-col>
			</el-row>
		</div>
		<el-dialog :visible.sync="detialPlayVideo" @close="closePlay" class="noheader" width="60%">
			<player :video-url="videoUrl" :state="state"></player>
		</el-dialog>
	</div>
</template>

<script>
	import player from "../components/player";
	var distributionarea;
	var alarmtype;
	var realtimealarm;
	var timer;
	var dataTitle = [
		"00:00",
		"01:00",
		"02:00",
		"03:00",
		"04:00",
		"05:00",
		"06:00",
		"07:00",
		"08:00",
		"09:00",
		"10:00",
		"11:00",
		"12:00",
		"13:00",
		"14:00",
		"15:00",
		"16:00",
		"17:00",
		"18:00",
		"19:00",
		"20:00",
		"21:00",
		"22:00",
		"23:00"
	];
	export default {
		name: "home",
		components: {
			player
		},
		data() {
			return {
				historyAlarm: 0,
				todayAlarm: [0, 0, 0, 0],
				alarmHistoryList: [],
				cameraList: {
					onlineRate: 0,
					totalCamera: 0,
					offlineCamera: 0
				},
				videoList: [],
				active: "0",
				showNum: 4,
				videoUrl: "",
				state: true,
				detialPlayVideo: false,
				alarmImageList: [],
				itemWidth:'',
			};
		},
		created() {
			// this.getSet();
		},
		mounted() {
			this.drawCircle(
				["越界检测", "防护检测", "工服检测"],
				[0, 0, 0],
				"报警类型",
				"alarmtype"
			);
			this.drawCircle([""], [0], "分布区域", "distributionarea");
			this.drawLine(dataTitle, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
			timer = setInterval(() => {
			this.getSet();
			  this.init();
			}, 5000);
			var that=this;
			window.onresize = function() {
				distributionarea.resize();
				alarmtype.resize();
				realtimealarm.resize();
				that.itemWidth = that.$refs.videobox.$el.clientWidth/Math.sqrt(that.showNum);
			};
		},
		destroyed() {
			clearInterval(timer);
		},
		methods: {
			goTo(name) {
				//跳转
				this.$router.push({
					name: name,
					query: {
						TYPE: "1"
					}
				});
			},
			init() {
				//初始化函数
				this.getAlarmTotal();
				this.getDistributionAreaList();
				this.getAlarmTypeList();
				this.getRealtimeAlarmList();
				this.getAlarmTimeList();
				this.getAlarmHistoryList();
				this.getCameraList();
				this.getAlarmImageList();
			},
			getAlarmTotal() {
				//报警总数
				this.$api.home.getAlarmTotal().then(res => {
					if (res.code == 200) {
						this.todayAlarm = res.data.todayAlarm.toString().split("");
						var num = this.todayAlarm.length;
						for (var i = 0; i < 4 - num; i++) {
							this.todayAlarm.unshift(0);
						}
						this.historyAlarm = res.data.historyAlarm;
					}
				});
			},
			getDistributionAreaList() {
				//获取分布区域
				this.$api.home.getDistributionAreaList().then(res => {
					if (res.code == 200) {
						if (res.data.length > 0) {
							var dataTitle = [];
							var dataArray = [];
							for (var i = 0; i < res.data.length; i++) {
								dataArray.push(res.data[i].rate);
								dataTitle.push(res.data[i].alarmAddress);
							}
							this.drawCircle(
								dataTitle,
								dataArray,
								"分布区域",
								"distributionarea"
							);
						} else {
							this.drawCircle([""], [0], "分布区域", "distributionarea");
						}
					}
				});
			},
			getAlarmTypeList() {
				//获取报警类型
				this.$api.home.getAlarmTypeList().then(res => {
					var dataTitle = ["越界检测", "防护检测", "工服检测"];
					var dataArry = [1000, 555, 999];
					this.drawCircle(dataTitle, dataArry, "报警类型", "alarmtype");
					if (res.code == 200) {
						if (res.data.length > 0) {
							var dataTitle = [];
							var dataArray = [];
							for (var i = 0; i < res.data.length; i++) {
								dataArray.push(res.data[i].rate);
								if (res.data[i].alarmType == 1) {
									dataTitle.push("越界检测");
								} else if (res.data[i].alarmType == 2) {
									dataTitle.push("防护检测");
								}
								if (res.data[i].alarmType == 3) {
									dataTitle.push("工服检测");
								}
							}
							this.drawCircle(dataTitle, dataArray, "报警类型", "alarmtype");
						} else {
							this.drawCircle(
								["越界检测", "防护检测", "工服检测"],
								[0, 0, 0],
								"报警类型",
								"alarmtype"
							);
						}
					}
				});
			},
			getRealtimeAlarmList() {
				//获取实时报警
				this.$api.home.getRealtimeAlarmList().then(res => {
					if (res.code == 200) {
						var videoList = res.data;
// 						for (var i = 0; i < videoList.length; i++) {
// 							videoList[i].playerOptions = {
// 								playbackRates: [0.7, 1.0, 1.5, 2.0],
// 								//播放速度
// 								autoplay: false, //如果true,浏览器准备好时开始回放。
// 								muted: false, // 默认情况下将会消除任何音频。
// 								loop: false, // 导致视频一结束就重新开始。
// 								preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
// 								language: "zh-CN",
// 								aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
// 								fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
// 								sources: [{
// 									type: "",
// 									src: videoList[i].alarmVideo //url地址
// 									// src: "http://www.100badou.com/123.mp4"
// 								}],
// 								poster: require("../assets/img/videoImg4.png"), //你的封面地址 //
// 								width: document.documentElement.clientWidth,
// 								notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
// 								controlBar: {
// 									timeDivider: true,
// 									durationDisplay: true,
// 									remainingTimeDisplay: false,
// 									fullscreenToggle: true //全屏按钮
// 								}
// 							};
// 						}
						this.videoList = videoList;
						this.itemWidth = this.$refs.videobox.$el.clientWidth/Math.sqrt(this.showNum)
					}
				});
			},
			getAlarmTimeList() {
				//获取报警发生时间段
				this.$api.home.getAlarmTimeList().then(res => {
					if (res.code == 200) {
						var dataArray = res.data;
						this.drawLine(dataTitle, dataArray);
					}
				});
			},
			getAlarmHistoryList() {
				//获取历史报警
				this.$api.home.getAlarmHistoryList().then(res => {
					if (res.code == 200) {
						this.alarmHistoryList = res.data.splice(0, res.data.length - 1);
					}
				});
			},
			getCameraList() {
				//获取Camera统计
				this.$api.home.getCameraList().then(res => {
					if (res.code == 200) {
						this.cameraList = res.data;
					}
				});
			},
			getAlarmImageList() {
				//获取告警图片
				this.$api.home.getAlarmImageList().then(res => {
					if (res.code == 200) {
						this.alarmImageList = res.data;
					}
				});
			},
			scrollTo(type) {
				//左右滑动
				var scrollLeft = this.$refs.scollbox.scrollLeft;
				this.$nextTick(() => {
					var step = this.$refs.scollbox.clientWidth / 4;
					if (type == -1) {
						//左滑
						if (this.active > 0) {
							if (this.active < this.alarmImageList.length - 3) {
								this.$refs.scollbox.scrollLeft = scrollLeft - step;
							}
							this.active--;
						}
					} else if (type == 1) {
						//右滑
						if (this.active < this.alarmImageList.length - 1) {
							if (this.active > 2) {
								this.$refs.scollbox.scrollLeft = scrollLeft + step;
							}
							this.active++;
						}
					}
				});
			},
			selectalarm(index) {
				//选择告警图片
				this.active = index;
			},
			getSet() {
				//获取分屏数量
				this.$api.alarmsetup.getSet().then(res => {
					if (res.code == 200) {
						this.showNum = res.data.showNum;
					}
				});
			},
			drawCircle(dataTitle, dataArray, title, chartId) {
				// 基于准备好的dom，初始化echarts实例 圆形
				var datalegendData = [];
				var dataseriesData = [];
				var sum = 0;
				for (var i = 0; i < dataTitle.length; i++) {
					var obj = {};
					obj.name = dataTitle[i];
					obj.icon = "circle";
					obj.textStyle = {
						lineHeight: 50
					};
					datalegendData.push(obj);
				}
				for (var i = 0; i < dataArray.length; i++) {
					var obj = {};
					obj.value = dataArray[i];
					obj.name = dataTitle[i];
					dataseriesData.push(obj);
					sum = sum + dataArray[i];
				}
				var option = {
					tooltip: {
						trigger: "item",
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					color: [
						"#3AA0FF",
						"#4ECB73",
						"#FBD337",
						"#F04864",
						"#975FE4",
						"#36CBCB",
						"#CEDAF8"
					],
					legend: {
						// orient: "vertical",
						bottom: 15,
						itemGap: 12,
						selectedMode: false, //取消图例上的点击事件
						data: datalegendData,
						formatter: function(name) {
							var index = dataTitle.indexOf(name);
							if (sum == 0) {
								return name + " " + 0 + "%";
							} else {
								return (
									"  " +
									name +
									" " +
									Math.round((dataArray[index] / sum) * 100) +
									"%"
								);
							}
						},
						textStyle: {
							fontSize: 12,
							color: "#ffffff"
						}
					},
					calculable: true,
					series: [{
						name: title,
						type: "pie",
						radius: ["35%", "55%"],
						center: ["50%", "35%"],
						avoidLabelOverlap: false,
						label: {
							normal: {
								show: false,
								position: "center"
							},
							emphasis: {
								show: true,
								textStyle: {
									fontSize: "12",
									fontWeight: "bold"
								}
							}
						},
						labelLine: {
							normal: {
								show: false
							}
						},
						data: dataseriesData
					}]
				};
				if (chartId == "distributionarea") {
					distributionarea = echarts.init(document.getElementById(chartId)); // 分布区域
					distributionarea.setOption(option);
				} else if (chartId == "alarmtype") {
					alarmtype = echarts.init(document.getElementById(chartId)); // 报警类型
					alarmtype.setOption(option);
				}
			},
			drawLine(dataTitle, dataArray, title) {
				realtimealarm = echarts.init(document.getElementById("realtimealarm")); //报警发生时间段
				var dataArr = [];
				for (var i = 0; i < dataArray.length; i++) {
					dataArr.push(dataArray[i].allCount);
				}
				var option = {
					tooltip: {
						trigger: "axis",
						axisPointer: {
							type: "cross"
						}
					},
					legend: {
						data: "s",
						bottom: "0",
						left: "center"
					},
					color: ["#9F7E25"],
					tooltip: {
						trigger: "axis",
						backgroundColor: "#252943",
						borderColor: "#24293F",
						borderWidth: "1",
						formatter: function(params) {
							var res =
								'<div style="color:white;text-align:center;line-height:25px;padding:8px;">';
							for (var i = 0, l = params.length; i < l; i++) {
								res += "<div>报警：" + params[i].value + "</div>";
								res +=
									"<div style='color:#2A8E65;'>越界检测：" +
									dataArray[params[i].dataIndex].transCount +
									"</div>";
								res +=
									"<div style='color:#106AB9;'>工服检测：" +
									dataArray[params[i].dataIndex].workCount +
									"</div>";
								res +=
									"<div style='color:#B5914C;'>防护检测：" +
									dataArray[params[i].dataIndex].protectCount +
									"</div>";
							}
							res += "</div>";
							return res;
						}
					},
					toolbox: {
						//					orient: 'vertical',
						right: "30",
						//					top: 'center',
						show: true,
						feature: {
							mark: {
								show: true
							}
						}
					},
					dataZoom: [{
						type: "inside"
					}],
					// dataZoom: [{
					//     startValue: '2014-06-01'
					// }, {
					//     type: 'inside'
					// }],
					calculable: true,
					xAxis: [{
						type: "category",
						boundaryGap: false,
						axisLabel: {
							//						rotate: 25,
						},
						axisTick: {
							show: false
						},
						axisLine: {
							lineStyle: {
								type: "dashed",
								color: "#10E6F1", //下面线的颜色
								width: "1" //坐标线的宽度
							}
						},
						axisLabel: {
							//y轴数据处理 科学计数法
							textStyle: {
								color: "#fff" //坐标值得具体的颜色
							}
							// interval: 0
						},
						data: dataTitle,
						splitLine: {
							show: true,
							lineStyle: {
								color: ["#40444F"],
								width: 1,
								type: "dashed"
							}
						}
					}],
					yAxis: [{
						type: "value",
						name: "报警总数",
						right: 10,
						nameTextStyle: {
							color: "#fff"
						},
						axisTick: {
							show: false
						},
						axisLine: {
							lineStyle: {
								type: "dashed",
								color: "#10E6F1", //下面线的颜色
								width: "1" //坐标线的宽度
							}
						},
						axisLabel: {
							//y轴数据处理 科学计数法
							textStyle: {
								color: "#fff" //坐标值得具体的颜色
							},
							show: true, // 默认为true
							interval: 0, // 设置x轴文本标签全部显示
							rotate: 0, //标签旋转角度，对于长文本标签设置旋转可避免文本重叠
							formatter: function(data) {
								return data;
							}
						},
						splitLine: {
							show: true,
							lineStyle: {
								color: ["#40444F"],
								width: 1,
								type: "dashed"
							}
						}
					}],
					series: [{
						name: "总量",
						type: "line",
						symbol: "emptyCircle",
						smooth: true, //这个是把线变成曲线
						itemStyle: {
							normal: {
								borderColor: "#fff",
								background: "#fff",
								areaStyle: {
									type: "default",
									opacity: 0.2
								}
							},
							emphasis: {
								label: {
									show: true
								}
							}
						},
						data: dataArr
					}]
				};
				realtimealarm.setOption(option);
			},
			onPlayerPlay(e) {
				//播放
				if (e.tech_ && e) {
					this.videoUrl = e.tech_.el_.currentSrc;
					this.state = false;
					this.detialPlayVideo = true;
				}
			},
			onPlayerPause(e) {
				//暂停
				// console.log(e)
			},
			closePlay() {
				//关闭弹框
				this.state = true;
			}
		}
	};
</script>

<style lang="scss">
	@import "src/styles/index.scss";

	// .homeScroll {
	//   background: url("../assets/img/home_bg.jpg") no-repeat !important;
	// }
	#home {
		height: 100%;

		.home-bg {
			position: absolute;
			width: 100vw;
			height: 100vh;
		}

		.main {
			height: 100%;
			background-size: cover !important;
			color: $color2;
			padding: 0 15px 0 15px;

			.grid-content {
				min-height: 5vw;
				margin-bottom: 1vw;

				.title {
					font-size: 1.3vw;
				}

				.home-title {
					font-size: 2vw;
					margin-left: 2.8vw;
				}

				.mintitle {
					color: $color7;
					font-size: 0.8vw;
					padding-left: 0.5vw;
				}

				.goto-btn {
					display: inline-block;
					border: 1px solid $color7;
					padding: 0.1vw 0.8vw 0.25vw 0.8vw;
					border-radius: 8px;
					font-size: 1.3vw;
					letter-spacing: 0.1vw;
					cursor: pointer;
					margin: 2vw 0.8vw 0 0.8vw;
					position: relative;
					top: -0.2vw;
					background: linear-gradient(to bottom,
						$background6 0%,
						$background7 100%);
				}

				.goto-btn:last-child {
					margin-right: 0;
				}
			}

			.border-blue {
				border: 1px solid $borderColor1;
				border-radius: 5px;
				position: relative;
				padding: 0.6vw 0.8vw;

				.horn {
					display: inline-block;
					position: absolute;
					width: 1vw;
					height: 1vw;
					border: 2px solid $borderColor2;
				}

				.horn:first-child {
					left: -1px;
					top: -1px;
					border-right: none;
					border-bottom: none;
					border-top-left-radius: 5px;
				}

				.horn:nth-child(2) {
					right: -1px;
					top: -1px;
					border-left: none;
					border-bottom: none;
					border-top-right-radius: 5px;
				}

				.horn:nth-child(3) {
					right: -1px;
					bottom: -1px;
					border-left: none;
					border-top: none;
					border-bottom-right-radius: 5px;
				}

				.horn:nth-child(4) {
					left: -1px;
					bottom: -1px;
					border-right: none;
					border-top: none;
					border-bottom-left-radius: 5px;
				}
			}

			.noradius {
				.horn {
					border-radius: 0 !important;
				}

				.title {
					color: $color7;
				}

				height: 25.3vw;

				.video-box {
					margin-top: 0.5vw;
					height: 22.1vw;

					* {
						border-radius: 0 !important;
					}
					.el-card__body{
						padding: 0;
					}

					.video-js .vjs-big-play-button {
						width: 3vw;
						height: 3vw !important;
						line-height: 3vw;
						border-radius: 50% !important;
						margin-left: -1.5vw;
						margin-top: -1.5vw !important;
						font-size: 1.6vw;
					}

					.vjs-modal-dialog-content {
						font-size: 0.5vw;
						color: $color7;
					}

					.vjs-error .vjs-error-display::before {
						font-size: 1.6vw;
					}

					.vjs-loading-spinner {
						border-radius: 25px !important;
					}

				}
			}

			.left-top {
				padding: 1vw 0 0 0;
				margin-right: 0.7vw;

				img {
					width: 72%;
				}
			}

			.left-center {
				margin-right: 0.7vw;

				.mintitle {
					margin-right: 8vw;
				}

				.time-box {
					margin-top: 1.8vw;
					margin-bottom: 1vw;

					.timeitem {
						text-align: center;
						line-height: 3.8vw;
						font-size: 2vw;
						background: $background7;
						display: inline-block;
						width: 3.8vw;
						height: 3.8vw;
						margin-right: 0.8vw;
					}

					.timesymbol {
						margin-right: 0.8vw;
						line-height: 3.8vw;
						font-size: 2vw;
					}
				}
			}

			.left-bottom {
				margin-right: 0.7vw;
				height: 27.6vw;
        	margin-bottom: 0.5vw;
				#distributionarea,
				#alarmtype {
					width: 100%;
					height: 12vw;
				}

				.left-bottom-bottom {
					.title {
						margin-top: 1vw;
					}
				}

				padding-bottom: 0.5vw;
			}

			.center-bottom {
				height: 13.7vw;
        	margin-bottom: 0.5vw;
				#realtimealarm {
					width: 100%;
					height: 90%;
				}
			}

			.right-top1 {
				margin-left: 0.7vw;
			}

			.right-top2 {
				margin-left: 0.7vw;
				height: 13vw;

				.right-top2-left {
					text-align: center;

					img {
						width: 30%;
					}

					.historyAlarm-box {
						margin-top: 0.5vw;

						.historyAlarm {
							color: red;
							font-size: 1.5vw;
						}
					}
				}

				.right-top2-right {
					.mintitle {
						padding: 0;
						text-align: center;
						line-height: 2vw;
					}

					li {
						i {
							display: inline-block;
							width: 0.5vw;
							height: 0.5vw;
							margin-right: 0.4vw;
						}

						text-align: center;
						font-size: 0.8vw;
						line-height: 1.7vw;
					}

					li:nth-child(2) {
						i {
							background: #4489ca;
						}
					}

					li:nth-child(3) {
						i {
							background: #ae5da0;
						}
					}

					li:nth-child(4) {
						i {
							background: #f29c9f;
						}
					}
				}
			}

			.right-bottom1 {
				margin-left: 0.7vw;
				height: 12vw;

				.mintitle-box {
					margin: 0;
					position: relative;

					.right {
						position: absolute;
						right: 3vw;
					}
				}

				.mintitle-box1 {
					margin-top: 0.5vw;
				}

				.el-progress-box {
					text-align: center;

					.el-progress-circle {
						width: 6vw !important;
						height: 6vw !important;
					}

					.el-progress__text {
						color: $color7;
						font-size: 2vw !important;
					}
				}
			}

			.right-bottom2 {
				.grid-content-top {
					position: relative;

					img:first-child {
						width: 2vw;
					}

					img:last-child {
						width: 15vw;
						position: absolute;
						right: 0;
					}
				}

				.grid-content-bottom {
					position: relative;

					img {
						width: 97%;
						position: absolute;
						right: 0;
					}
				}

				.alarmimagelist {
					margin-bottom: 0.5vw;
					margin-left: 0.7vw;
					height: 9.35vw;
					border: 1px solid $color7;

					.img-box {
						height: 4vw;
						padding: 0.5vw 1.2vw 0.2vw 1.2vw;
						position: relative;

						.img-box-content {
							white-space: nowrap;
							overflow: hidden;
							width: 100%;

							.imgItem {
								display: inline-block;
								overflow: hidden;
								width: 23%;
								margin: 0 1% 0 1%;
								height: 3.7vw;
								cursor: pointer;

								img {
									width: 100%;
									max-height: 100%;
								}
							}

							img.active {
								border: 1px solid $color2;
							}
						}

						.left {
							position: absolute;
							width: 0.6vw;
							left: 0.4vw;
							top: 1.6vw;
							cursor: pointer;
							z-index: 1111;
						}

						.right {
							position: absolute;
							width: 0.6vw;
							right: 0.4vw;
							top: 1.6vw;
							cursor: pointer;
							z-index: 1111;
						}
					}

					.mintitle {
						padding-left: 1vw;
					}

					.greenColor {
						color: $color4;
					}

					.warnColor {
						color: $color6;
					}

					.redColor {
						color: $color6;
					}

					.redColor,
					.greenColor,
					.warnColor {
						padding-left: 1vw;

						img {
							width: 1.2vw;
							margin-right: 0.2vw;
							position: relative;
							top: 0.08vw;
						}
					}

					.warnalarm-box {
						margin-top: 0.5vw;

						.minsize-box {
							padding-left: 1vw;
							font-size: 0.73vw;
							line-height: 180%;
						}
					}
				}
			}
		}
	}

	.noheader {
		.el-dialog__header {
			padding: 0;
		}

		.el-dialog__headerbtn {
			display: none;
		}

		.el-dialog__body {
			padding: 0.8vw;

			.video-js .vjs-big-play-button {
				width: 3vw;
				height: 3vw !important;
				line-height: 3vw;
				border-radius: 50%;
				margin-left: -1.5vw;
				margin-top: -1.5vw !important;
				font-size: 1.6vw;
			}

			.vjs-modal-dialog-content {
				font-size: 0.5vw;
				color: $color7;
			}

			.vjs-error .vjs-error-display::before {
				font-size: 1.6vw;
			}
		}
	}

	@media screen and (max-width: 1500px) {

		//1500
		#home {
			.main {
				.grid-content {
					.goto-btn {
						margin: 2vw 0.7vw 0 0.7vw;
					}
				}

				.center-bottom {
					height: 16.3vw;
				}

				.right-bottom1 {
					height: 13.5vw;
				}

				.right-bottom2 {
					.alarmimagelist {
						height: 9.5vw;
					}
				}
			}
		}
	}

	@media screen and (max-width: 1300px) {

		//1300
		#home {
			.main {
				.grid-content {
					.goto-btn {
						margin: 2vw 0.6vw 0 0.6vw;
					}
				}

				.center-bottom {
					height: 16.6vw;
				}
			}
		}
	}
  	@media screen and (max-width: 1201px) {

		//1200
		#home {
			.main {
				.grid-content {
					.goto-btn {
						margin: 2vw 0.6vw 0 0.6vw;
					}
				}

				.left-bottom {
					height: 27.3vw ;
				}
        	.center-bottom {
					height: 14.5vw;
				}
        .right-top2{
          height: 13.5vw;
        }
        .right-bottom1{
          height: 12vw;
        }
			}
		}
	}

	@media screen and (max-width: 1000px) {

		//1000
		#home {
			.main {
				.grid-content {
					.goto-btn {
						margin: 2vw 0.5vw 0 0.5vw;
					}
				}

				.center-bottom {
					height: 17vw;
				}
			}
		}
	}
</style>
