<!--* Created by shangdanning on 2019/11/25.
    * 随访记录-cd19模块 编辑页面
-->
<template>
  <div class="followEditItemModule">
    <div class="title" :class="isShow ? '' : 'borderBottom'">
      <span class="name"
        >{{ headLine }}({{ index | numChangeChineseChar }})</span
      >
      <i
        class="fold"
        :class="isShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
        @click="fold()"
      ></i>
      <i class="el-icon-delete" @click="remove()"></i>
    </div>
    <div class="content" v-show="isShow">
      <el-form
        :model="inspectItemData"
        :rules="rules"
        ref="inspectItemData"
        label-width="100px"
        class="padding-top-10"
      >
        <el-form-item label="检查时间：" prop="checkTime">
          <el-date-picker
            type="date"
            value-format="yyyy-MM-dd"
            v-model="inspectItemData.checkTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="检查结果：" prop="checkResult">
          <el-select
            v-model="inspectItemData.checkResult"
            clearable
            @change="radioChangeEvent"
          >
            <el-option
              v-for="item in selectItemState"
              :key="item.id"
              :label="item.name"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-input
            v-show="inspectItemData.checkResult"
            v-model="inspectItemData.resultText"
            placeholder="请录入具体数值及百分比"
            class="marginLeft20"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { itemStateList } from "@/common/business/dataCache";
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
    },
    headLine: {
      type: String,
      default: function() {
        return "检查";
      }
    }
  },
  data() {
    return {
      // 是否折叠
      isShow: true,
      inspectItemData: this.originData,
      rules: {
        checkTime: [
          {
            required: true,
            message: "请选择检查时间",
            trigger: "change"
          }
        ],
        checkResult: [
          {
            required: true,
            message: "请选择检查结果",
            trigger: "change"
          }
        ]
      },
      // 检查项目的下拉框内容
      selectItemState: itemStateList
    };
  },
  computed: {},
  methods: {
    fold() {
      this.isShow = !this.isShow;
    },
    remove() {
      this.$emit("remove", this.originData.id);
    },
    submit() {
      this.$refs["inspectItemData"].validate(valid => {
        if (!valid) {
          return false;
        }
      });
    },
    radioChangeEvent() {
      !this.inspectItemData.checkResult &&
        (this.inspectItemData.resultText = "");
    },
    reset() {
      this.inspectItemData.checkTime = "";
      this.inspectItemData.checkResult = "";
      this.inspectItemData.resultText = "";
    }
  },
  created() {
    // 只有新增模块时(id里含v)，才初始化数据
    if (typeof this.inspectItemData.id === "string") {
      this.inspectItemData = {
        id: this.inspectItemData.id,
        checkTime: "",
        checkResult: null,
        resultText: ""
      };
    }
  }
};
</script>
<style lang="less">
/* 全局样式 */
.followEditItemModule {
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
.followEditItemModule {
  .title {
    height: 28px;
    padding: 0 30px;
    line-height: 28px;
    background-color: #f4f6f8;
    .name {
      color: #0083ff;
      font-size: 14px;
    }
    .fold,
    .el-icon-delete {
      float: right;
      margin: 5px 5px;
    }
  }
  .content {
    padding: 0px 40px;
    .marginLeft20 {
      margin-left: 20px;
    }
  }
  .borderBottom {
    border-bottom: 1px solid #e1e4e7;
  }
}
</style>
