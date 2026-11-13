import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The printed QR code points at /qr. Keep this redirect forever and only
  // change its destination (or replace public/menu.pdf) when the menu changes,
  // so the printed codes never need reprinting.
  async redirects() {
    return [
      { source: "/qr", destination: "/menu.pdf", permanent: false },
    ];
  },
};

export default nextConfig;
