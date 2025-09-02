# 🛍️ E-commerce Micro Frontend Application

A modern, scalable e-commerce application built using micro-frontend architecture with React. This application demonstrates how to build and manage multiple independent frontend applications that work together seamlessly.

## 🏗️ Architecture Overview

The application is structured as a micro-frontend monorepo with the following components:

- **Shell Application** (Port 3000): Main orchestrator and navigation
- **Home Application** (Port 3001): Landing page and featured content
- **Products Application** (Port 3002): Product catalog and shopping cart
- **Profile Application** (Port 3003): User profile management

## 🚀 Features

### Shell Application
- Centralized navigation and routing
- Micro-frontend orchestration
- Responsive design with modern UI
- Lazy loading of micro-frontends

### Home Application
- Hero carousel with auto-advancing slides
- Feature highlights and benefits
- Featured products showcase
- Category browsing
- Newsletter subscription

### Products Application
- Comprehensive product catalog
- Advanced filtering and search
- Category-based filtering
- Price range filtering
- Sorting options (name, price, rating)
- Shopping cart functionality
- Product ratings and reviews
- Stock status indicators

### Profile Application
- User profile management
- Order history tracking
- Wishlist management
- Notification center
- Preference settings
- Address management
- Loyalty points and tier system

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: CSS3 with modern features
- **State Management**: React Hooks
- **Routing**: React Router DOM
- **Package Manager**: npm with workspaces

## 📁 Project Structure

```
micro-frontend-ecommerce/
├── package.json                 # Root package configuration
├── README.md                   # Project documentation
├── apps/                       # Micro-frontend applications
│   ├── shell/                  # Shell application (Port 3000)
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── index.html
│   │   └── src/
│   │       ├── main.jsx
│   │       ├── App.jsx
│   │       ├── App.css
│   │       ├── index.css
│   │       └── components/
│   │           ├── HomeApp.jsx
│   │           ├── ProductsApp.jsx
│   │           └── ProfileApp.jsx
│   ├── home/                   # Home application (Port 3001)
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── index.html
│   │   └── src/
│   │       ├── main.jsx
│   │       ├── HomeApp.jsx
│   │       ├── HomeApp.css
│   │       └── index.css
│   ├── products/               # Products application (Port 3002)
│   │   ├── package.json
│   │   ├── vite.config.js
│   │   ├── index.html
│   │   └── src/
│   │       ├── main.jsx
│   │       ├── ProductsApp.jsx
│   │       ├── ProductsApp.css
│   │       └── index.css
│   └── profile/                # Profile application (Port 3003)
│       ├── package.json
│       ├── vite.config.js
│       ├── index.html
│       └── src/
│           ├── main.jsx
│           ├── ProfileApp.jsx
│           ├── ProfileApp.css
│           └── index.css
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- npm 8+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd micro-frontend-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

This will start all micro-frontends simultaneously:
- Shell: http://localhost:3000
- Home: http://localhost:3001
- Products: http://localhost:3002
- Profile: http://localhost:3003

### Individual Development

To work on a specific micro-frontend:

```bash
# Shell application
npm run dev:shell

# Home application
npm run dev:home

# Products application
npm run dev:products

# Profile application
npm run dev:profile
```

## 🏗️ Build and Deployment

### Build all applications
```bash
npm run build
```

### Build individual applications
```bash
npm run build:shell
npm run build:home
npm run build:products
npm run build:profile
```

## 🎨 Design Features

- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Gradient Backgrounds**: Beautiful color schemes using CSS gradients
- **Hover Effects**: Interactive elements with smooth transitions
- **Card-based Layout**: Modern card design for content organization
- **Icon Integration**: Emoji-based icons for visual appeal

## 🔧 Development Features

- **Hot Module Replacement**: Fast development with Vite
- **ES6+ Support**: Modern JavaScript features
- **CSS Custom Properties**: Maintainable styling
- **Component Architecture**: Reusable React components
- **State Management**: Local state with React hooks
- **Error Handling**: Graceful error handling and loading states

## 📱 Responsive Breakpoints

- **Mobile**: < 480px
- **Tablet**: 480px - 768px
- **Desktop**: > 768px

## 🚀 Performance Features

- **Lazy Loading**: Components loaded on demand
- **Code Splitting**: Optimized bundle sizes
- **Image Optimization**: Efficient image handling
- **Minimal Dependencies**: Lightweight package structure

## 🔮 Future Enhancements

- **Module Federation**: Advanced micro-frontend integration
- **State Management**: Global state management (Redux/Zustand)
- **Testing**: Unit and integration tests
- **CI/CD**: Automated deployment pipelines
- **PWA**: Progressive web app features
- **Internationalization**: Multi-language support
- **Analytics**: User behavior tracking
- **Performance Monitoring**: Real-time performance metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or support, please open an issue in the repository.

---

**Built with ❤️ using React and Micro-Frontend Architecture**
