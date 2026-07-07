<script setup lang="ts">
import { h } from 'vue'
import { BellOutlined } from '@antdv-next/icons'

const activeTab = ref('notification')

const notifications = ref([
  { id: '1', title: '你收到了 14 份新周报', read: false, time: '2 小时前', avatar: '📊' },
  { id: '2', title: '你推荐的 曲妮妮 已通过第三轮面试', read: false, time: '4 小时前', avatar: '👤' },
  { id: '3', title: '这种模板可以区分多种通知类型', read: true, time: '1 天前', avatar: '📋' },
])

const messages = ref([
  { id: '1', title: '曲丽丽 评论了你', content: '很不错的想法，可以考虑实施', time: '3 小时前' },
  { id: '2', title: '朱偏右 回复了你', content: '这个方案不错，我觉得可以', time: '1 天前' },
])

const todos = ref([
  { id: '1', title: '提交 API 文档', status: '未开始', extra: '紧急', extraColor: 'red' },
  { id: '2', title: '代码评审', status: '进行中', extra: '', extraColor: '' },
  { id: '3', title: '信息安全考试', status: '已逾期', extra: '已逾期 3 天', extraColor: 'red' },
])

const unreadCount = computed(() =>
  notifications.value.filter((n) => !n.read).length + messages.value.length,
)

function handleClear(type: string) {
  if (type === 'notification') notifications.value = []
  if (type === 'message') messages.value = []
  if (type === 'todo') todos.value = []
}
</script>

<template>
  <a-popover trigger="click" placement="bottomRight" :arrow="false">
    <a-badge :count="unreadCount" :offset="[-6, 4]" size="small">
      <a-button type="text" size="small" :icon="h(BellOutlined)" />
    </a-badge>

    <template #content>
      <div style="width: 336px">
        <a-tabs v-model:activeKey="activeTab" centered size="small">
          <!-- 通知 -->
          <a-tab-pane key="notification" :tab="`通知 (${notifications.length})`">
            <div class="notice-list">
              <div v-for="item in notifications" :key="item.id" class="notice-item">
                <span class="notice-avatar">{{ item.avatar }}</span>
                <div class="notice-body">
                  <div :class="['notice-title', { unread: !item.read }]">{{ item.title }}</div>
                  <div class="notice-desc">{{ item.time }}</div>
                </div>
              </div>
              <div v-if="notifications.length === 0" style="padding: 32px 0; text-align: center; color: rgba(0,0,0,0.25)">已读完所有通知</div>
            </div>
            <div class="notice-clear" @click="handleClear('notification')">清空通知</div>
          </a-tab-pane>

          <!-- 消息 -->
          <a-tab-pane key="message" :tab="`消息 (${messages.length})`">
            <div class="notice-list">
              <div v-for="item in messages" :key="item.id" class="notice-item">
                <div class="notice-body">
                  <div class="notice-title unread">{{ item.title }}</div>
                  <div class="notice-desc">{{ item.content }}</div>
                  <div class="notice-desc" style="margin-top: 2px">{{ item.time }}</div>
                </div>
              </div>
              <div v-if="messages.length === 0" style="padding: 32px 0; text-align: center; color: rgba(0,0,0,0.25)">已读完所有消息</div>
            </div>
            <div class="notice-clear" @click="handleClear('message')">清空消息</div>
          </a-tab-pane>

          <!-- 待办 -->
          <a-tab-pane key="todo" :tab="`待办 (${todos.length})`">
            <div class="notice-list">
              <div v-for="item in todos" :key="item.id" class="notice-item">
                <div class="notice-body" style="flex: 1">
                  <div class="notice-title">{{ item.title }}</div>
                  <div class="notice-desc">{{ item.status }}</div>
                </div>
                <a-tag v-if="item.extra" :color="item.extraColor || 'default'" style="margin: 0; flex-shrink: 0">{{ item.extra }}</a-tag>
              </div>
              <div v-if="todos.length === 0" style="padding: 32px 0; text-align: center; color: rgba(0,0,0,0.25)">已完成所有待办</div>
            </div>
            <div class="notice-clear" @click="handleClear('todo')">清空待办</div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </template>
  </a-popover>
</template>

<style scoped>
.notice-list {
  max-height: 320px;
  overflow-y: auto;
}
.notice-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(5, 5, 5, 0.06);
  cursor: pointer;
  transition: background 0.15s;
}
.notice-item:last-child { border-bottom: none; }
.notice-item:hover { background: rgba(0, 0, 0, 0.02); }
.notice-avatar {
  width: 32px; height: 32px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 20px; border-radius: 50%; background: #f5f5f5;
}
.notice-body { flex: 1; min-width: 0; }
.notice-title {
  font-size: 14px; color: rgba(0, 0, 0, 0.65);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.notice-title.unread { font-weight: 500; color: rgba(0, 0, 0, 0.88); }
.notice-desc { font-size: 12px; color: rgba(0, 0, 0, 0.45); margin-top: 4px; }
.notice-clear {
  text-align: center; padding: 8px; cursor: pointer;
  color: rgba(0, 0, 0, 0.45); font-size: 14px;
  border-top: 1px solid rgba(5, 5, 5, 0.06);
  transition: color 0.15s;
}
.notice-clear:hover { color: var(--ant-color-primary, #1677ff); }
</style>
