import { request } from '@/utils/request'
import type { UserInfo } from '@/stores/user'

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  token: string
}

/** 登录 */
export function loginApi(data: LoginParams) {
  return request.post<LoginResult>('/api/auth/login', data)
}

/** 获取用户信息 */
export function getUserInfoApi() {
  return request.get<UserInfo>('/api/user/info')
}

/** 登出 */
export function logoutApi() {
  return request.post('/api/auth/logout')
}

/** 修改密码 */
export function changePasswordApi(data: { oldPassword: string; newPassword: string }) {
  return request.post('/api/user/change-password', data)
}
