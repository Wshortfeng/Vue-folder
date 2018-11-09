<template>
  <el-breadcrumb separator="/">
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
      if(matched.length==1){
        return
      }
      const first = matched[1];
      const second =  matched[2];
      // if (first && first.name !== "我的项目"&&first.name !== "项目申请"&&first.name !== "状态统计"&&first.name !== "疑难杂症"&&first.name !== "我的标注工具"&&first.name !== "验收工具台") {
      //   matched = [{ path: "/project",name:'我的项目'}].concat(matched);
      // }

      if(first&&first.name == "ProjectUserInfo"){
       matched=[{ path: "",name:'我的'},{ path: "",name:'用户资料'}]
      }
     if(first&&first.name == "ProjectCapitalaccountList"){
      if (second && second.name == "ProjectCapitalAccount") {
        matched=[{ path: "",name:'我的'},{ path: "",name:'资金账户'}]
        }
        else if(second && second.name == "CapitalAccountProjectViewsMarkingTool"){
        matched=[{ path: "",name:'我的'},{ path: "/project/projectcapitalaccountlist/projectcapitalaccount",name:'资金账户'},{ path: "",name:'工作台'}]
        }
         else if(second && second.name == "CapitalAccountBatchDetail"){
        matched=[{ path: "",name:'我的'},{ path: "/project/projectcapitalaccountlist/projectcapitalaccount",name:'资金账户'},{ path: "",name:'批次详情'}]
        }
        else if(second && second.name == "CapitalAccountProjectDetail"){
        matched=[{ path: "",name:'我的'},{ path: "/project/projectcapitalaccountlist/projectcapitalaccount",name:'资金账户'},{ path: "",name:'项目详情'}]
        }
      }
       if(matched.length>2){
         if (second && second.name == "批次详情") {
          matched.splice(2,0,{ path: "/project/myproject/projectdetail",name:'项目详情'})
        }else if (second && second.name == "工作台") {
          matched.splice(2,0,{ path: "/project/myproject/projectdetail",name:'项目详情'})
        }
        else if (second && second.name == "BatchDeatilMarkingTool") {
          matched=[{ path: "",name:'我的'},{ path: "/project/myproject",name:'我的项目'},{ path: "/project/myproject/projectdetail",name:'项目详情'},{ path: "/project/myproject/batchdetail",name:'批次详情'},{ path: "",name:'工作台'}]
        }
        else if(second && second.name == "ProjectMyMessage"){
        matched=[{ path: "",name:'我的'},{ path: "",name:'我的消息'}]
        }
        else if(second && second.name == "MessageProjectViewsMarkingTool"){
        matched=[{ path: "",name:'我的'},{ path: "/project/mymessagelist/projectmymessage",name:'我的消息'},{ path: "",name:'工作台'}]
        }
        else if(second && second.name == "ProjectMyMessageDetail"){
        matched=[{ path: "",name:'我的'},{ path: "/project/mymessagelist/projectmymessage",name:'我的消息'},{ path: "",name:'项目详情'}]
        }
         else if(second && second.name == "MessageBatchDetail"){
        matched=[{ path: "",name:'我的'},{ path: "/project/mymessagelist/projectmymessage",name:'我的消息'},{ path: "",name:'批次详情'}]
        }
         else if(second && second.name == "ProjectSouthDisease"){
        matched=[{ path: "",name:'我的'},{ path: "/project/diseaselist/projectsouthdisease",name:'疑难杂症'}]
        }
          else if(second && second.name == "DiseaseProjectViewsMarkingTool"){
        matched=[{ path: "",name:'我的'},{ path: "/project/diseaselist/projectsouthdisease",name:'疑难杂症'},{ path: "",name:'工作台'}]
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

