<script>
import business from '@/config/business'
import { formatPhone, formatHours, splitEmail } from '@/utils/format'

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default {
  name: 'ContactSection',
  data: () => ({
    // Business contact information (edit in src/config/business.js)
    contact: {
      phone: business.phone,
      email: business.email,
      location: business.serviceArea
    },

    // Business hours - same for all days
    // Displayed in easy-to-read format for senior users
    businessHours: WEEKDAYS.map(day => ({ day, hours: formatHours(business.hours) })),

    // Social media link
    // Facebook page for the business
    facebookUrl: business.facebookUrl,

    // Dialog visibility for map selection
    showMapDialog: false
  }),

  computed: {
    /**
     * Formats phone number for display
     * Converts 3213391790 to (321) 339-1790
     * @returns {string} Formatted phone number
     */
    formattedPhone () {
      return formatPhone(this.contact.phone)
    },

    /**
     * Email split before the @ so it wraps cleanly on phones
     * @returns {string[]} [name, '@domain']
     */
    emailParts () {
      return splitEmail(this.contact.email)
    },

    /**
     * Shop address as one line for map searches
     * @returns {string} e.g. 984 Cotorro Road Southeast, Palm Bay, FL 32909
     */
    mapQuery () {
      const { street, city, state, zip } = business.address
      return `${street}, ${city}, ${state} ${zip}`
    },

    /**
     * Gets the embedded Google Maps URL for the shop location
     */
    mapEmbedUrl () {
      return `https://www.google.com/maps?q=${encodeURIComponent(this.mapQuery)}&output=embed`
    },

    /**
     * Detects iPhone, iPad and Mac, where Apple Maps links open the Maps app
     * in any browser (iPads report themselves as Macintosh)
     * @returns {boolean} True on Apple devices
     */
    hasAppleMaps () {
      return /iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent)
    },

    /**
     * Gets Google Maps directions URL
     */
    googleMapsUrl () {
      return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(this.mapQuery)}`
    },

    /**
     * Gets Apple Maps directions URL
     */
    appleMapsUrl () {
      return `https://maps.apple.com/?daddr=${encodeURIComponent(this.mapQuery)}`
    }
  },

  methods: {
    /**
     * Opens directions to the shop
     * Apple devices get a choice of maps app; everyone else goes to Google Maps
     */
    getDirections () {
      if (this.hasAppleMaps) {
        this.showMapDialog = true
      } else {
        this.openMaps('google')
      }
    },

    /**
     * Opens the selected maps application
     * noopener stops the new tab from getting a handle back to this page
     */
    openMaps (type) {
      const url = type === 'apple' ? this.appleMapsUrl : this.googleMapsUrl
      window.open(url, '_blank', 'noopener')
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
  border-left: 4px solid var(--v-primary-base);
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
          <p class="text-h6 grey--text text--darken-2">
            Get in touch with <strong>Southern and Sons Small Engine Repair</strong>
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
              <p class="text-body-1 grey--text text--darken-2 mt-2">
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
                {{ emailParts[0] }}<wbr>{{ emailParts[1] }}
              </p>
              <p class="text-body-1 grey--text text--darken-2 mt-2">
                Click to email
              </p>
            </div>
          </a>
        </v-col>

        <!--
          LOCATION
          Displays service area, plus a map and directions to the shop
          (customers bring their equipment in)
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
            <p class="text-body-1 grey--text text--darken-2 mt-2">
              Shop service only
            </p>
            <!-- Map and directions -->
            <div class="mt-4">
              <!--
                Embedded map on all viewports
                title names the map for screen readers; loading="lazy" waits
                until it's near the screen before loading Google Maps
              -->
              <iframe
                title="Map showing the Southern and Sons shop"
                loading="lazy"
                width="100%"
                height="200"
                frameborder="0"
                style="border:0"
                :src="mapEmbedUrl"
                allowfullscreen
              ></iframe>

              <!-- Directions button below the map -->
              <v-btn
                @click="getDirections"
                color="primary"
                outlined
                large
                class="mt-4"
              >
                <v-icon left>mdi-directions</v-icon>
                Get Directions
              </v-btn>

              <!-- Maps app choice, shown on Apple devices -->
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
              Availability note from the owner
              Hours can change and every visit needs an appointment
            -->
            <p class="text-h6 font-weight-medium text-center mt-4 mb-0">
              We are a small family-owned business and our hours and availability
              are subject to change. We are by appointment only.
            </p>

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
            <!-- Bold so the white text on Facebook blue counts as large text (WCAG AA) -->
            <span class="text-h6 font-weight-bold">Visit Us on Facebook</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
