<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <el-breadcrumb-item v-for="(item,index) in levelList" :key="index" v-if="item.name">
      <router-link :to="item.redirect||item.path">{{item.name}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  data() {
    return { levelList: null };
  },
  methods: {
    /** * 生成面包屑的方法 */

    getBreadcrumb() {
      var matched = this.$route.matched.filter(item => item.name);
      const first = matched[1];
      const second =  matched[2];
      if (first && first.name !== "项目大厅"&&first.name !== "我的任务"&&first.name !== "状态统计 "&&first.name !== "疑难杂症 "&&first.name !== "工作台 "&&first.name !== "我的") {
        matched = [{ path: "/label",name:'项目大厅'}].concat(matched);
      }
      else if(first && first.name=='我的'){
       if(second && second.name == "我的资料"){
        matched=[{ path: "",name:'我的'},{ path: "/label/my/userinfo",name:'我的资料'}]
        }
        else if(second && second.name == "我的消息"){
        matched=[{ path: "",name:'我的'},{ path: "/label/my/mymessage",name:'我的消息'}]
        }
        else if(second && second.name == "资金账户"){
        matched=[{ path: "",name:'我的'},{ path: "/label/my/capitalaccount",name:'资金账户'}]
        }
       else if(second && second.name == "CapitalAccountLabelProjectDetail"){
        matched=[{ path: "",name:'我的'},{ path: "/label/my/capitalaccount",name:'资金账户'},{ path: "",name:'项目详情'}]
        }
        else if(second && (second.name == "CapitalAccountMarkTool"||second.name=="CapitalAccountLookMarkTool")){
        matched=[{ path: "",name:'我的'},{ path: "/label/my/capitalaccount",name:'资金账户'},{ path: "",name:'工作台'}]
        }
      }
      if (second && second.name == "我的标注任务") {
        matched=[{ path: "",name:'我的'},{ path: "",name:'我的任务'},{ path: "",name:'我的标注任务'}]
      }else if(second && second.name == "我的审核任务") {
        matched=[{ path: "",name:'我的'},{ path: "",name:'我的任务'},{ path: "",name:'我的审核任务'}]
      }else if(second && second.name == "MyLabelTaskBatchDetail"){
         matched=[{ path: "",name:'我的'},{ path: "",name:'我的任务'},{ path: "/label/mytask/mylabeltask",name:'我的标注任务'},{ path: "",name:'批次详情'}]
      }else if(second && (second.name == "LabelMarkingTool"||second.name == "LookLabelMarkingTool")){
         matched=[{ path: "",name:'我的'},{ path: "",name:'我的任务'},{ path: "/label/mytask/mylabeltask",name:'我的标注任务'},{ path: "",name:'工作台'}]
      }else if(second && second.name == "LabelProjectLableReviewDetail"){
        matched=[{ path: "",name:'我的'},{ path: "",name:'我的任务'},{ path: "/label/mytask/mylabeltask",name:'我的标注任务'},{ path: "",name:'项目详情'}]
      }else if(second && second.name == "ReviewMarkingTool"){
        matched=[{ path: "",name:'我的'},{ path: "",name:'我的任务'},{ path: "/label/mytask/myreviewtask",name:'我的审核任务'},{ path: "",name:'工作台'}]
      }else if(second && second.name == "ReviewProjectLableReviewDetail"){
        matched=[{ path: "",name:'我的'},{ path: "",name:'我的任务'},{ path: "/label/mytask/myreviewtask",name:'我的审核任务'},{ path: "",name:'项目详情'}]
      } else if(second && second.name == "MymessageProjectDetail"){
      matched=[{ path: "",name:'我的'},{ path: "/label/my/mymessage",name:'我的消息'},{ path: "",name:'项目详情'}]
      }
      else if(second && (second.name == "MyMessageMarkTool"||second.name == "MyMessageLookMarkTool")){
      matched=[{ path: "",name:'我的'},{ path: "/label/my/mymessage",name:'我的消息'},{ path: "",name:'工作台'}]
      }
      if(first && first.name == "ProjectHall"){
        if (second && second.name == "项目大厅") {
        matched=[{ path: "",name:'我的'},{ path: "",name:'项目大厅'}]
      }else if(second && second.name == "ProjectHallDetail") {
        matched=[{ path: "",name:'我的'},{ path: "/label/projecthall/projecthalllist",name:'项目大厅'},{ path: "",name:'项目详情'}]
      }
      }else if(first && first.name == "SouthDiseaseindex"){
        if (second && second.name == "SouthDiseaseList") {
        matched=[{ path: "",name:'我的'},{ path: "",name:'疑难杂症'}]
      }else if(second && second.name == "SouthDiseaseLabelViewsMarkingTool") {
        matched=[{ path: "",name:'我的'},{ path: "/label/southdisease/southdiseaselist",name:'疑难杂症'},{ path: "",name:'工作台'}]
      }else if(second && second.name == "ProjectHallDetail") {
        matched=[{ path: "",name:'我的'},{ path: "/label/projecthall/projecthalllist",name:'项目大厅'},{ path: "",name:'项目详情'}]
      }
      }
      this.levelList = matched.slice(1,matched.length);
    }
  },
  mounted() {
    this.getBreadcrumb();
  },
  watch: {
    $route(to, from) {
      this.getBreadcrumb();
    }
  }
};
</script>

