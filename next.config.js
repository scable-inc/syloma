/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  
  // Configuration pour éviter les bus errors
  experimental: {
    // Désactivation complète des fonctionnalités expérimentales
    workerThreads: false,
    cpus: 1,
    esmExternals: false,
    forceSwcTransforms: false,
    // Désactiver les features qui causent des problèmes mémoire
    optimizePackageImports: false,
    turbo: false,
  },
  
  // Configuration webpack ultra-conservative pour éviter les bus errors
  webpack: (config, { dev, isServer }) => {
    // Désactiver complètement la parallélisation
    config.parallelism = 1;
    
    // Limiter la taille des chunks et désactiver l'optimisation agressive
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: false, // Désactiver la minification qui cause des bus errors
        splitChunks: false, // Désactiver le split des chunks
        concatenateModules: false,
        usedExports: false,
        sideEffects: false,
      };
    }

    // Supprimer tous les plugins non essentiels qui peuvent causer des problèmes
    config.plugins = config.plugins.filter(plugin => {
      const name = plugin.constructor.name;
      return !name.includes('BundleAnalyzer') && 
             !name.includes('ProgressPlugin') &&
             !name.includes('CompressionPlugin') &&
             !name.includes('TerserPlugin');
    });

    // Configuration de cache très conservative
    config.cache = false; // Désactiver complètement le cache

    // Limiter la résolution des modules
    config.resolve = {
      ...config.resolve,
      symlinks: false,
    };

    return config;
  },

  // Désactiver toutes les optimisations qui peuvent causer des bus errors
  productionBrowserSourceMaps: false,
  
  // Configuration du compilateur ultra-conservative
  compiler: {
    removeConsole: false, // Désactivé pour éviter les problèmes
    reactRemoveProperties: false,
  },

  // Désactiver SWC qui peut causer des bus errors
  swcMinify: false,
  
  // Désactiver ESLint pendant le build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configuration TypeScript permissive
  typescript: {
    ignoreBuildErrors: false,
  },

  // Timeout très long pour éviter les timeouts
  staticPageGenerationTimeout: 600,
  
  // Limiter drastiquement les entrées simultanées
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 1,
  },

  // ID de build très simple
  generateBuildId: async () => {
    return 'build-' + Math.random().toString(36).substr(2, 9);
  },

  // Configuration d'environnement pour Node.js avec limites mémoire strictes
  env: {
    NODE_OPTIONS: '--max-old-space-size=4096 --max-semi-space-size=512 --no-concurrent-recompilation',
  },

  // Désactiver le pre-rendering pour réduire la charge mémoire
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Configuration stricte pour éviter les fuites mémoire
  poweredByHeader: false,
  compress: false,
};

module.exports = nextConfig;