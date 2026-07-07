import { request } from '@/utils/request'

export interface DashboardOverview {
  totalSales: number
  visits: number
  payments: number
  operationRate: number
}

export interface SalesRank {
  title: string
  total: number
}

/** 获取数据概览 */
export function getDashboardOverviewApi() {
  return request.get<DashboardOverview>('/api/dashboard/overview')
}

/** 获取销售排行 */
export function getSalesRankApi() {
  return request.get<SalesRank[]>('/api/dashboard/sales-rank')
}
