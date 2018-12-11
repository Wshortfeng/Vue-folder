<template>
  <div id="app">
    <el-scrollbar style="height:100%;" :class="{homeScroll:$route.path=='/home'}">
      <!-- <keep-alive> -->
      <router-view />
      <!-- </keep-alive> -->
    </el-scrollbar>
  </div>
</template>

<script>
export default {
  name: "App",
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
    height:100%;
  }
  .layout {
    height: 100%;
    //头部
    .el-container {
      height: 100%;
      .el-header {
        height: 120px !important;
        padding: 0;
        .header {
          height: 120px !important;
          padding-left: 60px;
          background: linear-gradient(
            to right,
            $background1 0%,
            $background2 100%
          );
          color: $color2 !important;
          .logo {
            float: left;
            height: 80px;
            line-height: 80px !important;
            margin-top: 20px;
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
            margin-top: 15px;
            line-height: 80px;
            margin-right: 30px;
            a {
              color: $color2 !important;
            }
          }
        }
      }
      .el-container {
        height: calc(100% - 120px) !important;
        .el-aside {
          height: 100% !important;
          background: linear-gradient(
            to right,
            $background1 0%,
            $background4 100%
          );
           .user-info {
                height: 130px;
                border-radius: 5px;
                border: 1px solid $color2;
                margin: 20px;
                .title {
                  color: $color2;
                  font-size: $fontSize2;
                  text-align: left;
                  line-height: 250%;
                  margin: 0;
                  padding-left: 15px;
                }
                .info-content {
                  color: $color2 !important;
                  .right{
                    padding: 0 20px;
                    text-align: left;
                    .username{
                      span:last-child{
                        font-size: $fontSize;
                      }
                    }
                    .videocamerainfo{
                      font-size: $fontSize;
                    }
                  }
                }
              }
          .el-scrollbar {
            height: calc(100% - 180px);
            ul {
              background: linear-gradient(
            to right,
            $background1 0%,
            $background4 100%
          );
              height: 100%;
              text-align: center;

              li {
                color: white;
                margin: 10px 0px;
              }
              .el {
                font-size: 30px;
              }
              .el-submenu__title,
              .el-menu-item {
                color: white;
                font-size: 16px !important;
              }
              .el-menu-item.is-active {
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
                min-height: calc(100vh - 130px) !important;
                width: 100%;
                background: white;
              }
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
    font-weight: bold;
  }
  .el-submenu {
    .el-menu {
      li {
        text-align: right;
        span:last-child {
          display: inline-block;
          width: 80px;
          font-size: 15px;
          text-align: left;
          margin-left: 10px;
        }
      }
    }
  }
}
// icon
.control_icon {
    background: transparent url("./assets/img/control_icon.png") no-repeat scroll 0% 0%;
    background-size: cover;
    width: 12px;
    height: 12px;
    cursor: pointer;
    display: inline-block;
    position: relative;
    margin-right:5px;
    top:1px;
}

.video_icon {
    background: transparent url("./assets/img/video_icon.png") no-repeat scroll 0% 0%;
    background-size: cover;
    width: 12px;
    height: 9px;
    cursor: pointer;
    display: inline-block;
    position: relative;
    margin-right:5px;
}
</style>
