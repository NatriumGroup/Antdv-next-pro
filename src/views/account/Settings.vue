<script setup lang="ts">
import { App } from 'antdv-next'
import { UploadOutlined } from '@antdv-next/icons'

const { message } = App.useApp()

const menuKey = ref('base')
const menuItems = [
  { key: 'base', label: '基本设置' },
  { key: 'security', label: '安全设置' },
  { key: 'binding', label: '账号绑定' },
  { key: 'notification', label: '新消息通知' },
]

// Base form
const baseForm = reactive({
  email: 'antdesign@alipay.com',
  name: '吴彦祖',
  profile: '海纳百川，有容乃大',
  country: 'China',
  province: '浙江省',
  city: '杭州市',
  address: '西湖区工专路 77 号',
  phone: '0752-268888888',
})

function handleBaseSubmit() { message.success('更新基本信息成功') }

// Security
const securityItems = [
  { title: '账户密码', description: '当前密码强度：强', action: '修改' },
  { title: '密保手机', description: '已绑定手机：138****8293', action: '修改' },
  { title: '密保问题', description: '未设置密保问题，密保问题可有效保护账户安全', action: '设置' },
  { title: '备用邮箱', description: '已绑定邮箱：ant***sign@alipay.com', action: '修改' },
  { title: 'MFA 设备', description: '未绑定 MFA 设备，绑定后，可以进行二次确认', action: '绑定' },
]

// Binding
const bindingItems = [
  { title: '绑定淘宝', description: '当前未绑定淘宝账号', action: '绑定' },
  { title: '绑定支付宝', description: '当前未绑定支付宝账号', action: '绑定' },
  { title: '绑定钉钉', description: '当前未绑定钉钉账号', action: '绑定' },
]

// Notification
const notifications = reactive([
  { title: '账户密码', description: '其他用户的消息将以站内信的形式通知', checked: true },
  { title: '系统消息', description: '系统消息将以站内信的形式通知', checked: true },
  { title: '待办任务', description: '待办任务将以站内信的形式通知', checked: true },
])
</script>

<template>
  <a-card variant="borderless">
    <div style="display: flex; gap: 48px">
      <!-- 左：菜单 -->
      <div style="width: 220px; flex-shrink: 0; border-right: 1px solid rgba(5,5,5,0.06)">
        <a-menu v-model:selectedKeys="[menuKey]" mode="inline" style="border: none">
          <a-menu-item v-for="item in menuItems" :key="item.key" @click="menuKey = item.key">
            {{ item.label }}
          </a-menu-item>
        </a-menu>
      </div>

      <!-- 右：内容 -->
      <div style="flex: 1; min-width: 0; padding-top: 8px">
        <!-- 基本设置 -->
        <div v-if="menuKey === 'base'">
          <h3 style="margin: 0 0 24px; font-size: 20px; font-weight: 500">基本设置</h3>
          <div style="display: flex; gap: 48px">
            <a-form :model="baseForm" layout="vertical" style="max-width: 448px; flex: 1" @finish="handleBaseSubmit">
              <a-form-item label="邮箱"><a-input v-model:value="baseForm.email" /></a-form-item>
              <a-form-item label="昵称"><a-input v-model:value="baseForm.name" /></a-form-item>
              <a-form-item label="个人简介"><a-textarea v-model:value="baseForm.profile" :rows="4" /></a-form-item>
              <a-form-item label="国家/地区"><a-select v-model:value="baseForm.country"><a-select-option value="China">中国</a-select-option></a-select></a-form-item>
              <a-form-item label="所在省市">
                <a-space>
                  <a-select v-model:value="baseForm.province" style="width: 200px"><a-select-option value="浙江省">浙江省</a-select-option></a-select>
                  <a-select v-model:value="baseForm.city" style="width: 200px"><a-select-option value="杭州市">杭州市</a-select-option></a-select>
                </a-space>
              </a-form-item>
              <a-form-item label="街道地址"><a-input v-model:value="baseForm.address" /></a-form-item>
              <a-form-item label="联系电话"><a-input v-model:value="baseForm.phone" /></a-form-item>
              <a-form-item><a-button type="primary" html-type="submit">更新基本信息</a-button></a-form-item>
            </a-form>
            <div style="flex-shrink: 0; text-align: center">
              <div style="margin-bottom: 8px; color: rgba(0,0,0,0.45)">头像</div>
              <a-avatar :src="'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'" :size="144" />
              <div style="margin-top: 16px">
                <a-upload><a-button><template #icon><UploadOutlined /></template>更换头像</a-button></a-upload>
              </div>
            </div>
          </div>
        </div>

        <!-- 安全设置 -->
        <div v-if="menuKey === 'security'">
          <h3 style="margin: 0 0 24px; font-size: 20px; font-weight: 500">安全设置</h3>
          <a-list :data-source="securityItems" item-layout="horizontal">
            <template #renderItem="{ item }">
              <a-list-item>
                <template #actions><a>{{ item.action }}</a></template>
                <a-list-item-meta :title="item.title" :description="item.description" />
              </a-list-item>
            </template>
          </a-list>
        </div>

        <!-- 账号绑定 -->
        <div v-if="menuKey === 'binding'">
          <h3 style="margin: 0 0 24px; font-size: 20px; font-weight: 500">账号绑定</h3>
          <a-list :data-source="bindingItems" item-layout="horizontal">
            <template #renderItem="{ item }">
              <a-list-item>
                <template #actions><a>{{ item.action }}</a></template>
                <a-list-item-meta :title="item.title" :description="item.description" />
              </a-list-item>
            </template>
          </a-list>
        </div>

        <!-- 新消息通知 -->
        <div v-if="menuKey === 'notification'">
          <h3 style="margin: 0 0 24px; font-size: 20px; font-weight: 500">新消息通知</h3>
          <a-list :data-source="notifications" item-layout="horizontal">
            <template #renderItem="{ item }">
              <a-list-item>
                <template #actions><a-switch v-model:checked="item.checked" /></template>
                <a-list-item-meta :title="item.title" :description="item.description" />
              </a-list-item>
            </template>
          </a-list>
        </div>
      </div>
    </div>
  </a-card>
</template>
