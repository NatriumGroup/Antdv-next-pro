import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory, useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { setupRouterGuards } from './guards'

/** 公共路由 - 不需要登录 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect/:path(.*)',
    name: 'Redirect',
    component: {
      setup() {
        const route = useRoute()
        const router = useRouter()
        onMounted(() => {
          const { params } = route
          router.replace('/' + (params.path as string))
        })
        return () => null
      },
    },
    meta: { title: '重定向', hideInMenu: true },
  },
  {
    path: '/user',
    component: () => import('@/layouts/UserLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/user/Login.vue'),
        meta: { title: '登录' },
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/user/Register.vue'),
        meta: { title: '注册' },
      },
      {
        path: 'register-result',
        name: 'RegisterResult',
        component: () => import('@/views/user/RegisterResult.vue'),
        meta: { title: '注册结果' },
      },
    ],
  },
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/views/exception/403.vue'),
    meta: { title: '403' },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/exception/404.vue'),
    meta: { title: '404' },
  },
  {
    path: '/500',
    name: 'ServerError',
    component: () => import('@/views/exception/500.vue'),
    meta: { title: '500' },
  },
]

/** 需要登录的路由 */
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/BasicLayout.vue'),
    redirect: '/welcome',
    children: [
      // Welcome
      {
        path: 'welcome',
        name: 'Welcome',
        component: () => import('@/views/Welcome.vue'),
        meta: { title: '欢迎', icon: 'SmileOutlined', affix: true },
      },
      // Admin
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/Admin.vue'),
        meta: { title: '管理页', icon: 'CrownOutlined', authority: 'admin' },
      },
      // Dashboard
      {
        path: 'dashboard',
        name: 'Dashboard',
        redirect: '/dashboard/analysis',
        meta: { title: 'Dashboard', icon: 'DashboardOutlined' },
        children: [
          {
            path: 'analysis',
            name: 'DashboardAnalysis',
            component: () => import('@/views/dashboard/Analysis.vue'),
            meta: { title: '分析页', icon: '' },
          },
          {
            path: 'monitor',
            name: 'DashboardMonitor',
            component: () => import('@/views/dashboard/Monitor.vue'),
            meta: { title: '监控页', icon: '' },
          },
          {
            path: 'workplace',
            name: 'DashboardWorkplace',
            component: () => import('@/views/dashboard/Workplace.vue'),
            meta: { title: '工作台', icon: '' },
          },
        ],
      },
      // Form
      {
        path: 'form',
        name: 'Form',
        redirect: '/form/basic',
        meta: { title: '表单页', icon: 'FormOutlined' },
        children: [
          {
            path: 'basic',
            name: 'FormBasic',
            component: () => import('@/views/form/BasicForm.vue'),
            meta: { title: '基础表单' },
          },
          {
            path: 'step',
            name: 'FormStep',
            component: () => import('@/views/form/StepForm.vue'),
            meta: { title: '分步表单' },
          },
          {
            path: 'advanced',
            name: 'FormAdvanced',
            component: () => import('@/views/form/AdvancedForm.vue'),
            meta: { title: '高级表单' },
          },
        ],
      },
      // List
      {
        path: 'list',
        name: 'List',
        redirect: '/list/table-list',
        meta: { title: '列表页', icon: 'TableOutlined' },
        children: [
          {
            path: 'search',
            name: 'SearchList',
            redirect: '/list/search/articles',
            component: () => import('@/views/list/SearchList.vue'),
            meta: { title: '搜索列表' },
            children: [
              {
                path: 'articles',
                name: 'SearchArticles',
                component: () => import('@/views/list/search/Articles.vue'),
                meta: { title: '搜索列表（文章）', hideInMenu: true },
              },
              {
                path: 'projects',
                name: 'SearchProjects',
                component: () => import('@/views/list/search/Projects.vue'),
                meta: { title: '搜索列表（项目）', hideInMenu: true },
              },
              {
                path: 'applications',
                name: 'SearchApplications',
                component: () => import('@/views/list/search/Applications.vue'),
                meta: { title: '搜索列表（应用）', hideInMenu: true },
              },
            ],
          },
          {
            path: 'table-list',
            name: 'TableList',
            component: () => import('@/views/list/TableList.vue'),
            meta: { title: '查询表格' },
          },
          {
            path: 'basic-list',
            name: 'BasicList',
            component: () => import('@/views/list/BasicList.vue'),
            meta: { title: '标准列表' },
          },
          {
            path: 'card-list',
            name: 'CardList',
            component: () => import('@/views/list/CardList.vue'),
            meta: { title: '卡片列表' },
          },
        ],
      },
      // Profile
      {
        path: 'profile',
        name: 'Profile',
        redirect: '/profile/basic',
        meta: { title: '详情页', icon: 'ProfileOutlined' },
        children: [
          {
            path: 'basic',
            name: 'ProfileBasic',
            component: () => import('@/views/profile/BasicProfile.vue'),
            meta: { title: '基础详情页' },
          },
          {
            path: 'advanced',
            name: 'ProfileAdvanced',
            component: () => import('@/views/profile/AdvancedProfile.vue'),
            meta: { title: '高级详情页' },
          },
        ],
      },
      // Result
      {
        path: 'result',
        name: 'Result',
        redirect: '/result/success',
        meta: { title: '结果页', icon: 'CheckCircleOutlined' },
        children: [
          {
            path: 'success',
            name: 'ResultSuccess',
            component: () => import('@/views/result/Success.vue'),
            meta: { title: '成功页' },
          },
          {
            path: 'fail',
            name: 'ResultFail',
            component: () => import('@/views/result/Fail.vue'),
            meta: { title: '失败页' },
          },
        ],
      },
      // Exception
      {
        path: 'exception',
        name: 'Exception',
        redirect: '/exception/403',
        meta: { title: '异常页', icon: 'WarningOutlined' },
        children: [
          {
            path: '403',
            name: 'Exception403',
            component: () => import('@/views/exception/403.vue'),
            meta: { title: '403' },
          },
          {
            path: '404',
            name: 'Exception404',
            component: () => import('@/views/exception/404.vue'),
            meta: { title: '404' },
          },
          {
            path: '500',
            name: 'Exception500',
            component: () => import('@/views/exception/500.vue'),
            meta: { title: '500' },
          },
        ],
      },
      // Account
      {
        path: 'account',
        name: 'Account',
        redirect: '/account/center',
        meta: { title: '个人页', icon: 'UserOutlined' },
        children: [
          {
            path: 'center',
            name: 'AccountCenter',
            component: () => import('@/views/account/Center.vue'),
            meta: { title: '个人中心' },
          },
          {
            path: 'settings',
            name: 'AccountSettings',
            component: () => import('@/views/account/Settings.vue'),
            meta: { title: '个人设置' },
          },
        ],
      },
      // Chatbot
      {
        path: 'chatbot',
        name: 'Chatbot',
        component: () => import('@/views/chatbot/index.vue'),
        meta: { title: 'AI 助手', icon: 'RobotOutlined' },
      },
    ],
  },
  // Catch-all
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...constantRoutes, ...asyncRoutes],
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

// Guards 需要在 Pinia 初始化之后调用，由 main.ts 触发
export { setupRouterGuards }
