/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // 👈 Mandatory for GitHub Pages
  images: {
    unoptimized: true, // 👈 Image optimization requires a Node server, so we disable it
  },
  // If your repo is at github.com/username/repo-name, you might need a basePath:
  // basePath: '/repo-name', 
};

module.exports = nextConfig;
