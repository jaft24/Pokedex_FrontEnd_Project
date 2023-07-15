/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  image: {
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com",
        protocol: "https"
      }
    ]
  }
}

module.exports = nextConfig

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'projectpokemon.org', 
      },
    ],
  },
}

