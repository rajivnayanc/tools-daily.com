/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
console.log("Environment: ", process.env.NODE_ENV);

const nextConfig = {
    output: "export",
    assetPrefix: !isProd ? "/out/" : '',
    basePath: !isProd ? "/out" : '',
};

export default nextConfig;
