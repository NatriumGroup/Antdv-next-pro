<script setup lang="ts">
import { DownloadOutlined, EditOutlined, ShareAltOutlined, EllipsisOutlined } from '@antdv-next/icons'

const categories = ['类目一', '类目二', '类目三', '类目四', '类目五', '类目六', '类目七', '类目八', '类目九', '类目十', '类目十一', '类目十二']
const selectedCategory = ref<string>('')

function onCategoryClick(cat: string) {
  selectedCategory.value = selectedCategory.value === cat ? '' : cat
}

function formatWan(val: number) {
  if (!val || Number.isNaN(val)) return ''
  if (val > 10000) {
    return `${Math.floor(val / 10000)}万`
  }
  return String(val)
}

const applications = ref([
  {
    id: '1',
    title: 'Alipay',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    activeUser: 17345,
    newUser: 1756,
  },
  {
    id: '2',
    title: 'Angular',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
    activeUser: 8543,
    newUser: 945,
  },
  {
    id: '3',
    title: 'Ant Design',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
    activeUser: 26589,
    newUser: 2345,
  },
  {
    id: '4',
    title: 'Ant Design Pro',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
    activeUser: 13267,
    newUser: 1023,
  },
  {
    id: '5',
    title: 'Bootstrap',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    activeUser: 9876,
    newUser: 672,
  },
  {
    id: '6',
    title: 'React',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
    activeUser: 32156,
    newUser: 3987,
  },
  {
    id: '7',
    title: 'Vue',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
    activeUser: 28965,
    newUser: 3456,
  },
  {
    id: '8',
    title: 'Webpack',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
    activeUser: 7654,
    newUser: 543,
  },
])
</script>

<template>
  <!-- Filter section -->
  <a-card variant="borderless">
    <div class="filter-row">
      <span class="filter-label">所属类目：</span>
      <div class="filter-tags">
        <a-tag
          v-for="cat in categories"
          :key="cat"
          :color="selectedCategory === cat ? 'blue' : undefined"
          style="cursor: pointer; margin-bottom: 8px"
          @click="onCategoryClick(cat)"
        >
          {{ cat }}
        </a-tag>
      </div>
    </div>
    <a-divider style="margin: 12px 0" />
    <div class="filter-row">
      <span class="filter-label">其它选项：</span>
      <a-row :gutter="16" style="flex: 1">
        <a-col :lg="8" :md="10" :sm="10" :xs="24">
          <span style="margin-right: 8px; color: rgba(0,0,0,0.65)">作者</span>
          <a-select placeholder="不限" style="max-width: 200px; width: calc(100% - 60px)" :options="[{ label: '王昭君', value: 'lisa' }]" />
        </a-col>
        <a-col :lg="8" :md="10" :sm="10" :xs="24">
          <span style="margin-right: 8px; color: rgba(0,0,0,0.65)">好评度</span>
          <a-select placeholder="不限" style="max-width: 200px; width: calc(100% - 60px)" :options="[{ label: '优秀', value: 'good' }, { label: '普通', value: 'normal' }]" />
        </a-col>
      </a-row>
    </div>
  </a-card>

  <!-- Application cards -->
  <div style="margin-top: 24px">
    <a-row :gutter="[16, 16]">
      <a-col v-for="app in applications" :key="app.id" :xs="24" :sm="12" :md="8" :lg="6">
        <a-card hoverable :body-style="{ paddingBottom: '20px' }">
          <template #actions>
            <a-tooltip title="下载"><DownloadOutlined /></a-tooltip>
            <a-tooltip title="编辑"><EditOutlined /></a-tooltip>
            <a-tooltip title="分享"><ShareAltOutlined /></a-tooltip>
            <a-dropdown>
              <EllipsisOutlined />
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1">操作一</a-menu-item>
                  <a-menu-item key="2">操作二</a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
          <a-card-meta :title="app.title">
            <template #avatar>
              <a-avatar :src="app.avatar" size="small" />
            </template>
          </a-card-meta>
          <div class="card-info">
            <div>
              <p class="card-info-label">活跃用户</p>
              <p class="card-info-value">{{ formatWan(app.activeUser) }}</p>
            </div>
            <div>
              <p class="card-info-label">新增用户</p>
              <p class="card-info-value">{{ app.newUser.toLocaleString() }}</p>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.filter-row {
  display: flex;
  align-items: flex-start;
}

.filter-label {
  flex-shrink: 0;
  width: 80px;
  line-height: 32px;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
}

.filter-tags {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
}

.card-info {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 16px;
  text-align: center;
}

.card-info-label {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}

.card-info-value {
  color: rgba(0, 0, 0, 0.88);
  font-size: 24px;
  line-height: 32px;
  margin: 0;
}
</style>
