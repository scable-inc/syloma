/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  
  // Experimental features that can cause memory issues - disabled
  experimental: {
    // Disable worker threads that can cause bus errors
    workerThreads: false,
    // Limit CPU usage to prevent overload
    cpus: 1,
    // Disable potentially problematic features
    esmExternals: false,
  },
  
  // Webpack optimization to prevent memory issues
  webpack: (config, { dev, isServer, webpack }) => {
    // Only apply optimizations in production
    if (!dev) {
      // Reduce memory pressure
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 150000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              reuseExistingChunk: true,
              chunks: 'all',
            },
          },
        },
        // Minimize memory usage during minimization
        minimizer: config.optimization.minimizer?.map(minimizer => {
          if (minimizer.constructor.name === 'TerserPlugin') {
            minimizer.options = {
              ...minimizer.options,
              parallel: false, // Disable parallel processing to reduce memory
              terserOptions: {
                ...minimizer.options?.terserOptions,
                compress: {
                  ...minimizer.options?.terserOptions?.compress,
                  // Reduce compression complexity
                  passes: 1,
                },
              },
            };
          }
          return minimizer;
        }),
      };

      // Reduce chunk size to prevent memory issues
      config.resolve.alias = {
        ...config.resolve.alias,
      };

      // Add memory limit plugin
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NODE_OPTIONS': JSON.stringify('--max-old-space-size=4096'),
        })
      );
    }

    // Limit bundle analyzer and other high-memory plugins
    config.plugins = config.plugins.filter(plugin => {
      return !plugin.constructor.name.includes('BundleAnalyzer');
    });

    return config;
  },

  // Disable source maps in production to reduce memory usage
  productionBrowserSourceMaps: false,
  
  // Compiler optimizations
  compiler: {
    // Remove console logs in production to reduce bundle size
    removeConsole: process.env.NODE_ENV === 'production',
    // Disable react refresh in production
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },

  // Reduce build complexity
  swcMinify: true,
  
  // Disable features that can cause issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },

  // Optimize static optimization
  staticPageGenerationTimeout: 180,
  
  // Prevent memory leaks
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Reduce concurrent operations
  generateBuildId: async () => {
    return 'syloma-build-' + Date.now();
  },
};

module.exports = nextConfig;