/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
console.log("Environment: ", process.env.NODE_ENV);

const nextConfig = {
    output: "export",
    assetPrefix: !isProd ? "/out/" : '',
    basePath: !isProd ? "/out" : '',
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Cross-Origin-Opener-Policy',
                        value: 'same-origin',
                    },
                    {
                        key: 'Cross-Origin-Embedder-Policy',
                        value: 'require-corp',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
