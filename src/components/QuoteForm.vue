<script>
// Import EmailJS for form submission without backend server
import emailjs from '@emailjs/browser'
import { VueRecaptcha } from 'vue-recaptcha'

export default {
  name: 'QuoteForm',
  components: {
    VueRecaptcha
  },
  // Component data - reactive properties
  data: () => ({
    // Form validity state - tracks if all validation rules pass
    valid: false,

    // Form loading state - shows spinner during email sending
    loading: false,

    // Success/error message display flags
    showSuccess: false,
    showError: false,
    errorMessage: '',

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
      // Checks for pattern: text@text.text
      v => /.+@.+\..+/.test(v) || 'Email must be valid'
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
    recaptchaVerified: false,
    recaptchaResponse: '',

    // reCAPTCHA site key - switches between test and production keys
    recaptchaSiteKey: process.env.NODE_ENV === 'development'
      ? '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' // Google test key
      : '6LdXYPgrAAAAAEenDITKIlCU5000l2wZU1HOZq_k' // Replace with your real key
  }),

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

      // Get current phone value and remove all non-digit characters
      let phone = this.formData.phone.replace(/\D/g, '')

      // Limit to 10 digits (US phone number)
      phone = phone.substring(0, 10)

      // Format based on length
      if (phone.length >= 6) {
        // Full format: (XXX) XXX-XXXX
        this.formData.phone = `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6)}`
      } else if (phone.length >= 3) {
        // Partial format: (XXX) XXX
        this.formData.phone = `(${phone.substring(0, 3)}) ${phone.substring(3)}`
      } else if (phone.length > 0) {
        // Start format: (XXX
        this.formData.phone = `(${phone}`
      }
    },

    /**
     * Called when reCAPTCHA is successfully completed
     * Stores the response token and sets verified state
     */
    onCaptchaVerified (response) {
      this.recaptchaVerified = true
      this.recaptchaResponse = response
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
     * Validates and submits the form
     * Sends email via EmailJS if validation passes
     */
    async submitForm () {
      // Validate form using Vuetify's validate method
      // this.$refs.form is reference to v-form component
      const isValid = this.$refs.form.validate()

      if (!isValid || !this.recaptchaVerified) {
        // If validation fails, stop here
        // Error messages will display automatically under fields
        if (!this.recaptchaVerified) {
          this.showError = true
          this.errorMessage = 'Please verify you are not a robot.'
        }
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
        const templateParams = {
          from_name: this.formData.name, // Customer name
          reply_to: this.formData.email, // Customer email
          phone_number: this.formData.phone, // Customer phone
          message: this.formData.message || 'No additional details provided', // Quote details
          to_email: 'cambizz10@gmail.com' // Your business email (can be hardcoded in template)
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

          // Reset form fields after successful submission
          this.$refs.form.reset()

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
        this.showError = true
        this.errorMessage = 'Sorry, there was a problem sending your request. Please call us directly at (321) 555-0123.'

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
     * Clears all fields and validation errors
     */
    resetForm () {
      // Reset form data first
      this.formData = {
        name: '',
        email: '',
        phone: '',
        message: ''
      }

      // Then reset form validation
      this.$refs.form.reset()
      this.showSuccess = false
      this.showError = false
      this.recaptchaVerified = false
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
          <p class="text-h6 grey--text text--darken-1">
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
                    If you need immediate assistance, please call us at (321) 555-0123.
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
              v-model syncs with valid data property
            -->
            <v-form
              ref="form"
              v-model="valid"
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
              -->
              <v-text-field
                v-model="formData.phone"
                label="Phone Number *"
                type="tel"
                outlined
                :rules="phoneRules"
                required
                prepend-inner-icon="mdi-phone"
                @input="formatPhoneNumber"
                class="mb-4"
                hint="Format: (321) 555-1234"
                persistent-hint
                placeholder="(321) 555-1234"
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

              <!-- reCAPTCHA widget -->
               <!-- This is Google's test site key -->
              <div class="my-4 text-center">
                <vue-recaptcha
                  :sitekey="recaptchaSiteKey"
                  @verify="onCaptchaVerified"
                  @expired="onCaptchaExpired"
                />
              </div>

              <!--
                REQUIRED FIELD NOTE
                Explains asterisk notation to users
              -->
              <p class="text-body-1 grey--text text--darken-1 mb-6">
                * Required fields
              </p>

              <!--
                FORM ACTIONS
                Submit and Reset buttons
              -->
              <v-row justify="center">
                <!--
                  SUBMIT BUTTON
                  Disabled while loading or form invalid
                  Shows loading spinner during submission
                -->
                <v-col cols="12" md="8" lg="6">
                  <v-btn
                    type="submit"
                    color="accent"
                    x-large
                    block
                    :disabled="!valid || loading"
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
            </v-form>

            <!--
              ALTERNATIVE CONTACT INFO
              Provides phone number for users who prefer calling
            -->
            <v-divider class="my-8"></v-divider>

            <div class="text-center">
              <p class="text-h6 grey--text text--darken-1 mb-3">
                Prefer to call? We're here to help!
              </p>
              <v-btn
                color="primary"
                large
                :href="'tel:3215550123'"
                class="px-8"
              >
                <v-icon left>mdi-phone</v-icon>
                <span class="text-h6">(321) 555-0123</span>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>
