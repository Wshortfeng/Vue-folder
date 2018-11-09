<template>
  <div class="layout">
    <el-container>
      <el-header>
        <div class="header-top"></div>
        <div class="header">
          <div class="logo" @click="isCollapse=!isCollapse">
            <img src="../../assets/logo.png">
          </div>
          <div class="header-operation">
            <span  style=" color: #5A7CD0 ;">
                <el-badge class="item " style="margin-right:5px;">{{nickName}}</el-badge>|
                <el-badge><a href="javascript:;" @click="loginOut" style="color: #5A7CD0 ;">退出</a></el-badge>
                <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
              </span>
          </div>
        </div>
      </el-header>

      <el-container>
        <el-aside :width="navWidth">
          <el-scrollbar :class="{nav:true,isCollapseClass:isCollapse}">
            <div>
              <el-menu :router="true" :default-active="defaultActive" class="el-menu-vertical-demo" :collapse="isCollapse" :collapse-transition="false" unique-opened>
                <el-submenu index="1" v-if="permission1_0_0||isAdmin||permission.indexOf('permission1_')>-1">
                  <template slot="title">
                    <i class="el el-icon-label-server"> </i>
                    <span slot="title" class="nav-title">用户管理&#X3000;&#X3000;</span>
                  </template>
                  <el-menu-item index="/adminmanagement" :route="{path:'/adminmanagement'}" v-if="permission1_1_0||isAdmin||permission.indexOf('permission1_1')>-1||permission.indexOf('permission1_4')>-1||permission.indexOf('permission1_5')>-1">
                    <span>●</span>
                    <span slot="title">平台方用户管理</span>
                  </el-menu-item>
                  <el-menu-item index="/labelmanagement" :route="{path:'/labelmanagement'}" v-if="permission1_2_0||isAdmin||permission.indexOf('permission1_2')>-1">
                    <!-- <i class="fa fa-circle"></i> -->
                    <span>●</span>
                    <span slot="title">标注方用户管理</span>
                  </el-menu-item>
                  <el-menu-item index="/projectmanagement" :route="{path:'/projectmanagement'}" v-if="permission1_3_0||isAdmin||permission.indexOf('permission1_3')>-1">
                    <span>●</span>
                    <span slot="title">项目方用户管理</span>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item index="/projecthallmanagement" :route="{path:'/projecthallmanagement'}" v-if="permission2_0_0||isAdmin||permission.indexOf('permission2')>-1">
                  <i class="el el-icon-label-xiangmu"></i>
                  <span slot="title" class="nav-title">项目管理&#X3000;&#X3000;</span>
                </el-menu-item>
                <el-menu-item index="/southdisease" :route="{path:'/southdisease'}" v-if="permission3_0_0||isAdmin||permission.indexOf('permission3_')>-1">
                  <i class="el el-icon-label-thumbtack"></i>
                  <span slot="title" class="nav-title">疑难杂症&#X3000;&#X3000;</span>
                </el-menu-item>
                <el-submenu index="4" v-if="permission4_0_0||isAdmin||permission.indexOf('permission4_')>-1">
                  <template slot="title">
                    <i class="el el-icon-label-zijinchizhangbuyuetiaozhang"></i>
                    <span slot="title" class="nav-title">资金管理&#X3000;&#X3000;</span>
                  </template>
                  <el-menu-item index="/revenueexpenditurestatistics" :route="{path:'/revenueexpenditurestatistics'}" v-if="permission4_1_0||isAdmin||permission.indexOf('permission4_1')>-1">
                    <!-- <i class="fa fa-circle"></i> -->
                    <span>●</span>
                    <span slot="title">收支统计&#X3000;&#X3000;&#X3000;</span>
                  </el-menu-item>
                  <el-menu-item index="/presentmanagement" :route="{path:'/presentmanagement'}" v-if="permission4_2_0||isAdmin||permission.indexOf('permission4_2')>-1">
                    <span>●</span>
                    <span slot="title">提现管理&#X3000;&#X3000;&#X3000;</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="5" v-if="permission5_0_0||isAdmin||permission.indexOf('permission5_')>-1">
                  <template slot="title">
                    <i class="el el-icon-label-bianji"></i>
                    <span slot="title" class="nav-title">标注工具管理</span>
                  </template>
                  <el-menu-item index="/systemannotationtool" :route="{path:'/systemannotationtool'}" v-if="permission5_1_0||isAdmin||permission.indexOf('permission5_1')>-1">
                    <!-- <i class="fa fa-circle"></i> -->
                    <span>●</span>
                    <span slot="title">系统标注工具&#X3000;</span>
                  </el-menu-item>
                  <el-menu-item index="/userdefinedtool" :route="{path:'/userdefinedtool'}" v-if="permission5_2_0||isAdmin||permission.indexOf('permission5_2')>-1">
                    <span>●</span>
                    <span slot="title">用户定义工具&#X3000;</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="6" v-if="permission6_0_0||isAdmin||permission.indexOf('permission6_')>-1">
                  <template slot="title">
                    <i class="el el-icon-label-wenti"></i>
                    <span slot="title" class="nav-title">项目问题管理</span>
                  </template>
                  <el-menu-item index="/systemdefaultproblem" :route="{path:'/systemdefaultproblem'}" v-if="permission6_1_0||isAdmin||permission.indexOf('permission6_1')>-1">
                    <span>●</span>
                    <span slot="title">系统默认问题&#X3000;</span>
                  </el-menu-item>
                  <el-menu-item index="/userdefinedproblem" :route="{path:'/userdefinedproblem'}" v-if="permission6_2_0||isAdmin||permission.indexOf('permission6_2')>-1">
                    <span>●</span>
                    <span slot="title">用户定义问题&#X3000;</span>
                  </el-menu-item>
                </el-submenu>
                <el-submenu index="7" v-if="permission7_0_0||isAdmin||permission.indexOf('permission7_')>-1">
                  <template slot="title">
                    <i class="el el-icon-label-shezhi"></i>
                    <span slot="title" class="nav-title">系统管理&#X3000;&#X3000;</span>
                  </template>
                  <el-menu-item index="/qualificationlabelcategorymanagement" :route="{path:'/qualificationlabelcategorymanagement'}" v-if="permission7_1_0||isAdmin||permission.indexOf('permission7_1')>-1">
                    <span>●</span>
                    <span slot="title">资质标签类别&#X3000;</span>
                  </el-menu-item>
                  <el-menu-item index="/qualificationlabelmanagement" :route="{path:'/qualificationlabelmanagement'}" v-if="permission7_2_0||isAdmin||permission.indexOf('permission7_2')>-1">
                    <span>●</span>
                    <span slot="title">资质标签管理&#X3000;</span>
                  </el-menu-item>
                  <!-- <el-menu-item index="/qualificationlabelmanagement" :route="{path:'/qualificationlabelmanagement'}" v-if="permission7_3_0||isAdmin||permission.indexOf('permission7_3')>-1">
                    <span>●</span>
                    <span slot="title">项目示例管理&#X3000;</span>
                  </el-menu-item> -->
                  <el-menu-item index="/systemlog" :route="{path:'/systemlog'}" v-if="permission7_4_0||isAdmin||permission.indexOf('permission7_4')>-1">
                    <span>●</span>
                    <span slot="title">系统日志&#X3000;&#X3000;&#X3000;</span>
                  </el-menu-item>
                  <el-menu-item index="/systemsetup" :route="{path:'/systemsetup'}" v-if="permission7_5_0||isAdmin||permission.indexOf('permission7_5')>-1">
                    <span>●</span>
                    <span slot="title">系统设置&#X3000;&#X3000;&#X3000;</span>
                  </el-menu-item>
                </el-submenu>
              </el-menu>

            </div>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <el-scrollbar>
            <!-- <keep-alive> -->
            <div class="content">
              <transition name="fade" mode="out-in">
                <router-view />
              </transition>
            </div>
            <!-- </keep-alive> -->
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
      navWidth: "260px",
      permission1_0_0: false,
      permission1_1_0: false,
      permission1_2_0: false,
      permission1_3_0: false,
      permission2_0_0: false,
      permission3_0_0: false,
      permission4_1_0: false,
      permission4_2_0: false,
      permission5_0_0: false,
      permission5_1_0: false,
      permission5_2_0: false,
      permission6_0_0: false,
      permission6_1_0: false,
      permission6_2_0: false,
      permission7_0_0: false,
      permission7_1_0: false,
      permission7_2_0: false,
      permission7_3_0: false,
      permission7_4_0: false,
      permission7_5_0: false,
      isAdmin: false
    };
  },
  created(){
    this.permission = this.$utils.getStorage('PERMISSION');
    if (this.$utils.getStorage('PERMISSION')) {
      var permissionArr = this.$utils.getStorage('PERMISSION').split(",");
      for (var i = 0; i < permissionArr.length; i++) {
        this[permissionArr[i]] = true;
      }
    } else {
      this.isAdmin = true;
    }
  },
  mounted() {

  },
  watch: {},
  computed: {
    ...mapState("user", ["nickName"]),
    ...mapState("common", ["adminnavVal"]),
    defaultActive() {
      var navpath = "/" + this.$route.path.split("/")[1];
      return navpath.toString();
    }
  },
  methods: {
    // changeNav(nav) {
    //   this.$store.commit("common/changeAdminNav", nav);
    // },
    loginOut() {
      this.$toaster.ok("退出成功");
      this.$utils.delAllStorage();
      this.$utils.delAllSession();
      this.$router.push({
        name: "Login"
      });
    }
  },
  watch: {
    isCollapse(value) {
      if (value) {
        this.navWidth = "60px";
      } else {
        this.navWidth = "260px";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 250px;
  min-height: 400px;
}
.nav-title {
  padding-right: 20px;
  font-size: 16px;
  padding-left: 10px;
  letter-spacing: 2px;
}
.isCollapseClass {
  ul {
    text-align: left !important;
  }
}
#app .layout .main .nav ul .el-menu-item:hover,
#app .layout .main .nav ul .el-menu-item:hover .el {
  background: rgb(0, 64, 128);
}
</style>
