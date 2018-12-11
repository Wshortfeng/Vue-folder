<template>
  <div class="layout">
    <el-container>
      <el-header>
        <div class="header-top"></div>
        <div class="header">
          <div class="logo" @click="goTo('Home')">
            <img src="../../assets/logo.png">
          </div>
          <div class="header-operation">
            <span>
              <el-badge class="item " style="margin-right:5px;">欢迎您！{{userType|userTypeFormat}}</el-badge>
              <el-badge><a href="javascript:;" @click="loginOut"><i class="el-icon-safetyproduction-guanbi" style="margin:0 15px 0 30px;"></i>退出</a></el-badge>
              <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
            </span>
          </div>
        </div>
      </el-header>

      <el-container>
        <el-aside :width="navWidth">
          <div class="user-info">
                  <p class="title">基本信息</p>
                  <el-row class="info-content">
                    <el-col :span="24" class="right">

                      <div class="username">
                        <p class="limitp">
                          <i class="el-icon-safetyproduction-yonghu"></i>
                          <span>{{userName}}</span>
                          <span>（{{userType|userTypeFormat}}）</span>
                        </p>
                      </div>
                      <div class="videocamerainfo">
                        <p><i class="video_icon"></i>当前在线摄像头：{{onlineDevice}}个</p>
                        <p><i class="control_icon"></i>当前布控摄像头：{{controlDevice}}个</p>
                      </div>
                    </el-col>
                  </el-row>
                </div>
          <el-scrollbar :class="{nav:true,isCollapseClass:isCollapse}">
            <div>
              <el-menu :router="true" :default-active="defaultActive" class="el-menu-vertical-demo" :collapse="isCollapse" :collapse-transition="false" unique-opened>

                <el-submenu index="1">
                  <template slot="title">
                    <i class="el el-icon-safetyproduction-shexiangji"> </i>
                    <span slot="title" class="nav-title">摄像机设置&#X3000;</span>
                  </template>
                  <el-menu-item index="/dvrsetting" :route="{path:'/dvrsetting'}">
                    <span>●</span>
                    <span slot="title">DVR设置</span>
                  </el-menu-item>
                  <el-menu-item index="/addcamera" :route="{path:'/addcamera?TYPE=1'}">
                    <span>●</span>
                    <span slot="title">加入摄像机</span>
                  </el-menu-item>
                  <el-menu-item index="/removecamera" :route="{path:'/removecamera?TYPE=1'}">
                    <!-- <i class="fa fa-circle"></i> -->
                    <span>●</span>
                    <span slot="title">移除摄像机</span>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item index="/alarmsetting" :route="{path:'/alarmsetting?TYPE=1'}">
                  <i class="el el-icon-safetyproduction-baojing"></i>
                  <span slot="title" class="nav-title">报警设置&#X3000;&#X3000;</span>
                </el-menu-item>

                <el-submenu index="4">
                  <template slot="title">
                    <i class="el el-icon-safetyproduction-tongjitubiao"></i>
                    <span slot="title" class="nav-title">状态查询&#X3000;&#X3000;</span>
                  </template>
                  <el-menu-item index="/camerastatus" :route="{path:'/camerastatus'}">
                    <!-- <i class="fa fa-circle"></i> -->
                    <span>●</span>
                    <span slot="title">摄像机状态&#X3000;</span>
                  </el-menu-item>
                  <el-menu-item index="/controlstate" :route="{path:'/controlstate'}">
                    <span>●</span>
                    <span slot="title">布控状态&#X3000;</span>
                  </el-menu-item>
                  <el-menu-item index="/alarmslist" :route="{path:'/alarmslist?TYPE=1'}">
                    <span>●</span>
                    <span slot="title">告警列表&#X3000;</span>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item index="/clothcontrolsetting" :route="{path:'/clothcontrolsetting'}">
                  <i class="el el-icon-safetyproduction-lifangtizu"></i>
                  <span slot="title" class="nav-title">布控设置&#X3000;&#X3000;</span>
                </el-menu-item>
                <el-submenu index="5">
                  <template slot="title">
                    <i class="el el-icon-safetyproduction-shezhi"></i>
                    <span slot="title" class="nav-title">系统设置&#X3000;&#X3000;</span>
                  </template>
                  <el-menu-item index="/addadministrator" :route="{path:'/addadministrator'}">
                    <span>●</span>
                    <span slot="title">添加管理员</span>
                  </el-menu-item>
                  <el-menu-item index="/emailserver" :route="{path:'/emailserver'}">
                    <span>●</span>
                    <span slot="title">邮箱服务器</span>
                  </el-menu-item>
                  <el-menu-item index="/timeserver" :route="{path:'/timeserver'}">
                    <span>●</span>
                    <span slot="title">时间服务器</span>
                  </el-menu-item>
                  <el-menu-item index="/systemlog" :route="{path:'/systemlog'}">
                    <span>●</span>
                    <span slot="title">系统日志&#X3000;</span>
                  </el-menu-item>
                </el-submenu>
              </el-menu>

            </div>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <el-scrollbar>
            <div class="el-main-content">
              <transition name="fade" mode="out-in">
                <router-view></router-view>
              </transition>
            </div>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "layout",
  data() {
    return {
      isShow: true,
      isCollapse: false,
      str: "12445",
      navWidth: "250px"
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {
    ...mapState("user", ["userType"]),
    ...mapState("user", ["userName"]),
    ...mapState("user", ["onlineDevice"]),
    ...mapState("user", ["controlDevice"]),
    defaultActive() {
      var navpath = "/" + this.$route.path.split("/")[1];
      return navpath.toString();
    }
  },
  methods: {
    loginOut() {
      this.$toaster.ok("退出成功");
      this.$utils.delAllStorage();
      this.$utils.delAllSession();
      this.goTo("Login");
    },
    goTo(name) {
      this.$router.push({
        name: name
      });
    }
  },
  watch: {
    isCollapse(value) {
      if (value) {
        this.navWidth = "60px";
      } else {
        this.navWidth = "250px";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "src/styles/index.scss";
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
.nav-title {
  padding-right: 20px;
  font-size: $fontSize2;
  padding-left: 10px;
  letter-spacing: 2px;
}
.isCollapseClass {
  ul {
    text-align: left !important;
  }
}
.limitp {
  margin: 0;
  max-width: 168px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
