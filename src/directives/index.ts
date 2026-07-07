import type { App, Directive } from 'vue'
import { useUserStore } from '@/stores/user'

function checkAuth(requiredAuth: string | string[]): boolean {
  const userStore = useUserStore()
  if (!requiredAuth) return true

  const roles = userStore.roles
  const permissions = userStore.permissions

  // 超级权限
  if (permissions.includes('*')) return true

  const allAuth = [...roles, ...permissions]

  return Array.isArray(requiredAuth)
    ? requiredAuth.some((auth) => allAuth.includes(auth))
    : allAuth.includes(requiredAuth)
}

/**
 * v-auth directive
 * Usage:
 *   v-auth="'admin'"
 *   v-auth="['admin', 'editor']"
 */
const authDirective: Directive<HTMLElement, string | string[]> = {
  mounted(el, binding) {
    if (!checkAuth(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  },
  updated(el, binding) {
    if (!checkAuth(binding.value)) {
      el.parentNode?.removeChild(el)
    }
  },
}

/**
 * v-role directive - 仅检查角色
 * Usage: v-role="'admin'" or v-role="['admin', 'editor']"
 */
const roleDirective: Directive<HTMLElement, string | string[]> = {
  mounted(el, binding) {
    const userStore = useUserStore()
    const required = binding.value
    if (!required) return

    const roles = userStore.roles
    const hasRole = Array.isArray(required)
      ? required.some((r) => roles.includes(r))
      : roles.includes(required)

    if (!hasRole) {
      el.parentNode?.removeChild(el)
    }
  },
}

export function setupDirectives(app: App) {
  app.directive('auth', authDirective)
  app.directive('role', roleDirective)
}
