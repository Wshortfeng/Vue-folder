<!--标注方工具台标注-->
<template>
	<div class="label-tool">
		<!--左侧标注工具-->
		<div class="label-tool-left">
			<div class="left-top">
				<div class="left-top-projectinfo">
					<p class="projectname">{{bzProject.projectName}}</p>
					<p class="projectname">
						<span>{{labelProjectBatchList.batchNumber}}</span>
						<span>（{{labelProjectBatchList.batchStatus|labelbatchstate}}）</span>
					</p>
					<div class="left-top-projectlistnr">
						<div class="left-top-projectlist lookmarking-left-top-projectlist" style="overflow: hidden;">
							<el-scrollbar style="height:100%;width: 100%;">
							<el-row>
								<el-col :span="24" class="tac">
									<!--<el-menu class="el-menu-vertical-demo" default-active="0-0" unique-opened background-color="#4a4a4a" text-color="#fff" active-text-color="#004080">-->
									<el-menu class="el-menu-vertical-demo" unique-opened background-color="#004080" text-color="#fff" active-text-color="#004080">
										<el-submenu :index="indexa+''" v-if="itema.taskStatus>8||itema.taskType!=1" v-for="(itema,indexa) in labelProjectBatchList.taskList" :key="indexa">
											<template slot="title">
												<span>{{itema.taskNumber}}</span>
												<span>（{{itema.taskStatus|batchtaskstate}}）</span>
												<a :idd="itema.batchTaskId" @click="operation($event)">病历</a>
											</template>
											<el-menu-item :index="indexa+'-'+index" v-for="(item, index) in itema.labelList" @click="selectTaskIndex(indexa,index)" :key="index">● {{index|labelTaskType}}</el-menu-item>
										</el-submenu>
										<el-submenu :index="indexa+''" v-if="itema.taskStatus<=8&&itema.taskType==1" v-for="(itema,indexa) in labelProjectBatchList.taskList" :key="indexa">
											<template slot="title">
												<span>{{itema.taskNumber}}</span>
												<span>（未抽样）</span>
												<a :idd="itema.batchTaskId" @click="operation($event)">病历</a>
											</template>
											<el-menu-item :index="indexa+'-'+index" v-for="(item, index) in itema.labelList" @click="selectTaskIndex(indexa,index)" :key="index">● {{index|labelTaskType}}</el-menu-item>
										</el-submenu>
									</el-menu>
								</el-col>
							</el-row>
							</el-scrollbar>
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
					<el-scrollbar style="height:100%;width: 100%;">
					<div class="right-list-img" v-for="(item, index) in labelIds" :key="index">
						<span class="right-list-name">{{labelNames[index].name}}</span>
						<img :src="labelNames[index].src" />
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
			</div>
			<div class="subitles">
				<p>字幕标注</p>
				<a class="look-answer" @click="lookAnswerList()">查看答案</a>
			</div>
		</div>
		<!--病例数据-->
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
			<div class="problemnr-choice problem-list" v-for="(item, index) in projectQuestionList.slice(0, lookAnswerContent.length)" :key="index">
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
				randomColor: [], // 随机颜色
				projectLabelId: "", // 项目id
				labelProjectBatchTaskId: "", // 批次id
				bzProject: {}, // 项目详情
				dialogVisible: false, //病历数据详情显示
				lookAnswer: false, // 查看答案详情显示隐藏
				labelProjectBatchList: {}, // 批次的任务列表
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
//			jQuery(".left-top-projectlist").niceScroll({ //左侧任务列表滚动条
//				'cursorcolor': '#000',
//				'cursoropacitymax': 0.5
//			})
			for(var j = 1; j < 100; j++) {
				var randomColor = that.getRandomColor()
				that.randomColor.push(randomColor)
			}
			var projectLabelId = sessionStorage.getItem("LABELPROJECTID"); // 获取项目id
			var labelProjectBatchTaskId = sessionStorage.getItem("LABELPROJECTBATCHTASKID"); // 获取批次id
			this.labelProjectBatchTaskId = labelProjectBatchTaskId
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
			that.getBatchLabelList()
		},
		methods: {
			getRandomColor() { //随机颜色
				return '#' + (Math.random() * 0xffffff << 0).toString(16);
			},
			imageLabelChange() { // 所有imageLabel-imgdrop边框添加颜色
				var that = this
				for(var imgdropi = 0; imgdropi < $(".imageLabel-imgdrop").length; imgdropi++) {
					$(".imageLabel-imgdrop").eq(imgdropi).css("border-color", that.randomColor[imgdropi])
				}
			},
			changeHeight0() { // 左侧任务列表显示隐藏
				jQuery(".left-top-projectlist").slideToggle('500')
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
						that.taskStatus = that.labelProjectBatchList[index].taskStatus
						that.selectTaskLabelId = that.labelProjectBatchList[index].label.id
						console.log(that.taskStatus)
						if(that.labelProjectBatchList[index].label.labelData == undefined) {
							that.labelData = ""
						} else {
							that.labelData = JSON.parse(that.labelProjectBatchList[index].label.labelData)
						}
						that.addLabelData()
					}
					$(".imageLabel-loading-body").hide()
				}, 1000)
			},
			selectTaskIndex(indexa, index) { // 左侧为任务时，选择内部第几个
				var that = this
				var getBatchLabelLista = this.labelProjectBatchList.taskList[indexa]
				this.selectTaskLabelId = getBatchLabelLista.labelList[index].id
				$(".imageLabel-loading-body").show()
				this.nowImage = getBatchLabelLista.imageUrl
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
					}
					$(".imageLabel-loading-body").hide()
				}, 1000)
				if(getBatchLabelLista.labelList[index].labelData == undefined) {
					this.labelData = ""
				} else {
					this.labelData = JSON.parse(getBatchLabelLista.labelList[index].labelData)
				}
				this.addLabelData()
			},
			getBatchLabelList() { // 获取批次列表
				this.$api.project
					.getBatchLabelList(this.labelProjectBatchTaskId)
					.then(res => {
						if(res.code == 200) {
							this.labelProjectBatchList = {}
							this.labelProjectBatchList = res.data
//							this.selectTaskIndex(0, 0)
							setTimeout(function() {
								jQuery(".el-menu-vertical-demo.el-menu").children("li").first().find(".el-submenu__title").click()
								jQuery(".el-menu-vertical-demo.el-menu").children("li").first().find("ul").find("li").first().click()
								if($(".left-top-projectlist").height()>=610) {
									$(".left-top-projectlist").css("height","610px")
								}
							},500)
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
					} else if(that.labelData[i].type == 2) {
						var lefta = (that.labelData[i].x * 100).toFixed(4)
						var topa = (that.labelData[i].y * 100).toFixed(4)
						if(that.labelData[i].lineType == 1) { // 横向细实线
							var widtha = ((that.labelData[i].ex - that.labelData[i].x) * 100).toFixed(4)
							var labelContent = $('<div class="imageLabel-imgdrop imageLabel-transverse imageLabel-fine imageLabel-solid xian1" style="left:' + lefta + '%;top:' + topa + '%;width:' + widtha + '%;" labelId="' + that.labelData[i].labelId + '" imageIndex="' + imageIndex + '" ><div class="imageLable-i-s" ></div></div>');
						} else if(that.labelData[i].lineType == 2) { // 横向粗实线
							var widtha = ((that.labelData[i].ex - that.labelData[i].x) * 100).toFixed(4)
							var labelContent = $('<div class="imageLabel-imgdrop imageLabel-transverse imageLabel-crude imageLabel-solid xian1" style="left:' + lefta + '%;top:' + topa + '%;width:' + widtha + '%;" labelId="' + that.labelData[i].labelId + '" imageIndex="' + imageIndex + '" ><div class="imageLable-i-s" ></div></div>');
						} else if(that.labelData[i].lineType == 3) { // 横向细虚线
							var widtha = ((that.labelData[i].ex - that.labelData[i].x) * 100).toFixed(4)
							var labelContent = $('<div class="imageLabel-imgdrop imageLabel-transverse imageLabel-fine imageLabel-dashed xian1" style="left:' + lefta + '%;top:' + topa + '%;width:' + widtha + '%;" labelId="' + that.labelData[i].labelId + '" imageIndex="' + imageIndex + '" ><div class="imageLable-i-s" ></div></div>');
						} else if(that.labelData[i].lineType == 4) { // 横向粗虚线
							var widtha = ((that.labelData[i].ex - that.labelData[i].x) * 100).toFixed(4)
							var labelContent = $('<div class="imageLabel-imgdrop imageLabel-transverse imageLabel-crude imageLabel-dashed xian1" style="left:' + lefta + '%;top:' + topa + '%;width:' + widtha + '%;" labelId="' + that.labelData[i].labelId + '" imageIndex="' + imageIndex + '" ><div class="imageLable-i-s" ></div></div>');
						} else if(that.labelData[i].lineType == 5) { // 竖向细实线
							var heighta = ((that.labelData[i].ey - that.labelData[i].y) * 100).toFixed(4)
							var labelContent = $('<div class="imageLabel-imgdrop imageLabel-vertical imageLabel-fine imageLabel-solid xian2" style="left:' + lefta + '%;top:' + topa + '%;height:' + heighta + '%;" labelId="' + that.labelData[i].labelId + '" imageIndex="' + imageIndex + '" ><div class="imageLable-i-s" ></div></div>');
						} else if(that.labelData[i].lineType == 6) { // 竖向粗实线
							var heighta = ((that.labelData[i].ey - that.labelData[i].y) * 100).toFixed(4)
							var labelContent = $('<div class="imageLabel-imgdrop imageLabel-vertical imageLabel-crude imageLabel-solid xian2" style="left:' + lefta + '%;top:' + topa + '%;height:' + heighta + '%;" labelId="' + that.labelData[i].labelId + '" imageIndex="' + imageIndex + '" ><div class="imageLable-i-s" ></div></div>');
						} else if(that.labelData[i].lineType == 7) { // 竖向细虚线
							var heighta = ((that.labelData[i].ey - that.labelData[i].y) * 100).toFixed(4)
							var labelContent = $('<div class="imageLabel-imgdrop imageLabel-vertical imageLabel-fine imageLabel-dashed xian2" style="left:' + lefta + '%;top:' + topa + '%;height:' + heighta + '%;" labelId="' + that.labelData[i].labelId + '" imageIndex="' + imageIndex + '" ><div class="imageLable-i-s" ></div></div>');
						} else if(that.labelData[i].lineType == 8) { // 竖向粗虚线
							var heighta = ((that.labelData[i].ey - that.labelData[i].y) * 100).toFixed(4)
							var labelContent = $('<div class="imageLabel-imgdrop imageLabel-vertical imageLabel-crude imageLabel-dashed xian2" style="left:' + lefta + '%;top:' + topa + '%;height:' + heighta + '%;" labelId="' + that.labelData[i].labelId + '" imageIndex="' + imageIndex + '" ><div class="imageLable-i-s" ></div></div>');
						}
						for(var m = 0; m < 2; m++) {
							labelContent.find(".imageLable-i-s").append('<i class="imageLable-i">');
						}
					} else if(that.labelData[i].type == 3) {
						var lefta = (that.labelData[i].x * 100).toFixed(4)
						var topa = (that.labelData[i].y * 100).toFixed(4)
						var widtha = ((that.labelData[i].ex - that.labelData[i].x) * 100).toFixed(4)
						var heighta = ((that.labelData[i].ey - that.labelData[i].y) * 100).toFixed(4)
						if(that.labelData[i].lineType == 9) { // 横向细实线
							var labelContent = $('<div class="imageLabel-imgdrop imageLabel-finek imageLabel-solid kuang" style="left:' + lefta + '%;top:' + topa + '%;width:' + widtha + '%;height:' + heighta + '%;" labelId="' + that.labelData[i].labelId + '" imageIndex="' + imageIndex + '" ><div class="imageLable-i-s" ></div></div>');
						} else if(that.labelData[i].lineType == 10) { // 横向粗实线
							var labelContent = $('<div class="imageLabel-imgdrop imageLabel-crudek imageLabel-solid kuang" style="left:' + lefta + '%;top:' + topa + '%;width:' + widtha + '%;height:' + heighta + '%;" labelId="' + that.labelData[i].labelId + '" imageIndex="' + imageIndex + '" ><div class="imageLable-i-s" ></div></div>');
						} else if(that.labelData[i].lineType == 11) { // 横向细虚线
							var labelContent = $('<div class="imageLabel-imgdrop imageLabel-finek imageLabel-dashed kuang" style="left:' + lefta + '%;top:' + topa + '%;width:' + widtha + '%;height:' + heighta + '%;" labelId="' + that.labelData[i].labelId + '" imageIndex="' + imageIndex + '" ><div class="imageLable-i-s" ></div></div>');
						} else if(that.labelData[i].lineType == 12) { // 横向粗虚线
							var labelContent = $('<div class="imageLabel-imgdrop imageLabel-crudek imageLabel-dashed kuang" style="left:' + lefta + '%;top:' + topa + '%;width:' + widtha + '%;height:' + heighta + '%;" labelId="' + that.labelData[i].labelId + '" imageIndex="' + imageIndex + '" ><div class="imageLable-i-s" ></div></div>');
						}
						for(var m = 0; m < 4; m++) {
							labelContent.find(".imageLable-i-s").append('<i class="imageLable-i">');
						}
					}
					$(".imageLabel-content").append(labelContent)
					labelContent.attr("data-json", JSON.stringify(that.labelData[i]))
				}
				$('.imageLable-i-s').hide()
				this.imageLabelChange()
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
						}
					})
					.catch(() => {});
			}
		}
	};
</script>

<style>
	@import '../../../assets/plugg/label/styles/jquery.imageLabel.min.css';
	@import '../../../assets/plugg/label/styles/edit.css';
</style>
