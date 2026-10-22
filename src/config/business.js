/**
 * Business details shown across the site: page sections, the page's
 * meta tags and the structured data search engines read.
 * Edit them here only.
 *
 * CommonJS so vue.config.js can read the same file for the HTML template.
 */
module.exports = Object.freeze({
  name: 'Southern and Sons',
  legalName: 'Southern and Sons Small Engine Repair, LLC',
  siteUrl: 'https://www.southernandsons.com',

  // Digits only; formatPhone() turns it into (321) 345-1480 for display
  phone: '3213451480',
  email: 'southernandsonspalmbay@gmail.com',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61582473064509',

  serviceArea: 'Brevard County, FL',
  // Shop location for the map, the directions links and search engines
  address: Object.freeze({
    street: '984 Cotorro Road Southeast',
    city: 'Palm Bay',
    state: 'FL'
  }),

  // Open every day, Monday through Sunday (24-hour clock)
  hours: Object.freeze({
    open: '08:00',
    close: '18:00'
  }),

  // Year the business opened; when set, the footer reads "since <year>"
  foundedYear: 2025
})
