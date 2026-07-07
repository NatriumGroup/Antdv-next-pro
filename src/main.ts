import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import { router, setupRouterGuards } from './router'
import { setupDirectives } from './directives'
import { i18n } from './locales'

import 'antdv-next/dist/reset.css'
import 'antdv-next/dist/antd.css'
import './styles/global.css'

async function bootstrap() {
  // 开发环境启动 Mock（失败不阻塞应用）
  if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK === 'true') {
    try {
      const { worker } = await import('./mock/browser')
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
      })
    } catch (e) {
      console.warn('[Mock] MSW 启动失败，跳过 Mock。运行 `npx msw init public/` 生成 Service Worker 文件。', e)
    }
  }

  const app = createApp(App)

  // Pinia
  const pinia = createPinia()
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)

  // Router
  app.use(router)

  // Router guards（必须在 Pinia 之后）
  setupRouterGuards(router)

  // I18n
  app.use(i18n)

  // Custom directives
  setupDirectives(app)

  // Mount
  app.mount('#app')
}

bootstrap()
