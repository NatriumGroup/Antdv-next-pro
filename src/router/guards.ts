import type { Router } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from '@/stores/user'

NProgress.configure({ showSpinner: false })

/** 白名单 - 不需要登录的路由 */
const whiteList = ['/user/login', '/user/register', '/user/register-result', '/403', '/404', '/500']

export function setupRouterGuards(router: Router) {
  router.beforeEach(async (to, _from, next) => {
    NProgress.start()

    // redirect 路由直接放行
    if (to.path.startsWith('/redirect/')) {
      next()
      return
    }

    const userStore = useUserStore()
    const token = userStore.token

    // 设置页面标题
    const title = to.meta.title as string | undefined
    document.title = title ? `${title} - Antdv Next Pro` : 'Antdv Next Pro'

    if (token) {
      if (to.path === '/user/login') {
        // 已登录，跳转首页
        next({ path: '/' })
        return
      }

      // 如果还没有用户信息，尝试获取
      if (!userStore.userInfo) {
        try {
          await userStore.fetchUserInfo()
          next({ ...to, replace: true })
        } catch {
          // Token 无效，清除并跳转登录
          userStore.logout()
          next({ path: '/user/login', query: { redirect: to.fullPath } })
        }
        return
      }

      // ── 路由权限检查 ──
      const authority = to.meta.authority as string | string[] | undefined
      if (authority) {
        const roles = userStore.roles
        const permissions = userStore.permissions

        // 超级权限
        if (permissions.includes('*')) {
          next()
          return
        }

        const requiredAuth = Array.isArray(authority) ? authority : [authority]
        const allAuth = [...roles, ...permissions]
        const hasAuth = requiredAuth.some((a) => allAuth.includes(a))

        if (hasAuth) {
          next()
        } else {
          next({ path: '/403' })
        }
      } else {
        next()
      }
    } else {
      if (whiteList.includes(to.path)) {
        next()
      } else {
        // 未登录，重定向到登录页
        next({ path: '/user/login', query: { redirect: to.fullPath } })
      }
    }
  })

  router.afterEach(() => {
    NProgress.done()
  })
}
