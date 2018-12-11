<template>
  <div class="projectLayout">
    <div class="header-top"></div>
    <div class="header" style="border-bottom:1px solid gray;">
      <div class="nav-header">
        <div class="isLogin">
          <div>
            <!-- <img src="/labelcloud/static/img/logo.7a94458.png" alt="logo"> -->
            <img :src="logoImg" alt="logo" class="logoImg">
            <!-- <span class="logo-title">医疗标注云</span> -->
            <el-menu :router="true" :default-active="defaultActive" class="el-menu-demo" mode="horizontal" style="display:inline-block;">
              <el-menu-item index="/project/myproject" :route="{path:'/project/myproject'}" @click="changeNav()"><i class="fa fa-th-list"></i>&nbsp;&nbsp;我的项目</el-menu-item>
              <el-menu-item index="/project/projectapplication" :route="{path:'/project/projectapplication'}" @click="changeNav()"><i class="fa fa-file-text"></i>&nbsp;&nbsp;项目申请</el-menu-item>
              <el-menu-item index="/project/diseaselist" :route="{path:'/project/diseaselist'}" @click="changeNav()"> <i class="fa fa-thumb-tack"></i>&nbsp;&nbsp;疑难杂症</el-menu-item>
              <el-menu-item index="/project/markingtoolmanagement" :route="{path:'/project/markingtoolmanagement'}" @click="changeNav()"><i class="fa fa-pencil"></i>&nbsp;&nbsp;我的标注工具</el-menu-item>
              <el-menu-item index="/project/projectstatestatistics" :route="{path:'/project/projectstatestatistics'}" @click="changeNav()"><i class="fa fa-pie-chart"></i>&nbsp;&nbsp;状态统计</el-menu-item>
              <el-menu-item index="/project/other" style="display:none;"></el-menu-item>
            </el-menu>
            <div class="header-right">
              <el-dropdown class="user" style="text-align:right;"  :show-timeout="0">
                <span class="el-dropdown-link">
                  <el-badge class="item limitname" v-if="nickName.length<6">{{nickName}}</el-badge>
                  <el-badge class="item limitname" :title="nickName" v-else>{{nickName}}</el-badge>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="text-align:center;" >
                  <el-dropdown-item @click.native="goTo('ProjectUserInfo')">用户资料</el-dropdown-item>
                  <el-dropdown-item @click.native="updateaccountForm = true">修改账号</el-dropdown-item>
                  <el-dropdown-item @click.native="updatepasswordForm = true">修改密码</el-dropdown-item>
                  <el-dropdown-item @click.native="goTo('ProjectCapitalAccount')">资金账户</el-dropdown-item>
                  <el-dropdown-item divided @click.native="loginOut()">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div class="segmenting-line">
              </div>
              <div class="email-message" @click="goTo('ProjectMyMessage')">
                <el-badge class="mark fa fa-envelope" :value="notreadmessage" :max="99" v-if="notreadmessage>0" />
                <el-badge class="mark fa fa-envelope" v-else style="position:relative;top:0px;margin-right:8px;" />
                <el-badge class="item" style="position:relative;top:3px;">消息</el-badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="breadcrumb-nav">
        <breadcrumb-project />
      </div>
      <div class="content">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>

        <!-- 这里不会被keepalive -->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
    <update-account :updateAccountFormVisible="updateaccountForm" :oldaccount="account" @closeupdateAccountForm="closeupdateAccountForm" />
    <update-password :updatePasswordFormVisible="updatepasswordForm" :account="account" @closeupdatepasswordForm="closeupdatepasswordForm" />
    <footer-bottom />
  </div>
</template>

<script>
import { mapState } from "vuex";
// import { mapMutations } from "vuex";
import breadcrumbProject from "../../components/breadcrumbproject";
import footerBottom from "../../components/footerbottom";
import updateAccount from "../../components/updateaccount";
import updatePassword from "../../components/updatepassword";
export default {
  name: "ProjectLayout",
  components: {
    footerBottom,
    updateAccount,
    updatePassword,
    breadcrumbProject
  },
  data() {
    return {
      logoImg: require("../../assets/logo.png"),
      updateaccountForm: false,
      updatepasswordForm: false,
      msg: "Welcome to Your Vue.js App",
      updatetime: new Date()
    };
  },
  computed: {
    ...mapState("user", ["nickName"]),
    ...mapState("user", ["account"]),
    ...mapState("user", ["notreadmessage"]),
    defaultActive() {
      var navpath="/" +this.$route.path.split("/")[1] +"/" +this.$route.path.split("/")[2];
      if(this.$route.path.split("/")[2]!='myproject'&&this.$route.path.split("/")[2]!='projectapplication'&&this.$route.path.split("/")[2]!='diseaselist'&&this.$route.path.split("/")[2]!='markingtoolmanagement'&&this.$route.path.split("/")[2]!='projectstatestatistics'){
        var navpath = '/project/other'
      }
      return navpath.toString()
    }
  },
  created() {
    this.$store.dispatch("user/getNotReadMessageCount");
  },
  methods: {
    // ...mapMutations({
    //   changeNav: "common/changeProjectNav" // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    // }),
    changeNav() {
      this.$utils.delSession("projectEditId");
      this.$utils.delSession("BATCHDETAILTYPE");
      this.$utils.delSession("BATCHDETAILSTATUS");
      this.$utils.delSession("projectEditStatus", false);
    },

    loginOut() {
      // this.$toaster.ok("退出成功");
      this.$utils.delAllStorage();
      this.$utils.delAllSession();
      // this.$router.push({
      //   name: "Login"
      // });
      location.reload();
    },
    goTo(name) {
      this.changeNav();
      this.$router.push({
        name: name
      });
    },
    closeupdateAccountForm() {
      //关闭修改账号
      this.updateaccountForm = false;
    },
    closeupdatepasswordForm() {
      //关闭修改密码
      this.updatepasswordForm = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
