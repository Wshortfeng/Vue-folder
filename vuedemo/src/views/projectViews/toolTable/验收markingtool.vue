<!--标注方工具台标注-->
<template>
	<div class="label-tool">
		<!--左侧标注工具-->
		<div class="label-tool-left">
			<div class="left-top">
				<div class="left-top-projectinfo">
					<p :class="{projectname:true,projectnamea:taskType==1}" @click="changeHeight0()">{{bzProject.projectName}}</p>
					<p v-if="taskType==2" class="projectname" @click="changeHeight0()">
						<span>{{labelProjectBatchList[0].batchNumber}}</span>
						<span>（{{labelProjectBatchList[0].batchStatus|labelbatchstate}}）</span>
					</p>
					<div class="left-top-projectlistnr">
						<div class="left-top-projectlist" style="overflow: hidden;" v-if="taskType==1">
							<el-row class="tac">
								<el-col :span="24">
									<el-menu class="el-menu-vertical-demo" background-color="#004080" text-color="#fff" active-text-color="#004080">
										<el-submenu index="1">
											<template slot="title">
												<span>{{batchLabelList.taskNumber}}</span>
												<span>（{{batchLabelList.status|batchtaskstate}}）</span>
												<a :idd="labelProjectBatchTaskId" @click="operation($event)">病历</a>
											</template>
											<el-menu-item :index="index+''" v-for="(item, index) in batchLabelList.labelList" @click="selectTaskIndex($event,index)" :key="index">● {{index|labelTaskType}}</el-menu-item>
										</el-submenu>
									</el-menu>
								</el-col>
							</el-row>
						</div>
						<div class="left-top-projectlist" v-if="taskType==2">
							<p class="rw-list" v-for="(item, index) in labelProjectBatchList" :key="index">
								<span :batchTaskId="item.batchTaskId" :imageUrl="item.imageUrl" @click="selectTask($event)">{{item.taskNumber}}</span>
								<span :batchTaskId="item.batchTaskId" :imageUrl="item.imageUrl" @click="selectTask($event)" v-if="item.batchTaskId!=selectTaskId">{{item.status|labelTaskStatus}}</span>
								<span :batchTaskId="item.batchTaskId" :imageUrl="item.imageUrl" @click="selectTask($event)" v-if="item.batchTaskId==selectTaskId">（进行中）</span>
								<a :idd="item.batchTaskId" @click="operation($event)">病历</a>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="label-tool-image label-tool-imagenot">
				<div class="imageLabel-box">
					<div class="imageLabel">
						<div class="imageLabel-img-boxs">
							<span class="imageLabel-img-body">
								<div class="imageLabel-loading-body">
									<div class="imageLabel-loading"></div>
								</div>
								<div class="imageLabel-jisuan" style="position: relative;overflow:hidden;">
									<img :src="nowImage" alt="" style="position: absolute;with:100%;height:100%;" class="imageLabel-img">
										<div class="imageLabel-content">

										</div>
								</div>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--右侧列表-->
		<div class="label-tool-right">
			<p class="right-title">已标注列表</p>
			<div class="right-listnr">
				<div class="right-list" id="right-list">
					<div class="right-list-img" v-for="(item, index) in labelIds" :key="index">
						<span class="right-list-name">{{labelNames[index].name}}</span>
						<img :src="labelNames[index].src" />
						<ul>
							<li v-for="(itema, indexa) in labelCounts[index]" :key="indexa" :labelId="item" :imageIndex="indexa">
								<el-popover placement="top" width="auto" trigger="hover" :content="itema">
									<span slot="reference">{{indexa + 1}}.{{itema}}</span>
								</el-popover>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="subitles">
				<p>字幕标注</p>
				<a class="look-answer">查看答案</a>
			</div>
		</div>
		<!--底部按钮-->
		<div class="label-tool-bottom">
			<a>通过</a>
			<a>不通过</a>
		</div>
		<el-dialog :visible.sync="dialogVisible" width="800px" center class="casedata">
			<p class="title">
				病历数据：
			</p>
			<span class="content">{{dialogcontent}}</span>
			<span slot="footer" class="dialog-footer"></span>
		</el-dialog>
	</div>
</template>
<script>
	import { imageLabel } from '../../../assets/plugg/label/scripts/jquery.imageLabel.min.js'
	export default {
		data() {
			return {
				projectLabelId: "", // 项目id
				labelProjectBatchTaskId: "", // 批次或任务id
				taskType: "", //任务类型1（任务），2（批次）
				bzProject: {}, // 项目详情
				dialogVisible: false, //病历数据详情显示
				labelProjectBatchList: [{}], // 批次的任务列表
				batchLabelList: {}, // 任务的详情，标注列表
				isNowReviewUser: "", // 判断是不是当前人审核，1是，2不是
				reviewStatus: "", // 判断当前人是否审核，1未审核，2已通过，3未通过
				isModify: "0", // 判断图片是否修改过0（未修改），1（修改过）
				selectTaskId: "", // 当前选中任务id
				selectTaskLabelId: "", // 当前选中任务标注id
				clickType: "", // 判断在图片上点击的是点，线，框类型
				title: "", // 病历数据的任务标题
				dialogcontent: "", // 病历数据的内容
				labelData: "", // 标注的数据
				src2: "http://bbsatt.iiyi.com/forum/2008/12/26/20081226_8bfd741352ca2cf4aa3fWX9S87uXcEaL.jpg",
				src4: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539757231919&di=f265670f2a24f56c4a6eae0f1775b8ce&imgtype=0&src=http%3A%2F%2Fdownza.img.zz314.com%2Fedu%2Fpc%2Ftxyy-1010%2F2017-09-28%2F8a113e3ac914fe51046a4e3ec513a677.jpg",
				nowImage: '', // 当前标注地图片
				lineType: "", // 选择线的状态
				labelType: 1, // 标注工具类型点线框
				imageType: 3, // 标注工具类型点线框
				imageSrc: "", // 当前选中的工具图片链接
				labelId: "", // 当前选中的工具id
				toolName: "", // 当前选中的工具名称
				labelIds: [], // 标注过的工具id
				labelNames: [
					//				{
					//					name: "黑点",
					//					src: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539339848611&di=724ee81d941cab7e2b8e58c766015b54&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F02%2F13%2F24%2F599f5e734dc6a_610.jpg"
					//				}
				], // 标注过的工具名称，图片链接
				labelCounts: [
					//					["这个是有问题的", "这个问题很大的", "你要仔细看这个ppf"]
				], // 标注过的备注
				problemIndex: 0, // +1为问题页码
				projectQuestionList: [], // 问题列表
				projectLabelToolList: [] // 问题列表
			};
		},
		mounted() {
			var that = this
			jQuery("#right-list").niceScroll({ // 右侧标注栏滚动条
				'cursorcolor': '#fff',
				'cursoropacitymax': 0.5
			})
			jQuery(".left-top-projectlist").niceScroll({ //左侧任务列表滚动条
				'cursorcolor': '#000',
				'cursoropacitymax': 0.5
			})
			var projectLabelId = sessionStorage.getItem("LABELPROJECTID"); // 获取项目id
			var labelProjectBatchTaskId = sessionStorage.getItem("LABELPROJECTBATCHTASKID"); // 获取批次或任务id
			var taskType = sessionStorage.getItem("LABELTYPE"); // 获取类型1（任务），2（批次）
			this.taskType = taskType
			if(projectLabelId == undefined || projectLabelId == null) {
				this.projectLabelId = "";
			} else {
				this.projectLabelId = projectLabelId;
				this.$api.project
					.getProject(this.projectLabelId)
					.then(res => {
						if(res.code == 200) {
							this.bzProject = res.data.bzProject
							this.projectQuestionList = res.data.projectQuestionList
							this.projectLabelToolList = res.data.projectLabelToolList
						} else {
							this.$toaster.error(res.msg);
						}
					})
					.catch(() => {});
			}

			// 判断进来是批次还是任务
			if(taskType == undefined || taskType == null) {
				this.taskType = "";
			} else if(taskType == 1) { // 任务
				this.labelProjectBatchTaskId = labelProjectBatchTaskId
				this.$api.project
					.getProjectBatchTask(
						this.labelProjectBatchTaskId
					)
					.then(res => {
						this.batchLabelList = res.data
						this.isNowReviewUser = res.data.isNowReviewUser
						this.reviewStatus = res.data.reviewStatus
						this.nowImage = res.data.imageUrl
						var a = $(".imageLabel-jisuan"),
							i = $(".imageLabel-img")[0].naturalWidth,
							n = $(".imageLabel-img")[0].naturalHeight,
							t = $(".imageLabel-img").parents(".imageLabel-img-body").width(),
							l = $(".imageLabel-img").parents(".imageLabel-img-body").height();
						var imagewidth = setInterval(function() { // 加载图片获取图片width
							i = $(".imageLabel-img")[0].naturalWidth,
								n = $(".imageLabel-img")[0].naturalHeight
							if(i == 0) {

							} else {
								clearInterval(imagewidth)
								i / n > t / l ? a.css({
									width: "100%",
									height: n / i * t
								}) : a.css({
									height: "100%",
									width: i / n * l
								})
							}
							$(".imageLabel-loading-body").hide()
						}, 1000)
					})
					.catch(() => {});
			} else if(taskType == 2) { // 批次
				this.labelProjectBatchTaskId = labelProjectBatchTaskId
				this.getAcceptanceBatchTaskList()
			}
		},
		methods: {
			changeHeight0() { // 左侧任务列表显示隐藏
				jQuery(".left-top-projectlist").slideToggle('500')
			},
			selectTask(e) { // 选择左侧列表的任务
				var that = this
				that.labelIds = []
				that.labelNames = []
				that.labelCounts = []
				that.labelData = ""
				$(e.target).parent().addClass("color").siblings().removeClass("color")
				that.selectTaskId = $(e.target).attr("batchTaskId")
				$(".imageLabel-jisuan").css({
					width: 0,
					height: 0
				})
				$(".imageLabel-loading-body").show()
				that.nowImage = $(e.target).attr("imageUrl")
				var a = $(".imageLabel-jisuan"),
					i = $(".imageLabel-img")[0].naturalWidth,
					n = $(".imageLabel-img")[0].naturalHeight,
					t = $(".imageLabel-img").parents(".imageLabel-img-body").width(),
					l = $(".imageLabel-img").parents(".imageLabel-img-body").height();
				var imagewidth = setInterval(function() { // 加载图片获取图片width
					i = $(".imageLabel-img")[0].naturalWidth,
						n = $(".imageLabel-img")[0].naturalHeight
					if(i == 0) {

					} else {
						clearInterval(imagewidth)
						i / n > t / l ? a.css({
							width: "100%",
							height: n / i * t
						}) : a.css({
							height: "100%",
							width: i / n * l
						})
						that.$api.project
							.getProjectBatchTask(
								that.selectTaskId
							)
							.then(res => {
								that.selectTaskLabelId = res.data.labelList[0].id
								if(res.data.labelList[0].labelData == undefined) {
									that.labelData = ""
								} else {
									that.labelData = JSON.parse(res.data.labelList[0].labelData)
								}
								that.addLabelData()
							});
					}
					$(".imageLabel-loading-body").hide()
				}, 1000)
			},
			selectTaskIndex(e, index) { // 左侧为任务时，选择内部第几个
				this.selectTaskLabelId = this.batchLabelList.labelList[index].id
				this.selectTaskLabelId = this.batchLabelList.labelList[index].id
				if(this.batchLabelList.labelList[index].labelData == undefined) {
					this.labelData = ""
				} else {
					this.labelData = JSON.parse(this.batchLabelList.labelList[index].labelData)
				}
				this.addLabelData()
			},
			getAcceptanceBatchTaskList() { // 获取批次列表
				this.$api.project
					.getAcceptanceBatchTaskList(this.labelProjectBatchTaskId)
					.then(res => {
						if(res.code == 200) {
							this.labelProjectBatchList = []
							this.labelProjectBatchList = res.data
							$(".left-top-projectlist .rw-list span").removeClass("color")
							setTimeout(function() {
								$(".left-top-projectlist .rw-list span").eq(0).click()
							}, 500)
						} else {
							this.$toaster.error(res.msg);
						}
					})
					.catch(() => {});
			},
			operation(e) { // 病历数据的显示
				e.stopPropagation()
				var idd = $(e.target).attr("idd")
				this.$api.project
					.getProjectBatchTask(
						idd
					)
					.then(res => {
						this.title = "【" + res.data.taskNumber + "】病历数据";
						this.dialogcontent = res.data.data;
						this.dialogVisible = true;
					});
			},
			addLabelData() { // 标注工具上加载详细标注内容
				var that = this
				this.labelIds = []
				this.labelNames = []
				this.labelCounts = []
				$(".imageLabel-content").empty()
				for(var i = 0; i < that.labelData.length; i++) {
					var idIndex = that.labelIds.indexOf(that.labelData[i].labelId) // labelId是否在总id内
					if(idIndex > -1) {
						that.labelCounts[idIndex].push(that.labelData[i].name)
						var imageIndex = that.labelCounts[idIndex].length - 1
					} else {
						that.labelIds.push(that.labelData[i].labelId)
						var labelNames = {}
						var imageIndex = 0
						labelNames.name = that.labelData[i].toolName
						labelNames.src = that.labelData[i].imageSrc
						that.labelNames.push(labelNames)
						that.labelCounts.push([that.labelData[i].name])
					}
					if(that.labelData[i].type == 1) {
						var lefta = (that.labelData[i].x * 100).toFixed(4)
						var topa = (that.labelData[i].y * 100).toFixed(4)
						var labelContent = $('<img src="' + that.labelData[i].imageSrc + '" class="imageLabel-imgdrop dian" style="left:' + lefta + '%;top:' + topa + '%;" labelId="' + that.labelData[i].labelId + '" imageIndex="' + imageIndex + '" >');
					}
					$(".imageLabel-content").append(labelContent)
					labelContent.attr("data-json", JSON.stringify(that.labelData[i]))
				}
			}
		}
	};
</script>

<style>
	@import '../../../assets/plugg/label/styles/jquery.imageLabel.min.css';
	@import '../../../assets/plugg/label/styles/edit.css';
</style>
