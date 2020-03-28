<!--* Created by shangdanning on 2019/11/24.
    * 辅助检查-编辑页面
-->
<template>
  <div class="inspectEditModule">
    <div class="title" :class="isShow ? '' : 'borderBottom'">
      <span class="name">辅助检查({{ index | numChangeChineseChar }})</span>
      <i
        class="fold"
        :class="isShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
        @click="fold()"
      ></i>
      <i class="el-icon-delete" @click="remove()"></i>
    </div>
    <div class="content" v-show="isShow">
      <el-form
        :model="inspectData"
        ref="inspectData"
        label-width="100px"
        class="padding-top-10"
      >
        <el-form-item
          label="脑脊液细胞数："
          :class="{ gray: inspectData.cellsJson }"
        >
          <el-radio-group
            v-model="inspectData.cellsJson"
            @change="radioChangeEvent('cells')"
          >
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="inspectData.cellsJson"
            @click="addItem('cells')"
          ></i>
        </el-form-item>
        <div v-show="inspectData.cellsJson" class="itemModule">
          <InspectEditModuleItem
            ref="cellsModuleItem"
            v-for="(item, index) in cellsJsonArray"
            :key="item.id"
            :originData="item"
            :index="index + 1"
            :headLine="'脑脊液细胞数检查'"
            @remove="handRemove('cells', item.id)"
          />
        </div>
        <el-form-item
          label="脑脊液蛋白："
          :class="{ gray: inspectData.proteinJson }"
        >
          <el-radio-group
            v-model="inspectData.proteinJson"
            @change="radioChangeEvent('protein')"
          >
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="inspectData.proteinJson"
            @click="addItem('protein')"
          ></i>
        </el-form-item>
        <div v-show="inspectData.proteinJson" class="itemModule">
          <InspectEditModuleItem
            ref="proteinModuleItem"
            v-for="(item, index) in proteinJsonArray"
            :key="item.id"
            :originData="item"
            :index="index + 1"
            :headLine="'脑脊液蛋白检查'"
            @remove="handRemove('protein', item.id)"
          />
        </div>
        <el-form-item
          label="脑脊液糖："
          :class="{ gray: inspectData.sugarJson }"
          @change="radioChangeEvent('sugar')"
        >
          <el-radio-group
            v-model="inspectData.sugarJson"
            @change="radioChangeEvent('sugar')"
          >
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="inspectData.sugarJson"
            @click="addItem('sugar')"
          ></i>
        </el-form-item>
        <div v-show="inspectData.sugarJson" class="itemModule">
          <InspectEditModuleItem
            ref="sugarModuleItem"
            v-for="(item, index) in sugarJsonArray"
            :key="item.id"
            :originData="item"
            :index="index + 1"
            :headLine="'脑脊液糖检查'"
            @remove="handRemove('sugar', item.id)"
          />
        </div>
        <el-form-item
          label="脑脊液NMDAR抗体："
          :class="{ gray: inspectData.nmdaJson }"
          @change="radioChangeEvent('nmda')"
        >
          <el-radio-group v-model="inspectData.nmdaJson">
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="inspectData.nmdaJson"
            @click="addItem('nmda')"
          ></i>
        </el-form-item>
        <div v-show="inspectData.nmdaJson" class="itemModule">
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
          label="SOB："
          :class="{ gray: inspectData.sobJson }"
          @change="radioChangeEvent('sob')"
        >
          <el-radio-group v-model="inspectData.sobJson">
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="inspectData.sobJson"
            @click="addItem('sob')"
          ></i>
        </el-form-item>
        <div v-show="inspectData.sobJson" class="itemModule">
          <InspectEditModuleItemSob
            ref="sobModuleItem"
            v-for="(item, index) in sobJsonArray"
            :key="item.id"
            :originData="item"
            :index="index + 1"
            :headLine="'SOB检查'"
            @remove="handRemove('sob', item.id)"
          />
        </div>
        <el-form-item
          label="脑脊液MOG抗体："
          :class="{ gray: inspectData.mogJson }"
        >
          <el-radio-group
            v-model="inspectData.mogJson"
            @change="radioChangeEvent('mog')"
          >
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="inspectData.mogJson"
            @click="addItem('mog')"
          ></i>
        </el-form-item>
        <div v-show="inspectData.mogJson" class="itemModule">
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
          :class="{ gray: inspectData.serumNmdaJson }"
          @change="radioChangeEvent('serumNmda')"
        >
          <el-radio-group v-model="inspectData.serumNmdaJson">
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="inspectData.serumNmdaJson"
            @click="addItem('serumNmda')"
          ></i>
        </el-form-item>
        <div v-show="inspectData.serumNmdaJson" class="itemModule">
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
          :class="{ gray: inspectData.serumMogJson }"
        >
          <el-radio-group
            v-model="inspectData.serumMogJson"
            @change="radioChangeEvent('serumMog')"
          >
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="inspectData.serumMogJson"
            @click="addItem('serumMog')"
          ></i>
        </el-form-item>
        <div v-show="inspectData.serumMogJson" class="itemModule">
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
        <el-form-item label="脑电图：" :class="{ gray: inspectData.chartJson }">
          <el-radio-group
            v-model="inspectData.chartJson"
            @change="radioChangeEvent('chart')"
          >
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="inspectData.chartJson"
            @click="addItem('chart')"
          ></i>
        </el-form-item>
        <div v-show="inspectData.chartJson" class="itemModule">
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
        <el-form-item label="头颅MRI：" :class="{ gray: inspectData.mriJson }">
          <el-radio-group
            v-model="inspectData.mriJson"
            @change="radioChangeEvent('mri')"
          >
            <el-radio :label="1">已查</el-radio>
            <el-radio :label="0">未查</el-radio>
          </el-radio-group>
          <i
            class="el-icon-plus float-right"
            v-show="inspectData.mriJson"
            @click="addItem('mri')"
          ></i>
        </el-form-item>
        <div v-show="inspectData.mriJson" class="itemModule">
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
        <!-- <el-form-item label="药物基因：">
          <el-input v-model="inspectData.medicineGene"></el-input>
        </el-form-item> -->
        <el-form-item label="其他特殊检查结果：">
          <el-input type="textarea" v-model="inspectData.other"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import InspectEditModuleItem from "./InspectEditModuleItem";
import InspectEditModuleItemAnti from "./InspectEditModuleItemAnti";
import InspectEditModuleItemSob from "./InspectEditModuleItemSob";
import InspectEditModuleItemChart from "./InspectEditModuleItemChart";
export default {
  components: {
    InspectEditModuleItem,
    InspectEditModuleItemAnti,
    InspectEditModuleItemSob,
    InspectEditModuleItemChart
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
      inspectData: this.originData,
      itemArray: [
        "cells",
        "protein",
        "sugar",
        "chart",
        "mri",
        "nmda",
        "sob",
        "mog",
        "serumNmda",
        "serumMog"
      ],
      jsonState: {
        cells: {
          // 存节点添加过的数量,为了生成虚拟key值
          nodeNum: 1,
          // 存虚拟id，给v-for的key赋值
          virtualId: ["v1"]
        },
        protein: {
          nodeNum: 1,
          virtualId: ["v1"]
        },
        sugar: {
          nodeNum: 1,
          virtualId: ["v1"]
        },
        chart: {
          nodeNum: 1,
          virtualId: ["v1"]
        },
        mri: {
          nodeNum: 1,
          virtualId: ["v1"]
        },
        nmda: {
          nodeNum: 1,
          virtualId: ["v1"]
        },
        sob: {
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
        }
      },
      cellsJsonArray: [{ id: "v1" }],
      proteinJsonArray: [{ id: "v1" }],
      sugarJsonArray: [{ id: "v1" }],
      chartJsonArray: [{ id: "v1" }],
      mriJsonArray: [{ id: "v1" }],
      nmdaJsonArray: [{ id: "v1" }],
      sobJsonArray: [{ id: "v1" }],
      mogJsonArray: [{ id: "v1" }],
      serumNmdaJsonArray: [{ id: "v1" }],
      serumMogJsonArray: [{ id: "v1" }]
    };
  },
  computed: {},
  methods: {
    fold () {
      this.isShow = !this.isShow;
    },
    remove () {
      this.$emit("remove", this.originData.id);
    },
    submit () {
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
        this.inspectData[name + "Json"] === 1 &&
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
    }
  },
  created () {
    // 只有新增模块时(id里含v)，才初始化数据
    if (typeof this.inspectData.id === "string") {
      this.inspectData = {
        id: this.inspectData.id,
        cellsJson: "",
        proteinJson: "",
        sugarJson: "",
        chartJson: "",
        mriJson: "",
        nmdaJson: "",
        sobJson: "",
        mogJson: "",
        serumNmdaJson: "",
        serumMogJson: "",
        medicineGene: "",
        other: ""
      };
    } else {
      // 赋值子模块
      var childJson = null;
      this.itemArray.forEach(name => {
        if (
          this.inspectData[name + "Json"] &&
          this.inspectData[name + "Json"] !== "0"
        ) {
          childJson = JSON.parse(this.inspectData[name + "Json"]);
          this.jsonState[name].nodeNum = childJson.length;
          this.jsonState[name].virtualId = [];
          for (let index = 0; index < this.jsonState[name].nodeNum; index++) {
            this.jsonState[name].virtualId.push(childJson[index].id);
          }
          this[name + "JsonArray"] = childJson;
          // 选中已检查项
          this.inspectData[name + "Json"] = 1;
        } else if (this.inspectData[name + "Json"] === "0") {
          // 选中未检查项
          this.inspectData[name + "Json"] = 0;
        }
      });
    }
  }
};
</script>
<style lang="less">
/* 全局样式 */
.inspectEditModule {
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
.inspectEditModule {
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
  }
  .borderBottom {
    border-bottom: 1px solid #e1e4e7;
  }
}
</style>
