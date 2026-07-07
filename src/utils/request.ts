import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { message } from 'antdv-next'
import { useUserStore } from '@/stores/user'
import { router } from '@/router'

/** 标准后端响应结构 */
export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
  success: boolean
}

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL as string,
  timeout: 15000,
})

// ── 请求拦截 ──
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// ── 响应拦截 ──
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { data } = response

    // 如果是 Blob（文件下载）直接返回
    if (response.config.responseType === 'blob') {
      return response
    }

    if (data.code === 200 || data.success) {
      return data as any
    }

    message.error(data.message || '请求失败')
    return Promise.reject(new Error(data.message || '请求失败'))
  },
  (error) => {
    const status = error.response?.status

    switch (status) {
      case 401:
        message.error('登录已过期，请重新登录')
        useUserStore().logout()
        router.push('/user/login')
        break
      case 403:
        message.error('没有权限访问该资源')
        break
      case 404:
        message.error('请求的资源不存在')
        break
      case 500:
        message.error('服务器内部错误')
        break
      default:
        message.error(error.message || '网络错误')
    }

    return Promise.reject(error)
  },
)

/** 封装请求方法 */
export const request = {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return service.get(url, config)
  },

  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return service.post(url, data, config)
  },

  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return service.put(url, data, config)
  },

  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return service.delete(url, config)
  },
}

export default service
