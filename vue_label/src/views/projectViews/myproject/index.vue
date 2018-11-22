<template>
  <div class="myproject  ">
    <!-- <breadcrumb-project /> -->
   <router-view></router-view>
  </div>
</template>

<script>
// import breadcrumbProject from "../../../components/breadcrumbproject";
export default {
  // components: { breadcrumbProject },
  name: "myproject"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.myproject {
  .myproject-main {
    margin-top: 19px;
    .nav-box {
      box-sizing: border-box;
      display: inline-block;
      width: 240px;
      height: 602px;
      ul {
        float: left;
        width: 240px;
        border-right: none;
        border: 1px solid #eff2f5;
        border-radius: 2px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        li {
          border-bottom: 1px solid #eff2f5;
          font-size: 16px;
          text-align: center;
          height: 55px;
          line-height: 55px;
          cursor: pointer;
        }
        li:last-child {
          border: none;
        }
        li:hover {
          background: #5a7cd0;
          color: white;
        }
      }
    }
  }
}
</style>
