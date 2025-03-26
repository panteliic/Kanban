import type { NextConfig } from "next";
const withPWA = require("next-pwa")({
  dest: "public",
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === "development",

});
const nextConfig: NextConfig = {
  devIndicators:false,
};

export default withPWA(nextConfig);
