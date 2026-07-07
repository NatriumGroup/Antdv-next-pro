import { request } from '@/utils/request'

export interface PageParams {
  current: number
  pageSize: number
  [key: string]: unknown
}

export interface PageResult<T> {
  list: T[]
  total: number
  current: number
  pageSize: number
}

export interface TableItem {
  key: string
  name: string
  desc: string
  callNo: number
  status: string
  statusText: string
  updatedAt: string
}

/** 查询列表 */
export function getTableListApi(params: PageParams) {
  return request.get<PageResult<TableItem>>('/api/table/list', { params })
}

/** 新增 */
export function createTableItemApi(data: Partial<TableItem>) {
  return request.post('/api/table/create', data)
}

/** 更新 */
export function updateTableItemApi(data: Partial<TableItem>) {
  return request.put(`/api/table/update/${data.key}`, data)
}

/** 删除 */
export function deleteTableItemApi(key: string) {
  return request.delete(`/api/table/delete/${key}`)
}
