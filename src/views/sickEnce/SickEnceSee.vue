<template>
  <div class="sickEnceAdd">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本信息" name="basicInfo">
        <BasicInfo />
      </el-tab-pane>
      <el-tab-pane label="临床症状" name="clinical">
        <Clinical />
      </el-tab-pane>
      <el-tab-pane label="治疗记录" name="treatment">
        <Treatment />
      </el-tab-pane>
      <el-tab-pane label="辅助检查" name="inspect">
        <Inspect />
      </el-tab-pane>
      <el-tab-pane label="随访记录" name="follow">
        <Follow />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import BasicInfo from "./SickEnceAdd/BasicInfo";
import Clinical from "./SickEnceAdd/Clinical";
import Treatment from "./SickEnceAdd/Treatment";
import Inspect from "./SickEnceAdd/Inspect";
import Follow from "./SickEnceAdd/Follow";
export default {
  components: {
    BasicInfo,
    Clinical,
    Treatment,
    Inspect,
    Follow
  },
  data() {
    return {
      activeName: "basicInfo"
    };
  },
  methods: {
    handleClick() {
      // tab, event
      //   console.log(tab, event);
    }
  }
};
</script>
<style lang="less">
/* 全局样式 */
.sickEnceAdd {
  .el-tabs__nav {
    padding-top: 10px;
  }
  .el-tabs--border-card {
    border: none !important;
    box-shadow: none;
  }
  .el-tabs__header {
    position: fixed;
    top: 60px;
    z-index: 2;
    width: 100%;
    background-color: #f5f5f5 !important;
    .el-tabs__item {
      height: 45px !important;
      padding: 0 30px !important;
      line-height: 45px !important;
      font-size: 16px !important;
      &:first-child {
        margin-left: 30px !important;
      }
      &.is-active {
        color: #000 !important;
        border-right-color: #f5f5f5 !important;
        border-left-color: #f5f5f5 !important;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      &:hover {
        color: #000 !important;
      }
    }
  }
  .el-tabs__content {
    margin-top: 54px !important;
  }
}
</style>
