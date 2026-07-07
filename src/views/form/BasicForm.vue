<script setup lang="ts">
import { App } from 'antdv-next'

const { message } = App.useApp()

const formState = reactive({
  title: '',
  date: null as any,
  goal: '',
  standard: '',
  client: '',
  invites: '',
  weight: undefined as number | undefined,
  publicType: '1',
  publicUsers: undefined as string | undefined,
})

function handleSubmit() {
  message.success('提交成功')
}
</script>

<template>
  <PageContainer content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
    <a-card variant="borderless">
      <a-form
        :model="formState"
        layout="vertical"
        :style="{ margin: 'auto', marginTop: '8px', maxWidth: '600px' }"
        :require-mark="false"
        @finish="handleSubmit"
      >
        <a-form-item label="标题" name="title" :rules="[{ required: true, message: '请输入标题' }]">
          <a-input v-model:value="formState.title" placeholder="给目标起个名字" style="width: 328px" />
        </a-form-item>

        <a-form-item label="起止日期" name="date" :rules="[{ required: true, message: '请选择起止日期' }]">
          <a-range-picker v-model:value="formState.date" style="width: 328px" :placeholder="['开始日期', '结束日期']" />
        </a-form-item>

        <a-form-item label="目标描述" name="goal" :rules="[{ required: true, message: '请输入目标描述' }]">
          <a-textarea v-model:value="formState.goal" placeholder="请输入你的阶段性工作目标" :rows="4" style="width: 480px" />
        </a-form-item>

        <a-form-item label="衡量标准" name="standard" :rules="[{ required: true, message: '请输入衡量标准' }]">
          <a-textarea v-model:value="formState.standard" placeholder="请输入衡量标准" :rows="4" style="width: 480px" />
        </a-form-item>

        <a-form-item name="client">
          <template #label>
            <span>客户 <em style="color: rgba(0,0,0,0.45); font-style: normal">（选填）</em></span>
          </template>
          <a-input v-model:value="formState.client" placeholder="请描述你服务的客户，内部客户直接 @姓名／工号" style="width: 328px" />
        </a-form-item>

        <a-form-item name="invites">
          <template #label>
            <span>邀评人 <em style="color: rgba(0,0,0,0.45); font-style: normal">（选填）</em></span>
          </template>
          <a-input v-model:value="formState.invites" placeholder="请直接 @姓名／工号，最多可邀请 5 人" style="width: 328px" />
        </a-form-item>

        <a-form-item name="weight">
          <template #label>
            <span>权重 <em style="color: rgba(0,0,0,0.45); font-style: normal">（选填）</em></span>
          </template>
          <a-input-number
            v-model:value="formState.weight"
            :min="0" :max="100"
            placeholder="请输入"
            style="width: 104px"
            :formatter="(v: any) => `${v || 0}%`"
            :parser="(v: any) => Number(String(v).replace('%', '') || 0)"
          />
        </a-form-item>

        <a-form-item label="目标公开" name="publicType" help="客户、邀评人默认被分享">
          <a-radio-group v-model:value="formState.publicType">
            <a-radio value="1">公开</a-radio>
            <a-radio value="2">部分公开</a-radio>
            <a-radio value="3">不公开</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item v-if="formState.publicType === '2'" name="publicUsers">
          <a-select v-model:value="formState.publicUsers" placeholder="请选择" style="width: 328px">
            <a-select-option value="1">同事甲</a-select-option>
            <a-select-option value="2">同事乙</a-select-option>
            <a-select-option value="3">同事丙</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item style="margin-top: 32px">
          <a-space>
            <a-button type="primary" html-type="submit">提交</a-button>
            <a-button>保存</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
  </PageContainer>
</template>
