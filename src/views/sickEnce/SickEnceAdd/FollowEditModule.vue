<!--* Created by shangdanning on 2019/11/24.
    * 随访记录-编辑页面
-->
<template>
  <div class="followEditModule">
    <div class="title" :class="isShow ? '' : 'borderBottom'">
      <span class="name">随访记录({{ index | numChangeChineseChar }})</span>
      <i
        class="fold"
        :class="isShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
        @click="fold()"
      ></i>
      <i class="el-icon-delete" @click="remove()"></i>
    </div>
    <div class="content" v-show="isShow">
      <el-form
        :model="followData"
        :rules="rules"
        ref="followData"
        label-width="100px"
        class="padding-top-10"
      >
        <el-form-item label="随访日期：" prop="followDate">
          <el-date-picker
            type="date"
            value-format="yyyy-MM-dd"
            v-model="followData.followDate"
            @change="timeChangeEvent()"
          ></el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="随访日期：">
          <el-input v-model="followData.followDate"
                   ></el-input>
        </el-form-item> -->
        <el-form-item label="随访年龄：">
          <el-input disabled v-model="followData.followAge"></el-input>
        </el-form-item>
        <el-form-item label="随访病程：">
          <el-input disabled v-model="followData.followSinceBegin"></el-input
          ><span class="margin-left-10">天</span>
        </el-form-item>
        <el-form-item label="遗留症状：">
          <el-select v-model="followData.overSymptom" multiple>
            <el-option
              v-for="item in overSymptom"
              :key="item.id"
              :label="item.dictDataName"
              :value="item.dictDataValue"
            ></el-option>
          </el-select>
          <el-input
            v-show="followData.overSymptom.indexOf('7') !== -1"
            v-model="followData.overSymptomText"
            placeholder="请输入其他遗留症状描述"
            class="marginLeft20"
          ></el-input>
        </el-form-item>
        <el-form-item label="mRs评分：">
          <el-input v-model="followData.mrsGrade"></el-input>
        </el-form-item>
        <el-form-item label="儿童脑功能评分：">
          <el-input v-model="followData.brainGrade"></el-input>
        </el-form-item>
        <el-form-item label="生活质量评分：">
          <el-input v-model="followData.lifeGrade"></el-input>
        </el-form-item>
        <!-- Gesell评分和ADHD评分删掉 (2019-12-26 甲方提出) -->
        <!-- <el-form-item label="Gesell评分：">
          <el-input v-model="followData.gesellGrade"></el-input>
        </el-form-item>
        <el-form-item label="ADHD评分：">
          <el-input v-model="followData.aDHDGrade"></el-input>
        </el-form-item> -->
        <el-form-item label="头颅MRI：" :class="{ gray: followData.mriJson }">
          <el-radio-group
            v-model="followData.mriJson"
            @change="radioChangeEvent('mri')"
          >
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="followData.mriJson"
            @click="addItem('mri')"
          ></i>
        </el-form-item>
        <div v-show="followData.mriJson" class="itemModule">
          <InspectEditModuleItem
            ref="mriModuleItem"
            v-for="(item, index) in mriJsonArray"
            :key="item.id"
            :originData="item"
            :index="index + 1"
            :headLine="'头颅MRI检查'"
            @remove="handRemove('mri', item.id)"
          />
        </div>
        <el-form-item label="脑电图：" :class="{ gray: followData.chartJson }">
          <el-radio-group
            v-model="followData.chartJson"
            @change="radioChangeEvent('chart')"
          >
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="followData.chartJson"
            @click="addItem('chart')"
          ></i>
        </el-form-item>
        <div v-show="followData.chartJson" class="itemModule">
          <InspectEditModuleItemChart
            ref="chartModuleItem"
            v-for="(item, index) in chartJsonArray"
            :key="item.id"
            :originData="item"
            :index="index + 1"
            :headLine="'脑电图检查'"
            @remove="handRemove('chart', item.id)"
          />
        </div>
        <el-form-item
          label="脑脊液NMDAR抗体："
          :class="{ gray: followData.nmdaJson }"
          @change="radioChangeEvent('nmda')"
        >
          <el-radio-group v-model="followData.nmdaJson">
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="followData.nmdaJson"
            @click="addItem('nmda')"
          ></i>
        </el-form-item>
        <div v-show="followData.nmdaJson" class="itemModule">
          <InspectEditModuleItemAnti
            ref="nmdaModuleItem"
            v-for="(item, index) in nmdaJsonArray"
            :key="item.id"
            :originData="item"
            :index="index + 1"
            :headLine="'脑脊液NMDAR抗体检查'"
            @remove="handRemove('nmda', item.id)"
          />
        </div>
        <el-form-item
          label="脑脊液MOG抗体："
          :class="{ gray: followData.mogJson }"
        >
          <el-radio-group
            v-model="followData.mogJson"
            @change="radioChangeEvent('mog')"
          >
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="followData.mogJson"
            @click="addItem('mog')"
          ></i>
        </el-form-item>
        <div v-show="followData.mogJson" class="itemModule">
          <InspectEditModuleItemAnti
            ref="mogModuleItem"
            v-for="(item, index) in mogJsonArray"
            :key="item.id"
            :originData="item"
            :index="index + 1"
            :headLine="'脑脊液MOG抗体检查'"
            @remove="handRemove('mog', item.id)"
          />
        </div>
        <el-form-item
          label="血清NMDAR抗体："
          :class="{ gray: followData.serumNmdaJson }"
          @change="radioChangeEvent('serumNmda')"
        >
          <el-radio-group v-model="followData.serumNmdaJson">
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="followData.serumNmdaJson"
            @click="addItem('serumNmda')"
          ></i>
        </el-form-item>
        <div v-show="followData.serumNmdaJson" class="itemModule">
          <InspectEditModuleItemAnti
            ref="serumNmdaModuleItem"
            v-for="(item, index) in serumNmdaJsonArray"
            :key="item.id"
            :originData="item"
            :index="index + 1"
            :headLine="'血清NMDAR抗体检查'"
            @remove="handRemove('serumNmda', item.id)"
          />
        </div>
        <el-form-item
          label="血清MOG抗体："
          :class="{ gray: followData.serumMogJson }"
        >
          <el-radio-group
            v-model="followData.serumMogJson"
            @change="radioChangeEvent('serumMog')"
          >
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="followData.serumMogJson"
            @click="addItem('serumMog')"
          ></i>
        </el-form-item>
        <div v-show="followData.serumMogJson" class="itemModule">
          <InspectEditModuleItemAnti
            ref="serumMogModuleItem"
            v-for="(item, index) in serumMogJsonArray"
            :key="item.id"
            :originData="item"
            :index="index + 1"
            :headLine="'血清MOG抗体检查'"
            @remove="handRemove('serumMog', item.id)"
          />
        </div>
        <el-form-item
          label="CD19+细胞："
          :class="{ gray: followData.cd19CellJson }"
        >
          <el-radio-group
            v-model="followData.cd19CellJson"
            @change="radioChangeEvent('cd19Cell')"
          >
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="followData.cd19CellJson"
            @click="addItem('cd19Cell')"
          ></i>
        </el-form-item>
        <div v-show="followData.cd19CellJson" class="itemModule">
          <FollowEditModuleItemCd19
            ref="cd19CellModuleItem"
            v-for="(item, index) in cd19CellJsonArray"
            :key="item.id"
            :originData="item"
            :index="index + 1"
            :headLine="'CD19+细胞检查'"
            @remove="handRemove('cd19Cell', item.id)"
          />
        </div>
        <el-form-item label="DQ：" :class="{ gray: followData.dqJson }">
          <el-radio-group
            v-model="followData.dqJson"
            @change="radioChangeEvent('dq')"
          >
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="followData.dqJson"
            @click="addItem('dq')"
          ></i>
        </el-form-item>
        <div v-show="followData.dqJson" class="itemModule">
          <InspectEditModuleItemSimple
            ref="dqModuleItem"
            v-for="(item, index) in dqJsonArray"
            :key="item.id"
            :originData="item"
            :index="index + 1"
            :headLine="'DQ检查'"
            @remove="handRemove('dq', item.id)"
          />
        </div>
        <el-form-item label="ADHD：" :class="{ gray: followData.adhdJson }">
          <el-radio-group
            v-model="followData.adhdJson"
            @change="radioChangeEvent('adhd')"
          >
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="followData.adhdJson"
            @click="addItem('adhd')"
          ></i>
        </el-form-item>
        <div v-show="followData.adhdJson" class="itemModule">
          <InspectEditModuleItem
            ref="adhdModuleItem"
            v-for="(item, index) in adhdJsonArray"
            :key="item.id"
            :originData="item"
            :index="index + 1"
            :headLine="'ADHD检查'"
            @remove="handRemove('adhd', item.id)"
          />
        </div>
        <el-form-item label="其他异常辅助检查：" class="marginBottom0">
          <el-input type="textarea" v-model="followData.other"></el-input>
        </el-form-item>
        <el-form-item label="维持用药：">
          <el-select v-model="followData.grug" multiple>
            <el-option
              v-for="item in grug"
              :key="item.id"
              :label="item.dictDataName"
              :value="item.dictDataValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <div class="grugDetail">
          <el-form-item
            v-show="followData.grug.indexOf('1') !== -1"
            label="丙球冲击用药方法："
          >
            <el-input v-model="followData.iVIGText"></el-input>
          </el-form-item>
          <el-form-item
            v-show="followData.grug.indexOf('2') !== -1"
            label="甲强冲击用药方法："
          >
            <el-input v-model="followData.methylSrongText"></el-input>
          </el-form-item>
          <el-form-item
            v-show="followData.grug.indexOf('3') !== -1"
            label="激素续贯口服用药方法："
          >
            <el-input v-model="followData.hormoneText"></el-input>
          </el-form-item>
          <el-form-item
            v-show="followData.grug.indexOf('4') !== -1"
            label="MMF用药方法："
          >
            <el-input v-model="followData.mmfText"></el-input>
          </el-form-item>
          <el-form-item
            v-show="followData.grug.indexOf('5') !== -1"
            label="RTX用药方法："
          >
            <el-input v-model="followData.rtxText"></el-input>
          </el-form-item>
          <el-form-item
            v-show="followData.grug.indexOf('6') !== -1"
            label="CTX用药方法："
          >
            <el-input v-model="followData.ctxText"></el-input>
          </el-form-item>
          <el-form-item
            v-show="followData.grug.indexOf('7') !== -1"
            label="AZA用药方法："
          >
            <el-input v-model="followData.azaText"></el-input>
          </el-form-item>
          <el-form-item
            v-show="followData.grug.indexOf('8') !== -1"
            label="其他用药方法："
          >
            <el-input v-model="followData.grugText"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import InspectEditModuleItem from "./InspectEditModuleItem";
import InspectEditModuleItemAnti from "./InspectEditModuleItemAnti";
import InspectEditModuleItemChart from "./InspectEditModuleItemChart";
import InspectEditModuleItemSimple from "./InspectEditModuleItemSimple";
import FollowEditModuleItemCd19 from "./FollowEditModuleItemCd19";
import toolMethods from "@/common/business/toolMethods";
import { mapState } from "vuex";
export default {
  components: {
    InspectEditModuleItem,
    InspectEditModuleItemAnti,
    InspectEditModuleItemChart,
    InspectEditModuleItemSimple,
    FollowEditModuleItemCd19
  },
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
      followData: this.originData,
      rules: {
        followDate: [
          {
            required: true,
            message: "请选择随访日期",
            trigger: "change"
          }
        ]
      },
      itemArray: [
        "mri",
        "chart",
        "nmda",
        "mog",
        "serumNmda",
        "serumMog",
        "cd19Cell",
        "dq",
        "adhd"
      ],
      jsonState: {
        mri: {
          // 存节点添加过的数量,为了生成虚拟key值
          nodeNum: 1,
          // 存虚拟id，给v-for的key赋值
          virtualId: ["v1"]
        },
        chart: {
          nodeNum: 1,
          virtualId: ["v1"]
        },

        nmda: {
          nodeNum: 1,
          virtualId: ["v1"]
        },
        mog: {
          nodeNum: 1,
          virtualId: ["v1"]
        },
        serumNmda: {
          nodeNum: 1,
          virtualId: ["v1"]
        },
        serumMog: {
          nodeNum: 1,
          virtualId: ["v1"]
        },
        cd19Cell: {
          nodeNum: 1,
          virtualId: ["v1"]
        },
        dq: {
          nodeNum: 1,
          virtualId: ["v1"]
        },
        adhd: {
          nodeNum: 1,
          virtualId: ["v1"]
        }
      },

      mriJsonArray: [{ id: "v1" }],
      chartJsonArray: [{ id: "v1" }],
      nmdaJsonArray: [{ id: "v1" }],
      mogJsonArray: [{ id: "v1" }],
      serumNmdaJsonArray: [{ id: "v1" }],
      serumMogJsonArray: [{ id: "v1" }],
      cd19CellJsonArray: [{ id: "v1" }],
      dqJsonArray: [{ id: "v1" }],
      adhdJsonArray: [{ id: "v1" }]
    };
  },
  computed: {
    ...mapState({
      overSymptom: state => state.system.dicData.overSymptom,
      grug: state => state.system.dicData.grug,
      sickUserAge: state => state.sickEnce.sickUserAge,
      sickUserBeginTimeArray: state => state.sickEnce.sickUserBeginTimeArray,
      sickUser: state => state.sickEnce.sickUser
    })
  },
  watch: {
    "followData.grug": function (e) {
      e.indexOf("1") === -1 && (this.followData.iVIGText = "");
      e.indexOf("2") === -1 && (this.followData.methylSrongText = "");
      e.indexOf("3") === -1 && (this.followData.hormoneText = "");
      e.indexOf("4") === -1 && (this.followData.mmfText = "");
      e.indexOf("5") === -1 && (this.followData.rtxText = "");
      e.indexOf("6") === -1 && (this.followData.ctxText = "");
      e.indexOf("7") === -1 && (this.followData.azaText = "");
      e.indexOf("8") === -1 && (this.followData.grugText = "");
    },
    sickUserAge: function (e) {
      this.followData.followAge = e || "";
    }
  },
  created () {
    // 只有新增模块时(id里含v)，才初始化数据
    if (typeof this.followData.id === "string") {
      this.followData = {
        id: this.followData.id,
        followDate: this.$moment().format("YYYY-MM-DD"),
        followAge: this.sickUserAge ? this.sickUserAge : "",
        followSinceBegin: "",
        overSymptom: "",
        overSymptomText: "",
        mrsGrade: "",
        brainGrade: "",
        lifeGrade: "",
        gesellGrade: "",
        aDHDGrade: "",
        mriJson: "",
        chartJson: "",
        nmdaJson: "",
        mogJson: "",
        serumNmdaJson: "",
        serumMogJson: "",
        cd19CellJson: "",
        dqJson: "",
        adhdJson: "",
        other: "",
        grug: "",
        iVIGText: "",
        methylSrongText: "",
        hormoneText: "",
        mmfText: "",
        rtxText: "",
        ctxText: "",
        azaText: "",
        grugText: ""
      };
      this.computeFollowSinceBegin();
    } else {
      // 赋值子模块
      var childJson = null;
      this.itemArray.forEach(name => {
        if (
          this.followData[name + "Json"] &&
          this.followData[name + "Json"] !== "0"
        ) {
          childJson = JSON.parse(this.followData[name + "Json"]);
          this.jsonState[name].nodeNum = childJson.length;
          this.jsonState[name].virtualId = [];
          for (let index = 0; index < this.jsonState[name].nodeNum; index++) {
            this.jsonState[name].virtualId.push(childJson[index].id);
          }
          this[name + "JsonArray"] = childJson;
          // 选中已检查项
          this.followData[name + "Json"] = 1;
        } else if (this.followData[name + "Json"] === "0") {
          // 选中未检查项
          this.followData[name + "Json"] = 0;
        }
      });
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
      // 验证表单里的随访日期
      this.$refs["followData"].validate(valid => {
        if (!valid) {
          return false;
        }
      });
      // 验证子项
      this.itemArray.forEach(itemName => {
        this.$refs[itemName + "ModuleItem"].forEach(item => {
          item.submit();
        });
      });
    },
    addItem (name) {
      let idValue = `v${++this.jsonState[name].nodeNum}`;
      this.jsonState[name].virtualId.push(idValue);
      this[name + "JsonArray"].push({ id: idValue });
    },
    handRemove (name, id) {
      if (
        this.followData[name + "Json"] === 1 &&
        this[name + "JsonArray"].length === 1
      ) {
        this.$message({
          message: "当前项目选择已查时，至少有一个默认检查模块",
          type: "warn"
        });
        return false;
      }
      let index = this.jsonState[name].virtualId.indexOf(id);
      this[name + "JsonArray"].splice(index, 1);
      this.jsonState[name].virtualId.splice(index, 1);
    },
    // 切换已查、未查时
    radioChangeEvent (name) {
      this.jsonState[name].nodeNum = 1;
      this.jsonState[name].virtualId = ["v1"];
      this[name + "JsonArray"] = [{ id: "v1" }];
      // 子项数据重置
      this.$refs[name + "ModuleItem"].forEach(item => {
        item.reset();
      });
    },
    // 随访日期切换时触发的事件
    timeChangeEvent () {
      if (!this.followData.followDate) {
        this.followData.followSinceBegin = "";
        this.followData.followAge = "";
        return false;
      }
      this.computeFollowSinceBegin();
      this.sickUser.birthday && this.computeFollowAge();
    },
    // 计算随访病程
    computeFollowSinceBegin () {
      if (this.sickUserBeginTimeArray && this.sickUserBeginTimeArray.length) {
        // 如果没有相对应的起病时间，则设置为首发时间
        // let beginTime = this.sickUserBeginTimeArray[this.index - 1];
        // !beginTime && (beginTime = this.sickUserBeginTimeArray[0]);
        // 随访病程的计算都是按照随访时间减去首次发病时间 (2019-12-26 甲方提出)
        let beginTime = this.sickUserBeginTimeArray[0];
        if (
          this.$moment(this.followData.followDate).isBefore(beginTime, "day")
        ) {
          this.followData.followSinceBegin = "";
          this.$message({
            message: "温馨提示：随访日期应比起病日期大",
            type: "warn"
          });
          return false;
        }
        this.followData.followSinceBegin = toolMethods.computeDiffDays(
          beginTime,
          this.followData.followDate
        );
      }
    },
    // 计算随访年龄
    computeFollowAge () {
      if (
        this.$moment(this.followData.followDate).isBefore(
          this.sickUser.birthday,
          "day"
        )
      ) {
        this.followData.followAge = "";
        this.$message({
          message: "温馨提示：随访日期应比出生日期大",
          type: "warn"
        });
        return false;
      }
      this.followData.followAge = toolMethods.computeDetailAge(
        this.sickUser.birthday,
        this.followData.followDate
      );
    }
  }
};
</script>
<style lang="less">
/* 全局样式 */
.followEditModule {
  //element-ui 定制化
  .el-textarea__inner {
    position: relative;
    left: 70px;
    top: -25px;
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
.followEditModule {
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
    padding: 20px 40px 30px;
    .gray {
      margin-bottom: 0px;
      padding-right: 30px;
      background-color: #ddd;
    }
    .el-icon-plus {
      margin-top: 7px;
      margin-right: 33px;
    }
    .itemModule {
      margin-bottom: 20px;
    }
    .marginLeft20 {
      margin-left: 20px;
    }
    .marginBottom0 {
      margin-bottom: 0px;
    }
    .grugDetail {
      position: relative;
      left: 50px;
    }
  }
  .borderBottom {
    border-bottom: 1px solid #e1e4e7;
  }
}
</style>
