<template>
  <div class="main">
    <el-row>
      <el-col :span="12" class="header-nav">
        <el-menu :default-active="headerNavVal" class="el-menu-demo header-nav" mode="horizontal" >
          <el-menu-item index="1">
            {{ appName}}
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
           <el-submenu index="3">
            <template slot="title">我</template>
            <el-menu-item index="3-1">退出</el-menu-item>
            <el-menu-item index="3-2">个人中心</el-menu-item>
          </el-submenu>
          <el-radio-group v-model="isCollapse"  style="margin-bottom: 20px; position:absolute;right:10px;top:10px;">
              <el-radio-button :label="false">开</el-radio-button>
              <el-radio-button :label="true">关</el-radio-button>
            </el-radio-group>
        </el-menu>
      </el-col>
    </el-row>

    <el-row class="tac content-nav">
      <el-col :span="4" class=" content-nav">
        <!-- 使用导航的时候需要设置router值为true -->
        <el-menu :router="true" :default-active="navVal" class="el-menu-vertical-demo" :collapse="isCollapse" >
          <el-submenu index="1">
            <template slot="title">
              <i class="fa fa-reorder"></i>
              <span>&#X3000; 分类管理</span>
            </template>
            <el-menu-item index="1-1" :route="{name:'TypeList'}" @click="changeNav('1-1')">分类列表</el-menu-item>
            <el-menu-item index="1-2" :route="{name:'TypeEditor'}" @click="changeNav('1-2')">分类编辑</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="fa fa-file"></i>
              <span>&#X3000; 文章管理</span>
            </template>
            <el-menu-item index="2-1" :route="{name:'BlogList'}" @click="changeNav('2-1')">文章列表</el-menu-item>
            <el-submenu index="2-2">
              <template slot="title">选项4</template>
              <el-menu-item index="2-2-1" :route="{name:'BlogEditor'}" @click="changeNav('2-2-1')">选项2-2-1</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20">
        <router-view/>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  created() {},
  computed: {
    ...mapState("app", ["navVal","headerNavVal","appName"]),
  },
  mounted() {},
  methods: {
      ...mapMutations({
      changeNav:  'app/changeNav' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
html,
body {
  height: 100% !important;
  background: white;
  .main {
    height: calc(100% - 61px);
    .header-nav {
      width: 100% !important;
    }
    .content-nav {
      height: 100% !important;
      ul{
         height: 100% !important;
      }
    }
  }
}
</style>
