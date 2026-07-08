<div align="center">
<img height="180" src="https://www.antdv-next.com/assets/antdv-next-Cum7m2ZU.svg">

<h1>Antdv Next Pro</h1>

</div>

<div align="center">

English | [简体中文](./README.zh-CN.md) | [繁體中文](./README.zh-TW.md)

An out-of-the-box admin template based on [Antdv Next](https://www.antdv-next.com).

[![license][license-image]][license-url] [![stars][stars-image]][repo-url] [![forks][forks-image]][fork-url] [![issues][issues-image]][issues-url]
[![vue][vue-image]][vue-url] [![antdv-next][antdv-image]][antdv-url] [![vite][vite-image]][vite-url] [![typescript][ts-image]][ts-url] [![pinia][pinia-image]][pinia-url]



[license-image]: https://img.shields.io/github/license/NatriumGroup/Antdv-next-pro?style=flat-square
[license-url]: ./LICENSE
[stars-image]: https://img.shields.io/github/stars/NatriumGroup/Antdv-next-pro?style=flat-square
[forks-image]: https://img.shields.io/github/forks/NatriumGroup/Antdv-next-pro?style=flat-square
[fork-url]: https://github.com/NatriumGroup/Antdv-next-pro/fork
[issues-image]: https://img.shields.io/github/issues/NatriumGroup/Antdv-next-pro?style=flat-square
[issues-url]: https://github.com/NatriumGroup/Antdv-next-pro/issues
[repo-url]: https://github.com/NatriumGroup/Antdv-next-pro
[vue-image]: https://img.shields.io/badge/vue-3.5+-brightgreen.svg?style=flat-square
[vue-url]: https://vuejs.org/
[antdv-image]: https://img.shields.io/badge/antdv--next-1.x-blue.svg?style=flat-square
[antdv-url]: https://www.antdv-next.com
[vite-image]: https://img.shields.io/badge/vite-6-purple.svg?style=flat-square
[vite-url]: https://vite.dev/
[ts-image]: https://img.shields.io/badge/typescript-5.8-blue.svg?style=flat-square
[ts-url]: https://www.typescriptlang.org/
[pinia-image]: https://img.shields.io/badge/pinia-3-yellow.svg?style=flat-square
[pinia-url]: https://pinia.vuejs.org/

</div>

## Features

- **TypeScript** — Full type safety across the entire codebase
- **Vue 3.5+** — Composition API, `<script setup>`, and the latest Vue ecosystem
- **Antdv Next** — Enterprise-grade UI components based on Ant Design specification
- **Vite 6** — Lightning-fast dev server and optimized production builds
- **Pinia 3** — Intuitive state management with persisted state support
- **I18n** — Built-in internationalization (Chinese & English)
- **Permission** — Route-level, menu-level, and button-level access control
- **Theme** — Runtime theme switching (dark / compact), configurable via SettingDrawer
- **Layout** — Three layout modes: side, top, and mix, with responsive mobile drawer
- **Mock** — MSW-based mock data for frontend-only development
- **20+ Pages** — Dashboard, forms, lists, profiles, results, exceptions, account, and more

## Pages

```
- Welcome
- Dashboard
  - Analysis
  - Monitor
  - Workplace
- Form
  - Basic Form
  - Step Form
  - Advanced Form
- List
  - Search List (Articles / Projects / Applications)
  - Table List
  - Basic List
  - Card List
- Profile
  - Basic Profile
  - Advanced Profile
- Result
  - Success
  - Fail
- Exception
  - 403
  - 404
  - 500
- Account
  - Center
  - Settings
- Chatbot (AI Assistant)
- User
  - Login
  - Register
  - Register Result
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) >= 8

### Install

```bash
git clone https://github.com/NatriumGroup/Antdv-next-pro.git
cd antdv-next-pro
pnpm install
```

### Development

```bash
pnpm dev
```

The dev server starts at [http://localhost:3100](http://localhost:3100).

To enable mock data, set `VITE_USE_MOCK=true` in `.env.development`.

### Build

```bash
# Production
pnpm build

# Staging
pnpm build:staging

# Preview production build
pnpm preview
```

### Code Quality

```bash
# Type check
pnpm type-check

# Lint
pnpm lint

# Lint with auto fix
pnpm lint:fix
```

## Project Structure

```
src/
├── api/            # API request modules
├── components/     # Global components (SiderMenu, TabBar, PageContainer, etc.)
├── composables/    # Vue composables (usePermission, etc.)
├── config/         # App configuration (defaultSettings)
├── directives/     # Custom directives (v-auth, v-role)
├── layouts/        # Layouts (BasicLayout, UserLayout, BlankLayout)
├── locales/        # I18n language packs (zh-CN, en-US)
├── mock/           # MSW mock handlers
├── router/         # Route definitions and navigation guards
├── stores/         # Pinia stores (app, user, tab)
├── styles/         # Global styles
├── types/          # TypeScript type declarations
├── utils/          # Utilities (request, helpers)
└── views/          # Page views
```

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Vue 3.5+ with TypeScript |
| UI Library | [Antdv Next](https://www.antdv-next.com) |
| Build Tool | Vite 6 |
| State Management | Pinia 3 + pinia-plugin-persistedstate |
| Router | Vue Router 4 |
| HTTP Client | Axios |
| Mock | MSW (Mock Service Worker) |
| I18n | vue-i18n |
| Charts | @antv/g2, D3.js |
| Icons | @antdv-next/icons |

## Browser Support

Modern browsers.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions |

## License

[MIT](./LICENSE)
