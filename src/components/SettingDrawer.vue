<script setup lang="ts">
import { h } from 'vue'
import {
  SettingOutlined,
  CloseOutlined,
  CheckOutlined,
} from '@antdv-next/icons'
import { useAppStore, type LayoutMode } from '@/stores/app'
import { defaultSettings } from '@/config/defaultSettings'
import { setLocale, getLocale, type LocaleType } from '@/locales'

const appStore = useAppStore()
const visible = ref(false)
const currentLocale = ref<LocaleType>(getLocale())

function handleLocaleChange(locale: LocaleType) {
  currentLocale.value = locale
  setLocale(locale)
}

// ── 布局模式选项 ──
const layoutOptions: { key: LayoutMode; title: string }[] = [
  { key: 'side', title: '侧边菜单布局' },
  { key: 'top', title: '顶部菜单布局' },
  { key: 'mix', title: '混合布局' },
]

// ── 主题色 ──
const presetColors = defaultSettings.presetColors

function handleColorChange(color: string) {
  appStore.setPrimaryColor(color)
}

// ── 复制配置 ──
function handleCopyConfig() {
  const config = {
    darkMode: appStore.darkMode,
    primaryColor: appStore.primaryColor,
    layoutMode: appStore.layoutMode,
    fixedHeader: appStore.fixedHeader,
    fixedSider: appStore.fixedSider,
    showFooter: appStore.showFooter,
    showTabs: appStore.showTabs,
    colorWeak: appStore.colorWeak,
    contentWidth: appStore.contentWidth,
    compactMode: appStore.compactMode,
  }
  navigator.clipboard.writeText(JSON.stringify(config, null, 2))
}

// ── 色弱模式 ──
watch(
  () => appStore.colorWeak,
  (val) => {
    document.documentElement.style.filter = val ? 'invert(80%)' : ''
  },
  { immediate: true },
)
</script>

<template>
  <!-- 浮动按钮 -->
  <div class="setting-btn" @click="visible = true">
    <SettingOutlined :style="{ fontSize: '20px', color: '#fff' }" />
  </div>

  <!-- 设置抽屉 -->
  <a-drawer
    :open="visible"
    :size="320"
    placement="right"
    :closable="true"
    @close="visible = false"
  >
    <template #title>项目配置</template>

    <!-- 整体风格 -->
    <h4 class="setting-title">整体风格</h4>
    <div class="setting-block-check-group">
      <a-tooltip title="亮色主题">
        <div
          class="setting-block-check-item"
          :class="{ active: !appStore.darkMode }"
          @click="appStore.darkMode = false"
        >
          <div style="background: #fff; border: 1px solid #f0f0f0; border-radius: 4px; overflow: hidden; height: 48px; width: 48px; position: relative">
            <div style="width: 16px; height: 100%; background: #001529" />
          </div>
          <CheckOutlined v-if="!appStore.darkMode" class="check-icon" />
        </div>
      </a-tooltip>
      <a-tooltip title="暗色主题">
        <div
          class="setting-block-check-item"
          :class="{ active: appStore.darkMode }"
          @click="appStore.darkMode = true"
        >
          <div style="background: #001529; border-radius: 4px; overflow: hidden; height: 48px; width: 48px" />
          <CheckOutlined v-if="appStore.darkMode" class="check-icon" />
        </div>
      </a-tooltip>
    </div>

    <!-- 主题色 -->
    <h4 class="setting-title">主题色</h4>
    <div style="display: flex; gap: 8px; flex-wrap: wrap">
      <div
        v-for="color in presetColors"
        :key="color"
        :style="{
          width: '24px',
          height: '24px',
          borderRadius: '4px',
          cursor: 'pointer',
          background: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }"
        @click="handleColorChange(color)"
      >
        <CheckOutlined
          v-if="appStore.primaryColor === color"
          :style="{ color: '#fff', fontSize: '12px' }"
        />
      </div>
    </div>
    <a-color-picker
      :value="appStore.primaryColor"
      style="margin-top: 12px"
      show-text
      @change="(_, hex) => handleColorChange(hex)"
    />

    <a-divider />

    <!-- 导航模式 -->
    <h4 class="setting-title">导航模式</h4>
    <div class="setting-block-check-group">
      <a-tooltip v-for="opt in layoutOptions" :key="opt.key" :title="opt.title">
        <div
          class="setting-block-check-item"
          :class="{ active: appStore.layoutMode === opt.key }"
          @click="appStore.setLayoutMode(opt.key)"
        >
          <div style="background: #f0f2f5; border-radius: 4px; overflow: hidden; height: 48px; width: 48px; position: relative; border: 1px solid #f0f0f0">
            <!-- side -->
            <template v-if="opt.key === 'side'">
              <div style="width: 16px; height: 100%; background: #001529; position: absolute; left: 0; top: 0" />
              <div style="height: 10px; background: #fff; position: absolute; left: 16px; top: 0; right: 0" />
            </template>
            <!-- top -->
            <template v-if="opt.key === 'top'">
              <div style="width: 100%; height: 10px; background: #001529; position: absolute; left: 0; top: 0" />
            </template>
            <!-- mix -->
            <template v-if="opt.key === 'mix'">
              <div style="width: 100%; height: 10px; background: #001529; position: absolute; left: 0; top: 0" />
              <div style="width: 16px; height: 100%; background: #fff; border-right: 1px solid #e8e8e8; position: absolute; left: 0; top: 10px" />
            </template>
          </div>
          <CheckOutlined v-if="appStore.layoutMode === opt.key" class="check-icon" />
        </div>
      </a-tooltip>
    </div>

    <a-divider />

    <!-- 内容区域 -->
    <h4 class="setting-title">内容区域</h4>
    <div class="setting-row">
      <span>内容区域宽度</span>
      <a-select
        :value="appStore.contentWidth"
        size="small"
        style="width: 100px"
        @update:value="appStore.setContentWidth"
      >
        <a-select-option value="fluid">流式</a-select-option>
        <a-select-option value="fixed">定宽</a-select-option>
      </a-select>
    </div>

    <div class="setting-row">
      <span>固定 Header</span>
      <a-switch v-model:checked="appStore.fixedHeader" size="small" />
    </div>
    <div class="setting-row">
      <span>固定侧边菜单</span>
      <a-switch v-model:checked="appStore.fixedSider" size="small" />
    </div>

    <a-divider />

    <!-- 其他设置 -->
    <h4 class="setting-title">其他设置</h4>
    <div class="setting-row">
      <span>多页签</span>
      <a-switch v-model:checked="appStore.showTabs" size="small" />
    </div>
    <div class="setting-row">
      <span>页脚</span>
      <a-switch v-model:checked="appStore.showFooter" size="small" />
    </div>
    <div class="setting-row">
      <span>色弱模式</span>
      <a-switch v-model:checked="appStore.colorWeak" size="small" />
    </div>
    <div class="setting-row">
      <span>紧凑模式</span>
      <a-switch v-model:checked="appStore.compactMode" size="small" />
    </div>

    <a-divider />

    <!-- 语言设置 -->
    <h4 class="setting-title">语言 / Language</h4>
    <div class="setting-row">
      <span>语言</span>
      <a-select
        :value="currentLocale"
        size="small"
        style="width: 120px"
        @update:value="handleLocaleChange"
      >
        <a-select-option value="zh-CN">简体中文</a-select-option>
        <a-select-option value="en-US">English</a-select-option>
      </a-select>
    </div>

    <a-divider />

    <a-button block @click="handleCopyConfig">
      复制配置
    </a-button>
  </a-drawer>
</template>

<style scoped>
.setting-btn {
  position: fixed;
  right: 0;
  top: 240px;
  z-index: 999;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ant-color-primary, #1677ff);
  border-radius: 8px 0 0 8px;
  cursor: pointer;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s;
}

.setting-btn:hover {
  width: 52px;
}

.setting-title {
  margin: 0 0 12px;
  font-size: 14px;
  font-weight: 500;
  color: var(--ant-color-text-heading, rgba(0, 0, 0, 0.85));
}

.setting-block-check-group {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.setting-block-check-item {
  position: relative;
  cursor: pointer;
  border-radius: 6px;
  padding: 2px;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.setting-block-check-item.active {
  border-color: var(--ant-color-primary, #1677ff);
}

.check-icon {
  position: absolute;
  bottom: 4px;
  right: 4px;
  color: var(--ant-color-primary, #1677ff);
  font-size: 14px;
  font-weight: bold;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 14px;
}
</style>
