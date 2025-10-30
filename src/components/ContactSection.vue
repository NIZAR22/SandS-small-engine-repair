<script>
export default {
  name: 'ContactSection',

  // Component data - reactive properties
  data: () => ({
    // Business contact information
    // TODO: Replace with actual business contact details
    contact: {
      phone: '3215550123',
      email: 'info@southernandsons.com',
      location: 'Brevard County, FL',
      address: '984 Cotorro Road Southeast, Palm Bay, FL, United States, Florida'
    },

    // Business hours - same for all days
    // Displayed in easy-to-read format for senior users
    businessHours: [
      { day: 'Monday', hours: '8:00 AM - 6:00 PM' },
      { day: 'Tuesday', hours: '8:00 AM - 6:00 PM' },
      { day: 'Wednesday', hours: '8:00 AM - 6:00 PM' },
      { day: 'Thursday', hours: '8:00 AM - 6:00 PM' },
      { day: 'Friday', hours: '8:00 AM - 6:00 PM' },
      { day: 'Saturday', hours: '8:00 AM - 6:00 PM' },
      { day: 'Sunday', hours: '8:00 AM - 6:00 PM' }
    ],

    // Social media link
    // Facebook page for the business
    facebookUrl: 'https://www.facebook.com/profile.php?id=61582473064509',

    // Dialog visibility for map selection
    showMapDialog: false // Add this for the dialog
  }),

  computed: {
    /**
     * Formats phone number for display
     * Converts 3215550123 to (321) 555-0123
     * @returns {string} Formatted phone number
     */
    formattedPhone () {
      const cleaned = ('' + this.contact.phone).replace(/\D/g, '')
      const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

      if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3]
      }

      return this.contact.phone
    },

    /**
     * Checks if the device is mobile based on window width
     * @returns {boolean} True if mobile, false otherwise
     */
    isMobile () {
      return window.innerWidth <= 600
    },

    /**
     * Detects if the browser is Safari
     * @returns {boolean} True if Safari, false otherwise
     */
    isSafari () {
      const ua = navigator.userAgent.toLowerCase()
      return (ua.indexOf('safari') !== -1 && ua.indexOf('chrome') === -1)
    },

    /**
     * Detects if using Safari browser and Apple device
     * @returns {boolean} True if Safari on Apple device
     */
    isAppleMapsCompatible () {
      const ua = navigator.userAgent
      const isIOS = /iPhone|iPad|iPod/.test(ua)
      const isMac = /Macintosh/.test(ua)
      const isSafari = /^((?!chrome|android).)*safari/i.test(ua)

      return (isIOS || isMac) && isSafari
    },

    /**
     * Gets Google Maps URL
     */
    googleMapsUrl () {
      return `https://www.google.com/maps/search/?api=1&query=984+Cotorro+Road+Southeast+Palm+Bay+FL+United+States+Florida`
    },

    /**
     * Gets Apple Maps URL
     */
    appleMapsUrl () {
      return `https://maps.apple.com/?address=984,Cotorro,Road,Southeast,Palm%20Bay,FL,United%20States,Florida`
    }
  },

  methods: {
    /**
     * Opens the selected maps application
     */
    openMaps (type) {
      const url = type === 'apple' ? this.appleMapsUrl : this.googleMapsUrl
      window.open(url, '_blank')
      this.showMapDialog = false
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
  Contact section background
  White background for clean, professional look
*/
.contact-section {
  background-color: #ffffff;
  margin-bottom: 64px; /* Add space for footer */
}

/*
  Contact info card styling
  White card with shadow and rounded corners
  Contains all contact information
*/
.contact-card {
  border-radius: 16px !important;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
}

/*
  Contact item styling
  Individual contact info items (phone, email, location)
  Large text and icons for senior-friendly design
*/
.contact-item {
  padding: 24px;
  border-radius: 12px;
  background-color: #f5f5f5; /* Light gray background */
  transition: all 0.3s ease;
  word-break: break-all;
  overflow-wrap: anywhere;
}

/*
  Contact item hover effect
  Subtle color change on hover for interactivity
*/
.contact-item:hover {
  background-color: #e3f2fd; /* Light blue on hover */
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/*
  Hours card styling
  Separate card for business hours
  Consistent with other cards throughout site
*/
.hours-card {
  border-radius: 12px !important;
  border-left: 4px solid #1976D2;
  margin-bottom: 24px;
  height: auto !important; /* Ensure card expands to content */
  overflow: visible !important; /* Prevent content clipping */
}

/*
  Hours list item styling
  Each day/hours pair in the list
*/
.hours-item {
  padding: 16px 0;
  border-bottom: 1px solid #e0e0e0; /* Light divider between items */
  height: auto !important;
}

/*
  Remove border from last item
  Cleaner look without bottom border on last day
*/
.hours-item:last-child {
  border-bottom: none;
}

/*
  Social media button styling
  Large, prominent button for Facebook link
*/
.social-btn {
  min-height: 60px !important;
  transition: all 0.3s ease;
}

/*
  Social button hover effect
  Scales up slightly on hover
*/
.social-btn:hover {
  transform: scale(1.05);
}

/*
  RESPONSIVE DESIGN - Mobile adjustments
  Optimizes layout for smaller screens
*/

/* Mobile phones */
@media (max-width: 600px) {
  /* Reduce padding on contact items for mobile */
  .contact-item {
    padding: 16px;
  }

  /* Stack hours more compactly on mobile */
  .hours-item {
    padding: 12px 0;
  }

  /* Ensure list items are fully visible */
  .v-list {
    max-height: none;
    overflow: visible;
  }

  .contact-section {
    margin-bottom: 0; /* Reduce bottom margin on mobile */
    padding-bottom: 24px !important; /* Add padding instead */
  }

  .hours-card {
    margin-bottom: 16px;
    padding: 16px !important;
  }

  .v-list-item {
    min-height: auto !important;
    padding: 8px 0 !important;
  }

  /* Force proper spacing between sections */
  .v-row {
    margin-bottom: 16px !important;
  }
}
</style>

<template>
  <!--
    CONTACT SECTION
    Displays business contact information and hours
    Final section before footer
  -->
  <v-container
    fluid
    class="contact-section py-16 pa-0 ma-0"
    style="min-height: auto !important; overflow: visible !important;"
  >
    <!--
      Main container with max width for readability
      Centers content on large screens
    -->
    <v-container>
      <!--
        SECTION HEADER
        Large, centered title to introduce contact section
      -->
      <v-row justify="center" class="mb-12">
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 font-weight-bold primary--text mb-4">
            Contact Us
          </h2>
          <p class="text-h6 grey--text text--darken-1">
            Get in touch with Southern and Sons Small Engine Repair
          </p>
        </v-col>
      </v-row>

      <!--
        CONTACT INFORMATION GRID
        Three column layout on desktop, stacked on mobile
        Phone, Email, Location
      -->
      <v-row class="mb-12">
        <!--
          PHONE CONTACT
          Clickable tel: link opens phone dialer
          Large icon and text for visibility
        -->
        <v-col
          cols="12"
          md="4"
          class="mb-4 mb-md-0"
        >
          <a
            :href="'tel:' + contact.phone"
            class="text-decoration-none"
          >
            <div class="contact-item text-center">
              <v-icon
                color="primary"
                size="56"
                class="mb-4"
              >
                mdi-phone
              </v-icon>
              <h3 class="text-h5 font-weight-bold mb-2 primary--text">
                Call Us
              </h3>
              <p class="text-h6 grey--text text--darken-2 mb-0">
                {{ formattedPhone }}
              </p>
              <p class="text-body-1 grey--text text--darken-1 mt-2">
                Click to call
              </p>
            </div>
          </a>
        </v-col>

        <!--
          EMAIL CONTACT
          Clickable mailto: link opens email client
        -->
        <v-col
          cols="12"
          md="4"
          class="mb-4 mb-md-0"
        >
          <a
            :href="'mailto:' + contact.email"
            class="text-decoration-none"
          >
            <div class="contact-item text-center">
              <v-icon
                color="primary"
                size="56"
                class="mb-4"
              >
                mdi-email
              </v-icon>
              <h3 class="text-h5 font-weight-bold mb-2 primary--text">
                Email Us
              </h3>
              <p class="text-h6 grey--text text--darken-2 mb-0">
                {{ contact.email }}
              </p>
              <p class="text-body-1 grey--text text--darken-1 mt-2">
                Click to email
              </p>
            </div>
          </a>
        </v-col>

        <!--
          LOCATION
          Displays service area
          Not clickable since no specific address
        -->
        <v-col
          cols="12"
          md="4"
        >
          <div class="contact-item text-center">
            <v-icon
              color="primary"
              size="56"
              class="mb-4"
            >
              mdi-map-marker
            </v-icon>
            <h3 class="text-h5 font-weight-bold mb-2 primary--text">
              Service Area
            </h3>
            <p class="text-h6 grey--text text--darken-2 mb-0">
              {{ contact.location }}
            </p>
            <p class="text-body-1 grey--text text--darken-1 mt-2">
              Shop service only
            </p>
            <!-- Show map button on mobile -->
            <div class="mt-4">
              <!-- Show embedded map on all viewports -->
              <iframe
                width="100%"
                height="200"
                frameborder="0"
                style="border:0"
                :src="'https://www.google.com/maps?q=984+Cotorro+Road+Southeast+Palm+Bay+FL+United+States+Florida&output=embed'"
                allowfullscreen
              ></iframe>

              <!-- Show directions button below map on mobile -->
              <v-btn
                v-if="isMobile"
                @click="showMapDialog = true"
                color="primary"
                outlined
                large
                class="mt-4"
              >
                <v-icon left>mdi-directions</v-icon>
                Get Directions
              </v-btn>

              <!-- Map selection dialog -->
              <v-dialog
                v-model="showMapDialog"
                max-width="300"
              >
                <v-card>
                  <v-card-title class="text-h6">
                    Choose Maps App
                  </v-card-title>
                  <v-card-text>
                    <v-btn
                      block
                      color="primary"
                      class="mb-3"
                      @click="openMaps('google')"
                    >
                      <v-icon left>mdi-google-maps</v-icon>
                      Google Maps
                    </v-btn>
                    <v-btn
                      block
                      color="primary"
                      @click="openMaps('apple')"
                    >
                      <v-icon left>mdi-apple</v-icon>
                      Apple Maps
                    </v-btn>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      @click="showMapDialog = false"
                    >
                      Cancel
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </div>
        </v-col>
      </v-row>

      <!--
        BUSINESS HOURS SECTION
        Displays operating hours for all days
      -->
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="hours-card pa-6" elevation="4">
            <!-- Card header -->
            <div class="text-center mb-6">
              <v-icon
                color="primary"
                size="48"
                class="mb-3"
              >
                mdi-clock-outline
              </v-icon>
              <h3 class="text-h4 font-weight-bold primary--text">
                Business Hours
              </h3>
            </div>

            <!--
              Hours list
              Displays each day with corresponding hours
              v-for loops through businessHours array
            -->
            <v-list class="transparent">
              <v-list-item
                v-for="(schedule, index) in businessHours"
                :key="index"
                class="hours-item"
              >
                <v-list-item-content>
                  <v-row align="center">
                    <!-- Day name -->
                    <v-col cols="5" sm="4">
                      <span class="text-h6 font-weight-bold">
                        {{ schedule.day }}
                      </span>
                    </v-col>
                    <!-- Hours -->
                    <v-col cols="7" sm="8" class="text-right text-sm-left">
                      <span class="text-h6 grey--text text--darken-2">
                        {{ schedule.hours }}
                      </span>
                    </v-col>
                  </v-row>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <!--
              Open 7 Days callout
              Highlights that business is open every day
            -->
            <v-divider class="my-4"></v-divider>

            <div class="text-center">
              <v-chip
                color="accent"
                text-color="white"
                large
                class="px-6 py-4"
              >
                <v-icon left>mdi-calendar-check</v-icon>
                <span class="text-h6 font-weight-bold">
                  Open 7 Days a Week
                </span>
              </v-chip>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <!--
        SOCIAL MEDIA SECTION
        Link to Facebook business page
      -->
      <v-row justify="center" class="mt-12">
        <v-col cols="12" class="text-center">
          <h3 class="text-h5 font-weight-bold mb-4">
            Connect With Us
          </h3>
          <v-btn
            :href="facebookUrl"
            target="_blank"
            rel="noopener noreferrer"
            color="#1877F2"
            dark
            x-large
            class="social-btn px-8"
          >
            <v-icon left large>mdi-facebook</v-icon>
            <span class="text-h6">Visit Us on Facebook</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
