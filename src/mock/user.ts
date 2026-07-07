import { http, HttpResponse } from 'msw'

/** 用户数据 */
const users = [
  {
    username: 'admin',
    password: 'admin123',
    token: 'mock-token-admin',
    userInfo: {
      id: '1',
      username: 'admin',
      realName: 'Admin',
      avatar: '',
      roles: ['admin'],
      permissions: ['*'],
    },
  },
  {
    username: 'user',
    password: 'user123',
    token: 'mock-token-user',
    userInfo: {
      id: '2',
      username: 'user',
      realName: 'User',
      avatar: '',
      roles: ['user'],
      permissions: ['dashboard:view', 'list:view'],
    },
  },
]

export const userHandlers = [
  // 登录
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { username: string; password: string }
    const user = users.find(
      (u) => u.username === body.username && u.password === body.password,
    )

    if (user) {
      return HttpResponse.json({
        code: 200,
        success: true,
        data: { token: user.token },
        message: 'ok',
      })
    }

    return HttpResponse.json({
      code: 401,
      success: false,
      data: null,
      message: '用户名或密码错误',
    })
  }),

  // 获取用户信息
  http.get('/api/user/info', ({ request }) => {
    const auth = request.headers.get('Authorization')
    const token = auth?.replace('Bearer ', '')
    const user = users.find((u) => u.token === token)

    if (user) {
      return HttpResponse.json({
        code: 200,
        success: true,
        data: user.userInfo,
        message: 'ok',
      })
    }

    return HttpResponse.json(
      { code: 401, success: false, data: null, message: 'Token 无效' },
      { status: 401 },
    )
  }),

  // 登出
  http.post('/api/auth/logout', () => {
    return HttpResponse.json({
      code: 200,
      success: true,
      data: null,
      message: 'ok',
    })
  }),
]
