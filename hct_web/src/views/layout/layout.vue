<template>
	<div class="layout">
		<el-container :class="{minwidth:minwidth}">
			<el-aside :width="navWidth">
				<div class="logo" @click="goTo('Home')" v-if="!isCollapse">
					<img src="../../assets/logo.png">
				</div>
				<div class="minlogo" @click="goTo('Home')" v-else>
					<img src="../../assets/minlogo.png" class="minlogo">
				</div>
				<el-scrollbar :class="{nav:true,isCollapseClass:isCollapse}">
					<div>
						<el-menu :router="true" :default-active="defaultActive" class="el-menu-vertical-demo" :collapse="isCollapse"
						 :collapse-transition="false" unique-opened>
							<el-menu-item index="" style="display:none;"></el-menu-item>
							<el-menu-item index="/home" :route="{path:'/home'}">
								<i class="el el-icon-hct-home"></i>
								<span slot="title" class="nav-title">首页&#X3000;&#X3000;</span>
							</el-menu-item>

							<el-submenu index="1" v-if="isAdmin||permission.indexOf('permission1_')>-1">
								<template slot="title" >
									<i class="el el-icon-hct-commoditymanagement"> </i>
									<span slot="title" class="nav-title">商品管理&#X3000;</span>
								</template>
								<el-menu-item index="/commoditymanagement/list" :route="{path:'/commoditymanagement/list'}" v-if="isAdmin||permission.indexOf('permission1_1_')>-1">
									<span>●</span>
									<span slot="title">商品管理</span>
								</el-menu-item>
								<el-menu-item index="/commoditymanagement/spiketime" :route="{path:'/commoditymanagement/spiketime'}" v-if="isAdmin||permission.indexOf('permission1_2_')>-1">
									<span>●</span>
									<span slot="title">秒杀时间</span>
								</el-menu-item>
								<el-menu-item index="/commoditymanagement/commoditysubclass" :route="{path:'/commoditymanagement/commoditysubclass'}" v-if="isAdmin||permission.indexOf('permission1_3_')>-1">
									<span>●</span>
									<span slot="title">商品子类</span>
								</el-menu-item>
								<el-menu-item index="/commoditymanagement/commoditycategory" :route="{path:'/commoditymanagement/commoditycategory'}" v-if="isAdmin||permission.indexOf('permission1_4_')>-1">
									<span>●</span>
									<span slot="title">商品大类</span>
								</el-menu-item>
							</el-submenu>

              <el-submenu index="2" v-if="isAdmin||permission.indexOf('permission2_')>-1">
								<template slot="title">
									<i class="el el-icon-hct-ordermanagement"> </i>
									<span slot="title" class="nav-title">订单管理&#X3000;</span>
								</template>
								<el-menu-item index="/ordermanagement/positivesinglemanagement" :route="{path:'/ordermanagement/positivesinglemanagement'}" v-if="isAdmin||permission.indexOf('permission2_1_')>-1">
									<span>●</span>
									<span slot="title">正单管理</span>
								</el-menu-item>
								<el-menu-item index="/ordermanagement/supplementmanagement" :route="{path:'/ordermanagement/supplementmanagement'}" v-if="isAdmin||permission.indexOf('permission2_2_')>-1">
									<span>●</span>
									<span slot="title">补单管理</span>
								</el-menu-item>
							</el-submenu>

              <el-submenu index="3" v-if="isAdmin||permission.indexOf('permission3_')>-1">
								<template slot="title">
									<i class="el el-icon-hct-financialstatements"> </i>
									<span slot="title" class="nav-title">财务报表&#X3000;</span>
								</template>
								<el-menu-item index="/financialstatements/storeordersummary" :route="{path:'/financialstatements/storeordersummary'}" v-if="isAdmin||permission.indexOf('permission3_1_')>-1">
									<span>●</span>
									<span slot="title">门店订单汇总</span>
								</el-menu-item>
								<el-menu-item index="/financialstatements/monthlyanalysis" :route="{path:'/financialstatements/monthlyanalysis'}" v-if="isAdmin||permission.indexOf('permission3_2_')>-1">
									<span>●</span>
									<span slot="title">月度分析</span>
								</el-menu-item>
							</el-submenu>

							<el-submenu index="4" v-if="isAdmin||permission.indexOf('permission4_')>-1">
								<template slot="title">
									<i class="el el-icon-hct-usermanagement"> </i>
									<span slot="title" class="nav-title">用户管理&#X3000;</span>
								</template>
								<el-menu-item index="/usermanagement/list" :route="{path:'/usermanagement/list'}" v-if="isAdmin||permission.indexOf('permission4_1_')>-1">
									<span>●</span>
									<span slot="title">用户管理</span>
								</el-menu-item>
								<el-menu-item index="/usermanagement/groupmanagement" :route="{path:'/usermanagement/groupmanagement'}" v-if="isAdmin||permission.indexOf('permission4_2_')>-1">
									<span>●</span>
									<span slot="title">组管理</span>
								</el-menu-item>
							</el-submenu>

							<el-submenu index="5" v-if="isAdmin||permission.indexOf('permission5_')>-1">
								<template slot="title">
									<i class="el el-icon-hct-systemmanagement"> </i>
									<span slot="title" class="nav-title">系统管理&#X3000;</span>
								</template>
								<el-menu-item index="/systemmanagement/storemanagement" :route="{path:'/systemmanagement/storemanagement'}" v-if="isAdmin||permission.indexOf('permission5_1_')>-1">
									<span>●</span>
									<span slot="title">门店管理</span>
								</el-menu-item>
								<el-menu-item index="/systemmanagement/merchantManagement" :route="{path:'/systemmanagement/merchantManagement'}" v-if="isAdmin||permission.indexOf('permission5_2_')>-1">
									<span>●</span>
									<span slot="title">商户管理</span>
								</el-menu-item>
								<el-menu-item index="/systemmanagement/announcementmanagement" :route="{path:'/systemmanagement/announcementmanagement'}" v-if="isAdmin||permission.indexOf('permission5_3_')>-1">
									<span>●</span>
									<span slot="title">公告管理</span>
								</el-menu-item>
								<el-menu-item index="/systemmanagement/userfeedback" :route="{path:'/systemmanagement/userfeedback'}" v-if="isAdmin||permission.indexOf('permission5_4_')>-1">
									<span>●</span>
									<span slot="title">用户反馈</span>
								</el-menu-item>
								<el-menu-item index="/systemmanagement/systemlog" :route="{path:'/systemmanagement/systemlog'}" v-if="isAdmin||permission.indexOf('permission5_5_')>-1">
									<span>●</span>
									<span slot="title">系统日志</span>
								</el-menu-item>
							</el-submenu>

						</el-menu>

					</div>
				</el-scrollbar>
			</el-aside>
			<el-container>
				<el-header>
					<div class="header">
						<div class="header-box">
							<div class="header-left">
								<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="!isCollapse" v-if="disablebtn"></hamburger>
                <hamburger class="hamburger-container" :isActive="!isCollapse"   v-else></hamburger>
								<breadcrumb class="breadcrumb-container"></breadcrumb>
								<div class="clear"></div>
							</div>
							<div class="header-operation">
								<span>
									<el-badge class="item " style="margin-right:5px;color:#2165D4;">欢迎您回来！</el-badge>
									<el-dropdown>
										<span class="el-dropdown-link" style="cursor:pointer;color:#2165D4;">
											{{username}}<i class="el-icon-arrow-down el-icon--right" style="color:#2165D4;"></i>
										</span>
										<el-dropdown-menu slot="dropdown" style="text-align:center;">
											<el-dropdown-item @click.native="goTo('MyInfo')">我的资料</el-dropdown-item>
											<el-dropdown-item @click.native="updatepasswordForm=true">修改密码</el-dropdown-item>
											<el-dropdown-item @click.native="loginOut" divided>退出</el-dropdown-item>
										</el-dropdown-menu>
									</el-dropdown>
								</span>
							</div>
							<div class="clear"></div>
						</div>
						<tags-view></tags-view>
					</div>
				</el-header>
				<el-main>
					<el-scrollbar>
						<div class="el-main-content">
							<transition name="fade-transform" mode="out-in">
								<!-- <keep-alive :include="cachedViews">
                  <router-view :key="key"></router-view>
                </keep-alive> -->
								<router-view></router-view>
							</transition>
						</div>
					</el-scrollbar>
				</el-main>
			</el-container>
		</el-container>
		<update-password :updatePasswordFormVisible="updatepasswordForm" :account="account" @closeupdatePasswordForm="closeupdatepasswordForm" />
	</div>
</template>

<script>
	import {
		mapState
	} from "vuex";

	import Hamburger from "@/components/Hamburger";
	import Breadcrumb from "@/components/Breadcrumb";
	import UpdatePassword from "@/components/updatepassword";
	import TagsView from "./TagsView";
	export default {
		name: "layout",
		components: {
			Hamburger,
			Breadcrumb,
			TagsView,
			UpdatePassword
		},
		data() {
			return {
				isShow: true,
        isCollapse: false,
        disablebtn:true,
				updatepasswordForm: false,
        navWidth: "280px",
        minwidth:false,
			};
		},
		created() {
			this.permission = this.$utils.getSession('PERMISSION');
			if (this.$utils.getSession("PERMISSION")) {
				var permissionArr = this.$utils.getSession("PERMISSION").split(",");
				for (var i = 0; i < permissionArr.length; i++) {
					this[permissionArr[i]] = true;
				}
			} else {
				this.isAdmin = true;
			}
		},
		mounted() {},
		watch: {},
		computed: {
			...mapState("user", ["username"]),
			defaultActive() {
        // this.isCollapse=false;
				var that=this;
        that.disablebtn=true;
          that.minwidth=false;
				if (that.$route.path == '/myinfo') {
					return ''
				} else if (that.$route.path.indexOf('/usermanagement/userinfo') > -1) {
					return '/usermanagement/list'
				}else if (that.$route.path.indexOf('/commoditymanagement/commodityiinfo') > -1) {
					return '/commoditymanagement/list'
				}else if (that.$route.path.indexOf('/usermanagement/jurisdiction') > -1) {
					return '/usermanagement/groupmanagement'
				}else if(that.$route.path.indexOf('/ordermanagement/') > -1){
//           that.isCollapse=true;
//           that.disablebtn=false;
          // that.minwidth=true;
        }
				var navpath = "/" + that.$route.path.split("/")[1];
				if (that.$route.path.split("/")[2]) {
					navpath = '/' + that.$route.path.split("/")[1] + '/' + that.$route.path.split("/")[2]
				}
				return navpath.toString();
			},
			cachedViews() {
				return this.$store.state.tagsView.cachedViews;
			},
			key() {
				return this.$route.fullPath;
			}
		},
		methods: {
			toggleSideBar() {
				this.isCollapse = !this.isCollapse;
			},
			loginOut() {
				this.$toaster.ok("退出成功");
				this.$store.dispatch('delAllViews')
				this.$utils.delAllStorage();
				this.$utils.delAllSession();
				this.goTo("Login");
			},
			goTo(name) {
				this.$router.push({
					name: name
				});
			},
			closeupdatepasswordForm() {
				//关闭修改密码
				this.updatepasswordForm = false;
			}
		},
		watch: {
			isCollapse(value) {
				if (value) {
					this.navWidth = "60px";
				} else {
					this.navWidth = "280px";
				}
			}
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	@import "src/styles/index.scss";

	.el-menu-vertical-demo:not(.el-menu--collapse) {
		width: 280px;
		min-height: 400px;
  }
  .minwidth{
    width: 1920px !important;
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
