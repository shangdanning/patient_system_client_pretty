<!--* Created by shangdanning on 2019/11/25.
    * 随访记录页面
-->
<template>
  <div class="follow">
    <template
      v-if="
        (userId && wholeStatus === 'see' && pageStatus === '') ||
          (userId && pageStatus === 'see')
      "
    >
      <!-- 随访记录详情 -->
      <FollowSeeModule :originData="seeFollowArray" @edit="handEdit" />
    </template>
    <template v-else>
      <!-- 编辑随访记录 -->
      <div class="fixTopContent">
        <div class="flex-button-box ">
          <el-button
            type="primary"
            @click="addFollow()"
            class="flex-button-item"
            >添加随访记录</el-button
          >
        </div>
      </div>
      <div class="middleContent">
        <FollowEditModule
          ref="module"
          v-for="(follow, index) in editFollowArray"
          :key="follow.id"
          :originData="follow"
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
import FollowEditModule from "./FollowEditModule";
import FollowSeeModule from "./FollowSeeModule";
import { mapState } from "vuex";
export default {
  components: {
    FollowEditModule,
    FollowSeeModule
  },
  data() {
    return {
      // 当前页的状态： see 查看 | edit 编辑 | 默认没有状态
      pageStatus: "",

      // 存节点添加过的数量,为了生成虚拟key值
      nodeNum: 1,
      // 存虚拟id，给v-for的key赋值
      virtualId: ["v1"],
      // 编辑时随访记录数组
      editFollowArray: [{ id: "v1" }],
      // 预览时随访记录数组
      seeFollowArray: []
    };
  },
  computed: {
    ...mapState({
      userId: state => state.sickEnce.sickUserId,
      wholeStatus: state => state.sickEnce.addPageWholeStatus
    })
  },
  methods: {
    addFollow() {
      let idValue = `v${++this.nodeNum}`;
      this.virtualId.push(idValue);
      this.editFollowArray.push({ id: idValue });
    },
    handRemove(id) {
      let index = this.virtualId.indexOf(id);
      this.editFollowArray.splice(index, 1);
      this.virtualId.splice(index, 1);
    },
    // 编辑事件
    handEdit() {
      // 设置data中的字段值
      if (this.seeFollowArray.length) {
        this.nodeNum = this.seeFollowArray.length;
        this.virtualId = [];
        for (let index = 0; index < this.nodeNum; index++) {
          this.virtualId.push(this.seeFollowArray[index].id);
        }
        var tempData = JSON.parse(JSON.stringify(this.seeFollowArray));
        // 数据处理 将多选的字符串转为数组形式
        tempData.forEach(item => {
          item.overSymptom && (item.overSymptom = item.overSymptom.split(","));
          item.grug && (item.grug = item.grug.split(","));
        });
        this.editFollowArray = tempData;
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
          message: "请至少添加一个随访记录模块",
          type: "error"
        });
        return false;
      }
      this.$refs.module.forEach(item => {
        item.submit();
      });
      // 同步校验数据一
      var validFollowData = true;
      this.$refs.module.forEach(item => {
        if (!item.followData.followDate) {
          validFollowData = false;
          return false;
        }
      });
      if (!validFollowData) {
        return false;
      }
      // 同步校验数据二
      validFollowData = true;
      var itemNameArray = [
        "mri",
        "chart",
        "nmda",
        "mog",
        "serumNmda",
        "serumMog",
        "cd19Cell",
        "dq",
        "adhd"
      ];
      this.$refs.module.forEach(item => {
        // 每一个随访记录模块
        itemNameArray.forEach(name => {
          // 当一个检查项目选中已查时
          if (item.followData[name + "Json"]) {
            // 需要确保子模块里都填写了检查时间和检查结果
            item.$refs[name + "ModuleItem"].forEach(module => {
              if (
                !module.inspectItemData.checkTime ||
                module.inspectItemData.checkResult === "" ||
                module.inspectItemData.checkResult === null
              ) {
                validFollowData = false;
                return false;
              }
            });
          }
        });
      });
      if (!validFollowData) {
        return false;
      }

      // 第三步：收集数据
      // 净化数据(3.1去掉含v的id值，3.2处理多选的情况：数组转为字符串,3.3处理json数据-将子项的id按顺序调整为数字  3.4将数据推入数组 )
      var followDataArray = [];
      var tempData = {};

      this.$refs.module.forEach(item => {
        // 不处理源数据,避免污染
        tempData = JSON.parse(JSON.stringify(item.followData));
        // 3.1
        // if (tempData.id.indexOf("v") !== -1)
        if (typeof tempData.id === "string") {
          tempData.id = "";
        }
        // 3.2
        tempData.overSymptom &&
          (tempData.overSymptom = tempData.overSymptom.join(","));
        tempData.grug && (tempData.grug = tempData.grug.join(","));
        // 3.3
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
        // 3.4
        followDataArray.push(tempData);
      });
      // console.log(followDataArray);
      // 第四步：调接口提交数据
      this.submitFollowData(followDataArray);
    },
    // 提交随访记录数据到后台
    submitFollowData(followDataArray) {
      this.$http("sickAPI", "addFollow", followDataArray, this.userId).then(
        data => {
          if (data.status !== 1) {
            this.$message({
              message: data.reason,
              type: "error"
            });
            return false;
          } else {
            this.seeFollowArray = data.list;
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
      this.$http("sickAPI", "getFollow", null, this.userId).then(data => {
        this.seeFollowArray = data.list;
      });
    }
  }
};
</script>
<style lang="less">
/* 全局样式 */
.follow {
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
.follow {
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
      justify-content: flex-end !important;
      margin-top: 10px;
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
