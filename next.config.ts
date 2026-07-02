import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 允许手机端通过局域网 IP 调试（HMR/websocket 默认禁止跨域）
  // IP 变了就加新的进来；生产环境用域名不受影响
  allowedDevOrigins: ["192.168.0.107"],
};

export default nextConfig;
