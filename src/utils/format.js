/**
 * Display formatting shared by the page sections
 */

/**
 * Formats a 10-digit US phone number for display
 * Converts 3213451480 to (321) 345-1480
 * @param {string} digits - Phone number, digits only
 * @returns {string} Formatted phone number, or the input unchanged if it isn't 10 digits
 */
export function formatPhone (digits) {
  const match = String(digits).replace(/\D/g, '').match(/^(\d{3})(\d{3})(\d{4})$/)
  return match ? `(${match[1]}) ${match[2]}-${match[3]}` : String(digits)
}

/**
 * Formats a phone number while the user types
 * Builds up (XXX) XXX-XXXX from the digits typed so far, at most 10 digits
 * @param {string} value - Current field value
 * @returns {string} Formatted value, or the input unchanged if it has no digits
 */
export function formatPhoneInput (value) {
  // Remove all non-digit characters and limit to 10 digits (US phone number)
  const phone = String(value || '').replace(/\D/g, '').substring(0, 10)

  if (phone.length >= 6) {
    // Full format: (XXX) XXX-XXXX
    return `(${phone.substring(0, 3)}) ${phone.substring(3, 6)}-${phone.substring(6)}`
  }
  if (phone.length >= 3) {
    // Partial format: (XXX) XXX
    return `(${phone.substring(0, 3)}) ${phone.substring(3)}`
  }
  if (phone.length > 0) {
    // Start format: (XXX
    return `(${phone}`
  }
  return String(value || '')
}

/**
 * Splits an email address before the @, so templates can put a <wbr> there
 * and long addresses wrap as "name / @domain" on narrow screens
 * @param {string} email - Email address
 * @returns {string[]} [name, '@domain']
 */
export function splitEmail (email) {
  const at = email.indexOf('@')
  return at > 0 ? [email.slice(0, at), email.slice(at)] : [email, '']
}

/**
 * Converts a 24-hour time to 12-hour display
 * Converts 18:00 to 6:00 PM
 * @param {string} time - Time as HH:MM
 * @returns {string} Time with AM/PM
 */
export function formatTime (time) {
  const [hours, minutes] = time.split(':').map(Number)
  const suffix = hours < 12 ? 'AM' : 'PM'
  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${suffix}`
}

/**
 * Formats opening hours for display
 * @param {{ open: string, close: string }} hours - Opening and closing time as HH:MM
 * @returns {string} e.g. 8:00 AM - 6:00 PM
 */
export function formatHours ({ open, close }) {
  return `${formatTime(open)} - ${formatTime(close)}`
}
