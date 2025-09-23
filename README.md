# Slice Weston - Modern Event Venue Website

A modern, responsive website for Slice Weston Event Venue in Weston, Florida. Built with React, TypeScript, and Tailwind CSS.

## 🎯 Project Overview

**Slice Weston** is a premier event venue located in Weston, Florida since 2014. This website replaces their outdated 2018 WordPress site with a modern, professional platform that includes:

- **Event Venue Showcase** - Up to 200 guests capacity
- **Catering Services** - Custom menus for any event type
- **Celebration Specialties** - Weddings, Bar/Bat Mitzvahs, Quinces, Corporate Events
- **Admin Dashboard** - Complete content management for Patty
- **Member Subscriptions** - Exclusive content for subscribers
- **Integrated Business Tools** - Invoicing, payments, and event management

## 🚀 Features

### For Clients
- Modern, responsive design
- Easy navigation and information access
- Photo and video galleries
- Online quote requests
- Contact and location information

### For Patty (Admin)
- **Content Management** - Update website content easily
- **Event Management** - Manage upcoming events and bookings
- **Catering Menus** - Update and manage menu packages
- **Blog & Videos** - Create and manage content
- **Invoice System** - Create and manage invoices
- **Member Management** - Handle subscription plans
- **Analytics** - Track website performance and business metrics

## 🛠️ Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **Development**: Modern ES6+ features

## 📁 Project Structure

```
TEMPslicetemplate/
├── src/                    # Source code
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── App.css            # Global styles
├── app/                    # Application components and routes
│   ├── components/         # Reusable UI components
│   ├── routes/            # Page components
│   │   ├── home.tsx       # Homepage
│   │   ├── admin-dashboard.tsx # Admin panel
│   │   └── ...            # Other pages
│   └── app.css            # Global application styles
├── public/                 # Static assets
├── package.json            # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── vite.config.ts         # Vite build configuration
└── index.html             # HTML template
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to the project directory**
   ```bash
   cd TEMPslicetemplate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🎨 Design System

### Color Palette
- **Primary**: #fbbf24 (Golden Yellow)
- **Secondary**: #1a1a1a (Dark Gray)
- **Accent**: #3b82f6 (Blue)
- **Success**: #10b981 (Green)
- **Background**: #f8fafc (Light Gray)

### Typography
- Modern, clean fonts
- Optimized for readability
- Consistent hierarchy

## 🔧 Customization

### Updating Content
- Use the admin dashboard to update website content
- Modify component files for structural changes
- Update CSS files for styling changes

### Adding New Pages
1. Create a new component in `app/routes/`
2. Add the route to `src/App.tsx`
3. Create corresponding CSS file
4. Update navigation if needed

## 📊 Admin Dashboard

The admin dashboard provides Patty with complete control over:

- **Overview**: Business metrics and quick actions
- **Content Management**: Website content updates
- **Event Management**: Event scheduling and details
- **Catering**: Menu management and updates
- **Blog & Videos**: Content creation and management
- **Invoices**: Payment tracking and management
- **Members**: Subscription management

## 🚀 Deployment

### Netlify
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### Other Platforms
- Vercel
- AWS S3 + CloudFront
- Traditional web hosting

## 📈 Performance Features

- **Fast Loading**: Optimized with Vite
- **SEO Ready**: Meta tags and structured data
- **Mobile First**: Responsive design approach
- **Accessibility**: WCAG compliant
- **Security**: Modern security practices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For technical support or questions about the website:
- **Venue**: Slice Weston
- **Address**: 2600 Glades Circle Suite 1100, Weston, Florida 33327
- **Phone**: 954-557-7086
- **Website**: https://sliceweston.com/

## 📄 License

This project is proprietary software for Slice Weston Event Venue.

---

**Built with ❤️ for Slice Weston - Making every event unforgettable since 2014**
