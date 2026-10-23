# Southern and Sons Small Engine Repair Website

A professional, senior-friendly single-page website for Southern and Sons Small Engine Repair, LLC built with Vue.js 2.7 and Vuetify 2.6. Live at [www.southernandsons.com](https://www.southernandsons.com).

## 🚀 Features

- **Senior-Friendly Design**: Large text and buttons, colors chosen for WCAG AA contrast
- **Responsive Layout**: Works on phones, tablets and desktops; phones and tablets get a menu button
- **Professional Services**: Comprehensive small engine repair services showcase
- **DIY Tips Section**: 6 maintenance tips for small engines
- **Call to Book**: Call buttons throughout; service is by appointment only
- **Contact Information**: Business hours, phone, email, map with directions, and Facebook link
- **SEO and Link Previews**: Meta description, Open Graph tags with a preview image, and Schema.org LocalBusiness data
- **Accessibility**: Labels on icon-only buttons, keyboard-reachable navigation

## 🛠️ Technology Stack

- **Vue.js 2.7**: Progressive JavaScript framework (Options API)
- **Vuetify 2.6**: Material Design components, loaded à la carte by vuetify-loader so only the components in use are bundled
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
│   │   ├── ContactSection.vue
│   │   └── Footer.vue
│   ├── config/
│   │   └── business.js      # Phone, email, address, hours, Facebook: edit business details here
│   ├── styles/
│   │   └── theme.css        # Brand color variables, focus outline, reduced motion
│   ├── plugins/
│   │   └── vuetify.js       # Vuetify setup and theme colors
│   ├── utils/
│   │   └── format.js        # Phone, email and opening-hours formatting
│   ├── App.vue              # Page layout, navigation and scrolling
│   └── main.js              # Application entry point
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

3. **Start development server**
   ```bash
   npm run serve
   ```
   The site opens at `http://localhost:8080`.

### Production Build

```bash
npm run build
```

The built files go to `dist/`.

## ⚙️ Configuration

### Business Details

The phone number, email, Facebook URL, service area, shop address, opening hours and founding year live in **`src/config/business.js`**. Every page section, the link-preview tags and the search-engine data read from that file, so change them there only.

Setting `foundedYear` adds "since <year>" to the footer and the search-engine data.

### Styling

- **Colors**: The brand palette comes from the business card. Brand colors are set once in `src/plugins/vuetify.js` (`primary` navy-purple `#29234F`, `secondary` `#3B326B`, `accent` red-orange `#F45150`, `cta` button red `#C8323A`). `src/styles/theme.css` maps them to `--color-*` variables and adds the neutrals (`--color-light` warm white, `--color-background`, `--color-border`, …). Components use the variables or Vuetify classes (`primary--text`, `color="cta"`), never hex values. Use `accent` for icons, borders and indicators, and `cta` for buttons with text: warm white on `#F45150` is only 3.2:1, below WCAG AA. Check that a new color keeps text at 4.5:1 contrast or more.
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
- **Screen Readers**: Labels on icon-only buttons, a titled map, and the current section marked in the navigation

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
- **Performance**: Only the Vuetify components in use are bundled; the map loads when needed

## 🚀 Deployment

Pushing to `main` deploys the site. The GitHub Actions workflow (`.github/workflows/deploy.yml`) installs dependencies, runs lint and unit tests, builds, and publishes `dist/` to the `gh-pages` branch, which GitHub Pages serves at `www.southernandsons.com` (the custom domain comes from `public/CNAME`).

**Manual fallback**: `npm run deploy` builds on your machine and publishes to `gh-pages`. It refuses to run with uncommitted changes, so what goes live always matches git.

## 🔍 Performance Optimization

- **Code Splitting**: Vue, Vuetify and app code in separate chunks for better caching
- **Tree-shaking**: vuetify-loader bundles only the Vuetify components in use
- **Lazy Loading**: The map loads when it nears the screen
- **Minification**: JavaScript, CSS and HTML minified in production; `console.log` removed, errors kept

## 🐛 Troubleshooting

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
- **Phone**: (321) 339-1790
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
