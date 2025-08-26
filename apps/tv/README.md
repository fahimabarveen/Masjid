# Masjid Android TV Dashboard

A comprehensive, responsive dashboard application designed for Android TV, Web, and Mobile platforms to manage and display Masjid information, prayer times, and community announcements.

## 🎨 Color Theme

The application uses a carefully selected purple color palette for optimal visibility and aesthetics:

- **Primary**: `#3B1E54` - Deep purple
- **Secondary**: `#9B7EBD` - Rich purple
- **Tertiary**: `#D4BEE4` - Soft lavender  
- **Accent**: `#B2B0E8` - Light periwinkle

## ✨ Features

### 🔐 Authentication System
- **Login Screen**: Clean, responsive login interface
- **Input Fields**: Masjid Name and Location with proper placeholders
- **Form Validation**: Ensures required fields are completed
- **Loading States**: Smooth transitions and loading indicators
- **Session Persistence**: Users remain logged in after page refresh

### 🎯 Header Navigation
- **Masjid Logo**: 3D-styled mosque icon with gradient effects
- **Masjid Information**: Name and location display
- **Dual Calendar System**: 
  - **Hijri date**: Accurate Islamic calendar with proper Arabic month names and year calculation
    - Format: `1447 – (Rabīʿ al-Awwal) – 03`
    - Uses proper Arabic diacritics and month names
  - **Gregorian date**: Full date format with 3D calendar icons
  - **3D calendar icons**: Enhanced hover effects and visual appeal
- **World Clock**: Enhanced dropdown with comprehensive timezone support
  - **50+ Countries**: Extensive list including Islamic countries, major world cities, and regions
  - **Scrollable List**: Easy navigation through countries with custom scrollbar
  - **AM/PM format**: Correct local time display for each selected country
  - **Real-time updates**: Live time synchronization
  - **Error handling**: Graceful fallback for invalid timezones
  - **Improved UI**: Better sizing, alignment, and visual balance
- **Logout Button**: Secure session management with localStorage cleanup

### 📱 Responsive Design
- **Android TV Optimized**: Large touch targets, enhanced focus indicators
- **Web Compatible**: Hover effects, smooth animations
- **Mobile Friendly**: Touch-optimized interface, responsive layouts
- **Cross-Platform**: Consistent experience across all devices

### 🎭 Smooth Animations
- **Fade-in Effects**: Elegant entrance animations
- **Slide-up Transitions**: Smooth component reveals
- **Scale Animations**: Interactive hover and focus states
- **Bounce Effects**: Gentle attention-grabbing animations

### 🕰️ Dashboard Features
- **Real-time Clock**: Large, prominent time display
- **Prayer Times**: Complete prayer schedule with next prayer highlighting
- **Announcements**: Community updates and important notices
- **Quick Actions**: Easy access to Quran, Qibla, Donations, Contact
- **Weather Information**: Current conditions and settings
- **Recent Activities**: Timeline of masjid events
- **Donation Progress**: Visual progress tracking

## 🔧 Recent Updates

### ✅ Fixed Issues
- **Hijri Date Calculation**: Improved algorithm for accurate Islamic calendar display
- **World Clock Functionality**: Fixed timezone handling and country selection
- **Color Theme**: Updated to beautiful deep purple palette for better visual appeal
- **Session Management**: Added persistent login state across page refreshes

### 🎨 Enhanced Features
- **Accurate Hijri Dates**: Proper day, month name (with Arabic diacritics), and year calculation
- **Reliable World Clock**: Correct local time display for 50+ countries
- **Improved Error Handling**: Graceful fallbacks for edge cases
- **Enhanced Dropdown**: Scrollable country list with custom scrollbar styling
- **Better UI Balance**: Improved dropdown sizing and alignment
- **Session Persistence**: Users stay logged in after browser refresh

### 🌍 World Clock Countries
The application now supports 50+ countries including:
- **Islamic Countries**: Saudi Arabia, Pakistan, Egypt, UAE, Jordan, Lebanon, Syria, Iraq, Iran, Afghanistan, Bangladesh, Turkey, Malaysia, Indonesia
- **Major Cities**: New York, London, Tokyo, Sydney, Moscow, Berlin, Paris, Rome, Madrid
- **Asian Nations**: India, China, Japan, South Korea, Singapore, Thailand, Vietnam, Philippines
- **European Union**: Netherlands, Belgium, Switzerland, Austria, Sweden, Norway, Denmark, Finland
- **Americas**: Brazil, Argentina, Mexico, Canada
- **And many more...**

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Masjid-1/apps/tv
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Lint code
npm run lint
```

## 🏗️ Project Structure

```
apps/tv/
├── src/
│   ├── components/
│   │   ├── LoginScreen.tsx      # Authentication interface
│   │   ├── Header.tsx           # Navigation and info display
│   │   └── Dashboard.tsx        # Main dashboard content
│   ├── main.tsx                 # Application entry point with session management
│   ├── styles.css               # Global styles and animations
│   └── vite-env.d.ts            # Vite type definitions
├── tailwind.config.ts           # Tailwind CSS configuration
├── vite.config.ts               # Vite build configuration
└── package.json                 # Dependencies and scripts
```

## 🎯 Platform-Specific Features

### Android TV
- **Large Touch Targets**: Minimum 60x120px for remote navigation
- **Enhanced Focus Indicators**: Clear visual feedback for D-pad navigation
- **Optimized Layouts**: Content designed for large screen viewing
- **Remote Control Support**: Keyboard and remote navigation optimized

### Web Browser
- **Hover Effects**: Interactive hover states for mouse users
- **Smooth Scrolling**: Custom scrollbar styling for dropdowns
- **Responsive Breakpoints**: Optimized for various screen sizes
- **Accessibility**: Proper focus management and keyboard navigation
- **Session Persistence**: localStorage-based session management

### Mobile Devices
- **Touch Optimization**: Minimum 44x80px touch targets
- **Gesture Support**: Touch-friendly interactions
- **Responsive Typography**: Adaptive text sizing
- **Performance**: Optimized for mobile hardware

## 🎨 Customization

### Color Scheme
The color theme can be easily modified in `tailwind.config.ts`:

```typescript
colors: {
  primary: '#3B1E54',    // Main brand color (deep purple)
  secondary: '#9B7EBD',  // Secondary elements (rich purple)
  tertiary: '#D4BEE4',   // Tertiary elements (soft lavender)
  accent: '#B2B0E8',     // Accent highlights (light periwinkle)
}
```

### Animations
Custom animations are defined in the Tailwind config:

```typescript
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'slide-up': 'slideUp 0.3s ease-out',
  'scale-in': 'scaleIn 0.2s ease-out',
  'bounce-gentle': 'bounceGentle 2s infinite',
}
```

## 🔧 Technical Details

### Built With
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Performance Features
- **Lazy Loading**: Components load as needed
- **Optimized Animations**: Hardware-accelerated CSS transitions
- **Responsive Images**: Optimized for different screen densities
- **Code Splitting**: Efficient bundle management
- **Session Persistence**: localStorage-based state management

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
@media (min-width: 640px)   /* sm */
@media (min-width: 768px)   /* md */
@media (min-width: 1024px)  /* lg */
@media (min-width: 1280px)  /* xl */
@media (min-width: 1920px)  /* tv */
```

## 🚀 Deployment

### Android TV
1. Build the application: `npm run build`
2. Package as APK using Android Studio or similar tools
3. Install on Android TV device

### Web
1. Build: `npm run build`
2. Deploy `dist/` folder to any static hosting service
3. Configure for SPA routing if needed

### Progressive Web App
The application is PWA-ready with:
- Responsive design
- Offline capabilities (with service worker)
- App-like experience
- Install prompts
- Session persistence

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ for the Muslim community**
