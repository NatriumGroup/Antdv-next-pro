import { defineStore } from 'pinia'
import type { RouteLocationNormalized } from 'vue-router'

export interface TabItem {
  path: string
  name: string
  title: string
  /** 是否固定（不可关闭） */
  affix?: boolean
}

export const useTabStore = defineStore('tab', {
  state: () => ({
    tabs: [] as TabItem[],
    activeTab: '',
  }),

  actions: {
    /** 添加标签页 */
    addTab(route: RouteLocationNormalized) {
      const title = (route.meta?.title as string) || (route.name as string) || route.path
      if (!title) return

      const exists = this.tabs.find((t) => t.path === route.path)
      if (!exists) {
        this.tabs.push({
          path: route.path,
          name: route.name as string,
          title,
          affix: route.meta?.affix as boolean | undefined,
        })
      }
      this.activeTab = route.path
    },

    /** 关闭标签页，返回下一个应该激活的路径 */
    closeTab(path: string): string | undefined {
      const index = this.tabs.findIndex((t) => t.path === path)
      if (index === -1) return undefined

      // 不能关闭固定标签
      if (this.tabs[index]?.affix) return undefined

      this.tabs.splice(index, 1)

      // 如果关闭的是当前激活的标签，切换到相邻标签
      if (this.activeTab === path) {
        const next = this.tabs[index] || this.tabs[index - 1]
        this.activeTab = next?.path ?? '/'
        return this.activeTab
      }
      return undefined
    },

    /** 关闭其他 */
    closeOtherTabs(path: string) {
      this.tabs = this.tabs.filter((t) => t.path === path || t.affix)
      this.activeTab = path
    },

    /** 关闭全部（保留固定 + 首页） */
    closeAllTabs(): string {
      this.tabs = this.tabs.filter((t) => t.affix)
      const first = this.tabs[0]
      this.activeTab = first?.path ?? '/'
      return this.activeTab
    },

    /** 关闭左侧 */
    closeLeftTabs(path: string) {
      const index = this.tabs.findIndex((t) => t.path === path)
      if (index <= 0) return
      this.tabs = this.tabs.filter((t, i) => i >= index || t.affix)
    },

    /** 关闭右侧 */
    closeRightTabs(path: string) {
      const index = this.tabs.findIndex((t) => t.path === path)
      if (index === -1) return
      this.tabs = this.tabs.filter((t, i) => i <= index || t.affix)
    },
  },
})
