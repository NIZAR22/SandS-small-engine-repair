const { defineConfig } = require('@vue/cli-service')

/**
 * Vue CLI configuration for Southern and Sons Small Engine Repair website
 * Optimized for production deployment with performance and SEO considerations
 */
module.exports = defineConfig({
  // Transpile dependencies for Vuetify and other packages
  transpileDependencies: [
    'vuetify'
  ],

  // Production build configuration
  publicPath: '/',
  
  // Output directory for production build
  outputDir: 'dist',
  
  // Assets directory
  assetsDir: 'assets',
  
  // Enable source maps for debugging (disabled in production for security)
  productionSourceMap: false,
  
  // Configure webpack for optimization
  configureWebpack: {
    // Performance optimizations
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 6,
        cacheGroups: {
          vuetify: {
            name: 'chunk-vuetify',
            test: /[\\/]node_modules[\\/]vuetify[\\/]/,
            priority: 20,
            chunks: 'initial'
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      }
    },
    performance: {
      hints: 'warning',
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    
    // Resolve configuration for better module resolution
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src')
      }
    }
  },

  // CSS configuration
  css: {
    // Extract CSS for better caching
    extract: process.env.NODE_ENV === 'production',
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        sassOptions: {
          fiber: false,
          indentedSyntax: true,
          outputStyle: 'compressed'
        }
      }
    }
  },

  // Development server configuration
  devServer: {
    // Enable HTTPS for local development
    https: false,
    
    // Host configuration
    host: 'localhost',
    port: 8080,
    
    // Open browser automatically
    open: true,
    
    // Hot module replacement
    hot: true,
    
    // CORS configuration
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },

  // PWA configuration (if needed in future)
  // pwa: {
  //   name: 'Southern and Sons Small Engine Repair',
  //   themeColor: '#1976D2',
  //   msTileColor: '#1976D2',
  //   appleMobileWebAppCapable: 'yes',
  //   appleMobileWebAppStatusBarStyle: 'default',
  //   manifestOptions: {
  //     background_color: '#FFFFFF',
  //     display: 'standalone',
  //     orientation: 'portrait'
  //   }
  // },

  // Chain webpack for additional optimizations
  chainWebpack: config => {
    // Optimize images
    config.module
      .rule('images')
      .test(/\.(gif|png|jpe?g|svg)$/i)
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: {
          progressive: true,
          quality: 80
        },
        optipng: {
          enabled: true
        },
        pngquant: {
          quality: [0.65, 0.90],
          speed: 4
        },
        gifsicle: {
          interlaced: false
        },
        webp: {
          quality: 80
        }
      })

    // Optimize fonts
    config.module
      .rule('fonts')
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 4096,
        fallback: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash:8].[ext]'
          }
        }
      })

    // HTML optimization
    config.plugin('html').tap(args => {
      args[0].minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        collapseBooleanAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
      }
      return args
    })

    // Performance optimizations
    if (process.env.NODE_ENV === 'production') {
      // Remove console logs in production
      config.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions.compress.drop_console = true
        return args
      })
    }
  },

  // Plugin options
  pluginOptions: {
    // Vuetify plugin options
    vuetify: {
      theme: {
        themes: {
          light: {
            primary: '#1976D2',
            accent: '#F57C00'
          }
        }
      }
    }
  }
})
