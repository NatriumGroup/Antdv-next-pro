import { defineStore } from 'pinia'
import type { RouteRecordRaw } from 'vue-router'

export interface UserInfo {
  id: string
  username: string
  realName: string
  avatar: string
  roles: string[]
  permissions: string[]
}

export interface UserState {
  token: string
  userInfo: UserInfo | null
  /** 动态路由（后端返回） */
  dynamicRoutes: RouteRecordRaw[]
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: '',
    userInfo: null,
    dynamicRoutes: [],
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    roles: (state) => state.userInfo?.roles ?? [],
    permissions: (state) => state.userInfo?.permissions ?? [],
    avatar: (state) => state.userInfo?.avatar ?? '',
    realName: (state) => state.userInfo?.realName ?? '',
  },

  actions: {
    setToken(token: string) {
      this.token = token
    },

    setUserInfo(info: UserInfo) {
      this.userInfo = info
    },

    /** 获取用户信息（模拟，后续替换为真实 API） */
    async fetchUserInfo() {
      // TODO: 替换为 request.get<UserInfo>('/api/user/info')
      // 这里根据 token 模拟返回不同用户
      if (this.token === 'mock-token-admin') {
        this.userInfo = {
          id: '1',
          username: 'admin',
          realName: 'Admin',
          avatar: '',
          roles: ['admin'],
          permissions: ['*'],
        }
      } else if (this.token === 'mock-token-user') {
        this.userInfo = {
          id: '2',
          username: 'user',
          realName: 'User',
          avatar: '',
          roles: ['user'],
          permissions: ['dashboard:view', 'list:view'],
        }
      } else {
        throw new Error('Invalid token')
      }
    },

    /** 登出 */
    logout() {
      this.token = ''
      this.userInfo = null
      this.dynamicRoutes = []
    },
  },

  persist: {
    pick: ['token'],
  },
})
