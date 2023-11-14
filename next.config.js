/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
  },
}

const isGithubActions = process.env.GITHUB_ACTIONS || false

if (isGithubActions) {
  nextConfig.output = "export"
}

module.exports = nextConfig
