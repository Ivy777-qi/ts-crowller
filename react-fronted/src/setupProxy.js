//运行 npm i -S http-proxy-middleware来配置跨域
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: "http://localhost:7001", //配置你要请求的服务器地,参数设置自env.dev文件
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
}