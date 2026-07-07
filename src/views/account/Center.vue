<script setup lang="ts">
import {
  ClusterOutlined,
  HomeOutlined,
  ContactsOutlined,
  PlusOutlined,
} from '@antdv-next/icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const activeTab = ref('articles')

const currentUser = {
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  name: '吴彦祖',
  signature: '海纳百川，有容乃大',
  title: '交互专家',
  group: '蚂蚁集团-某某某事业群-某某平台部-某某技术部-UED',
  tags: ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川'],
  geographic: { province: '浙江省', city: '杭州市' },
}

const teamMembers = [
  { id: '1', name: '科学搬砖组', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png' },
  { id: '2', name: '全组都是吴彦祖', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png' },
  { id: '3', name: '中二少女团', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png' },
  { id: '4', name: '程序员日常', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png' },
  { id: '5', name: '高逼格设计天团', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png' },
  { id: '6', name: '骗你来学计算机', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png' },
]

const articles = Array.from({ length: 5 }, (_, i) => ({
  key: String(i), title: `Alipay 开发文档 ${i + 1}`, avatar: currentUser.avatar,
  description: '那是一种内在的东西，他们到达不了，也无法触及的——那是你的。',
  content: '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
  updatedAt: dayjs().subtract(i + 1, 'day').format(),
  star: Math.floor(Math.random() * 200), like: Math.floor(Math.random() * 100), message: Math.floor(Math.random() * 50),
}))

const projects = Array.from({ length: 6 }, (_, i) => ({
  key: String(i),
  title: ['Alipay', 'Angular', 'Ant Design', 'Ant Design Pro', 'Bootstrap', 'Vue'][i],
  cover: [
    'https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png',
    'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
    'https://gw.alipayobjects.com/zos/rmsportal/uVZonEtjWwmUZPBQfnUo.png',
    'https://gw.alipayobjects.com/zos/rmsportal/gLaIAoVWTtLbBWZNYEMg.png',
    'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
    'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
  ][i],
  description: '在中台产品的研发过程中，会出现不同的设计规范和实现方式。',
  updatedAt: dayjs().subtract(i, 'day').format(),
}))

const inputVisible = ref(false)
const inputValue = ref('')
const tags = ref([...currentUser.tags])
function handleTagClose(tag: string) { tags.value = tags.value.filter(t => t !== tag) }
function handleInputConfirm() { if (inputValue.value && !tags.value.includes(inputValue.value)) { tags.value.push(inputValue.value) }; inputValue.value = ''; inputVisible.value = false }
</script>

<template>
  <a-row :gutter="24">
    <!-- 左：个人信息 -->
    <a-col :xl="7" :lg="24" :md="24" :sm="24" :xs="24" style="margin-bottom: 24px">
      <a-card variant="borderless">
        <div style="text-align: center; margin-bottom: 24px">
          <a-avatar :src="currentUser.avatar" :size="104" />
          <div style="font-size: 20px; font-weight: 500; margin-top: 16px">{{ currentUser.name }}</div>
          <div style="color: rgba(0,0,0,0.45)">{{ currentUser.signature }}</div>
        </div>
        <div style="margin-bottom: 24px">
          <p style="display: flex; align-items: center; gap: 8px; color: rgba(0,0,0,0.45); margin-bottom: 8px">
            <ContactsOutlined /> {{ currentUser.title }}
          </p>
          <p style="display: flex; align-items: center; gap: 8px; color: rgba(0,0,0,0.45); margin-bottom: 8px">
            <ClusterOutlined /> {{ currentUser.group }}
          </p>
          <p style="display: flex; align-items: center; gap: 8px; color: rgba(0,0,0,0.45); margin-bottom: 0">
            <HomeOutlined /> {{ currentUser.geographic.province }} {{ currentUser.geographic.city }}
          </p>
        </div>
        <a-divider style="margin: 16px 0" dashed />
        <div>
          <div style="font-weight: 500; margin-bottom: 12px; color: rgba(0,0,0,0.85)">标签</div>
          <div>
            <a-tag v-for="tag in tags" :key="tag" closable @close="handleTagClose(tag)">{{ tag }}</a-tag>
            <a-input
              v-if="inputVisible"
              v-model:value="inputValue"
              size="small"
              style="width: 78px"
              @blur="handleInputConfirm"
              @keyup.enter="handleInputConfirm"
            />
            <a-tag v-else style="background: #fff; border-style: dashed; cursor: pointer" @click="inputVisible = true">
              <PlusOutlined /> 新标签
            </a-tag>
          </div>
        </div>
        <a-divider style="margin: 16px 0" dashed />
        <div>
          <div style="font-weight: 500; margin-bottom: 12px; color: rgba(0,0,0,0.85)">团队</div>
          <a-row :gutter="[0, 12]">
            <a-col v-for="m in teamMembers" :key="m.id" :span="24">
              <a style="display: flex; align-items: center; gap: 12px; color: rgba(0,0,0,0.65)">
                <a-avatar :src="m.avatar" :size="24" />
                {{ m.name }}
              </a>
            </a-col>
          </a-row>
        </div>
      </a-card>
    </a-col>

    <!-- 右：内容 Tabs -->
    <a-col :xl="17" :lg="24" :md="24" :sm="24" :xs="24">
      <a-card variant="borderless" :styles="{ body: { padding: 0 } }">
        <a-tabs v-model:activeKey="activeTab" style="padding: 0 24px">
          <a-tab-pane key="articles" tab="文章(8)">
            <a-list :data-source="articles" item-layout="vertical" :pagination="{ pageSize: 3 }">
              <template #renderItem="{ item }">
                <a-list-item style="padding: 16px 24px">
                  <template #actions>
                    <span>⭐ {{ item.star }}</span>
                    <span>👍 {{ item.like }}</span>
                    <span>💬 {{ item.message }}</span>
                  </template>
                  <a-list-item-meta>
                    <template #avatar><a-avatar :src="item.avatar" /></template>
                    <template #title><a>{{ item.title }}</a></template>
                    <template #description>
                      <a-tag>Ant Design</a-tag>
                      <a-tag>设计语言</a-tag>
                      <a-tag>蚂蚁金服</a-tag>
                    </template>
                  </a-list-item-meta>
                  <div style="color: rgba(0,0,0,0.45)">{{ item.content }}</div>
                  <div style="margin-top: 16px; color: rgba(0,0,0,0.25); font-size: 12px">
                    {{ dayjs(item.updatedAt).fromNow() }}
                  </div>
                </a-list-item>
              </template>
            </a-list>
          </a-tab-pane>
          <a-tab-pane key="projects" tab="项目(6)">
            <a-list :data-source="projects" :grid="{ gutter: 24, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }" style="padding: 0 24px 24px">
              <template #renderItem="{ item }">
                <a-list-item>
                  <a-card hoverable>
                    <template #cover>
                      <img :src="item.cover" style="height: 154px; object-fit: cover" />
                    </template>
                    <a-card-meta :title="item.title" :description="item.description" />
                    <div style="margin-top: 8px; color: rgba(0,0,0,0.25); font-size: 12px">{{ dayjs(item.updatedAt).fromNow() }}</div>
                  </a-card>
                </a-list-item>
              </template>
            </a-list>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </a-col>
  </a-row>
</template>
