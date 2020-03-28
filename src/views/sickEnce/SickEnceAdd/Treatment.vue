<template>
  <div class="treatment">
    <template
      v-if="
        (userId && wholeStatus === 'see' && pageStatus === '') ||
          (userId && pageStatus === 'see')
      "
    >
      <!-- 治疗记录详情 -->
      <TreatmentSeeModule :originData="seeTreatmentArray" @edit="handEdit" />
    </template>
    <template v-else>
      <!-- 编辑治疗记录 -->
      <div class="fixTopContent">
        <div class="flex-button-box">
          <p class="episodes">
            <span v-show="!!sickUserEpisodes"
              >发作次数：<span class="times">{{ sickUserEpisodes }}</span></span
            >
          </p>
          <el-button
            type="primary"
            @click="addTreatment()"
            class="flex-button-item"
            >添加治疗记录</el-button
          >
        </div>
      </div>
      <div class="middleContent">
        <TreatmentEditModule
          ref="module"
          v-for="(treatment, index) in editTreatmentArray"
          :key="treatment.id"
          :originData="treatment"
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
import TreatmentEditModule from "./TreatmentEditModule";
import TreatmentSeeModule from "./TreatmentSeeModule";
import { mapState } from "vuex";
export default {
  components: {
    TreatmentEditModule,
    TreatmentSeeModule
  },
  data() {
    return {
      // 当前页的状态： see 查看 | edit 编辑 | 默认没有状态
      pageStatus: "",

      // 存节点添加过的数量,为了生成虚拟key值
      nodeNum: 1,
      // 存虚拟id，给v-for的key赋值
      virtualId: ["v1"],
      // 编辑时治疗记录数组
      editTreatmentArray: [{ id: "v1" }],
      // 预览时治疗记录数组
      seeTreatmentArray: []
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
    addTreatment() {
      let idValue = `v${++this.nodeNum}`;
      this.virtualId.push(idValue);
      this.editTreatmentArray.push({ id: idValue });
    },
    handRemove(id) {
      let index = this.virtualId.indexOf(id);
      this.editTreatmentArray.splice(index, 1);
      this.virtualId.splice(index, 1);
    },
    // 编辑事件
    handEdit() {
      // 设置data中的字段值
      if (this.seeTreatmentArray.length) {
        this.nodeNum = this.seeTreatmentArray.length;
        this.virtualId = [];
        for (let index = 0; index < this.nodeNum; index++) {
          this.virtualId.push(this.seeTreatmentArray[index].id);
        }
        var tempData = JSON.parse(JSON.stringify(this.seeTreatmentArray));
        this.editTreatmentArray = tempData;
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
          message: "请至少添加一个治疗记录模块",
          type: "error"
        });
        return false;
      }
      this.$refs.module.forEach(item => {
        item.submit();
      });
      // 同步校验数据

      var validTreatmentData = true;
      this.$refs.module.forEach(item => {
        if (
          !item.treatmentData.firstBeginTime ||
          item.treatmentData.isMppt === null ||
          item.treatmentData.isIVIG === null ||
          item.treatmentData.isPlasma === null
        ) {
          validTreatmentData = false;
          return false;
        }
      });
      if (!validTreatmentData) {
        return false;
      }

      // 第三步：收集数据
      // 净化数据(3.1去掉含v的id值，3.2将json转成字符串 )
      var treatmentDataArray = [];
      var tempData = {};

      this.$refs.module.forEach(item => {
        // 不处理源数据,避免污染
        tempData = JSON.parse(JSON.stringify(item.treatmentData));
        // 3.1
        // if (tempData.id.indexOf("v") !== -1)
        if (typeof tempData.id === "string") {
          tempData.id = "";
        }
        // 3.2
        tempData.drugRituximabJson = JSON.stringify(item.drugRituximabJsonObj);
        treatmentDataArray.push(tempData);
      });

      // console.log(treatmentDataArray);
      // 第四步：调接口提交数据
      this.submitTreatmentData(treatmentDataArray);
    },
    // 提交临床治疗数据到后台
    submitTreatmentData(treatmentDataArray) {
      this.$http(
        "sickAPI",
        "addTreatment",
        treatmentDataArray,
        this.userId
      ).then(data => {
        if (data.status !== 1) {
          this.$message({
            message: data.reason,
            type: "error"
          });
          return false;
        } else {
          this.seeTreatmentArray = data.list;
          this.pageStatus = "see";
          this.$message({
            message: data.reason,
            type: "success"
          });
        }
      });
    },
    // 取消
    resetForm() {
      this.pageStatus = "see";
    }
  },
  created() {
    // 当是查看详情状态时,获取数据
    if (this.wholeStatus === "see") {
      this.$http("sickAPI", "getTreatment", null, this.userId).then(data => {
        this.seeTreatmentArray = data.list;
      });
    }
  }
};
</script>
<style lang="less">
/* 全局样式 */
.treatment {
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
.treatment {
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
