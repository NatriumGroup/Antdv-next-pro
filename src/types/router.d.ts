import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    /** 页面标题 */
    title?: string
    /** 菜单图标组件名 */
    icon?: string
    /** 在菜单中隐藏 */
    hideInMenu?: boolean
    /** 隐藏子菜单 */
    hideChildrenInMenu?: boolean
    /** 所需角色或权限 */
    authority?: string | string[]
    /** 固定标签页（不可关闭） */
    affix?: boolean
    /** 不缓存（KeepAlive） */
    noCache?: boolean
  }
}
