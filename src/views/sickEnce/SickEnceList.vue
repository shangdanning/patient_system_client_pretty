<template>
  <div class="SickEnceList">
    <div class="headLine">
      <span>患者列表</span>
    </div>
    <div class="block">
      <div class="topContent">
        <div class="searchBox">
          <div class="searchItem">
            <label>姓名：</label>
            <el-input v-model="searchData.name"></el-input>
          </div>
          <div class="searchItem">
            <label>住院病案号：</label>
            <el-input v-model="searchData.patientNumber"></el-input>
          </div>
          <div class="searchItem">
            <label>门诊病案号：</label>
            <el-input v-model="searchData.registerNumber"></el-input>
          </div>
          <div class="searchItem">
            <label>门诊卡号：</label>
            <el-input v-model="searchData.cardNumber"></el-input>
          </div>
          <div class="searchItem">
            <label>起病年龄：</label>
            <el-input
              v-model="searchData.beginAgeStart"
              type="number"
              placeholder="起始值"
            ></el-input>
            <span class="margin-left-10">至</span>
            <el-input
              class="margin-left-10"
              v-model="searchData.beginAgeEnd"
              type="number"
              placeholder="结束值"
            ></el-input>
          </div>
          <div class="searchItem">
            <label>末次随访年龄：</label>
            <el-input
              v-model="searchData.lastFollowAgeStart"
              type="number"
              placeholder="起始值"
            ></el-input>
            <span class="margin-left-10">至</span>
            <el-input
              class="margin-left-10"
              v-model="searchData.lastFollowAgeEnd"
              type="number"
              placeholder="结束值"
            ></el-input>
          </div>
          <div class="searchItem">
            <label>末次随访病程：</label>
            <el-input
              v-model="searchData.followSinceBeginStart"
              type="number"
              placeholder="起始值(天)"
            ></el-input>
            <span class="margin-left-10">至</span>
            <el-input
              class="margin-left-10"
              v-model="searchData.followSinceBeginEnd"
              type="number"
              placeholder="结束值(天)"
            ></el-input>
          </div>
          <div class="searchItem">
            <label>病脑后继发：</label>
            <el-select v-model="searchData.isIllSecondary" clearable>
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </div>
          <div class="searchItem">
            <label>发作次数：</label>
            <el-input v-model="searchData.episodes" type="number"></el-input>
          </div>
          <div class="searchItem">
            <label>进行二线治疗：</label>
            <el-select v-model="searchData.isSecondTreat" clearable>
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
          </div>
          <div class="searchItem">
            <label>Mog抗体状态：</label>
            <el-select v-model="searchData.mogState" clearable>
              <el-option
                v-for="item in mogState"
                :key="item.id"
                :label="item.dictDataName"
                :value="item.dictDataValue"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="flex-button-box">
          <el-button
            class="flex-button-item"
            type="primary"
            @click="exportExcel(0)"
            >导出</el-button
          >
          <el-button
            class="flex-button-item"
            type="primary"
            @click="exportExcel(1)"
            >导出末次</el-button
          >
          <el-button
            class="flex-button-item"
            type="primary"
            @click="queryList(1)"
            >查询</el-button
          >
        </div>
      </div>
      <div class="content">
        <el-table
          :data="tableData"
          border
          stripe
          header-cell-class-name="tableHeader"
          :row-class-name="tableRowClassName"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="id" label="患者编号" align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" align="center">
          </el-table-column>
          <el-table-column prop="gender" label="性别" align="center">
          </el-table-column>
          <el-table-column
            prop="patientNumber"
            label="住院病案号"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="registerNumber"
            label="门诊病案号"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="cardNumber" label="门诊卡号" align="center">
          </el-table-column>
          <el-table-column prop="birthday" label="出生日期" align="center">
          </el-table-column>
          <el-table-column prop="beginAge" label="起病年龄" align="center">
          </el-table-column>
          <el-table-column prop="phone" label="联系电话" align="center">
          </el-table-column>
          <el-table-column
            prop="homeAddress"
            label="家庭住址"
            width="140"
            align="center"
          >
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button
                @click="handleClick(scope.row)"
                type="text"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-show="totalRow"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="searchData.pageNumber"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="prev, pager, next, sizes,jumper"
          :total="totalRow"
          class="page"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import toolMethods from "@/common/business/toolMethods";
import {
  MU_SICK_USERID,
  MU_ADDPAGE_WHOLESTATUS,
  MU_SICK_EPISODES,
  MU_SICK_BEGINTIMEARRAY
} from "@/common/business/constants";
export default {
  data() {
    return {
      searchData: {
        name: "",
        patientNumber: "",
        registerNumber: "",
        cardNumber: "",
        beginAgeStart: null,
        beginAgeEnd: null,
        lastFollowAgeStart: null,
        lastFollowAgeEnd: null,
        followSinceBeginStart: null,
        followSinceBeginEnd: null,
        isIllSecondary: null,
        episodes: null,
        isSecondTreat: null,
        mogState: "",
        orderMrowTime: 0,
        pageNumber: 1,
        pageSize: 10
      },
      totalRow: 0,
      tableData: [],
      multipleSelection: [] // 多选项
    };
  },
  computed: {
    ...mapState({
      mogState: state => state.system.dicData.mogState
    })
  },
  created() {
    this.$http("sickAPI", "getPatientList").then(data => {
      this.tableData = data.list;
      this.totalRow = data.totalRow;
    });
  },
  methods: {
    tableRowClassName({ rowIndex }) {
      if (rowIndex % 2 === 1) {
        return "even-row";
      } else {
        return "odd-row";
      }
    },
    handleClick(row) {
      // 向vuex中传的对象
      let userStore = {
        id: row.id,
        // age: this.$moment().year() - this.$moment(row.birthday).year() + 1,
        age: toolMethods.computeDetailAge(
          row.birthday,
          this.$moment().format("YYYY-MM-DD")
        ),
        user: row
      };
      // 设置患者userid和年龄
      this.$store.commit(MU_SICK_USERID, userStore);
      this.$store.commit(MU_SICK_EPISODES, row.episodes);
      this.$store.commit(MU_SICK_BEGINTIMEARRAY, row.beginTimeArray);
      // 设置新增患者页面的全局状态
      this.$store.commit(MU_ADDPAGE_WHOLESTATUS, "see");
      this.$router.push({ path: "/sickEnce/SickEnceSee" });
    },
    handleSizeChange(val) {
      this.searchData.pageSize = val;
      this.queryList(1);
    },
    handleCurrentChange(val) {
      this.searchData.pageNumber = val;
      this.queryList();
    },
    queryList(value) {
      if (value) {
        this.searchData.pageNumber = 1;
      }
      this.$http(
        "sickAPI",
        "getPatientList",
        toolMethods.filterGetParams(this.searchData)
      ).then(data => {
        this.tableData = data.list;
        this.totalRow = data.totalRow;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = [];
      val.forEach(item => {
        this.multipleSelection.push(item.id);
      });
      // console.log(this.multipleSelection);
    },
    exportExcel(isLast) {
      if (this.tableData.length === 0) {
        this.$message({
          message: "请先查询出内容再导出",
          type: "warn"
        });
        return false;
      }
      var queryParams = {
        isLast: isLast,
        id: "",
        name: this.searchData.name,
        patientNumber: this.searchData.patientNumber,
        registerNumber: this.searchData.registerNumber,
        cardNumber: this.searchData.cardNumber,
        beginAgeStart: this.searchData.beginAgeStart,
        beginAgeEnd: this.searchData.beginAgeEnd,
        lastFollowAgeStart: this.searchData.lastFollowAgeStart,
        lastFollowAgeEnd: this.searchData.lastFollowAgeEnd,
        followSinceBeginStart: this.searchData.followSinceBeginStart,
        followSinceBeginEnd: this.searchData.followSinceBeginEnd,
        isIllSecondary: this.searchData.isIllSecondary,
        episodes: this.searchData.episodes,
        isSecondTreat: this.searchData.isSecondTreat,
        mogState: this.searchData.mogState,
        orderMrowTime: this.searchData.orderMrowTime
      };
      if (this.multipleSelection.length) {
        queryParams.id = this.multipleSelection.join(",");
      }
      this.$http(
        "sickAPI",
        "exportPatient",
        toolMethods.filterGetParams(queryParams)
      ).then(data => {
        if (data.status === 1) {
          // 导出成功
          window.open(data.linkUrl);
        } else {
          this.$message({
            message: data.reason,
            type: "error"
          });
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less">
/* 全局样式 */
.SickEnceList {
  //element-ui 定制化
  .topContent {
    .el-input__inner {
      min-width: 200px !important;
    }
  }
  .el-table .even-row {
    background: #f8fafb !important;
    td {
      background: #f8fafb !important;
    }
  }
  .el-table .odd-row {
    background: #fff !important;
  }
  .tableHeader {
    background-color: #d4ecff;
    font-weight: bold;
  }
  .page {
    .el-input .el-input__inner {
      width: 90px !important;
      min-width: 30px !important;
    }
    .el-pagination__jump {
      margin-left: 0px !important;
      .el-input {
        .el-input__inner {
          width: 50px !important;
        }
      }
    }
    .btn-prev,
    .btn-next,
    .el-pager .number {
      min-width: 28px !important;
      margin: 0px 4px;
      border: 1px solid #d9d9d9;
      border-radius: 4px;
    }
    .el-pager .number.active {
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
<style lang="less" scoped>
/*  本地样式  */
.SickEnceList {
  .headLine {
    position: fixed;
    top: 60px;
    z-index: 2;
    width: 100%;
    height: 54px;
    padding-left: 35px;
    line-height: 54px;
    background-color: #f5f5f5 !important;
    border-bottom: 1px solid #e1e4e7;
    font-size: 16px;
  }
  .block {
    padding: 20px 30px;
    margin-top: 54px !important;
  }
  .searchBox {
    display: flex;
    flex-wrap: wrap;
    padding-left: 20px;
    .searchItem {
      margin: 0 40px 10px 0;
    }
  }
  .flex-button-box {
    padding-right: 0px !important;
    margin-bottom: 10px;
  }
  .content {
    .page {
      float: right;
      margin-top: 20px;
    }
  }
}
</style>
