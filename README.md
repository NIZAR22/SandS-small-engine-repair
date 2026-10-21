# Southern and Sons Small Engine Repair Website

A professional, senior-friendly single-page website for Southern and Sons Small Engine Repair, LLC built with Vue.js 2.7, Vuetify 2.6, and EmailJS. Live at [sands.madebysadegh.work](https://sands.madebysadegh.work).

## 🚀 Features

- **Senior-Friendly Design**: Large text and buttons, colors chosen for WCAG AA contrast
- **Responsive Layout**: Works on phones, tablets and desktops; phones and tablets get a menu button
- **Professional Services**: Comprehensive small engine repair services showcase
- **DIY Tips Section**: 6 maintenance tips for small engines
- **Quote Form**: EmailJS form with validation, phone formatting and reCAPTCHA spam protection
- **Contact Information**: Business hours, phone, email, map with directions, and Facebook link
- **SEO and Link Previews**: Meta description, Open Graph tags with a preview image, and Schema.org LocalBusiness data
- **Accessibility**: Labels on icon-only buttons, keyboard-reachable navigation, form hints announced to screen readers

## 🛠️ Technology Stack

- **Vue.js 2.7**: Progressive JavaScript framework (Options API)
- **Vuetify 2.6**: Material Design components, loaded à la carte by vuetify-loader so only the components in use are bundled
- **EmailJS**: Sends quote requests by email without a backend
- **Google reCAPTCHA v2**: Spam protection for the quote form
- **Vue CLI 5**: Build tool and development server
- **Jest + Vue Test Utils**: Unit tests
- **GitHub Actions + GitHub Pages**: Automatic deployment

## 📁 Project Structure

```
SandS Small Engine Repair/
├── .github/workflows/
│   └── deploy.yml           # Lint, test, build and publish on every push to main
├── public/
│   ├── index.html           # HTML shell: meta tags, link previews, structured data
│   ├── favicon.ico          # Browser tab icon
│   ├── apple-touch-icon.png # Phone home-screen icon
│   ├── og-image.png         # Link preview image (Facebook, text messages)
│   └── CNAME                # Custom domain for GitHub Pages
├── src/
│   ├── assets/              # Logo, hero photo, shop photo
│   ├── components/          # One component per page section
│   │   ├── HeroSection.vue
│   │   ├── AboutServices.vue
│   │   ├── TipsSection.vue
│   │   ├── QuoteForm.vue
│   │   ├── ContactSection.vue
│   │   └── Footer.vue
│   ├── config/
│   │   └── business.js      # Phone, email, address, hours, Facebook: edit business details here
│   ├── plugins/
│   │   └── vuetify.js       # Vuetify setup and theme colors
│   ├── utils/
│   │   └── format.js        # Phone, email and opening-hours formatting
│   ├── App.vue              # Page layout, navigation and scrolling
│   └── main.js              # Application entry point, EmailJS setup
├── tests/unit/              # Jest unit tests
├── package.json             # Dependencies and scripts
├── vue.config.js            # Vue CLI configuration
└── README.md                # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 22 (the version the deploy workflow uses)
- npm 10

### Installation

1. **Clone the project** and open its folder

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env`** with the four values described under [Environment Variables](#environment-variables)

4. **Start development server**
   ```bash
   npm run serve
   ```
   The site opens at `http://localhost:8080`.

### Production Build

```bash
npm run build
```

The built files go to `dist/`. A production build stops with an error if any of the four environment variables is missing, because the quote form couldn't send without them.

## ⚙️ Configuration

### Business Details

The phone number, email, Facebook URL, service area, shop address, opening hours and founding year live in **`src/config/business.js`**. Every page section, the link-preview tags and the search-engine data read from that file, so change them there only.

Setting `foundedYear` adds "since <year>" to the footer and the search-engine data.

### Environment Variables

Create a `.env` file in the project root (it's gitignored):

```
VUE_APP_EMAILJS_PUBLIC_KEY=your_public_key
VUE_APP_EMAILJS_SERVICE_ID=your_service_id
VUE_APP_EMAILJS_TEMPLATE_ID=your_template_id
VUE_APP_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

These values end up in the public JavaScript, so they are identifiers, not secrets. The deploy workflow reads the same four names from the repository's Actions variables.

### EmailJS Setup

1. **Create an EmailJS account** at [https://www.emailjs.com](https://www.emailjs.com) and **a service** (Gmail, Outlook, etc.)

2. **Create an email template** using the variables the form sends:
   - `{{from_name}}` - Customer name
   - `{{reply_to}}` - Customer email (use it as the template's Reply To)
   - `{{phone_number}}` - Customer phone
   - `{{message}}` - Equipment and problem description

3. **Set the template's "To Email" to your inbox.** The site doesn't send a recipient address, so the template decides where quote requests go.

4. **Turn on reCAPTCHA verification** in the template settings and enter your reCAPTCHA **secret** key. The form sends the token as `g-recaptcha-response`, and EmailJS rejects requests without a valid one.

### reCAPTCHA

- Register a reCAPTCHA **v2 "I'm not a robot"** key for `sands.madebysadegh.work` and put its site key in `VUE_APP_RECAPTCHA_SITE_KEY`.
- `npm run serve` uses Google's public test key, which works on localhost. Once verification is on in EmailJS, test requests sent from your machine are rejected, because test-key tokens don't match your secret key. Test sending on the live site.

### Styling

- **Colors**: Theme colors are in `src/plugins/vuetify.js`. Components use them through classes (`primary--text`) or CSS variables (`var(--v-accent-base)`), so change them there. The accent `#B35900` is dark enough for white text; check that a new color keeps text at 4.5:1 contrast or more.
- **Photos**: Replace `src/assets/hero.jpg` (the wide photo behind the header and hero) or the other files in `src/assets/`.
- **Icons**: Material Design Icons 7.4.47 from jsDelivr, pinned with an integrity hash in `public/index.html`. To change the version, update both the URL and the hash.

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 600px
- **Tablet**: 600px - 960px (menu button instead of the navigation buttons)
- **Desktop**: > 960px

## ♿ Accessibility Features

- **Contrast**: Text and button colors chosen to meet WCAG AA (4.5:1 for normal text)
- **Large Text**: Most text is 20px or larger
- **Touch Targets**: Large buttons throughout
- **Screen Readers**: Labels on icon-only buttons, a titled map, the current section marked in the navigation, and form hints announced when they appear
- **Forms**: Clicking Send on an incomplete form shows what's missing and moves focus to the first field; autofill hints on name, email and phone

## 🔧 Development

### Available Scripts

- `npm run serve` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Check code style (reports problems, changes nothing)
- `npm run lint:fix` - Fix the code-style problems that can be fixed automatically
- `npm run test:unit` - Run unit tests (`npm run test:watch` reruns them on changes)
- `npm run deploy` - Manual deploy to GitHub Pages (normally not needed, see [Deployment](#-deployment))

### Code Style

- **Vue 2 Options API**: Using data, methods, computed, mounted
- **Vuetify Components**: Proper component usage and theming
- **ESLint**: Standard style with Vue rules
- **Comments**: JSDoc comments on methods

## 📈 SEO Features

- **Meta Tags**: Title and description
- **Link Previews**: Open Graph and Twitter tags with a 1200x630 preview image
- **Structured Data**: Schema.org LocalBusiness (name, phone, email, address, hours, Facebook), generated from `src/config/business.js` at build time
- **Performance**: Only the Vuetify components in use are bundled; reCAPTCHA and the map load when needed

## 🚀 Deployment

Pushing to `main` deploys the site. The GitHub Actions workflow (`.github/workflows/deploy.yml`) installs dependencies, runs lint and unit tests, builds, and publishes `dist/` to the `gh-pages` branch, which GitHub Pages serves at `sands.madebysadegh.work` (the custom domain comes from `public/CNAME`).

**One-time setup**: In the GitHub repository, go to Settings → Secrets and variables → Actions → Variables and add the four `VUE_APP_*` values from your `.env`.

**Manual fallback**: `npm run deploy` builds on your machine (using `.env`) and publishes to `gh-pages`. It refuses to run with uncommitted changes, so what goes live always matches git.

## 🔍 Performance Optimization

- **Code Splitting**: Vue, Vuetify and app code in separate chunks for better caching
- **Tree-shaking**: vuetify-loader bundles only the Vuetify components in use
- **Lazy Loading**: The reCAPTCHA script loads when the quote form nears the screen; the map loads lazily
- **Minification**: JavaScript, CSS and HTML minified in production; `console.log` removed, errors kept

## 🐛 Troubleshooting

### Common Issues

1. **Quote form not sending**:
   - Check the four `VUE_APP_*` values (`.env` locally, repository variables for deploys)
   - Check that the EmailJS template has a "To Email" and that its reCAPTCHA secret key belongs to the same key as the site key
   - Check the browser console: failed sends are logged as `EmailJS Error`
   - EmailJS's dashboard shows recent requests and your plan's monthly limit

2. **"The spam check couldn't load" under the form**:
   - The reCAPTCHA key doesn't list the current domain, or Google's script was blocked by the network or a browser extension

3. **Build fails with "Missing VUE_APP_..."**:
   - Add the missing values to `.env` (local builds) or the repository variables (GitHub Actions)

### Development Issues

1. **Port already in use**:
   ```bash
   npm run serve -- --port 8081
   ```

2. **Dependencies issues**:
   ```bash
   rm -rf node_modules
   npm ci
   ```

## 📞 Support

For technical support or questions about this website:

- **Email**: southernandsonspalmbay@gmail.com
- **Phone**: (321) 345-1480
- **Facebook**: [Southern and Sons Facebook](https://www.facebook.com/profile.php?id=61582473064509)

## 📄 License

This project is proprietary software for Southern and Sons Small Engine Repair, LLC.

## 🔄 Updates

To update the website:

1. **Update content** in `src/config/business.js` (contact details, hours) or in the section components (text, services, tips)
2. **Test changes** with `npm run serve`, `npm run lint` and `npm run test:unit`
3. **Commit and push to `main`**; the site deploys automatically

---

**Built with ❤️ for Southern and Sons Small Engine Repair, LLC**

*Professional small engine repair services in Brevard County, Florida*
