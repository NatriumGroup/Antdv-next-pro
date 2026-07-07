<script setup lang="ts">
const infoCards = [
  { index: 1, href: 'https://www.antdv-next.com', title: '了解 Antdv Next', desc: 'antdv-next 是基于 Ant Design 设计体系的 Vue UI 组件库，主要用于研发企业级中后台产品。' },
  { index: 2, href: 'https://vuejs.org', title: '了解 Vue 3', desc: 'Vue 是一套用于构建用户界面的渐进式 JavaScript 框架，易学易用，性能出色。' },
  { index: 3, href: 'https://pinia.vuejs.org', title: '了解 Pinia', desc: 'Pinia 是 Vue 官方状态管理库，类型安全、可扩展、模块化设计。' },
]
</script>

<template>
  <div>
    <div style="margin-bottom: 24px">
      <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: rgba(0,0,0,0.88)">
        欢迎使用 Antdv Next Pro <span style="background: linear-gradient(90deg, #1677ff, #722ed1); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700">V1</span>
      </h2>
    </div>

    <div style="display: flex; gap: 24px">
      <!-- 左：速查 -->
      <div style="flex: 2; min-width: 0">
        <a-card>
          <a-typography>
            <a-typography-title :level="2">开发速查</a-typography-title>
            <a-typography-paragraph>Antdv Next Pro 是一个基于 Antdv Next 的企业级中后台前端解决方案，开箱即用。</a-typography-paragraph>
            <a-typography-title :level="3">快速开始</a-typography-title>
            <a-typography-paragraph>
              <pre style="background: #f6f8fa; padding: 12px 16px; border-radius: 6px; font-size: 13px; line-height: 1.6"><code>pnpm install
pnpm dev</code></pre>
            </a-typography-paragraph>
            <a-typography-title :level="3">技术栈</a-typography-title>
            <a-typography-paragraph>Vue 3.5 + TypeScript + Vite, Antdv Next (Ant Design Vue Next), Pinia + Vue Router, Axios + MSW Mock, vue-i18n 国际化, @antv/g2 图表。</a-typography-paragraph>
            <a-typography-title :level="3">权限控制</a-typography-title>
            <a-typography-paragraph>支持路由级、菜单级、按钮级三层权限。使用 v-auth 指令或 Authority 组件控制按钮显隐，路由 meta.authority 控制页面访问权限。</a-typography-paragraph>
          </a-typography>
        </a-card>
      </div>

      <!-- 右：卡片 -->
      <div style="flex: 1; display: flex; flex-direction: column; gap: 16px">
        <a v-for="card in infoCards" :key="card.index" :href="card.href" target="_blank" rel="noopener noreferrer" style="text-decoration: none; color: inherit">
          <a-card hoverable size="small">
            <div style="display: flex; align-items: flex-start; gap: 12px">
              <div style="width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border-radius: 8px; background: #1677ff; color: #fff; font-size: 16px; font-weight: 700">
                {{ card.index }}
              </div>
              <div style="min-width: 0; flex: 1">
                <h4 style="margin: 0 0 4px; font-size: 14px; font-weight: 600">{{ card.title }}</h4>
                <p style="margin: 0; font-size: 12px; color: rgba(0,0,0,0.45); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden">{{ card.desc }}</p>
              </div>
            </div>
          </a-card>
        </a>
      </div>
    </div>
  </div>
</template>
