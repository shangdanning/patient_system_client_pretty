<!--* Created by shangdanning on 2019/11/25.
    * 随访记录-查看详情页面
-->
<template>
  <div class="followSeeModule">
    <div class="TopContent">
      <!-- <p>发作次数：<span class="times">{{currentData.length>0?currentData[0].episodes:""}}</span></p> -->
    </div>
    <div class="seeMiddleContent">
      <div v-for="(item, index) in currentData" :key="item.id">
        <div class="title" :class="item.isShow ? '' : 'borderBottom'">
          <span class="name"
            >随访记录({{ (index + 1) | numChangeChineseChar }})</span
          >
          <i
            class="fold"
            :class="item.isShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
            @click="fold(item)"
          ></i>
        </div>
        <ul v-show="item.isShow" class="seeContent">
          <li>
            随访日期：<span>{{ item.followDate }}</span>
          </li>
          <li>
            随访年龄：<span>{{ item.followAge }}</span>
          </li>
          <li>
            随访病程：<span>{{ item.followSinceBegin }}</span
            >天
          </li>
          <li>
            遗留症状：<span>{{ item.overSymptom }}</span>
            <span v-show="item.overSymptom && item.overSymptom.indexOf('7')">{{
              item.overSymptomText
            }}</span>
          </li>
          <li>
            mRs评分：<span>{{ item.mrsGrade }}</span>
          </li>
          <li>
            儿童脑功能评分：<span>{{ item.brainGrade }}</span>
          </li>
          <li>
            生活质量评分：<span>{{ item.lifeGrade }}</span>
          </li>
          <!-- Gesell评分和ADHD评分删掉 (2019-12-26 甲方提出) -->
          <!-- <li>Gesell评分：<span>{{item.gesellGrade}}</span></li>
          <li>ADHD评分：<span>{{item.aDHDGrade}}</span></li> -->
          <li :class="item.mriJson | confirmClass">
            头颅MRI：<span>{{ item.mriJson | confirmName }}</span>
          </li>
          <li class="json" v-if="item.mriJson && item.mriJson !== '0'">
            <InspectSeeModuleItem
              :originData="item.mriJson"
              :headLine="'头颅MRI检查'"
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
          <li :class="item.nmdaJson | confirmClass">
            脑脊液NMDAR抗体：<span>{{ item.nmdaJson | confirmName }}</span>
          </li>
          <li class="json" v-if="item.nmdaJson && item.nmdaJson !== '0'">
            <InspectSeeModuleItemAnti
              :originData="item.nmdaJson"
              :headLine="'脑脊液NMDAR抗体检查'"
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
          <li :class="item.cd19CellJson | confirmClass">
            CD19+细胞：<span>{{ item.cd19CellJson | confirmName }}</span>
          </li>
          <li
            class="json"
            v-if="item.cd19CellJson && item.cd19CellJson !== '0'"
          >
            <FollowSeeModuleItemCd19
              :originData="item.cd19CellJson"
              :headLine="'CD19+细胞检查'"
            />
          </li>
          <li :class="item.dqJson | confirmClass">
            DQ：<span>{{ item.dqJson | confirmName }}</span>
          </li>
          <li class="json" v-if="item.dqJson && item.dqJson !== '0'">
            <InspectSeeModuleItemSimple
              :originData="item.dqJson"
              :headLine="'DQ检查'"
            />
          </li>
          <li :class="item.adhdJson | confirmClass">
            ADHD：<span>{{ item.adhdJson | confirmName }}</span>
          </li>
          <li class="json" v-if="item.adhdJson && item.adhdJson !== '0'">
            <InspectSeeModuleItem
              :originData="item.adhdJson"
              :headLine="'ADHD检查'"
            />
          </li>
          <li>
            其他异常辅助检查：<span>{{ item.other }}</span>
          </li>
          <li>
            维持用药：<span>{{ item.grugShow }}</span>
          </li>
          <li v-show="item.grug.indexOf('1') !== -1" class="grugDetail">
            丙球冲击用药方法：<span>{{ item.iVIGText }}</span>
          </li>
          <li v-show="item.grug.indexOf('2') !== -1" class="grugDetail">
            甲强冲击用药方法：<span>{{ item.methylSrongText }}</span>
          </li>
          <li v-show="item.grug.indexOf('3') !== -1" class="grugDetail">
            激素续贯口服用药方法：<span>{{ item.hormoneText }}</span>
          </li>
          <li v-show="item.grug.indexOf('4') !== -1" class="grugDetail">
            MMF用药方法：<span>{{ item.mmfText }}</span>
          </li>
          <li v-show="item.grug.indexOf('5') !== -1" class="grugDetail">
            RTX用药方法：<span>{{ item.rtxText }}</span>
          </li>
          <li v-show="item.grug.indexOf('6') !== -1" class="grugDetail">
            CTX用药方法：<span>{{ item.ctxText }}</span>
          </li>
          <li v-show="item.grug.indexOf('7') !== -1" class="grugDetail">
            AZA用药方法：<span>{{ item.azaText }}</span>
          </li>
          <li v-show="item.grug.indexOf('8') !== -1" class="grugDetail">
            其他用药方法：<span>{{ item.grugText }}</span>
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
import InspectSeeModuleItemSimple from "./InspectSeeModuleItemSimple";
import InspectSeeModuleItemAnti from "./InspectSeeModuleItemAnti";
import InspectSeeModuleItemChart from "./InspectSeeModuleItemChart";
import FollowSeeModuleItemCd19 from "./FollowSeeModuleItemCd19";
import toolMethods from "@/common/business/toolMethods";
export default {
  components: {
    InspectSeeModuleItem,
    InspectSeeModuleItemSimple,
    InspectSeeModuleItemAnti,
    InspectSeeModuleItemChart,
    FollowSeeModuleItemCd19
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
        // 字典value转为文本
        // overSymptom、grug
        item.overSymptom = toolMethods.reDicValue(
          item.overSymptom,
          "overSymptom",
          1
        );
        item.grugShow = toolMethods.reDicValue(item.grug, "grug", 1);
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
.followSeeModule {
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
      .grugDetail {
        position: relative;
        left: 50px;
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
