import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import QuoteForm from '@/components/QuoteForm.vue'
import emailjs from '@emailjs/browser'

const localVue = createLocalVue()

// Stand-in for Google's reCAPTCHA widget: renders nothing and records resets
const recaptchaReset = jest.fn()
const RecaptchaStub = {
  name: 'VueRecaptcha',
  render: h => h('div'),
  methods: { reset: recaptchaReset }
}

const validForm = {
  name: 'Test User',
  email: 'test@example.com',
  phone: '(321) 555-0123',
  message: 'Mower will not start'
}

// Let the awaited EmailJS promise settle
const flushPromises = () => new Promise(resolve => setTimeout(resolve))

describe('QuoteForm.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
    // Clear all mocks before each test
    jest.clearAllMocks()
    // Mock successful emailjs send
    emailjs.send.mockResolvedValue({ status: 200 })
  })

  const mountComponent = () => {
    return mount(QuoteForm, {
      localVue,
      vuetify,
      stubs: { VueRecaptcha: RecaptchaStub }
    })
  }

  // Fill in every field and tick the (stubbed) reCAPTCHA box
  const fillValidForm = async wrapper => {
    await wrapper.setData({ formData: { ...validForm } })
    wrapper.vm.onCaptchaVerified('test-token')
  }

  const sendButton = wrapper => wrapper.findAll('button').filter(b => b.text().includes('Send Quote Request')).at(0)

  it('keeps the send button enabled so a click can point out missing fields', () => {
    const wrapper = mountComponent()

    expect(sendButton(wrapper).attributes('disabled')).toBeUndefined()
  })

  it('does not send an incomplete form and shows what is missing', async () => {
    const wrapper = mountComponent()

    await wrapper.find('form').trigger('submit')

    expect(emailjs.send).not.toHaveBeenCalled()
    expect(wrapper.text()).toContain('Name is required')
  })

  it('formats phone numbers and drops a leading +1', async () => {
    const wrapper = mountComponent()

    await wrapper.setData({ formData: { phone: '+1 (321) 345-1480' } })
    wrapper.vm.formatPhoneNumber()

    expect(wrapper.vm.formData.phone).toBe('(321) 345-1480')
  })

  it('asks for the reCAPTCHA tick and clears the hint once ticked', async () => {
    const wrapper = mountComponent()

    await wrapper.setData({ formData: { ...validForm } })
    await wrapper.find('form').trigger('submit')

    expect(emailjs.send).not.toHaveBeenCalled()
    expect(wrapper.text()).toContain('Please tick "I\'m not a robot" before sending.')

    wrapper.vm.onCaptchaVerified('test-token')
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).not.toContain('Please tick "I\'m not a robot" before sending.')
  })

  it('tells the user to call when reCAPTCHA fails, until the box can be ticked again', async () => {
    const wrapper = mountComponent()

    wrapper.vm.onCaptchaError()
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).toContain('The spam check couldn\'t load')
    expect(wrapper.text()).toContain('(321) 339-1790')

    wrapper.vm.onCaptchaVerified('test-token')
    await wrapper.vm.$nextTick()
    expect(wrapper.text()).not.toContain('The spam check couldn\'t load')
  })

  it('sends the reCAPTCHA token, no recipient address, and resets the widget', async () => {
    const wrapper = mountComponent()

    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(emailjs.send).toHaveBeenCalledTimes(1)
    const templateParams = emailjs.send.mock.calls[0][2]
    expect(templateParams).toMatchObject({
      from_name: 'Test User',
      reply_to: 'test@example.com',
      phone_number: '(321) 555-0123',
      message: 'Mower will not start',
      'g-recaptcha-response': 'test-token'
    })
    expect(templateParams).not.toHaveProperty('to_email')
    expect(wrapper.vm.showSuccess).toBe(true)
    expect(wrapper.vm.showError).toBe(false)
    expect(recaptchaReset).toHaveBeenCalled()
    expect(wrapper.vm.recaptchaVerified).toBe(false)
  })

  it('asks the user to wait when EmailJS rate-limits the request', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    emailjs.send.mockRejectedValue({ status: 429, text: 'Too Many Requests' })
    const wrapper = mountComponent()

    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.vm.showError).toBe(true)
    expect(wrapper.vm.errorMessage).toBe('Please wait a few seconds before sending another request.')
    expect(consoleError).toHaveBeenCalled()
    consoleError.mockRestore()
  })

  it('offers the business phone number when sending fails', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {})
    emailjs.send.mockRejectedValue(new Error('network down'))
    const wrapper = mountComponent()

    await fillValidForm(wrapper)
    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.vm.errorMessage).toContain('(321) 339-1790')
    expect(recaptchaReset).toHaveBeenCalled()
    consoleError.mockRestore()
  })
})
