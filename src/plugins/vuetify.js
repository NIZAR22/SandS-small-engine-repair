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
    themes: {
      light: {
        // Primary color: Deep Blue for trust and professionalism
        primary: '#1976D2',
        // Accent color: Orange for call-to-action buttons
        accent: '#F57C00',
        // Secondary color: Light blue for subtle elements
        secondary: '#42A5F5',
        // Success color: Green for positive feedback
        success: '#4CAF50',
        // Warning color: Amber for important notices
        warning: '#FF9800',
        // Error color: Red for errors and alerts
        error: '#F44336',
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
