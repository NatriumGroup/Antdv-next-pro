<div align="center">
<img height="180" src="https://www.antdv-next.com/assets/antdv-next-Cum7m2ZU.svg">

<h1>Antdv Next Pro</h1>

</div>

<div align="center">

[English](./README.md) | [简体中文](./README.zh-CN.md) | 繁體中文

基於 [Antdv Next](https://www.antdv-next.com) 的開箱即用的中後台管理系統模板。

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

## 特性

- **TypeScript** — 全量型別安全，覆蓋整個程式碼庫
- **Vue 3.5+** — 組合式 API、`<script setup>`，以及最新的 Vue 生態
- **Antdv Next** — 基於 Ant Design 規範的企業級 UI 元件庫
- **Vite 6** — 極速開發伺服器與最佳化的生產建置
- **Pinia 3** — 直覺的狀態管理，支援持久化儲存
- **國際化** — 內建中英文雙語支援
- **權限控制** — 路由級、選單級、按鈕級三層權限體系
- **主題** — 執行時主題切換（暗色 / 緊湊），透過 SettingDrawer 視覺化設定
- **佈局** — 側邊欄、頂部、混合三種佈局模式，行動端自適應抽屜
- **Mock 資料** — 基於 MSW 的 Mock 方案，支援純前端開發
- **20+ 頁面** — 儀表盤、表單、列表、詳情、結果、異常、帳戶等豐富頁面

## 頁面模板

```
- 歡迎頁
- Dashboard
  - 分析頁
  - 監控頁
  - 工作台
- 表單頁
  - 基礎表單
  - 分步表單
  - 進階表單
- 列表頁
  - 搜尋列表（文章 / 專案 / 應用）
  - 查詢表格
  - 標準列表
  - 卡片列表
- 詳情頁
  - 基礎詳情頁
  - 進階詳情頁
- 結果頁
  - 成功頁
  - 失敗頁
- 異常頁
  - 403 無權限
  - 404 找不到
  - 500 伺服器錯誤
- 帳戶
  - 個人中心
  - 個人設定
- AI 助手
- 使用者
  - 登入
  - 註冊
  - 註冊結果
```

## 快速開始

### 環境要求

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) >= 8

### 安裝

```bash
git clone https://github.com/NatriumGroup/Antdv-next-pro.git
cd antdv-next-pro
pnpm install
```

### 開發

```bash
pnpm dev
```

開發伺服器啟動於 [http://localhost:3100](http://localhost:3100)。

如需啟用 Mock 資料，請在 `.env.development` 中設定 `VITE_USE_MOCK=true`。

### 建置

```bash
# 生產環境
pnpm build

# 預發佈環境
pnpm build:staging

# 預覽生產建置
pnpm preview
```

### 程式碼品質

```bash
# 型別檢查
pnpm type-check

# 程式碼檢查
pnpm lint

# 程式碼檢查並自動修復
pnpm lint:fix
```

## 專案結構

```
src/
├── api/            # API 請求模組
├── components/     # 全域元件（SiderMenu、TabBar、PageContainer 等）
├── composables/    # 組合式函式（usePermission 等）
├── config/         # 應用設定（defaultSettings）
├── directives/     # 自定義指令（v-auth、v-role）
├── layouts/        # 佈局元件（BasicLayout、UserLayout、BlankLayout）
├── locales/        # 國際化語言包（zh-CN、en-US）
├── mock/           # MSW Mock 處理器
├── router/         # 路由定義與導航守衛
├── stores/         # Pinia 狀態管理（app、user、tab）
├── styles/         # 全域樣式
├── types/          # TypeScript 型別宣告
├── utils/          # 工具函式（request、helpers）
└── views/          # 頁面視圖
```

## 技術棧

| 分類 | 技術 |
|---|---|
| 框架 | Vue 3.5+ with TypeScript |
| UI 元件庫 | [Antdv Next](https://www.antdv-next.com) |
| 建置工具 | Vite 6 |
| 狀態管理 | Pinia 3 + pinia-plugin-persistedstate |
| 路由 | Vue Router 4 |
| HTTP 客戶端 | Axios |
| Mock | MSW (Mock Service Worker) |
| 國際化 | vue-i18n |
| 圖表 | @antv/g2、D3.js |
| 圖示 | @antdv-next/icons |

## 瀏覽器支援

支援現代瀏覽器。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions |

## 授權條款

[MIT](./LICENSE)
