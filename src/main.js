import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import emailjs from '@emailjs/browser'

Vue.config.productionTip = false

// Initialize EmailJS with your public key
// blockHeadless rejects automated (headless) browsers and limitRate allows one
// request per browser every 10 seconds. Both run in the browser, so they only
// stop casual scripts; reCAPTCHA verification in the EmailJS template stops the rest.
emailjs.init({
  publicKey: process.env.VUE_APP_EMAILJS_PUBLIC_KEY,
  blockHeadless: true,
  limitRate: {
    id: 'quote-form',
    throttle: 10000
  }
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

// Log successful initialization in development mode
if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable-next-line no-console */
  console.log('Vue app initialized')
}
