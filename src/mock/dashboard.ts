import { http, HttpResponse } from 'msw'

export const dashboardHandlers = [
  http.get('/api/dashboard/overview', () => {
    return HttpResponse.json({
      code: 200,
      success: true,
      data: {
        totalSales: 126560.89,
        visits: 8846,
        payments: 6560,
        operationRate: 78,
      },
      message: 'ok',
    })
  }),

  http.get('/api/dashboard/sales-rank', () => {
    return HttpResponse.json({
      code: 200,
      success: true,
      data: [
        { title: '上海分店', total: 323234 },
        { title: '北京分店', total: 312344 },
        { title: '杭州分店', total: 298345 },
        { title: '深圳分店', total: 283456 },
        { title: '广州分店', total: 266789 },
      ],
      message: 'ok',
    })
  }),
]
