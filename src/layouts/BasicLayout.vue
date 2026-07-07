<script setup lang="ts">
import { h } from 'vue'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  GlobalOutlined,
  SkinOutlined,
  LeftOutlined,
  RightOutlined,
} from '@antdv-next/icons'
import SiderMenu from '@/components/SiderMenu.vue'
import TabBar from '@/components/TabBar.vue'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { defaultSettings } from '@/config/defaultSettings'
import { setLocale, getLocale, type LocaleType } from '@/locales'

const router = useRouter()
const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()

// ── 响应式 ──
const isMobile = ref(false)
const mobileDrawerVisible = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth < 992
  if (!isMobile.value) mobileDrawerVisible.value = false
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// ── Computed layout helpers ──
const showSider = computed(() =>
  !isMobile.value && appStore.layoutMode !== 'top',
)

const showTopMenu = computed(() =>
  !isMobile.value && (appStore.layoutMode === 'top' || appStore.layoutMode === 'mix'),
)

const siderWidth = computed(() =>
  appStore.sideCollapsed ? defaultSettings.siderCollapsedWidth : defaultSettings.siderWidth,
)

const contentMarginLeft = computed(() => {
  if (isMobile.value || appStore.layoutMode === 'top') return '0'
  if (!appStore.fixedSider) return '0'
  return `${siderWidth.value}px`
})

// ── 面包屑 ──
const breadcrumbItems = computed(() =>
  route.matched
    .filter((r) => r.meta?.title)
    .map((r) => ({
      title: r.meta.title as string,
      path: r.path,
    })),
)

// ── 全屏 ──
const isFullscreen = ref(false)

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    document.exitFullscreen()
    isFullscreen.value = false
  }
}

// ── 语言切换 ──
const currentLocale = ref<LocaleType>(getLocale())
const localeMenuItems = [
  { key: 'zh-CN', label: '🇨🇳 简体中文' },
  { key: 'en-US', label: '🇺🇸 English' },
]

function handleLocaleClick({ key }: { key: string }) {
  currentLocale.value = key as LocaleType
  setLocale(key as LocaleType)
}

// ── 用户菜单 ──
const userMenuItems = [
  { key: 'settings', icon: SettingOutlined, label: '个人设置' },
  { key: 'theme', icon: SkinOutlined, label: '主题设置' },
  { type: 'divider' },
  { key: 'logout', icon: LogoutOutlined, label: '退出登录' },
]

function handleUserMenuClick({ key }: { key: string }) {
  if (key === 'logout') {
    userStore.logout()
    router.push('/user/login')
  } else if (key === 'settings') {
    router.push('/account/settings')
  } else if (key === 'theme') {
    const btn = document.querySelector('.setting-btn') as HTMLElement
    btn?.click()
  }
}

// 移动端点击菜单后关闭 drawer
function handleMobileMenuClick() {
  mobileDrawerVisible.value = false
}

// ── Logo ──
const LogoBlock = {
  name: 'LogoBlock',
  props: { collapsed: Boolean, dark: Boolean },
  setup(props: { collapsed: boolean; dark: boolean }) {
    return () =>
      h(
        'div',
        {
          style: {
            height: '56px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: props.collapsed ? 'center' : 'flex-start',
            padding: props.collapsed ? '0' : '0 20px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'padding 0.2s',
          },
          onClick: () => router.push('/'),
        },
        [
          h('img', {
            src: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            alt: 'logo',
            style: { height: '28px', flexShrink: 0 },
          }),
          !props.collapsed
            ? h(
                'h1',
                {
                  style: {
                    margin: '0 0 0 12px',
                    fontSize: '17px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: props.dark ? '#fff' : undefined,
                  },
                },
                'Ant Design Pro',
              )
            : null,
        ],
      )
  },
}
</script>

<template>
  <a-layout style="min-height: 100vh">
    <!-- ============ SIDER (side / mix 模式，非移动端) ============ -->
    <a-layout-sider
      v-if="showSider"
      v-model:collapsed="appStore.sideCollapsed"
      :trigger="null"
      collapsible
      :width="defaultSettings.siderWidth"
      :collapsed-width="defaultSettings.siderCollapsedWidth"
      theme="light"
      :style="{
        overflow: 'auto',
        height: '100vh',
        position: appStore.fixedSider ? 'fixed' : 'relative',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 11,
        borderInlineEnd: '1px solid var(--ant-color-border-secondary, #f0f0f0)',
      }"
    >
      <LogoBlock :collapsed="appStore.sideCollapsed" />
      <SiderMenu
        :collapsed="appStore.sideCollapsed"
        :mode="'inline'"
        :theme="'light'"
      />
    </a-layout-sider>

    <!-- ============ 移动端 Drawer 菜单 ============ -->
    <a-drawer
      v-if="isMobile"
      :open="mobileDrawerVisible"
      placement="left"
      :closable="false"
      :styles="{ body: { padding: 0 } }"
      :size="defaultSettings.siderWidth"
      @close="mobileDrawerVisible = false"
    >
      <LogoBlock :collapsed="false" />
      <SiderMenu
        :collapsed="false"
        :mode="'inline'"
        :theme="'light'"
        @menu-click="handleMobileMenuClick"
      />
    </a-drawer>

    <!-- ============ RIGHT AREA ============ -->
    <a-layout
      :style="{
        marginLeft: contentMarginLeft,
        transition: 'margin-left 0.2s',
        position: 'relative',
      }"
    >
      <!-- 装饰背景图 (对标 React ProLayout bgLayoutImgList) -->
      <div
        v-if="!appStore.darkMode"
        style="position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0"
        aria-hidden="true"
      >
        <img
          src="https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr"
          alt=""
          style="position: absolute; left: 85px; bottom: 100px; height: 303px"
        />
        <img
          src="https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr"
          alt=""
          style="position: absolute; bottom: -68px; right: -45px; height: 303px"
        />
        <img
          src="https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr"
          alt=""
          style="position: absolute; bottom: 0; left: 0; width: 331px"
        />
      </div>
      <!-- ============ Sider 折叠箭头 (对标 React ProLayout) ============ -->
      <div
        v-if="showSider && !isMobile"
        class="sider-collapse-trigger"
        :style="{ left: '-13px' }"
        @click="appStore.toggleSideCollapsed()"
      >
        <LeftOutlined v-if="!appStore.sideCollapsed" />
        <RightOutlined v-else />
      </div>
      <!-- ============ HEADER ============ -->
      <a-layout-header
        :style="{
          padding: 0,
          background: (appStore.layoutMode === 'mix' || appStore.layoutMode === 'top') ? '#001529' : 'var(--ant-color-bg-container)',
          color: (appStore.layoutMode === 'mix' || appStore.layoutMode === 'top') ? '#fff' : undefined,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: defaultSettings.headerHeight + 'px',
          lineHeight: defaultSettings.headerHeight + 'px',
          boxShadow: (appStore.fixedHeader && appStore.layoutMode === 'side') ? '0 1px 4px rgba(0, 21, 41, 0.08)' : 'none',
          position: appStore.fixedHeader ? 'sticky' : 'relative',
          top: 0,
          zIndex: 10,
        }"
      >
        <!-- Left section -->
        <div style="display: flex; align-items: center; flex: 1; min-width: 0">
          <!-- 移动端：汉堡菜单 -->
          <div
            v-if="isMobile"
            style="padding: 0 16px; cursor: pointer; font-size: 18px"
            @click="mobileDrawerVisible = true"
          >
            <MenuUnfoldOutlined />
          </div>

          <!-- top / mix 模式 logo -->
          <LogoBlock v-if="(appStore.layoutMode === 'top' || appStore.layoutMode === 'mix') && !isMobile" :collapsed="false" :dark="true" />

          <!-- top / mix 模式顶部菜单（深色主题） -->
          <SiderMenu
            v-if="showTopMenu"
            :mode="'horizontal'"
            :theme="'dark'"
          />
        </div>

        <!-- Right actions (对标 React: DocLink + LangDropdown + Avatar) -->
        <div :style="{ display: 'flex', alignItems: 'center', paddingRight: '12px', flexShrink: 0, color: (appStore.layoutMode === 'mix' || appStore.layoutMode === 'top') ? 'rgba(255,255,255,0.85)' : undefined }">
          <!-- 使用文档 -->
          <a-tooltip title="使用文档" v-if="!isMobile">
            <a-button class="header-action-btn" type="text" :icon="h(QuestionCircleOutlined)" @click="router.push('/welcome')" />
          </a-tooltip>

          <!-- 语言切换 -->
          <a-dropdown v-if="!isMobile" :menu="{ items: localeMenuItems, selectedKeys: [currentLocale], onClick: handleLocaleClick }">
            <a-button class="header-action-btn" type="text" :icon="h(GlobalOutlined)" />
          </a-dropdown>

          <!-- User -->
          <a-dropdown :menu="{ items: userMenuItems, onClick: handleUserMenuClick }">
            <div style="display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 0 12px; height: 48px; border-radius: 6px" class="header-action-hover">
              <a-avatar
                :size="28"
                :src="userStore.avatar || 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'"
              />
              <span v-if="!isMobile" style="font-size: 14px">{{ userStore.realName || 'ProUser' }}</span>
            </div>
          </a-dropdown>
        </div>
      </a-layout-header>

      <!-- ============ MIX 模式二级菜单 ============ -->
      <!-- mix 模式时，顶部显示一级菜单，此处可扩展二级侧边栏 -->

      <!-- ============ TAB BAR ============ -->
      <TabBar v-if="appStore.showTabs" />

      <!-- ============ 面包屑 (对标 React ProLayout PageContainer) ============ -->
      <div
        v-if="breadcrumbItems.length > 1 && !isMobile"
        :style="{
          padding: '16px 24px 0',
        }"
      >
        <a-breadcrumb>
          <a-breadcrumb-item v-for="item in breadcrumbItems" :key="item.path">
            {{ item.title }}
          </a-breadcrumb-item>
        </a-breadcrumb>
      </div>

      <!-- ============ CONTENT ============ -->
      <a-layout-content
        :style="{
          margin: '24px',
          minHeight: 'calc(100vh - 56px - 70px)',
        }"
      >
        <router-view v-slot="{ Component, route: viewRoute }">
          <transition name="slide-fade" mode="out-in">
            <keep-alive>
              <component :is="Component" :key="viewRoute.path" />
            </keep-alive>
          </transition>
        </router-view>
      </a-layout-content>

      <!-- ============ FOOTER ============ -->
      <a-layout-footer
        v-if="appStore.showFooter"
        :style="{
          textAlign: 'center',
          padding: '24px 50px',
          color: 'var(--ant-color-text-tertiary, rgba(0, 0, 0, 0.45))',
        }"
      >
        Antdv Next Pro &copy; 2026 — Powered by
        <a href="https://www.antdv-next.com" target="_blank" rel="noopener">Antdv Next</a>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.header-action-btn {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 36px !important;
  min-width: 36px;
  padding-inline: 8px !important;
  padding-block: 0 !important;
  border-radius: 6px !important;
  font-size: 16px !important;
}

.header-action-hover:hover {
  background: rgba(0, 0, 0, 0.04);
}

.sider-collapse-trigger {
  position: absolute;
  top: 50%;
  width: 24px;
  height: 24px;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ant-color-bg-container, #fff);
  border-radius: 50%;
  border: 1px solid var(--ant-color-border-secondary, #f0f0f0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  font-size: 10px;
  color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.45));
  z-index: 12;
  transition: color 0.2s, box-shadow 0.2s;
}

.sider-collapse-trigger:hover {
  color: var(--ant-color-primary, #1677ff);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}
</style>
