<!--* Created by shangdanning on 2019/11/25.
    * 随访记录-查看详情-cd19检查模块页面
-->
<template>
  <div class="followSeeItemModule">
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
            检查结果：<span>{{ item.checkResult | cd19stateToName }}</span>
            <span v-show="item.checkResult">{{ item.resultText }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { itemStateList } from "@/common/business/dataCache";
export default {
  filters: {
    cd19stateToName: function(value) {
      var result = "";
      itemStateList.forEach(item => {
        if (item.value === value) {
          result = item.name;
        }
      });
      return result;
    }
  },
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
.followSeeItemModule {
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
