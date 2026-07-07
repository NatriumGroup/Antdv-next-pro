<script setup lang="ts">
import { PlusOutlined, DownOutlined } from '@antdv-next/icons'
import { App } from 'antdv-next'
import dayjs from 'dayjs'

const { message, modal } = App.useApp()

const listData = ref([
  { key: '0', id: '0', title: 'Alipay', logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', owner: '付小小', subDescription: '那是一种内在的东西，他们到达不了，也无法触及的', percent: 77, status: 'active' as const, createdAt: '2026-07-02 17:17' },
  { key: '1', id: '1', title: 'Angular', logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', owner: '曲丽丽', subDescription: '希望是一个好东西，也许是最好的，好东西是不会消亡的', percent: 0, status: 'exception' as const, createdAt: '2026-07-03 18:16' },
  { key: '2', id: '2', title: 'Ant Design', logo: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', owner: '林东东', subDescription: '生命就像一盒巧克力，结果往往出人意料', percent: 69, status: 'active' as const, createdAt: '2026-07-02 23:24' },
  { key: '3', id: '3', title: 'Ant Design Pro', logo: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', owner: '周星星', subDescription: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆', percent: 62, status: 'active' as const, createdAt: '2026-07-01 23:39' },
  { key: '4', id: '4', title: 'Bootstrap', logo: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', owner: '吴加好', subDescription: '那时候我只会想自己想要什么，从不想自己拥有什么', percent: 0, status: 'exception' as const, createdAt: '2026-06-28 03:51' },
  { key: '5', id: '5', title: 'React', logo: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', owner: '林东东', subDescription: '凛冬将至', percent: 85, status: 'active' as const, createdAt: '2026-06-25 12:00' },
  { key: '6', id: '6', title: 'Vue', logo: 'https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png', owner: '付小小', subDescription: '生命就像一盒巧克力，结果往往出人意料', percent: 92, status: 'success' as const, createdAt: '2026-06-20 08:30' },
  { key: '7', id: '7', title: 'Webpack', logo: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlhEQBr.png', owner: '周星星', subDescription: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆', percent: 45, status: 'normal' as const, createdAt: '2026-06-18 15:20' },
])

const pageSize = ref(5)
const currentPage = ref(1)
const pagedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return listData.value.slice(start, start + pageSize.value)
})

// Modal
const modalVisible = ref(false)
const modalDone = ref(false)
const currentItem = ref<any>(null)
const formState = reactive({ title: '', createdAt: null as any, owner: undefined as string | undefined, subDescription: '' })

function handleAdd() {
  currentItem.value = null
  Object.assign(formState, { title: '', createdAt: null, owner: undefined, subDescription: '' })
  modalDone.value = false
  modalVisible.value = true
}

function showEditModal(item: any) {
  currentItem.value = item
  Object.assign(formState, { title: item.title, createdAt: null, owner: item.owner, subDescription: item.subDescription })
  modalDone.value = false
  modalVisible.value = true
}

function handleModalSubmit() {
  message.success(currentItem.value ? '编辑成功' : '添加成功')
  modalDone.value = true
}

function handleDone() {
  modalVisible.value = false
  currentItem.value = null
  modalDone.value = false
}

function deleteItem(key: string) {
  modal.confirm({
    title: '删除任务',
    content: '确定删除该任务吗？',
    okText: '确认',
    cancelText: '取消',
    onOk() {
      listData.value = listData.value.filter(d => d.key !== key)
      message.success('删除成功')
    },
  })
}

function editAndDelete(key: string, item: any) {
  if (key === 'edit') showEditModal(item)
  else if (key === 'delete') deleteItem(item.key)
}
</script>

<template>
  <PageContainer>
    <div class="standard-list">
      <!-- 统计头部 -->
      <a-card variant="borderless">
        <a-row>
          <a-col :sm="8" :xs="24">
            <div class="header-info">
              <span>我的待办</span>
              <p>8个任务</p>
              <em />
            </div>
          </a-col>
          <a-col :sm="8" :xs="24">
            <div class="header-info">
              <span>本周任务平均处理时间</span>
              <p>32分钟</p>
              <em />
            </div>
          </a-col>
          <a-col :sm="8" :xs="24">
            <div class="header-info">
              <span>本周完成任务数</span>
              <p>24个任务</p>
            </div>
          </a-col>
        </a-row>
      </a-card>

      <!-- 列表卡片 -->
      <a-card
        variant="borderless"
        style="margin-top: 24px"
        :body-style="{ padding: '0 32px 40px 32px' }"
      >
        <template #title>基本列表</template>
        <template #extra>
          <div style="display: flex; align-items: center; gap: 16px">
            <a-segmented :options="[{ label: '全部', value: 'all' }, { label: '进行中', value: 'progress' }, { label: '等待中', value: 'waiting' }]" default-value="all" />
            <a-input-search placeholder="请输入" style="width: 272px" />
          </div>
        </template>

        <!-- 添加按钮 -->
        <a-button type="dashed" block style="margin: 16px 0 8px" @click="handleAdd">
          <template #icon><PlusOutlined /></template>
          添加
        </a-button>

        <!-- 列表项 -->
        <div class="list-item" v-for="item in pagedData" :key="item.key">
          <div class="list-item-meta">
            <a-avatar :src="item.logo" shape="square" :size="48" />
            <div class="list-item-meta-content">
              <div class="list-item-meta-title"><a>{{ item.title }}</a></div>
              <div class="list-item-meta-desc">{{ item.subDescription }}</div>
            </div>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>Owner</span>
              <p>{{ item.owner }}</p>
            </div>
            <div class="list-content-item">
              <span>开始时间</span>
              <p>{{ item.createdAt }}</p>
            </div>
            <div class="list-content-item">
              <a-progress :percent="item.percent" :status="item.status" :size="[180, 6]" />
            </div>
          </div>
          <div class="list-item-actions">
            <a-button type="link" @click="showEditModal(item)">编辑</a-button>
            <a-dropdown :menu="{ items: [{ key: 'edit', label: '编辑' }, { key: 'delete', label: '删除' }], onClick: ({ key }: { key: string }) => editAndDelete(key, item) }">
              <a-button type="link">更多 <DownOutlined /></a-button>
            </a-dropdown>
          </div>
        </div>

        <!-- 分页 -->
        <div style="margin-top: 24px; text-align: right">
          <a-pagination
            v-model:current="currentPage"
            v-model:page-size="pageSize"
            :total="listData.length"
            show-size-changer
            show-quick-jumper
          />
        </div>
      </a-card>
    </div>

    <!-- 操作弹窗 -->
    <a-modal
      v-model:open="modalVisible"
      :title="modalDone ? null : `任务${currentItem ? '编辑' : '添加'}`"
      :width="640"
      :footer="modalDone ? null : undefined"
      destroy-on-hidden
      @ok="handleModalSubmit"
      @cancel="handleDone"
    >
      <a-result
        v-if="modalDone"
        status="success"
        title="操作成功"
        sub-title="一系列的信息描述，很短同样也可以带标点。"
        style="padding: 72px 0"
      >
        <template #extra>
          <a-button type="primary" @click="handleDone">知道了</a-button>
        </template>
      </a-result>
      <a-form v-else :model="formState" layout="vertical" class="standard-list-form">
        <a-form-item label="任务名称" name="title" :rules="[{ required: true, message: '请输入任务名称' }]">
          <a-input v-model:value="formState.title" placeholder="请输入" />
        </a-form-item>
        <a-form-item label="开始时间" name="createdAt" :rules="[{ required: true, message: '请选择开始时间' }]">
          <a-date-picker v-model:value="formState.createdAt" show-time style="width: 100%" placeholder="请选择" />
        </a-form-item>
        <a-form-item label="任务负责人" name="owner" :rules="[{ required: true, message: '请选择任务负责人' }]">
          <a-select v-model:value="formState.owner" placeholder="请选择管理员">
            <a-select-option value="xiao">付晓晓</a-select-option>
            <a-select-option value="mao">周毛毛</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="产品描述" name="subDescription" :rules="[{ min: 5, message: '请输入至少五个字符的产品描述！' }]">
          <a-textarea v-model:value="formState.subDescription" placeholder="请输入至少五个字符" :rows="4" />
        </a-form-item>
      </a-form>
    </a-modal>
  </PageContainer>
</template>

<style scoped>
.standard-list :deep(.ant-card-head) {
  border-bottom: none;
}
.standard-list :deep(.ant-card-head-title) {
  padding: 24px 0;
  line-height: 32px;
}
.standard-list :deep(.ant-card-extra) {
  padding: 24px 0;
}

.header-info {
  position: relative;
  text-align: center;
}
.header-info > span {
  display: inline-block;
  margin-bottom: 4px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 22px;
}
.header-info > p {
  margin: 0;
  color: rgba(0, 0, 0, 0.88);
  font-size: 24px;
  line-height: 32px;
}
.header-info > em {
  position: absolute;
  top: 0;
  right: 0;
  width: 1px;
  height: 56px;
  background-color: rgba(5, 5, 5, 0.06);
}

.list-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
}
.list-item:last-child {
  border-bottom: none;
}

.list-item-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  min-width: 0;
}
.list-item-meta-content {
  flex: 1;
  min-width: 0;
}
.list-item-meta-title {
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 4px;
}
.list-item-meta-title a {
  color: rgba(0, 0, 0, 0.88);
}
.list-item-meta-desc {
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  line-height: 22px;
}

.list-content {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.list-content-item {
  display: inline-block;
  margin-left: 40px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
  vertical-align: middle;
  min-width: 100px;
}
.list-content-item > span {
  line-height: 20px;
}
.list-content-item > p {
  margin-top: 4px;
  margin-bottom: 0;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.88);
}

.list-item-actions {
  flex-shrink: 0;
  margin-left: 24px;
}

.standard-list-form :deep(.ant-form-item) {
  margin-bottom: 12px;
}
.standard-list-form :deep(.ant-form-item:last-child) {
  margin-bottom: 32px;
  padding-top: 4px;
}
</style>
