<script setup lang="ts">
import { theme } from 'antdv-next'
import zhCN from 'antdv-next/locale/zh_CN'
import enUS from 'antdv-next/locale/en_US'
import { useAppStore } from '@/stores/app'
import { getLocale } from '@/locales'
import SettingDrawer from '@/components/SettingDrawer.vue'

const appStore = useAppStore()

const themeConfig = computed(() => {
  const algorithms: ((token: any) => any)[] = []

  if (appStore.darkMode) {
    algorithms.push(theme.darkAlgorithm)
  } else {
    algorithms.push(theme.defaultAlgorithm)
  }

  if (appStore.compactMode) {
    algorithms.push(theme.compactAlgorithm)
  }

  return {
    token: {
      colorPrimary: appStore.primaryColor,
      borderRadius: 6,
      fontFamily: 'AlibabaSans, sans-serif',
    },
    components: {
      Menu: appStore.darkMode
        ? {
            itemSelectedBg: appStore.primaryColor,
            itemSelectedColor: '#fff',
            subMenuItemSelectedColor: '#fff',
          }
        : {
            itemSelectedBg: '#e6f4ff',
            itemSelectedColor: appStore.primaryColor,
          },
    },
    algorithm: algorithms,
    zeroRuntime: true,
  }
})

// antdv-next 组件语言包
const antdLocale = computed(() => {
  return getLocale() === 'zh-CN' ? zhCN : enUS
})
</script>

<template>
  <a-config-provider :theme="themeConfig" :locale="antdLocale" variant="filled">
    <a-app>
      <router-view />
      <SettingDrawer />
    </a-app>
  </a-config-provider>
</template>
