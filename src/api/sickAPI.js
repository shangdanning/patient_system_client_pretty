/**
 * Created by shangdanning on 2019/11/06.
 * 推荐使用restful风格
 * 疾病相关接口
 * Editd by shangdanning on 2019/12/08.
 * 注意！！！此js专为开发阶段-本地mock测试使用
 * 因get请求时可能带动态参数，不方便使用mock进行模拟，所以对于此种情况mock测试时改用post方式
 */

/**
 *urlParams :url上是否有参数
 *mock：是否使用Mock请求数据
 */
export const sickAPI = {
  /** api 案例
  baseInfo: {
    url: "/ftfj/intelligence/baseInfo",
    method: "post",
    mock: 1
  },
  importData: {
    url: "/ftfj/intelligence/importData",
    method: "post",
    timeout: 15000,
    headers: {
      "Content-type": "multipart/form-data"
    }
  },
  **/
  // 查询患者列表
  getPatientList: {
    url: "/hosp/patient",
    method: "get",
    mock: 1
  },
  // 添加患者基本信息
  addPatient: {
    url: "/hosp/patient",
    method: "post",
    mock: 1
  },
  // 查询患者基本信息
  getPatient: {
    // 真正的请求url
    // url: "/hosp/patient/*",
    // 本地Mock测试使用的url,patient1为了和查询 患者列表区分开
    url: "/hosp/patient1",
    method: "get",
    mock: 1,
    urlParams: 1
  },
  // 添加患者临床症状
  addClinical: {
    // 真正的请求url
    // url: "/hosp/patient/*/symptom",
    // 本地Mock测试使用的url
    url: "/hosp/patient/symptom",
    method: "post",
    mock: 1,
    urlParams: 1
  },
  // 查询患者临床症状
  getClinical: {
    // 真正的请求url
    // url: "/hosp/patient/*/symptom",
    // 本地Mock测试使用的url
    url: "/hosp/patient/symptom",
    method: "get",
    mock: 1,
    urlParams: 1
  },
  // 添加患者治疗记录
  addTreatment: {
    // 真正的请求url
    // url: "/hosp/patient/*/treatment",
    // 本地Mock测试使用的url
    url: "/hosp/patient/treatment",
    method: "post",
    mock: 1,
    urlParams: 1
  },
  // 查询患者治疗记录
  getTreatment: {
    // 真正的请求url
    // url: "/hosp/patient/*/treatment",
    // 本地Mock测试使用的url
    url: "/hosp/patient/treatment",
    method: "get",
    mock: 1,
    urlParams: 1
  },
  // 添加患者辅助检查
  addInspect: {
    // 真正的请求url
    // url: "/hosp/patient/*/examine",
    // 本地Mock测试使用的url
    url: "/hosp/patient/examine",
    method: "post",
    mock: 1,
    urlParams: 1
  },
  // 查询患者辅助检查
  getInspect: {
    // 真正的请求url
    // url: "/hosp/patient/*/examine",
    // 本地Mock测试使用的url
    url: "/hosp/patient/examine",
    method: "get",
    mock: 1,
    urlParams: 1
  },
  // 添加患者随访记录
  addFollow: {
    // 真正的请求url
    // url: "/hosp/patient/*/follow",
    // 本地Mock测试使用的url
    url: "/hosp/patient/follow",
    method: "post",
    mock: 1,
    urlParams: 1
  },
  // 查询患者随访记录
  getFollow: {
    // 真正的请求url
    // url: "/hosp/patient/*/follow",
    // 本地Mock测试使用的url
    url: "/hosp/patient/follow",
    method: "get",
    mock: 1,
    urlParams: 1
  },
  // 患者信息导出
  exportPatient: {
    // 真正的请求url
    // url: "/hosp/patient/*/follow",
    // 本地Mock测试使用的url
    url: "/hosp/exportPatient",
    method: "get",
    mock: 1,
    urlParams: 1
  }
};
