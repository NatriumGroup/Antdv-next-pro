<script setup lang="ts">
import { GlobalOutlined } from '@antdv-next/icons'
import PageLoading from '@/components/PageLoading.vue'
</script>

<template>
  <div class="user-layout">
    <!-- 语言切换 -->
    <div class="user-layout-lang">
      <a-dropdown>
        <GlobalOutlined style="font-size: 16px; cursor: pointer; color: rgba(0, 0, 0, 0.65)" />
        <template #overlay>
          <a-menu>
            <a-menu-item key="zh-CN">🇨🇳 简体中文</a-menu-item>
            <a-menu-item key="en-US">🇺🇸 English</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>

    <div class="user-layout-container">
      <!-- Header: Logo + Title -->
      <div class="user-layout-header">
        <div class="user-layout-logo">
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            alt="logo"
          />
          <h1>Antdv Next Pro</h1>
        </div>
        <p class="user-layout-desc">Antdv Next 是最具影响力的 Vue 中后台管理方案</p>
      </div>

      <!-- Content -->
      <div class="user-layout-content">
        <router-view />
      </div>
    </div>

    <!-- Footer -->
    <div class="user-layout-footer">
      <div class="user-layout-links">
        <a href="https://www.antdv-next.com" target="_blank">Antdv Next</a>
        <a-divider type="vertical" />
        <a href="https://github.com/antdv-next/antdv-next" target="_blank">GitHub</a>
        <a-divider type="vertical" />
        <a href="https://www.antdv-next.com/docs/vue/introduce" target="_blank">帮助</a>
      </div>
      <div class="user-layout-copyright">
        Copyright &copy; 2026 Antdv Next Pro
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f0f2f5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0' stop-color='%23e6f4ff' stop-opacity='.3'/%3E%3Cstop offset='1' stop-color='%23f0f2f5' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='%23f0f2f5' width='400' height='400'/%3E%3Ccircle cx='100' cy='80' r='120' fill='url(%23a)'/%3E%3Ccircle cx='350' cy='300' r='150' fill='url(%23a)'/%3E%3C/svg%3E");
  position: relative;
}

.user-layout-lang {
  position: absolute;
  top: 24px;
  right: 32px;
}

.user-layout-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 80px;
}

.user-layout-header {
  text-align: center;
  margin-bottom: 40px;
}

.user-layout-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.user-layout-logo img {
  height: 44px;
}

.user-layout-logo h1 {
  margin: 0;
  font-size: 33px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  font-family: 'Avenir', 'Helvetica Neue', Arial, sans-serif;
}

.user-layout-desc {
  margin-top: 12px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}

.user-layout-content {
  width: 368px;
}

.user-layout-footer {
  padding: 24px 0 32px;
  text-align: center;
}

.user-layout-links {
  margin-bottom: 8px;
}

.user-layout-links a {
  color: rgba(0, 0, 0, 0.45);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.user-layout-links a:hover {
  color: rgba(0, 0, 0, 0.65);
}

.user-layout-copyright {
  color: rgba(0, 0, 0, 0.25);
  font-size: 14px;
}
</style>
