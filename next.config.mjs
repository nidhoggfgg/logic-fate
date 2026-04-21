import { networkInterfaces } from 'node:os';

const detectedLanOrigins = Object.values(networkInterfaces())
  .flat()
  .filter(Boolean)
  .filter((address) => address.family === 'IPv4' && !address.internal)
  .map((address) => address.address);

const allowedDevOrigins = [
  'localhost',
  '127.0.0.1',
  ...detectedLanOrigins,
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  // Bind address is configured in package.json; this list allows localhost
  // plus the current machine's LAN IPv4 addresses in development.
  allowedDevOrigins,
};

export default nextConfig;
