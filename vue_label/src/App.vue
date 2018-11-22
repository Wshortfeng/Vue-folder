<template>
  <div id="app">
    <el-scrollbar style="height:100%;">
      <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>

        <!-- 这里不会被keepalive -->
        <router-view v-if="!$route.meta.keepAlive"></router-view>
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
#app {
  height: 100%;
  .el-scrollbar__wrap {
  overflow-x: hidden;
 }
}
</style>
