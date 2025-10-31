<script>
export default {
  name: 'AppFooter',

  // Component data - reactive properties
  data: () => ({
    // Social media link
    facebookUrl: 'https://www.facebook.com/profile.php?id=61582473064509',

    // Business contact information for footer
    contact: {
      phone: '3213451480',
      email: 'info@southernandsons.com'
    }
  }),

  computed: {
    /**
     * Gets current year dynamically
     * Updates automatically each year without code changes
     * Used in copyright notice
     * @returns {number} Current year (e.g., 2024)
     */
    currentYear () {
      return new Date().getFullYear()
    },

    /**
     * Formats phone number for display
     * Converts 3215550123 to (321) 345-1480
     * @returns {string} Formatted phone number
     */
    formattedPhone () {
      const cleaned = ('' + this.contact.phone).replace(/\D/g, '')
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

      if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
      }

      return this.contact.phone
    }
  }
}
</script>

<style scoped>
/*
  Scoped styles - only apply to this component
  Custom styling to enhance Vuetify defaults
*/

/*
  Footer background styling
  Dark background for contrast with page content
  Uses primary blue color for consistency
*/
.footer-section {
  background-color: #1976D2 !important; /* Primary blue */
  color: white !important;
  width: 100%;
  position: relative !important;
  bottom: 0;
}

/*
  Make text explicitly visible
*/
.white--text {
  color: white !important;
}

/*
  Footer link styling
  White text with hover effect
  No underline for cleaner look
*/
.footer-link {
  color: white !important;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
}

/*
  Social icon button styling
  Circular buttons with white icons
  Hover effect changes background
*/
.social-icon {
  background-color: transparent !important;
  border: 2px solid white !important;
}

/*
  Social icon hover effect
  Changes background to accent color
*/
.social-icon:hover {
  background-color: #F57C00 !important; /* Accent orange */
  border-color: #F57C00 !important;
}

/*
  Divider styling in footer
  White divider for visual separation
*/
.footer-divider {
  border-color: rgba(255, 255, 255, 0.3) !important;
}

/*
  RESPONSIVE DESIGN - Mobile adjustments
  Optimizes layout for smaller screens
*/

/* Mobile phones */
@media (max-width: 600px) {
  /* Center align all footer content on mobile */
  .text-md-left,
  .text-md-right {
    text-align: center !important;
    color: white !important;
  }

  /* Add spacing between stacked sections */
  .footer-section .v-col {
    margin-bottom: 16px;
  }

  .footer-section {
    margin-top: 24px;
  }
}
</style>

<template>
  <!--
    FOOTER COMPONENT
    Bottom of page with copyright, links, and contact info
    Dark blue background for visual closure
  -->
  <v-footer
    class="footer-section py-8"
    padless
    dark
  >
    <v-container>
      <!--
        TOP SECTION
        Business info and quick links
      -->
      <v-row>
        <!--
          BUSINESS NAME AND TAGLINE
          Left column on desktop, centered on mobile
        -->
        <v-col
          cols="12"
          md="4"
          class="mb-6 mb-md-0"
        >
          <h3 class="text-h5 font-weight-bold mb-3 white--text">
            Southern and Sons
          </h3>
          <p class="text-h6 white--text mb-3">
            Small Engine Repair, LLC
          </p>
          <p class="text-body-1 white--text">
            Professional small engine repair services in Brevard County, Florida
          </p>
        </v-col>

        <!--
          QUICK CONTACT LINKS
          Center column on desktop
          Clickable phone and email links
        -->
        <v-col
          cols="12"
          md="4"
          class="mb-6 mb-md-0"
        >
          <h4 class="text-h6 font-weight-bold mb-3 white--text">
            Quick Contact
          </h4>

          <!-- Phone link -->
          <div class="mb-3">
            <a
              :href="'tel:' + contact.phone"
              class="footer-link"
            >
              <v-icon color="white" class="mr-2">mdi-phone</v-icon>
              <span class="text-h6">{{ formattedPhone }}</span>
            </a>
          </div>

          <!-- Email link -->
          <div class="mb-3">
            <a
              :href="'mailto:' + contact.email"
              class="footer-link"
            >
              <v-icon color="white" class="mr-2">mdi-email</v-icon>
              <span class="text-h6">{{ contact.email }}</span>
            </a>
          </div>

          <!-- Location -->
          <div>
            <div class="footer-link" style="cursor: default;">
              <v-icon color="white" class="mr-2">mdi-map-marker</v-icon>
              <span class="text-h6">Brevard County, FL</span>
            </div>
          </div>
        </v-col>

        <!--
          HOURS AND SOCIAL MEDIA
          Right column on desktop
        -->
        <v-col
          cols="12"
          md="4"
        >
          <h4 class="text-h6 font-weight-bold mb-3 white--text">
            Hours
          </h4>
          <p class="text-h6 white--text mb-1">
            Monday - Sunday
          </p>
          <p class="text-h6 white--text mb-4">
            8:00 AM - 6:00 PM
          </p>

          <!-- Social media link -->
          <h4 class="text-h6 font-weight-bold mb-3 white--text">
            Follow Us
          </h4>
          <v-btn
            :href="facebookUrl"
            target="_blank"
            rel="noopener noreferrer"
            icon
            x-large
            class="social-icon"
            color="white"
          >
            <v-icon size="32">mdi-facebook</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!-- Divider between sections -->
      <v-divider class="footer-divider my-6"></v-divider>

      <!--
        BOTTOM SECTION
        Copyright and legal info
      -->
      <v-row>
        <v-col
          cols="12"
          md="6"
          class="text-center text-md-left"
        >
          <!--
            Copyright notice with dynamic year
            currentYear computed property automatically updates
          -->
          <p class="text-body-1 white--text mb-0">
            © {{ currentYear }} Southern and Sons Small Engine Repair, LLC. All rights reserved.
          </p>
        </v-col>

        <v-col
          cols="12"
          md="6"
          class="text-center text-md-right"
        >
          <!--
            Website credit
            Optional: Remove or replace with your own text
          -->
          <p class="text-body-1 white--text mb-0">
            Proudly serving Brevard County since {{ currentYear }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>
