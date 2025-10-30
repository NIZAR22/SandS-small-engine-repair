import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
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
        info: '#2196F3',
        // Background colors for high contrast
        background: '#FFFFFF',
        surface: '#F5F5F5',
        // Text colors for maximum readability
        'on-primary': '#FFFFFF',
        'on-secondary': '#FFFFFF',
        'on-surface': '#212121',
        'on-background': '#212121'
      }
    },
    options: {
      // Enable theme variations for better accessibility
      variations: {
        colors: ['primary', 'secondary'],
        lighten: 5,
        darken: 5
      }
    }
  },
  // Configure default component props for senior-friendly design
  defaults: {
    VBtn: {
      // Minimum button height for easy clicking
      minHeight: '56px',
      // Large font size for buttons
      fontSize: '18px',
      // Generous padding for touch targets
      padding: '16px 24px'
    },
    VTextField: {
      // Large font size for form inputs
      fontSize: '20px',
      // Generous padding for easy interaction
      padding: '16px',
      // High contrast colors
      color: 'primary'
    },
    VTextarea: {
      // Large font size for text areas
      fontSize: '20px',
      // Generous padding for easy interaction
      padding: '16px',
      // High contrast colors
      color: 'primary'
    },
    VCard: {
      // Elevated cards for better visual separation
      elevation: 2,
      // Rounded corners for modern look
      rounded: true
    },
    VAlert: {
      // Large font size for alerts
      fontSize: '18px',
      // Generous padding for readability
      padding: '20px'
    },
    VAppBar: {
      // Elevated app bar for better visibility
      elevation: 4,
      // Fixed positioning for consistent navigation
      fixed: true
    }
  },
  // Breakpoint configuration - Mobile-first responsive design
  breakpoint: {
    thresholds: {
      xs: 600, // Extra small: phones (portrait)
      sm: 960, // Small: phones (landscape) and small tablets
      md: 1264, // Medium: tablets (landscape) and small desktops
      lg: 1904 // Large: desktops
    },
    scrollBarWidth: 16 // Standard scrollbar width for calculations
  },
  // Configure icons
  icons: {
    iconfont: 'mdi'
  },
  // Typography configuration - Senior-friendly large text
  // These settings ensure text is readable for users with vision challenges
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3
    },
    h3: {
      fontWeight: 500,
      fontSize: '1.75rem',
      lineHeight: 1.4
    },
    body1: {
      fontWeight: 400,
      fontSize: '1.25rem',
      lineHeight: 1.5
    },
    body2: {
      fontWeight: 400,
      fontSize: '1.1rem',
      lineHeight: 1.5
    },
    button: {
      fontWeight: 500,
      fontSize: '1.1rem',
      letterSpacing: '0.0892857143em'
    }
  }
})
