// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // static site generation
  images: { unoptimized: true }, // required for static export
  trailingSlash: true,        // /projects/rcaf/ not /projects/rcaf
  basePath: '',               // empty = root domain (jaskaran-0.github.io)
  // If repo is NOT username.github.io, set:
  // basePath: '/portfolio',
}

module.exports = nextConfig
