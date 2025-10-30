import Vue from 'vue'
import Vuetify from 'vuetify'
import emailjs from '@emailjs/browser'

// Mock EmailJS
jest.mock('@emailjs/browser', () => ({
  init: jest.fn(),
  send: jest.fn()
}))

Vue.use(Vuetify)

// Mock window.scrollTo for tests
window.scrollTo = jest.fn()