<script setup lang="ts">
import { h, nextTick } from 'vue'
import { UserOutlined, SendOutlined, PlusOutlined, DeleteOutlined, StopOutlined } from '@antdv-next/icons'
import { App } from 'antdv-next'

const { message: msg } = App.useApp()

const CHAT_API_URL = 'https://api.x.ant.design/api/big_model_glm-4.5-flash'
const WELCOME_TEXT = '🤖 你好，有什么可以帮你？'

// ── 打字机标题 ──
const typeIndex = ref(0)
const typeDone = computed(() => typeIndex.value >= WELCOME_TEXT.length)
const welcomeSlice = computed(() => WELCOME_TEXT.slice(0, typeIndex.value))

let typeTimer: ReturnType<typeof setInterval> | null = null
onMounted(() => {
  typeTimer = setInterval(() => {
    if (typeIndex.value >= WELCOME_TEXT.length) {
      clearInterval(typeTimer!)
      return
    }
    typeIndex.value++
  }, 80)
})
onUnmounted(() => { if (typeTimer) clearInterval(typeTimer) })

// ── 会话管理 ──
interface ConversationItem {
  key: string
  label: string
  group: string
  isDraft?: boolean
}

interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  thinkContent?: string
  loading?: boolean
}

let idCounter = 0
function genId() { return `conv-${++idCounter}` }
function msgId() { return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}` }

const conversations = ref<ConversationItem[]>([
  { key: 'default', label: '💬 新对话', group: '今天', isDraft: true },
  { key: 'preset-1', label: '🧩 Ant Design 的 Form 表单如何做联动校验？', group: '今天' },
  { key: 'preset-2', label: '📋 ProTable 如何自定义工具栏按钮？', group: '今天' },
  { key: 'preset-3', label: '🎨 如何用 antd-style 实现暗色主题切换？', group: '昨天' },
  { key: 'preset-4', label: '🗂️ ProLayout 侧边菜单如何动态生成？', group: '昨天' },
  { key: 'preset-5', label: '📊 Ant Design Charts 折线图数据格式', group: '昨天' },
  { key: 'preset-6', label: '🚀 Ant Design Pro 如何接入后端权限系统？', group: '更早' },
  { key: 'preset-7', label: '🔍 ProForm 中 Select 远程搜索怎么实现？', group: '更早' },
  { key: 'preset-8', label: '⚙️ Ant Design Token 定制主题最佳实践', group: '更早' },
])
const activeKey = ref('default')
const inputValue = ref('')
const isRequesting = ref(false)
let abortController: AbortController | null = null

// 按会话分组的消息记录
const messagesByConv = reactive<Record<string, ChatMessage[]>>({})
const currentMessages = computed(() => messagesByConv[activeKey.value] ?? [])
const hasMessages = computed(() => currentMessages.value.length > 0)

// 按 group 分组的会话列表
const groupedConversations = computed(() => {
  const groups: Record<string, ConversationItem[]> = {}
  for (const c of conversations.value) {
    const g = c.group || '其他'
    if (!groups[g]) groups[g] = []
    groups[g].push(c)
  }
  return groups
})

// ── 滚动到底部 ──
const messagesRef = ref<HTMLElement | null>(null)
function scrollToBottom() {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}

// ── 新建对话 ──
function newChat() {
  const key = genId()
  conversations.value.unshift({ key, label: '💬 新对话', group: '今天', isDraft: true })
  activeKey.value = key
}

// ── 删除对话 ──
function deleteConv(key: string) {
  conversations.value = conversations.value.filter((c) => c.key !== key)
  delete messagesByConv[key]
  if (conversations.value.length === 0) {
    newChat()
  } else if (activeKey.value === key) {
    activeKey.value = conversations.value[0].key
  }
}

// ── 解析 <think> 标签 ──
function parseThink(text: string): { thinkContent?: string; content: string } {
  const trimmed = text.trimStart()
  const full = trimmed.match(/^<think>([\s\S]*?)<\/think>([\s\S]*)$/)
  if (full) return { thinkContent: full[1], content: full[2].trimStart() }
  const partial = trimmed.match(/^<think>([\s\S]*)$/)
  if (partial) return { thinkContent: partial[1], content: '' }
  return { content: trimmed }
}

// ── 发送消息 ──
async function sendMessage() {
  const content = inputValue.value.trim()
  if (!content || isRequesting.value) return

  inputValue.value = ''

  // 更新 draft 标签
  const conv = conversations.value.find((c) => c.key === activeKey.value)
  if (conv?.isDraft) {
    conv.label = content.length > 20 ? content.slice(0, 20) + '…' : content
    conv.isDraft = false
  }

  // 初始化消息数组
  if (!messagesByConv[activeKey.value]) messagesByConv[activeKey.value] = []
  const msgs = messagesByConv[activeKey.value]

  // 添加用户消息
  msgs.push({ id: msgId(), role: 'user', content })
  scrollToBottom()

  // 添加 AI 占位
  const aiMsg: ChatMessage = { id: msgId(), role: 'assistant', content: '', loading: true }
  msgs.push(aiMsg)
  scrollToBottom()

  // 构造历史
  const history = msgs.slice(0, -1).map((m) => ({ role: m.role, content: m.content }))

  // SSE 请求
  isRequesting.value = true
  abortController = new AbortController()

  try {
    const res = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'glm-4.5-flash',
        stream: true,
        messages: history,
      }),
      signal: abortController.signal,
    })

    if (!res.ok || !res.body) {
      aiMsg.content = '请求失败，请稍后重试'
      aiMsg.loading = false
      isRequesting.value = false
      return
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let fullContent = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n')

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const data = line.slice(6).trim()
        if (data === '[DONE]') continue

        try {
          const json = JSON.parse(data)
          const delta = json.choices?.[0]?.delta?.content
          if (delta) {
            fullContent += delta
            const parsed = parseThink(fullContent)
            aiMsg.content = parsed.content
            aiMsg.thinkContent = parsed.thinkContent
            scrollToBottom()
          }
        } catch {}
      }
    }

    aiMsg.loading = false
  } catch (e: any) {
    if (e.name !== 'AbortError') {
      aiMsg.content = aiMsg.content || '请求出错，请稍后重试'
    }
    aiMsg.loading = false
  } finally {
    isRequesting.value = false
    abortController = null
  }
}

function abortRequest() {
  abortController?.abort()
  isRequesting.value = false
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}
</script>

<template>
  <a-card
    variant="borderless"
    :style="{ height: 'calc(100vh - 160px)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }"
    :body-style="{ flex: 1, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }"
  >
    <div class="chat-layout">
      <!-- ============ 左侧会话列表 ============ -->
      <div class="chat-sidebar">
        <div style="padding: 12px">
          <a-button block @click="newChat">
            <template #icon><PlusOutlined /></template>
            新建对话
          </a-button>
        </div>
        <div class="chat-conv-list">
          <template v-for="(items, group) in groupedConversations" :key="group">
            <div class="chat-conv-group">{{ group }}</div>
            <div
              v-for="item in items"
              :key="item.key"
              class="chat-conv-item"
              :class="{ active: item.key === activeKey }"
              @click="activeKey = item.key"
            >
              <span class="chat-conv-label">{{ item.label }}</span>
              <span class="chat-conv-delete" @click.stop="deleteConv(item.key)">
                <DeleteOutlined />
              </span>
            </div>
          </template>
        </div>
      </div>

      <!-- ============ 右侧主区域 ============ -->
      <div class="chat-main">
        <!-- 消息列表 -->
        <div v-if="hasMessages" ref="messagesRef" class="chat-messages">
          <div class="chat-messages-inner">
            <div
              v-for="m in currentMessages"
              :key="m.id"
              class="chat-bubble-row"
              :class="m.role === 'user' ? 'is-user' : 'is-ai'"
            >
              <!-- AI 头像 -->
              <div v-if="m.role === 'assistant'" class="chat-avatar chat-avatar-ai">🤖</div>
              <div class="chat-bubble" :class="m.role === 'user' ? 'bubble-user' : 'bubble-ai'">
                <!-- 思考块 -->
                <div v-if="m.thinkContent" class="chat-think">
                  <div class="chat-think-label">💭 思考中...</div>
                  <div class="chat-think-content">{{ m.thinkContent }}</div>
                </div>
                <!-- 加载中 -->
                <span v-if="m.loading && !m.content" class="chat-loading">
                  <span class="dot" /><span class="dot" /><span class="dot" />
                </span>
                <!-- 内容 -->
                <div v-else-if="m.content" style="white-space: pre-wrap; word-break: break-word">{{ m.content }}</div>
              </div>
              <!-- 用户头像 -->
              <a-avatar v-if="m.role === 'user'" :size="36" :icon="h(UserOutlined)" />
            </div>
          </div>
        </div>

        <!-- 欢迎 / 输入 -->
        <div :class="hasMessages ? 'chat-footer' : 'chat-footer-center'">
          <div v-if="!hasMessages" class="chat-welcome">
            {{ welcomeSlice }}<span v-if="!typeDone" class="chat-cursor">|</span>
          </div>
          <div class="chat-input-wrap">
            <a-textarea
              v-model:value="inputValue"
              placeholder="输入消息，按 Enter 发送..."
              :auto-size="{ minRows: 2, maxRows: 6 }"
              @keydown="handleKeydown"
            />
            <div style="display: flex; justify-content: flex-end; margin-top: 8px">
              <a-button
                v-if="isRequesting"
                danger
                @click="abortRequest"
              >
                <template #icon><StopOutlined /></template>
                停止
              </a-button>
              <a-button
                v-else
                type="primary"
                :disabled="!inputValue.trim()"
                @click="sendMessage"
              >
                <template #icon><SendOutlined /></template>
                发送
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </a-card>
</template>

<style scoped>
.chat-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
  height: 100%;
}

/* ── 侧边栏 ── */
.chat-sidebar {
  width: 260px;
  border-right: 1px solid var(--ant-color-border-secondary, #f0f0f0);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex-shrink: 0;
}

.chat-conv-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 8px 8px;
}

.chat-conv-group {
  padding: 12px 8px 4px;
  font-size: 12px;
  color: var(--ant-color-text-tertiary, rgba(0,0,0,0.45));
  font-weight: 500;
}

.chat-conv-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  gap: 8px;
}

.chat-conv-item:hover {
  background: var(--ant-color-bg-text-hover, rgba(0,0,0,0.06));
}

.chat-conv-item.active {
  background: var(--ant-color-primary-bg, #e6f4ff);
  color: var(--ant-color-primary, #1677ff);
}

.chat-conv-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 14px;
}

.chat-conv-delete {
  opacity: 0;
  font-size: 12px;
  color: var(--ant-color-text-tertiary, rgba(0,0,0,0.45));
  flex-shrink: 0;
  transition: opacity 0.2s;
}

.chat-conv-item:hover .chat-conv-delete {
  opacity: 1;
}

/* ── 主区域 ── */
.chat-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.chat-messages-inner {
  max-width: 940px;
  margin: 0 auto;
}

/* ── 气泡 ── */
.chat-bubble-row {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  align-items: flex-start;
}

.chat-bubble-row.is-user {
  justify-content: flex-end;
}

.chat-bubble-row.is-ai {
  justify-content: flex-start;
}

.chat-avatar-ai {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  flex-shrink: 0;
}

.chat-bubble {
  max-width: 70%;
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
}

.bubble-user {
  background: var(--ant-color-primary, #1677ff);
  color: #fff;
  border-bottom-right-radius: 4px;
}

.bubble-ai {
  background: var(--ant-color-fill-tertiary, #f5f5f5);
  color: var(--ant-color-text, rgba(0,0,0,0.88));
  border-bottom-left-radius: 4px;
}

/* ── 思考块 ── */
.chat-think {
  margin-bottom: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.04);
  font-size: 13px;
}

.chat-think-label {
  font-weight: 500;
  margin-bottom: 4px;
  color: var(--ant-color-text-secondary, rgba(0,0,0,0.65));
}

.chat-think-content {
  color: var(--ant-color-text-tertiary, rgba(0,0,0,0.45));
  white-space: pre-wrap;
}

/* ── 加载动画 ── */
.chat-loading {
  display: inline-flex;
  gap: 4px;
  align-items: center;
  padding: 4px 0;
}

.chat-loading .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ant-color-text-quaternary, rgba(0,0,0,0.25));
  animation: dot-bounce 1.2s ease-in-out infinite;
}

.chat-loading .dot:nth-child(2) { animation-delay: 0.2s; }
.chat-loading .dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes dot-bounce {
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1); }
}

/* ── 底部输入 ── */
.chat-footer {
  padding: 16px;
  border-top: 1px solid var(--ant-color-border-secondary, #f0f0f0);
  display: flex;
  justify-content: center;
}

.chat-footer-center {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  gap: 32px;
  margin-top: -10%;
}

.chat-input-wrap {
  max-width: 940px;
  width: 100%;
}

.chat-welcome {
  font-size: 32px;
  font-weight: 600;
  text-align: center;
}

.chat-cursor {
  animation: blink 0.8s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
