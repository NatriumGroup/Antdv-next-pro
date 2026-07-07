<script setup lang="ts">
import { StarOutlined, LikeOutlined, MessageOutlined } from '@antdv-next/icons'

const categories = ['类目一', '类目二', '类目三', '类目四', '类目五', '类目六', '类目七', '类目八', '类目九', '类目十', '类目十一', '类目十二']
const selectedCategory = ref<string>('')

function onCategoryClick(cat: string) {
  selectedCategory.value = selectedCategory.value === cat ? '' : cat
}

const articles = ref([
  {
    id: '1',
    title: 'Alipay 的搜索系统是如何在技术层面全面赋能商家？',
    description: '段落示意：蚂蚁金服设计平台 design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 able，让所有人快速建设满意的产品。',
    tags: ['Ant Design', '设计语言', '蚂蚁集团'],
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    owner: '付小小',
    publishedAt: '2023-06-20',
    star: 176,
    like: 156,
    message: 28,
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  },
  {
    id: '2',
    title: 'Angular Material UI 向 Enterprise 应用迈进一步',
    description: '段落示意：蚂蚁金服设计平台 design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
    tags: ['Ant Design', '设计语言', '蚂蚁集团'],
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    owner: '曲丽丽',
    publishedAt: '2023-06-18',
    star: 253,
    like: 180,
    message: 42,
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  },
  {
    id: '3',
    title: '基于 Ant Design 的企业级 UI 设计',
    description: '段落示意：蚂蚁金服设计平台 able，让所有人快速建设满意的产品。使用蚂蚁的设计资源和工具，能够快速呈现优秀的产品体验。',
    tags: ['Ant Design', '设计语言', '蚂蚁集团'],
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    owner: '林东东',
    publishedAt: '2023-06-15',
    star: 320,
    like: 210,
    message: 56,
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  },
  {
    id: '4',
    title: 'Ant Design Pro 发布 V5 正式版',
    description: '段落示意：蚂蚁金服设计平台 design.alipay.com，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
    tags: ['Ant Design', '设计语言', '蚂蚁集团'],
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    owner: '周星星',
    publishedAt: '2023-06-10',
    star: 412,
    like: 298,
    message: 73,
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  },
  {
    id: '5',
    title: '这是一段标题的示意文字',
    description: '段落示意：蚂蚁金服设计平台 able，让所有人快速建设满意的产品。使用蚂蚁的设计资源和工具，能够快速呈现优秀的产品体验。蚂蚁金服体验技术部经验沉淀。',
    tags: ['Ant Design', '设计语言', '蚂蚁集团'],
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
    owner: '吴加好',
    publishedAt: '2023-06-05',
    star: 187,
    like: 123,
    message: 31,
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
  },
])

const loading = ref(false)

function loadMore() {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
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
      <span class="filter-label">owner：</span>
      <div style="flex: 1">
        <a-select
          mode="multiple"
          placeholder="选择 owner"
          :default-value="['wjh', 'zxx']"
          style="min-width: 200px"
          :options="[
            { label: '我自己', value: 'wzj' },
            { label: '吴家豪', value: 'wjh' },
            { label: '周星星', value: 'zxx' },
            { label: '赵丽颖', value: 'zly' },
            { label: '姚明', value: 'ym' },
          ]"
        />
        <a style="margin-left: 16px">只看自己的</a>
      </div>
    </div>
    <a-divider style="margin: 12px 0" />
    <div class="filter-row">
      <span class="filter-label">其它选项：</span>
      <a-row :gutter="16" style="flex: 1">
        <a-col :xl="8" :lg="10" :md="12" :sm="24" :xs="24">
          <span style="margin-right: 8px; color: rgba(0,0,0,0.65)">活跃用户</span>
          <a-select placeholder="不限" style="max-width: 200px; width: calc(100% - 80px)" :options="[{ label: '李三', value: 'lisa' }]" />
        </a-col>
        <a-col :xl="8" :lg="10" :md="12" :sm="24" :xs="24">
          <span style="margin-right: 8px; color: rgba(0,0,0,0.65)">好评度</span>
          <a-select placeholder="不限" style="max-width: 200px; width: calc(100% - 80px)" :options="[{ label: '优秀', value: 'good' }]" />
        </a-col>
      </a-row>
    </div>
  </a-card>

  <!-- Article list -->
  <a-card variant="borderless" style="margin-top: 24px" :body-style="{ padding: '8px 32px 32px 32px' }">
    <div v-for="article in articles" :key="article.id" class="article-item">
      <div class="article-content">
        <div class="article-main">
          <h3 class="article-title">
            <a>{{ article.title }}</a>
          </h3>
          <div style="margin-bottom: 12px">
            <a-tag v-for="tag in article.tags" :key="tag">{{ tag }}</a-tag>
          </div>
          <div class="article-description">{{ article.description }}</div>
          <div class="article-meta">
            <a-avatar :src="article.avatar" :size="20" />
            <span style="margin: 0 12px 0 8px">{{ article.owner }}</span>
            <span>发布在</span>
            <a style="margin: 0 4px">链接</a>
            <span>{{ article.publishedAt }}</span>
          </div>
        </div>
        <div class="article-cover">
          <img :src="article.cover" alt="cover" />
        </div>
      </div>
      <div class="article-actions">
        <span><StarOutlined style="margin-right: 8px" />{{ article.star }}</span>
        <span><LikeOutlined style="margin-right: 8px" />{{ article.like }}</span>
        <span><MessageOutlined style="margin-right: 8px" />{{ article.message }}</span>
      </div>
      <a-divider style="margin: 0" />
    </div>

    <!-- Load more -->
    <div style="text-align: center; margin-top: 16px">
      <a-button :loading="loading" style="padding-left: 48px; padding-right: 48px" @click="loadMore">
        加载更多
      </a-button>
    </div>
  </a-card>
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

.article-item {
  padding: 24px 0 8px;
}

.article-content {
  display: flex;
  gap: 24px;
}

.article-main {
  flex: 1;
  min-width: 0;
}

.article-title a {
  font-size: 16px;
  font-weight: 500;
  color: var(--ant-color-text, rgba(0, 0, 0, 0.88));
}

.article-title a:hover {
  color: var(--ant-color-primary, #1677ff);
}

.article-description {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 16px;
}

.article-meta {
  display: flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.45);
  font-size: 13px;
}

.article-cover {
  flex-shrink: 0;
  width: 272px;
  height: 160px;
  border-radius: 4px;
  overflow: hidden;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-actions {
  display: flex;
  gap: 24px;
  padding: 16px 0;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}

.article-actions span {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.article-actions span:hover {
  color: var(--ant-color-primary, #1677ff);
}

@media (max-width: 768px) {
  .article-cover {
    display: none;
  }
}
</style>
