<script setup lang="ts">
import {
  LockOutlined,
  UserOutlined,
  MobileOutlined,
  MailOutlined,
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
} from '@antdv-next/icons'
import { App } from 'antdv-next'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const { message } = App.useApp()

const activeTab = ref<'account' | 'phone'>('account')
const loading = ref(false)
const autoLogin = ref(true)

const formState = reactive({
  username: 'admin',
  password: 'admin123',
  phone: '',
  captcha: '',
})

async function handleSubmit() {
  loading.value = true
  try {
    if (activeTab.value === 'account') {
      if (formState.username === 'admin' && formState.password === 'admin123') {
        userStore.setToken('mock-token-admin')
        userStore.setUserInfo({
          id: '1',
          username: 'admin',
          realName: 'Admin',
          avatar: '',
          roles: ['admin'],
          permissions: ['*'],
        })
      } else if (formState.username === 'user' && formState.password === 'user123') {
        userStore.setToken('mock-token-user')
        userStore.setUserInfo({
          id: '2',
          username: 'user',
          realName: 'User',
          avatar: '',
          roles: ['user'],
          permissions: ['dashboard:view'],
        })
      } else {
        message.error('用户名或密码错误（admin/admin123）')
        loading.value = false
        return
      }
    }

    message.success('登录成功')
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <a-tabs v-model:activeKey="activeTab" centered :style="{ marginBottom: 0 }">
      <a-tab-pane key="account" tab="账户密码登录">
        <a-form :model="formState" @finish="handleSubmit">
          <a-form-item
            name="username"
            :rules="[{ required: true, message: '请输入用户名!' }]"
          >
            <a-input
              v-model:value="formState.username"
              size="large"
              placeholder="用户名: admin 或 user"
            >
              <template #prefix>
                <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            name="password"
            :rules="[{ required: true, message: '请输入密码!' }]"
          >
            <a-input-password
              v-model:value="formState.password"
              size="large"
              placeholder="密码: admin123 或 user123"
            >
              <template #prefix>
                <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-form-item>
            <div style="display: flex; justify-content: space-between; align-items: center">
              <a-checkbox v-model:checked="autoLogin">自动登录</a-checkbox>
              <a style="float: right">忘记密码</a>
            </div>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              :loading="loading"
              size="large"
              block
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>

      <a-tab-pane key="phone" tab="手机号登录">
        <a-form :model="formState" @finish="handleSubmit">
          <a-form-item
            name="phone"
            :rules="[{ required: true, message: '请输入手机号!' }]"
          >
            <a-input
              v-model:value="formState.phone"
              size="large"
              placeholder="手机号"
            >
              <template #prefix>
                <MobileOutlined style="color: rgba(0, 0, 0, 0.25)" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item name="captcha">
            <a-row :gutter="8">
              <a-col :span="16">
                <a-input
                  v-model:value="formState.captcha"
                  size="large"
                  placeholder="验证码"
                >
                  <template #prefix>
                    <MailOutlined style="color: rgba(0, 0, 0, 0.25)" />
                  </template>
                </a-input>
              </a-col>
              <a-col :span="8">
                <a-button size="large" block>获取验证码</a-button>
              </a-col>
            </a-row>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              :loading="loading"
              size="large"
              block
            >
              登录
            </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>

    <!-- 其他登录方式 -->
    <div class="other-login">
      <span>其他登录方式</span>
      <AlipayCircleOutlined class="other-login-icon" style="color: #1677ff" />
      <TaobaoCircleOutlined class="other-login-icon" style="color: #ff6a00" />
      <WeiboCircleOutlined class="other-login-icon" style="color: #e6162d" />
      <a style="float: right">注册账户</a>
    </div>
  </div>
</template>

<style scoped>
.other-login {
  margin-top: 24px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
}

.other-login-icon {
  margin-left: 16px;
  font-size: 24px;
  cursor: pointer;
  vertical-align: middle;
  transition: color 0.2s;
}

.other-login-icon:hover {
  opacity: 0.75;
}
</style>
