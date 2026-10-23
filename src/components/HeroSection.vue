<script>
import business from '@/config/business'
import { formatPhone } from '@/utils/format'

export default {
  name: 'HeroSection',

  // Component data - reactive properties
  data: () => ({
    // Business phone number
    phoneNumber: business.phone
  }),

  // Computed properties - derived reactive data
  computed: {
    /**
     * Formats phone number for display
     * Converts 3213391790 to (321) 339-1790
     * Makes number more readable and professional
     * @returns {string} Formatted phone number
     */
    formattedPhoneNumber () {
      return formatPhone(this.phoneNumber)
    }
  }
}
</script>

<style scoped>
/*
  Scoped styles - only apply to this component
  Hero section requires custom styling beyond Vuetify defaults
*/

/*
  Hero container - full viewport height
  Creates dramatic first impression
  Ensures hero takes up entire screen on load
*/
.hero-container {
  min-height: 100vh; /* Minimum 100% of viewport height */
  position: relative; /* Needed for absolute positioning of children */
  overflow: hidden; /* Prevents content overflow */
}

/*
  Background image container
  Holds the hero background image with overlay
  Uses background-image for easy replacement
*/
.hero-background {
  /*
    Background image - stock photo of mechanic working on small engine
    Served from src/assets (also used by the navbar in App.vue);
    replace hero.jpg with your own wide photo to change it
  */
  background-image: url('~@/assets/hero.jpg');

  /* Background image settings for optimal display */
  background-size: cover; /* Scale to cover entire container */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Don't repeat image */
  background-attachment: fixed; /* Parallax effect on scroll (optional) */

  /* Make background fill entire container */
  min-height: 100vh;
  width: 100%;

  /* Position for overlay */
  position: relative;

  /* Flexbox for vertical centering of content */
  display: flex;
  align-items: center;
  justify-content: center;
}

/*
  Dark overlay on background image
  Ensures white text is readable
  Semi-transparent black layer
*/
.hero-overlay {
  position: absolute; /* Position over background */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* 50% black opacity */
  z-index: 1; /* Layer above background, below content */
}

/*
  Content container positioning
  Ensures content appears above overlay
  Centers content vertically and horizontally
*/
.hero-content {
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 128px; /* Increased from 96px */
}

/* Adjust for mobile */
@media (max-width: 600px) {
  .hero-content {
    padding-top: 96px; /* Increased from 72px */
  }

  .hero-logo {
    margin-top: 3rem; /* Increased from 2rem */
  }
}

/* For medium screens */
@media (min-width: 601px) and (max-width: 960px) {
  .hero-content {
    padding-top: 112px; /* Increased from 84px */
  }
}

/*
  Hero title styling
  Extra large, bold text for maximum impact
  Text shadow improves readability on image background
*/
.hero-title {
  font-size: 3.5rem !important; /* 56px - very large for visibility */
  line-height: 1.2 !important;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8); /* Strong shadow for readability */
  letter-spacing: 0.5px;
}

/*
  Hero subtitle styling
  Slightly smaller than title but still prominent
*/
.hero-subtitle {
  font-size: 2.5rem !important; /* 40px */
  line-height: 1.3 !important;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.8);
  font-weight: 700 !important; /* Bold like the name above: it's part of the company name */
}

/*
  Family motto from the business card
  Sits right under the company name, so visitors see it first
*/
.hero-motto {
  font-size: 1.75rem !important; /* 28px */
  line-height: 1.4 !important;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  font-style: italic;
}

/*
  Tagline styling
  Key message - needs to be clearly readable
*/
.hero-tagline {
  font-size: 1.75rem !important; /* 28px */
  line-height: 1.4 !important;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  font-weight: 400 !important;
}

/*
  Subtext styling
  Supporting information
*/
.hero-subtext {
  font-size: 1.5rem !important; /* 24px */
  line-height: 1.5 !important;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.8);
  font-weight: 300 !important;
  opacity: 0.95;
}

/*
  Logo container spacing
  Adds breathing room around logo
*/
.hero-logo {
  filter: drop-shadow(2px 2px 8px rgba(0, 0, 0, 0.8)); /* Shadow for logo visibility */
}

/*
  CTA button customization
  Makes buttons extra prominent and clickable
*/
.hero-cta-btn {
  min-height: 70px !important; /* Tall buttons for easy clicking */
  font-size: 1.25rem !important; /* 20px */
  letter-spacing: 0.5px;
  transition: all 0.3s ease; /* Smooth hover animation */
}

/*
  Button hover effect
  Provides visual feedback on interaction
  Transform scales button slightly larger
*/
.hero-cta-btn:hover {
  transform: translateY(-3px); /* Lift effect */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3) !important; /* Stronger shadow */
}

/*
  Scroll indicator container
  Positions arrow at bottom of hero section
*/
.scroll-indicator {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%); /* Center horizontally */
}

/*
  Bounce animation for scroll indicator
  Draws attention to arrow, suggests scrolling
*/
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.bounce {
  animation: bounce 2s infinite; /* Continuous gentle bounce */
}

/*
  RESPONSIVE DESIGN - Mobile adjustments
  Reduces text sizes on smaller screens for better fit
  Maintains readability while preventing overflow
*/

/* Tablets and smaller */
@media (max-width: 960px) {
  .hero-title {
    font-size: 2.75rem !important; /* 44px */
  }

  .hero-subtitle {
    font-size: 2rem !important; /* 32px */
  }

  .hero-tagline,
  .hero-motto {
    font-size: 1.5rem !important; /* 24px */
  }

  .hero-subtext {
    font-size: 1.25rem !important; /* 20px */
  }

  .hero-cta-btn {
    min-height: 65px !important;
  }
}

/* Mobile phones */
@media (max-width: 600px) {
  .hero-title {
    font-size: 2.25rem !important; /* 36px */
  }

  .hero-subtitle {
    font-size: 1.75rem !important; /* 28px */
  }

  .hero-tagline,
  .hero-motto {
    font-size: 1.25rem !important; /* 20px */
  }

  .hero-subtext {
    font-size: 1.125rem !important; /* 18px */
  }

  /* Reduce logo size on very small screens (v-img renders a div, not an img) */
  .hero-logo .v-image {
    max-height: 150px !important;
  }

  /* Stack buttons vertically on mobile with spacing */
  .hero-cta-btn {
    min-height: 60px !important;
    margin-bottom: 16px;
  }

  /* Disable parallax effect on mobile for better performance */
  .hero-background {
    background-attachment: scroll;
  }
}

/* Extra small phones */
@media (max-width: 400px) {
  .hero-title {
    font-size: 1.875rem !important; /* 30px */
  }

  .hero-subtitle {
    font-size: 1.5rem !important; /* 24px */
  }
}
</style>

<template>
  <!--
    HERO SECTION - First thing visitors see
    Full viewport height with background image
    Contains business name, tagline, and main call-to-action buttons
  -->
  <v-container
    fluid
    class="hero-container pa-0 ma-0"
  >
    <!--
      Overlay div for background image and dark overlay
      Creates contrast for white text to be readable
      Uses CSS background-image for easy replacement
    -->
    <div class="hero-background">
      <!--
        Dark overlay to ensure text readability
        Semi-transparent black layer over background image
      -->
      <div class="hero-overlay"></div>

      <!--
        Content container - centered vertically and horizontally
        v-container with max-width keeps content readable on large screens
      -->
      <v-container class="hero-content">
        <v-row
          align="center"
          justify="center"
          class="fill-height"
        >
          <v-col
            cols="12"
            md="10"
            lg="8"
            class="text-center"
          >
            <!--
              BUSINESS LOGO
              Large logo display for brand recognition
              Uses contain to preserve aspect ratio
            -->
            <div class="hero-logo mb-6">
              <v-img
                src="@/assets/logo.png"
                alt="Southern and Sons Small Engine Repair Logo"
                contain
                max-height="200"
                max-width="300"
                class="mx-auto"
              />
            </div>

            <!--
              BUSINESS NAME
              Large, bold heading for immediate identification
              text-h2 is Vuetify's heading size (extra large)
              white--text ensures readability on dark background
              mb-4 adds bottom margin (16px with Vuetify's spacing scale)
            -->
            <h1 class="text-h2 font-weight-bold white--text mb-4 hero-title">
              Southern and Sons
            </h1>

            <!--
              Business type subtitle
              Slightly smaller than main title
              mb-6 adds more spacing before tagline
            -->
            <h2 class="text-h3 white--text mb-4 hero-subtitle">
              Small Engine Repair, LLC
            </h2>

            <!--
              FAMILY MOTTO
              The owner's line from the business card
            -->
            <p class="text-h5 white--text font-weight-medium mb-6 hero-motto">
              Honest repairs from our family to yours!
            </p>

            <!--
              TAGLINE
              Communicates value proposition and builds trust
              text-h5 is medium-large heading size
              mb-8 adds larger spacing before buttons
            -->
            <p class="text-h5 white--text mb-8 hero-tagline">
              Professional & Reliable Small Engine Repair in Brevard County
            </p>

            <!--
              Subtext with key benefits
              Reinforces expertise and convenience
              mb-10 adds extra spacing before CTA buttons
            -->
            <p class="text-h6 white--text mb-10 hero-subtext">
              Expert Service • Fast Turnaround • 7 Days a Week
            </p>

            <!--
              CALL-TO-ACTION BUTTON
              Large button with high contrast colors for visibility
            -->
            <v-row
              justify="center"
              class="mt-8"
            >
              <!--
                CALL NOW BUTTON
                Main CTA - direct phone call
                Orange accent color makes it stand out
                x-large size for senior-friendly clicking
                href with tel: link opens phone dialer on mobile
              -->
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
                  :href="'tel:' + phoneNumber"
                  class="hero-cta-btn py-7"
                  elevation="4"
                >
                  <v-icon left large>mdi-phone</v-icon>
                  <span class="text-h6 font-weight-bold">Call Now</span>
                </v-btn>
              </v-col>
            </v-row>

            <!--
              PHONE NUMBER DISPLAY
              Shows phone number prominently for easy reference
              Even if user doesn't click button, they can see number
              Especially helpful for desktop users
            -->
            <div class="mt-8">
              <p class="text-h5 white--text font-weight-medium">
                <v-icon color="white" large class="mr-2">mdi-phone</v-icon>
                {{ formattedPhoneNumber }}
              </p>
            </div>

            <!--
              SCROLL DOWN INDICATOR
              Animated arrow suggests there's more content below
              Improves user experience by indicating scrollable content
              Hidden on mobile to save space
            -->
            <div class="scroll-indicator mt-12 hidden-sm-and-down" style="pointer-events: none;">
              <v-icon
                color="white"
                x-large
                class="bounce"
              >
                mdi-chevron-down
              </v-icon>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-container>
</template>
