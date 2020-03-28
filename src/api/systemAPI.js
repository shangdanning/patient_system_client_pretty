/**
 * Created by shangdanning on 2019/11/09.
 * 推荐使用restful风格
 * 系统相关接口
 * Editd by shangdanning on 2019/12/08.
 * 注意！！！此js专为开发阶段-本地mock测试使用
 * 因get请求时可能带动态参数，不方便使用mock进行模拟，所以对于此种情况mock测试时改用post方式
 */
export const systemAPI = {
  systemMenu: {
    url: "/hosp/systemMenu",
    method: "get",
    mock: 1
  },
  getDic: {
    url: "/hosp/dictionary",
    method: "get",
    mock: 1
  },
  // 用户登录接口
  login: {
    url: "/hosp/user/login",
    method: "post",
    mock: 1
  },
  // 用户登录接口
  getCity: {
    url: "/hosp/areas",
    method: "get",
    mock: 1
  }
};
