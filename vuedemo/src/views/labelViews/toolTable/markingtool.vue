<!--标注方工具台标注-->
<template>
	<div class="label-tool">
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
									<el-menu class="el-menu-vertical-demo" default-active="0" background-color="#004080" text-color="#fff" active-text-color="#004080">
										<el-submenu index="1">
											<template slot="title">
												<span>{{batchLabelList.taskNumber}}</span>
												<span>（{{batchLabelList.status|batchtaskstate}}）</span>
												<a :idd="labelProjectBatchTaskId" @click="operation($event)">病历</a>
											</template>
											<el-menu-item :index="index+''" v-for="(item, index) in batchLabelList.labelList" @click="selectTaskIndex(index)" :key="index">● {{index|labelTaskType}}</el-menu-item>
										</el-submenu>
									</el-menu>
								</el-col>
							</el-row>
						</div>
						<div class="left-top-projectlist" id="left-top-projectlist" v-if="taskType==2">
							<el-scrollbar style="height:100%;width: 100%;">
								<p class="rw-list" v-for="(item, index) in labelProjectBatchList" :key="index">
									<span :batchTaskId="item.batchTaskId" :imageUrl="item.imageUrl" @click="selectTask($event)">{{item.taskNumber}}</span>
									<span :batchTaskId="item.batchTaskId" :imageUrl="item.imageUrl" @click="selectTask($event)" v-if="item.batchTaskId!=selectTaskId">{{item.status|labelTaskStatus}}</span>
									<span :batchTaskId="item.batchTaskId" :imageUrl="item.imageUrl" @click="selectTask($event)" v-if="item.batchTaskId==selectTaskId">（进行中）</span>
									<a :idd="item.batchTaskId" @click="operation($event)">病历</a>
								</p>
							</el-scrollbar>
						</div>
					</div>
				</div>
				<div class="left-top-labelname" v-if="taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4))">
					<a class="color" labelType="1" @click="changelabelType($event)">点标注</a>
					<a labelType="2" @click="changelabelType($event)">线标注</a>
					<a labelType="3" @click="changelabelType($event)">框标注</a>
				</div>
				<div class="left-top-right-screen">
					<a class="screen-image"><img src="../../../../static/screen.png" /></a>
				</div>
			</div>
			<div class="left-top2-listb" v-show="taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4))">
				<div class="left-top2-list">
					<ul v-show="labelType==1">
						<li v-for="(item,index) in projectLabelToolList" :key="index" v-if="item.type==1">
							<a class="mengcengnei" :idd="item.labelToolId" imageType="1" :imageSrc="item.toolImage" :toolName="item.toolName" @click="choiceLabel($event)"></a>
							<img :src="item.toolImage">
							<span>{{item.toolName}}</span>
						</li>
					</ul>
					<ul v-show="labelType==2">
						<li>
							<a class="mengcengnei" lineType="1" idd="200" imageType="2" :imageSrc="src4" toolName="横向细实线" @click="choiceLabel($event)"></a>
							<img :src="src4">
							<span>横向细实线</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="2" idd="201" imageType="2" :imageSrc="src4" toolName="横向粗实线" @click="choiceLabel($event)"></a>
							<img :src="src4">
							<span>横向粗实线</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="3" idd="202" imageType="2" :imageSrc="src4" toolName="横向细虚线" @click="choiceLabel($event)"></a>
							<img :src="src4">
							<span>横向细虚线</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="4" idd="203" imageType="2" :imageSrc="src4" toolName="竖向粗虚线" @click="choiceLabel($event)"></a>
							<img :src="src4">
							<span>竖向粗虚线</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="5" idd="204" imageType="2" :imageSrc="src4" toolName="竖向细实线" @click="choiceLabel($event)"></a>
							<img :src="src4">
							<span>竖向细实线</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="6" idd="205" imageType="2" :imageSrc="src4" toolName="竖向粗实线" @click="choiceLabel($event)"></a>
							<img :src="src4">
							<span>竖向粗实线</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="7" idd="206" imageType="2" :imageSrc="src4" toolName="竖向粗虚线" @click="choiceLabel($event)"></a>
							<img :src="src4">
							<span>竖向粗虚线</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="8" idd="207" imageType="2" :imageSrc="src4" toolName="竖向细虚线" @click="choiceLabel($event)"></a>
							<img :src="src4">
							<span>竖向细虚线</span>
						</li>
					</ul>
					<ul v-show="labelType==3">
						<li>
							<a class="mengcengnei" lineType="9" idd="209" imageType="3" :imageSrc="src2" toolName="细实框" @click="choiceLabel($event)"></a>
							<img :src="src2">
							<span>细实框</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="10" idd="210" imageType="3" :imageSrc="src2" toolName="粗实框" @click="choiceLabel($event)"></a>
							<img :src="src2">
							<span>粗实框</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="11" idd="211" imageType="3" :imageSrc="src2" toolName="细虚框" @click="choiceLabel($event)"></a>
							<img :src="src2">
							<span>细虚框</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="12" idd="211" imageType="3" :imageSrc="src2" toolName="粗虚框" @click="choiceLabel($event)"></a>
							<img :src="src2">
							<span>粗虚框</span>
						</li>
					</ul>
				</div>
				<i class="el-icon-arrow-left" @click="goLeftscroll()"></i>
				<i class="el-icon-arrow-right" @click="goRightscroll()"></i>
			</div>
			<div class="label-tool-image">
				<div class="imageLabel-box">
					<div class="imageLabel">
						<div class="imageLabel-img-boxs">
							<span class="imageLabel-img-body">
			                    <div class="imageLabel-loading-body">
			                      <div class="imageLabel-loading">

			                      </div>
			                    </div>
			                    <div class="imageLabel-jisuan" style="position: relative;overflow:hidden;" ref="imageWrapper">
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
						<div class="imageLabel-input" style="background-color:rgba(0,0,0,0.3);">
							<div class="imageLabel-input-box" style="width:250px;border-radius:2px;overflow: hidden;">
								<div style="background-color: #4a4a4a;">
									<div style="color:#fff;overflow:hidden;line-height: 40px;">
										<span style="float: left;margin-left:20px;">编辑备注</span>
										<span class="imageLabel-input-close" style="float:right;margin-right:20px;cursor: pointer;">X</span>
									</div>
								</div>
								<div style="background: #fff;padding:20px;">
									<input type="text" value="" maxlength="50" @change="filteremoRemark($event)">
									<div style="margin-top:20px;overflow:hidden;">
										<div class="imageLabel-input-close imageLabel-btn" style="float: left;width:90px;background-color: #959595;">取消</div>
										<div class="imageLabel-input-ok imageLabel-btn" style="float: right;width:90px;background-color: #4a4a4a;">确定</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="problemnr" v-if="projectQuestionList.length!=0 && (taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4)))">
				<div class="problemnr-choice" v-if="projectQuestionList[problemIndex].type==1">
					<p class="problemnr-subject">{{problemIndex + 1}}.{{projectQuestionList[problemIndex].subject}}</p>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
						<el-form-item label="" prop="questionOptionIds">
							<el-checkbox-group v-model="ruleForm.questionOptionIds">
								<el-checkbox v-for="item in projectQuestionList[problemIndex].content" :label="item.questionOptionId" :key="item.questionOptionId">{{item.content}}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-form>
				</div>
				<div class="problemnr-answer" v-if="projectQuestionList[problemIndex].type==2">
					<p class="problemnr-subject">{{problemIndex + 1}}.{{projectQuestionList[problemIndex].subject}}</p>
					<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
						<el-form-item label="" prop="answer">
							<el-input type="textarea" :rows="2" placeholder="请输入回答" v-model="ruleForm.answer" @change="filteremoAnswer($event)" maxlength="1000"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<div class="problem-page">
					<span>{{problemIndex+1}}/{{projectQuestionList.length}}</span>
					<a @click="prev()">上一页</a>
					<a @click="next('ruleForm')">下一页</a>
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
							<div>
								<span class="right-list-name">{{labelNames[index].name}}</span>
								<img :src="labelNames[index].src" />
							</div>
							<ul>
								<li v-for="(itema, indexa) in labelCounts[index]" :key="indexa" :labelId="item" :imageIndex="indexa">
									<div class="right-list-remark" v-if="taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4))">{{indexa + 1}}.<input v-model="labelCounts[index][indexa]" @blur="modifyLabelList($event)" @change="filteremoRigtList($event,index,indexa)" maxlength="50" /></div>
									<div class="right-list-remark" v-else="">{{indexa + 1}}.<input v-model="labelCounts[index][indexa]" readonly="readonly" /></div>
									<img v-if="taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4))" src="../../../assets/img/labellistclose.png" @click="deleteLabelList($event)" />
								</li>
							</ul>
						</div>
					</el-scrollbar>
				</div>
			</div>
			<div class="subitles" v-if="selectTaskLabelId!=''">
				<p>字幕标注</p>
				<a class="look-answer" @click="lookAnswerList()">查看答案</a>
			</div>
		</div>
		<!--底部按钮-->
		<div class="label-tool-bottom">
			<a v-if="taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4))" status="2" @click="updataLabel($event)">保存草稿</a>
			<a v-if="taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4))" @click="resetLabel()">重置</a>
			<a v-if="taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4))" status="3" @click="updataLabel($event)">完成</a>
			<a v-if="taskType==1 && isNowReviewUser==1&&reviewStatus==1&&selectTaskLabelId!=''" @click="reviewTaskPass()">通过</a>
			<a v-if="taskType==1 && isNowReviewUser==1&&reviewStatus==1&&selectTaskLabelId!=''" @click="notPassTaskLabel()">不通过</a>
		</div>
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
			<div class="problem-list problemnr-choice" v-for="(item, index) in projectQuestionList.slice(0, lookAnswerContent.length)" :key="index">
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
	import { imageLabel } from "../../../assets/plugg/label/scripts/jquery.imageLabel.min.js";
	export default {
		data() {
			return {
				randomColor: [], // 随机颜色
				projectLabelId: "", // 项目id
				labelProjectBatchTaskId: "", // 批次或任务id
				//				reviewType: "", // 若为任务当前任务的状态
				taskType: "", //任务类型1（任务），2（批次）
				bzProject: {}, // 项目详情
				dialogVisible: false, //病历数据详情显示
				lookAnswer: false, // 查看答案详情显示隐藏
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
				nowImage: "", // 当前标注地图片
				labelUrl: "", // 完成是标注的图片
				labelUrla: "",
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
				projectQuestionList: [{}], // 问题列表
				projectLabelToolList: [], // 标注工具列表
				lookAnswerContent: [{}], // 查看答案内容
				ruleForm: {
					questionOptionIds: [],
					answer: ""
				},
				rules: {
					questionOptionIds: [{
						type: "array",
						required: true,
						message: "请选择答案"
					}],
					answer: [{
						required: true,
						message: "请输入回答"
					}]
				}
			};
		},
		mounted() {
			var that = this;
			//			jQuery(".left-top-projectlist").niceScroll({ //左侧任务列表滚动条
			//				'cursorcolor': '#000',
			//				'cursoropacitymax': 0.5
			//			})
			for(var j = 1; j < 100; j++) {
				var randomColor = that.getRandomColor();
				that.randomColor.push(randomColor);
			}
			var projectLabelId = sessionStorage.getItem("LABELPROJECTID"); // 获取项目id
			var labelProjectBatchTaskId = sessionStorage.getItem(
				"LABELPROJECTBATCHTASKID"
			); // 获取批次或任务id
			var taskType = sessionStorage.getItem("LABELTYPE"); // 获取类型1（任务），2（批次）
			this.taskType = taskType;
			if(projectLabelId == undefined || projectLabelId == null) {
				this.projectLabelId = "";
			} else {
				this.projectLabelId = projectLabelId;
				this.$api.project
					.getProject(this.projectLabelId)
					.then(res => {
						if(res.code == 200) {
							this.bzProject = res.data.bzProject;
							this.projectQuestionList = res.data.projectQuestionList;
							this.projectLabelToolList = res.data.projectLabelToolList;
						} else {
							this.$toaster.error(res.msg);
						}
					})
					.catch(() => {});
			}

			// 判断进来是批次还是任务
			if(taskType == undefined || taskType == null) {
				this.taskType = "";
			} else if(taskType == 1) {
				// 任务
				this.labelProjectBatchTaskId = labelProjectBatchTaskId;
				this.selectTaskId = labelProjectBatchTaskId;
				this.$api.project
					.getProjectBatchTask(this.labelProjectBatchTaskId)
					.then(res => {
						this.batchLabelList = res.data;
						this.isNowReviewUser = res.data.isNowReviewUser;
						this.reviewStatus = res.data.reviewStatus;
						this.nowImage = res.data.imageUrl;
						var a = $(".imageLabel-jisuan"),
							i = $(".imageLabel-img")[0].naturalWidth,
							n = $(".imageLabel-img")[0].naturalHeight,
							t = $(".imageLabel-img")
							.parents(".imageLabel-img-body")
							.width(),
							l = $(".imageLabel-img")
							.parents(".imageLabel-img-body")
							.height();
						var imagewidth = setInterval(function() {
							// 加载图片获取图片width
							(i = $(".imageLabel-img")[0].naturalWidth),
							(n = $(".imageLabel-img")[0].naturalHeight);
							if(i == 0) {} else {
								clearInterval(imagewidth);
								i / n > t / l ?
									a.css({
										width: "100%",
										height: (n / i) * t
									}) :
									a.css({
										height: "100%",
										width: (i / n) * l
									});
							}
							$(".imageLabel-loading-body").hide();
						}, 1000);
						setTimeout(function() {
							that.selectTaskIndex(0);
						}, 500);
					})
					.catch(() => {});
			} else if(taskType == 2) {
				// 批次
				this.labelProjectBatchTaskId = labelProjectBatchTaskId;
				this.getBatchTaskLabelList();
			}
		},
		methods: {
			getRandomColor() {
				//随机颜色
				return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
			},
			imageLabelChange() {
				// 所有imageLabel-imgdrop边框添加颜色
				var that = this;
				for(
					var imgdropi = 0; imgdropi < $(".imageLabel-imgdrop").length; imgdropi++
				) {
					$(".imageLabel-imgdrop")
						.eq(imgdropi)
						.css("border-color", that.randomColor[imgdropi]);
				}
			},
			changeHeight0() {
				// 左侧任务列表显示隐藏
				jQuery(".left-top-projectlist").slideDown("500");
			},
			changeHeight1() {
				// 左侧任务列表显示隐藏
				jQuery(".left-top-projectlist").slideUp("500");
			},
			filteremoRigtList(e, index, indexa) {
				// 右侧列表限制表情输入
				var a = this.$utils.filteremoji(this.labelCounts[index][indexa]);
				this.labelCounts[index][indexa] = a;
				$(e.target).val(a);
			},
			filteremoAnswer(e) {
				// 底部回答限制表情输入
				var a = this.$utils.filteremoji(this.ruleForm.answer);
				this.ruleForm.answer = a;
			},
			filteremoRemark(e) {
				// 图片标注限制表情输入
				var a = this.$utils.filteremoji($(e.target).val());
				$(e.target).val(a);
			},
			selectTask(e) {
				// 选择左侧列表的任务
				var that = this;
				that.labelIds = [];
				that.labelNames = [];
				that.labelCounts = [];
				that.labelData = "";
				$(e.target)
					.parent()
					.addClass("color")
					.siblings()
					.removeClass("color");
				that.selectTaskId = $(e.target).attr("batchTaskId");
				$(".imageLabel-jisuan").css({
					width: 0,
					height: 0
				});
				$(".imageLabel-loading-body").show();
				that.nowImage = $(e.target).attr("imageUrl");
				var a = $(".imageLabel-jisuan"),
					i = $(".imageLabel-img")[0].naturalWidth,
					n = $(".imageLabel-img")[0].naturalHeight,
					t = $(".imageLabel-img")
					.parents(".imageLabel-img-body")
					.width(),
					l = $(".imageLabel-img")
					.parents(".imageLabel-img-body")
					.height();
				var imagewidth = setInterval(function() {
					// 加载图片获取图片width
					(i = $(".imageLabel-img")[0].naturalWidth),
					(n = $(".imageLabel-img")[0].naturalHeight);
					if(i == 0) {} else {
						clearInterval(imagewidth);
						i / n > t / l ?
							a.css({
								width: "100%",
								height: (n / i) * t
							}) :
							a.css({
								height: "100%",
								width: (i / n) * l
							});
						that.$api.project.getProjectBatchTask(that.selectTaskId).then(res => {
							that.selectTaskLabelId = res.data.labelList[0].id;
							if(res.data.labelList[0].labelData == undefined) {
								that.labelData = "";
							} else {
								that.labelData = JSON.parse(res.data.labelList[0].labelData);
							}
							that.addLabelData();
							that.problemIndex = 0;
							that.getQuestionAnswer();
						});
					}
					$(".imageLabel-loading-body").hide();
				}, 1000);
			},
			selectTaskIndex(index) {
				// 左侧为任务时，选择内部第几个
				var that = this;
				this.selectTaskLabelId = this.batchLabelList.labelList[index].id;
				if(this.batchLabelList.labelList[index].labelData == undefined) {
					this.labelData = "";
				} else {
					this.labelData = JSON.parse(
						this.batchLabelList.labelList[index].labelData
					);
				}
				this.addLabelData();
				that.problemIndex = 0;
				this.getQuestionAnswer();
			},
			getBatchTaskLabelList() {
				// 获取批次列表
				this.$api.project
					.getBatchTaskLabelList(1, 1000, this.labelProjectBatchTaskId)
					.then(res => {
						if(res.code == 200) {
							this.labelProjectBatchList = [];
							this.labelProjectBatchList = res.data;
							$(".left-top-projectlist .rw-list span").removeClass("color");
							setTimeout(function() {
								$(".left-top-projectlist .rw-list span")
									.eq(0)
									.click();
								if($(".left-top-projectlist").height() >= 610) {
									$(".left-top-projectlist").css("height", "610px");
								}
							}, 500);
						} else {
							this.$toaster.error(res.msg);
						}
					})
					.catch(() => {});
			},
			operation(e) {
				// 病历数据的显示
				e.stopPropagation();
				var idd = $(e.target).attr("idd");
				this.$api.project.getProjectBatchTask(idd).then(res => {
					this.title = "【" + res.data.taskNumber + "】病历数据";
					this.dialogcontent = res.data.data;
					this.dialogVisible = true;
				});
			},
			lookAnswerList() {
				// 查看答案的显示
				this.$api.project
					.getQuestionAnswerList(this.selectTaskLabelId)
					.then(res => {
						if(res.data.length == 0) {
							this.$toaster.error("无字幕标注");
						} else {
							this.lookAnswerContent = res.data;
							this.lookAnswer = true;
						}
					})
					.catch(() => {});
			},
			getProjectBatchTask() {
				// 获取任务详情
				this.$api.project
					.getProjectBatchTask(this.labelProjectBatchTaskId)
					.then(res => {
						this.batchLabelList = res.data;
						this.isNowReviewUser = res.data.isNowReviewUser;
						this.reviewStatus = res.data.reviewStatus;
						this.nowImage = res.data.imageUrl;
					})
					.catch(() => {});
			},
			getQuestionAnswer() {
				// 获取单个问题答案
				this.$api.project
					.getQuestionAnswer(
						this.selectTaskLabelId,
						this.projectQuestionList[this.problemIndex].projectQuestionId
					)
					.then(res => {
						if(
							res.data.answer == undefined ||
							JSON.stringify(res.data.answer) == "{}"
						) {
							this.ruleForm = {
								questionOptionIds: [],
								answer: ""
							};
						} else {
							if(res.data.questionType == 1) {
								this.ruleForm = {
									questionOptionIds: res.data.answer,
									answer: ""
								};
							} else if(res.data.questionType == 2) {
								this.ruleForm = {
									questionOptionIds: [],
									answer: res.data.answer
								};
							}
						}
						this.$refs["ruleForm"].resetFields();
					})
					.catch(() => {});
			},
			setProjectQuestion() {
				// 提交问题答案
				if(this.ruleForm.questionOptionIds.length == 0) {
					var questionOptionIds = "";
				} else {
					var questionOptionIds = this.ruleForm.questionOptionIds.join(",");
				}

				this.$api.project
					.setProjectQuestion(
						questionOptionIds,
						this.projectLabelId,
						this.selectTaskId,
						this.selectTaskLabelId,
						this.projectQuestionList[this.problemIndex].projectQuestionId,
						this.projectQuestionList[this.problemIndex].type,
						this.ruleForm.answer
					)
					.then(res => {})
					.catch(() => {});
			},
			changelabelType(e) {
				// 改变点，线，框状态
				$(".left-top2-list").scrollLeft(0);
				var labelType = jQuery(e.target).attr("labelType");
				this.labelType = labelType;
				jQuery(e.target)
					.addClass("color")
					.siblings()
					.removeClass("color");
			},
			goRightscroll() {
				// 标注工具向右滚动
				var aa = $(".left-top2-list").scrollLeft();
				$(".left-top2-list").animate({
						scrollLeft: aa + 300
					},
					500
				);
			},
			goLeftscroll() {
				// 标注工具向右滚动
				var aa = $(".left-top2-list").scrollLeft();
				$(".left-top2-list").animate({
						scrollLeft: aa - 300
					},
					500
				);
			},
			choiceLabel(e) {
				// 点击标注标签名称
				if(
					jQuery(e.target)
					.parent()
					.hasClass("color")
				) {
					jQuery(e.target)
						.parent()
						.removeClass("color");
					this.imageType = "0";
					this.labelId = "";
					this.toolName = "";
					this.lineType = "";
				} else {
					jQuery(".left-top2-list ul li").removeClass("color");
					jQuery(e.target)
						.parent()
						.addClass("color");
					this.imageType = jQuery(e.target).attr("imageType");
					this.imageSrc = jQuery(e.target).attr("imageSrc");
					this.labelId = jQuery(e.target).attr("idd");
					this.toolName = jQuery(e.target).attr("toolName");
					this.lineType = jQuery(e.target).attr("lineType");
					if(this.lineType == undefined) {
						this.lineType = "";
					}
				}
				$(".imageLabel-imgdrop").off();
				$(".imageLabel-content").off();
				$(".imageLabel-img-boxs").off();
				$(".imageLabel-delete").off();
				$(".imageLabel-edit").off();
				$(".imageLabel-input-ok").off();
				if(this.imageType == "0") {
					// 没有标注
				} else {
					// 点击点标注
					imageLabel({
						vuethat: this
					});
				}
			},
			deleteLabelList(e) {
				// 点击右侧叉号删除标注
				var labelId = $(e.target)
					.parent()
					.attr("labelId");
				var imageIndex = $(e.target)
					.parent()
					.attr("imageIndex");
				var labelIdIndex = this.labelIds.indexOf(labelId);
				if(this.labelCounts[labelIdIndex].length > 1) {
					this.labelCounts[labelIdIndex].splice(imageIndex, 1);
					$(".imageLabel-imgdrop[labelId=" + labelId + "]").each(function(i, v) {
						if($(v).attr("imageIndex") == imageIndex) {
							$(v).remove();
						} else if($(v).attr("imageIndex") > imageIndex) {
							var a = $(v).attr("imageIndex") - 1;
							$(v).attr("imageIndex", a);
						}
					});
				} else {
					this.labelIds.splice(labelIdIndex, 1);
					this.labelNames.splice(labelIdIndex, 1);
					this.labelCounts.splice(labelIdIndex, 1);
					$(".imageLabel-imgdrop[labelId=" + labelId + "]").remove();
				}
			},
			modifyLabelList(e) {
				// 右侧列表input移开焦点
				var labelId = $(e.target)
					.parent()
					.parent()
					.attr("labelId");
				var imageIndex = $(e.target)
					.parent()
					.parent()
					.attr("imageIndex");
				$(".imageLabel-imgdrop[labelId=" + labelId + "]").each(function(i, v) {
					if($(v).attr("imageIndex") == imageIndex) {
						var dataJson = JSON.parse($(v).attr("data-json"));
						dataJson.name = $(e.target).val();
						$(v).attr("data-json", JSON.stringify(dataJson));
					}
				});
			},
			addLabelData() {
				// 标注工具上加载详细标注内容
				var that = this;
				this.labelIds = [];
				this.labelNames = [];
				this.labelCounts = [];
				$(".imageLabel-content").empty();
				for(var i = 0; i < that.labelData.length; i++) {
					var idIndex = that.labelIds.indexOf(that.labelData[i].labelId); // labelId是否在总id内
					if(idIndex > -1) {
						that.labelCounts[idIndex].push(that.labelData[i].name);
						var imageIndex = that.labelCounts[idIndex].length - 1;
					} else {
						that.labelIds.push(that.labelData[i].labelId);
						var labelNames = {};
						var imageIndex = 0;
						labelNames.name = that.labelData[i].toolName;
						labelNames.src = that.labelData[i].imageSrc;
						that.labelNames.push(labelNames);
						that.labelCounts.push([that.labelData[i].name]);
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
						if(that.labelData[i].lineType == 1) {
							// 横向细实线
							var widtha = (
								(that.labelData[i].ex - that.labelData[i].x) *
								100
							).toFixed(4);
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-transverse imageLabel-fine imageLabel-solid xian1" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;width:" +
								widtha +
								'%;" labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						} else if(that.labelData[i].lineType == 2) {
							// 横向粗实线
							var widtha = (
								(that.labelData[i].ex - that.labelData[i].x) *
								100
							).toFixed(4);
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-transverse imageLabel-crude imageLabel-solid xian1" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;width:" +
								widtha +
								'%;" labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						} else if(that.labelData[i].lineType == 3) {
							// 横向细虚线
							var widtha = (
								(that.labelData[i].ex - that.labelData[i].x) *
								100
							).toFixed(4);
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-transverse imageLabel-fine imageLabel-dashed xian1" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;width:" +
								widtha +
								'%;" labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						} else if(that.labelData[i].lineType == 4) {
							// 横向粗虚线
							var widtha = (
								(that.labelData[i].ex - that.labelData[i].x) *
								100
							).toFixed(4);
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-transverse imageLabel-crude imageLabel-dashed xian1" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;width:" +
								widtha +
								'%;" labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						} else if(that.labelData[i].lineType == 5) {
							// 竖向细实线
							var heighta = (
								(that.labelData[i].ey - that.labelData[i].y) *
								100
							).toFixed(4);
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-vertical imageLabel-fine imageLabel-solid xian2" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;height:" +
								heighta +
								'%;" labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						} else if(that.labelData[i].lineType == 6) {
							// 竖向粗实线
							var heighta = (
								(that.labelData[i].ey - that.labelData[i].y) *
								100
							).toFixed(4);
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-vertical imageLabel-crude imageLabel-solid xian2" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;height:" +
								heighta +
								'%;" labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						} else if(that.labelData[i].lineType == 7) {
							// 竖向细虚线
							var heighta = (
								(that.labelData[i].ey - that.labelData[i].y) *
								100
							).toFixed(4);
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-vertical imageLabel-fine imageLabel-dashed xian2" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;height:" +
								heighta +
								'%;" labelId="' +
								that.labelData[i].labelId +
								'" imageIndex="' +
								imageIndex +
								'" ><div class="imageLable-i-s" ></div></div>'
							);
						} else if(that.labelData[i].lineType == 8) {
							// 竖向粗虚线
							var heighta = (
								(that.labelData[i].ey - that.labelData[i].y) *
								100
							).toFixed(4);
							var labelContent = $(
								'<div class="imageLabel-imgdrop imageLabel-vertical imageLabel-crude imageLabel-dashed xian2" style="left:' +
								lefta +
								"%;top:" +
								topa +
								"%;height:" +
								heighta +
								'%;" labelId="' +
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
							(that.labelData[i].ex - that.labelData[i].x) *
							100
						).toFixed(4);
						var heighta = (
							(that.labelData[i].ey - that.labelData[i].y) *
							100
						).toFixed(4);
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
								'%;" labelId="' +
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
								'%;" labelId="' +
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
								'%;" labelId="' +
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
								'%;" labelId="' +
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
					//						for(var n = 0; n < 4; n++) {
					//							labelContent.append('<em class="imageLable-em">');
					//						}
					$(".imageLabel-content").append(labelContent);
					labelContent.attr("data-json", JSON.stringify(that.labelData[i]));
				}
				$(".imageLable-i-s").hide();
				this.imageLabelChange();
			},
			getLabelData() {
				// 获取标注数据
				var labelData = [];
				$(".imageLabel-imgdrop").each(function() {
					labelData.push(JSON.parse($(this).attr("data-json")));
				});
				return JSON.stringify(labelData);
			},
			resetLabel() {
				// 重置标注
				this.$confirm("是否确定重置标注？", "", {
					customClass: "labelCustomClass",
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					this.labelIds = [];
					this.labelNames = [];
					this.labelCounts = [];
					$(".imageLabel-content").empty();
				});
			},
			updataLabel(e) {
				// 保存2，完成3标注
				var that = this;
				var status = $(e.target).attr("status");
				var statusTypeName = "";
				if(this.taskType == 1) {
					if(status == 2) {
						statusTypeName = "是否确定保存审核草稿？";
					} else {
						statusTypeName = "是否确定完成审核标注？";
					}
				} else {
					if(status == 2) {
						statusTypeName = "是否确定保存草稿？";
					} else {
						statusTypeName = "是否确定完成标注？";
					}
				}
//				this.toImage()
				this.isModify = "1";
				this.labelData = this.getLabelData();
				this.$confirm(statusTypeName, "", {
					customClass: "labelCustomClass",
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					if(
						this.ruleForm.questionOptionIds.length > 0 ||
						this.ruleForm.answer != ""
					) {
						this.setProjectQuestion();
					}
					this.$api.project
						.updateLabel(
							this.selectTaskLabelId,
							'',
							this.labelData,
							status,
							this.labelUrla
						)
						.then(res => {
							if(this.taskType == 2) {
								// 批次
								this.$toaster.ok(res.msg);
								if(status == 2) {
									var colorIndex = jQuery(".rw-list.color").index();
									this.labelProjectBatchList[colorIndex].status = 2;
								} else {
									var status3 = 0;
									for(var i = 0; i < this.labelProjectBatchList.length; i++) {
										if(this.labelProjectBatchList[i].status == 3) {
											status3++;
										}
									}
									this.getBatchTaskLabelList();
									if(status3 >= this.labelProjectBatchList.length - 1) {
										this.$confirm("本批次已全部完成，是否确定提交？", "", {
											customClass: "labelCustomClass",
											confirmButtonText: "确定",
											cancelButtonText: "取消",
											type: "success"
										}).then(() => {
											this.$api.label
												.submitBatchTask(this.labelProjectBatchTaskId)
												.then(res => {
													if(res.code == 200) {
														this.$router.push({
															path: "/label/mytask/mylabeltask"
														});
														this.$toaster.ok(res.msg);
													} else {
														this.$toaster.error(res.msg);
													}
												});
										});
									}
								}
							} else {
								if(status == 2) {
									this.getProjectBatchTask();
									this.$toaster.ok(res.msg);
								} else if(status == 3) {
									this.reviewTask(2);
									$(".imageLabel-imgdrop").off();
									$(".imageLabel-content").off();
									$(".imageLabel-img-boxs").off();
									$(".imageLabel-delete").off();
									$(".imageLabel-edit").off();
									$(".imageLabel-input-ok").off();
								}
							}
						});
				});
			},
			notPassTaskLabel() {
				// 审核不通过
				var that = this;
				this.$confirm("是否确定不通过？", "", {
					customClass: "labelCustomClass",
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					that.$api.project
						.notPassTaskLabel(
							that.labelProjectBatchTaskId,
							that.batchLabelList.reviewType + 1
						)
						.then(res => {
							that.getProjectBatchTask();
							setTimeout(function() {
								jQuery(".el-menu.el-menu--inline")
									.find("li")
									.last()
									.click();
							}, 500);
						});
				});
			},
			reviewTaskPass() {
				// 审核通过
				this.$confirm("是否确定通过审核？", "", {
					customClass: "labelCustomClass",
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning"
				}).then(() => {
					this.reviewTask(1);
				});
			},
			reviewTask(type) {
				//审核任务1通过，2不通过
				var that = this;
				that.$api.project
					.reviewTask(
						that.batchLabelList.taskReviewId,
						that.selectTaskLabelId,
						that.batchLabelList.reviewType,
						type
					)
					.then(res => {
						this.$toaster.ok(res.msg);
						that.getProjectBatchTask();
					});
			},
			prev(formName) {
				// 上一页
				if(
					this.ruleForm.questionOptionIds.length > 0 ||
					this.ruleForm.answer != ""
				) {
					this.setProjectQuestion();
				}
				if(this.problemIndex == 0) {
					this.$toaster.error("已经是第一页了");
				} else {
					$(".el-form-item__error").hide();
					this.problemIndex = this.problemIndex - 1;
					this.getQuestionAnswer();
				}
			},
			next(formName) {
				// 下一页
				this.$refs[formName].validate(valid => {
					if(valid) {
						this.setProjectQuestion();
						if(this.problemIndex == this.projectQuestionList.length - 1) {
							this.$toaster.error("已经是最后一页了");
						} else {
							this.problemIndex = this.problemIndex + 1;
							this.getQuestionAnswer();
						}
					} else {
						return false;
					}
				});
			},
			toImage() {
				//转为图片
				this.labelUrla = html2canvas(this.$refs.imageWrapper, {
						backgroundColor: null,
						useCORS: true,
						async: false
				}).then(canvas => {
						var dataURL = canvas.toDataURL('image/png')
						//						var html = '<img src="' + dataURL + '">'
						//						$("body").append(html)
						//						console.log(dataURL)
//						     var dataURL=encodeURIComponent(dataURL);//转义之后才能传输
						this.labelUrl = dataURL
						return dataURL
					})
					.catch(() => {
						console.log("error")
					});
			}
		}
	};
</script>

<style>
	@import "../../../assets/plugg/label/styles/jquery.imageLabel.min.css";
	@import "../../../assets/plugg/label/styles/edit.css";
</style>
