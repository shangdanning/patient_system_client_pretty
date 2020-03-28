<!--* Created by shangdanning on 2019/11/25.
    * 辅助检查-查看详情-脑电图检查模块页面
-->
<template>
  <div class="inspectSeeItemModule">
    <div class="content">
      <div v-for="(item, index) in currentData" :key="item.id">
        <div class="title" :class="item.isShow ? '' : 'borderBottom'">
          <span class="name"
            >{{ headLine }}({{ (index + 1) | numChangeChineseChar }})</span
          >
          <i
            class="fold"
            :class="item.isShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
            @click="fold(item)"
          ></i>
        </div>
        <ul v-show="item.isShow" class="seeContent">
          <li>
            检查时间：<span>{{ item.checkTime }}</span>
          </li>
          <li>
            检查结果：<span>{{
              item.checkResult === 1 ? "正常" : "异常"
            }}</span>
            <span v-show="item.checkResult === 0">{{
              item.chartAbnormal
            }}</span>
            <span v-show="item.checkResult === 0">{{ item.resultText }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import toolMethods from "@/common/business/toolMethods";
export default {
  props: {
    originData: {
      type: String,
      default: function() {
        return "";
      }
    },
    headLine: {
      type: String,
      default: function() {
        return "检查";
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    currentData: function() {
      // 深拷贝，不污染源数据
      let tempData = JSON.parse(this.originData);
      // 处理数据
      tempData.forEach(item => {
        // isShow属性变为响应式
        this.$set(item, "isShow", true);
        // 字典value转为文本
        // chartAbnormal
        item.chartAbnormal = toolMethods.reDicValue(
          item.chartAbnormal,
          "chartAbnormal",
          1
        );
      });
      return tempData;
    }
  },
  methods: {
    fold(item) {
      item.isShow = !item.isShow;
    },
    editForm() {
      this.$emit("edit");
    }
  }
};
</script>
<style lang="less" scoped>
.inspectSeeItemModule {
  .content {
    .title {
      height: 28px;
      padding: 0 30px;
      line-height: 28px;
      background-color: #f4f6f8;
      .name {
        color: #0083ff;
        font-size: 14px;
      }
      .fold,
      .el-icon-delete {
        float: right;
        margin: 5px 5px;
      }
    }
    .seeContent {
      margin: 10px 80px;
      li {
        height: 32px;
        padding: 0 20px;
        margin-bottom: 10px;

        line-height: 32px;
        span {
          margin-left: 20px;
        }
      }
    }
  }

  .borderBottom {
    border-bottom: 1px solid #e1e4e7;
  }
}
</style>
