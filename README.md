# Southern and Sons Small Engine Repair Website

A professional, senior-friendly single-page website for Southern and Sons Small Engine Repair, LLC built with Vue.js 2.x, Vuetify 2.x, and EmailJS.

## 🚀 Features

- **Senior-Friendly Design**: Large fonts (20px+), high contrast colors, and accessible navigation
- **Responsive Layout**: Mobile-first design that works on all devices
- **Professional Services**: Comprehensive small engine repair services showcase
- **DIY Tips Section**: 6 detailed maintenance tips with step-by-step instructions
- **Quote Form**: Integrated EmailJS form with validation and auto-formatting
- **Contact Information**: Business hours, phone, email, and social media links
- **SEO Optimized**: Complete meta tags, structured data, and Open Graph tags
- **Accessibility**: WCAG AAA compliant with proper ARIA attributes

## 🛠️ Technology Stack

- **Vue.js 2.6.14**: Progressive JavaScript framework
- **Vuetify 2.6.0**: Material Design component framework
- **EmailJS**: Form handling and email service
- **Vue Router 3.5.0**: Client-side routing
- **Vue CLI**: Build tool and development server

## 📁 Project Structure

```
SandS Small Engine Repair/
├── public/
│   ├── index.html          # Main HTML file with SEO meta tags
│   └── favicon.ico         # Browser tab icon
├── src/
│   ├── assets/             # Images, fonts, static files
│   │   └── logo.png        # Business logo
│   ├── components/         # Vue components
│   │   ├── HeroSection.vue
│   │   ├── AboutServices.vue
│   │   ├── TipsSection.vue
│   │   ├── QuoteForm.vue
│   │   ├── ContactSection.vue
│   │   └── Footer.vue
│   ├── plugins/
│   │   └── vuetify.js      # Vuetify configuration
│   ├── router/
│   │   └── index.js        # Vue Router configuration
│   ├── App.vue             # Root component
│   └── main.js             # Application entry point
├── package.json            # Dependencies and scripts
├── vue.config.js           # Vue CLI configuration
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. **Clone or download the project**
   ```bash
   cd "C:\Users\Sadeg\Source\SandS Small Engine Repair"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run serve
   ```

4. **Open in browser**
   - Navigate to `http://localhost:8080`
   - The site will automatically open in your default browser

### Production Build

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## ⚙️ Configuration

### EmailJS Setup

1. **Create EmailJS account** at [https://www.emailjs.com](https://www.emailjs.com)

2. **Create a service** (Gmail, Outlook, etc.)

3. **Create an email template** with these variables:
   - `{{from_name}}` - Customer name
   - `{{from_email}}` - Customer email
   - `{{phone_number}}` - Customer phone
   - `{{message}}` - Customer message
   - `{{to_name}}` - Your business name
   - `{{reply_to}}` - Reply-to email

4. **Update configuration** in `src/components/QuoteForm.vue`:
   ```javascript
   emailjsConfig: {
     serviceId: 'your_service_id_here',
     templateId: 'your_template_id_here',
     publicKey: 'your_public_key_here'
   }
   ```

### Customization

#### Replace Placeholder Content

1. **Logo**: Replace `src/assets/logo.png` with your actual logo
2. **Phone Number**: Update `(321) 345-1480` in all components
3. **Email**: Update `info@southernandsons.com` in all components
4. **Facebook URL**: Update the Facebook profile URL
5. **Images**: Replace Unsplash URLs with your actual images

#### Update Business Information

- **Business Name**: Update in all components and `public/index.html`
- **Service Area**: Modify location information as needed
- **Hours**: Update business hours in contact sections
- **Services**: Add or remove services in `AboutServices.vue`

#### Styling Customization

- **Colors**: Modify theme colors in `src/plugins/vuetify.js`
- **Fonts**: Update font families in Vuetify configuration
- **Spacing**: Adjust padding and margins in component styles

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: > 960px

## ♿ Accessibility Features

- **WCAG AAA Compliant**: High contrast ratios (7:1)
- **Large Fonts**: Minimum 20px base font size
- **Touch Targets**: Minimum 48px for mobile interaction
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Indicators**: Clear focus states for navigation

## 🔧 Development

### Available Scripts

- `npm run serve` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality

### Code Style

- **Vue 2 Options API**: Using data, methods, computed, mounted
- **Vuetify Components**: Proper component usage and theming
- **ESLint**: Code quality and consistency
- **Comments**: Detailed JSDoc comments for all methods

## 📈 SEO Features

- **Meta Tags**: Complete title, description, and keywords
- **Open Graph**: Facebook and social media optimization
- **Structured Data**: Schema.org LocalBusiness markup
- **Sitemap Ready**: Optimized for search engine indexing
- **Performance**: Optimized images and code splitting

## 🚀 Deployment

### Static Hosting (Recommended)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3
   - Any static hosting service

### Server Deployment

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Serve the `dist/` folder** with any web server:
   - Apache
   - Nginx
   - IIS
   - Node.js server

## 🔍 Performance Optimization

- **Code Splitting**: Automatic chunk splitting for better caching
- **Image Optimization**: WebP support and compression
- **Font Loading**: Optimized Google Fonts loading
- **CSS Extraction**: Separate CSS files for better caching
- **Minification**: JavaScript and CSS minification in production

## 🐛 Troubleshooting

### Common Issues

1. **EmailJS not working**:
   - Check service ID, template ID, and public key
   - Verify EmailJS account is active
   - Check browser console for errors

2. **Images not loading**:
   - Verify image URLs are accessible
   - Check CORS settings for external images
   - Ensure images are in the correct directory

3. **Styling issues**:
   - Clear browser cache
   - Check Vuetify theme configuration
   - Verify CSS is being loaded properly

### Development Issues

1. **Port already in use**:
   ```bash
   npm run serve -- --port 8081
   ```

2. **Dependencies issues**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📞 Support

For technical support or questions about this website:

- **Email**: info@southernandsons.com
- **Phone**: (321) 345-1480
- **Facebook**: [Southern and Sons Facebook](https://www.facebook.com/profile.php?id=61582473064509)

## 📄 License

This project is proprietary software for Southern and Sons Small Engine Repair, LLC.

## 🔄 Updates

To update the website:

1. **Backup current version**
2. **Update content** in respective Vue components
3. **Test changes** in development mode
4. **Build and deploy** to production

---

**Built with ❤️ for Southern and Sons Small Engine Repair, LLC**

*Professional small engine repair services in Brevard County, Florida*
