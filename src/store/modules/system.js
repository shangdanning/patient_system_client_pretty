/**
 * Created by shangdanning on 2019/11/09.
 * 系统相关的状态管理
 */
import {
  MU_SET_LOGGED,
  MU_SYS_MENU,
  AC_SYS_MENU,
  MU_SYS_DIC_DATA,
  AC_SYS_DIC_DATA,
  MU_SET_ROUTER,
  MU_SYS_DIC_CITYARRAY
} from "@/common/business/constants";
import { service } from "@/api/globalAccess";
import router from "@/router";
let state = {
  // 系统是否已登录
  isLogged: false,
  // 系统菜单
  sysMenu: [],
  routerList: [],
  dicData: {},
  // 省市县数组
  provinceObj: {},
  provinceArray: [],
  cityArray: {},
  countyArray: {}
};
let mutations = {
  [MU_SET_LOGGED]: (state, data) => {
    state.isLogged = data;
  },
  [MU_SYS_MENU]: (state, data) => {
    state.sysMenu = data;
  },
  [MU_SET_ROUTER]: (state, data) => {
    state.routerList = data;
  },
  [MU_SYS_DIC_DATA]: (state, data) => {
    state.dicData = data;
  },
  [MU_SYS_DIC_CITYARRAY]: (state, data) => {
    // 设置县-对象形式
    let provinceObj = {};
    data.forEach(item => {
      provinceObj[item.id] = item.name;
    });
    state.provinceObj = provinceObj;
    // 设置省
    let provinceArray = [];
    provinceArray = data.map(item => {
      return {
        id: item.id,
        name: item.name
      };
    });
    state.provinceArray = provinceArray;
    // 设置市
    let cityArray = {};
    data.forEach(item => {
      let child = item.child.map(itemC => {
        return {
          id: itemC.id,
          name: itemC.name
        };
      });
      cityArray[item.id] = child;
    });
    state.cityArray = cityArray;
    // 设置县
    var countyArray = {};
    var tempCountyObj = {};
    data.forEach(item => {
      tempCountyObj = {};
      item.child.forEach(itemC => {
        tempCountyObj[itemC.id] = itemC.child;
      });
      countyArray[item.id] = tempCountyObj;
    });
    state.countyArray = countyArray;
  }
};
var menu = [
  {
    name: "患者登记",
    id: "sickEnce",
    icon: "",
    // icon: "th-large",
    sub: [
      {
        name: "患者列表",
        componentName: "/sickEnce/SickEnceList",
        selected: false
      },
      {
        name: "新增患者",
        componentName: "/sickEnce/SickEnceAdd",
        selected: false
      }
      // ,{
      //   name: "病情统计",
      //   componentName: "/sickEnce/SickEnceStatic"
      // }
    ]
  }
  // ,{
  //   name: "系统配置",
  //   id: "system",
  //   icon: "cog",
  //   sub: [
  //     {
  //       name: "系统字典",
  //       componentName: "/system/SystemDic"
  //     }
  //   ]
  // }
];
let actions = {
  // 获取系统菜单
  [AC_SYS_MENU]({ commit }) {
    //   const data = await service("systemAPI", "systemMenu");
    //  let routerList = methods.addRoutes(data.list);
    //   commit(MU_SYS_MENU, data.list);
    //   commit(MU_SET_ROUTER, routerList);

    let routerList = methods.addRoutes(menu);
    // todo 路由和菜单是不同的，可以用单独属性来标识
    commit(MU_SYS_MENU, menu);
    commit(MU_SET_ROUTER, routerList);
  },
  // 获取系统字典
  async [AC_SYS_DIC_DATA]({ commit }) {
    // let dictCodeArray = [
    //   "gender",
    //   "mogState",
    //   "beginIllType",
    //   "prodromicSymptomCode",
    //   "allSymptomCode",
    //   "centralHypoventilationType",
    //   "nmdaPositive",
    //   "chartAbnormal",
    //   "mogPositive",
    //   "overSymptom",
    //   "grug"
    // ];
    // 获取系统字典
    var data = await service("systemAPI", "getDic");
    let handleData = {};
    if (typeof data === "string") {
      data = JSON.parse(data);
    }
    data.forEach(item => {
      handleData[item.dictCode] = item.list;
    });
    // 处理基本信息-药物基因数组
    methods.handleDrugGene(handleData);
    commit(MU_SYS_DIC_DATA, handleData);
    // 获取省市县数组
    const cityArray = await service("systemAPI", "getCity");
    commit(MU_SYS_DIC_CITYARRAY, cityArray);
  }
};
var methods = {
  addRoutes(menu) {
    var routerList = [];
    menu.forEach(item => {
      item.sub.forEach(sub => {
        routerList.push({
          path: `${sub.componentName}`,
          name: sub.componentName.substring(
            sub.componentName.lastIndexOf("/") + 1
          ),
          component: () => import(`@/views${sub.componentName}`)
        });
      });
    });
    routerList.push({
      path: "*",
      name: "NotFound",
      component: () => import("@/views/system/NotFound")
    });
    router.addRoutes(routerList);
    return routerList;
  },
  handleDrugGene(data) {
    var geneArray = [
      "mycophenolate",
      "azathioprine",
      "tacrolimus",
      "encirclingA",
      "cyclophosphamide",
      "hormone"
    ];
    var newValue = [];
    var newValueChild = {};
    geneArray.forEach(name => {
      // 遍历名称组
      newValue = [];
      data[name + "Type"].forEach(item => {
        // 遍历mycophenolate 类型
        newValueChild = {
          value: item.dictDataValue,
          label: item.dictDataName,
          children: []
        };
        data[name + "Type" + item.dictDataValue].forEach(itemChild => {
          // 遍历mycophenolate 类型的子类型
          newValueChild.children.push({
            value: itemChild.dictDataValue,
            label: itemChild.dictDataName
          });
        });
        newValue.push(newValueChild);
      });
      data[name + "Options"] = newValue;
    });
  }
};

export default {
  state,
  actions,
  mutations
};
