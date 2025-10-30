import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import QuoteForm from '@/components/QuoteForm.vue'
import emailjs from '@emailjs/browser'

const localVue = createLocalVue()

describe('QuoteForm.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify()
    // Clear all mocks before each test
    jest.clearAllMocks()
    // Mock successful emailjs send
    emailjs.send.mockResolvedValue({ status: 200 })
  })

  const mountComponent = (options = {}) => {
    return mount(QuoteForm, {
      localVue,
      vuetify,
      ...options
    })
  }

  it('validates form fields on submit', async () => {
    const wrapper = mountComponent()
    const form = wrapper.find('form')
    
    await form.trigger('submit.prevent')
    expect(wrapper.vm.valid).toBe(false)
  })

  it('formats phone number correctly', async () => {
    const wrapper = mountComponent()
    
    await wrapper.setData({
      formData: { phone: '1234567890' }
    })
    wrapper.vm.formatPhoneNumber()
    
    expect(wrapper.vm.formData.phone).toBe('(123) 456-7890')
  })

  it('shows success message after successful submission', async () => {
    const wrapper = mountComponent()
    
    // Set valid form data
    await wrapper.setData({
      formData: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '(123) 456-7890',
        message: 'Test message'
      },
      valid: true,
      recaptchaVerified: true
    })

    // Mock form validation
    wrapper.vm.$refs.form = {
      validate: () => true,
      reset: jest.fn()
    }
    
    await wrapper.find('form').trigger('submit.prevent')
    
    // Verify emailjs.send was called
    expect(emailjs.send).toHaveBeenCalledWith(
      wrapper.vm.emailConfig.serviceId,
      wrapper.vm.emailConfig.templateId,
      expect.objectContaining({
        to_email: 'cambizz10@gmail.com'
      })
    )
    
    // Wait for the next tick to allow promises to resolve
    await wrapper.vm.$nextTick()
    
    expect(wrapper.vm.showSuccess).toBe(true)
  })
})