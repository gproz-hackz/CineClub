/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🛡️ Security: Makes the admin panel only accessible at this specific path prefix
  basePath: process.env.ADMIN_SECRET_ROUTE || '/secret-admin',
}

module.exports = nextConfig
