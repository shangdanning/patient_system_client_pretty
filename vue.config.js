const host = "http://172.16.172.11:8080";
module.exports = {
  // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
  devServer: {
    proxy: {
      "/hosp": {
        target: host + "/hosp",
        changeOrigin: true,
        pathRewrite: {
          "^/hosp": ""
        },
        logLevel: "debug"
      }
    }
  }
};
