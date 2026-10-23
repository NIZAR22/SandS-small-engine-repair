import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')

// Log successful initialization in development mode
if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable-next-line no-console */
  console.log('Vue app initialized')
}
