<script setup lang="ts">
/**
 * 页面容器 — 对标 React ProLayout 的 PageContainer
 * 自动从 route.meta.title 读取标题，也可手动传入
 */
const props = withDefaults(defineProps<{
  title?: string
  content?: string
}>(), {})

const route = useRoute()
const pageTitle = computed(() => props.title || (route.meta?.title as string) || '')
</script>

<template>
  <div>
    <!-- 页面头部 -->
    <div v-if="pageTitle || content || $slots.content" class="page-header">
      <h3 v-if="pageTitle" class="page-header-title">{{ pageTitle }}</h3>
      <div v-if="content" class="page-header-content">{{ content }}</div>
      <slot v-else name="content" />
    </div>
    <!-- 页面内容 -->
    <slot />
  </div>
</template>

<style scoped>
.page-header {
  margin-bottom: 16px;
  padding: 0 0 16px;
}

.page-header-title {
  margin: 0 0 4px;
  font-size: 20px;
  font-weight: 500;
  color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
}

.page-header-content {
  color: var(--ant-color-text-secondary, rgba(0, 0, 0, 0.65));
  font-size: 14px;
}
</style>
