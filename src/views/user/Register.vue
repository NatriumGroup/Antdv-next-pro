<script setup lang="ts">
import { LockOutlined, MailOutlined, MobileOutlined } from '@antdv-next/icons'
import { App } from 'antdv-next'

const router = useRouter()
const { message } = App.useApp()

const formState = reactive({
  email: '',
  password: '',
  confirm: '',
  phone: '',
  captcha: '',
  prefix: '86',
})

// 密码强度
const passwordStrength = computed(() => {
  const pwd = formState.password
  if (!pwd) return { percent: 0, status: 'exception' as const, text: '' }
  if (pwd.length < 6) return { percent: 30, status: 'exception' as const, text: '强度：太短' }
  const hasLetter = /[a-zA-Z]/.test(pwd)
  const hasNumber = /\d/.test(pwd)
  const hasSpecial = /[^a-zA-Z0-9]/.test(pwd)
  const score = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length
  if (score <= 1) return { percent: 33, status: 'exception' as const, text: '强度：弱' }
  if (score === 2) return { percent: 66, status: 'normal' as const, text: '强度：中' }
  return { percent: 100, status: 'success' as const, text: '强度：强' }
})

const passwordPopoverVisible = ref(false)
const counting = ref(false)
const countdownSec = ref(0)
let countTimer: ReturnType<typeof setInterval> | null = null

function getCaptcha() {
  if (!formState.phone) { message.error('请输入手机号'); return }
  counting.value = true
  countdownSec.value = 60
  countTimer = setInterval(() => {
    countdownSec.value--
    if (countdownSec.value <= 0) {
      counting.value = false
      if (countTimer) clearInterval(countTimer)
    }
  }, 1000)
}

function handleSubmit() {
  if (formState.password !== formState.confirm) {
    message.error('两次输入的密码不一致')
    return
  }
  message.success('注册成功')
  router.push({ path: '/user/register-result', query: { email: formState.email } })
}
</script>

<template>
  <div>
    <h3 style="font-size: 16px; margin: 0 0 20px; text-align: center">注册</h3>
    <a-form :model="formState" @finish="handleSubmit">
      <a-form-item name="email" :rules="[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '邮箱格式不正确' }]">
        <a-input v-model:value="formState.email" size="large" placeholder="邮箱">
          <template #prefix><MailOutlined style="color: rgba(0,0,0,0.25)" /></template>
        </a-input>
      </a-form-item>

      <a-popover :open="passwordPopoverVisible && !!formState.password" placement="right" trigger="focus">
        <template #content>
          <div style="width: 240px; padding: 4px 0">
            <div style="margin-bottom: 8px">{{ passwordStrength.text }}</div>
            <a-progress :percent="passwordStrength.percent" :status="passwordStrength.status" :show-info="false" :stroke-width="6" />
            <div style="margin-top: 8px; color: rgba(0,0,0,0.45); font-size: 12px">请至少输入 6 个字符。请不要使用容易被猜到的密码。</div>
          </div>
        </template>
        <a-form-item name="password" :rules="[{ required: true, message: '请输入密码' }, { min: 6, message: '密码至少 6 位' }]">
          <a-input-password
            v-model:value="formState.password"
            size="large"
            placeholder="至少6位密码，区分大小写"
            @focus="passwordPopoverVisible = true"
            @blur="passwordPopoverVisible = false"
          >
            <template #prefix><LockOutlined style="color: rgba(0,0,0,0.25)" /></template>
          </a-input-password>
        </a-form-item>
      </a-popover>

      <a-form-item name="confirm" :rules="[{ required: true, message: '请确认密码' }]">
        <a-input-password v-model:value="formState.confirm" size="large" placeholder="确认密码">
          <template #prefix><LockOutlined style="color: rgba(0,0,0,0.25)" /></template>
        </a-input-password>
      </a-form-item>

      <a-form-item name="phone" :rules="[{ required: true, message: '请输入手机号' }]">
        <a-input v-model:value="formState.phone" size="large" placeholder="手机号">
          <template #prefix><MobileOutlined style="color: rgba(0,0,0,0.25)" /></template>
          <template #addonBefore>
            <a-select v-model:value="formState.prefix" style="width: 70px">
              <a-select-option value="86">+86</a-select-option>
              <a-select-option value="87">+87</a-select-option>
            </a-select>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="captcha">
        <a-row :gutter="8">
          <a-col :span="16">
            <a-input v-model:value="formState.captcha" size="large" placeholder="验证码" />
          </a-col>
          <a-col :span="8">
            <a-button size="large" block :disabled="counting" @click="getCaptcha">
              {{ counting ? `${countdownSec} 秒` : '获取验证码' }}
            </a-button>
          </a-col>
        </a-row>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" size="large" block>注册</a-button>
      </a-form-item>

      <div style="text-align: center">
        <router-link to="/user/login">使用已有账户登录</router-link>
      </div>
    </a-form>
  </div>
</template>
