<template>
  <div class="login">
    <div class="content">
      <p class="title"><span>抗NMDAR脑炎数据库</span></p>
      <p class="input">
        <i class="icon userIcon"></i>
        <input
          class="name"
          v-model="loginInfo.name"
          placeholder="请输入用户名"
        />
      </p>
      <p class="input margin-bottom-10">
        <i class="icon passwordIcon"></i>
        <input
          class="password"
          v-model="loginInfo.password"
          type="password"
          placeholder="请输入密码"
          @keyup.enter="login"
        />
      </p>
      <p class="input">
        <el-button type="primary" class="btnLogin" @click="login"
          >登&emsp;录</el-button
        >
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  MU_SET_LOGGED,
  AC_SYS_MENU,
  AC_SYS_DIC_DATA
} from "@/common/business/constants";
export default {
  data() {
    return {
      loginInfo: {
        name: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      if (!this.loginInfo.name || !this.loginInfo.password) {
        this.$message({
          message: "请输入用户名/密码",
          type: "error"
        });
        return false;
      }
      var request = {
        account: this.loginInfo.name,
        password: this.loginInfo.password
      };
      this.$http("systemAPI", "login", request).then(data => {
        if (data.status !== "success") {
          this.$message({
            message: data.status,
            type: "error"
          });
          return false;
        } else {
          // 登录成功
          this.$router.push({ path: "/home" });
          // 设置已登录状态
          this.$store.commit(MU_SET_LOGGED, true);
          this.getMenu();
          this.getDicInfo();
        }
      });
    },
    ...mapActions({
      getMenu: AC_SYS_MENU,
      getDicInfo: AC_SYS_DIC_DATA
    })
  }
};
</script>

<style lang="less" scoped>
/* 本地样式 */
.login {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url("../assets/img/bg.png") no-repeat center;
  background-size: cover;
  .content {
    width: 380px;
    height: 390px;
    margin-right: 120px;
    background-color: #fff;
    border-radius: 15px;
    .title {
      width: 100%;
      height: 140px;
      line-height: 140px;
      text-align: center;
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(78, 78, 83);
    }
    .input {
      position: relative;
      width: 250px;
      margin: auto;
      .icon {
        position: absolute;
        width: 20px;
        height: 21px;
        margin: 10px;
      }
      .userIcon {
        background: url("../assets/img/user.png") no-repeat;
        background-size: contain;
      }
      .passwordIcon {
        background: url("../assets/img/password.png") no-repeat;
        background-size: contain;
      }
    }
    .name,
    .password {
      width: calc(100% - 40px);
      height: 36px;
      padding-left: 40px;
      margin-bottom: 25px;
      line-height: 36px;
      border: 1px solid rgba(171, 171, 171);
      border-radius: 4px;
    }
    .btnLogin {
      width: 100%;
      height: 36px;
      background: rgba(82, 108, 253, 1);
      box-shadow: 0px 46px 43px 14px rgba(0, 51, 106, 0);
      border-radius: 4px;
      font-weight: bold;
      font-size: 14px;
    }
  }
}
</style>
