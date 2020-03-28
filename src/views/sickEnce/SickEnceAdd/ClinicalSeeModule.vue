<template>
  <div class="clinicalSeeModule">
    <div class="TopContent" v-show="currentData.length">
      <p>
        发作次数：<span class="times">{{
          currentData.length > 0 ? currentData[0].episodes : ""
        }}</span>
      </p>
    </div>
    <div class="seeMiddleContent">
      <div v-for="(item, index) in currentData" :key="item.id">
        <div class="title" :class="item.isShow ? '' : 'borderBottom'">
          <span class="name"
            >临床症状({{ (index + 1) | numChangeChineseChar }})</span
          >
          <i
            class="fold"
            :class="item.isShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
            @click="fold(item)"
          ></i>
        </div>
        <ul v-show="item.isShow" class="seeContent">
          <li>
            <el-row :type="rowType">
              <el-col :span="colSpan">
                入院日期：<span>{{ item.enterHospitalTime }}</span>
              </el-col>
              <el-col :span="colSpan" :offset="colOffset">
                出院日期：<span>{{ item.leaveHospitalTime }}</span>
              </el-col>
              <el-col :span="colSpan" :offset="colOffset">
                起病日期：<span>{{ item.beginTime }}</span>
              </el-col>
            </el-row>
          </li>
          <li>
            <el-row :type="rowType">
              <el-col :span="colSpan">
                起病年龄：<span>{{ item.beginAge }}</span>
              </el-col>
              <el-col :span="colSpan" :offset="colOffset">
                起病方式：<span>{{ item.beginIllType }}</span>
              </el-col>
              <el-col :span="colSpan" :offset="colOffset"> </el-col>
            </el-row>
          </li>
          <li>
            前驱感染：<span>{{
              item.isPrecursorInfected | confirmName(1)
            }}</span>
            <span v-show="item.isPrecursorInfected">{{
              item.precursorInfectedText
            }}</span>
          </li>
          <li>
            首发症状：<span>{{ item.prodromicSymptomCode }}</span>
            <span v-if="item.prodromicSymptomInfo"
              >其他首发症状：{{ item.prodromicSymptomInfo }}</span
            >
          </li>
          <li>
            所有症状：<span>{{ item.allSymptomCode }}</span>
            <span v-if="item.allSymptomInfo"
              >其他症状：{{ item.allSymptomInfo }}</span
            >
          </li>
          <li>
            入住ICU：<span>{{ item.isICU | confirmName(1) }}</span>
          </li>
          <li>
            中枢性低通气：<span>{{
              item.isCentralHypoventilation | confirmName
            }}</span>
            <span v-show="item.isCentralHypoventilation">{{
              item.centralHypoventilationType
            }}</span>
          </li>
          <li>
            <el-row :type="rowType">
              <el-col :span="colSpan">
                鼻饲：<span>{{ item.isNasalFeeding | confirmName }}</span>
              </el-col>
              <el-col :span="colSpan" :offset="colOffset">
                横纹肌溶解：<span>{{
                  item.isRhabdomyolysis | confirmName
                }}</span>
              </el-col>
              <el-col :span="colSpan" :offset="colOffset">
                合并肿瘤：<span>{{ item.isMergeTumour | confirmName(1) }}</span>
              </el-col>
            </el-row>
          </li>
          <li>
            急性期mRs评分：<span>{{ item.mrsGrade }}</span>
          </li>
          <li>
            急性期儿童脑功能评分：<span>{{ item.brainGrade }}</span>
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
import { mapState } from "vuex";
import {
  CSS_ELROW_TYPE,
  CSS_ELCOL_SPAN,
  CSS_ELCOL_OFFSET
} from "@/common/business/constants";
import toolMethods from "@/common/business/toolMethods";
export default {
  filters: {
    confirmName: function(value, type) {
      var result = type === 1 ? "是" : "有";
      switch (value) {
        case "":
        case null:
          result = "";
          break;
        case 0:
        case false:
          result = type === 1 ? "否" : "无";
          break;
      }
      return result;
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
    return {
      currentData: {},
      rowType: CSS_ELROW_TYPE,
      colSpan: CSS_ELCOL_SPAN,
      colOffset: CSS_ELCOL_OFFSET
    };
  },
  computed: {
    ...mapState({
      beginIllType: state => state.system.dicData.beginIllType,
      prodromicSymptomCode: state => state.system.dicData.prodromicSymptomCode,
      allSymptomCode: state => state.system.dicData.allSymptomCode,
      centralHypoventilationType: state =>
        state.system.dicData.centralHypoventilationType
    })
    // ,currentData: function() {
    //   // 深拷贝，不污染源数据
    //   let tempData = JSON.parse(JSON.stringify(this.originData));
    //   // 处理数据
    //   tempData.forEach(item => {
    //     // isShow属性变为响应式
    //     item.isShow = true;
    //     // this.$set(item, "isShow", true);
    //     // 字典value转为文本
    //     // beginIllType、prodromicSymptomCode、allSymptomCode、centralHypoventilationType
    //     item.beginIllType = toolMethods.reDicValue(
    //       item.beginIllType,
    //       "beginIllType"
    //     );
    //     item.prodromicSymptomCode = toolMethods.reDicValue(
    //       item.prodromicSymptomCode,
    //       "prodromicSymptomCode",
    //       1
    //     );
    //     item.allSymptomCode = toolMethods.reDicValue(
    //       item.allSymptomCode,
    //       "allSymptomCode",
    //       1
    //     );
    //     item.centralHypoventilationType = toolMethods.reDicValue(
    //       item.centralHypoventilationType,
    //       "centralHypoventilationType"
    //     );
    //   });
    //   return tempData;
    // }
  },
  watch: {
    // 异步获取到数据，要动态设置isShow为响应式，所以用的watch
    originData: function() {
      this.specialSetData();
    }
  },
  methods: {
    fold(item) {
      item.isShow = !item.isShow;
    },
    editForm() {
      this.$emit("edit");
    },
    // 点击取消时，要再次触发填充数据，所以封装为方法
    specialSetData() {
      // 深拷贝，不污染源数据
      let tempData = JSON.parse(JSON.stringify(this.originData));
      // 处理数据
      tempData.forEach(item => {
        // 字典value转为文本
        // beginIllType、prodromicSymptomCode、allSymptomCode、centralHypoventilationType
        item.beginIllType = toolMethods.reDicValue(
          item.beginIllType,
          "beginIllType"
        );
        item.prodromicSymptomCode = toolMethods.reDicValue(
          item.prodromicSymptomCode,
          "prodromicSymptomCode",
          1
        );
        item.allSymptomCode = toolMethods.reDicValue(
          item.allSymptomCode,
          "allSymptomCode",
          1
        );
        item.centralHypoventilationType = toolMethods.reDicValue(
          item.centralHypoventilationType,
          "centralHypoventilationType"
        );
      });
      this.currentData = tempData;
      // isShow属性变为响应式
      this.currentData.forEach(item => {
        this.$set(item, "isShow", true);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.clinicalSeeModule {
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
      margin: 30px 100px;
      li:not(.title) {
        height: 32px;
        margin-bottom: 20px;
        line-height: 32px;
        span {
          margin-left: 20px;
        }
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
