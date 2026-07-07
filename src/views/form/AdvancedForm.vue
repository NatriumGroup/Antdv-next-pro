<script setup lang="ts">
import { CloseCircleOutlined } from '@antdv-next/icons'
import { App } from 'antdv-next'

const { message } = App.useApp()

const formState = reactive({
  name: '', url: '', owner: undefined as string | undefined,
  approver: undefined as string | undefined, dateRange: null as any, type: undefined as string | undefined,
  name2: '', url2: '', owner2: undefined as string | undefined,
  approver2: undefined as string | undefined, dateRange2: null as any, type2: undefined as string | undefined,
})

const memberColumns = [
  { title: '成员姓名', dataIndex: 'name', key: 'name', width: '20%' },
  { title: '工号', dataIndex: 'workId', key: 'workId', width: '20%' },
  { title: '所属部门', dataIndex: 'department', key: 'department', width: '40%' },
  { title: '操作', key: 'action', width: '20%' },
]

const members = ref([
  { key: '1', workId: '00001', name: 'John Brown', department: 'New York No. 1 Lake Park' },
  { key: '2', workId: '00002', name: 'Jim Green', department: 'London No. 1 Lake Park' },
  { key: '3', workId: '00003', name: 'Joe Black', department: 'Sidney No. 1 Lake Park' },
])

const editingKey = ref('')
const editForm = reactive({ name: '', workId: '', department: '' })

function startEdit(record: any) {
  editingKey.value = record.key
  editForm.name = record.name
  editForm.workId = record.workId
  editForm.department = record.department
}

function saveEdit(key: string) {
  const row = members.value.find(m => m.key === key)
  if (row) { Object.assign(row, { ...editForm }) }
  editingKey.value = ''
}

function cancelEdit() { editingKey.value = '' }

let keyCounter = 0
function addMember() {
  keyCounter++
  members.value.push({ key: `new-${keyCounter}`, workId: '', name: '', department: '' })
  startEdit(members.value[members.value.length - 1])
}

function deleteMember(key: string) {
  members.value = members.value.filter(m => m.key !== key)
}

const ownerOptions = [
  { label: '付晓晓', value: 'xiao' },
  { label: '周毛毛', value: 'mao' },
]
const typeOptions = [
  { label: '私密', value: 'private' },
  { label: '公开', value: 'public' },
]

function handleSubmit() { message.success('提交成功') }
</script>

<template>
  <div>
    <div style="margin-bottom: 16px; color: rgba(0,0,0,0.45); font-size: 14px">
      高级表单常见于一次性输入和提交大批量数据的场景。
    </div>

    <a-form :model="formState" layout="vertical">
      <!-- 仓库管理 -->
      <a-card title="仓库管理" variant="borderless" style="margin-bottom: 24px">
        <a-row :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item label="仓库名" name="name" :rules="[{ required: true, message: '请输入仓库名称' }]">
              <a-input v-model:value="formState.name" placeholder="请输入仓库名称" />
            </a-form-item>
          </a-col>
          <a-col :xl="{ span: 6, offset: 2 }" :lg="8" :md="12" :sm="24">
            <a-form-item label="仓库域名" name="url" :rules="[{ required: true, message: '请输入' }]">
              <a-input v-model:value="formState.url" addon-before="http://" addon-after=".com" placeholder="请输入" />
            </a-form-item>
          </a-col>
          <a-col :xl="{ span: 8, offset: 2 }" :lg="10" :md="24" :sm="24">
            <a-form-item label="仓库管理员" name="owner" :rules="[{ required: true, message: '请选择管理员' }]">
              <a-select v-model:value="formState.owner" :options="ownerOptions" placeholder="请选择管理员" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item label="审批人" name="approver" :rules="[{ required: true, message: '请选择审批员' }]">
              <a-select v-model:value="formState.approver" :options="ownerOptions" placeholder="请选择审批员" />
            </a-form-item>
          </a-col>
          <a-col :xl="{ span: 6, offset: 2 }" :lg="8" :md="12" :sm="24">
            <a-form-item label="生效日期" name="dateRange" :rules="[{ required: true, message: '请选择生效日期' }]">
              <a-range-picker v-model:value="formState.dateRange" style="width: 100%" />
            </a-form-item>
          </a-col>
          <a-col :xl="{ span: 8, offset: 2 }" :lg="10" :md="24" :sm="24">
            <a-form-item label="仓库类型" name="type" :rules="[{ required: true, message: '请选择仓库类型' }]">
              <a-select v-model:value="formState.type" :options="typeOptions" placeholder="请选择仓库类型" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <!-- 任务管理 -->
      <a-card title="任务管理" variant="borderless" style="margin-bottom: 24px">
        <a-row :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item label="任务名" name="name2" :rules="[{ required: true, message: '请输入' }]">
              <a-input v-model:value="formState.name2" />
            </a-form-item>
          </a-col>
          <a-col :xl="{ span: 6, offset: 2 }" :lg="8" :md="12" :sm="24">
            <a-form-item label="任务描述" name="url2" :rules="[{ required: true, message: '请输入' }]">
              <a-input v-model:value="formState.url2" />
            </a-form-item>
          </a-col>
          <a-col :xl="{ span: 8, offset: 2 }" :lg="10" :md="24" :sm="24">
            <a-form-item label="执行人" name="owner2" :rules="[{ required: true, message: '请选择' }]">
              <a-select v-model:value="formState.owner2" :options="ownerOptions" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :lg="6" :md="12" :sm="24">
            <a-form-item label="责任人" name="approver2" :rules="[{ required: true, message: '请选择' }]">
              <a-select v-model:value="formState.approver2" :options="ownerOptions" placeholder="请选择审批员" />
            </a-form-item>
          </a-col>
          <a-col :xl="{ span: 6, offset: 2 }" :lg="8" :md="12" :sm="24">
            <a-form-item label="生效日期" name="dateRange2" :rules="[{ required: true, message: '请输入' }]">
              <a-time-picker v-model:value="formState.dateRange2" style="width: 100%" placeholder="提醒时间" />
            </a-form-item>
          </a-col>
          <a-col :xl="{ span: 8, offset: 2 }" :lg="10" :md="24" :sm="24">
            <a-form-item label="任务类型" name="type2" :rules="[{ required: true, message: '请选择' }]">
              <a-select v-model:value="formState.type2" :options="typeOptions" placeholder="请选择仓库类型" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-card>

      <!-- 成员管理 -->
      <a-card title="成员管理" variant="borderless">
        <a-table :columns="memberColumns" :data-source="members" :pagination="false" row-key="key">
          <template #bodyCell="{ column, record, text }">
            <template v-if="editingKey === record.key && column.key !== 'action'">
              <a-input v-if="column.key === 'name'" v-model:value="editForm.name" />
              <a-input v-else-if="column.key === 'workId'" v-model:value="editForm.workId" />
              <a-input v-else-if="column.key === 'department'" v-model:value="editForm.department" />
            </template>
            <template v-else-if="column.key === 'action'">
              <template v-if="editingKey === record.key">
                <a @click="saveEdit(record.key)" style="margin-right: 8px">保存</a>
                <a @click="cancelEdit">取消</a>
              </template>
              <template v-else>
                <a @click="startEdit(record)" style="margin-right: 8px">编辑</a>
                <a-popconfirm title="确定删除？" @confirm="deleteMember(record.key)">
                  <a style="color: #ff4d4f">删除</a>
                </a-popconfirm>
              </template>
            </template>
            <template v-else>{{ text }}</template>
          </template>
        </a-table>
        <a-button type="dashed" block style="margin-top: 16px" @click="addMember">+ 新增成员</a-button>
      </a-card>
    </a-form>

    <!-- Footer Toolbar -->
    <div class="footer-toolbar">
      <a-space>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
      </a-space>
    </div>
  </div>
</template>

<style scoped>
.footer-toolbar {
  position: fixed; bottom: 0; right: 0; left: 0;
  z-index: 99; padding: 0 24px;
  height: 56px; display: flex; align-items: center; justify-content: flex-end;
  background: var(--ant-color-bg-container, #fff);
  border-top: 1px solid rgba(5,5,5,0.06);
  box-shadow: 0 -6px 16px rgba(0,0,0,0.08);
}
</style>
