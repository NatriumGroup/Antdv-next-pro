<script setup lang="ts">
import { PlusOutlined } from '@antdv-next/icons'

const cardData = [
  { id: '1', title: 'Alipay', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。' },
  { id: '2', title: 'Angular', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。' },
  { id: '3', title: 'Ant Design', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。' },
  { id: '4', title: 'Ant Design Pro', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。' },
  { id: '5', title: 'Bootstrap', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。' },
  { id: '6', title: 'React', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。' },
  { id: '7', title: 'Vue', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。' },
  { id: '8', title: 'Webpack', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlhEQBr.png', description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。' },
]
</script>

<template>
  <PageContainer>
    <template #content>
      <div class="page-header-content">
        <p>段落示意：蚂蚁集团设计平台 ant.design，用最小的工作量，无缝接入蚂蚁集团生态，提供跨越设计与开发的体验解决方案。</p>
        <div class="content-link">
          <a href="https://pro.ant.design/zh-CN/docs/getting-started">
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />
            快速开始
          </a>
          <a href="https://pro.ant.design/zh-CN/docs/introduction">
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />
            产品简介
          </a>
          <a href="https://pro.ant.design/zh-CN/docs/overview">
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />
            产品文档
          </a>
        </div>
      </div>
    </template>

    <div class="card-list">
      <a-row :gutter="16">
        <!-- 新增卡片 -->
        <a-col :xs="24" :sm="12" :md="8" :lg="8" :xl="6" style="margin-bottom: 16px">
          <a-button type="dashed" class="new-button">
            <PlusOutlined style="font-size: 24px" />
            <span>新增产品</span>
          </a-button>
        </a-col>

        <!-- 产品卡片 -->
        <a-col v-for="item in cardData" :key="item.id" :xs="24" :sm="12" :md="8" :lg="8" :xl="6" style="margin-bottom: 16px">
          <a-card hoverable class="product-card">
            <a-card-meta :title="item.title">
              <template #avatar>
                <img :src="item.avatar" alt="" class="card-avatar" />
              </template>
              <template #description>
                <div class="card-desc">{{ item.description }}</div>
              </template>
            </a-card-meta>
            <template #actions>
              <a-button type="link">操作一</a-button>
              <a-button type="link">操作二</a-button>
            </template>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </PageContainer>
</template>

<style scoped>
.page-header-content p {
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  margin: 0;
}

.content-link {
  display: flex;
  flex-wrap: nowrap;
  margin-top: 16px;
}

.content-link a {
  display: inline-flex;
  align-items: center;
  margin-right: 32px;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.88);
}

.content-link img {
  width: 24px;
  margin-right: 8px;
  flex-shrink: 0;
}

.new-button {
  width: 100%;
  height: 201px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}

.product-card :deep(.ant-card-meta-title) {
  margin-bottom: 12px;
}

.product-card :deep(.ant-card-meta-title > a) {
  color: rgba(0, 0, 0, 0.88);
}

.product-card:hover :deep(.ant-card-meta-title a) {
  color: var(--ant-color-primary, #1677ff);
}

.card-avatar {
  width: 48px;
  height: 48px;
  border-radius: 48px;
}

.card-desc {
  height: 64px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.45);
}
</style>
