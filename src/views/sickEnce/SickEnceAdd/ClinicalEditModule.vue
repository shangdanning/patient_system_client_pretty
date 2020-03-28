<template>
  <div class="clinicalEditModule">
    <div class="title" :class="isShow ? '' : 'borderBottom'">
      <span class="name">临床症状({{ index | numChangeChineseChar }})</span>
      <i
        class="fold"
        :class="isShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
        @click="fold()"
      ></i>
      <i class="el-icon-delete" @click="remove()"></i>
    </div>
    <div class="content" v-show="isShow">
      <el-form
        :model="clinicalData"
        :rules="rules"
        ref="clinicalData"
        label-width="100px"
        class="padding-top-10"
      >
        <el-row :type="rowType">
          <el-col :span="colSpan">
            <el-form-item label="入院日期：">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                v-model="clinicalData.enterHospitalTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="colSpan" :offset="colOffset">
            <el-form-item label="出院日期：">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                v-model="clinicalData.leaveHospitalTime"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="colSpan" :offset="colOffset">
            <el-form-item label="起病日期：" prop="beginTime">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                v-model="clinicalData.beginTime"
                @change="timeChangeEvent('begin')"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :type="rowType">
          <el-col :span="colSpan">
            <el-form-item label="起病年龄：" prop="beginAge">
              <el-input disabled v-model="clinicalData.beginAge"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="colSpan" :offset="colOffset">
            <el-form-item label="起病方式：">
              <el-select v-model="clinicalData.beginIllType">
                <el-option
                  v-for="item in beginIllType"
                  :key="item.id"
                  :label="item.dictDataName"
                  :value="item.dictDataValue"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="colSpan" :offset="colOffset"> </el-col>
        </el-row>

        <el-form-item label="前驱感染：">
          <el-radio-group v-model="clinicalData.isPrecursorInfected">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
          <el-input
            v-show="clinicalData.isPrecursorInfected"
            v-model="clinicalData.precursorInfectedText"
            placeholder="请输入症状描述"
            class="marginLeft20"
          ></el-input>
        </el-form-item>
        <el-form-item label="首发症状：">
          <el-select v-model="clinicalData.prodromicSymptomCode" multiple>
            <el-option
              v-for="item in prodromicSymptomCode"
              :key="item.id"
              :label="item.dictDataName"
              :value="item.dictDataValue"
            ></el-option>
          </el-select>
          <el-input
            v-show="
              clinicalData.prodromicSymptomCode &&
                clinicalData.prodromicSymptomCode.indexOf('9') !== -1
            "
            v-model="clinicalData.prodromicSymptomInfo"
            placeholder="请输入其他首发症状描述"
            class="marginLeft20"
          ></el-input>
        </el-form-item>
        <el-form-item label="所有症状：">
          <el-select v-model="clinicalData.allSymptomCode" multiple>
            <el-option
              v-for="item in allSymptomCode"
              :key="item.id"
              :label="item.dictDataName"
              :value="item.dictDataValue"
            ></el-option>
          </el-select>
          <el-input
            v-show="
              clinicalData.allSymptomCode &&
                clinicalData.allSymptomCode.indexOf('9') !== -1
            "
            v-model="clinicalData.allSymptomInfo"
            placeholder="请输入其他症状描述"
            class="marginLeft20"
          ></el-input>
        </el-form-item>
        <el-form-item label="入住ICU：">
          <el-radio-group v-model="clinicalData.isICU">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="中枢性低通气：">
          <el-radio-group v-model="clinicalData.isCentralHypoventilation">
            <el-radio :label="1">有</el-radio>
            <el-radio :label="0">无</el-radio>
          </el-radio-group>
          <el-select
            v-show="clinicalData.isCentralHypoventilation"
            v-model="clinicalData.centralHypoventilationType"
            class="marginLeft20"
          >
            <el-option
              v-for="item in centralHypoventilationType"
              :key="item.id"
              :label="item.dictDataName"
              :value="item.dictDataValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-row :type="rowType">
          <el-col :span="colSpan">
            <el-form-item label="鼻饲：">
              <el-radio-group v-model="clinicalData.isNasalFeeding">
                <el-radio :label="1">有</el-radio>
                <el-radio :label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="colSpan" :offset="colOffset">
            <el-form-item label="横纹肌溶解：">
              <el-radio-group v-model="clinicalData.isRhabdomyolysis">
                <el-radio :label="1">有</el-radio>
                <el-radio :label="0">无</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="colSpan" :offset="colOffset">
            <el-form-item label="合并肿瘤：">
              <el-radio-group v-model="clinicalData.isMergeTumour">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="急性期mRs评分：">
          <el-input v-model="clinicalData.mrsGrade"></el-input
          ><span class="margin-left-10 remark"
            >(评分范围为0-5，若未填值代表未做)</span
          >
        </el-form-item>
        <el-form-item label="急性期儿童脑功能评分：">
          <el-input v-model="clinicalData.brainGrade"></el-input
          ><span class="margin-left-10 remark"
            >(评分范围为1-6，若未填值代表未做)</span
          >
        </el-form-item>
      </el-form>
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
  props: {
    originData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    index: {
      type: Number,
      default: function() {
        return 1;
      }
    }
  },
  data() {
    return {
      // 是否折叠
      isShow: true,
      clinicalData: this.originData,
      rules: {
        beginTime: [
          {
            required: true,
            message: "请选择起病日期",
            trigger: "change"
          }
        ]
      },
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
        state.system.dicData.centralHypoventilationType,
      sickUser: state => state.sickEnce.sickUser
    })
  },
  watch: {
    // 当删除临床症状时会触发
    index: function(e) {
      if (e === 1) {
        this.clinicalData.beginTime = this.sickUser.beginTime;
        this.clinicalData.beginAge = this.sickUser.beginAge;
      }
    },
    // 当新增患者或者查询患者详情时会触发
    sickUser: function() {
      if (this.index === 1) {
        this.clinicalData.beginTime = this.sickUser.beginTime;
        this.clinicalData.beginAge = this.sickUser.beginAge;
      }
    }
  },
  created() {
    // 只有新增模块时(id里含v)，才初始化数据
    if (typeof this.clinicalData.id === "string") {
      this.clinicalData = {
        id: this.clinicalData.id,
        episodes: null,
        enterHospitalTime: "",
        leaveHospitalTime: "",
        beginTime: "",
        beginAge: "",
        beginIllType: null,
        isPrecursorInfected: null,
        precursorInfectedText: "",
        prodromicSymptomCode: "",
        prodromicSymptomInfo: "",
        allSymptomCode: "",
        allSymptomInfo: "",
        isICU: null,
        isCentralHypoventilation: null,
        centralHypoventilationType: null,
        isNasalFeeding: null,
        isRhabdomyolysis: null,
        isMergeTumour: null,
        mrsGrade: "",
        brainGrade: ""
      };
      if (this.index === 1) {
        this.clinicalData.beginTime = this.sickUser.beginTime;
        this.clinicalData.beginAge = this.sickUser.beginAge;
      }
    }
  },
  methods: {
    fold() {
      this.isShow = !this.isShow;
    },
    remove() {
      this.$emit("remove", this.originData.id);
    },
    submit() {
      this.$refs["clinicalData"].validate(valid => {
        if (!valid) {
          return false;
        }
      });
    },
    // 出生日期和首发日期切换时触发的事件
    timeChangeEvent(type) {
      if (!this.clinicalData.beginTime) {
        this.clinicalData.beginAge = "";
        return false;
      }
      if (
        this.$moment(this.clinicalData.beginTime).isBefore(
          this.sickUser.birthday,
          "day"
        )
      ) {
        this.clinicalData.beginAge = "";
        if (type === "begin") {
          this.$message({
            message: "温馨提示：起病日期应比出生日期大",
            type: "warn"
          });
          return false;
        }
      }
      if (this.$moment().isBefore(this.clinicalData.beginTime, "day")) {
        this.$message({
          message: "温馨提示：起病日期应比当前日期小",
          type: "warn"
        });
        return false;
      }
      this.clinicalData.beginAge = toolMethods.computeDetailAge(
        this.sickUser.birthday,
        this.clinicalData.beginTime
      );
    }
  }
};
</script>
<style lang="less">
/* 全局样式 */
.clinicalEditModule {
  //element-ui 定制化
  .el-textarea__inner {
    width: 665px;
  }
  .el-form-item__label {
    width: 170px !important;
  }
  .el-form-item__error {
    left: 70px !important;
  }
}
</style>
<style lang="less" scoped>
/* 本地样式 */
.clinicalEditModule {
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
    padding: 20px 40px;
    .marginLeft20 {
      margin-left: 20px;
    }
  }
  .borderBottom {
    border-bottom: 1px solid #e1e4e7;
  }
  .remark {
    font-size: 12px;
  }
}
</style>
