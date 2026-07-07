<script setup lang="ts">
import { App } from 'antdv-next'

const { message } = App.useApp()
const current = ref(0)

const formState = reactive({
  payAccount: 'ant-design@alipay.com',
  receiverMode: 'alipay',
  receiverAccount: 'test@example.com',
  receiverName: 'Alex',
  amount: '500',
  password: '',
})

function handleNext() { current.value++ }
function handlePrev() { current.value-- }

function handleSubmit() {
  current.value = 2
  message.success('转账成功')
}

function handleAgain() {
  current.value = 0
  formState.password = ''
}
</script>

<template>
  <div>
    <div style="margin-bottom: 16px; color: rgba(0,0,0,0.45); font-size: 14px">
      将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。
    </div>
    <a-card variant="borderless">
      <div style="max-width: 740px; margin: 0 auto">
        <a-steps :current="current" style="margin-bottom: 40px">
          <a-step title="填写转账信息" />
          <a-step title="确认转账信息" />
          <a-step title="完成" />
        </a-steps>

        <!-- Step 1: 填写转账信息 -->
        <div v-show="current === 0">
          <a-form :model="formState" layout="horizontal" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-form-item label="付款账户" name="payAccount" :rules="[{ required: true, message: '请选择付款账户' }]">
              <a-select v-model:value="formState.payAccount" style="width: 328px">
                <a-select-option value="ant-design@alipay.com">ant-design@alipay.com</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="收款账户" required>
              <a-space>
                <a-select v-model:value="formState.receiverMode" style="width: 120px">
                  <a-select-option value="alipay">支付宝</a-select-option>
                  <a-select-option value="bank">银行账户</a-select-option>
                </a-select>
                <a-input v-model:value="formState.receiverAccount" placeholder="test@example.com" style="width: 200px" />
              </a-space>
            </a-form-item>
            <a-form-item label="收款人姓名" name="receiverName" :rules="[{ required: true, message: '请输入收款人姓名' }]">
              <a-input v-model:value="formState.receiverName" placeholder="请输入收款人姓名" style="width: 328px" />
            </a-form-item>
            <a-form-item label="转账金额" name="amount" :rules="[{ required: true, message: '请输入转账金额' }]">
              <a-input-number v-model:value="formState.amount" prefix="￥" placeholder="请输入金额" style="width: 328px" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 5 }">
              <a-button type="primary" @click="handleNext">下一步</a-button>
            </a-form-item>
          </a-form>
        </div>

        <!-- Step 2: 确认转账信息 -->
        <div v-show="current === 1" style="max-width: 500px; margin: 0 auto">
          <a-alert closable show-icon title="确认转账后，资金将直接打入对方账户，无法退回。" style="margin-bottom: 24px" />
          <a-descriptions :column="1" bordered>
            <a-descriptions-item label="付款账户">{{ formState.payAccount }}</a-descriptions-item>
            <a-descriptions-item label="收款账户">{{ formState.receiverAccount }}</a-descriptions-item>
            <a-descriptions-item label="收款人姓名">{{ formState.receiverName }}</a-descriptions-item>
            <a-descriptions-item label="转账金额">
              <a-statistic :value="formState.amount" :precision="2">
                <template #suffix><span style="font-size: 14px">元</span></template>
              </a-statistic>
            </a-descriptions-item>
          </a-descriptions>
          <a-divider style="margin: 24px 0" />
          <a-form :model="formState" layout="horizontal" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
            <a-form-item label="支付密码" name="password" :rules="[{ required: true, message: '需要支付密码才能进行支付' }]">
              <a-input-password v-model:value="formState.password" style="width: 328px" />
            </a-form-item>
            <a-form-item :wrapper-col="{ offset: 5 }">
              <a-space>
                <a-button type="primary" @click="handleSubmit">提交</a-button>
                <a-button @click="handlePrev">上一步</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>

        <!-- Step 3: 完成 -->
        <div v-show="current === 2">
          <a-result status="success" title="操作成功" sub-title="预计两小时内到账">
            <template #extra>
              <a-button type="primary" @click="handleAgain">再转一笔</a-button>
              <a-button>查看账单</a-button>
            </template>
            <a-descriptions :column="1">
              <a-descriptions-item label="付款账户">{{ formState.payAccount }}</a-descriptions-item>
              <a-descriptions-item label="收款账户">{{ formState.receiverAccount }}</a-descriptions-item>
              <a-descriptions-item label="收款人姓名">{{ formState.receiverName }}</a-descriptions-item>
              <a-descriptions-item label="转账金额">{{ formState.amount }} 元</a-descriptions-item>
            </a-descriptions>
          </a-result>
        </div>
      </div>

      <a-divider style="margin: 40px 0 24px" />
      <div style="max-width: 740px; margin: 0 auto">
        <h3>说明</h3>
        <h4>转账到支付宝账户</h4>
        <p style="color: rgba(0,0,0,0.45)">如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
        <h4>转账到银行卡</h4>
        <p style="color: rgba(0,0,0,0.45)">如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
      </div>
    </a-card>
  </div>
</template>
