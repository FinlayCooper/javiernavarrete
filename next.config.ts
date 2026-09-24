import type { NextConfig } from "next";

// Opt-in static export for plain file hosting (e.g. cPanel public_html).
// Run `STATIC_EXPORT=true npm run build` to write static files to out/.
// A normal build is unaffected, so Netlify deploys keep working as before.
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport && {
    output: "export",
    trailingSlash: true,
    images: { unoptimized: true },
  }),
};

export default nextConfig;
