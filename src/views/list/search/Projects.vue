<script setup lang="ts">
const categories = ['类目一', '类目二', '类目三', '类目四', '类目五', '类目六', '类目七', '类目八', '类目九', '类目十', '类目十一', '类目十二']
const selectedCategory = ref<string>('')

function onCategoryClick(cat: string) {
  selectedCategory.value = selectedCategory.value === cat ? '' : cat
}

const projects = ref([
  {
    id: '1',
    title: 'Alipay',
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
    description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件。',
    updatedAt: '2小时前',
    members: [
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', name: '曲丽丽' },
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwLFjKQvQS.png', name: '王昭君' },
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', name: '董娜娜' },
    ],
  },
  {
    id: '2',
    title: 'Angular',
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
    description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件。',
    updatedAt: '5小时前',
    members: [
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', name: '曲丽丽' },
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwLFjKQvQS.png', name: '王昭君' },
    ],
  },
  {
    id: '3',
    title: 'Ant Design',
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
    description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件。',
    updatedAt: '1天前',
    members: [
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', name: '曲丽丽' },
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwLFjKQvQS.png', name: '王昭君' },
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', name: '董娜娜' },
    ],
  },
  {
    id: '4',
    title: 'Ant Design Pro',
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
    description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件。',
    updatedAt: '3天前',
    members: [
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', name: '曲丽丽' },
    ],
  },
  {
    id: '5',
    title: 'Bootstrap',
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
    description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件。',
    updatedAt: '5天前',
    members: [
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', name: '曲丽丽' },
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwLFjKQvQS.png', name: '王昭君' },
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', name: '董娜娜' },
    ],
  },
  {
    id: '6',
    title: 'React',
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
    description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件。',
    updatedAt: '1周前',
    members: [
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', name: '曲丽丽' },
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwLFjKQvQS.png', name: '王昭君' },
    ],
  },
  {
    id: '7',
    title: 'Vue',
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
    description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件。',
    updatedAt: '2周前',
    members: [
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', name: '曲丽丽' },
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwLFjKQvQS.png', name: '王昭君' },
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png', name: '董娜娜' },
    ],
  },
  {
    id: '8',
    title: 'Webpack',
    cover: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
    description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件。',
    updatedAt: '1个月前',
    members: [
      { avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png', name: '曲丽丽' },
    ],
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

  <!-- Project cards -->
  <div style="margin-top: 24px">
    <a-row :gutter="[16, 16]">
      <a-col v-for="project in projects" :key="project.id" :xs="24" :sm="12" :md="8" :lg="6">
        <a-card hoverable>
          <template #cover>
            <img :alt="project.title" :src="project.cover" style="height: 154px; object-fit: cover" />
          </template>
          <a-card-meta :title="project.title">
            <template #description>
              <div class="project-description">{{ project.description }}</div>
            </template>
          </a-card-meta>
          <div class="card-item-content">
            <span>{{ project.updatedAt }}</span>
            <div class="avatar-list">
              <a-tooltip v-for="(member, index) in project.members" :key="index" :title="member.name">
                <a-avatar :src="member.avatar" :size="24" :style="{ marginLeft: index > 0 ? '-8px' : '0' }" />
              </a-tooltip>
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

.project-description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 44px;
}

.card-item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  font-size: 13px;
  color: rgba(0, 0, 0, 0.45);
}

.avatar-list {
  display: flex;
  align-items: center;
}
</style>
