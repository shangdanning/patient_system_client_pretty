<template>
  <div class="TreatmentSeeModule">
    <div class="TopContent">
      <p v-show="!!sickUserEpisodes">
        发作次数：<span class="times">{{ sickUserEpisodes }}</span>
      </p>
    </div>
    <div class="seeMiddleContent">
      <div v-for="(item, index) in currentData" :key="item.id">
        <div class="title" :class="item.isShow ? '' : 'borderBottom'">
          <span class="name"
            >治疗记录({{ (index + 1) | numChangeChineseChar }})</span
          >
          <i
            class="fold"
            :class="item.isShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
            @click="fold(item, 'module')"
          ></i>
        </div>
        <div v-show="item.isShow" class="seeContent">
          <div id="firstTreat" class="treatChild">
            <!-- 一线治疗 -->
            <p class="flex-button-box">
              <span class="childName">一线治疗</span>
              <i
                class="fold"
                :class="
                  item.isShowFirst ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
                "
                @click="fold(item, 'first')"
              ></i>
            </p>
            <ul v-show="item.isShowFirst" class="childContent">
              <li>
                开始时间：<span>{{ item.firstBeginTime }}</span>
              </li>
              <li>
                甲泼尼龙冲击治疗：<span>{{
                  item.isMppt === 1 ? "有" : "无"
                }}</span>
                <span v-show="item.isMppt">{{ item.mpptText }}</span>
              </li>
              <li>
                序贯口服激素治疗：<span>{{
                  item.isSequential === 1 ? "有" : "无"
                }}</span>
                <span v-show="item.isSequential">{{
                  item.sequentialText
                }}</span>
              </li>
              <li>
                丙球：<span>{{ item.isIVIG === 1 ? "有" : "无" }}</span>
                <span v-show="item.isIVIG">{{ item.iVIGText }}</span>
              </li>
              <li>
                血浆置换：<span>{{ item.isPlasma === 1 ? "有" : "无" }}</span>
                <span v-show="item.isPlasma">{{ item.plasmaText }}</span>
              </li>
              <li>
                一线治疗后2周mRs评分：<span>{{ item.afterFirstMrsGrade }}</span>
              </li>
              <li>
                一线治疗后2周儿童脑功能评分：<span>{{
                  item.afterFirstBrainGrade
                }}</span>
              </li>
              <li>
                其他时间评分：<span>{{ item.otherTimeGrade }}</span>
              </li>
            </ul>
          </div>
          <div id="secondTreat" class="treatChild" v-show="item.isSecondTreat">
            <!-- 二线治疗 -->
            <p class="flex-button-box">
              <span class="childName">二线治疗</span>
              <i
                class="fold"
                :class="
                  item.isShowSecond ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
                "
                @click="fold(item, 'second')"
              ></i>
            </p>
            <ul v-show="item.isShowSecond" class="childContent">
              <li>
                开始时间：<span>{{ item.secondBeginTime }}</span>
              </li>
              <li>
                起病到接受二线治疗时间间隔：<span>{{
                  item.beginToSecondTimeInterval
                }}</span
                >天
              </li>
              <li>
                开始一线治疗到二线治疗的时间间隔：<span>{{
                  item.firstToSecondTimeInterval
                }}</span
                >天
              </li>
              <li>
                二线治疗前mRs评分：<span>{{ item.beforeSecondMrsGrade }}</span>
              </li>
              <li>
                二线治疗前儿童脑功能评分：<span>{{
                  item.beforeSecondBrainGrade
                }}</span>
              </li>
              <li>
                用药记录：<span>{{ item.drugNameShow }}</span>
              </li>
              <li class="drugDetail ">
                <!-- 用药记录详情 -->
                <div v-show="!!item.isDrugRituximab">
                  <!-- 美罗华用药情况 -->
                  <p class="fontWeight marginBottom0">
                    <span>美罗华用药情况</span>
                  </p>
                  <p>
                    用药次数：<span>{{
                      item.drugRituximabJson.drugcount
                    }}</span>
                  </p>
                  <p>
                    CD19+细胞：<span>{{
                      item.drugRituximabJson.beforeTreatCD19State
                        | cd19stateToName
                    }}</span>
                    <span
                      v-show="item.drugRituximabJson.beforeTreatCD19State"
                      >{{
                        item.drugRituximabJson.beforeTreatCD19StateText
                      }}</span
                    >
                  </p>
                  <ul>
                    <li
                      v-for="grade in item.drugRituximabJson.GradeList"
                      :key="grade.name"
                    >
                      <ul>
                        <li class="fontBlue">
                          <span>第{{ grade.name }}次后评分：</span>
                        </li>
                        <li>
                          mRs评分：<span>{{ grade.mRSGrade }}</span>
                        </li>
                        <li>
                          儿童脑功能评分：<span>{{ grade.brainGrade }}</span>
                        </li>
                        <li>
                          CD19+细胞：<span>{{
                            grade.cD19State | cd19stateToName
                          }}</span>
                          <span v-show="grade.cD19State">{{
                            grade.cD19StateText
                          }}</span>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div v-show="!!item.isDrugCTX">
                  <p class="fontWeight marginBottom0">
                    <span>CTX用药情况</span>
                  </p>
                  <p>
                    <span>{{ item.cTXDrugText }}</span>
                  </p>
                </div>
                <div v-show="!!item.isDrugMMF">
                  <p class="fontWeight marginBottom0">
                    <span>MMF用药情况</span>
                  </p>
                  <p>
                    <span>{{ item.mMFDrugText }}</span>
                  </p>
                </div>
                <div v-show="!!item.isDrugAzathioprine">
                  <p class="fontWeight marginBottom0">
                    <span>硫唑嘌呤用药情况</span>
                  </p>
                  <p>
                    <span>{{ item.azathioprineDrugText }}</span>
                  </p>
                </div>
                <div v-show="!!item.isDrugMtx">
                  <p class="fontWeight marginBottom0">
                    <span>MTX鞘注用药情况</span>
                  </p>
                  <p>
                    <span>{{ item.mtxDrugText }}</span>
                  </p>
                </div>
                <div v-show="!!item.isDrugOther">
                  <p class="fontWeight marginBottom0">
                    <span>其他用药情况</span>
                  </p>
                  <p>
                    <span>{{ item.drugText }}</span>
                  </p>
                </div>
              </li>
              <li>
                出院时mRs评分：<span>{{ item.leaveMrsGrade }}</span>
              </li>
              <li>
                出院时儿童脑功能评分：<span>{{ item.leaveBrainGrade }}</span>
              </li>
            </ul>
          </div>
        </div>
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
import { itemStateList } from "@/common/business/dataCache";
import { mapState } from "vuex";
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
        this.$set(item, "isShowFirst", true);
        this.$set(item, "isShowSecond", true);
        // drugNameShow
        var drugName = [];
        item.isDrugRituximab && drugName.push("美罗华");
        item.isDrugCTX && drugName.push("CTX");
        item.isDrugMMF && drugName.push("MMF");
        item.isDrugAzathioprine && drugName.push("硫唑嘌呤");
        item.isDrugMtx && drugName.push("MTX鞘注");
        item.isDrugOther && drugName.push("其他");
        item.drugNameShow = drugName.join("、");
        // json字符串格式化
        item.drugRituximabJson = JSON.parse(item.drugRituximabJson);
        // 字典value转为文本
      });
      return tempData;
    },
    ...mapState({
      sickUserEpisodes: state => state.sickEnce.sickUserEpisodes
    })
  },
  methods: {
    fold(item, type) {
      if (type === "module") {
        item.isShow = !item.isShow;
      } else if (type === "first") {
        item.isShowFirst = !item.isShowFirst;
      } else if (type === "second") {
        item.isShowSecond = !item.isShowSecond;
      }
    },
    editForm() {
      this.$emit("edit");
    }
  }
};
</script>
<style lang="less" scoped>
.TreatmentSeeModule {
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
      .treatChild {
        margin: 15px;
        border: 1px solid #e1e4e7;
        .flex-button-box {
          justify-content: space-between !important;
          height: 40px;
          padding: 0 17px !important;
          line-height: 40px;
          border-bottom: 1px solid #e1e4e7;
          .childName {
            font-size: 15px;
          }
          .flex-button-item {
            background-color: #f2f9ff;
            color: #409eff;
          }
        }
        .childContent {
          margin: 20px 130px 30px;
          .drugDetail {
            position: relative;
            left: 30px;
            .fontWeight {
              font-weight: bold;
            }
            .marginBottom0 {
              margin-bottom: 0 !important;
            }
            .fontBlue {
              margin-bottom: 0 !important;
              color: #409eff !important;
            }
          }
        }
      }
      li {
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
