const { defineConfig } = require('@vue/cli-service')
const business = require('./src/config/business')

/**
 * Vue CLI configuration for Southern and Sons Small Engine Repair website
 * Optimized for production deployment with performance and SEO considerations
 */

// The quote form needs these at build time: from .env for local builds,
// from repository variables in GitHub Actions. A production build without them
// would ship a form that can't send, so stop the build instead.
const requiredEnv = [
  'VUE_APP_EMAILJS_PUBLIC_KEY',
  'VUE_APP_EMAILJS_SERVICE_ID',
  'VUE_APP_EMAILJS_TEMPLATE_ID',
  'VUE_APP_RECAPTCHA_SITE_KEY'
]
if (process.env.NODE_ENV === 'production') {
  const missing = requiredEnv.filter(name => !process.env[name])
  if (missing.length) {
    throw new Error(`Missing ${missing.join(', ')}. Add them to .env (local builds) or the repository variables (GitHub Actions).`)
  }
}

/**
 * Schema.org LocalBusiness data for search engines, built from the business
 * config and inserted into public/index.html
 * @returns {string} JSON for the <script type="application/ld+json"> block
 */
function structuredData () {
  const { phone, address, hours } = business
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.legalName,
    url: `${business.siteUrl}/`,
    image: `${business.siteUrl}/og-image.png`,
    telephone: `+1-${phone.slice(0, 3)}-${phone.slice(3, 6)}-${phone.slice(6)}`,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      addressCountry: 'US'
    },
    areaServed: business.serviceArea,
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: hours.open,
      closes: hours.close
    }],
    sameAs: [business.facebookUrl]
  }
  if (business.foundedYear) {
    data.foundingDate = String(business.foundedYear)
  }
  // Escape "<" so no value can close the <script> tag early
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

module.exports = defineConfig({
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
    }
  },

  // Development server configuration
  devServer: {
    // Host configuration
    host: 'localhost',
    port: 8080,

    // Open browser automatically
    open: true
  },

  // Chain webpack for additional optimizations
  chainWebpack: config => {
    // HTML optimization
    config.plugin('html').tap(args => {
      // Values public/index.html reads as htmlWebpackPlugin.options.*
      args[0].business = business
      args[0].structuredData = structuredData()

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
      // Strip console.log/info/debug in production but keep console.error and console.warn,
      // so a failed quote submission still leaves a trace in the browser console
      config.optimization.minimizer('terser').tap(args => {
        args[0].terserOptions.compress.pure_funcs = ['console.log', 'console.info', 'console.debug']
        return args
      })
    }
  }
})
