const nextConfig = {
  reactStrictMode: true,
    async redirects() {
      return [
        {
          source: '/category/:category', //(^\\((?!^favicon.ico$).)*$)
          destination: '/category/:category/page/1',
          permanent: true,
        },
        {
          source: '/tag/:tag',
          destination: '/tag/:tag/page/1',
          permanent: true,
        },
      ]
    },
}

module.exports = nextConfig
