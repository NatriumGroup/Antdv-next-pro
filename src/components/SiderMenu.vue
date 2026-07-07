<script setup lang="ts">
import { h } from 'vue'
import {
  DashboardOutlined,
  FormOutlined,
  TableOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  SmileOutlined,
  CrownOutlined,
  UserOutlined,
} from '@antdv-next/icons'
import type { ItemType } from 'antdv-next'
import type { RouteRecordRaw } from 'vue-router'
import { asyncRoutes } from '@/router'
import { usePermission } from '@/composables/usePermission'

const props = withDefaults(defineProps<{
  collapsed?: boolean
  theme?: 'light' | 'dark'
  mode?: 'inline' | 'horizontal'
}>(), {
  collapsed: false,
  theme: 'light',
  mode: 'inline',
})

const emit = defineEmits<{
  menuClick: [key: string]
}>()

const router = useRouter()
const route = useRoute()

// ── Icon Map ──
const iconComponents: Record<string, any> = {
  DashboardOutlined,
  FormOutlined,
  TableOutlined,
  ProfileOutlined,
  CheckCircleOutlined,
  WarningOutlined,
  SmileOutlined,
  CrownOutlined,
  UserOutlined,
}

function renderIcon(name: string | undefined) {
  if (!name || !iconComponents[name]) return undefined
  return () => h(iconComponents[name])
}

const { hasAuth } = usePermission()

// ── 递归构建菜单（带权限过滤） ──
function buildMenuFromRoutes(routes: RouteRecordRaw[], parentPath = ''): ItemType[] {
  return routes
    .filter((r) => {
      if (r.meta?.hideInMenu || !r.meta?.title) return false
      // 权限过滤
      const authority = r.meta?.authority as string | string[] | undefined
      if (authority && !hasAuth(authority)) return false
      return true
    })
    .map((r) => {
      const fullPath = r.path.startsWith('/')
        ? r.path
        : parentPath
          ? `${parentPath}/${r.path}`
          : `/${r.path}`

      const children = r.children?.filter((c) => {
        if (c.meta?.hideInMenu || !c.meta?.title) return false
        const auth = c.meta?.authority as string | string[] | undefined
        if (auth && !hasAuth(auth)) return false
        return true
      })

      // 如果 hideChildrenInMenu 或 只有一个 redirect 子路由，只显示父级
      if (r.meta?.hideChildrenInMenu || (children?.length === 1 && children[0]?.path === '')) {
        return {
          key: fullPath,
          icon: renderIcon(r.meta?.icon as string),
          label: r.meta?.title as string,
        } as ItemType
      }

      if (children && children.length > 0) {
        return {
          key: fullPath,
          icon: renderIcon(r.meta?.icon as string),
          label: r.meta?.title as string,
          children: buildMenuFromRoutes(children, fullPath),
        } as ItemType
      }

      return {
        key: fullPath,
        icon: renderIcon(r.meta?.icon as string),
        label: r.meta?.title as string,
      } as ItemType
    })
}

// 从 asyncRoutes 的根路由 children 构建菜单
const menuItems = computed<ItemType[]>(() => {
  const root = asyncRoutes.find((r) => r.path === '/')
  if (!root?.children) return []
  return buildMenuFromRoutes(root.children, '')
})

// ── 选中 / 展开 ──
const selectedKeys = computed(() => [route.path])
const openKeys = ref<string[]>([])

// 根据当前路由自动展开父菜单
watch(
  () => route.path,
  () => {
    if (props.mode === 'horizontal') return
    const matched = route.matched
    const parents = matched
      .slice(1, -1) // 去掉根 / 和当前页
      .map((r) => r.path)
      .filter(Boolean)

    for (const p of parents) {
      if (!openKeys.value.includes(p)) {
        openKeys.value.push(p)
      }
    }
  },
  { immediate: true },
)

function handleClick({ key }: { key: string }) {
  router.push(key)
  emit('menuClick', key)
}
</script>

<template>
  <a-menu
    v-model:selectedKeys="selectedKeys"
    v-model:openKeys="openKeys"
    :mode="mode"
    :theme="theme"
    :inline-collapsed="mode === 'inline' ? collapsed : undefined"
    :items="menuItems"
    :style="mode === 'horizontal' ? { flex: 1, minWidth: 0, borderBottom: 'none' } : undefined"
    @click="handleClick"
  />
</template>
