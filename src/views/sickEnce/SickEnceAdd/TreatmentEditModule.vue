<template>
  <div class="treatmentEditModule">
    <div class="title" :class="isShow ? '' : 'borderBottom'">
      <span class="name">治疗记录({{ index | numChangeChineseChar }})</span>
      <i
        class="fold"
        :class="isShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
        @click="fold()"
      ></i>
      <i class="el-icon-delete" @click="remove()"></i>
    </div>
    <div class="content" v-show="isShow">
      <div id="firstTreat" class="treatChild">
        <!-- 一线治疗 -->
        <p class="flex-button-box">
          <span class="childName">一线治疗</span>
          <el-button
            type="primary"
            @click="addSecondTreat"
            :disabled="!!treatmentData.isSecondTreat"
            class="flex-button-item"
            >添加二线治疗</el-button
          >
        </p>
        <el-form
          :model="treatmentData"
          :rules="rules"
          ref="treatmentData"
          label-width="100px"
          class="childContent"
        >
          <el-form-item label="开始时间：" prop="firstBeginTime">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              v-model="treatmentData.firstBeginTime"
              @change="timeChangeEvent('firstBegin')"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="甲泼尼龙冲击治疗：" prop="isMppt">
            <el-radio-group
              v-model="treatmentData.isMppt"
              @change="radioChangeEvent('isMppt', 'mpptText')"
            >
              <el-radio :label="1">有</el-radio>
              <el-radio :label="0">无</el-radio>
            </el-radio-group>
            <el-input
              v-show="treatmentData.isMppt"
              v-model="treatmentData.mpptText"
              placeholder="请录入具体剂量及起止时间"
              class="marginLeft20"
            ></el-input>
          </el-form-item>
          <el-form-item label="序贯口服激素治疗：">
            <el-radio-group
              v-model="treatmentData.isSequential"
              @change="radioChangeEvent('isSequential', 'sequentialText')"
            >
              <el-radio :label="1">有</el-radio>
              <el-radio :label="0">无</el-radio>
            </el-radio-group>
            <el-input
              v-show="treatmentData.isSequential"
              v-model="treatmentData.sequentialText"
              placeholder="请录入具体剂量及起止时间"
              class="marginLeft20"
            ></el-input>
          </el-form-item>
          <el-form-item label="丙球：" prop="isIVIG">
            <el-radio-group
              v-model="treatmentData.isIVIG"
              @change="radioChangeEvent('isIVIG', 'iVIGText')"
            >
              <el-radio :label="1">有</el-radio>
              <el-radio :label="0">无</el-radio>
            </el-radio-group>
            <el-input
              v-show="treatmentData.isIVIG"
              v-model="treatmentData.iVIGText"
              placeholder="请录入具体剂量及起止时间"
              class="marginLeft20"
            ></el-input>
          </el-form-item>
          <el-form-item label="血浆置换：" prop="isPlasma">
            <el-radio-group
              v-model="treatmentData.isPlasma"
              @change="radioChangeEvent('isPlasma', 'plasmaText')"
            >
              <el-radio :label="1">有</el-radio>
              <el-radio :label="0">无</el-radio>
            </el-radio-group>
            <el-input
              v-show="treatmentData.isPlasma"
              v-model="treatmentData.plasmaText"
              placeholder="请录入具体剂量及起止时间"
              class="marginLeft20"
            ></el-input>
          </el-form-item>
          <el-form-item label="一线治疗后2周mRs评分：">
            <el-input v-model="treatmentData.afterFirstMrsGrade"></el-input>
          </el-form-item>
          <el-form-item label="一线治疗后2周儿童脑功能评分：">
            <el-input v-model="treatmentData.afterFirstBrainGrade"></el-input>
          </el-form-item>
          <el-form-item label="其他时间评分：">
            <el-input v-model="treatmentData.otherTimeGrade"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div
        id="secondTreat"
        class="treatChild"
        v-show="treatmentData.isSecondTreat"
      >
        <!-- 二线治疗 -->
        <p class="flex-button-box">
          <span class="childName">二线治疗</span>
          <i class="el-icon-delete" @click="removeSecondTreat()"></i>
        </p>
        <el-form label-width="100px" class="childContent">
          <el-form-item label="开始时间：">
            <el-date-picker
              type="date"
              value-format="yyyy-MM-dd"
              v-model="treatmentData.secondBeginTime"
              @change="timeChangeEvent('secondBegin')"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            label="
                            起病到接受二线治疗时间间隔："
          >
            <el-input
              disabled
              v-model="treatmentData.beginToSecondTimeInterval"
            ></el-input
            ><span class="margin-left-10">天</span>
          </el-form-item>
          <el-form-item label="开始一线治疗到二线治疗的时间间隔：">
            <el-input
              disabled
              v-model="treatmentData.firstToSecondTimeInterval"
            ></el-input
            ><span class="margin-left-10">天</span>
          </el-form-item>
          <el-form-item label="二线治疗前mRS评分：">
            <el-input v-model="treatmentData.beforeSecondMrsGrade"></el-input>
          </el-form-item>
          <el-form-item label="二线治疗前儿童脑功能评分：">
            <el-input v-model="treatmentData.beforeSecondBrainGrade"></el-input>
          </el-form-item>
          <el-form-item label="用药记录：">
            <!-- 直接与data元数据绑定 -->
            <el-checkbox
              v-model="treatmentData.isDrugRituximab"
              @change="drugRituximabChangeEvent"
              >美罗华</el-checkbox
            >
            <el-checkbox v-model="treatmentData.isDrugCTX">CTX</el-checkbox>
            <el-checkbox v-model="treatmentData.isDrugMMF">MMF</el-checkbox>
            <el-checkbox v-model="treatmentData.isDrugAzathioprine"
              >硫唑嘌呤</el-checkbox
            >
            <el-checkbox v-model="treatmentData.isDrugMtx">MTX鞘注</el-checkbox>
            <el-checkbox v-model="treatmentData.isDrugOther">其他</el-checkbox>
          </el-form-item>
          <div class="drugDetail">
            <!-- 用药记录详情 -->
            <div v-show="isShowDrugRituximab">
              <!-- 美罗华用药情况 -->
              <el-form-item
                class="fontWeight marginBottom0"
                label="美罗华用药情况"
              >
              </el-form-item>
              <el-form-item label="用药次数：">
                <el-input
                  type="number"
                  v-model="drugRituximabJsonObj.drugcount"
                ></el-input>
              </el-form-item>
              <el-form-item label="治疗前CD19+细胞：">
                <el-select
                  v-model="drugRituximabJsonObj.beforeTreatCD19State"
                  clearable
                  @change="beforeTreatCD19StateChanngeEvent"
                >
                  <el-option
                    v-for="item in selectItemState"
                    :key="item.id"
                    :label="item.name"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-input
                  v-show="drugRituximabJsonObj.beforeTreatCD19State"
                  v-model="drugRituximabJsonObj.beforeTreatCD19StateText"
                  placeholder="请输入具体数值及百分比"
                  class="marginLeft20"
                ></el-input>
              </el-form-item>
              <!-- =====================第一次后、第二次后、第三次后、第四次后评分============================= -->
              <div
                v-for="grade in drugRituximabJsonObj.GradeList"
                :key="grade.name"
              >
                <el-form-item
                  class="fontBlue"
                  :label="'第' + grade.name + '次后评分：'"
                >
                </el-form-item>
                <el-form-item label="mRs评分：">
                  <el-input v-model="grade.mRSGrade"></el-input>
                </el-form-item>
                <el-form-item label="儿童脑功能评分：">
                  <el-input v-model="grade.brainGrade"></el-input>
                </el-form-item>
                <el-form-item label="CD19+细胞：">
                  <el-select
                    v-model="grade.cD19State"
                    clearable
                    @change="gradecD19StateChanngeEvent(grade)"
                  >
                    <el-option
                      v-for="item in selectItemState"
                      :key="item.id"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-input
                    v-show="grade.cD19State"
                    v-model="grade.cD19StateText"
                    placeholder="请输入具体数值及百分比"
                    class="marginLeft20"
                  ></el-input>
                </el-form-item>
              </div>
            </div>
            <div v-show="treatmentData.isDrugCTX">
              <el-form-item class="fontWeight" label="CTX用药情况：">
                <el-input v-model="treatmentData.cTXDrugText"></el-input>
              </el-form-item>
            </div>
            <div v-show="treatmentData.isDrugMMF">
              <el-form-item class="fontWeight" label="MMF用药情况：">
                <el-input v-model="treatmentData.mMFDrugText"></el-input>
              </el-form-item>
            </div>
            <div v-show="treatmentData.isDrugAzathioprine">
              <el-form-item class="fontWeight" label="硫唑嘌呤用药情况：">
                <el-input
                  v-model="treatmentData.azathioprineDrugText"
                ></el-input>
              </el-form-item>
            </div>
            <div v-show="treatmentData.isDrugMtx">
              <el-form-item class="fontWeight" label="MTX鞘注用药情况：">
                <el-input v-model="treatmentData.mtxDrugText"></el-input>
              </el-form-item>
            </div>
            <div v-show="treatmentData.isDrugOther">
              <!--其他用药情况 -->
              <el-form-item class="fontWeight" label="其他用药情况：">
                <el-input v-model="treatmentData.drugText"></el-input>
              </el-form-item>
            </div>
          </div>
          <el-form-item label="出院时mRs评分：">
            <el-input v-model="treatmentData.leaveMrsGrade"></el-input>
          </el-form-item>
          <el-form-item label="出院时儿童脑功能评分：">
            <el-input v-model="treatmentData.leaveBrainGrade"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { itemStateList } from "@/common/business/dataCache";
import { mapState } from "vuex";
import toolMethods from "@/common/business/toolMethods";
export default {
  props: {
    originData: {
      type: Object,
      default: function () {
        return {};
      }
    },
    index: {
      type: Number,
      default: function () {
        return 1;
      }
    }
  },
  data () {
    return {
      // 是否折叠
      isShow: true,
      treatmentData: this.originData,
      rules: {
        firstBeginTime: [
          {
            required: true,
            message: "请选择一线治疗开始时间",
            trigger: "change"
          }
        ],
        isMppt: [
          {
            required: true,
            message: "请选择有无甲泼尼龙冲击治疗",
            trigger: "change"
          }
        ],
        isIVIG: [
          {
            required: true,
            message: "请选择有无丙球治疗",
            trigger: "change"
          }
        ],
        isPlasma: [
          {
            required: true,
            message: "请选择有无血浆置换治疗",
            trigger: "change"
          }
        ]
      },
      drugRituximabJsonObj: {},
      // 检查项目的下拉框内容
      selectItemState: itemStateList
    };
  },
  computed: {
    // 是否显示美罗华用药情况
    isShowDrugRituximab: function () {
      return !!this.treatmentData.isDrugRituximab;
    },
    // 是否显示其他用药情况
    isShowDrugOther: function () {
      return (
        this.treatmentData.isDrugCTX ||
        this.treatmentData.isDrugMMF ||
        this.treatmentData.isDrugAzathioprine ||
        this.treatmentData.isDrugMtx ||
        this.treatmentData.isDrugOther
      );
    },
    ...mapState({
      sickUserBeginTimeArray: state => state.sickEnce.sickUserBeginTimeArray
    })
  },
  watch: {
    "treatmentData.isDrugCTX": function (e) {
      !e && (this.treatmentData.cTXDrugText = "");
    },
    "treatmentData.isDrugMMF": function (e) {
      !e && (this.treatmentData.mMFDrugText = "");
    },
    "treatmentData.isDrugAzathioprine": function (e) {
      !e && (this.treatmentData.azathioprineDrugText = "");
    },
    "treatmentData.isDrugMtx": function (e) {
      !e && (this.treatmentData.mtxDrugText = "");
    },
    "treatmentData.isDrugOther": function (e) {
      !e && (this.treatmentData.drugText = "");
    }
  },
  created () {
    // 只有新增模块时(id里含v)，才初始化数据
    if (typeof this.treatmentData.id === "string") {
      this.treatmentData = {
        id: this.treatmentData.id,
        // 一线治疗
        firstBeginTime: "",
        isMppt: null,
        mpptText: "",
        isSequential: null,
        sequentialText: "",
        isIVIG: null,
        iVIGText: "",
        isPlasma: null,
        plasmaText: "",
        afterFirstMrsGrade: "",
        afterFirstBrainGrade: "",
        otherTimeGrade: "",
        // 二线治疗
        isSecondTreat: false,
        secondBeginTime: "",
        beginToSecondTimeInterval: "",
        firstToSecondTimeInterval: "",
        beforeSecondMrsGrade: "",
        beforeSecondBrainGrade: "",
        isDrugRituximab: null,
        drugRituximabJson: "",
        isDrugCTX: null,
        isDrugMMF: null,
        isDrugAzathioprine: null,
        isDrugMtx: null,
        isDrugOther: null,
        cTXDrugText: "",
        mMFDrugText: "",
        azathioprineDrugText: "",
        mtxDrugText: "",
        drugText: "",
        leaveMrsGrade: "",
        leaveBrainGrade: ""
      };
      this.resetDrugRituximabJsonObj();
    } else {
      // 真值过来时，将字符串转成Json
      this.drugRituximabJsonObj = JSON.parse(
        this.treatmentData.drugRituximabJson
      );
      this.treatmentData.isDrugRituximab = !!this.treatmentData.isDrugRituximab;
      this.treatmentData.isDrugCTX = !!this.treatmentData.isDrugCTX;
      this.treatmentData.isDrugMMF = !!this.treatmentData.isDrugMMF;
      this.treatmentData.isDrugAzathioprine = !!this.treatmentData
        .isDrugAzathioprine;
      this.treatmentData.isDrugMtx = !!this.treatmentData.isDrugMtx;
      this.treatmentData.isDrugOther = !!this.treatmentData.isDrugOther;
    }
  },
  methods: {
    fold () {
      this.isShow = !this.isShow;
    },
    remove () {
      this.$emit("remove", this.originData.id);
    },
    submit () {
      this.$refs["treatmentData"].validate(valid => {
        if (!valid) {
          return false;
        }
      });
    },
    // 添加二线治疗记录
    addSecondTreat () {
      this.treatmentData.isSecondTreat = 1;
    },
    // 删除二线治疗
    removeSecondTreat () {
      this.treatmentData.isSecondTreat = 0;
      // 将二线治疗的相应内容重置
      this.treatmentData.isSecondTreat = false;
      this.treatmentData.secondBeginTime = "";
      this.treatmentData.beginToSecondTimeInterval = "";
      this.treatmentData.firstToSecondTimeInterval = "";
      this.treatmentData.beforeSecondMrsGrade = "";
      this.treatmentData.beforeSecondBrainGrade = "";
      this.treatmentData.isDrugRituximab = null;
      this.treatmentData.drugRituximabJson = "";
      this.treatmentData.isDrugCTX = null;
      this.treatmentData.isDrugMMF = null;
      this.treatmentData.isDrugAzathioprine = null;
      this.treatmentData.isDrugMtx = null;
      this.treatmentData.isDrugOther = null;
      this.treatmentData.cTXDrugText = "";
      this.treatmentData.mMFDrugText = "";
      this.treatmentData.azathioprineDrugText = "";
      this.treatmentData.mtxDrugText = "";
      this.treatmentData.drugText = "";
      this.treatmentData.leaveMrsGrade = "";
      this.treatmentData.leaveBrainGrade = "";
      // todo 可优化 如果未选择，则json可为空
      this.resetDrugRituximabJsonObj();
    },
    // 单选按钮，选择否的时候，把相应文本清空
    // 参数例如 'isMppt','mpptText'
    radioChangeEvent (isValue, text) {
      if (!this.treatmentData[isValue]) {
        this.treatmentData[text] = "";
      }
    },
    // 用药记录 -治疗前CD19+细胞下拉框状态改变
    beforeTreatCD19StateChanngeEvent () {
      !this.drugRituximabJsonObj.beforeTreatCD19State &&
        (this.drugRituximabJsonObj.beforeTreatCD19StateText = "");
    },
    // 用药记录 -评分的CD19+细胞下拉框状态改变
    gradecD19StateChanngeEvent (e) {
      !e.cD19State && (e.cD19StateText = "");
    },
    // 不选择美罗华事件
    drugRituximabChangeEvent (e) {
      if (!e) {
        this.resetDrugRituximabJsonObj();
      }
    },
    // 重置美罗华json
    resetDrugRituximabJsonObj () {
      this.drugRituximabJsonObj = {
        drugcount: null,
        beforeTreatCD19State: "",
        beforeTreatCD19StateText: "",
        GradeList: [
          {
            name: "一",
            mRSGrade: "",
            brainGrade: "",
            cD19State: "",
            cD19StateText: ""
          },
          {
            name: "二",
            mRSGrade: "",
            brainGrade: "",
            cD19State: "",
            cD19StateText: ""
          },
          {
            name: "三",
            mRSGrade: "",
            brainGrade: "",
            cD19State: "",
            cD19StateText: ""
          },
          {
            name: "四",
            mRSGrade: "",
            brainGrade: "",
            cD19State: "",
            cD19StateText: ""
          }
        ]
      };
    },
    // 一线治疗和二线治疗的开始时间切换时触发的事件
    timeChangeEvent (type) {
      if (
        !this.treatmentData.firstBeginTime ||
        !this.treatmentData.secondBeginTime
      ) {
        this.treatmentData.firstToSecondTimeInterval = "";
        return false;
      }
      if (
        this.$moment(this.treatmentData.secondBeginTime).isBefore(
          this.treatmentData.firstBeginTime,
          "day"
        )
      ) {
        this.treatmentData.firstToSecondTimeInterval = "";
        if (type === "firstBegin") {
          this.$message({
            message: "温馨提示：一线治疗的开始时间应比二线治疗的开始时间小",
            type: "warn"
          });
          return false;
        } else if (type === "secondBegin") {
          this.$message({
            message: "温馨提示：二线治疗的开始时间应比一线治疗的开始时间大",
            type: "warn"
          });
          return false;
        }
      }
      if (
        this.$moment(this.treatmentData.secondBeginTime).isBefore(
          this.sickUserBeginTimeArray[this.index - 1],
          "day"
        )
      ) {
        this.$message({
          message: "温馨提示：二线治疗的开始时间应比起病日期的时间大",
          type: "warn"
        });
        return false;
      }
      this.treatmentData.firstToSecondTimeInterval = toolMethods.computeDiffDays(
        this.treatmentData.firstBeginTime,
        this.treatmentData.secondBeginTime
      );
      if (this.sickUserBeginTimeArray && this.sickUserBeginTimeArray.length) {
        // 如果没有相对应的起病时间，则设置为首发时间
        let beginTime = this.sickUserBeginTimeArray[this.index - 1];
        !beginTime && (beginTime = this.sickUserBeginTimeArray[0]);
        this.treatmentData.beginToSecondTimeInterval = toolMethods.computeDiffDays(
          beginTime,
          this.treatmentData.secondBeginTime
        );
      }
    }
  }
};
</script>
<style lang="less">
/* 全局样式 */
.treatmentEditModule {
  //element-ui 定制化
  .el-textarea__inner {
    width: 665px;
  }
  .el-form-item__label {
    width: 255px !important;
  }
  .el-form-item__error {
    left: 154px !important;
  }
  .fontBlue {
    .el-form-item__label {
      color: #409eff;
    }
  }
}
</style>
<style lang="less" scoped>
/* 本地样式 */
.treatmentEditModule {
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
  .content {
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
        padding: 20px 30px 30px;
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
    .marginLeft20 {
      margin-left: 20px;
    }
  }
  .borderBottom {
    border-bottom: 1px solid #e1e4e7;
  }
}
</style>
