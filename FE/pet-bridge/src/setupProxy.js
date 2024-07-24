const {createProxyMiddleware} = require("http-proxy-middleware")

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
      logLevel: "debug", // 디버그 정보 출력
    })
  )
}
