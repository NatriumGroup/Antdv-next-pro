<script setup lang="ts">
import { PlusOutlined, EditOutlined, DeleteOutlined, DownOutlined } from '@antdv-next/icons'
import { App } from 'antdv-next'
import dayjs from 'dayjs'

const { message, modal } = App.useApp()

// Mock data（对齐 Pro _mock）
const listData = ref(
  Array.from({ length: 10 }, (_, i) => ({
    key: String(i),
    title: `一个任务名称 ${i}`,
    avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${i}`,
    owner: ['付晓晓', '周星星', '吴加好', '林东东'][i % 4]!,
    description: '一个任务需要在指定时间内完成，可以在这里查看进度和详情。',
    percent: Math.floor(Math.random() * 100),
    status: (['active', 'normal', 'exception', 'success'] as const)[i % 4],
    createdAt: dayjs().subtract(i, 'day').format('YYYY-MM-DD HH:mm'),
  })),
)

// Modal
const modalVisible = ref(false)
const modalDone = ref(false)
const currentItem = ref<any>(null)

function handleAdd() { currentItem.value = null; modalDone.value = false; modalVisible.value = true }
function handleEdit(item: any) { currentItem.value = item; modalDone.value = false; modalVisible.value = true }
function handleModalSubmit() { message.success(currentItem.value ? '编辑成功' : '添加成功'); modalDone.value = true }
function handleDone() { modalVisible.value = false; currentItem.value = null; modalDone.value = false }

function handleDelete(key: string) {
  modal.confirm({
    title: '删除任务', content: '确定要删除这个任务吗？',
    onOk() { listData.value = listData.value.filter(d => d.key !== key); message.success('删除成功') },
  })
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px; color: rgba(0,0,0,0.45); font-size: 14px">
      标准列表，带基本 CRUD 操作。
    </div>

    <!-- 统计头部 -->
    <a-card variant="borderless" style="margin-bottom: 24px">
      <a-row>
        <a-col :sm="8" :xs="24" style="text-align: center; border-right: 1px solid rgba(5,5,5,0.06)">
          <div style="color: rgba(0,0,0,0.45); font-size: 14px; margin-bottom: 4px">我的待办</div>
          <p style="font-size: 24px; color: rgba(0,0,0,0.88); margin: 0">8 个任务</p>
        </a-col>
        <a-col :sm="8" :xs="24" style="text-align: center; border-right: 1px solid rgba(5,5,5,0.06)">
          <div style="color: rgba(0,0,0,0.45); font-size: 14px; margin-bottom: 4px">本周任务平均处理时间</div>
          <p style="font-size: 24px; color: rgba(0,0,0,0.88); margin: 0">32 分钟</p>
        </a-col>
        <a-col :sm="8" :xs="24" style="text-align: center">
          <div style="color: rgba(0,0,0,0.45); font-size: 14px; margin-bottom: 4px">本周完成任务数</div>
          <p style="font-size: 24px; color: rgba(0,0,0,0.88); margin: 0">24 个</p>
        </a-col>
      </a-row>
    </a-card>

    <!-- 列表 -->
    <a-card variant="borderless">
      <template #title>
        <div style="display: flex; justify-content: space-between; align-items: center">
          <span>标准列表</span>
          <div style="display: flex; align-items: center; gap: 16px">
            <a-segmented :options="['全部', '进行中', '等待中']" />
            <a-input-search placeholder="请输入" style="width: 272px" />
          </div>
        </div>
      </template>

      <a-button type="dashed" block style="margin-bottom: 16px" @click="handleAdd">
        <template #icon><PlusOutlined /></template>
        添加
      </a-button>

      <a-list :data-source="listData" :pagination="{ pageSize: 5, showSizeChanger: true }" item-layout="horizontal">
        <template #renderItem="{ item }">
          <a-list-item>
            <template #actions>
              <a @click="handleEdit(item)"><EditOutlined /> 编辑</a>
              <a-dropdown>
                <a>更多 <DownOutlined /></a>
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="edit">编辑</a-menu-item>
                    <a-menu-item key="delete" @click="handleDelete(item.key)">删除</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </template>
            <a-list-item-meta :description="item.description">
              <template #avatar><a-avatar :src="item.avatar" shape="square" :size="48" /></template>
              <template #title><a>{{ item.title }}</a></template>
            </a-list-item-meta>
            <div style="display: flex; align-items: center; gap: 40px">
              <div style="min-width: 80px">
                <div style="color: rgba(0,0,0,0.45); font-size: 12px">Owner</div>
                <div>{{ item.owner }}</div>
              </div>
              <div style="min-width: 120px">
                <div style="color: rgba(0,0,0,0.45); font-size: 12px">开始时间</div>
                <div>{{ item.createdAt }}</div>
              </div>
              <a-progress :percent="item.percent" :status="item.status" :size="[180, 6]" />
            </div>
          </a-list-item>
        </template>
      </a-list>
    </a-card>

    <!-- 操作弹窗 -->
    <a-modal v-model:open="modalVisible" :title="modalDone ? '完成' : (currentItem ? '编辑任务' : '添加任务')" :footer="modalDone ? null : undefined" @ok="modalDone ? handleDone() : handleModalSubmit()">
      <a-result v-if="modalDone" status="success" :title="currentItem ? '编辑成功' : '添加成功'" sub-title="操作已完成">
        <template #extra>
          <a-button type="primary" @click="handleDone">知道了</a-button>
        </template>
      </a-result>
      <a-form v-else layout="vertical">
        <a-form-item label="任务名称"><a-input :default-value="currentItem?.title" placeholder="请输入" /></a-form-item>
        <a-form-item label="开始时间"><a-date-picker style="width: 100%" /></a-form-item>
        <a-form-item label="任务负责人">
          <a-select :default-value="currentItem?.owner" placeholder="请选择">
            <a-select-option value="付晓晓">付晓晓</a-select-option>
            <a-select-option value="周星星">周星星</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="产品描述"><a-textarea :default-value="currentItem?.description" placeholder="请输入" :rows="4" /></a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>
