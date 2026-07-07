<script setup lang="ts">
import {
  CloseOutlined,
  ReloadOutlined,
  ColumnWidthOutlined,
  MinusOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from '@antdv-next/icons'
import { useTabStore } from '@/stores/tab'

const router = useRouter()
const route = useRoute()
const tabStore = useTabStore()

// 添加首页为固定标签
onMounted(() => {
  tabStore.addTab({
    path: '/welcome',
    name: 'Welcome',
    meta: { title: '欢迎', affix: true },
    matched: [],
  } as any)
})

// 监听路由变化，添加标签
watch(
  () => route.path,
  () => {
    if (route.path.startsWith('/user/')) return
    tabStore.addTab(route)
  },
  { immediate: true },
)

// 切换标签
function handleTabChange(path: string) {
  router.push(path)
}

// 关闭标签
function handleTabClose(path: string) {
  const nextPath = tabStore.closeTab(path)
  if (nextPath) router.push(nextPath)
}

// ── 右键菜单 ──
const contextMenuVisible = ref(false)
const contextMenuStyle = ref({ left: '0px', top: '0px' })
const contextMenuTargetPath = ref('')

function handleContextMenu(e: MouseEvent, path: string) {
  e.preventDefault()
  contextMenuTargetPath.value = path
  contextMenuStyle.value = {
    left: `${e.clientX}px`,
    top: `${e.clientY}px`,
  }
  contextMenuVisible.value = true

  // 点击任意位置关闭
  const close = () => {
    contextMenuVisible.value = false
    document.removeEventListener('click', close)
  }
  setTimeout(() => document.addEventListener('click', close), 0)
}

function handleContextAction(action: string) {
  const target = contextMenuTargetPath.value
  contextMenuVisible.value = false

  switch (action) {
    case 'reload':
      // 通过 replace + key 强制重新渲染
      router.replace({ path: '/redirect' + target })
      break
    case 'close':
      handleTabClose(target)
      break
    case 'closeOther':
      tabStore.closeOtherTabs(target)
      router.push(target)
      break
    case 'closeLeft':
      tabStore.closeLeftTabs(target)
      break
    case 'closeRight':
      tabStore.closeRightTabs(target)
      break
    case 'closeAll': {
      const path = tabStore.closeAllTabs()
      router.push(path)
      break
    }
  }
}
</script>

<template>
  <div class="tab-bar">
    <a-tabs
      :active-key="tabStore.activeTab"
      type="editable-card"
      size="small"
      hide-add
      @change="handleTabChange"
      @edit="(key: string | MouseEvent, action: string) => { if (action === 'remove' && typeof key === 'string') handleTabClose(key) }"
    >
      <a-tab-pane
        v-for="tab in tabStore.tabs"
        :key="tab.path"
        :closable="!tab.affix && tabStore.tabs.length > 1"
      >
        <template #tab>
          <span @contextmenu="handleContextMenu($event, tab.path)">
            {{ tab.title }}
          </span>
        </template>
      </a-tab-pane>
    </a-tabs>

    <!-- 右键菜单 -->
    <teleport to="body">
      <div
        v-if="contextMenuVisible"
        class="context-menu"
        :style="contextMenuStyle"
      >
        <div class="context-menu-item" @click="handleContextAction('reload')">
          <ReloadOutlined /> 重新加载
        </div>
        <div class="context-menu-item" @click="handleContextAction('close')">
          <CloseOutlined /> 关闭标签页
        </div>
        <div class="context-menu-divider" />
        <div class="context-menu-item" @click="handleContextAction('closeLeft')">
          <ArrowLeftOutlined /> 关闭左侧
        </div>
        <div class="context-menu-item" @click="handleContextAction('closeRight')">
          <ArrowRightOutlined /> 关闭右侧
        </div>
        <div class="context-menu-divider" />
        <div class="context-menu-item" @click="handleContextAction('closeOther')">
          <ColumnWidthOutlined /> 关闭其他
        </div>
        <div class="context-menu-item" @click="handleContextAction('closeAll')">
          <MinusOutlined /> 关闭全部
        </div>
      </div>
    </teleport>
  </div>
</template>

<style scoped>
.tab-bar {
  padding: 6px 24px 0;
  background: var(--ant-color-bg-container);
  border-bottom: 1px solid var(--ant-color-border-secondary, #f0f0f0);
}

.tab-bar :deep(.ant-tabs-nav) {
  margin-bottom: 0;
}

.context-menu {
  position: fixed;
  z-index: 1000;
  background: var(--ant-color-bg-container, #fff);
  border-radius: 8px;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  padding: 4px 0;
  min-width: 160px;
}

.context-menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  cursor: pointer;
  font-size: 13px;
  transition: background 0.15s;
}

.context-menu-item:hover {
  background: var(--ant-color-bg-text-hover, #f5f5f5);
}

.context-menu-divider {
  height: 1px;
  background: var(--ant-color-border-secondary, #f0f0f0);
  margin: 4px 0;
}
</style>
