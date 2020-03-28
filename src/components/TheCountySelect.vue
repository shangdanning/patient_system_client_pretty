<template>
  <div class="countySelect">
    <el-select
      v-model="cityData.provinceCode"
      clearable
      :disabled="isUse"
      @change="provinceChangeEvent"
      class="select"
    >
      <el-option
        v-for="item in provinceArray"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option> </el-select
    ><span class="text">省</span>
    <el-select
      v-model="cityData.cityCode"
      clearable
      :disabled="isUse"
      @change="cityChangeEvent"
      class="select"
    >
      <el-option
        v-for="item in city"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option> </el-select
    ><span class="text">市</span>
    <el-select
      v-model="cityData.countyCode"
      clearable
      :disabled="isUse"
      class="select"
    >
      <el-option
        v-for="item in county"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      ></el-option> </el-select
    ><span class="text">区/县</span>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    provinceCode: {
      default: function() {
        return "";
      }
    },
    cityCode: {
      default: function() {
        return "";
      }
    },
    countyCode: {
      default: function() {
        return "";
      }
    },
    isUse: {
      default: function() {
        return false;
      }
    }
  },
  data() {
    return {
      cityData: {
        provinceCode: "",
        cityCode: "",
        countyCode: ""
      },
      province: [],
      city: [],
      county: []
    };
  },
  computed: {
    ...mapState({
      provinceArray: state => state.system.provinceArray,
      cityArray: state => state.system.cityArray,
      countyArray: state => state.system.countyArray
    })
  },
  watch: {
    isUse: function(e) {
      if (e) {
        // 如果不可用时，将数据置空
        this.cityData.provinceCode = "";
        this.cityData.cityCode = "";
        this.cityData.countyCode = "";
      }
    }
  },
  methods: {
    provinceChangeEvent(provinceCode) {
      this.county = [];
      this.cityData.countyCode = "";
      this.cityData.cityCode = "";
      if (!provinceCode) {
        this.city = [];
        this.cityData.cityCode = "";
      } else {
        this.city = this.cityArray[provinceCode];
      }
    },
    cityChangeEvent(cityCode) {
      this.cityData.countyCode = "";
      if (!cityCode) {
        this.county = [];
        this.cityData.countyCode = "";
      } else {
        this.county = this.countyArray[this.cityData.provinceCode][cityCode];
      }
    },
    reset() {
      this.cityData.provinceCode = this.cityData.cityCode = this.cityData.countyCode =
        "";
      this.city = [];
      this.county = [];
    }
  },
  created() {
    this.cityData.provinceCode = this.provinceCode;
    this.provinceCode && this.provinceChangeEvent(this.provinceCode);
    this.cityData.cityCode = this.cityCode;
    this.cityCode && this.cityChangeEvent(this.cityCode);
    this.cityData.countyCode = this.countyCode;
  }
};
</script>
<style lang="less">
.countySelect {
  .el-input .el-input__inner {
    width: 120px;
    min-width: 120px;
  }
}
</style>
<style lang="less" scoped>
.countySelect {
  .text {
    margin: 0 10px;
  }
}
</style>
