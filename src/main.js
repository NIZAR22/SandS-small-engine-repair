import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import emailjs from '@emailjs/browser'

Vue.config.productionTip = false

// Initialize EmailJS with your public key
emailjs.init(process.env.VUE_APP_EMAILJS_PUBLIC_KEY)

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

// Log successful initialization in development mode
if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable-next-line no-console */
  console.log('Vue app initialized')
}
