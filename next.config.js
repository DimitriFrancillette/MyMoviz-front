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
    "rc-tooltip",
    "@rc-component",
    "styled-js",
    "rc-resize-observer",
  ],
};

export default nextConfig;
