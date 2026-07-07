<template>
  <a-result status="403" title="403" sub-title="抱歉，你无权访问该页面。">
    <template #extra>
      <a-button type="primary" @click="$router.push('/')">返回首页</a-button>
    </template>
  </a-result>
</template>
