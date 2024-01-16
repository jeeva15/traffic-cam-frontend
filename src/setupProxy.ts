const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app: any) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:3001", // Your backend server URL
      changeOrigin: true,
    })
  );
};
