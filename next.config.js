/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  
  // Configuration pour éviter les problèmes de mémoire
  experimental: {
    // Désactivation complète des fonctionnalités expérimentales
    workerThreads: false,
    cpus: 1,
    esmExternals: false,
    forceSwcTransforms: false,
  },
  
  // Configuration webpack simplifiée pour réduire la charge mémoire
  webpack: (config, { dev, isServer }) => {
    // Désactiver la parallélisation pour éviter les bus errors
    config.parallelism = 1;
    
    // Simplifier l'optimisation uniquement en production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 100000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        },
      };
    }

    // Réduire la verbosité et la charge des plugins
    config.plugins = config.plugins.filter(plugin => {
      const name = plugin.constructor.name;
      return !name.includes('BundleAnalyzer') && !name.includes('ProgressPlugin');
    });

    // Configuration de cache plus conservative
    config.cache = {
      type: 'memory',
      maxGenerations: 1,
    };

    return config;
  },

  // Désactiver les source maps complètement
  productionBrowserSourceMaps: false,
  
  // Configuration du compilateur
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: false, // Désactivé pour éviter les problèmes
  },

  // Utilisation du minificateur SWC plus léger
  swcMinify: true,
  
  // Désactiver ESLint pendant le build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configuration TypeScript plus permissive
  typescript: {
    ignoreBuildErrors: false,
  },

  // Timeout plus long pour la génération statique
  staticPageGenerationTimeout: 300,
  
  // Limiter les entrées simultanées
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 1,
  },

  // ID de build simple
  generateBuildId: async () => {
    return 'syloma-' + Date.now().toString();
  },

  // Variables d'environnement pour Node.js
  env: {
    NODE_OPTIONS: '--max-old-space-size=8192 --max-semi-space-size=1024',
  },
};

module.exports = nextConfig;