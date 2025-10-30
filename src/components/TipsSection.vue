<script>
export default {
  name: 'TipsSection',

  // Component data - reactive properties
  data: () => ({
    // Business phone number for Call Now button
    // TODO: Replace with actual business phone number
    phoneNumber: '3215550123',

    // Array of maintenance tips
    // Each tip has title, description, icon, and category
    // TODO: Replace with actual maintenance tips specific to small engines
    maintenanceTips: [
      {
        title: 'Check Oil Regularly',
        description: 'Check your engine oil before each use. Low or dirty oil can cause serious engine damage. Change oil every 25-50 hours of operation or at least once per season.',
        icon: 'mdi-oil',
        category: 'Routine Maintenance'
      },
      {
        title: 'Clean or Replace Air Filter',
        description: 'A dirty air filter restricts airflow and reduces engine performance. Clean foam filters with soap and water, replace paper filters when dirty. Check monthly during heavy use.',
        icon: 'mdi-air-filter',
        category: 'Routine Maintenance'
      },
      {
        title: 'Inspect Spark Plug',
        description: 'Remove and inspect the spark plug annually. Look for wear, carbon buildup, or damage. Clean with a wire brush or replace if worn. Proper gap ensures easy starting.',
        icon: 'mdi-flash',
        category: 'Annual Service'
      },
      {
        title: 'Use Fresh Fuel',
        description: 'Old fuel causes starting problems and engine damage. Use fuel within 30 days or add stabilizer. Drain fuel before long-term storage to prevent carburetor clogging.',
        icon: 'mdi-gas-station',
        category: 'Fuel Management'
      },
      {
        title: 'Keep It Clean',
        description: 'Remove grass, dirt, and debris after each use. Clean cooling fins and air vents to prevent overheating. A clean engine runs cooler and lasts longer.',
        icon: 'mdi-broom',
        category: 'Routine Maintenance'
      },
      {
        title: 'Sharpen Blades',
        description: 'For mowers, sharp blades cut cleanly and reduce engine strain. Dull blades tear grass and stress the engine. Sharpen or replace blades at least once per season.',
        icon: 'mdi-knife',
        category: 'Seasonal Care'
      }
    ]
  }),

  methods: {
    /**
     * Emits event to scroll to quote section
     * Parent component will handle the actual scrolling
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
  Tips section background
  White background contrasts with gray services section
  Creates clean, readable layout
*/
.tips-section {
  background-color: #ffffff; /* White background */
}

/*
  Tip card styling
  Cards have rounded corners and shadow
  Hover effects provide interactive feedback
*/
.tip-card {
  border-radius: 12px !important;
  transition: all 0.3s ease;
  height: 100%; /* Equal height cards in grid */
  display: flex;
  flex-direction: column;
  border-left: 4px solid #F57C00; /* Orange accent border on left */
}

/*
  Tip card hover effect
  Lifts card and increases shadow for interactivity
*/
.tip-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important;
}

/*
  Icon container styling
  Creates circular background for icons
  Provides visual consistency across all tip cards
*/
.icon-container {
  width: 80px;
  height: 80px;
  border-radius: 50%; /* Circular shape */
  background-color: #FFF3E0; /* Light orange background */
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto; /* Center horizontally */
}

/*
  Category badge styling
  Small pill-shaped badge to categorize tips
  Helps users quickly identify tip type
*/
.category-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  background-color: #E3F2FD; /* Light blue background */
  color: #1976D2; /* Primary blue text */
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/*
  Disclaimer section styling
  Important safety notice at bottom of tips
  Uses light background to stand out
*/
.disclaimer-section {
  background-color: #FFF3E0; /* Light orange background */
  border-radius: 12px;
  border: 2px solid #F57C00; /* Orange border */
}

/*
  CTA button styling in tips section
  Matches other CTA buttons throughout site
*/
.tips-cta-btn {
  min-height: 70px !important;
  font-size: 1.25rem !important;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

/*
  CTA button hover effect
*/
.tips-cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3) !important;
}

/*
  RESPONSIVE DESIGN - Mobile adjustments
  Optimizes layout and spacing for smaller screens
*/

/* Mobile phones */
@media (max-width: 600px) {
  /* Reduce icon size on mobile */
  .icon-container {
    width: 64px;
    height: 64px;
  }

  .icon-container .v-icon {
    font-size: 36px !important;
  }

  /* Add spacing between stacked cards */
  .tip-card {
    margin-bottom: 16px;
  }

  /* Reduce padding in disclaimer on mobile */
  .disclaimer-section {
    padding: 16px !important;
  }
}
</style>

<template>
  <!--
    TIPS SECTION
    Displays DIY maintenance tips for small engine equipment
    Educates customers and builds trust through helpful content
  -->
  <v-container
    fluid
    class="tips-section py-16 pa-0 ma-0"
  >
    <!--
      Main container with max width for readability
      Centers content on large screens
    -->
    <v-container>
      <!--
        SECTION HEADER
        Large, centered title to introduce tips section
      -->
      <v-row justify="center" class="mb-12">
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 font-weight-bold primary--text mb-4">
            DIY Maintenance Tips
          </h2>
          <p class="text-h6 grey--text text--darken-1">
            Keep Your Small Engines Running Smoothly with These Simple Tips
          </p>
        </v-col>
      </v-row>

      <!--
        TIPS GRID
        Displays tips in card format
        2 columns on desktop, 1 column on mobile for readability
      -->
      <v-row>
        <!--
          Individual tip cards
          v-for loops through maintenanceTips array
          Each card has icon, category, title, and description
        -->
        <v-col
          v-for="(tip, index) in maintenanceTips"
          :key="index"
          cols="12"
          md="6"
          class="mb-4"
        >
          <v-card
            class="tip-card pa-6"
            elevation="4"
          >
            <!--
              Icon container
              Circular background with colored icon
            -->
            <div class="icon-container mb-4">
              <v-icon
                color="accent"
                size="48"
              >
                {{ tip.icon }}
              </v-icon>
            </div>

            <!--
              Category badge
              Shows tip category (Routine, Annual, etc.)
            -->
            <div class="text-center mb-3">
              <span class="category-badge">
                {{ tip.category }}
              </span>
            </div>

            <!--
              Tip title
              Bold, prominent heading for each tip
            -->
            <h3 class="text-h5 font-weight-bold text-center mb-4 primary--text">
              {{ tip.title }}
            </h3>

            <!--
              Tip description
              Detailed explanation of the maintenance task
              Large text for senior-friendly readability
            -->
            <p class="text-h6 grey--text text--darken-1 text-center">
              {{ tip.description }}
            </p>
          </v-card>
        </v-col>
      </v-row>

      <!--
        DISCLAIMER SECTION
        Important safety notice about professional service
        Stands out with colored background
      -->
      <v-row justify="center" class="mt-12">
        <v-col cols="12" md="10" lg="8">
          <div class="disclaimer-section pa-8">
            <v-row align="center">
              <v-col cols="12" sm="2" class="text-center">
                <v-icon
                  color="accent"
                  size="64"
                >
                  mdi-alert-circle
                </v-icon>
              </v-col>
              <v-col cols="12" sm="10">
                <h3 class="text-h5 font-weight-bold mb-3">
                  When to Call a Professional
                </h3>
                <p class="text-h6 mb-0">
                  While these tips help maintain your equipment, some repairs require professional expertise.
                  If you experience persistent starting problems, unusual noises, excessive vibration, or loss of power,
                  bring your equipment to Southern and Sons for a professional diagnosis and repair.
                </p>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>

      <!--
        CALL-TO-ACTION SECTION
        Encourages users to request professional service
        Two buttons: Request Quote and Call Now
      -->
      <v-row justify="center" class="mt-12">
        <v-col cols="12" class="text-center mb-6">
          <h3 class="text-h4 font-weight-bold primary--text">
            Need Professional Service?
          </h3>
          <p class="text-h6 grey--text text--darken-1 mt-3">
            Our expert technicians are here to help with all your small engine repair needs
          </p>
        </v-col>
      </v-row>

      <v-row justify="center">
        <!-- Request Quote Button -->
        <v-col
          cols="12"
          sm="6"
          md="5"
          lg="4"
          class="px-2"
        >
          <v-btn
            color="accent"
            x-large
            block
            depressed
            @click="scrollToQuote"
            class="tips-cta-btn py-7"
            elevation="4"
          >
            <v-icon left large>mdi-file-document-edit</v-icon>
            <span class="text-h6 font-weight-bold">Request a Quote</span>
          </v-btn>
        </v-col>

        <!-- Call Now Button -->
        <v-col
          cols="12"
          sm="6"
          md="5"
          lg="4"
          class="px-2"
        >
          <v-btn
            color="primary"
            x-large
            block
            depressed
            :href="'tel:' + phoneNumber"
            class="tips-cta-btn py-7"
            elevation="4"
          >
            <v-icon left large>mdi-phone</v-icon>
            <span class="text-h6 font-weight-bold">Call Now</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
