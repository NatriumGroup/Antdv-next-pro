<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const tabItems = [
  { key: 'articles', label: '文章' },
  { key: 'projects', label: '项目' },
  { key: 'applications', label: '应用' },
]

const activeTab = computed(() => {
  const path = route.path
  const segment = path.substring(path.lastIndexOf('/') + 1)
  if (['articles', 'projects', 'applications'].includes(segment)) {
    return segment
  }
  return 'articles'
})

function handleTabChange(key: string | number) {
  router.push(`/list/search/${key}`)
}
</script>

<template>
  <PageContainer title="搜索列表">
    <template #content>
      <div style="text-align: center">
        <a-input-search
          placeholder="请输入"
          enter-button="搜索"
          size="large"
          style="max-width: 522px; width: 100%"
        />
      </div>
    </template>
    <a-tabs :active-key="activeTab" :items="tabItems" @change="handleTabChange" />
    <router-view />
  </PageContainer>
</template>
