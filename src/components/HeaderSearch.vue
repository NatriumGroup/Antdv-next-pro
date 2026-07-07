<script setup lang="ts">
import { SearchOutlined } from '@antdv-next/icons'
import { asyncRoutes } from '@/router'
import type { RouteRecordRaw } from 'vue-router'

const router = useRouter()
const visible = ref(false)
const searchValue = ref('')

// 扁平化路由为搜索项
interface SearchItem {
  path: string
  title: string
  parent?: string
}

function flattenRoutes(routes: RouteRecordRaw[], parentTitle = '', parentPath = ''): SearchItem[] {
  const result: SearchItem[] = []
  for (const route of routes) {
    if (route.meta?.hideInMenu || !route.meta?.title) continue
    const fullPath = route.path.startsWith('/')
      ? route.path
      : parentPath
        ? `${parentPath}/${route.path}`
        : `/${route.path}`
    const title = route.meta.title as string

    result.push({
      path: fullPath,
      title,
      parent: parentTitle || undefined,
    })

    if (route.children) {
      result.push(...flattenRoutes(route.children, title, fullPath))
    }
  }
  return result
}

const allRoutes = computed(() => {
  const root = asyncRoutes.find((r) => r.path === '/')
  return root?.children ? flattenRoutes(root.children) : []
})

const filteredOptions = computed(() => {
  if (!searchValue.value) return allRoutes.value
  const keyword = searchValue.value.toLowerCase()
  return allRoutes.value.filter(
    (item) =>
      item.title.toLowerCase().includes(keyword) ||
      item.path.toLowerCase().includes(keyword),
  )
})

function handleSelect(path: string) {
  router.push(path)
  visible.value = false
  searchValue.value = ''
}

// 快捷键 Ctrl+K / Cmd+K
function handleKeydown(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault()
    visible.value = true
  }
  if (e.key === 'Escape') {
    visible.value = false
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <a-tooltip title="搜索 (Ctrl+K)">
    <a-button type="text" size="small" :icon="h(SearchOutlined)" @click="visible = true" />
  </a-tooltip>

  <a-modal
    :open="visible"
    :footer="null"
    :closable="false"
    :width="560"
    :styles="{ body: { padding: '8px' } }"
    @cancel="visible = false"
  >
    <a-input
      v-model:value="searchValue"
      placeholder="搜索菜单..."
      size="large"
      allow-clear
      autofocus
    >
      <template #prefix><SearchOutlined /></template>
      <template #suffix>
        <a-tag style="margin: 0">ESC</a-tag>
      </template>
    </a-input>

    <div style="max-height: 400px; overflow-y: auto; margin-top: 8px">
      <div
        v-for="item in filteredOptions"
        :key="item.path"
        class="search-item"
        @click="handleSelect(item.path)"
      >
        <div>
          <div style="font-size: 14px">{{ item.title }}</div>
          <div v-if="item.parent" style="font-size: 12px; color: rgba(0, 0, 0, 0.45)">
            {{ item.parent }} / {{ item.title }}
          </div>
        </div>
        <span style="font-size: 12px; color: rgba(0, 0, 0, 0.35)">{{ item.path }}</span>
      </div>
      <a-empty v-if="filteredOptions.length === 0" :image="null" description="无匹配结果" />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { h } from 'vue'
</script>

<style scoped>
.search-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
}

.search-item:hover {
  background: var(--ant-color-bg-text-hover, #f5f5f5);
}
</style>
