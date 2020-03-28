<template>
  <el-row>
    <el-col :span="24">
      <div class="head-wrap">
        <i class="nmdar"></i> <span class="sysName">抗NMDAR脑炎数据库</span>
        <div class="button-box">
          <el-button type="primary" @click="exit()">退出</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { MU_SET_LOGGED } from "@/common/business/constants";
export default {
  data() {
    return {};
  },
  methods: {
    exit() {
      // 设置未登录状态
      this.$store.commit(MU_SET_LOGGED, false);
      this.$router.push({ path: "/" });
    }
  }
};
</script>
<style lang="less" scoped>
.head-wrap {
  .nmdar {
    position: relative;
    top: 12px;
    display: inline-block;
    width: 37px;
    height: 35px;
    background: url("../assets/img/icon.png") no-repeat;
    background-size: contain;
  }
  .sysName {
    font-size: 16px;
  }
}
.button-box {
  float: right;
  margin-right: 10px;
}
</style>
