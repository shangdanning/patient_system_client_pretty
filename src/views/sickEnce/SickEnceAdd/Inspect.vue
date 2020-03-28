<!--* Created by shangdanning on 2019/11/24.
    * 辅助检查页面
-->
<template>
  <div class="inspect">
    <template
      v-if="
        (userId && wholeStatus === 'see' && pageStatus === '') ||
          (userId && pageStatus === 'see')
      "
    >
      <!-- 辅助检查详情 -->
      <InspectSeeModule :originData="seeInspectArray" @edit="handEdit" />
    </template>
    <template v-else>
      <!-- 编辑辅助检查 -->
      <div class="fixTopContent">
        <div class="flex-button-box">
          <p class="episodes">
            <span v-show="!!sickUserEpisodes">
              发作次数：<span class="times">{{ sickUserEpisodes }}</span>
            </span>
          </p>
          <el-button
            type="primary"
            @click="addInspect()"
            class="flex-button-item"
            >添加辅助检查</el-button
          >
        </div>
      </div>
      <div class="middleContent">
        <InspectEditModule
          ref="module"
          v-for="(inspect, index) in editInspectArray"
          :key="inspect.id"
          :originData="inspect"
          :index="index + 1"
          @remove="handRemove"
        />
      </div>
      <div class="fixBottomContent">
        <div class="flex-button-box margin-top-10">
          <el-button class="flex-button-item" type="primary" @click="submitForm"
            >提交</el-button
          >
          <el-button
            class="flex-button-item"
            v-show="pageStatus === 'edit'"
            @click="resetForm"
            >取消</el-button
          >
        </div>
      </div>
    </template>
  </div>
</template>
<script>
import InspectEditModule from "./InspectEditModule";
import InspectSeeModule from "./InspectSeeModule";
import { mapState } from "vuex";
export default {
  components: {
    InspectEditModule,
    InspectSeeModule
  },
  data() {
    return {
      // 当前页的状态： see 查看 | edit 编辑 | 默认没有状态
      pageStatus: "",

      // 存节点添加过的数量,为了生成虚拟key值
      nodeNum: 1,
      // 存虚拟id，给v-for的key赋值
      virtualId: ["v1"],
      // 编辑时辅助检查数组
      editInspectArray: [{ id: "v1" }],
      // 预览时辅助检查数组
      seeInspectArray: []
    };
  },
  computed: {
    ...mapState({
      userId: state => state.sickEnce.sickUserId,
      wholeStatus: state => state.sickEnce.addPageWholeStatus,
      sickUserEpisodes: state => state.sickEnce.sickUserEpisodes
    })
  },
  methods: {
    addInspect() {
      let idValue = `v${++this.nodeNum}`;
      this.virtualId.push(idValue);
      this.editInspectArray.push({ id: idValue });
    },
    handRemove(id) {
      let index = this.virtualId.indexOf(id);
      this.editInspectArray.splice(index, 1);
      this.virtualId.splice(index, 1);
    },
    // 编辑事件
    handEdit() {
      // 设置data中的字段值
      if (this.seeInspectArray.length) {
        this.nodeNum = this.seeInspectArray.length;
        this.virtualId = [];
        for (let index = 0; index < this.nodeNum; index++) {
          this.virtualId.push(this.seeInspectArray[index].id);
        }
        var tempData = JSON.parse(JSON.stringify(this.seeInspectArray));
        this.editInspectArray = tempData;
      }
      this.pageStatus = "edit";
    },
    submitForm() {
      // 第一步：判断是否有userid
      if (!this.userId) {
        this.$message({
          message: "请先提交患者的基本信息",
          type: "error"
        });
        return false;
      }
      // 第二步： 所有子模块启动验证必填项
      // 先验证至少有一个子模块
      if (this.$refs.module.length === 0) {
        this.$message({
          message: "请至少添加一个辅助检查模块",
          type: "error"
        });
        return false;
      }
      this.$refs.module.forEach(item => {
        item.submit();
      });
      // 同步校验数据

      var validInspectData = true;
      var itemNameArray = [
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
      ];
      this.$refs.module.forEach(item => {
        // 每一个辅助检查模块
        itemNameArray.forEach(name => {
          // 当一个检查项目选中已查时
          if (item.inspectData[name + "Json"]) {
            // 需要确保子模块里都填写了检查时间和检查结果
            item.$refs[name + "ModuleItem"].forEach(module => {
              if (
                !module.inspectItemData.checkTime ||
                module.inspectItemData.checkResult === "" ||
                module.inspectItemData.checkResult === null
              ) {
                validInspectData = false;
                return false;
              }
            });
          }
        });
      });
      if (!validInspectData) {
        return false;
      }

      // 第三步：收集数据
      // 净化数据(3.1去掉含v的id值，3.2处理json数据-将子项的id按顺序调整为数字 3.3 再次校验整体数据不是空白 3.4将数据推入数组 )
      var inspectDataArray = [];
      var tempData = {};
      var attrNotIdNum = itemNameArray.length + 1; // 页面中除了id之外的项数
      this.$refs.module.forEach(item => {
        // 不处理源数据,避免污染
        tempData = JSON.parse(JSON.stringify(item.inspectData));
        // 3.1
        // if (tempData.id.indexOf("v") !== -1)
        if (typeof tempData.id === "string") {
          tempData.id = "";
        }
        // 3.2
        var count = 0;
        var tempModuleData = [];
        itemNameArray.forEach(name => {
          if (tempData[name + "Json"] === 1) {
            // 已查
            tempModuleData = [];
            item.$refs[name + "ModuleItem"].forEach((module, index) => {
              let temp = JSON.parse(JSON.stringify(module.inspectItemData));
              temp.id = index + 1;
              tempModuleData.push(temp);
            });
            tempData[name + "Json"] = JSON.stringify(tempModuleData);
          } else if (tempData[name + "Json"] === 0) {
            // 未查
            tempData[name + "Json"] = "0";
          } else if (tempData[name + "Json"] === "") {
            // 未选择
            tempData[name + "Json"] = "";
          }
        });
        // 3.3
        itemNameArray.forEach(name => {
          if (!tempData[name + "Json"]) {
            ++count;
          }
        });
        !tempData["other"] && ++count;
        // 除了id之外的节点数量
        if (count === attrNotIdNum) {
          validInspectData = false;
        }
        // 3.4
        inspectDataArray.push(tempData);
      });
      if (!validInspectData) {
        this.$message({
          message: "每一个辅助检查不可以为空白,请填写内容后，再提交",
          type: "error"
        });
        return false;
      }
      // console.log(inspectDataArray);
      // 第四步：调接口提交数据
      this.submitInspectData(inspectDataArray);
    },
    // 提交辅助检查数据到后台
    submitInspectData(inspectDataArray) {
      this.$http("sickAPI", "addInspect", inspectDataArray, this.userId).then(
        data => {
          if (data.status !== 1) {
            this.$message({
              message: data.reason,
              type: "error"
            });
            return false;
          } else {
            this.seeInspectArray = data.list;
            this.pageStatus = "see";
            this.$message({
              message: data.reason,
              type: "success"
            });
          }
        }
      );
    },
    // 取消
    resetForm() {
      this.pageStatus = "see";
    }
  },
  created() {
    // 当是查看详情状态时,获取数据
    if (this.wholeStatus === "see") {
      this.$http("sickAPI", "getInspect", null, this.userId).then(data => {
        this.seeInspectArray = data.list;
      });
    }
  }
};
</script>
<style lang="less">
/* 全局样式 */
.inspect {
  .fixTopContent {
    .flex-button-box {
      .el-form {
        width: 500px;
        margin-left: 110px !important;
        .el-form-item {
          margin-top: 10px !important;
          .el-form-item__error {
            top: 8px !important;
            left: 225px !important;
          }
        }
      }
      .el-button {
        margin-bottom: 10px !important;
      }
    }
  }
}
</style>
<style lang="less" scoped>
/* 本地样式 */
.inspect {
  padding-bottom: 15px;
  .fixTopContent {
    position: fixed;
    top: 114px;
    right: 0;
    z-index: 20;
    width: calc(100% - 200px);
    height: 50px;
    background-color: #ffffff;
    line-height: 50px;
    border-bottom: 1px solid #e1e4e7;
    .flex-button-box {
      justify-content: space-between;
      margin-top: 6px;
      padding-left: 100px;
      .episodes {
        margin-top: -5px;
        .times {
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
  .middleContent {
    margin-top: 50px;
  }
}
</style>
