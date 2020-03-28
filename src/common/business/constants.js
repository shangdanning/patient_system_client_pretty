// ======================系统设置相关========================
// mutations name
export const MU_SET_LOGGED = "MU_SET_LOGGED"; // 设置是否登录
export const MU_SYS_MENU = "MU_SYS_MENU"; // 系统菜单
export const MU_SET_ROUTER = "MU_SET_ROUTER"; // 设置路由列表
export const MU_SYS_DIC_DATA = "MU_SYS_DIC_DATA"; // 设置系统字典
export const MU_SYS_DIC_CITYARRAY = "MU_SYS_DIC_CITYARRAY"; // 设置系统的省市县列表
// actions name
export const AC_SYS_MENU = "AC_SYS_MENU"; // 获取系统菜单
export const AC_SYS_DIC_DATA = "AC_SYS_DIC_DATA"; // 获取系统字典
// ======================脑炎疾病相关========================
// mutations name
export const MU_SICK_USERID = "MU_SICK_USERID"; // 患者的userid
export const MU_ADDPAGE_WHOLESTATUS = "MU_ADDPAGE_WHOLESTATUS"; // 新增患者页面的全局状态
export const MU_SICK_EPISODES = "MU_SICK_EPISODES"; // 患者的发作次数
export const MU_SICK_BEGINTIMEARRAY = "MU_SICK_BEGINTIMEARRAY"; // 患者的起病日期数组
// ======================样式相关常量==========================================
export const CSS_ELROW_TYPE = "flex"; // el-row type="flex"
export const CSS_ELCOL_SPAN = 6; // el-col :span="6"
export const CSS_ELCOL_OFFSET = 1; // el-col :offset="1"

//为什么不用var,是不希望在定义之后，被更改。 2020-3-8
