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
