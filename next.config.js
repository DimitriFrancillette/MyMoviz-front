/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  transpilePackages: ["antd",
    "@ant-design",
    "rc-pagination",
    "rc-picker",
    "rc-util",
    "rc-tree",
    "rc-tooltip"],
};

export default nextConfig;
