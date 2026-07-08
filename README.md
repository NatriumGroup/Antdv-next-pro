Language : English | [简体中文](#简体中文)

<h1 align="center">Antdv Next Pro</h1>

<div align="center">

An out-of-the-box admin template based on [Antdv Next](https://www.antdv-next.com).

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
git clone https://github.com/your-repo/antdv-next-pro.git
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
├── components/     # Global components (SiderMenu, TabBar, HeaderSearch, etc.)
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

---

<a id="简体中文"></a>

Language : [English](#) | 简体中文

<h1 align="center">Antdv Next Pro</h1>

<div align="center">

基于 [Antdv Next](https://www.antdv-next.com) 的开箱即用的中后台管理系统模板。

</div>

## 特性

- **TypeScript** — 全量类型安全，覆盖整个代码库
- **Vue 3.5+** — 组合式 API、`<script setup>`，以及最新的 Vue 生态
- **Antdv Next** — 基于 Ant Design 规范的企业级 UI 组件库
- **Vite 6** — 极速开发服务器与优化的生产构建
- **Pinia 3** — 直观的状态管理，支持持久化存储
- **国际化** — 内置中英文双语支持
- **权限控制** — 路由级、菜单级、按钮级三层权限体系
- **主题** — 运行时主题切换（暗色 / 紧凑），通过 SettingDrawer 可视化配置
- **布局** — 侧边栏、顶部、混合三种布局模式，移动端自适应抽屉
- **Mock 数据** — 基于 MSW 的 Mock 方案，支持纯前端开发
- **20+ 页面** — 仪表盘、表单、列表、详情、结果、异常、账户等丰富页面

## 页面模板

```
- 欢迎页
- Dashboard
  - 分析页
  - 监控页
  - 工作台
- 表单页
  - 基础表单
  - 分步表单
  - 高级表单
- 列表页
  - 搜索列表（文章 / 项目 / 应用）
  - 查询表格
  - 标准列表
  - 卡片列表
- 详情页
  - 基础详情页
  - 高级详情页
- 结果页
  - 成功页
  - 失败页
- 异常页
  - 403 无权限
  - 404 找不到
  - 500 服务器错误
- 账户
  - 个人中心
  - 个人设置
- AI 助手
- 用户
  - 登录
  - 注册
  - 注册结果
```

## 快速开始

### 环境要求

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) >= 8

### 安装

```bash
git clone https://github.com/your-repo/antdv-next-pro.git
cd antdv-next-pro
pnpm install
```

### 开发

```bash
pnpm dev
```

开发服务器启动于 [http://localhost:3100](http://localhost:3100)。

如需启用 Mock 数据，请在 `.env.development` 中设置 `VITE_USE_MOCK=true`。

### 构建

```bash
# 生产环境
pnpm build

# 预发布环境
pnpm build:staging

# 预览生产构建
pnpm preview
```

### 代码质量

```bash
# 类型检查
pnpm type-check

# 代码检查
pnpm lint

# 代码检查并自动修复
pnpm lint:fix
```

## 项目结构

```
src/
├── api/            # API 请求模块
├── components/     # 全局组件（SiderMenu、TabBar、HeaderSearch 等）
├── composables/    # 组合式函数（usePermission 等）
├── config/         # 应用配置（defaultSettings）
├── directives/     # 自定义指令（v-auth、v-role）
├── layouts/        # 布局组件（BasicLayout、UserLayout、BlankLayout）
├── locales/        # 国际化语言包（zh-CN、en-US）
├── mock/           # MSW Mock 处理器
├── router/         # 路由定义与导航守卫
├── stores/         # Pinia 状态管理（app、user、tab）
├── styles/         # 全局样式
├── types/          # TypeScript 类型声明
├── utils/          # 工具函数（request、helpers）
└── views/          # 页面视图
```

## 技术栈

| 分类 | 技术 |
|---|---|
| 框架 | Vue 3.5+ with TypeScript |
| UI 组件库 | [Antdv Next](https://www.antdv-next.com) |
| 构建工具 | Vite 6 |
| 状态管理 | Pinia 3 + pinia-plugin-persistedstate |
| 路由 | Vue Router 4 |
| HTTP 客户端 | Axios |
| Mock | MSW (Mock Service Worker) |
| 国际化 | vue-i18n |
| 图表 | @antv/g2、D3.js |
| 图标 | @antdv-next/icons |

## 浏览器支持

支持现代浏览器。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions |

## 许可证

[MIT](./LICENSE)
