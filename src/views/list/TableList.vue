<script setup lang="ts">
import { PlusOutlined, ReloadOutlined, SearchOutlined, DownOutlined, UpOutlined } from '@antdv-next/icons'
import { App } from 'antdv-next'

const { message, modal } = App.useApp()

// ── 搜索表单 ──
const searchForm = reactive({
  name: '',
  desc: '',
  status: undefined as string | undefined,
  updatedAt: null as any,
})
const searchExpand = ref(false)
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

// ── 行选择 ──
const selectedRowKeys = ref<string[]>([])
const rowSelection = computed(() => ({
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: string[]) => { selectedRowKeys.value = keys },
}))

// ── 新建弹窗 ──
const createVisible = ref(false)
const createForm = reactive({ name: '', desc: '' })
function handleCreate() { createForm.name = ''; createForm.desc = ''; createVisible.value = true }
function handleCreateOk() { message.success('添加成功'); createVisible.value = false }

// ── 配置弹窗（分步表单） ──
const configVisible = ref(false)
const configStep = ref(0)
const configForm = reactive({
  name: '', desc: '',
  target: '0', template: '0', type: '0',
  time: null as any, frequency: 'month',
})

function showConfig(record: any) {
  configForm.name = record.name
  configForm.desc = record.desc
  configForm.target = '0'
  configForm.template = '0'
  configForm.type = '0'
  configForm.time = null
  configForm.frequency = 'month'
  configStep.value = 0
  configVisible.value = true
}

function configNext() { configStep.value++ }
function configPrev() { configStep.value-- }
function configSubmit() {
  message.success('配置成功')
  configVisible.value = false
}

// ── 详情抽屉 ──
const detailVisible = ref(false)
const currentRow = ref<any>(null)
function showDetail(record: any) { currentRow.value = record; detailVisible.value = true }

// ── 批量操作 ──
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
function handleReset() {
  searchForm.name = ''; searchForm.desc = ''
  searchForm.status = undefined; searchForm.updatedAt = null
}
</script>

<template>
  <PageContainer>
    <!-- 搜索栏 -->
    <a-card variant="borderless" style="margin-bottom: 24px">
      <a-form layout="inline" :model="searchForm">
        <a-row :gutter="16" style="width: 100%">
          <a-col :span="8">
            <a-form-item label="规则名称" style="width: 100%">
              <a-input v-model:value="searchForm.name" placeholder="请输入" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="描述" style="width: 100%">
              <a-input v-model:value="searchForm.desc" placeholder="请输入" allow-clear />
            </a-form-item>
          </a-col>
          <a-col :span="8" style="text-align: right" v-if="!searchExpand">
            <a-form-item>
              <a-space>
                <a-button type="primary" @click="handleSearch"><template #icon><SearchOutlined /></template>查询</a-button>
                <a-button @click="handleReset"><template #icon><ReloadOutlined /></template>重置</a-button>
                <a style="font-size: 12px" @click="searchExpand = !searchExpand">
                  展开
                  <DownOutlined />
                </a>
              </a-space>
            </a-form-item>
          </a-col>
          <template v-if="searchExpand">
            <a-col :span="8">
              <a-form-item label="上次调度时间" style="width: 100%">
                <a-date-picker v-model:value="searchForm.updatedAt" show-time style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="状态" style="width: 100%">
                <a-select v-model:value="searchForm.status" placeholder="请选择" allow-clear>
                  <a-select-option value="0">关闭</a-select-option>
                  <a-select-option value="1">运行中</a-select-option>
                  <a-select-option value="2">已上线</a-select-option>
                  <a-select-option value="3">异常</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8" style="text-align: right">
              <a-form-item>
                <a-space>
                  <a-button type="primary" @click="handleSearch"><template #icon><SearchOutlined /></template>查询</a-button>
                  <a-button @click="handleReset"><template #icon><ReloadOutlined /></template>重置</a-button>
                  <a style="font-size: 12px" @click="searchExpand = false">
                    收起
                    <UpOutlined />
                  </a>
                </a-space>
              </a-form-item>
            </a-col>
          </template>
        </a-row>
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
              <a @click="showConfig(record)">配置</a>
              <a-divider type="vertical" />
              <a>订阅警报</a>
            </a-space>
          </template>
        </template>
      </a-table>

      <!-- 批量操作 -->
      <div v-if="selectedRowKeys.length > 0" class="footer-toolbar">
        <div style="flex: 1">
          已选择 <a style="font-weight: 600">{{ selectedRowKeys.length }}</a> 项&nbsp;&nbsp;
          <span>服务调用次数总计 {{ dataSource.filter(d => selectedRowKeys.includes(d.key)).reduce((sum, d) => sum + d.callNo, 0) }} 万</span>
        </div>
        <a-space>
          <a-button @click="handleBatchDelete">批量删除</a-button>
          <a-button type="primary">批量审批</a-button>
        </a-space>
      </div>
    </a-card>

    <!-- 新建弹窗 -->
    <a-modal v-model:open="createVisible" title="新建规则" @ok="handleCreateOk">
      <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-form-item label="规则名称"><a-input v-model:value="createForm.name" placeholder="请输入" /></a-form-item>
        <a-form-item label="规则描述"><a-textarea v-model:value="createForm.desc" placeholder="请输入" :rows="4" /></a-form-item>
      </a-form>
    </a-modal>

    <!-- 配置弹窗（分步表单） -->
    <a-modal v-model:open="configVisible" title="规则配置" :width="640" :footer="null">
      <div style="padding: 16px 0">
        <a-steps
          :current="configStep"
          size="small"
          :items="[{ title: '基本信息' }, { title: '配置规则属性' }, { title: '设定调度周期' }]"
          style="margin-bottom: 32px"
        />

        <!-- Step 1: 基本信息 -->
        <div v-show="configStep === 0">
          <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-form-item label="规则名称" :rules="[{ required: true }]">
              <a-input v-model:value="configForm.name" placeholder="请输入规则名称" style="width: 328px" />
            </a-form-item>
            <a-form-item label="规则描述" :rules="[{ required: true, min: 5 }]">
              <a-textarea v-model:value="configForm.desc" placeholder="请输入至少五个字符" :rows="4" style="width: 328px" />
            </a-form-item>
          </a-form>
          <div style="text-align: right; padding-top: 16px">
            <a-button type="primary" @click="configNext">下一步</a-button>
          </div>
        </div>

        <!-- Step 2: 配置规则属性 -->
        <div v-show="configStep === 1">
          <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-form-item label="监控对象">
              <a-select v-model:value="configForm.target" style="width: 328px">
                <a-select-option value="0">表一</a-select-option>
                <a-select-option value="1">表二</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="规则模板">
              <a-select v-model:value="configForm.template" style="width: 328px">
                <a-select-option value="0">规则模板一</a-select-option>
                <a-select-option value="1">规则模板二</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="规则类型">
              <a-radio-group v-model:value="configForm.type">
                <a-radio value="0">强</a-radio>
                <a-radio value="1">弱</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-form>
          <div style="display: flex; justify-content: space-between; padding-top: 16px">
            <a-button @click="configPrev">上一步</a-button>
            <a-button type="primary" @click="configNext">下一步</a-button>
          </div>
        </div>

        <!-- Step 3: 设定调度周期 -->
        <div v-show="configStep === 2">
          <a-form :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-form-item label="开始时间" :rules="[{ required: true }]">
              <a-date-picker v-model:value="configForm.time" show-time style="width: 328px" />
            </a-form-item>
            <a-form-item label="调度周期">
              <a-select v-model:value="configForm.frequency" style="width: 328px">
                <a-select-option value="month">月</a-select-option>
                <a-select-option value="week">周</a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
          <div style="display: flex; justify-content: space-between; padding-top: 16px">
            <a-button @click="configPrev">上一步</a-button>
            <a-button type="primary" @click="configSubmit">完成</a-button>
          </div>
        </div>
      </div>
    </a-modal>

    <!-- 详情抽屉 -->
    <a-drawer :open="detailVisible" :size="600" placement="right" :closable="false" @close="detailVisible = false">
      <template v-if="currentRow">
        <a-descriptions :column="2" :title="currentRow.name">
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
  </PageContainer>
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
