<script setup lang="ts">
import { PlusOutlined, ReloadOutlined, SearchOutlined } from '@antdv-next/icons'
import { App } from 'antdv-next'

const { message, modal } = App.useApp()

const searchForm = reactive({ name: '', status: undefined as string | undefined })
const loading = ref(false)

const statusMap: Record<string, { text: string; status: string }> = {
  '0': { text: '关闭', status: 'default' },
  '1': { text: '运行中', status: 'processing' },
  '2': { text: '已上线', status: 'success' },
  '3': { text: '异常', status: 'error' },
}

const columns = [
  { title: '规则名称', dataIndex: 'name', key: 'name' },
  { title: '描述', dataIndex: 'desc', key: 'desc', ellipsis: true },
  { title: '服务调用次数', dataIndex: 'callNo', key: 'callNo', sorter: true },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '上次调度时间', dataIndex: 'updatedAt', key: 'updatedAt', sorter: true },
  { title: '操作', key: 'action', width: 200 },
]

const dataSource = ref(
  Array.from({ length: 30 }, (_, i) => ({
    key: String(i), name: `TradeCode ${i}`, desc: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: String(i % 4),
    updatedAt: `2026-07-${String((i % 28) + 1).padStart(2, '0')} 12:00:00`,
  })),
)

const pagination = reactive({ current: 1, pageSize: 10, total: 30, showSizeChanger: true, showQuickJumper: true, showTotal: (t: number) => `共 ${t} 条` })

// 行选择
const selectedRowKeys = ref<string[]>([])
const rowSelection = computed(() => ({
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: string[]) => { selectedRowKeys.value = keys },
}))

// 新建弹窗
const createVisible = ref(false)
const createForm = reactive({ name: '', desc: '' })
function handleCreate() { createForm.name = ''; createForm.desc = ''; createVisible.value = true }
function handleCreateOk() { message.success('添加成功'); createVisible.value = false }

// 详情抽屉
const detailVisible = ref(false)
const currentRow = ref<any>(null)
function showDetail(record: any) { currentRow.value = record; detailVisible.value = true }

// 批量删除
function handleBatchDelete() {
  modal.confirm({
    title: `确定删除选中的 ${selectedRowKeys.value.length} 项吗？`,
    onOk() {
      dataSource.value = dataSource.value.filter(d => !selectedRowKeys.value.includes(d.key))
      selectedRowKeys.value = []
      message.success('删除成功')
    },
  })
}

function handleSearch() { message.info('搜索') }
function handleReset() { searchForm.name = ''; searchForm.status = undefined }
</script>

<template>
  <div>
    <!-- 搜索栏 -->
    <a-card variant="borderless" style="margin-bottom: 24px">
      <a-form layout="inline" :model="searchForm">
        <a-form-item label="规则名称">
          <a-input v-model:value="searchForm.name" placeholder="请输入" allow-clear />
        </a-form-item>
        <a-form-item label="状态">
          <a-select v-model:value="searchForm.status" placeholder="请选择" allow-clear style="width: 120px">
            <a-select-option value="0">关闭</a-select-option>
            <a-select-option value="1">运行中</a-select-option>
            <a-select-option value="2">已上线</a-select-option>
            <a-select-option value="3">异常</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item>
          <a-space>
            <a-button type="primary" @click="handleSearch"><template #icon><SearchOutlined /></template>查询</a-button>
            <a-button @click="handleReset"><template #icon><ReloadOutlined /></template>重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>

    <!-- 表格 -->
    <a-card variant="borderless">
      <div style="display: flex; justify-content: space-between; margin-bottom: 16px">
        <span style="font-size: 16px; font-weight: 500">查询表格</span>
        <a-button type="primary" @click="handleCreate"><template #icon><PlusOutlined /></template>新建</a-button>
      </div>

      <a-table
        :columns="columns" :data-source="dataSource" :loading="loading"
        :pagination="pagination" row-key="key" :row-selection="rowSelection"
      >
        <template #bodyCell="{ column, record, text }">
          <template v-if="column.key === 'name'">
            <a @click="showDetail(record)">{{ text }}</a>
          </template>
          <template v-if="column.key === 'callNo'">{{ text }} 万</template>
          <template v-if="column.key === 'status'">
            <a-badge :status="statusMap[record.status]?.status" :text="statusMap[record.status]?.text" />
          </template>
          <template v-if="column.key === 'action'">
            <a-space>
              <a>配置</a>
              <a-divider type="vertical" />
              <a>订阅警报</a>
            </a-space>
          </template>
        </template>
      </a-table>

      <!-- 批量操作 -->
      <div v-if="selectedRowKeys.length > 0" class="footer-toolbar">
        <span style="margin-right: 16px">已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a> 项</span>
        <a-button type="primary" danger @click="handleBatchDelete">批量删除</a-button>
        <a-button style="margin-left: 8px">批量审批</a-button>
      </div>
    </a-card>

    <!-- 新建弹窗 -->
    <a-modal v-model:open="createVisible" title="新建规则" @ok="handleCreateOk">
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-form-item label="规则名称"><a-input v-model:value="createForm.name" placeholder="请输入" /></a-form-item>
        <a-form-item label="规则描述"><a-textarea v-model:value="createForm.desc" placeholder="请输入" :rows="4" /></a-form-item>
      </a-form>
    </a-modal>

    <!-- 详情抽屉 -->
    <a-drawer :open="detailVisible" :size="600" placement="right" :closable="true" @close="detailVisible = false">
      <template #title>规则详情</template>
      <template v-if="currentRow">
        <a-descriptions :column="2" bordered>
          <a-descriptions-item label="规则名称">{{ currentRow.name }}</a-descriptions-item>
          <a-descriptions-item label="描述">{{ currentRow.desc }}</a-descriptions-item>
          <a-descriptions-item label="服务调用次数">{{ currentRow.callNo }} 万</a-descriptions-item>
          <a-descriptions-item label="状态">
            <a-badge :status="statusMap[currentRow.status]?.status" :text="statusMap[currentRow.status]?.text" />
          </a-descriptions-item>
          <a-descriptions-item label="上次调度时间" :span="2">{{ currentRow.updatedAt }}</a-descriptions-item>
        </a-descriptions>
      </template>
    </a-drawer>
  </div>
</template>

<style scoped>
.footer-toolbar {
  position: fixed; bottom: 0; left: 0; right: 0; z-index: 99;
  padding: 0 24px; height: 56px; display: flex; align-items: center;
  background: var(--ant-color-bg-container, #fff);
  border-top: 1px solid rgba(5,5,5,0.06);
  box-shadow: 0 -6px 16px rgba(0,0,0,0.08);
}
</style>
