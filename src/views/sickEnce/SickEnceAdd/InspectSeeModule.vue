<!--* Created by shangdanning on 2019/11/25.
    * 辅助检查-查看详情页面
-->
<template>
  <div class="inspectSeeModule">
    <div class="TopContent">
      <p v-show="!!sickUserEpisodes">
        发作次数：<span class="times">{{ sickUserEpisodes }}</span>
      </p>
    </div>
    <div class="seeMiddleContent">
      <div v-for="(item, index) in currentData" :key="item.id">
        <div class="title" :class="item.isShow ? '' : 'borderBottom'">
          <span class="name"
            >辅助检查({{ (index + 1) | numChangeChineseChar }})</span
          >
          <i
            class="fold"
            :class="item.isShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
            @click="fold(item)"
          ></i>
        </div>
        <ul v-show="item.isShow" class="seeContent">
          <li :class="item.cellsJson | confirmClass">
            脑脊液细胞数：<span>{{ item.cellsJson | confirmName }}</span>
          </li>
          <li class="json" v-if="item.cellsJson && item.cellsJson !== '0'">
            <InspectSeeModuleItem
              :originData="item.cellsJson"
              :headLine="'脑脊液细胞数检查'"
            />
          </li>
          <li :class="item.proteinJson | confirmClass">
            脑脊液蛋白：<span>{{ item.proteinJson | confirmName }}</span>
          </li>
          <li class="json" v-if="item.proteinJson && item.proteinJson !== '0'">
            <InspectSeeModuleItem
              :originData="item.proteinJson"
              :headLine="'脑脊液蛋白检查'"
            />
          </li>
          <li :class="item.sugarJson | confirmClass">
            脑脊液糖：<span>{{ item.sugarJson | confirmName }}</span>
          </li>
          <li class="json" v-if="item.sugarJson && item.sugarJson !== '0'">
            <InspectSeeModuleItem
              :originData="item.sugarJson"
              :headLine="'脑脊液糖检查'"
            />
          </li>
          <li :class="item.nmdaJson | confirmClass">
            脑脊液NMDAR抗体：<span>{{ item.nmdaJson | confirmName }}</span>
          </li>
          <li class="json" v-if="item.nmdaJson && item.nmdaJson !== '0'">
            <InspectSeeModuleItemAnti
              :originData="item.nmdaJson"
              :headLine="'脑脊液NMDAR抗体检查'"
            />
          </li>
          <li :class="item.sobJson | confirmClass">
            SOB：<span>{{ item.sobJson | confirmName }}</span>
          </li>
          <li class="json" v-if="item.sobJson && item.sobJson !== '0'">
            <InspectSeeModuleItemSob
              :originData="item.sobJson"
              :headLine="'SOB检查'"
            />
          </li>
          <li :class="item.mogJson | confirmClass">
            脑脊液MOG抗体：<span>{{ item.mogJson | confirmName }}</span>
          </li>
          <li class="json" v-if="item.mogJson && item.mogJson !== '0'">
            <InspectSeeModuleItemAnti
              :originData="item.mogJson"
              :headLine="'脑脊液MOG抗体检查'"
            />
          </li>
          <li :class="item.serumNmdaJson | confirmClass">
            血清NMDAR抗体：<span>{{ item.serumNmdaJson | confirmName }}</span>
          </li>
          <li
            class="json"
            v-if="item.serumNmdaJson && item.serumNmdaJson !== '0'"
          >
            <InspectSeeModuleItemAnti
              :originData="item.serumNmdaJson"
              :headLine="'血清NMDAR抗体检查'"
            />
          </li>
          <li :class="item.serumMogJson | confirmClass">
            血清MOG抗体：<span>{{ item.serumMogJson | confirmName }}</span>
          </li>
          <li
            class="json"
            v-if="item.serumMogJson && item.serumMogJson !== '0'"
          >
            <InspectSeeModuleItemAnti
              :originData="item.serumMogJson"
              :headLine="'血清MOG抗体检查'"
            />
          </li>
          <li :class="item.chartJson | confirmClass">
            脑电图：<span>{{ item.chartJson | confirmName }}</span>
          </li>
          <li class="json" v-if="item.chartJson && item.chartJson !== '0'">
            <InspectSeeModuleItemChart
              :originData="item.chartJson"
              :headLine="'脑电图检查'"
            />
          </li>
          <li :class="item.mriJson | confirmClass">
            头颅MRI：<span>{{ item.mriJson | confirmName }}</span>
          </li>
          <li class="json" v-if="item.mriJson && item.mriJson !== '0'">
            <InspectSeeModuleItem
              :originData="item.mriJson"
              :headLine="'头颅MRI检查'"
            />
          </li>
          <!-- <li>药物基因：<span>{{item.medicineGene}}</span></li> -->
          <li>
            其他特殊检查结果：<span>{{ item.other }}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="fixBottomContent">
      <div class="flex-button-box margin-top-10">
        <el-button class="flex-button-item" type="primary" @click="editForm"
          >编辑</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import InspectSeeModuleItem from "./InspectSeeModuleItem";
import InspectSeeModuleItemAnti from "./InspectSeeModuleItemAnti";
import InspectSeeModuleItemSob from "./InspectSeeModuleItemSob";
import InspectSeeModuleItemChart from "./InspectSeeModuleItemChart";
import { mapState } from "vuex";
export default {
  components: {
    InspectSeeModuleItem,
    InspectSeeModuleItemAnti,
    InspectSeeModuleItemSob,
    InspectSeeModuleItemChart
  },
  filters: {
    confirmName: function(value) {
      var result = "已查";
      switch (value) {
        case "":
          result = "";
          break;
        case "0":
          result = "未查";
          break;
        case null:
          result = "";
          break;
      }
      return result;
    },
    confirmClass: function(value) {
      return value && value !== "0" ? "gray" : "";
    }
  },
  props: {
    originData: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },

  data() {
    return {};
  },
  computed: {
    currentData: function() {
      // 深拷贝，不污染源数据
      let tempData = JSON.parse(JSON.stringify(this.originData));
      // 处理数据
      tempData.forEach(item => {
        // isShow属性变为响应式
        this.$set(item, "isShow", true);
      });
      return tempData;
    },
    ...mapState({
      sickUserEpisodes: state => state.sickEnce.sickUserEpisodes
    })
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
.inspectSeeModule {
  padding-bottom: 15px;
  .TopContent {
    height: 50px;
    padding: 0 100px;
    line-height: 50px;
    .times {
      margin-left: 20px;
    }
  }
  .seeMiddleContent {
    .title {
      height: 28px;
      padding: 0 30px;
      line-height: 28px;
      background-color: #e9f4fe;
      .name {
        font-size: 16px;
        font-weight: bold;
      }
      .fold,
      .el-icon-delete {
        float: right;
        margin: 5px 5px;
      }
    }
    .seeContent {
      margin: 30px 80px;
      li:not(.json) {
        height: 32px;
        padding: 0 30px;
        margin-bottom: 20px;
        line-height: 32px;
        span {
          margin-left: 20px;
        }
      }
      .gray {
        margin-bottom: 0px !important;
        padding-right: 30px;
        background-color: #ddd;
      }
      .json {
        margin-bottom: 20px;
      }
    }
  }
  .fixBottomContent {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 20;
    width: calc(100% - 200px);
    height: 60px;
    background-color: #ffffff;
    line-height: 60px;
    border-top: 1px solid #e1e4e7;
  }
  .borderBottom {
    border-bottom: 1px solid #e1e4e7;
  }
}
</style>
