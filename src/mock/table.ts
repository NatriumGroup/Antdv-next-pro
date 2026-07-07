import { http, HttpResponse } from 'msw'

// 生成 Mock 表格数据
const allData = Array.from({ length: 56 }, (_, i) => ({
  key: String(i + 1),
  name: `TradeCode ${i}`,
  desc: '这是一段描述',
  callNo: Math.floor(Math.random() * 1000),
  status: ['success', 'processing', 'default', 'error'][i % 4]!,
  statusText: ['成功', '运行中', '已关闭', '异常'][i % 4]!,
  updatedAt: `2026-07-${String((i % 28) + 1).padStart(2, '0')}`,
}))

export const tableHandlers = [
  // 列表查询
  http.get('/api/table/list', ({ request }) => {
    const url = new URL(request.url)
    const current = Number(url.searchParams.get('current')) || 1
    const pageSize = Number(url.searchParams.get('pageSize')) || 10

    const start = (current - 1) * pageSize
    const end = start + pageSize
    const list = allData.slice(start, end)

    return HttpResponse.json({
      code: 200,
      success: true,
      data: {
        list,
        total: allData.length,
        current,
        pageSize,
      },
      message: 'ok',
    })
  }),

  // 新增
  http.post('/api/table/create', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({
      code: 200,
      success: true,
      data: { key: String(allData.length + 1), ...body },
      message: '新增成功',
    })
  }),

  // 更新
  http.put('/api/table/update/:key', async ({ request }) => {
    const body = await request.json()
    return HttpResponse.json({
      code: 200,
      success: true,
      data: body,
      message: '更新成功',
    })
  }),

  // 删除
  http.delete('/api/table/delete/:key', () => {
    return HttpResponse.json({
      code: 200,
      success: true,
      data: null,
      message: '删除成功',
    })
  }),
]
