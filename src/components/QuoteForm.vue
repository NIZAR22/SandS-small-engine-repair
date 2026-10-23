<script>
// Import EmailJS for form submission without backend server
import emailjs from '@emailjs/browser'
import { VueRecaptcha } from 'vue-recaptcha'
import business from '@/config/business'
import { formatPhone, formatPhoneInput } from '@/utils/format'

// How long to wait for Google's reCAPTCHA widget before telling the user it didn't load
const CAPTCHA_LOAD_TIMEOUT = 15000

export default {
  name: 'QuoteForm',
  components: {
    VueRecaptcha
  },
  // Component data - reactive properties
  data: () => ({
    // Form loading state - shows spinner during email sending
    loading: false,

    // Success/error message display flags
    showSuccess: false,
    showError: false,
    errorMessage: '',

    // Business phone number for the "call us instead" fallbacks
    businessPhone: business.phone,

    // EmailJS configuration
    emailConfig: {
      serviceId: process.env.VUE_APP_EMAILJS_SERVICE_ID,
      templateId: process.env.VUE_APP_EMAILJS_TEMPLATE_ID
    },

    // Form field values
    formData: {
      name: '',
      email: '',
      phone: '',
      message: ''
    },

    // Validation rules for form fields
    // These are applied to v-text-field components via :rules prop
    nameRules: [
      // Rule 1: Field is required
      v => !!v || 'Name is required',
      // Rule 2: Minimum length check
      v => (v && v.length >= 2) || 'Name must be at least 2 characters'
    ],

    emailRules: [
      // Rule 1: Field is required
      v => !!v || 'Email is required',
      // Rule 2: Valid email format using regex
      // Checks for pattern: text@text.text, with no spaces
      v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Email must be valid'
    ],

    phoneRules: [
      // Rule 1: Field is required
      v => !!v || 'Phone number is required',
      // Rule 2: Valid phone format - must have 10 digits
      // Removes all non-digit characters before checking length
      v => (v && v.replace(/\D/g, '').length === 10) || 'Phone number must be 10 digits'
    ],

    // Message field is optional, so no required rule
    // Just a max length check
    messageRules: [
      v => !v || v.length <= 1000 || 'Message must be less than 1000 characters'
    ],

    // reCAPTCHA state
    // The widget renders once the form is near the screen (see mounted),
    // so Google's script doesn't load for visitors who never scroll down
    showCaptcha: false,
    captchaReady: false,
    captchaLoadFailed: false,
    // Hint under the widget after a submit without ticking the box
    captchaRequired: false,
    recaptchaVerified: false,
    recaptchaResponse: '',

    // reCAPTCHA site key - switches between test and production keys
    recaptchaSiteKey: process.env.NODE_ENV === 'development'
      ? '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' // Development/test key
      : process.env.VUE_APP_RECAPTCHA_SITE_KEY // Production key from environment
  }),

  computed: {
    /**
     * Business phone number for display
     * @returns {string} Formatted phone number, e.g. (321) 339-1790
     */
    businessPhoneDisplay () {
      return formatPhone(this.businessPhone)
    }
  },

  watch: {
    /**
     * Starts the load timer once the reCAPTCHA widget is added to the page
     */
    showCaptcha (shown) {
      if (shown) {
        this.captchaTimer = setTimeout(() => {
          if (!this.captchaReady) {
            this.captchaLoadFailed = true
          }
        }, CAPTCHA_LOAD_TIMEOUT)
      }
    }
  },

  // Lifecycle hook - runs after component is mounted to DOM
  mounted () {
    // Render the reCAPTCHA widget when the form comes within 600px of the screen
    // Browsers without IntersectionObserver get it right away
    if ('IntersectionObserver' in window) {
      this.captchaObserver = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          this.showCaptcha = true
          this.captchaObserver.disconnect()
        }
      }, { rootMargin: '600px 0px' })
      this.captchaObserver.observe(this.$el)
    } else {
      this.showCaptcha = true
    }
  },

  // Lifecycle hook - runs before component is destroyed
  beforeDestroy () {
    if (this.captchaObserver) {
      this.captchaObserver.disconnect()
    }
    clearTimeout(this.captchaTimer)
  },

  methods: {
    /**
     * Formats phone number as user types
     * Converts raw input to (XXX) XXX-XXXX format
     * Called on phone field input event
     */
    formatPhoneNumber () {
      // Check if phone number exists before formatting
      if (!this.formData.phone) {
        return
      }

      this.formData.phone = formatPhoneInput(this.formData.phone)
    },

    /**
     * Called when the reCAPTCHA widget has rendered
     */
    onCaptchaRendered () {
      this.captchaReady = true
      this.captchaLoadFailed = false
    },

    /**
     * Called when reCAPTCHA reports an error, usually a lost connection
     */
    onCaptchaError () {
      this.captchaLoadFailed = true
    },

    /**
     * Called when reCAPTCHA is successfully completed
     * Stores the response token, sets verified state and clears the hints
     * (reCAPTCHA recovers by itself once a lost connection comes back)
     */
    onCaptchaVerified (response) {
      this.recaptchaVerified = true
      this.recaptchaResponse = response
      this.captchaRequired = false
      this.captchaLoadFailed = false
    },

    /**
     * Called when reCAPTCHA is expired or reset
     * Clears the response token and resets verified state
     */
    onCaptchaExpired () {
      this.recaptchaVerified = false
      this.recaptchaResponse = ''
    },

    /**
     * Unticks the reCAPTCHA box so the next submission gets a fresh token
     * (a token can only be verified once)
     */
    resetCaptcha () {
      this.recaptchaVerified = false
      this.recaptchaResponse = ''
      if (this.$refs.recaptcha) {
        this.$refs.recaptcha.reset()
      }
    },

    /**
     * Validates and submits the form
     * Sends email via EmailJS if validation passes
     */
    async submitForm () {
      // Validate form using Vuetify's validate method
      // This also shows the error message under every field that needs fixing
      if (!this.$refs.form.validate()) {
        // Move focus to the first field that needs fixing
        const firstInvalid = this.$refs.form.inputs.find(input => input.hasError)
        if (firstInvalid) {
          firstInvalid.focus()
        }
        return
      }

      if (!this.recaptchaVerified) {
        // Show the hint under the reCAPTCHA box; ticking the box clears it
        this.captchaRequired = true
        return
      }

      // Set loading state - shows spinner on button
      this.loading = true

      // Hide any previous success/error messages
      this.showSuccess = false
      this.showError = false

      try {
        // Prepare template parameters for EmailJS
        // These variable names must match your EmailJS template
        // The recipient is set in the EmailJS template itself, not here
        const templateParams = {
          from_name: this.formData.name, // Customer name
          reply_to: this.formData.email, // Customer email
          phone_number: this.formData.phone, // Customer phone
          message: this.formData.message || 'No additional details provided', // Quote details
          // reCAPTCHA token; EmailJS checks it when reCAPTCHA is enabled in the template settings
          'g-recaptcha-response': this.recaptchaResponse
        }

        // Send email using EmailJS
        // emailjs.send(serviceId, templateId, templateParams)
        const response = await emailjs.send(
          this.emailConfig.serviceId,
          this.emailConfig.templateId,
          templateParams
        )

        // Check if email was sent successfully
        if (response.status === 200) {
          // Show success message
          this.showSuccess = true

          // Reset form fields and the reCAPTCHA box after successful submission
          this.$refs.form.reset()
          this.resetCaptcha()

          // Scroll to top of form so user sees success message
          this.$el.scrollIntoView({ behavior: 'smooth', block: 'start' })

          // Auto-hide success message after 10 seconds
          setTimeout(() => {
            this.showSuccess = false
          }, 10000)
        }
      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.error('EmailJS Error:', error)
        // Show error message to user
        // 429 comes from limitRate in main.js: this browser sent a request moments ago
        this.showError = true
        this.errorMessage = error && error.status === 429
          ? 'Please wait a few seconds before sending another request.'
          : `Sorry, there was a problem sending your request. Please call us directly at ${this.businessPhoneDisplay}.`

        // The token was used up by this attempt, so the next one needs a fresh tick
        this.resetCaptcha()

        // Auto-hide error message after 10 seconds
        setTimeout(() => {
          this.showError = false
        }, 10000)
      } finally {
        // Always turn off loading state, whether success or error
        this.loading = false
      }
    },

    /**
     * Resets the form to initial state
     * Clears all fields, validation errors and the reCAPTCHA box
     */
    resetForm () {
      this.$refs.form.reset()
      this.resetCaptcha()
      this.captchaRequired = false
      this.showSuccess = false
      this.showError = false
    }
  }
}
</script>

<style scoped>
/*
  Scoped styles - only apply to this component
  Custom styling to enhance Vuetify defaults
*/

/*
  Quote form section background
  Light gray creates visual separation
  Matches services section for consistency
*/
.quote-section {
  background-color: #f5f5f5; /* Light gray background */
}

/*
  Form card styling
  White card with shadow stands out from gray background
  Rounded corners for modern look
*/
.form-card {
  border-radius: 16px !important;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1) !important;
}

/*
  Large form inputs for senior-friendly interaction
  Vuetify's default is too small for some senior users
*/
::v-deep .v-text-field input,
::v-deep .v-textarea textarea {
  font-size: 18px !important;
  line-height: 1.5 !important;
}

/*
  Large labels for form fields
  Ensures readability for all users
*/
::v-deep .v-label {
  font-size: 18px !important;
}

/*
  Error message styling
  Makes validation errors highly visible
*/
::v-deep .v-messages__message {
  font-size: 16px !important;
  font-weight: 500 !important;
}

/*
  Submit button styling
  Extra large button with strong visual presence
*/
.submit-btn {
  min-height: 70px !important;
  font-size: 1.25rem !important;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

/*
  Submit button hover effect
  Lifts button for interactive feedback
*/
.submit-btn:hover:not(:disabled) {
  transform: translateY(-3px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3) !important;
}

/*
  Alert message styling
  Makes success/error messages prominent
*/
::v-deep .v-alert {
  font-size: 18px !important;
  border-radius: 12px !important;
}

/*
  Character counter styling for textarea
  Makes counter more visible
*/
::v-deep .v-counter {
  font-size: 16px !important;
}

/*
  RESPONSIVE DESIGN - Mobile adjustments
  Optimizes form layout for smaller screens
*/

/* Mobile phones */
@media (max-width: 600px) {
  /* Reduce padding on mobile for more space */
  .form-card {
    padding: 24px 16px !important;
  }

  /* Adjust submit button height on mobile */
  .submit-btn {
    min-height: 64px !important;
  }
}
</style>

<template>
  <!--
    QUOTE FORM SECTION
    Main quote request form with EmailJS integration
    Collects customer information and sends email
  -->
  <v-container
    fluid
    class="quote-section py-16 pa-0 ma-0"
  >
    <!--
      Main container with max width for readability
      Centers content on large screens
    -->
    <v-container>
      <!--
        SECTION HEADER
        Large, centered title to introduce form
      -->
      <v-row justify="center" class="mb-8">
        <v-col cols="12" class="text-center">
          <h2 class="text-h3 font-weight-bold primary--text mb-4">
            Get Your Free Quote
          </h2>
          <p class="text-h6 grey--text text--darken-2">
            Fill out the form below and we'll get back to you within 24 hours
          </p>
        </v-col>
      </v-row>

      <!--
        FORM CONTAINER
        Centered card with form fields
      -->
      <v-row justify="center">
        <v-col cols="12" md="10" lg="8">
          <!--
            White card containing the form
            Elevated with shadow for prominence
          -->
          <v-card class="form-card pa-8" elevation="6">
            <!--
              SUCCESS ALERT
              Shows after successful form submission
              Green color with checkmark icon
            -->
            <v-alert
              v-if="showSuccess"
              type="success"
              prominent
              dismissible
              @input="showSuccess = false"
              class="mb-6"
            >
              <v-row align="center">
                <v-col class="grow">
                  <div class="text-h6 font-weight-bold mb-2">
                    Thank You!
                  </div>
                  <div>
                    We've received your quote request and will contact you within 24 hours.
                    If you need immediate assistance, please call us at {{ businessPhoneDisplay }}.
                  </div>
                </v-col>
              </v-row>
            </v-alert>

            <!--
              ERROR ALERT
              Shows if form submission fails
              Red color with error icon
            -->
            <v-alert
              v-if="showError"
              type="error"
              prominent
              dismissible
              @input="showError = false"
              class="mb-6"
            >
              <v-row align="center">
                <v-col class="grow">
                  <div class="text-h6 font-weight-bold mb-2">
                    Oops! Something went wrong
                  </div>
                  <div>
                    {{ errorMessage }}
                  </div>
                </v-col>
              </v-row>
            </v-alert>

            <!--
              FORM ELEMENT
              v-form component with validation
              ref allows access to form methods (validate, reset)
            -->
            <v-form
              ref="form"
              @submit.prevent="submitForm"
            >
              <!--
                NAME FIELD
                Required field with minimum length validation
                outlined style for better visibility
                :rules applies validation rules from data
              -->
              <v-text-field
                v-model="formData.name"
                label="Your Name *"
                outlined
                :rules="nameRules"
                required
                autocomplete="name"
                prepend-inner-icon="mdi-account"
                class="mb-4"
                hint="Enter your full name"
                persistent-hint
              ></v-text-field>

              <!--
                EMAIL FIELD
                Required field with email format validation
                type="email" provides browser-level validation
              -->
              <v-text-field
                v-model="formData.email"
                label="Email Address *"
                type="email"
                outlined
                :rules="emailRules"
                required
                autocomplete="email"
                prepend-inner-icon="mdi-email"
                class="mb-4"
                hint="We'll send your quote to this email"
                persistent-hint
              ></v-text-field>

              <!--
                PHONE FIELD
                Required field with US phone format validation
                Auto-formats as user types via @input event
                type="tel" shows numeric keyboard on mobile
                tel-national asks autofill for the number without the +1
              -->
              <v-text-field
                v-model="formData.phone"
                label="Phone Number *"
                type="tel"
                outlined
                :rules="phoneRules"
                required
                autocomplete="tel-national"
                prepend-inner-icon="mdi-phone"
                @input="formatPhoneNumber"
                class="mb-4"
                hint="Format: (555) 123-4567"
                persistent-hint
                placeholder="(555) 123-4567"
              ></v-text-field>

              <!--
                MESSAGE FIELD
                Optional textarea for additional details
                counter shows character count (max 1000)
                Auto-grows as user types (auto-grow prop)
              -->
              <v-textarea
                v-model="formData.message"
                label="Tell us about your equipment and issue (Optional)"
                outlined
                :rules="messageRules"
                prepend-inner-icon="mdi-message-text"
                counter="1000"
                auto-grow
                rows="5"
                class="mb-4"
                hint="Include equipment type, brand, model, and problem description"
                persistent-hint
                placeholder="Example: Craftsman lawn mower won't start. Model number 12345. Last used 2 weeks ago."
              ></v-textarea>

              <!--
                reCAPTCHA WIDGET
                Rendered once the form is near the screen (see mounted)
                Local development uses Google's test key; builds use VUE_APP_RECAPTCHA_SITE_KEY
                role="alert" makes screen readers announce the hints when they appear
              -->
              <div class="my-4">
                <vue-recaptcha
                  v-if="showCaptcha"
                  ref="recaptcha"
                  :sitekey="recaptchaSiteKey"
                  @render="onCaptchaRendered"
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"
                  @error="onCaptchaError"
                />
                <p
                  v-if="captchaRequired"
                  class="text-body-1 error--text font-weight-medium mt-2 mb-0"
                  role="alert"
                >
                  Please tick "I'm not a robot" before sending.
                </p>
                <p
                  v-if="captchaLoadFailed"
                  class="text-body-1 error--text font-weight-medium mt-2 mb-0"
                  role="alert"
                >
                  The spam check couldn't load, so the form can't be sent right now.
                  Please call us at <a :href="'tel:' + businessPhone">{{ businessPhoneDisplay }}</a>.
                </p>
              </div>

              <!--
                REQUIRED FIELD NOTE
                Explains asterisk notation to users
              -->
              <p class="text-body-1 grey--text text--darken-2 mb-6">
                * Required fields
              </p>

              <!--
                FORM ACTIONS
                Submit and Reset buttons
              -->
              <v-row justify="center">
                <!--
                  SUBMIT BUTTON
                  Disabled only while sending, so clicking it can point out missing fields
                  Shows loading spinner during submission
                -->
                <v-col cols="12" md="8" lg="6">
                  <v-btn
                    type="submit"
                    color="accent"
                    x-large
                    block
                    :disabled="loading"
                    :loading="loading"
                    class="submit-btn"
                  >
                    <v-icon left large>mdi-send</v-icon>
                    <span class="text-h6 font-weight-bold">
                      Send Quote Request
                    </span>
                  </v-btn>
                </v-col>
              </v-row>

              <!--
                RESET BUTTON
                Clears all form fields
                Text button style for secondary action
                Centered below submit button
              -->
              <v-row justify="center" class="mt-4">
                <v-col cols="12" md="8" lg="6">
                  <v-btn
                    text
                    large
                    block
                    @click="resetForm"
                    :disabled="loading"
                  >
                    <v-icon left>mdi-refresh</v-icon>
                    Clear Form
                  </v-btn>
                </v-col>
              </v-row>

              <!--
                PRIVACY NOTE
                Tells customers what happens to the details they send
              -->
              <p class="text-body-1 grey--text text--darken-2 text-center mt-4 mb-0">
                We only use your details to reply to your quote request.
              </p>
            </v-form>

            <!--
              ALTERNATIVE CONTACT INFO
              Provides phone number for users who prefer calling
            -->
            <v-divider class="my-8"></v-divider>

            <div class="text-center">
              <p class="text-h6 grey--text text--darken-2 mb-3">
                Prefer to call? We're here to help!
              </p>
              <v-btn
                color="primary"
                large
                :href="'tel:' + businessPhone"
                class="px-8"
              >
                <v-icon left>mdi-phone</v-icon>
                <span class="text-h6">{{ businessPhoneDisplay }}</span>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
