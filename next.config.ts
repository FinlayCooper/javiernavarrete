import type { NextConfig } from "next";

// Opt-in static export for plain file hosting (e.g. cPanel public_html).
// Run `STATIC_EXPORT=true npm run build` to write static files to out/.
// A normal build is unaffected, so Netlify deploys keep working as before.
const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        // Redirects don't run in a static export; on plain file hosting the
        // server's own directory handling serves /losamantes/ instead.
        async redirects() {
          return [
            // The Media tab (later renamed Listen) was cut at the client's
            // request; send old links home.
            { source: "/media", destination: "/", permanent: true },
            { source: "/listen", destination: "/", permanent: true },
            // The old Los Amantes site in public/losamantes/ uses relative
            // links, which only resolve from inside the folder. Sending the
            // bare path to a file URL sidesteps Next stripping the trailing
            // slash.
            { source: "/losamantes", destination: "/losamantes/index.html", permanent: false },
            // It used to live at /opera/, which is now the new opera page;
            // keep old links to its sub-pages working.
            { source: "/opera/:page([^/]+\\.html)", destination: "/losamantes/:page", permanent: true },
          ];
        },
      }),
};

export default nextConfig;
