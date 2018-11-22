<template>
  <div id="app">
    <el-scrollbar style="height:100%;">
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

<style lang="less">
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
    //头部
    .el-container {
      height: 100%;
      .el-header {
        height: 100px !important;
        padding: 0;
        .header {
          height: 80px;
          padding-left: 30px;
          background: white;
          color: rgb(0, 64, 128) !important;
          .logo {
            float: left;
            height: 60px;
            line-height: 80px;
            cursor: pointer;
            img {
              height: 80px;
              float: left;
            }
            .title {
              margin-left: 10px;
              font-size: 18px;
            }
          }
          .header-operation {
            float: right;
            line-height: 80px;
            margin-right: 30px;
          }
        }
      }
      .el-container {
        height: calc(100% - 100px) !important;
        .el-aside {
          height: 100% !important;
          background: rgb(0, 64, 128);
          .el-scrollbar {
            height: 100%;
            ul {
              background: rgb(0, 64, 128);
              height: 100%;
              text-align: center;
              li {
                color: white;
              }
              .el-submenu__title,
              .el-menu-item {
                color: white;
                font-size: 16px !important;
              }
              .el-menu-item.is-active {
                background: rgb(0, 64, 128) !important;
                color: rgb(74, 144, 226) !important;
              }
              .el-menu-item.is-active .el {
                background: rgb(0, 64, 128) !important;
                color: rgb(74, 144, 226) !important;
              }
              .el-menu-item:focus,
              .el-menu-item:hover,
              .el-submenu__title:focus,
              .el-submenu__title:hover {
                background: rgb(0, 64, 128) !important;
              }
              .el-menu-item:hover,
              .el-menu-item:hover .el {
                background: rgb(0, 64, 128) !important;
                color: rgb(74, 144, 226) !important;
              }
              .el-submenu.is-active .el-submenu__title {
                color: rgb(74, 144, 226) !important;
              }
              .el-submenu.is-active .el-submenu__title .el {
                color: rgb(74, 144, 226) !important;
              }
              .el-menu {
                border-right: none;
              }
            }
            .el-menu-item i,
            .el-submenu__title i {
              color: white;
            }
            .el-menu{
              border-right:none;
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
            .content {
              padding: 15px 15px;
              width: 100% !important;
              min-height: 100%;
              overflow: hidden;
              .content-padding {
                min-height: calc(100vh - 130px) !important;
                width: 100%;
                padding: 20px 20px 20px 20px;
                background: white;
              }
            }
          }
        }
      }
    }
  }
  .nav-title{
    display: inline-block;
    width: 138px;
    text-align: left;
  }
  .el-submenu{
    .el-menu{
      li{
        span:last-child{
          display: inline-block;
          width: 98px;
           text-align: left;
        }
      }
    }
  }
}
</style>
