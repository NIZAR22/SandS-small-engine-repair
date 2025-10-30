import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/**
 * Vue Router configuration for single-page application
 * Uses hash mode for smooth scrolling navigation between sections
 * All routes point to the same component since this is a single-page site
 */
// const routes = [
//   {
//     path: '/',
//     name: 'Home',
//     component: () => import('../App.vue')
//   },
//   {
//     path: '/services',
//     name: 'Services',
//     component: () => import('../App.vue')
//   },
//   {
//     path: '/tips',
//     name: 'Tips',
//     component: () => import('../App.vue')
//   },
//   {
//     path: '/quote',
//     name: 'Quote',
//     component: () => import('../App.vue')
//   },
//   {
//     path: '/contact',
//     name: 'Contact',
//     component: () => import('../App.vue')
//   }
// ]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  // No routes needed since this is a single-page application
  // All navigation is handled by scrolling to sections
  routes: [],
  // Scroll behavior for smooth navigation
  // This function is called whenever navigation occurs
  scrollBehavior (to, from, savedPosition) {
    // If there's a saved position (user clicked back/forward), restore it
    if (savedPosition) {
      return savedPosition
    }

    // If navigating to a hash anchor (e.g., #contact), scroll to that element
    if (to.hash) {
      // Use setTimeout to ensure DOM is fully rendered before scrolling
      // This prevents scrolling before the target element exists
      return new Promise((resolve) => {
        setTimeout(() => {
          const element = document.querySelector(to.hash)
          if (element) {
            // Get the navigation bar height to offset scroll position
            // This prevents the fixed navbar from covering the section header
            const navbarHeight = document.querySelector('.v-app-bar')?.offsetHeight || 64

            // Calculate scroll position accounting for navbar
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = elementPosition - navbarHeight - 20 // Extra 20px padding

            // Smooth scroll to the calculated position
            resolve({
              // Use 'behavior: smooth' for animated scrolling
              behavior: 'smooth',
              // x: horizontal position (0 = left edge)
              x: 0,
              // y: vertical position calculated above
              y: offsetPosition
            })
          } else {
            // If element not found, scroll to top
            resolve({ x: 0, y: 0 })
          }
        }, 100) // 100ms delay ensures DOM is ready
      })
    }

    // Default: scroll to top of page for any other navigation
    return { x: 0, y: 0 }
  }
})

export default router
