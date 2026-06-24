/** @type {import('next').NextConfig} */
import withPWAInit from "@ducanh2912/next-pwa"

const withPWA = withPWAInit({
  basePath: process.env.BASE_PATH,
  dest: "public",
})

export default withPWA({
  basePath: process.env.BASE_PATH,
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
    ]
  },
})
