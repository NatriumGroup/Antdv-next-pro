<script setup lang="ts">
import { PlusOutlined, DownloadOutlined, EditOutlined, ShareAltOutlined, EllipsisOutlined } from '@antdv-next/icons'

const cardData = Array.from({ length: 8 }, (_, i) => ({
  key: String(i),
  title: `Alipay ${i}`,
  avatar: [
    'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
    'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
    'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
  ][i % 4],
  description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件。',
  members: Math.floor(Math.random() * 50) + 10,
}))
</script>

<template>
  <div>
    <div style="margin-bottom: 16px; color: rgba(0,0,0,0.45); font-size: 14px">
      卡片列表。
    </div>

    <a-list
      :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
      :data-source="[{ key: 'add' }, ...cardData]"
      row-key="key"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <!-- 新增卡片 -->
          <template v-if="item.key === 'add'">
            <a-button type="dashed" style="width: 100%; height: 200px; display: flex; flex-direction: column; align-items: center; justify-content: center">
              <PlusOutlined style="font-size: 32px; color: rgba(0,0,0,0.25)" />
              <div style="margin-top: 8px; color: rgba(0,0,0,0.45)">新增产品</div>
            </a-button>
          </template>

          <!-- 普通卡片 -->
          <template v-else>
            <a-card hoverable>
              <a-card-meta :title="item.title">
                <template #avatar><a-avatar :src="item.avatar" /></template>
                <template #description>
                  <div style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden">
                    {{ item.description }}
                  </div>
                </template>
              </a-card-meta>
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
            </a-card>
          </template>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>
