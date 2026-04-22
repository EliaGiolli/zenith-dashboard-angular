# 🌟 Zenith Dashboard

> A modern, feature-rich server management dashboard built with Angular 19, featuring real-time monitoring, dark theme support, and accessible UI components.

[![Angular](https://img.shields.io/badge/Angular-19.2.24-red?logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📋 Table of Contents

- [✨ Features](#features)
- [🏗️ Project Architecture](#project-architecture)
- [🛠️ Technology Stack](#technology-stack)
- [🚀 Getting Started](#getting-started)
- [📦 Available Scripts](#available-scripts)
- [📂 Project Structure](#project-structure)
- [🔧 Core Logic & Infrastructure](#-core-logic--infrastructure)
- [🎨 Design System](#design-system)
- [🧩 Custom Component Architecture](#-custom-component-architecture)
- [🔒 Accessibility](#accessibility)
- [📚 Additional Resources](#additional-resources)

---

## ✨ Features

### 🎛️ **Dashboard** 
- Real-time server monitoring with live status indicators
- Interactive server cards displaying CPU and memory usage metrics
- Advanced search functionality to filter servers by name
- Visual status indicators for online, offline, and maintenance states
- Last update timestamp tracking for each monitored server

### 📊 **Analytics**
- Comprehensive analytics view for server infrastructure analysis
- Integration with server form for adding new nodes to the cluster
- Historical data visualization capabilities
- Performance metrics tracking and reporting
- Nested routing to add new server nodes directly from analytics

### 🖥️ **Server Management**
- **Add New Servers**: Create and register new server nodes with validation
  - Node name validation (minimum 3 characters)
  - IP address validation (IPv4 format)
  - Status selection (online, offline, maintenance)
- **Form Card Component**: Reusable form container with header, body, and footer sections
- **Modal Dialogs**: Accessible native HTML5 dialogs with dark theme support
- **Real-time Validation**: Instant feedback on form field validity
- **Success States**: Visual confirmation after server registration

### 📧 **Contact Form**
- Professional contact form for user inquiries
- Multi-field validation:
  - Name (minimum 3 characters)
  - Email (RFC-compliant email validation)
  - Message (minimum 10 characters)
- Loading states and success confirmations
- Accessible error messages with ARIA attributes
- Form reset functionality

### 🌓 **Dark Theme Support**
- Complete light and dark theme implementation using CSS custom properties
- Smooth theme transitions with automatic color adjustments
- Dark theme CSS variables with proper contrast ratios
- Theme persistence using service-based state management
- Accessible modal and form styling in both themes

### ♿ **Accessibility Features**
- ARIA labels and descriptions for all interactive elements
- Semantic HTML5 structure throughout the application
- Keyboard navigation support for forms and modals
- High contrast ratios in both light and dark themes
- Proper error message announcements with `role="alert"`
- Status messages with `aria-live="polite"` for screen readers
- Modal A11y directive for native dialog accessibility
- Status badge directive for server status visualization

---

## 🏗️ Project Architecture

### **Core Module** (`src/app/core/`)
- **Services**: Centralized business logic for server and settings management
  - `ServerService`: HTTP communication and polling for server status
  - `SettingServiceService`: Theme and application settings management
- **Interceptors**: Request/response middleware
  - `MockInterceptor`: Simulates backend API responses with mock data
  - `ErrorInterceptor`: Centralized error handling
- **Directives**: Reusable DOM behaviors
  - `ModalA11yDirective`: Accessibility enhancements for native dialogs
  - `StatusBadgeDirective`: Dynamic server status badge rendering
- **Models & Schemas**: Type definitions and Zod validation schemas
  - `Server` model with status, CPU/memory metrics
  - `ServerSchema` for runtime validation

### **Features Module** (`src/app/features/`)
- **Dashboard**: Server monitoring and overview
- **Analytics**: Advanced metrics and analysis
- **Server Form**: Server registration and management
- **Contacts**: User contact form
- **Sidebar**: Navigation and theme toggle

### **Shared Module** (`src/app/shared/`)
- **Reusable Components**:
  - `AppFormCard`: Container component for form layouts
  - `AppButton`: Unified button component with variants
  - `SearchInput`: Debounced search input field
  - `ServerCard`: Server status display card

---

## 🛠️ Technology Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Angular 19.2.0 |
| **Language** | TypeScript 5.7.2 |
| **Styling** | CSS3 with Custom Properties |
| **Forms** | Reactive Forms (Angular) |
| **State Management** | Signals (Angular 19) |
| **Routing** | Angular Router with nested routes |
| **HTTP Client** | Angular HttpClient with Interceptors |
| **Validation** | Zod 4.3.6 (Runtime schema validation) |
| **Build Tool** | Angular CLI 19.2.24 |
| **Testing** | Karma + Jasmine |
| **Backend** | Express.js 4.18.2 (for SSR) |
| **SSR** | Angular Universal (@angular/ssr 19.2.24) |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18.18.0 or higher
- **npm** 9.0.0 or higher (or yarn)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/zenith-dashboard.git
   cd zenith-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

---

## 📦 Available Scripts

### Development

| Command | Description |
|---------|-------------|
| `npm start` | Start the development server with hot reload |
| `npm run watch` | Build in watch mode for development |
| `npm run ng` | Run Angular CLI commands directly |

### Building & Deployment

| Command | Description |
|---------|-------------|
| `npm run build` | Build the project for production |
| `npm run serve:ssr:zenith-dashboard` | Run SSR production build locally |

### Testing & Quality

| Command | Description |
|---------|-------------|
| `npm test` | Run unit tests with Karma test runner |

---

## 📂 Project Structure

```
zenith-dashboard/
├── src/
│   ├── app/
│   │   ├── core/                          # Core services, models, and interceptors
│   │   │   ├── directives/               # Reusable DOM behaviors
│   │   │   │   ├── modal-a11y.directive.ts
│   │   │   │   └── status-badge.directive.ts
│   │   │   ├── interceptors/             # HTTP interceptors
│   │   │   │   ├── mock.interceptor.ts
│   │   │   │   └── error.interceptor.ts
│   │   │   ├── models/                   # TypeScript interfaces
│   │   │   │   └── server.model.ts
│   │   │   ├── schemas/                  # Zod validation schemas
│   │   │   │   └── server.schema.ts
│   │   │   └── services/                 # Business logic
│   │   │       ├── server.service.ts     # Server API communication
│   │   │       └── setting-service.service.ts # Theme management
│   │   ├── features/                     # Feature modules
│   │   │   ├── dashboard/               # Server overview
│   │   │   ├── analytics/               # Metrics & analysis
│   │   │   ├── server-form/             # Server registration
│   │   │   ├── contacts/                # Contact form
│   │   │   └── sidebar/                 # Navigation & theme
│   │   ├── shared/                       # Shared components
│   │   │   └── components/
│   │   │       ├── app-form-card/       # Form container
│   │   │       ├── button/              # Button component
│   │   │       ├── search-input/        # Search field
│   │   │       └── server-card/         # Server card display
│   │   ├── app.component.ts              # Root component
│   │   ├── app.routes.ts                 # Route definitions
│   │   ├── app.config.ts                 # App configuration
│   │   └── app.config.server.ts          # SSR configuration
│   ├── main.ts                           # Application entry point
│   ├── main.server.ts                    # SSR entry point
│   ├── server.ts                         # Express server setup
│   ├── styles.css                        # Global styles & theme tokens
│   └── index.html                        # HTML template
├── public/                                # Static assets
├── angular.json                          # Angular configuration
├── tsconfig.json                         # TypeScript configuration
├── package.json                          # Dependencies
└── README.md                             # Project documentation
```

---

### 🔧 Core Logic & Infrastructure

#### **Mock Persistence Interceptor**
Unlike standard mock interceptors, our `MockInterceptor` implements a **Stateful Persistence Layer**. 
- **In-Memory Database**: Data is stored in a persistent variable outside the interceptor function, preventing state reset during polling.
- **SSR-Aware Latency**: Uses `isPlatformServer` to toggle latency. It provides a 0ms delay during Prerendering to prevent build timeouts and 800ms in the browser to test UI Skeletons.
- **Type Safety**: Implements explicit body casting to handle TypeScript spread operations safely (fixing TS2698).

#### **Reactive Polling Service**
The `ServerService` uses a **Hybrid Reactive Pattern**:
- **Automatic Polling**: Utilizes RxJS `timer` for background synchronization.
- **Manual Triggers**: A `BehaviorSubject` acts as a "Refresh Signal". When a new server is added via `POST`, it manually triggers the polling stream, providing instant UI updates without waiting for the next timer cycle.

#### **Advanced Directives**
- **NativeModalDirective**: Bridges Angular's lifecycle with the browser's **HTML5 Dialog API**. It handles `.showModal()` in the `AfterViewInit` hook to ensure the backdrop and focus trapping are correctly initialized.
- **StatusBadgeDirective**: A purely declarative approach to UI state. It uses `@HostBinding` and **Signals** to map server statuses to data-attributes and ARIA-labels, separating business logic from CSS styling.

## 🎨 Design System

### Color Tokens

#### Light Theme
```css
--bg-app: #f8fafc
--surface: #ffffff
--surface-2: #f1f5f9
--text-main: #1e293b
--text-muted: #64748b
--border: #e2e8f0
--accent: #7c3aed
--accent-hover: #6d28d9
```

#### Dark Theme
```css
--bg-app: #09090b
--surface: #18181b
--surface-2: #27272a
--text-main: #f4f4f5
--text-muted: #a1a1aa
--border: #3f3f46
--accent: #a78bfa
--accent-hover: #c4b5fd
```

### Status Indicators
- **Online**: 🟢 Green (#10b981)
- **Offline**: 🔴 Red (#ef4444)
- **Maintenance**: 🟡 Amber (#f59e0b)

---

## 🔒 Accessibility

### WCAG 2.1 Compliance
- ✅ **Level AA** contrast ratios in both light and dark themes
- ✅ Keyboard navigation throughout the application
- ✅ Semantic HTML structure
- ✅ ARIA labels and descriptions for all form fields
- ✅ Proper error announcements with `role="alert"`
- ✅ Status updates with `aria-live` regions

### Key Accessibility Features
- **Forms**: All inputs have associated labels and error descriptions
- **Modals**: Native HTML5 dialogs with backdrop and proper focus management
- **Navigation**: Sidebar with proper ARIA landmarks
- **Status Badges**: Visual and textual status indicators with icons
- **Theme Toggle**: Accessible theme switcher in sidebar

---

### 🧩 Custom Component Architecture

Our components follow a **Slot-Based Projection Pattern** to ensure maximum reusability and clean separation of concerns.

#### **The FormCard Pattern**
Instead of rigid components, we developed `AppFormCard` using **Multiple Named Content Projection**:
- `<ng-content select="[form-title]">`: Projects the header logic, allowing dynamic titles based on Signal states.
- `<ng-content select="[form-body]">`: Hosts the reactive form inputs.
- `<ng-content select="[form-actions]">`: Segregates buttons (Cancel/Save) to ensure consistent layout across different features (Servers vs. Contacts).

#### **Signal-Driven Components**
All shared components (Buttons, Cards, Inputs) leverage **Angular Signals**:
- **Computed State**: Components like `Analytics` use `computed()` to derive counts and loading states directly from the global state signal.
- **Interop**: We use `toSignal` to bridge our RxJS data streams into the template, eliminating the need for manual subscriptions, `ngOnInit`, or `OnDestroy`.

---

## 🔧 Configuration

### Environment
- Production build optimization is handled automatically by Angular CLI
- Mock API responses are intercepted by `MockInterceptor`
- Server-Side Rendering (SSR) is configured via `@angular/ssr`

### Routing
```typescript
Routes:
  '' → Dashboard (default)
  '/dashboard' → Dashboard
  '/analytics' → Analytics
  '/analytics/nodes/new' → Server Form (nested)
  '/contacts' → Contacts
  '**' → Redirect to Dashboard (404 handling)
```

---

## 📚 Additional Resources

### Documentation
- [Angular Official Documentation](https://angular.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [WCAG 2.1 Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref)
- [MDN Web Docs - Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Related Tools
- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Karma Test Runner](https://karma-runner.github.io)
- [Zod Validation Library](https://zod.dev)

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Development Tips

### Adding a New Feature
1. Create a new component in `src/app/features/`
2. Define route in `app.routes.ts`
3. Use shared components from `src/app/shared/`
4. Inject services from `src/app/core/services/`

### Theming
- Update CSS variables in `src/styles.css`
- Use `var(--token-name)` in component styles
- Test both light and dark themes

### Testing
Run tests with `npm test` and check coverage reports in `coverage/` directory.

---

**Built with ❤️ using Angular 19**
