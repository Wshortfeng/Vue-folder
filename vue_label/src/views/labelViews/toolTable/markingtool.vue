<!--标注方工具台标注-->
<template>
	<div :class="isScreen==1 ? 'label-tool label-tool-fixed':'label-tool'">
		<!--左侧标注工具-->
		<div class="label-tool-left">
			<div class="left-top">
				<div class="left-top-projectinfo" v-if="isWorkBench==1">
					<template>
						<el-select class="labelselect" popper-append-to-body="false" v-model="selectedBatch" placeholder="请选择批次进行标注" @visible-change="changeBatch()" @change="selectedBatchStatue()">
							<el-option class="labelselecta" v-for="(item,index) in userLabelTaskList" :key="item.batchNumber" :label="item.batchNumber" :value="index">
								<span style="float: left;color: #fff;font-weight: normal;font-size: 13px;">{{item.batchNumber}}</span>
								<span style="float: right;color: #fff;font-weight: normal;font-size: 13px;display: inline-block;max-width: 130px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{item.projectName}}</span>
							</el-option>
						</el-select>
					</template>
				</div>
				<div class="left-top-projectinfo" v-if="isWorkBench==0">
					<p :class="{projectname:true,projectnamea:taskType==1}">{{bzProject.projectName}}</p>
					<p v-if="taskType==2" class="projectname">
						<span>{{labelProjectBatchList[0].batchNumber}}</span>
						<span>（{{labelProjectBatchList[0].batchStatus|labelbatchstate}}）</span>
					</p>
					<div class="left-top-projectlistnr">
						<div class="left-top-projectlist" style="overflow: hidden;" v-if="taskType==1">
							<el-row class="tac">
								<el-col :span="24">
									<el-menu class="el-menu-vertical-demo" :default-active="submenuIndex" background-color="#004080" text-color="#fff" active-text-color="#004080">
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
							<el-pagination background layout="prev, pager, next" class="pageTap" @current-change="handleCurrentChange" :pager-count="5" :current-page="currentPage" :page-size="pageSize" :total="total">
      						</el-pagination>
						</div>
					</div>
				</div>
				<div class="left-top-labelname" v-if="(taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4)))&&isWorkBench==0">
					<a class="color" labelType="1" @click="changelabelType($event)">点标注</a>
					<a labelType="2" @click="changelabelType($event)">线标注</a>
					<a labelType="3" @click="changelabelType($event)">框标注</a>
				</div>
				<!--<div class="left-top-right-screen" v-if="(taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4)))&&isWorkBench==0">-->
				<div class="left-top-right-screen" v-if="isWorkBench==0">
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
			<div class="left-top2-listb" v-show="(taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4)))&&isWorkBench==0">
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
							<a class="mengcengnei" lineType="1" idd="a" imageType="2" :imageSrc="src1" toolName="横向细实线" @click="choiceLabel($event)"></a>
							<img :src="src1">
							<span>横向细实线</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="2" idd="b" imageType="2" :imageSrc="src2" toolName="横向粗实线" @click="choiceLabel($event)"></a>
							<img :src="src2">
							<span>横向粗实线</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="3" idd="c" imageType="2" :imageSrc="src3" toolName="横向细虚线" @click="choiceLabel($event)"></a>
							<img :src="src3">
							<span>横向细虚线</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="4" idd="d" imageType="2" :imageSrc="src4" toolName="竖向粗虚线" @click="choiceLabel($event)"></a>
							<img :src="src4">
							<span>横向粗虚线</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="5" idd="e" imageType="2" :imageSrc="src5" toolName="竖向细实线" @click="choiceLabel($event)"></a>
							<img :src="src5">
							<span>竖向细实线</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="6" idd="f" imageType="2" :imageSrc="src6" toolName="竖向粗实线" @click="choiceLabel($event)"></a>
							<img :src="src6">
							<span>竖向粗实线</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="7" idd="g" imageType="2" :imageSrc="src7" toolName="竖向粗虚线" @click="choiceLabel($event)"></a>
							<img :src="src7">
							<span>竖向细虚线</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="8" idd="h" imageType="2" :imageSrc="src8" toolName="竖向细虚线" @click="choiceLabel($event)"></a>
							<img :src="src8">
							<span>竖向粗虚线</span>
						</li>
					</ul>
					<ul v-show="labelType==3">
						<li>
							<a class="mengcengnei" lineType="9" idd="i" imageType="3" :imageSrc="src9" toolName="细实框" @click="choiceLabel($event)"></a>
							<img :src="src9">
							<span>细实框</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="10" idd="j" imageType="3" :imageSrc="src10" toolName="粗实框" @click="choiceLabel($event)"></a>
							<img :src="src10">
							<span>粗实框</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="11" idd="k" imageType="3" :imageSrc="src11" toolName="细虚框" @click="choiceLabel($event)"></a>
							<img :src="src11">
							<span>细虚框</span>
						</li>
						<li>
							<a class="mengcengnei" lineType="12" idd="l" imageType="3" :imageSrc="src12" toolName="粗虚框" @click="choiceLabel($event)"></a>
							<img :src="src12">
							<span>粗虚框</span>
						</li>
					</ul>
				</div>
				<i class="el-icon-arrow-left" @click="goLeftscroll()"></i>
				<i class="el-icon-arrow-right" @click="goRightscroll()"></i>
			</div>
			<div :class="(projectQuestionList.length!=0 && (taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4))))&&isWorkBench==0 ? 'label-tool-image':'label-tool-image label-tool-imagenota'" v-if="isWorkBench==0">
				<div class="imageLabel-box">
					<div class="imageLabel">
						<div class="imageLabel-img-boxs">
							<span class="imageLabel-img-body">
			                    <div class="imageLabel-loading-body">
			                      <div class="imageLabel-loading">

			                      </div>
			                    </div>
			                    <div class="imageLabel-jisuan" id="jisuan" ref="imageWrapper">
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

			<div class="problemnr" v-if="(projectQuestionList.length!=0 && (taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4))))&&isWorkBench==0">
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
									<div slot="reference" class="right-list-remark right-list-remarka" v-if="taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4))">{{indexa + 1}}.<input v-model="labelCounts[index][indexa]" @blur="modifyLabelList($event)" @change="filteremoRigtList($event,index,indexa)" maxlength="50" placeholder="请备注" /></div>
									<!--<div slot="reference" class="right-list-remark" v-else="">{{indexa + 1}}.<input v-model="labelCounts[index][indexa]" readonly="readonly" /></div>-->
									<span class="right-list-remarka" slot="reference" v-else="">{{indexa + 1}}.{{labelCounts[index][indexa]}}</span>
								</el-popover>
								<span v-if="itema.length<=5">
									<div class="right-list-remark" v-if="taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4))">{{indexa + 1}}.<input v-model="labelCounts[index][indexa]" @blur="modifyLabelList($event)" @change="filteremoRigtList($event,index,indexa)" maxlength="50" placeholder="请备注" /></div>
									<!--<div class="right-list-remark" v-else="">{{indexa + 1}}.<input v-model="labelCounts[index][indexa]" readonly="readonly" /></div>-->
									<span class="right-list-remarka" v-else="">{{indexa + 1}}.{{labelCounts[index][indexa]}}</span>
								</span>
								<img v-if="taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4))" src="../../../assets/img/labellistclose.png" @click="deleteLabelList($event)" />
							</li>
						</ul>
					</div>
				</el-scrollbar>
			</div>
			<div class="subitles" v-if="selectTaskLabelId!=''&&isWorkBench==0">
				<p>字幕标注</p>
				<a class="look-answer" @click="lookAnswerList()">查看答案</a>
			</div>
		</div>
		<!--底部按钮-->
		<div class="label-tool-bottom" v-if="isWorkBench==0">
			<a v-if="taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4))" status="2" @click="updataLabel($event)">保存草稿</a>
			<a v-if="taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4))" @click="resetLabel()">重置</a>
			<a v-if="taskType==2 || (isNowReviewUser==1&&reviewStatus==3&&batchLabelList.agreedLabelId==selectTaskLabelId&&(batchLabelList.status==1||batchLabelList.status==3||batchLabelList.status==4))" status="3" @click="updataLabel($event)">完成</a>
			<a v-if="taskType==1 && isNowReviewUser==1&&reviewStatus==1&&selectTaskLabelId!=''&&batchLabelList.disAgreedLabelId.split(',').indexOf(selectTaskLabelId.toString())==-1" @click="reviewTaskPass()">通过</a>
			<a v-if="taskType==1 && isNowReviewUser==1&&reviewStatus==1&&selectTaskLabelId!=''&&batchLabelList.disAgreedLabelId.split(',').indexOf(selectTaskLabelId.toString())==-1" @click="notPassTaskLabel()">不通过</a>
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
				isScreen: 0, // 工作台是否0不全屏，1全屏
				labelSize: 10, // 图片放大缩小尺寸
				randomColor: [], // 随机颜色
				isWorkBench: 0, // 是否从title直接进入工作台0不是，1是
				userLabelTaskList: [], // 用户待提交批次
				submenuIndex: 0,
				selectedBatch: '', // 选中的待提交批次
				projectLabelId: "", // 项目id
				labelProjectBatchTaskId: "", // 批次或任务id
				taskType: "", //任务类型1（任务），2（批次）
				bzProject: {}, // 项目详情
				dialogVisible: false, //病历数据详情显示
				lookAnswer: false, // 查看答案详情显示隐藏
				labelProjectBatchList: [{}], // 批次的任务列表
				pageSize: 5, // 每页几条
				currentPage: 1, // 当前第几页
				total: 0, // 共几条数据
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
				src1: "http://public-1255172072.cos.ap-shanghai.myqcloud.com/e518f72a-c02d-4bdb-9dd0-f086c8c23f15_201811142112164182928.png",
				src2: "http://public-1255172072.cos.ap-shanghai.myqcloud.com/97ebdb0b-70cf-4cc7-b295-557fb4dff5b8_201811142113067058525.png",
				src3: "http://public-1255172072.cos.ap-shanghai.myqcloud.com/beb9a14a-38de-4d5f-82d6-007e04c58b58_201811142113264337816.png",
				src4: "http://public-1255172072.cos.ap-shanghai.myqcloud.com/43528244-4750-40f7-8832-d3f5fdcbe5fb_201811142113425749755.png",
				src5: "http://public-1255172072.cos.ap-shanghai.myqcloud.com/854fb64b-4abe-43e0-90c6-0d0a01e4f97f_201811142113533875877.png",
				src6: "http://public-1255172072.cos.ap-shanghai.myqcloud.com/57c8d4ac-768f-45b0-8485-d03186e6346e_201811142114124722499.png",
				src7: "http://public-1255172072.cos.ap-shanghai.myqcloud.com/87636b95-5ad1-4349-a901-ac0d5494f7af_201811142114339248857.png",
				src8: "http://public-1255172072.cos.ap-shanghai.myqcloud.com/9884646c-ebd0-4f47-aaff-bbbd470054f5_201811142114451574419.png",
				src9: "http://public-1255172072.cos.ap-shanghai.myqcloud.com/6df39bf2-2fa2-42a0-bd39-acbe92457f8a_201811142115138073671.png",
				src10: "http://public-1255172072.cos.ap-shanghai.myqcloud.com/9292d894-eec7-4a4a-b464-76fbabdfe5de_201811142115335625538.png",
				src11: "http://public-1255172072.cos.ap-shanghai.myqcloud.com/e949fd96-f838-41a8-ac76-590c91bffd22_201811142115482103623.png",
				src12: "http://public-1255172072.cos.ap-shanghai.myqcloud.com/b87ba988-0ada-43e1-8559-9ee50aefbf96_201811142116030108638.png",
				nowImage: "", // 当前标注地图片
				nowImageWidth: "", // 当前标注地图片width
				nowImageHeight: "", // 当前标注地图片height
				naturalWidth: "", // 当前标注地图片原始width
				naturalHeight: "", // 当前标注地图片原始height
				labelUrl: "", // 完成时标注的图片
				labelUrla: "",
				lineType: "", // 选择线的状态
				labelType: 1, // 标注工具类型点线框
				imageType: "0", // 标注工具类型点线框
				imageSrc: "", // 当前选中的工具图片链接
				labelId: "", // 当前选中的工具id
				toolName: "", // 当前选中的工具名称
				labelIds: [], // 标注过的工具id
				labelNames: [
					//				{
					//					name: "黑点",
					//					src: ""
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
		created() {
			this.$watch("labelSize", function(newValue, oldValue) {
				this.changeLabelSize()
			})
		},
		mounted() {
			var isWorkBench = this.$route.query.ISWORKBENCH
			if(isWorkBench == undefined) {
				this.isWorkBench = 0
			} else if(isWorkBench == 1) {
				this.isWorkBench = 1
			}
			var that = this;
			for(var j = 1; j < 100; j++) {
				var randomColor = that.getRandomColor();
				that.randomColor.push(randomColor);
			}
			console.log(this.isWorkBench)
			if(this.isWorkBench == 1) {
				this.getUserLabelTaskList()
			} else {
				this.defaultLoading()
			}
		},
		methods: {
			defaultLoading() { // 不从title首次进入加载项目
				var that = this
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
									that.naturalWidth = i
									that.naturalHeight = n
									i / n > t / l ?
										a.css({
											width: "100%",
											height: (n / i) * t
										}) :
										a.css({
											height: "100%",
											width: (i / n) * l
										});
									if(that.batchLabelList.isNowReviewUser == 1&&that.batchLabelList.agreedLabelId!=undefined) {
										that.submenuIndex = that.batchLabelList.labelList.length-1
										that.selectTaskIndex(that.submenuIndex);
									} else {
										that.submenuIndex = 0
										that.selectTaskIndex(0);
									}
								}
								that.nowImageWidth = a.width()
								that.nowImageHeight = a.height()
								$(".imageLabel-loading-body").hide();
							}, 1000);
							//						setTimeout(function() {
							//							that.selectTaskIndex(0);
							//						}, 500);
						})
						.catch(() => {});
				} else if(taskType == 2) {
					// 批次
					this.labelProjectBatchTaskId = labelProjectBatchTaskId;
					this.getBatchTaskLabelList();
				}
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
				$(".left-top-projectlist").slideDown("500");
			},
			changeHeight1() {
				// 左侧任务列表显示隐藏
				$(".left-top-projectlist").slideUp("500");
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
			changeBatch() { // 选择批次聚焦时改变白色三角
				$(".el-select-dropdown").css("background", "#004080")
				$(".el-select-dropdown").css("border-color", "#6985A5")
				$(".popper__arrow").addClass("popper__arrow_label")
			},
			getUserLabelTaskList() { // 获取未提交批次列表
				this.$api.label
					.getUserLabelTaskList(
						1,
						1000,
						'',
						1
					)
					.then(res => {
						this.userLabelTaskList = res.data.list;
					});
			},
			selectedBatchStatue() { // 选择未提交批次
				this.$utils.setSession("LABELPROJECTID", this.userLabelTaskList[this.selectedBatch].projectId);
				this.$utils.setSession("LABELPROJECTBATCHTASKID", this.userLabelTaskList[this.selectedBatch].id);
				this.$utils.setSession("LABELTYPE", 2);
				this.isWorkBench = 0
				this.defaultLoading()
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
				that.nowImage = ""
				$(".imageLabel-jisuan").css({
					width: 0,
					height: 0,
					overflow: "hidden"
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
					if(i == 0) {
						
					} else {
						clearInterval(imagewidth);
						that.naturalWidth = i
						that.naturalHeight = n
						i / n > t / l ?
							a.css({
								width: "100%",
								height: (n / i) * t
							}) :
							a.css({
								height: "100%",
								width: (i / n) * l
							});
						that.nowImageWidth = a.width()
						that.nowImageHeight = a.height()
						that.$api.project.getProjectBatchTask(that.selectTaskId).then(res => {
							that.selectTaskLabelId = res.data.labelList[0].id;
							if(res.data.labelList[0].labelData == undefined || res.data.labelList[0].labelData == "") {
								that.labelData = "";
							} else {
								that.labelData = JSON.parse(res.data.labelList[0].labelData);
							}
							that.addLabelData();
							that.problemIndex = 0;
							that.getQuestionAnswer();
							that.labelSize = 10
							that.changeLabelSize()
						});
					}
					$(".imageLabel-loading-body").hide();
				}, 1000);
			},
			selectTaskIndex(index) {
				// 左侧为任务时，选择内部第几个
				var that = this;
				this.selectTaskLabelId = this.batchLabelList.labelList[index].id;
				if(this.batchLabelList.labelList[index].labelData == undefined || this.batchLabelList.labelList[index].labelData == "") {
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
		    handleCurrentChange: function(currentPage) {
		      this.currentPage = currentPage;
		      this.getBatchTaskLabelList();
		    },
			getBatchTaskLabelList() {
				// 获取批次列表
				this.$api.project
					.getBatchTaskLabelList(
						this.currentPage,
						this.pageSize,
						this.labelProjectBatchTaskId
					)
					.then(res => {
						if(res.code == 200) {
							this.total = res.pageInfo.total;
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
					if(this.isScreen == 1) {
						setTimeout(function() {
							$(".v-modal").click()
						}, 1)
					}
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
							if(this.isScreen == 1) {
								setTimeout(function() {
									$(".v-modal").click()
								}, 1)
							}
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
				if(this.projectQuestionList.length > 0) {
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
				}

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
				var labelType = $(e.target).attr("labelType");
				this.labelType = labelType;
				$(e.target)
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
					$(e.target)
					.parent()
					.hasClass("color")
				) {
					$(e.target)
						.parent()
						.removeClass("color");
					this.imageType = "0";
					this.labelId = "";
					this.toolName = "";
					this.lineType = "";
				} else {
					$(".left-top2-list ul li").removeClass("color");
					$(e.target)
						.parent()
						.addClass("color");
					this.imageType = $(e.target).attr("imageType");
					this.imageSrc = $(e.target).attr("imageSrc");
					this.labelId = $(e.target).attr("idd");
					this.toolName = $(e.target).attr("toolName");
					this.lineType = $(e.target).attr("lineType");
					if(this.lineType == undefined) {
						this.lineType = "";
					}
				}
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
				this.changeLabelListColor()
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
					.parents("li")
					.attr("labelId");
				var imageIndex = $(e.target)
					.parents("li")
					.attr("imageIndex");
				$(".imageLabel-imgdrop[labelId=" + labelId + "]").each(function(i, v) {
					if($(v).attr("imageIndex") == imageIndex) {
						var dataJson = JSON.parse($(v).attr("data-json"));
						dataJson.note = $(e.target).val();

						$(v).attr("data-json", JSON.stringify(dataJson));
					}
				});
			},
			changeLabelListColor() { // 鼠标移动到图形标注点后对应标注变色
				$(".imageLabel-imgdrop").off()
				if(this.imageType == "0") {
					$(".imageLabel-imgdrop").on('mouseenter', function() {
						var labelId = $(this).attr("labelId")
						var imageIndex = $(this).attr("imageIndex")
						$(".right-list-img li").each(function(i, v) {
							if($(v).attr("labelId") == labelId && $(v).attr("imageIndex") == imageIndex) {
								$(v).find(".right-list-remarka").addClass('color')
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
								$(v).find(".right-list-remarka").removeClass('color')
							}
						})
					})
				} else {
					$(".imageLabel-imgdrop").on('mouseenter', function() {
						$(this).find('.imageLable-i-s').show()
						var labelId = $(this).attr("labelId")
						var imageIndex = $(this).attr("imageIndex")
						$(".right-list-img li").each(function(i, v) {
							if($(v).attr("labelId") == labelId && $(v).attr("imageIndex") == imageIndex) {
								$(v).find(".right-list-remarka").addClass('color')
								var offtop = $(v).position().top
								var scrollTopa = $(".right-list .el-scrollbar .el-scrollbar__wrap").scrollTop()
								$(".right-list .el-scrollbar .el-scrollbar__wrap").animate({
									scrollTop: offtop + scrollTopa
								}, 500)
							}
						})
					}).on('mouseleave', function() {
						$(this).find('.imageLable-i-s').hide()
						var labelId = $(this).attr("labelId")
						var imageIndex = $(this).attr("imageIndex")
						$(".right-list-img li").each(function(i, v) {
							if($(v).attr("labelId") == labelId && $(v).attr("imageIndex") == imageIndex) {
								$(v).find(".right-list-remarka").removeClass('color')
							}
						})
					})
				}
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
			getLabelData() { // 获取标注数据
				var labelData = [];
				$(".imageLabel-imgdrop").each(function() {
					labelData.push(JSON.parse($(this).attr("data-json")));
				});
				return JSON.stringify(labelData);
			},
			resetLabel() { // 重置标注
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
					})
					.catch(() => {

					});
			},
			updataLabel(e) { // 保存2，完成3标注
				var that = this;
				this.labelSize = 10
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
				if(status == 3 && that.isScreen == 0) {
					$(".screen-image img").click()
				}
				if(status == 3 && that.isScreen == 0) {
					var offsettopa = $("#jisuan").offset().top
					var heighta = $("#jisuan").height()
					var offsetlefta = $("#jisuan").offset().left
					var widtha = $("#jisuan").width()
					if(offsettopa < $(window).scrollTop() || ($(window).height() - heighta - offsettopa) < 0 || offsetlefta < $(window).scrollLeft() || ($(window).width() - widtha - offsetlefta) < 0) {
						this.$toaster.error("请将标注区域放在可视范围内或全屏操作");
						return
					}
					this.toImage()
				} else if(status == 3 && that.isScreen == 1) {
					this.toImage()
				} else {
					this.labelUrl = ""
				}

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
								this.labelUrl,
								this.labelData,
								status
							)
							.then(res => {
								if(this.taskType == 2) {
									// 批次
									this.$toaster.ok(res.msg);
									if(status == 2) {
										var colorIndex = $(".rw-list.color").index();
										this.labelProjectBatchList[colorIndex].status = 2;
									} else {
										var status3 = 0;
										for(var i = 0; i < this.labelProjectBatchList.length; i++) {
											if(this.labelProjectBatchList[i].status == 3) {
												status3++;
											}
										}
										var rwListIndex = $(".rw-list.color").index()
										this.getBatchTaskLabelList();
										if((status3 >= this.labelProjectBatchList.length - 1 && this.labelProjectBatchList[rwListIndex].status != 3) || status3 >= this.labelProjectBatchList.length) {
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
										this.imageType = "0";
										this.changeLabelListColor();
										$(".imageLabel-content").off();
										$(".imageLabel-img-boxs").off();
										$(".imageLabel-delete").off();
										$(".imageLabel-edit").off();
										$(".imageLabel-input-ok").off();
									}
								}
							});
					})
					.catch(() => {

					});
			},
			notPassTaskLabel() { // 审核不通过
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
								that.selectTaskLabelId,
								that.batchLabelList.reviewType + 1
							)
							.then(res => {
								that.getProjectBatchTask();
								setTimeout(function() {
									var indexa = $(".el-menu-item.is-active").index()
									$(".el-menu.el-menu--inline")
										.find("li").eq(indexa + 1)
										.click();
								}, 500);
							});
					})
					.catch(() => {

					});
			},
			reviewTaskPass() { // 审核通过
				this.$confirm("是否确定通过审核？", "", {
						customClass: "labelCustomClass",
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					}).then(() => {
						this.reviewTask(1);
					})
					.catch(() => {

					});
			},
			reviewTask(type) { //审核任务1通过，2不通过
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
			prev(formName) { // 上一页
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
			next(formName) { // 下一页
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
			toImage() { //转为图片
				this.labelUrla = html2canvas(this.$refs.imageWrapper, {
						backgroundColor: null,
						useCORS: true,
						async: false
					}).then(canvas => {
						var dataURL = canvas.toDataURL('image/png')
						this.labelUrl = dataURL
						return dataURL
					})
					.catch(() => {

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
	@import "../../../assets/plugg/label/styles/jquery.imageLabel.min.css";
	@import "../../../assets/plugg/label/styles/edit.css";
</style>