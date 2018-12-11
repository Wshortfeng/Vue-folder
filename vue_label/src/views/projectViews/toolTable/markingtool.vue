<!--标注方工具台标注-->
<template>
	<div :class="isScreen==1 ? 'label-tool label-tool-fixed':'label-tool'">
		<!--左侧标注工具-->
		<div class="label-tool-left">
			<div class="left-top">
				<div class="left-top-projectinfo">
					<p :class="{projectname:true,projectnamea:taskType==1}">{{bzProject.projectName}}</p>
					<p v-if="taskType==2" class="projectname">
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
											<el-menu-item v-if="specialTask==1&&batchLabelList.labelList.length>1&&batchLabelList.agreedUserLabelId==item.taskReviewId" :index="index+''" v-for="(item, index) in batchLabelList.labelList" @click="selectTaskIndex(index)" :key="index">● {{index|labelTaskType}}</el-menu-item>
											<el-menu-item v-if="batchLabelList.labelList.length==1" :index="index+''" v-for="(item, index) in batchLabelList.labelList" @click="selectTaskIndex(index)" :key="index">● {{index|labelTaskType}}</el-menu-item>
											<el-menu-item v-if="specialTask==0" :index="index+''" v-for="(item, index) in batchLabelList.labelList" @click="selectTaskIndex(index)" :key="index">● {{index|labelTaskType}}</el-menu-item>
										</el-submenu>
									</el-menu>
								</el-col>
							</el-row>
						</div>
						<div class="left-top-projectlist" v-if="taskType==2">
							<el-scrollbar style="height:100%;width: 100%;">
								<p class="rw-list" v-for="(item, index) in labelProjectBatchList" :key="index">
									<span :batchTaskId="item.label.batchTaskId" :imageUrl="item.imageUrl" @click="selectTask($event,index)">{{item.taskNumber}}</span>
									<span :batchTaskId="item.label.batchTaskId" :imageUrl="item.imageUrl" @click="selectTask($event,index)">（{{item.taskStatus|batchtaskstate}}）</span>
									<!--<span v-if="labelProjectBatchList[0].batchStatus==6" :batchTaskId="item.label.batchTaskId" :imageUrl="item.imageUrl" @click="selectTask($event,index)">（{{item.taskStatus|batchtaskstate}}）</span>-->
									<a :idd="item.label.batchTaskId" @click="operation($event)">病历</a>
								</p>
								<!--<p :class="labelProjectBatchList[0].batchStatus!=6 ? 'rw-list rw-lista':'rw-list'" v-if="item.taskStatus==5" v-for="(item, index) in labelProjectBatchList" :key="index">
									<span :batchTaskId="item.label.batchTaskId" :imageUrl="item.imageUrl" @click="selectTask($event,index)">{{item.taskNumber}}</span>
									<span v-if="labelProjectBatchList[0].batchStatus==6" :batchTaskId="item.label.batchTaskId" :imageUrl="item.imageUrl" @click="selectTask($event,index)">（{{item.taskStatus|batchtaskstate}}）</span>
									<a :idd="item.label.batchTaskId" @click="operation($event)">病历</a>
								</p>
								<p :class="labelProjectBatchList[0].batchStatus!=6 ? 'rw-list rw-lista':'rw-list'" v-if="item.taskStatus!=5&&item.taskStatus!=6" v-for="(item, index) in labelProjectBatchList" :key="index">
									<span :batchTaskId="item.label.batchTaskId" :imageUrl="item.imageUrl" @click="selectTask($event,index)">{{item.taskNumber}}</span>
									<span v-if="labelProjectBatchList[0].batchStatus==6" :batchTaskId="item.label.batchTaskId" :imageUrl="item.imageUrl" @click="selectTask($event,index)">（{{item.taskStatus|batchtaskstate}}）</span>
									<a :idd="item.label.batchTaskId" @click="operation($event)">病历</a>
								</p>
								<p :class="labelProjectBatchList[0].batchStatus!=6 ? 'rw-list rw-lista':'rw-list'" v-if="item.taskStatus==6" v-for="(item, index) in labelProjectBatchList" :key="index">
									<span :batchTaskId="item.label.batchTaskId" :imageUrl="item.imageUrl" @click="selectTask($event,index)">{{item.taskNumber}}</span>
									<span v-if="labelProjectBatchList[0].batchStatus==6" :batchTaskId="item.label.batchTaskId" :imageUrl="item.imageUrl" @click="selectTask($event,index)">（{{item.taskStatus|batchtaskstate}}）</span>
									<a :idd="item.label.batchTaskId" @click="operation($event)">病历</a>
								</p>-->
							</el-scrollbar>
							<el-pagination background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :pager-count="5" :current-page="currentPage" :page-size="pageSize" :total="total">
      						</el-pagination>
						</div>
					</div>
				</div>
				<div class="left-top-right-screen">
					<a class="screen-image" v-if="isScreen==0"><img src="../../../../static/screen.png" @click="screen()" /></a>
					<a class="screen-image" v-if="isScreen==1"><img src="../../../../static/screenext.png" @click="screenNot()" /></a>
					<template>
						<div class="block label-size">
							<img class="label-size-image" style="width:19px;height: 19px;" src="../../../../static/labeljian.png" @click="labeljian()" />
							<el-slider v-model="labelSize" :min="10" :step="10" :show-tooltip="false"></el-slider>
							<img class="label-size-image" src="../../../../static/labeljia.png" @click="labeljia()" />
						</div>
					</template>
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
								<div class="imageLabel-jisuan">
									<img :src="nowImage" alt="" style="position: absolute;with:100%;height:100%;" class="imageLabel-img">
										<div class="imageLabel-content">

										</div>
								</div>
							</span>
							<div class="imageLabel-drap-menu">
								<div style="overflow: hidden;">
									<div style="cursor: pointer;" class="imageLabel-delete btns">删除</div>
									<div style="cursor: pointer;" class="imageLabel-edit btns">编辑</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--右侧列表-->
		<div class="label-tool-right">
			<p class="right-title">已标注列表</p>
			<div class="right-list" id="right-list">
				<el-scrollbar style="height:100%;width: 100%;">
					<div class="right-list-img" v-for="(item, index) in labelIds" :key="index">
						<div class="right-list-title">
							<span class="right-list-name">{{labelNames[index].name}}</span>
							<img :src="labelNames[index].src" />
						</div>
						<ul>
							<li v-for="(itema, indexa) in labelCounts[index]" :key="indexa" :labelId="item" :imageIndex="indexa">
								<el-popover v-if="itema.length>5" placement="top" width="auto" trigger="hover" :content="itema">
									<span slot="reference">{{indexa + 1}}.{{itema}}</span>
								</el-popover>
								<span v-else>{{indexa + 1}}.{{itema}}</span>
							</li>
						</ul>
					</div>
				</el-scrollbar>
			</div>
			<div class="subitles">
				<p>字幕标注</p>
				<a class="look-answer" @click="lookAnswerList()">查看答案</a>
			</div>
		</div>
		<!--底部按钮-->
		<div class="label-tool-bottom" v-if="taskType==1&&batchLabelList.status==10">
			<a @click="acceptancePuzzleTask(1)">通过</a>
			<a @click="acceptancePuzzleTask(2)">不通过</a>
		</div>
		<div class="label-tool-bottom" v-if="taskType==2&&taskStatus==10">
			<a @click="acceptanceBatchTask(1)">通过</a>
			<a @click="acceptanceBatchTask(2)">不通过</a>
		</div>
		<!--病历数据-->
		<el-dialog :visible.sync="dialogVisible" width="800px" center class="casedata">
			<p class="title">
				病历数据：
			</p>
			<span class="content">{{dialogcontent}}</span>
			<span slot="footer" class="dialog-footer"></span>
		</el-dialog>
		<el-dialog v-if="lookAnswer" :visible.sync="lookAnswer" width="800px" center class="casedata">
			<p class="title">
				字幕答案：
			</p>
			<div class="problemnr-choice problem-list" v-for="(item, index) in projectQuestionList.slice(0, lookAnswerContent.length)">
				<p class="problemnr-subject">{{index + 1}}.{{item.subject}}</p>
				<el-form label-width="0px" class="demo-ruleForm" v-if="item.type==1">
					<el-form-item label="">
						<el-checkbox-group v-model="lookAnswerContent[index].answer">
							<el-checkbox v-for="itema in item.content" :label="itema.questionOptionId" :key="itema.questionOptionId" disabled>{{itema.content}}</el-checkbox>
						</el-checkbox-group>
					</el-form-item>
				</el-form>
				<el-form label-width="0px" class="demo-ruleForm" v-if="item.type==2">
					<el-form-item label="">
						<el-input type="textarea" autosize placeholder="请输入回答" v-model="lookAnswerContent[index].answer" disabled></el-input>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>
<script>
	import { imageLabel } from '../../../assets/plugg/label/scripts/jquery.imageLabel.min.js'
	export default {
		data() {
			return {
				isScreen: 0, // 工作台是否0不全屏，1全屏
				labelSize: 10, // 图片放大缩小尺寸
				randomColor: [], // 随机颜色
				specialTask: "", // 进来的是1特殊任务，还是0会诊任务
				projectLabelId: "", // 项目id
				labelProjectBatchTaskId: "", // 批次或任务id
				taskType: "", //任务类型1（任务），2（批次）
				bzProject: {}, // 项目详情
				dialogVisible: false, //病历数据详情显示
				lookAnswer: false, // 查看答案详情显示隐藏
				labelProjectBatchList: [{
					"question": [{
						"options": [],
					}],
					"label": {}
				}, ], // 批次的任务列表
				pageSize: 5, // 每页几条
				currentPage: 1, // 当前第几页
				total: 0, // 共几条数据
				batchLabelList: {}, // 任务的详情，标注列表
				isNowReviewUser: "", // 判断是不是当前人审核，1是，2不是
				reviewStatus: "", // 判断当前人是否审核，1未审核，2已通过，3未通过
				isModify: "0", // 判断图片是否修改过0（未修改），1（修改过）
				selectTaskId: "", // 当前选中任务id
				selectTaskLabelId: "", // 当前选中任务标注id
				taskStatus: "", // 当前选中任务的验收状态
				clickType: "", // 判断在图片上点击的是点，线，框类型
				title: "", // 病历数据的任务标题
				dialogcontent: "", // 病历数据的内容
				labelData: "", // 标注的数据
				src2: "http://bbsatt.iiyi.com/forum/2008/12/26/20081226_8bfd741352ca2cf4aa3fWX9S87uXcEaL.jpg",
				src4: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539757231919&di=f265670f2a24f56c4a6eae0f1775b8ce&imgtype=0&src=http%3A%2F%2Fdownza.img.zz314.com%2Fedu%2Fpc%2Ftxyy-1010%2F2017-09-28%2F8a113e3ac914fe51046a4e3ec513a677.jpg",
				nowImage: '', // 当前标注地图片
				nowImageWidth: "", // 当前标注地图片width
				nowImageHeight: "", // 当前标注地图片height
				naturalWidth: "", // 当前标注地图片原始width
				naturalHeight: "", // 当前标注地图片原始height
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
		created() {
			this.$watch("labelSize", function(newValue, oldValue) {
				this.changeLabelSize()
			})
		},
		mounted() {
			var that = this
			for(var j = 1; j < 100; j++) {
				var randomColor = that.getRandomColor()
				that.randomColor.push(randomColor)
			}
			var projectLabelId = sessionStorage.getItem("LABELPROJECTID"); // 获取项目id
			var labelProjectBatchTaskId = sessionStorage.getItem("LABELPROJECTBATCHTASKID"); // 获取批次或任务id
			var taskType = sessionStorage.getItem("LABELTYPE"); // 获取类型1（任务），2（批次）
			this.taskType = taskType
			var special = this.$route.query.TYPE
			if(special == undefined) {
				this.specialTask = 0
			} else if(special == "SPECIAL") {
				this.specialTask = 1
			}
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
				this.selectTaskId = labelProjectBatchTaskId
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
								that.nowImageWidth = a.width()
								that.nowImageHeight = a.height()
							}
							$(".imageLabel-loading-body").hide()
						}, 1000)
					})
					.catch(() => {});
				setTimeout(function() {
					$(".el-menu-vertical-demo.el-menu").children("li").first().find(".el-submenu__title").click()
					$(".el-menu-vertical-demo.el-menu").children("li").first().find("ul").find("li").first().click()
				}, 500)
			} else if(taskType == 2) { // 批次
				this.labelProjectBatchTaskId = labelProjectBatchTaskId
				this.getAcceptanceBatchTaskList()
			}
		},
		methods: {
			getRandomColor() { //随机颜色
				return '#' + (Math.random() * 0xffffff << 0).toString(16);
			},
			changeLabelSize() { // 改变labelSize，初始化图形大小
				if(this.labelSize == 10) {
					$(".imageLabel-img").css({
						width: this.nowImageWidth,
						height: this.nowImageHeight,
					})
					$(".imageLabel-content").css({
						width: this.nowImageWidth,
						height: this.nowImageHeight,
					})
					$(".imageLabel-jisuan").css({
						width: this.nowImageWidth,
						height: this.nowImageHeight,
					})
					setTimeout(function() {
						$(".imageLabel-jisuan").css({
							overflow: "auto",
						})
					},500)
				} else {
					$(".imageLabel-img").css({
						width: this.nowImageWidth * this.labelSize / 10,
						height: this.nowImageHeight * this.labelSize / 10,
					})
					$(".imageLabel-content").css({
						width: this.nowImageWidth * this.labelSize / 10,
						height: this.nowImageHeight * this.labelSize / 10,
					})
					$(".imageLabel-jisuan").css({
						width: this.nowImageWidth * this.labelSize / 10 + 17,
						height: this.nowImageHeight * this.labelSize / 10,
					})
					setTimeout(function() {
						$(".imageLabel-jisuan").css({
							overflow: "auto",
						})
					},500)
				}
			},
			imageLabelChange() { // 所有imageLabel-imgdrop边框添加颜色
				var that = this
				for(var imgdropi = 0; imgdropi < $(".imageLabel-imgdrop").length; imgdropi++) {
					$(".imageLabel-imgdrop").eq(imgdropi).css("border-color", that.randomColor[imgdropi])
				}
			},
			changeHeight0() { // 左侧任务列表显示隐藏
				$(".left-top-projectlist").slideToggle('500')
			},
			selectTask(e, index, item) { // 选择左侧列表的任务
				var that = this
				that.labelIds = []
				that.labelNames = []
				that.labelCounts = []
				that.labelData = ""
				$(e.target).parent().addClass("color").siblings().removeClass("color")
				that.selectTaskId = $(e.target).attr("batchTaskId")
				$(".imageLabel-jisuan").css({
					width: 0,
					height: 0,
					overflow: "hidden",
				})
				$(".imageLabel-loading-body").show()
				that.nowImage = $(e.target).attr("imageUrl")
				var a = $(".imageLabel-jisuan"),
					i = $(".imageLabel-img")[0].naturalWidth,
					n = $(".imageLabel-img")[0].naturalHeight,
					t = $(".imageLabel-img").parents(".imageLabel-img-body").width(),
					l = $(".imageLabel-img").parents(".imageLabel-img-body").height();
				a.css("width", "0")
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
						that.nowImageWidth = a.width()
						that.nowImageHeight = a.height()
						that.taskStatus = that.labelProjectBatchList[index].taskStatus
						that.selectTaskLabelId = that.labelProjectBatchList[index].label.id
						if(that.labelProjectBatchList[index].label.labelData == undefined || that.labelProjectBatchList[index].label.labelData == "") {
							that.labelData = ""
						} else {
							that.labelData = JSON.parse(that.labelProjectBatchList[index].label.labelData)
						}
						that.addLabelData()
						that.labelSize = 10
						that.changeLabelSize()
					}
					$(".imageLabel-loading-body").hide()
				}, 1000)
			},
			selectTaskIndex(index) { // 左侧为任务时，选择内部第几个
				this.selectTaskLabelId = this.batchLabelList.labelList[index].id
				if(this.batchLabelList.labelList[index].labelData == undefined || this.batchLabelList.labelList[index].labelData == "") {
					this.labelData = ""
				} else {
					this.labelData = JSON.parse(this.batchLabelList.labelList[index].labelData)
				}
				this.addLabelData()
			},
		    handleCurrentChange: function(currentPage) {
		      this.currentPage = currentPage;
		      this.getAcceptanceBatchTaskList();
		    },
			getAcceptanceBatchTaskList() { // 获取批次列表
				this.$api.project
					.getAcceptanceBatchTaskList(
						this.currentPage,
						this.pageSize,
						this.labelProjectBatchTaskId
					)
					.then(res => {
						if(res.code == 200) {
							this.total = res.pageInfo.total;
							this.labelProjectBatchList = []
							this.labelProjectBatchList = res.data
							$(".left-top-projectlist .rw-list span").removeClass("color")
							setTimeout(function() {
								$(".left-top-projectlist .rw-list span").eq(0).click()
								if($(".left-top-projectlist").height() >= 610) {
									$(".left-top-projectlist").css("height", "610px")
								}
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
						if(this.isScreen == 1) {
							setTimeout(function() {
								$(".v-modal").click()
							}, 1)
						}
					});
			},
			changeLabelListColor() { // 鼠标移动到图形标注点后对应标注变色
				$(".imageLabel-imgdrop").off()
					$(".imageLabel-imgdrop").on('mouseenter', function() {
						var labelId = $(this).attr("labelId")
						var imageIndex = $(this).attr("imageIndex")
						$(".right-list-img li").each(function(i, v) {
							if($(v).attr("labelId") == labelId && $(v).attr("imageIndex") == imageIndex) {
								$(v).find("span").addClass('color')
								var offtop = $(v).position().top
								var scrollTopa = $(".right-list .el-scrollbar .el-scrollbar__wrap").scrollTop()
								$(".right-list .el-scrollbar .el-scrollbar__wrap").animate({
									scrollTop: offtop + scrollTopa
								}, 500)
							}
						})
					}).on('mouseleave', function() {
						var labelId = $(this).attr("labelId")
						var imageIndex = $(this).attr("imageIndex")
						$(".right-list-img li").each(function(i, v) {
							if($(v).attr("labelId") == labelId && $(v).attr("imageIndex") == imageIndex) {
								$(v).find("span").removeClass('color')
							}
						})
					})
			},
			addLabelData() { // 标注工具上加载详细标注内容
				var that = this;
				this.labelIds = [];
				this.labelNames = [];
				this.labelCounts = [];
				$(".imageLabel-content").empty();
				for(var i = 0; i < that.labelData.length; i++) {
					var idIndex = that.labelIds.indexOf(that.labelData[i].labelId); // labelId是否在总id内
					if(idIndex > -1) {
						that.labelCounts[idIndex].push(that.labelData[i].note);
						var imageIndex = that.labelCounts[idIndex].length - 1;
					} else {
						that.labelIds.push(that.labelData[i].labelId);
						var labelNames = {};
						var imageIndex = 0;
						labelNames.name = that.labelData[i].toolName;
						labelNames.src = that.labelData[i].imageSrc;
						that.labelNames.push(labelNames);
						that.labelCounts.push([that.labelData[i].note]);
					}
					if(that.labelData[i].type == 1) {
						var lefta = (that.labelData[i].x * 100).toFixed(4);
						var topa = (that.labelData[i].y * 100).toFixed(4);
						var labelContent = $(
							'<img src="' +
							that.labelData[i].imageSrc +
							'" class="imageLabel-imgdrop dian" style="left:' +
							lefta +
							"%;top:" +
							topa +
							'%;" labelId="' +
							that.labelData[i].labelId +
							'" imageIndex="' +
							imageIndex +
							'" >'
						);
					} else if(that.labelData[i].type == 2) {
						var lefta = (that.labelData[i].x * 100).toFixed(4);
						var topa = (that.labelData[i].y * 100).toFixed(4);
						var colora = that.labelData[i].color
						if(that.labelData[i].lineType == 1) {
							// 横向细实线
							var widtha = (
								(that.labelData[i].end_x - that.labelData[i].x) *
								100
							).toFixed(4);
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-transverse imageLabel-fine imageLabel-solid xian1" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;width:" +
								widtha +
								"%; border-color:" +
								colora +
								';" borderColor="' +
								colora +
								'"  labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						} else if(that.labelData[i].lineType == 2) {
							// 横向粗实线
							var widtha = (
								(that.labelData[i].end_x - that.labelData[i].x) *
								100
							).toFixed(4);
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-transverse imageLabel-crude imageLabel-solid xian1" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;width:" +
								widtha +
								"%; border-color:" +
								colora +
								';" borderColor="' +
								colora +
								'"  labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						} else if(that.labelData[i].lineType == 3) {
							// 横向细虚线
							var widtha = (
								(that.labelData[i].end_x - that.labelData[i].x) *
								100
							).toFixed(4);
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-transverse imageLabel-fine imageLabel-dashed xian1" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;width:" +
								widtha +
								"%; border-color:" +
								colora +
								';" borderColor="' +
								colora +
								'"  labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						} else if(that.labelData[i].lineType == 4) {
							// 横向粗虚线
							var widtha = (
								(that.labelData[i].end_x - that.labelData[i].x) *
								100
							).toFixed(4);
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-transverse imageLabel-crude imageLabel-dashed xian1" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;width:" +
								widtha +
								"%; border-color:" +
								colora +
								';" borderColor="' +
								colora +
								'"  labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						} else if(that.labelData[i].lineType == 5) {
							// 竖向细实线
							var heighta = (
								(that.labelData[i].end_y - that.labelData[i].y) *
								100
							).toFixed(4);
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-vertical imageLabel-fine imageLabel-solid xian2" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;height:" +
								heighta +
								"%; border-color:" +
								colora +
								';" borderColor="' +
								colora +
								'"  labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						} else if(that.labelData[i].lineType == 6) {
							// 竖向粗实线
							var heighta = (
								(that.labelData[i].end_y - that.labelData[i].y) *
								100
							).toFixed(4);
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-vertical imageLabel-crude imageLabel-solid xian2" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;height:" +
								heighta +
								"%; border-color:" +
								colora +
								';" borderColor="' +
								colora +
								'"  labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						} else if(that.labelData[i].lineType == 7) {
							// 竖向细虚线
							var heighta = (
								(that.labelData[i].end_y - that.labelData[i].y) *
								100
							).toFixed(4);
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-vertical imageLabel-fine imageLabel-dashed xian2" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;height:" +
								heighta +
								"%; border-color:" +
								colora +
								';" borderColor="' +
								colora +
								'"  labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						} else if(that.labelData[i].lineType == 8) {
							// 竖向粗虚线
							var heighta = (
								(that.labelData[i].end_y - that.labelData[i].y) *
								100
							).toFixed(4);
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-vertical imageLabel-crude imageLabel-dashed xian2" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;height:" +
								heighta +
								"%; border-color:" +
								colora +
								';" borderColor="' +
								colora +
								'"  labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						}
						for(var m = 0; m < 2; m++) {
							labelContent
								.find(".imageLable-i-s")
								.append('<i class="imageLable-i">');
						}
					} else if(that.labelData[i].type == 3) {
						var lefta = (that.labelData[i].x * 100).toFixed(4);
						var topa = (that.labelData[i].y * 100).toFixed(4);
						var widtha = (
							(that.labelData[i].end_x - that.labelData[i].x) *
							100
						).toFixed(4);
						var heighta = (
							(that.labelData[i].end_y - that.labelData[i].y) *
							100
						).toFixed(4);
						var colora = that.labelData[i].color
						if(that.labelData[i].lineType == 9) {
							// 横向细实线
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-finek imageLabel-solid kuang" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;width:" +
								widtha +
								"%;height:" +
								heighta +
								"%;border-color:" +
								colora +
								'; borderColor="' +
								colora +
								'" labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						} else if(that.labelData[i].lineType == 10) {
							// 横向粗实线
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-crudek imageLabel-solid kuang" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;width:" +
								widtha +
								"%;height:" +
								heighta +
								"%;border-color:" +
								colora +
								'; borderColor="' +
								colora +
								'" labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						} else if(that.labelData[i].lineType == 11) {
							// 横向细虚线
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-finek imageLabel-dashed kuang" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;width:" +
								widtha +
								"%;height:" +
								heighta +
								"%;border-color:" +
								colora +
								'; borderColor="' +
								colora +
								'" labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						} else if(that.labelData[i].lineType == 12) {
							// 横向粗虚线
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-crudek imageLabel-dashed kuang" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;width:" +
								widtha +
								"%;height:" +
								heighta +
								"%;border-color:" +
								colora +
								'; borderColor="' +
								colora +
								'" labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						}
						for(var m = 0; m < 4; m++) {
							labelContent
								.find(".imageLable-i-s")
								.append('<i class="imageLable-i">');
						}
					}
					$(".imageLabel-content").append(labelContent);
					labelContent.attr("data-json", JSON.stringify(that.labelData[i]));
				}
				that.changeLabelListColor()
				$(".imageLable-i-s").hide();
//				this.imageLabelChange();
			},
			getProjectBatchTask() { // 获取任务详情
				this.$api.project
					.getProjectBatchTask(
						this.labelProjectBatchTaskId
					)
					.then(res => {
						this.batchLabelList = res.data
						this.isNowReviewUser = res.data.isNowReviewUser
						this.reviewStatus = res.data.reviewStatus
						this.nowImage = res.data.imageUrl
					})
					.catch(() => {});
			},
			lookAnswerList() { // 查看答案的显示
				this.$api.project
					.getQuestionAnswerList(
						this.selectTaskLabelId
					)
					.then(res => {
						if(res.data.length == 0) {
							this.$toaster.error("无字幕标注");
						} else {
							this.lookAnswerContent = res.data
							this.lookAnswer = true
							if(this.isScreen == 1) {
								setTimeout(function() {
									$(".v-modal").click()
								}, 1)
							}
						}
					})
					.catch(() => {});
			},
			acceptancePuzzleTask(status) { // 验收疑难杂症任务
				if(status == 1) {
					var statusName = "是否确定通过验收？"
				} else {
					var statusName = "是否确定不通过验收？"
				}
				if(this.specialTask == 1) {
					this.acceptanceBatchTask(status)
				} else {
					this.$confirm(statusName, "", {
						customClass: "labelCustomClass",
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}).then(() => {
						this.$api.project
							.acceptancePuzzleTask(
								this.selectTaskId,
								status
							)
							.then(res => {
								if(res.code == 200) {
									this.$toaster.ok(res.msg)
									this.getProjectBatchTask()
								} else {
									this.$toaster.error(res.msg)
								}
							})
							.catch(() => {});
					});

				}
			},
			acceptanceBatchTask(status) { // 验收任务
				if(status == 1) {
					var statusName = "是否确定通过验收？"
				} else {
					var statusName = "是否确定不通过验收？"
				}
				this.$confirm(statusName, "", {
					customClass: "labelCustomClass",
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					this.$api.project
						.acceptanceBatchTask(
							this.selectTaskId,
							status
						)
						.then(res => {
							if(res.code == 200) {
								this.$toaster.ok(res.msg);
								if(this.specialTask == 1) {
									this.getProjectBatchTask()
								} else {
									this.getAcceptanceBatchTaskList()
								}
							} else {
								this.$toaster.error(res.msg);
							}
						})
						.catch(() => {});
				});

			},
			screen() { // 全屏显示
				var that = this
				that.isScreen = 1
				setTimeout(function() {
					if(that.labelId == "") {
						imageLabel({
							vuethat: that
						});
						$(".imageLabel-content").off();
						$(".imageLabel-img-boxs").off();
						$(".imageLabel-delete").off();
						$(".imageLabel-edit").off();
						$(".imageLabel-input-ok").off();
					} else {
						$(".imageLabel-content").off();
						$(".imageLabel-img-boxs").off();
						$(".imageLabel-delete").off();
						$(".imageLabel-edit").off();
						$(".imageLabel-input-ok").off();
						imageLabel({
							vuethat: that
						});
					}
					that.changeLabelListColor();
					that.changeLabelSize()
				}, 10)
			},
			screenNot() { // 取消全屏显示
				var that = this
				that.isScreen = 0
				setTimeout(function() {
					if(that.labelId == "") {
						imageLabel({
							vuethat: that
						});
						$(".imageLabel-content").off();
						$(".imageLabel-img-boxs").off();
						$(".imageLabel-delete").off();
						$(".imageLabel-edit").off();
						$(".imageLabel-input-ok").off();
					} else {
						$(".imageLabel-content").off();
						$(".imageLabel-img-boxs").off();
						$(".imageLabel-delete").off();
						$(".imageLabel-edit").off();
						$(".imageLabel-input-ok").off();
						imageLabel({
							vuethat: that
						});
					}
					that.changeLabelListColor();
					that.changeLabelSize()
				}, 10)

			},
			labeljia() { // 放大
				if(this.labelSize < 100) {
					this.labelSize = this.labelSize + 10
				}
			},
			labeljian() { // 缩小
				if(this.labelSize > 10) {
					this.labelSize = this.labelSize - 10
				}
			},
		}
	};
</script>

<style>
	@import '../../../assets/plugg/label/styles/jquery.imageLabel.min.css';
	@import '../../../assets/plugg/label/styles/edit.css';
</style>