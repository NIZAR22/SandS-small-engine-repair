<script>
export default {
  name: 'AboutServices',

  // Component data - reactive properties
  data: () => ({
    // Array of services offered
    // Each service has name, description, and Material Design icon
    servicesOffered: [
      {
        name: 'Lawn Mowers',
        description: 'Push mowers, riding mowers, zero-turn mowers',
        icon: 'mdi-tractor'
      },
      {
        name: 'Generators',
        description: 'Portable and standby generators, all brands',
        icon: 'mdi-engine'
      },
      {
        name: 'Chainsaws',
        description: 'Gas and electric chainsaws, all sizes',
        icon: 'mdi-saw-blade'
      },
      {
        name: 'Trimmers & Edgers',
        description: 'String trimmers, brush cutters, lawn edgers',
        icon: 'mdi-scissors-cutting'
      },
      {
        name: 'Leaf Blowers',
        description: 'Handheld and backpack blowers',
        icon: 'mdi-air-filter'
      },
      {
        name: 'Pressure Washers',
        description: 'Gas and electric pressure washers',
        icon: 'mdi-water-pump'
      }
    ],

    // Array of business benefits/value propositions
    // Highlights why customers should choose this business
    benefits: [
      {
        icon: 'mdi-account-check',
        title: 'Expert Technicians',
        description: 'Years of experience repairing all brands and models of small engines'
      },
      {
        icon: 'mdi-clock-fast',
        title: 'Fast Turnaround',
        description: 'Most repairs completed within 3-5 business days'
      },
      {
        icon: 'mdi-cash-check',
        title: 'Fair Pricing',
        description: 'Competitive rates with free estimates on all repairs'
      },
      {
        icon: 'mdi-shield-check',
        title: 'Quality Guarantee',
        description: 'All repairs backed by our satisfaction guarantee'
      }
    ]
  }),

  methods: {
    /**
     * Scrolls to the quote form section
     * Emits event to parent component to handle scroll
     */
    scrollToQuote () {
      this.$emit('scroll-to-quote')
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
  Services section background
  Light gray creates visual separation from hero section
  Provides contrast for white cards
*/
.services-section {
  background-color: #f5f5f5; /* Light gray background */
}

/*
  Service image card styling
  Adds rounded corners and shadow for modern look
*/
.service-image-card {
  border-radius: 12px !important; /* Rounded corners */
  overflow: hidden; /* Ensures image respects border radius */
  transition: transform 0.3s ease; /* Smooth hover animation */
}

/*
  Image card hover effect
  Subtle lift on hover for interactivity
*/
.service-image-card:hover {
  transform: translateY(-8px); /* Lift effect */
}

/*
  Services list styling
  Removes default list styling for cleaner look
*/
.services-list {
  background: transparent !important;
}

/*
  Individual service item styling
  Adds background and padding for card-like appearance
*/
.service-item {
  background-color: white;
  border-radius: 8px;
  padding: 16px !important;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* Subtle shadow */
}

/*
  Service item hover effect
  Increases shadow and adds slight scale for feedback
*/
.service-item:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15); /* Stronger shadow */
  transform: translateX(8px); /* Slide right slightly */
}

/*
  Info card styling
  White cards with rounded corners and consistent spacing
  Equal height ensures aligned grid
*/
.info-card {
  border-radius: 12px !important;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

/*
  Info card hover effect
  Lifts card and increases shadow on hover
*/
.info-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important;
}

/*
  Benefit item styling
  Centers content and adds consistent spacing
*/
.benefit-item {
  padding: 20px;
  text-align: center;
}

/*
  CTA button styling
  Extra large, prominent button with animation
*/
.cta-btn {
  min-height: 70px !important;
  font-size: 1.25rem !important;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

/*
  CTA button hover effect
  Lifts button and adds stronger shadow
*/
.cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3) !important;
}

/*
  RESPONSIVE DESIGN - Mobile adjustments
  Optimizes layout and spacing for smaller screens
*/

/* Tablets and smaller */
@media (max-width: 960px) {
  /* Reduce image height on tablets */
  .service-image-card .v-img {
    height: 400px !important;
  }

  /* Add spacing between stacked columns */
  .order-1 {
    margin-bottom: 32px;
  }
}

/* Mobile phones */
@media (max-width: 600px) {
  /* Further reduce image height on mobile */
  .service-image-card .v-img {
    height: 300px !important;
  }

  /* Reduce service item padding on mobile */
  .service-item {
    padding: 12px !important;
  }

  /* Reduce icon sizes on mobile for better fit */
  .service-item .v-icon {
    font-size: 32px !important;
  }

  /* Stack info cards with spacing */
  .info-card {
    margin-bottom: 16px;
  }

  /* Reduce benefit item padding on mobile */
  .benefit-item {
    padding: 12px;
  }
}
</style>

<template>
  <!--
    ABOUT/SERVICES SECTION
    Displays services offered, service area, and business information
    Uses alternating light gray background for visual separation
  -->
  <v-container
    fluid
    class="services-section py-16"
  >
    <!--
      Main container with max width for readability
      Centers content on large screens
    -->
    <v-container>
      <!--
        SECTION HEADER
        Large, centered title to introduce the services section
      -->
      <v-row justify="center" class="mb-12">
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 font-weight-bold primary--text mb-4">
            What We Repair
          </h2>
          <p class="text-h6 grey--text text--darken-1">
            Professional Small Engine Repair Services in Brevard County, FL
          </p>
        </v-col>
      </v-row>

      <!--
        CONTENT ROW - Two column layout on desktop, stacked on mobile
        Left: Service image
        Right: Service list and details
      -->
      <v-row align="center" class="mb-8">
        <!--
          SERVICE IMAGE COLUMN
          Shows professional image of small engine repair work
          order-2 on mobile puts image below text for better flow
        -->
        <v-col
          cols="12"
          md="6"
          class="order-md-1 order-2"
        >
          <v-card elevation="8" class="service-image-card">
            <v-img
              src="@/assets/chris and son working in garage.png"
              alt="Small engine repair service"
              height="500"
              cover
            >
              <!--
                Gradient overlay on image for visual interest
                Adds depth and makes image blend with design
              -->
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-card>
        </v-col>

        <!--
          SERVICES LIST COLUMN
          Lists all equipment types serviced
          order-1 on mobile puts text above image
        -->
        <v-col
          cols="12"
          md="6"
          class="order-md-2 order-1"
        >
          <!--
            Services list with icons
            Each service type gets an icon and description
            Large text for senior-friendly readability
          -->
          <v-list class="services-list transparent">
            <!--
              Individual service items
              v-for loops through servicesOffered array
              Each item has icon, title, and is clickable for expansion
            -->
            <v-list-item
              v-for="(service, index) in servicesOffered"
              :key="index"
              class="mb-4 service-item"
            >
              <!-- Icon for each service type -->
              <v-list-item-icon class="mr-4">
                <v-icon
                  color="accent"
                  size="40"
                >
                  {{ service.icon }}
                </v-icon>
              </v-list-item-icon>

              <!-- Service name and description -->
              <v-list-item-content>
                <v-list-item-title class="text-h5 font-weight-bold mb-2">
                  {{ service.name }}
                </v-list-item-title>
                <v-list-item-subtitle class="text-h6 grey--text text--darken-2">
                  {{ service.description }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>

      <!--
        BUSINESS DETAILS SECTION
        Three column layout with key business information
        Service type, location, and availability
      -->
      <v-row justify="center" class="mt-12">
        <!--
          INFO CARDS - Three cards with business details
          Each card uses v-card for elevation and styling
          Icons make information scannable for senior users
        -->

        <!-- SHOP-ONLY SERVICE CARD -->
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            class="info-card pa-6 text-center"
            elevation="4"
            height="100%"
          >
            <v-icon
              color="primary"
              size="64"
              class="mb-4"
            >
              mdi-store
            </v-icon>
            <h3 class="text-h5 font-weight-bold mb-3 primary--text">
              Shop Service
            </h3>
            <p class="text-h6 grey--text text--darken-1">
              Bring your equipment to our shop for professional repair and maintenance
            </p>
          </v-card>
        </v-col>

        <!-- SERVICE AREA CARD -->
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            class="info-card pa-6 text-center"
            elevation="4"
            height="100%"
          >
            <v-icon
              color="primary"
              size="64"
              class="mb-4"
            >
              mdi-map-marker-radius
            </v-icon>
            <h3 class="text-h5 font-weight-bold mb-3 primary--text">
              Service Area
            </h3>
            <p class="text-h6 grey--text text--darken-1">
              Proudly serving all of Brevard County, Florida
            </p>
          </v-card>
        </v-col>

        <!-- AVAILABILITY CARD -->
        <v-col
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            class="info-card pa-6 text-center"
            elevation="4"
            height="100%"
          >
            <v-icon
              color="primary"
              size="64"
              class="mb-4"
            >
              mdi-calendar-check
            </v-icon>
            <h3 class="text-h5 font-weight-bold mb-3 primary--text">
              7 Days a Week
            </h3>
            <p class="text-h6 grey--text text--darken-1">
              Open Monday through Sunday, 8:00 AM - 6:00 PM
            </p>
          </v-card>
        </v-col>
      </v-row>

      <!--
        WHY CHOOSE US SECTION
        Highlights business strengths and value proposition
        Builds trust with potential customers
      -->
      <v-row justify="center" class="mt-16">
        <v-col cols="12" md="10" lg="8" class="text-center">
          <h3 class="text-h4 font-weight-bold primary--text mb-6">
            Why Choose Southern and Sons?
          </h3>

          <!--
            Benefits/Features Grid
            2 column layout on tablet+, single column on mobile
          -->
          <v-row class="mt-8">
            <!--
              Individual benefit items
              v-for loops through benefits array
              Each has an icon and description
            -->
            <v-col
              v-for="(benefit, index) in benefits"
              :key="index"
              cols="12"
              sm="6"
              class="mb-6"
            >
              <div class="benefit-item">
                <v-icon
                  color="accent"
                  size="48"
                  class="mb-3"
                >
                  {{ benefit.icon }}
                </v-icon>
                <h4 class="text-h5 font-weight-bold mb-2">
                  {{ benefit.title }}
                </h4>
                <p class="text-h6 grey--text text--darken-1">
                  {{ benefit.description }}
                </p>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!--
        CALL-TO-ACTION BUTTON
        Encourages users to request a quote
        Large, prominent button with accent color
      -->
      <v-row justify="center" class="mt-12">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-btn
            color="accent"
            x-large
            block
            depressed
            @click="scrollToQuote"
            class="cta-btn py-7"
            elevation="4"
          >
            <v-icon left large>mdi-file-document-edit</v-icon>
            <span class="text-h6 font-weight-bold">Get Your Free Quote</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
