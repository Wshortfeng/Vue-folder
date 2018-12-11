<template>
  <div class="labelLayout">
    <div class="header-top"></div>
    <div class="header" style="border-bottom:1px solid gray;">
      <div class="nav-header">
        <div class="isLogin">
          <div class="label-header">
            <!-- <img src="/labelcloud/static/img/logo.7a94458.png" alt="logo"> -->
            <img :src="logoImg" alt="logo" class="logoImg">
            <el-menu :router="true" :default-active="defaultActive" class="el-menu-demo" mode="horizontal" style="display:inline-block;" :show-timeout="0" :hide-timeout="0">
              <el-menu-item index="/label/projecthall" :route="{path:'/label/projecthall'}"><i class="fa fa-th-list" aria-hidden="true"></i>&nbsp;&nbsp;项目大厅</el-menu-item>
              <el-submenu index="/label/mytask/" :popper-append-to-body="false">
                <template slot="title"><i class="fa fa-file-text" aria-hidden="true"></i>&nbsp;&nbsp;我的任务</template>
                <el-menu-item id="elmenuitem1" index="/label/mytask/mylabeltask" :route="{path:'/label/mytask/mylabeltask'}" style="text-align:center;">我的标注任务</el-menu-item>
                <el-menu-item id="elmenuitem2" index="/label/mytask/myreviewtask" :route="{path:'/label/mytask/myreviewtask'}" style="text-align:center;">我的审核任务</el-menu-item>
              </el-submenu>
              <el-menu-item index="/label/southdisease" :route="{path:'/label/southdisease'}"> <i class="fa fa-thumb-tack" style="position:relative;bottom:2px;" aria-hidden="true"></i>&nbsp;&nbsp;疑难杂症</el-menu-item>
              <el-menu-item index="/label/markingtool" :route="{path:'/label/markingtool?ISWORKBENCH=1'}"><i class="fa fa-pencil" style="position:relative;bottom:2px;" aria-hidden="true"></i>&nbsp;&nbsp;工作台</el-menu-item>
              <el-menu-item index="/label/statestatistics" :route="{path:'/label/statestatistics'}"><i class="fa fa-pie-chart" aria-hidden="true"></i>&nbsp;&nbsp;状态统计</el-menu-item>
              <el-menu-item index="/project/other1" style="display:none;"></el-menu-item>
            </el-menu>
            <div class="header-right">
              <el-dropdown class="user" style="text-align:right;" :show-timeout="0">
                <span class="el-dropdown-link">
                  <el-badge class="item limitname" v-if="nickName.length<6">{{nickName}}</el-badge>
                  <el-badge class="item limitname" :title="nickName" v-else>{{nickName}}</el-badge>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="text-align:center;">
                  <el-dropdown-item @click.native="goTo('我的资料')">用户资料</el-dropdown-item>
                  <el-dropdown-item @click.native="updateaccountForm = true">修改账号</el-dropdown-item>
                  <el-dropdown-item @click.native="updatepasswordForm = true">修改密码</el-dropdown-item>
                  <el-dropdown-item @click.native="goTo('资金账户')">资金账户</el-dropdown-item>
                  <el-dropdown-item divided @click.native="loginOut()">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <div class="segmenting-line">
              </div>
              <div class="email-message" @click="goTo('我的消息')">
                <el-badge class="mark fa fa-envelope" aria-hidden="true" :value="notreadmessage" :max="99" v-if="notreadmessage>0" />
                <el-badge class="mark fa fa-envelope" aria-hidden="true" v-else style="position:relative;top:0px;margin-right:8px;" />
                <el-badge class="item" style="position:relative;top:3px;">消息</el-badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <div class="breadcrumb-nav">
        <breadcrumb-label />
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
import breadcrumbLabel from "../../components/breadcrumblabel";
import footerBottom from "../../components/footerbottom";
import updateAccount from "../../components/updateaccount";
import updatePassword from "../../components/updatepassword";
export default {
  name: "LabelLayout",
  components: { footerBottom, updateAccount, updatePassword, breadcrumbLabel },
  data() {
    return {
      logoImg: require("../../assets/logo.png"),
      updateaccountForm: false,
      updatepasswordForm: false,
      msg: "Welcome to Your Vue.js App"
    };
  },
  computed: {
    ...mapState("user", ["nickName"]),
    ...mapState("user", ["account"]),
    ...mapState("user", ["notreadmessage"]),
    defaultActive() {
      if (this.$route.path.split("/")[2] == "mytask") {
        var navpath =
          "/" +
          this.$route.path.split("/")[1] +
          "/" +
          this.$route.path.split("/")[2] +
          "/" +
          this.$route.path.split("/")[3];
      } else {
        var navpath =
          "/" +
          this.$route.path.split("/")[1] +
          "/" +
          this.$route.path.split("/")[2] ;
      }
      if(this.$route.path.split("/")[2]!='projecthall'&&this.$route.path.split("/")[2]!='mytask'&&this.$route.path.split("/")[2]!='southdisease'&&this.$route.path.split("/")[2]!='markingtool'&&this.$route.path.split("/")[2]!='statestatistics'){
        var navpath = '/project/other1'
      }
      return navpath.toString();
    }
  },
  created() {
    this.$store.dispatch("user/getNotReadMessageCount");
  },
  mounted() {},
  methods: {
    // ...mapMutations({
    //   changeNav: "common/changeLabelNav" // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    // }),
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
<style>
.el-submenu__title {
  height: 80px !important;
  line-height: 80px !important;
  font-size: 18px;
}
</style>
