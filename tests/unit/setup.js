import Vue from 'vue'
import Vuetify from 'vuetify'

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  init: jest.fn(),
  send: jest.fn()
}))

Vue.use(Vuetify)

// jsdom doesn't implement scrolling; mock the APIs the components call
window.scrollTo = jest.fn()
Element.prototype.scrollIntoView = jest.fn()
