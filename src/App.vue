<template>
  <div id="app">
    <el-container v-if="isLogged" class="page">
      <el-header class="header">
        <TheHeader class="headerFixed" />
      </el-header>
      <el-container class="content">
        <el-aside class="aside">
          <TheNavMenu class="navFixed" />
        </el-aside>

        <el-main class="el-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <router-view v-else />
  </div>
</template>
<script>
import TheHeader from "@/components/TheHeader";
import TheNavMenu from "@/components/TheNavMenu";
import { mapState } from "vuex";
export default {
  name: "app",
  components: {
    TheHeader,
    TheNavMenu
  },
  computed: {
    ...mapState({
      isLogged: state => state.system.isLogged
    })
  },
  mounted() {
    require("./assets/css/base.less");
    require("./assets/css/elementUI.less");
    require("./assets/css/reset.css");
  }
};
</script>
<style lang="less">
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  color: #2c3e50;
}
.page {
  position: relative;
  height: 100%;
  .header {
    padding: 0px !important;
    .headerFixed {
      position: fixed;
      top: 0;
      z-index: 100;
      width: 100%;
      padding-left: 20px;
      background-color: #409eff;
      color: #fff;
      line-height: 60px;
    }
  }
  .content {
    height: 100%;
    overflow-y: hidden;
    .aside {
      background-color: #f2f2f2;
      width: 200px !important;
      height: 100%;
      .navFixed {
        position: fixed;
        left: 0;
        z-index: 100;
        width: 200px !important;
      }
    }
    .el-main {
      position: relative;
      height: 100%;
      padding: 0px !important;
    }
  }
}
</style>
