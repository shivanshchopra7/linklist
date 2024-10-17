/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: '*.googleusercontent.com',
            },
            {
                hostname: 'linklist-project.s3.eu-north-1.amazonaws.com',
            }
        ]
    }
};

export default nextConfig;
