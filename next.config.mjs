/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode for better development experience
    reactStrictMode: true,

    // Configure image optimization
    images: {
        domains: [], // Add external image domains here if needed
    },

    // Environment variables
    env: {
        SKIP_SELECTION_SCREEN: process.env.NEXT_PUBLIC_SKIP_SELECTION_SCREEN,
    },
}

export default nextConfig
