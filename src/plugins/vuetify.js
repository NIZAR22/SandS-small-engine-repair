import Vue from 'vue'
// Framework only: vuetify-loader adds the components each template uses,
// so the bundle carries just those components and their styles
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      // Expose theme colors as CSS variables (e.g. var(--v-accent-base)) for component styles
      customProperties: true
    },
    // Brand colors from the business card. These are the source values for the
    // --color-* variables in src/styles/theme.css; change a color here, not there.
    themes: {
      light: {
        // Primary color: deep navy-purple of the business card
        primary: '#29234F',
        // Accent color: the card's red-orange gears; icons, borders, active indicators
        // (too light for text on buttons: warm white on it is only 3.2:1)
        accent: '#F45150',
        // Call-to-action color: deeper shade of the red-orange for buttons with text
        // (warm white text 4.9:1, WCAG AA)
        cta: '#C8323A',
        // Secondary color: lighter navy-purple for panels and hover backgrounds
        secondary: '#3B326B',
        // Success color: Green for positive feedback (white text 5.1:1)
        success: '#2E7D32',
        // Warning color: Amber for important notices
        warning: '#FF9800',
        // Error color: Red for errors and alerts (white text 5.6:1)
        error: '#C62828',
        // Info color: Blue for informational content
        info: '#2196F3'
      }
    }
  },
  // Configure icons
  icons: {
    iconfont: 'mdi'
  }
})
