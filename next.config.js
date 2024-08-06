/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "apiv3.apifootball.com"
            }
        ]
    },
    output: "standalone"
}