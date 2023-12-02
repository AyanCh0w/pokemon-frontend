/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['oaidalleapiprodscus.blob.core.windows.net'],
    },
    env: {
        PUBLIC_URL: '/',
    }
}

module.exports = nextConfig
