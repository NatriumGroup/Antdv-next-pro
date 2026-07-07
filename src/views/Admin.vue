<script setup lang="ts">
import { SmileTwoTone, HeartTwoTone } from '@antdv-next/icons'
</script>

<template>
  <div>
    <div style="margin-bottom: 16px; color: rgba(0,0,0,0.45); font-size: 14px">
      这个页面只有 admin 权限才能查看
    </div>
    <a-card>
      <a-alert
        title="更快更强的重量级组件，已经发布。"
        type="success"
        show-icon
        banner
        :style="{ margin: '-12px -12px 48px' }"
      />
      <a-typography-title :level="2" style="text-align: center">
        <SmileTwoTone /> Antdv Next Pro
        <HeartTwoTone two-tone-color="#eb2f96" /> You
      </a-typography-title>
    </a-card>
    <p style="text-align: center; margin-top: 24px">
      想要添加更多页面？请参考
      <a href="https://www.antdv-next.com/docs/vue/getting-started" target="_blank" rel="noopener noreferrer">Antdv Next 文档</a>。
    </p>
  </div>
</template>
