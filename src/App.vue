<script>
// Import all section components
// These will be rendered in order in the template above
import HeroSection from './components/HeroSection.vue'
import AboutServices from './components/AboutServices.vue'
import TipsSection from './components/TipsSection.vue'
import QuoteForm from './components/QuoteForm.vue'
import ContactSection from './components/ContactSection.vue'
import AppFooter from './components/Footer.vue'

export default {
  name: 'App',

  // Register imported components so they can be used in template
  components: {
    HeroSection,
    AboutServices,
    TipsSection,
    QuoteForm,
    ContactSection,
    AppFooter
  },

  // Component data - reactive properties
  data: () => ({
    // Controls mobile navigation drawer open/closed state
    drawer: false,

    // Tracks which section is currently visible in viewport
    // Used to highlight active navigation item
    activeSection: 'hero',

    // Business phone number for floating call button
    // TODO: Replace with actual phone number
    phoneNumber: '3213451480',

    // Navigation items for mobile drawer
    // Each item maps to a section id
    navItems: [
      {
        id: 'hero',
        title: 'Home',
        icon: 'mdi-home'
      },
      {
        id: 'services',
        title: 'Services',
        icon: 'mdi-tools'
      },
      {
        id: 'tips',
        title: 'Tips',
        icon: 'mdi-lightbulb-on'
      },
      {
        id: 'quote',
        title: 'Get Quote',
        icon: 'mdi-file-document-edit'
      },
      {
        id: 'contact',
        title: 'Contact',
        icon: 'mdi-phone'
      }
    ],

    // Flag to track if the user is on a mobile device
    // Initial value set based on window width
    isMobile: window.innerWidth <= 600
  }),

  // Lifecycle hook - runs after component is mounted to DOM
  mounted () {
    // Set up resize and scroll listeners
    // Resize listener updates isMobile flag
    // Scroll listener tracks active section
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('scroll', this.onScroll)

    // Initial check for active section on page load
    this.onScroll()
  },

  // Lifecycle hook - runs before component is destroyed
  beforeDestroy () {
    // Remove resize and scroll listeners to prevent memory leaks
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('scroll', this.onScroll)
  },

  methods: {
    /**
     * Smooth scroll to a specific section
     * @param {string} sectionId - The id of the section to scroll to
     */
    scrollToSection (sectionId) {
      // Find the target section element by id
      const element = document.getElementById(sectionId)

      if (element) {
        // Get navbar height to offset scroll position
        // This prevents the navbar from covering the section title
        // Using a larger offset because prominent navbar is taller
        const navbarHeight = 128 // Prominent navbar height

        // Calculate exact scroll position
        // getBoundingClientRect gives position relative to viewport
        // window.pageYOffset adds current scroll position
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset

        // Subtract navbar height plus extra padding (20px) for breathing room
        const offsetPosition = elementPosition - navbarHeight - 20

        // Perform smooth scroll animation
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth' // Smooth animation instead of instant jump
        })
      }
    },

    /**
     * Scroll to section from mobile drawer
     * Same as scrollToSection but also closes the drawer
     * @param {string} sectionId - The id of the section to scroll to
     */
    scrollToSectionMobile (sectionId) {
      // Close the mobile drawer first
      this.drawer = false

      // Small delay to let drawer close animation complete
      // This creates smoother user experience
      setTimeout(() => {
        this.scrollToSection(sectionId)
      }, 300) // 300ms matches Vuetify's drawer animation duration
    },

    /**
     * Scroll event handler - updates active section indicator
     * Tracks which section is currently in viewport
     */
    onScroll () {
      // Get all section elements
      const sections = document.querySelectorAll('section[id]')

      // Current scroll position plus offset for navbar
      // Using larger offset because prominent navbar is taller initially
      const scrollPosition = window.scrollY + 150

      // Loop through sections to find which one is currently visible
      sections.forEach(section => {
        // Get section's position and height
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute('id')

        // Check if current scroll position is within this section
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Update active section for navigation highlighting
          this.activeSection = sectionId
        }
      })
    },

    /**
     * Handle window resize event
     * Updates isMobile flag based on current window width
     */
    handleResize () {
      this.isMobile = window.innerWidth <= 600
    }
  }
}
</script>

<style scoped>
/*
  Scoped styles - only apply to this component
  Additional styling to enhance Vuetify's defaults
*/

/*
  Fix for mobile viewport - ensure full width content
  Remove default Vuetify container padding on mobile
*/
::v-deep .v-application {
  overflow-x: hidden; /* Prevent horizontal scroll */
}

::v-deep .v-main {
  padding: 0 !important; /* Remove default padding */
}

::v-deep section {
  width: 100%;
  overflow-x: hidden; /* Prevent horizontal overflow */
}

/*
  Active navigation button styling
  Makes it obvious which section user is currently viewing
  Orange accent color for high visibility
*/
.accent--text {
  font-weight: 700 !important;
}

/*
  Floating call button positioning and animation
  Ensures it doesn't overlap with content on mobile
*/
.floating-call-btn {
  /* Bottom offset increased on mobile to avoid gesture areas */
  margin-bottom: 16px !important;
  margin-right: 16px !important;

  /* Pulse animation to draw attention */
  animation: pulse 2s infinite;
}

/*
  Pulse animation keyframes
  Creates subtle pulsing effect to draw eye to call button
*/
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(245, 124, 0, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(245, 124, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(245, 124, 0, 0);
  }
}

/*
  Section spacing
  Adds consistent padding between sections
  Accounts for prominent navbar height
*/
section {
  scroll-margin-top: 128px; /* Offset for prominent navbar */
}

/*
  Navigation button hover effects
  Provides visual feedback on interaction
*/
.v-btn--text:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

/*
  Ensure logo and title are vertically centered
  Even when navbar shrinks
*/
.v-toolbar__title {
  display: flex !important;
  align-items: center !important;
}

/*
  Mobile-specific adjustments
  Increases touch targets and spacing on small screens
*/
@media (max-width: 960px) {
  .floating-call-btn {
    margin-bottom: 80px !important; /* More clearance on mobile */
  }

  section {
    scroll-margin-top: 64px; /* Smaller offset for mobile navbar */
  }
}

/*
  Smooth transitions for all interactive elements
  Improves perceived performance and user experience
*/
.v-btn {
  transition: all 0.3s ease !important;
}
</style>

<template>
  <!--
    v-app: Root Vuetify component - required wrapper for all Vuetify apps
    Provides theme context and app-level functionality
  -->
  <v-app>
    <!--
      NAVIGATION BAR - Shrinking header with background image
      app prop makes it part of v-app layout system (affects v-main padding)
      fixed keeps navbar always visible at top
      shrink-on-scroll reduces height when user scrolls down
      prominent makes the header taller initially for dramatic effect
      fade-img-on-scroll fades out background image when scrolling
      src provides background image for the navbar
      color provides fallback color when image fades out
      elevate-on-scroll adds shadow when scrolling
    -->
    <v-app-bar
      app
      fixed
      color="primary"
      dark
      shrink-on-scroll
      prominent
      src="https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=1920"
      fade-img-on-scroll
      elevate-on-scroll
    >
      <!--
        Custom gradient overlay on navbar background image
        Creates professional look and ensures text readability
        v-slot:img gives us access to the image props
      -->
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(25, 118, 210, .85), rgba(21, 101, 192, .85)"
        ></v-img>
      </template>

      <!--
        MOBILE MENU BUTTON - Shows when navigation buttons would be too crowded
        Opens navigation drawer when clicked
        Shows on all screens except xl (extra large 1904px+)
      -->
      <v-app-bar-nav-icon
        v-if="isMobile"
        @click="drawer = !drawer"
        large
      ></v-app-bar-nav-icon>

      <!-- LOGO AND BUSINESS NAME - Always visible -->
      <v-toolbar-title class="d-flex align-center pa-0" style="cursor: pointer;" @click="scrollToSection('hero')">
        <v-img
          src="@/assets/logo-transparent.png"
          alt="Southern and Sons Logo"
          contain
          height="36"
          width="36"
          class="mx-2"
        />
        <div class="d-flex flex-column business-name">
          <div class="text-subtitle-2 font-weight-bold text-uppercase">Southern and Sons</div>
          <div class="text-caption text-uppercase">Small Engine Repair</div>
        </div>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!--
        DESKTOP NAVIGATION - Only shows on extra large screens
        Large clickable buttons for each section
        Hidden on 1904px and below to prevent crowding
      -->
      <div v-if="!isMobile" class="d-flex align-center">
        <v-btn
          v-for="item in navItems"
          :key="item.id"
          text
          large
          @click="scrollToSection(item.id)"
          :class="{ 'accent--text': activeSection === item.id }"
          class="mx-1"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </div>
    </v-app-bar>

    <!--
      MOBILE NAVIGATION DRAWER - Slides in from LEFT on mobile/tablet
      v-model syncs with drawer data property
      app prop integrates with v-app layout
      temporary closes when user clicks outside or selects item
      left positions drawer on LEFT side of screen (changed from right)
    -->
    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      left
      width="280"
    >
      <!--
        Drawer header with business name and close button
        Uses primary color for consistency
      -->
      <v-list-item class="primary white--text px-4 py-3">
        <v-list-item-content>
          <v-list-item-title class="text-h6 font-weight-bold">
            Southern and Sons
          </v-list-item-title>
          <v-list-item-subtitle class="white--text">
            Small Engine Repair
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn
            icon
            @click="drawer = false"
            color="white"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-divider></v-divider>

      <!--
        Mobile navigation list
        Each item scrolls to section and closes drawer
        Large text and icons for senior-friendly mobile experience
      -->
      <v-list nav dense class="py-2">
        <v-list-item
          v-for="item in navItems"
          :key="item.id"
          @click="scrollToSectionMobile(item.id)"
          link
          class="my-1"
        >
          <v-list-item-icon>
            <v-icon size="28" color="primary">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <!--
        Call button in drawer for easy access
        Large and prominent for senior users
      -->
      <v-list class="pa-4">
        <v-btn
          color="accent"
          large
          block
          :href="'tel:' + phoneNumber"
          class="py-6"
        >
          <v-icon left>mdi-phone</v-icon>
          Call Now
        </v-btn>
      </v-list>
    </v-navigation-drawer>

    <!--
      MAIN CONTENT AREA
      v-main is required container for app content
      Automatically adds padding for app-bar and other app-level components
      id is used as scroll-target for the app-bar
    -->
    <v-main id="scrolling-content">
      <!--
        All section components rendered here
        Each section has an id for scroll navigation
        Sections are imported and registered in the components object below
      -->

      <!-- Hero Section - Top of page with logo and main CTAs -->
      <section id="hero">
        <HeroSection @scroll-to="scrollToSection" />
      </section>

      <!-- About/Services Section - What we repair and service area -->
      <section id="services">
        <AboutServices @scroll-to-quote="scrollToSection('quote')" />
      </section>

      <!-- Tips Section - DIY maintenance advice -->
      <section id="tips">
        <TipsSection @scroll-to-quote="scrollToSection('quote')" />
      </section>

      <!-- Quote Form Section - Contact form with EmailJS -->
      <section id="quote">
        <QuoteForm />
      </section>

      <!-- Contact Section - Hours, phone, email, location -->
      <section id="contact">
        <ContactSection />
      </section>

      <!-- Footer - Copyright and social links -->
      <AppFooter />
    </v-main>

    <!--
      FLOATING CALL NOW BUTTON - Always visible on screen
      Sticky button in bottom-right corner
      High visibility with accent (orange) color
      Opens phone dialer on click (tel: link)
      fab (floating action button) style
      fixed keeps it visible while scrolling
      bottom and right position it in corner
      x-large makes it very visible for seniors
    -->
    <v-btn
      fab
      fixed
      bottom
      right
      color="accent"
      x-large
      :href="'tel:' + phoneNumber"
      class="floating-call-btn"
      elevation="8"
    >
      <v-icon large>mdi-phone</v-icon>
    </v-btn>
  </v-app>
</template>
