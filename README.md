# 🕌 MasjidApp - Islamic Community Application

A comprehensive monorepo application designed to serve Islamic communities with prayer times, Quran access, Qibla direction, donations, and community features. Built with modern web technologies and React Native for cross-platform mobile support.

## 📱 Features

### 🕌 Core Islamic Features
- **Prayer Times**: Daily prayer schedules with Fajr, Dhuhr, Asr, Maghrib, and Isha
- **Qibla Direction**: Real-time compass-based Qibla finder with GPS integration
- **Quran Access**: Complete 114 Surah index with Juz organization
- **Islamic Calendar**: Hijri and Gregorian date display
- **Hadith & Reminders**: Daily Islamic teachings and announcements

### 💰 Community Features
- **Donation System**: Multiple causes (General Fund, Construction, Education, Charity, Iftar, Zakat)
- **Payment Methods**: QR codes, card payments, and PayPal integration
- **Community Blog**: Share Islamic knowledge and community updates
- **Contact Management**: Easy communication with masjid administration

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme**: Automatic theme switching based on system preferences
- **Smooth Animations**: Framer Motion powered interactions
- **Modern UI**: Tailwind CSS with glassmorphism design elements

## 🏗️ Architecture

### Monorepo Structure
```
MasjidApp/
├── apps/
│   ├── web/          # React + Vite web application
│   └── mobile/       # React Native + Expo mobile app
├── packages/
│   └── shared/       # Shared utilities and components
└── package.json      # Root workspace configuration
```

### Technology Stack

#### Web Application (`apps/web/`)
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS + PostCSS
- **Routing**: React Router DOM 6
- **Animations**: Framer Motion
- **State Management**: React Hooks

#### Mobile Application (`apps/mobile/`)
- **Framework**: React Native 0.74 + Expo 51
- **Navigation**: React Navigation 6
- **TypeScript**: Full type safety
- **Platform Support**: iOS, Android, Web

#### Shared Package (`packages/shared/`)
- **Common Utilities**: Shared between web and mobile
- **Type Definitions**: Consistent interfaces
- **Build System**: TypeScript compilation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- For mobile development: Expo CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MasjidApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development servers**
   ```bash
   # Start both web and mobile simultaneously
   npm run dev
   
   # Or start individually
   npm run dev:web      # Web app on http://localhost:5173
   npm run dev:mobile   # Expo development server
   ```

### Development Commands

```bash
# Root workspace commands
npm run dev           # Start both web and mobile
npm run build         # Build web application
npm run lint          # Run linting (placeholder)

# Web app specific
cd apps/web
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Mobile app specific
cd apps/mobile
npm start            # Start Expo development server
npm run android      # Run on Android emulator
npm run ios          # Run on iOS simulator
npm run web          # Run in web browser
```

## 📱 Mobile App Setup

### Expo Development
1. Install Expo CLI globally: `npm install -g @expo/cli`
2. Start the development server: `npm start`
3. Use Expo Go app on your device or run in emulator

### Platform-Specific Builds
```bash
# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

## 🌐 Web App Features

### Pages & Routes
- **Home** (`/`): Prayer times, announcements, Qibla direction
- **Menu** (`/menu`): Navigation and quick access
- **Quran** (`/quran`): Surah index and Juz organization
- **Donations** (`/donation`): Multi-cause donation system
- **Special** (`/special`): Special Islamic events and programs
- **Contact** (`/contact`): Communication with masjid
- **Blog** (`/blog`): Islamic knowledge and community updates

### Key Components
- **QiblaCard**: GPS-based Qibla direction finder
- **PrayerTimes**: Daily prayer schedule with merits/demerits
- **DonationForm**: Multi-step donation process
- **QuranIndex**: Complete Surah and Juz navigation

## 🔧 Configuration

### Environment Variables
Create `.env` files in respective app directories:

```bash
# apps/web/.env
VITE_API_URL=your_api_endpoint
VITE_GOOGLE_MAPS_API_KEY=your_maps_api_key

# apps/mobile/.env
EXPO_PUBLIC_API_URL=your_api_endpoint
```

### Tailwind CSS (Web)
Custom configuration in `apps/web/tailwind.config.ts`:
- Custom color palette for Islamic theme
- Responsive breakpoints
- Custom font families

### Vite Configuration (Web)
Build optimization and development server settings in `apps/web/vite.config.ts`

## 📦 Build & Deployment

### Web Application
```bash
cd apps/web
npm run build
# Output: dist/ directory
```

### Mobile Application
```bash
cd apps/mobile
npm run build:android  # Android APK
npm run build:ios      # iOS build
```

### Shared Package
```bash
cd packages/shared
npm run build
# Output: dist/ directory
```

## 🧪 Testing

### Web App Testing
```bash
cd apps/web
npm test              # Run test suite
npm run test:coverage # Coverage report
```

### Mobile App Testing
```bash
cd apps/mobile
npm test              # Jest tests
npm run test:e2e      # End-to-end tests
```

## 📊 Performance

### Web App Optimization
- Vite build optimization
- Code splitting and lazy loading
- Image optimization
- CSS purging with Tailwind

### Mobile App Optimization
- Expo optimization
- React Native performance best practices
- Image caching and lazy loading

## 🔒 Security Features

- HTTPS enforcement
- Input validation and sanitization
- Secure payment processing
- Privacy-compliant data handling

## 🌍 Internationalization

- Arabic text support
- Hijri calendar integration
- Multi-language prayer names
- Cultural sensitivity in design

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- TypeScript for type safety
- ESLint for code quality
- Prettier for formatting
- Conventional commits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Islamic community members for feedback and testing
- Open source contributors and libraries
- Design inspiration from Islamic architecture and art

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Changelog

### Version 0.1.0
- Initial release
- Core Islamic features
- Web and mobile applications
- Basic donation system
- Qibla direction finder

---

**Built with ❤️ for the Islamic community**

*May Allah bless this project and all those who use it.*
