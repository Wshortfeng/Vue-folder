<template>
  <div id="app" >
    <el-scrollbar style="height:100%;" :class="{homeScroll:$route.path=='/home'}">
      <!-- <keep-alive> -->
      <router-view />
      <!-- </keep-alive> -->
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
@import "src/styles/index.scss";
html,
body {
  background: white;
  margin: 0;
  height: 100%;
}
// .el-scrollbar__wrap {
//   overflow-x: hidden;
// }
#app {
  height: 100%;
  .el-scrollbar__wrap {
    overflow-x: hidden !important;
  }
  .el-scrollbar__view {
    height: 100%;
  }
  .layout {
    height: 100%;
    .el-container {
      height: 100%;
      .el-aside {
        height: 100% !important;
        background: $background7;
        .logo {
          height: 90px;
          text-align: center;
          line-height: 90px;
          img {
            width: 50%;
            margin-top: 28px;
          }
        }
        .minlogo {
          width: 100%;
          text-align: center;
          img {
            width: 50%;
            margin-top: 15px;
          }
        }
        .el-scrollbar {
          height: calc(100% - 100px);

          ul {
            background: $background7;
            height: 100%;
            text-align: center;
            .el-submenu__title,
            .el-menu-item {
              color: white;
              font-size: 16px !important;
              height: 56px;
              line-height: 56px;
            }
            .el-menu-item.is-active,
            .el-submenu.is-active {
              background: $background2 !important;
            }
            .el-menu-item:focus,
            .el-menu-item:hover,
            .el-submenu__title:focus,
            .el-submenu__title:hover {
              background: $background2 !important;
            }
            .el-menu {
              border-right: none;
            }
          }
          .el-menu-item i,
          .el-submenu__title i {
            color: $color2;
          }
          .el-menu {
            border-right: none;
          }
        }
      }
      .el-main {
        height: 100% !important;
        width: 100%;
        padding: 0;
        .el-scrollbar {
          height: 100%;
          width: 100% !important;
          .el-main-content {
            width: 100% !important;
            min-height: 100%;
            overflow: hidden;
            .content-padding {
              min-height: calc(100vh - 90px) !important;
              // min-height: 100%;
              width: 100%;
              background: white;
            }
          }
        }
      }
      .el-header {
        height: 90px !important;
        padding: 0;
        .header {
          height: 90px;
          .header-box {
            height: 50px;
            line-height: 50px;
            padding: 0 15px;
            .header-left {
              float: left;
              .hamburger-container {
                float: left;
                margin-top: 5px;
              }
              .breadcrumb-container {
                float: left;
              }
            }
            .header-operation {
              float: right;
            }
          }
        }
      }
    }
  }
  .nav-title {
    display: inline-block;
    width: 100px;
    text-align: left;
    margin-left: 10px;
  }
  .el-submenu {
    .el-menu {
      li {
        text-align: right;
        span:last-child {
          display: inline-block;
          width: 100px;
          font-size: 14px;
          text-align: left;
          margin-left: 8px;
        }
      }
    }
  }
}
// icon
.control_icon {
  // background: transparent url("./assets/img/control_icon.png") no-repeat scroll 0% 0%;
  background-size: cover;
  width: 12px;
  height: 12px;
  cursor: pointer;
  display: inline-block;
  position: relative;
  margin-right: 5px;
}
</style>
