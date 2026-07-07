<script setup lang="ts">
const route = useRoute()
const email = computed(() => (route.query.email as string) || 'your@email.com')
</script>

<template>
  <div style="text-align: center; padding: 40px 0">
    <a-result
      status="success"
      :title="`你的账户：${email} 注册成功`"
      sub-title="激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。"
    >
      <template #extra>
        <a-button type="primary" @click="$router.push('/')">查看邮箱</a-button>
        <a-button @click="$router.push('/')">返回首页</a-button>
      </template>
    </a-result>
  </div>
</template>
