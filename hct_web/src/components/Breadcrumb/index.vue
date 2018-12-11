<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if='item.meta.title'>
        <span v-if='item.redirect==="noredirect"||index==levelList.length-1' :class="{noredirect:true,lastColor:index==levelList.length-1}" >{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name);
      const first = matched[0];
      const second = matched[1];
       const third  = matched[2];
      if (first && first.name !== "Layout") {
        matched = [{ path: "/", meta: { title: "首页" } }].concat(matched);
      }
      if (second && second.name == "UserManagement") {
         if(third&&third.name=='UserInfo'){
          matched=[{ path: "",name:'UserManagementList',meta:{title:'用户管理'},redirect:'noredirect'},{ path: "/usermanagement/list",name:'UserManagementList',meta:{title:'用户管理'}},third]
        }else if(third&&third.name=='JurisDiction'){
					matched=[{ path: "",name:'UserManagementList',meta:{title:'用户管理'},redirect:'noredirect'},{ path: "/usermanagement/groupmanagement",name:'GroupManagement',meta:{title:'组管理'}},third]
				}
      }
       if (second && second.name == "CommodityManagement") {
         if(third&&third.name=='CommodityIinfo'){
          if(this.$route.params.type=='0'){
            third.meta.title='新增商品'
          }else{
            third.meta.title='修改商品'
          }
          matched=[{ path: "",name:'CommodityManagement',meta:{title:'商品管理'},redirect:'noredirect'},{ path: "/commoditymanagement/list",name:'CommodityManagementList',meta:{title:'商品管理'}},third]
        }
      }
			
      this.levelList = matched;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .noredirect {
    color: #97a8be;
    cursor: text;
  }
  .lastColor{
     color: #2165D4;
    cursor: text;
  }
}
// 面包屑
.el-breadcrumb {
    .el-breadcrumb__item {
        .el-breadcrumb__inner {
            a {
                color: #97a8be;
                font-size: 14px;
                font-weight: normal
            }
        }
    }
}




</style>
