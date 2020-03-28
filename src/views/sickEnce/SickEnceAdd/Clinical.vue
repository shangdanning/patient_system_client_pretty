<template>
  <div class="clinical">
    <template
      v-if="
        (userId && wholeStatus === 'see' && pageStatus === '') ||
          (userId && pageStatus === 'see')
      "
    >
      <!-- 临床症状详情 -->
      <ClinicalSeeModule
        ref="seeModule"
        :originData="seeClinicalArray"
        @edit="handEdit"
      />
    </template>
    <template v-else>
      <!-- 编辑临床症状 -->
      <div class="fixTopContent">
        <div class="flex-button-box ">
          <el-form
            :model="singleData"
            :rules="rulesSingleData"
            ref="singleData"
            label-width="100px"
          >
            <el-form-item label="发作次数：" prop="episodes">
              <el-input
                type="number"
                disabled
                v-model="singleData.episodes"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-button
            type="primary"
            @click="addClinical()"
            class="flex-button-item"
            >添加临床症状</el-button
          >
        </div>
      </div>
      <div class="middleContent">
        <ClinicalEditModule
          ref="module"
          v-for="(clinical, index) in editClinicalArray"
          :key="clinical.id"
          :originData="clinical"
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
import ClinicalEditModule from "./ClinicalEditModule";
import ClinicalSeeModule from "./ClinicalSeeModule";
import { mapState } from "vuex";
import {
  MU_SICK_EPISODES,
  MU_SICK_BEGINTIMEARRAY
} from "@/common/business/constants";
export default {
  components: {
    ClinicalEditModule,
    ClinicalSeeModule
  },
  data() {
    return {
      // 当前页的状态： see 查看 | edit 编辑 | 默认没有状态
      pageStatus: "",
      // 独立表单，只存发作次数
      singleData: {
        episodes: 1
      },
      rulesSingleData: {
        episodes: [
          // 非空和正则双重验证
          {
            required: true,
            message: "请输入发作次数",
            trigger: "change"
          },
          {
            pattern: /^\+?[1-9]\d*$/,
            message: "发作次数最少是1次",
            trigger: "blur"
          }
        ]
      },
      // 存节点添加过的数量,为了生成虚拟key值
      nodeNum: 1,
      // 存虚拟id，给v-for的key赋值
      virtualId: ["v1"],
      // 编辑时临床症状数组
      editClinicalArray: [{ id: "v1" }],
      // 预览时临床症状数组
      seeClinicalArray: []
    };
  },
  computed: {
    ...mapState({
      userId: state => state.sickEnce.sickUserId,
      wholeStatus: state => state.sickEnce.addPageWholeStatus
    })
  },
  watch: {
    // episodes的次数是自动算的，和多少个临床症状一致。 (2019-12-26 甲方提出)
    editClinicalArray: function(e) {
      this.singleData.episodes = e.length;
    }
  },
  created() {
    // 当是查看详情状态时,获取数据
    if (this.wholeStatus === "see") {
      this.$http("sickAPI", "getClinical", null, this.userId).then(data => {
        this.seeClinicalArray = data.list;
      });
    }
  },
  methods: {
    addClinical() {
      let idValue = `v${++this.nodeNum}`;
      this.virtualId.push(idValue);
      this.editClinicalArray.push({ id: idValue });
    },
    handRemove(id) {
      let index = this.virtualId.indexOf(id);
      this.editClinicalArray.splice(index, 1);
      this.virtualId.splice(index, 1);
    },
    // 编辑事件
    handEdit() {
      // 设置data中的字段值
      if (this.seeClinicalArray.length) {
        this.singleData.episodes = this.seeClinicalArray[0].episodes;
        this.nodeNum = this.seeClinicalArray.length;
        this.virtualId = [];
        for (let index = 0; index < this.nodeNum; index++) {
          this.virtualId.push(this.seeClinicalArray[index].id);
        }
        var tempData = JSON.parse(JSON.stringify(this.seeClinicalArray));
        // 数据处理 将多选的字符串转为数组形式
        tempData.forEach(item => {
          item.prodromicSymptomCode &&
            (item.prodromicSymptomCode = item.prodromicSymptomCode.split(","));
          item.allSymptomCode &&
            (item.allSymptomCode = item.allSymptomCode.split(","));
        });
        this.editClinicalArray = tempData;
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
      this.$refs["singleData"].validate(valid => {
        if (!valid) {
          return false;
        }
      });
      // 先验证至少有一个子模块
      if (this.$refs.module.length === 0) {
        this.$message({
          message: "请至少添加一个临床症状模块",
          type: "error"
        });
        return false;
      }
      // 同步校验数据
      if (!this.singleData.episodes || this.singleData.episodes <= 0) {
        return false;
      }
      this.$refs.module.forEach(item => {
        item.submit();
      });
      // 同步校验数据
      var validClinicalData = true;
      this.$refs.module.forEach(item => {
        if (!item.clinicalData.beginTime) {
          validClinicalData = false;
          return false;
        }
      });
      if (!validClinicalData) {
        return false;
      }

      // 第三步：收集数据
      // 净化数据(3.1去掉含v的id值，3.2将选否的相应子项置空，3.3处理多选的情况：数组转为字符串,3.4赋值发作次数)
      var clinicalDataArray = [];
      var tempData = {};

      this.$refs.module.forEach(item => {
        // 不处理源数据,避免污染
        tempData = JSON.parse(JSON.stringify(item.clinicalData));
        // 3.1
        // if (tempData.id.indexOf("v") !== -1)
        if (typeof tempData.id === "string") {
          tempData.id = "";
        }
        // 3.2 todo 这部分代码可删掉，需优化
        !tempData.isPrecursorInfected && (tempData.precursorInfectedText = "");
        !tempData.isCentralHypoventilation &&
          (tempData.centralHypoventilationType = null);
        // 将没选其他的相的详情置空
        tempData.prodromicSymptomCode.indexOf("9") === -1 &&
          (tempData.prodromicSymptomInfo = "");
        tempData.allSymptomCode.indexOf("9") === -1 &&
          (tempData.allSymptomInfo = "");
        // 3.3
        tempData.prodromicSymptomCode = tempData.prodromicSymptomCode.join(",");
        tempData.allSymptomCode = tempData.allSymptomCode.join(",");
        // 3.4
        tempData.episodes = this.singleData.episodes;
        clinicalDataArray.push(tempData);
      });
      // console.log(clinicalDataArray);
      // 第四步：调接口提交数据
      this.submitClinicalData(clinicalDataArray);
    },
    // 提交临床治疗数据到后台
    submitClinicalData(clinicalDataArray) {
      this.$http("sickAPI", "addClinical", clinicalDataArray, this.userId).then(
        data => {
          if (data.status !== 1) {
            this.$message({
              message: data.reason,
              type: "error"
            });
            return false;
          } else {
            // 设置发作次数
            this.$store.commit(MU_SICK_EPISODES, data.list[0].episodes);
            var beginTimeArray = data.list.map(item => {
              return item.beginTime;
            });
            this.$store.commit(MU_SICK_BEGINTIMEARRAY, beginTimeArray);
            this.seeClinicalArray = data.list;
            this.pageStatus = "see";
            this.$nextTick(() => {
              this.$refs.seeModule.specialSetData();
            });
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
      // 手动填充子组件data数据（因为要实现isShow的响应式）
      this.$nextTick(() => {
        this.$refs.seeModule.specialSetData();
      });
    }
  }
};
</script>
<style lang="less">
/* 全局样式 */
.clinical {
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
.clinical {
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
      justify-content: space-between !important;
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
