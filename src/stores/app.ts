import { defineStore } from 'pinia'

export type LayoutMode = 'side' | 'top' | 'mix'

export interface AppState {
  /** 暗色模式 */
  darkMode: boolean
  /** 主题色 */
  primaryColor: string
  /** 布局模式 */
  layoutMode: LayoutMode
  /** 侧边栏折叠 */
  sideCollapsed: boolean
  /** 固定 Header */
  fixedHeader: boolean
  /** 固定侧边栏 */
  fixedSider: boolean
  /** 显示页脚 */
  showFooter: boolean
  /** 显示 Tab 标签页 */
  showTabs: boolean
  /** 色弱模式 */
  colorWeak: boolean
  /** 内容区域宽度：fixed 固定 1200px / fluid 流式 */
  contentWidth: 'fixed' | 'fluid'
  /** 紧凑模式 */
  compactMode: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    darkMode: false,
    primaryColor: '#1677ff',
    layoutMode: 'mix',
    sideCollapsed: false,
    fixedHeader: false,
    fixedSider: true,
    showFooter: true,
    showTabs: false,
    colorWeak: false,
    contentWidth: 'fluid',
    compactMode: false,
  }),

  actions: {
    toggleDarkMode() {
      this.darkMode = !this.darkMode
    },

    toggleSideCollapsed() {
      this.sideCollapsed = !this.sideCollapsed
    },

    setPrimaryColor(color: string) {
      this.primaryColor = color
    },

    setLayoutMode(mode: LayoutMode) {
      this.layoutMode = mode
    },

    setContentWidth(width: 'fixed' | 'fluid') {
      this.contentWidth = width
    },
  },

  persist: true,
})
