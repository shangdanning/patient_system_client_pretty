<template>
  <div class="basicInfo">
    <template
      v-if="
        (userId && wholeStatus === 'see' && pageStatus === '') ||
          (userId && pageStatus === 'see')
      "
    >
      <!-- 患者详情 -->
      <ul class="seeContent">
        <li>
          <el-row :type="rowType">
            <el-col :span="colSpan">
              姓名：<span>{{ seePatient.name }}</span>
            </el-col>
            <el-col :span="colSpan" :offset="colOffset">
              性别：<span>{{ seePatient.gender === 1 ? "男" : "女" }}</span>
            </el-col>
            <el-col :span="colSpan" :offset="colOffset">
              住院病案号：<span>{{ seePatient.patientNumber }}</span>
            </el-col>
          </el-row>
        </li>
        <li>
          <el-row :type="rowType">
            <el-col :span="colSpan">
              门诊病案号：<span>{{ seePatient.registerNumber }}</span>
            </el-col>
            <el-col :span="colSpan" :offset="colOffset">
              门诊卡号：<span>{{ seePatient.cardNumber }}</span>
            </el-col>
            <el-col :span="colSpan" :offset="colOffset">
              身份证号：<span>{{ seePatient.idCard }}</span>
            </el-col>
          </el-row>
        </li>
        <li>
          <el-row :type="rowType">
            <el-col :span="colSpan">
              出生日期：<span>{{ seePatient.birthday }}</span>
            </el-col>
            <el-col :span="colSpan" :offset="colOffset">
              首发日期：<span>{{ seePatient.beginTime }}</span>
            </el-col>
            <el-col :span="colSpan" :offset="colOffset">
              首发年龄：<span>{{ seePatient.beginAge }}</span>
            </el-col>
          </el-row>
        </li>

        <li>
          联系方式：<span>{{ seePatient.phone }}</span>
        </li>
        <li>
          外籍：<span>{{ seePatient.isForeign === 1 ? "是" : "否" }}</span>
        </li>
        <li>
          所在地区：<span>{{ showAreaName }}</span>
        </li>
        <li>
          详细地址：
          <div class="seeTextarea">{{ seePatient.homeAddress }}</div>
        </li>
        <li>
          病脑后继发：<span>{{
            seePatient.isIllSecondary === 1 ? "是" : "否"
          }}</span>
        </li>
        <li class="notHeight">
          药物基因
          <ul class="drugGene">
            <li>
              <el-row :type="rowType">
                <el-col :span="colSpan">
                  麦考酚酯：<span>{{ showMycophenolateName }}</span>
                </el-col>
                <el-col :span="colSpan" :offset="colOffset">
                  硫唑嘌呤：<span>{{ showAzathioprineName }}</span>
                </el-col>
                <el-col :span="colSpan" :offset="colOffset">
                  他克莫司：<span>{{ showTacrolimusName }}</span>
                </el-col>
              </el-row>
            </li>
            <li>
              <el-row :type="rowType">
                <el-col :span="colSpan">
                  环抱A：<span>{{ showEncirclingAName }}</span>
                </el-col>
                <el-col :span="colSpan" :offset="colOffset">
                  环磷酰胺：<span>{{ showCyclophosphamideName }}</span>
                </el-col>
                <el-col :span="colSpan" :offset="colOffset">
                  激素：<span>{{ showHormoneName }}</span>
                </el-col>
              </el-row>
            </li>
          </ul>
        </li>

        <!-- <li>发作详情：<div class="seeTextarea">{{seePatient.illSecondaryText}}</div> -->
        <!-- </li> -->
      </ul>
      <div class="flex-button-box">
        <el-button type="primary" @click="editForm()" class="flex-button-item"
          >编辑</el-button
        >
      </div>
    </template>
    <template v-else>
      <!-- 新增患者基本信息 -->
      <el-form
        :model="patient"
        :rules="rules"
        ref="patient"
        label-width="110px"
        class="formStyle"
      >
        <el-row :type="rowType">
          <el-col :span="colSpan">
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="patient.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="colSpan" :offset="colOffset">
            <el-form-item label="性别：" prop="gender">
              <el-select v-model="patient.gender" placeholder="请选择性别">
                <el-option label="男" :value="1"></el-option>
                <el-option label="女" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="colSpan" :offset="colOffset">
            <el-form-item label="住院病案号：">
              <el-input v-model="patient.patientNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :type="rowType">
          <el-col :span="colSpan">
            <el-form-item label="门诊病案号：">
              <el-input v-model="patient.registerNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="colSpan" :offset="colOffset">
            <el-form-item label="门诊卡号：" prop="cardNumber">
              <el-input v-model="patient.cardNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="colSpan" :offset="colOffset">
            <el-form-item label="身份证号：">
              <el-input v-model="patient.idCard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :type="rowType">
          <el-col :span="colSpan">
            <el-form-item label="出生日期：" prop="birthday">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                v-model="patient.birthday"
                @change="timeChangeEvent('birth')"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="colSpan" :offset="colOffset">
            <el-form-item label="首发日期：" prop="beginTime">
              <el-date-picker
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                v-model="patient.beginTime"
                @change="timeChangeEvent('begin')"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="colSpan" :offset="colOffset">
            <el-form-item label="首发年龄：" prop="beginAge">
              <el-input disabled v-model="patient.beginAge"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="联系方式：" prop="phone">
          <el-input v-model="patient.phone"></el-input>
          <el-input class="margin-left-10" v-model="phone.phone2"></el-input>
          <el-input class="margin-left-10" v-model="phone.phone3"></el-input>
        </el-form-item>
        <el-form-item label="外籍：" prop="isForeign">
          <el-radio-group v-model="patient.isForeign">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="所在地区：">
          <TheCountySelect
            ref="countySelect"
            :isUse="!!patient.isForeign"
            :provinceCode="patient.provinceCode"
            :cityCode="patient.cityCode"
            :countyCode="patient.countyCode"
          />
        </el-form-item>

        <el-form-item label="详细地址：" prop="homeAddress">
          <el-input type="textarea" v-model="patient.homeAddress"></el-input>
        </el-form-item>

        <el-form-item label="病脑后继发：" prop="isIllSecondary">
          <el-radio-group v-model="patient.isIllSecondary">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="药物基因"> </el-form-item>
        <div class="drugGene">
          <el-row :type="rowType">
            <el-col :span="colSpan">
              <el-form-item label="麦考酚酯：">
                <el-cascader
                  v-model="patient.mycophenolate"
                  clearable
                  :options="mycophenolateOptions"
                  :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="colSpan" :offset="colOffset">
              <el-form-item label="硫唑嘌呤：">
                <el-cascader
                  v-model="patient.azathioprine"
                  clearable
                  :options="azathioprineOptions"
                  :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="colSpan" :offset="colOffset">
              <el-form-item label="他克莫司：">
                <el-cascader
                  v-model="patient.tacrolimus"
                  clearable
                  :options="tacrolimusOptions"
                  :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :type="rowType">
            <el-col :span="colSpan">
              <el-form-item label="环抱A：">
                <el-cascader
                  v-model="patient.encirclingA"
                  clearable
                  :options="encirclingAOptions"
                  :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="colSpan" :offset="colOffset">
              <el-form-item label="环磷酰胺：">
                <el-cascader
                  v-model="patient.cyclophosphamide"
                  clearable
                  :options="cyclophosphamideOptions"
                  :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="colSpan" :offset="colOffset">
              <el-form-item label="激素：">
                <el-cascader
                  v-model="patient.hormone"
                  clearable
                  :options="hormoneOptions"
                  :props="{ expandTrigger: 'hover' }"
                ></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- <el-form-item label="发作详情："
                      prop="illSecondaryText">
          <el-input type="textarea"
                    v-model="patient.illSecondaryText"></el-input>
        </el-form-item> -->
        <el-form-item>
          <div class="flex-button-box">
            <el-button
              class="flex-button-item"
              type="primary"
              @click="submitForm('patient')"
              >提交</el-button
            >
            <el-button class="flex-button-item" @click="resetForm('patient')">{{
              pageStatus === "edit" ? "取消" : "重置"
            }}</el-button>
          </div>
        </el-form-item>
      </el-form>
    </template>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  CSS_ELROW_TYPE,
  CSS_ELCOL_SPAN,
  CSS_ELCOL_OFFSET,
  MU_SICK_USERID,
  MU_SICK_EPISODES,
  MU_SICK_BEGINTIMEARRAY
} from "@/common/business/constants";
import TheCountySelect from "@/components/TheCountySelect";
import toolMethods from "@/common/business/toolMethods";
export default {
  components: {
    TheCountySelect
  },
  data() {
    return {
      // see 查看  edit 编辑
      pageStatus: "",
      phoneArray: ["", "", ""],
      phone: {
        phone2: "",
        phone3: ""
      },
      seePatient: {},
      patient: {
        id: "",
        name: "",
        gender: 1,
        patientNumber: "",
        registerNumber: "",
        cardNumber: "",
        idCard: "",
        birthday: "",
        beginTime: "",
        beginAge: "",
        phone: "",
        isForeign: 0,
        provinceCode: "",
        cityCode: "",
        countyCode: "",
        homeAddress: "",
        isIllSecondary: 1,
        illSecondaryText: "",
        hormone: "",
        mycophenolate: "",
        azathioprine: "",
        tacrolimus: "",
        encirclingA: "",
        cyclophosphamide: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        // patientNumber: [
        //   { required: true, message: "请输入住院病案号", trigger: "change" }
        // ],
        // registerNumber: [
        //   { required: true, message: "请输入门诊病案号", trigger: "change" }
        // ],
        birthday: [
          {
            // type: "date",
            required: true,
            message: "请选择出生日期",
            trigger: "change"
          }
        ],
        beginTime: [
          {
            // type: "date",
            required: true,
            message: "请选择出生日期",
            trigger: "change"
          }
        ],
        phone: [{ required: true, message: "请填写联系方式", trigger: "blur" }],
        isIllSecondary: [
          { required: true, message: "请选择是否病脑后继发", trigger: "change" }
        ]
      },
      showAreaName: "",
      showHormoneName: "",
      showMycophenolateName: "",
      showAzathioprineName: "",
      showTacrolimusName: "",
      showEncirclingAName: "",
      showCyclophosphamideName: "",
      geneTypeArray: [
        "hormone",
        "mycophenolate",
        "azathioprine",
        "tacrolimus",
        "encirclingA",
        "cyclophosphamide"
      ],
      rowType: CSS_ELROW_TYPE,
      colSpan: CSS_ELCOL_SPAN,
      colOffset: CSS_ELCOL_OFFSET
    };
  },
  computed: {
    ...mapState({
      userId: state => state.sickEnce.sickUserId,
      wholeStatus: state => state.sickEnce.addPageWholeStatus,
      provinceObj: state => state.system.provinceObj,
      cityArray: state => state.system.cityArray,
      countyArray: state => state.system.countyArray,
      mycophenolateOptions: state => state.system.dicData.mycophenolateOptions,
      azathioprineOptions: state => state.system.dicData.azathioprineOptions,
      tacrolimusOptions: state => state.system.dicData.tacrolimusOptions,
      encirclingAOptions: state => state.system.dicData.encirclingAOptions,
      cyclophosphamideOptions: state =>
        state.system.dicData.cyclophosphamideOptions,
      hormoneOptions: state => state.system.dicData.hormoneOptions
    })
  },
  created() {
    // 当是查看详情状态时,获取数据
    if (this.wholeStatus === "see") {
      this.$http("sickAPI", "getPatient", null, this.userId).then(data => {
        this.seePatient = data;
        this.seePatient.id = this.userId;
        this.setAreaNameShow(this.seePatient);
        this.setDrugGeneShow(this.seePatient);
      });
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 处理手机号
          this.phone.phone2 && (this.patient.phone += "," + this.phone.phone2);
          this.phone.phone3 && (this.patient.phone += "," + this.phone.phone3);
          // 处理省市县
          this.patient.provinceCode = this.$refs.countySelect.cityData.provinceCode;
          this.patient.cityCode = this.$refs.countySelect.cityData.cityCode;
          this.patient.countyCode = this.$refs.countySelect.cityData.countyCode;
          // 处理药物基因
          this.geneTypeArray.forEach(item => {
            this.patient[item] &&
              (this.patient[item] = this.patient[item].join("-"));
          });
          this.addPatient();
        } else {
          // console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      // 当编辑情况下是取消按钮，其他情况下是重置按钮
      if (this.pageStatus === "") {
        this.$refs[formName].resetFields();
        this.patient.provinceCode = this.patient.cityCode = this.patient.countyCode =
          "";
        this.patient.hormone = "";
        this.patient.mycophenolate = "";
        this.patient.azathioprine = "";
        this.patient.tacrolimus = "";
        this.patient.encirclingA = "";
        this.patient.cyclophosphamide = "";
        this.$refs.countySelect.reset();
      } else if (this.pageStatus === "edit") {
        this.pageStatus = "see";
      }
    },
    addPatient() {
      this.$http("sickAPI", "addPatient", this.patient).then(data => {
        if (data.status !== 1) {
          this.$message({
            message: data.reason,
            type: "error"
          });
          return false;
        } else {
          // 向vuex中传的对象
          let userStore = {
            id: data.detail.id,
            // age:
            //   this.$moment().year() -
            //   this.$moment(data.detail.birthday).year() +
            //   1,
            age: toolMethods.computeDetailAge(
              data.detail.birthday,
              this.$moment().format("YYYY-MM-DD")
            ),
            user: data.detail
          };
          // 设置患者userid和年龄
          this.$store.commit(MU_SICK_USERID, userStore);
          this.$store.commit(MU_SICK_EPISODES, data.detail.episodes);
          this.$store.commit(MU_SICK_BEGINTIMEARRAY, [data.detail.beginTime]);
          this.seePatient = data.detail;
          this.pageStatus = "see";
          this.setAreaNameShow(this.seePatient);
          this.setDrugGeneShow(this.seePatient);
          this.$message({
            message: data.reason,
            type: "success"
          });
        }
      });
    },
    editForm() {
      this.pageStatus = "edit";
      this.patient = JSON.parse(JSON.stringify(this.seePatient));
      // 处理电话号码
      let phoneArray = this.patient.phone ? this.patient.phone.split(",") : [];
      phoneArray.length && (this.patient.phone = phoneArray[0]);
      phoneArray.length > 1 && (this.phone.phone2 = phoneArray[1]);
      phoneArray.length > 2 && (this.phone.phone3 = phoneArray[2]);
      // 处理药物基因
      this.geneTypeArray.forEach(item => {
        this.patient[item] &&
          (this.patient[item] = this.patient[item].split("-"));
      });
    },
    setAreaNameShow(obj) {
      if (!obj.provinceCode) {
        this.showAreaName = "";
      } else {
        this.showAreaName = this.provinceObj[obj.provinceCode];
        if (obj.cityCode) {
          this.cityArray[obj.provinceCode].forEach(item => {
            if (item.id === obj.cityCode) {
              this.showAreaName += "-" + item.name;
            }
          });
          if (obj.countyCode) {
            let temp = this.countyArray[obj.provinceCode];
            temp[obj.cityCode].forEach(item => {
              if (item.id === obj.countyCode) {
                this.showAreaName += "-" + item.name;
              }
            });
          }
        }
      }
    },
    // 设置药物基因的展示
    setDrugGeneShow(obj) {
      var nameArray = [
        "showHormoneName",
        "showMycophenolateName",
        "showAzathioprineName",
        "showTacrolimusName",
        "showEncirclingAName",
        "showCyclophosphamideName"
      ];
      this.geneTypeArray.forEach((item, index) => {
        if (obj[item].length) {
          this.commonSetDrugGeneShow(item, obj[item], nameArray[index]);
        } else {
          this[nameArray[index]] = "";
        }
      });
    },
    // hormone | [1,2] | showHormoneName
    commonSetDrugGeneShow(type, value, name) {
      this[name] =
        toolMethods.reDicValue(value.split("-")[0], type + "Type") +
        "/" +
        toolMethods.reDicValue(
          value.split("-")[1],
          type + "Type" + value.split("-")[0]
        );
    },
    // 出生日期和首发日期切换时触发的事件
    timeChangeEvent(type) {
      if (!this.patient.birthday || !this.patient.beginTime) {
        this.patient.beginAge = "";
        return false;
      }
      if (
        this.$moment(this.patient.beginTime).isBefore(
          this.patient.birthday,
          "day"
        )
      ) {
        this.patient.beginAge = "";
        if (type === "birth") {
          this.$message({
            message: "温馨提示：出生日期应比首发日期小",
            type: "warn"
          });
          return false;
        } else if (type === "begin") {
          this.$message({
            message: "温馨提示：首发日期应比出生日期大",
            type: "warn"
          });
          return false;
        }
      }
      this.patient.beginAge = toolMethods.computeDetailAge(
        this.patient.birthday,
        this.patient.beginTime
      );
    }
  }
};
</script>
<style lang="less">
/* 全局样式 */
.basicInfo {
  .el-textarea__inner {
    width: 665px;
  }
}
</style>
<style lang="less" scoped>
/* 本地样式 */
.basicInfo {
  padding: 15px;
  .formStyle {
    margin: 30px;
    .drugGene {
      position: relative;
      top: -20px;
      left: 40px;
    }
  }

  .seeTextarea {
    width: 665px;
  }
  .seeContent {
    margin: 30px 40px;
    li {
      height: 32px;
      margin-bottom: 20px;
      line-height: 32px;
      span,
      .seeTextarea {
        margin-left: 20px;
      }
      .seeTextarea {
        display: inline-block;
      }
    }
    .notHeight {
      height: auto !important;
      .drugGene {
        position: relative;
        top: 0px;
        left: 40px;
        li {
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
