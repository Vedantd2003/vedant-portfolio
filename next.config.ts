import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
  },
  // Turbopack configuration (default in Next.js 16)
  turbopack: {
    rules: {
      // Load .glsl, .vert, .frag files as raw strings
      "*.glsl": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
      "*.vert": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
      "*.frag": {
        loaders: ["raw-loader"],
        as: "*.js",
      },
    },
  },
  // Webpack fallback for non-Turbopack builds
  webpack(config) {
    config.module.rules.push({
      test: /\.(glsl|vert|frag)$/,
      type: "asset/source",
    });
    return config;
  },
};

export default nextConfig;
