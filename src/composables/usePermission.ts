import { useUserStore } from '@/stores/user'

/**
 * 权限 composable
 * 提供角色/权限判断方法
 */
export function usePermission() {
  const userStore = useUserStore()

  /** 是否拥有指定角色 */
  function hasRole(role: string | string[]): boolean {
    const roles = userStore.roles
    if (Array.isArray(role)) {
      return role.some((r) => roles.includes(r))
    }
    return roles.includes(role)
  }

  /** 是否拥有指定权限标识 */
  function hasPermission(permission: string | string[]): boolean {
    const permissions = userStore.permissions
    // 超级权限
    if (permissions.includes('*')) return true

    if (Array.isArray(permission)) {
      return permission.some((p) => permissions.includes(p))
    }
    return permissions.includes(permission)
  }

  /** 综合判断：角色或权限满足其一即可 */
  function hasAuth(auth: string | string[]): boolean {
    return hasRole(auth) || hasPermission(auth)
  }

  return {
    hasRole,
    hasPermission,
    hasAuth,
  }
}
