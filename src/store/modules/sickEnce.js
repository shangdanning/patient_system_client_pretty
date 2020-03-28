/**
 * Created by shangdanning on 2019/11/18.
 * 脑炎疾病相关的状态管理
 */
import {
  MU_SICK_USERID,
  MU_ADDPAGE_WHOLESTATUS,
  MU_SICK_EPISODES,
  MU_SICK_BEGINTIMEARRAY
} from "@/common/business/constants";
let state = {
  // 患者userid
  sickUserId: 0,
  sickUserAge: 0,
  sickUser: {},
  sickUserEpisodes: "",
  // 患者的起病日期数组
  sickUserBeginTimeArray: [],
  // 新增患者页面的全局状态 see：查看详情, edit：新增
  // 注：新增患者页面共有两种状态 全局状态和本页状态
  // 全局状态是从导航或者链接[查看详情]导入的(页面内不可修改)
  // 本页状态是页面内部流转的状态（内面内提交或者编辑及取消操作会触发）
  addPageWholeStatus: ""
};
let mutations = {
  [MU_SICK_USERID]: (state, data) => {
    state.sickUserId = data.id;
    state.sickUserAge = data.age;
    state.sickUser = data.user;
  },
  [MU_ADDPAGE_WHOLESTATUS]: (state, data) => {
    state.addPageWholeStatus = data;
  },
  [MU_SICK_EPISODES]: (state, data) => {
    state.sickUserEpisodes = data;
  },
  [MU_SICK_BEGINTIMEARRAY]: (state, data) => {
    state.sickUserBeginTimeArray = data;
  }
};

export default {
  state,
  mutations
};
