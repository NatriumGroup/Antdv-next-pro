import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { AntdvNextResolver } from '@antdv-next/auto-import-resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const isProd = mode === 'production'

  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
        dts: 'auto-imports.d.ts',
        dirs: ['src/composables/**'],
      }),
      Components({
        resolvers: [AntdvNextResolver()],
        dts: 'components.d.ts',
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 3100,
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      target: 'es2020',
      chunkSizeWarningLimit: 2000,
      sourcemap: !isProd,
      minify: 'terser',
      terserOptions: {
        compress: {
          // 生产环境去掉 console
          drop_console: isProd,
          drop_debugger: isProd,
        },
      },
      rollupOptions: {
        output: {
          // 分包策略
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            antd: ['antdv-next', '@antdv-next/icons'],
            vendor: ['axios', 'dayjs', 'nprogress'],
          },
          // 资源文件命名
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  }
})
