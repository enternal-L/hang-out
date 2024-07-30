/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['i.imgur.com'],
    },
    webpack(config) {
      config.experiments = {
        ...config.experiments,
        topLevelAwait: true,
      }
      return config
    }
}
  
module.exports = nextConfig
