<script setup lang="ts">
import { CloseCircleOutlined, RightOutlined } from '@antdv-next/icons'
</script>

<template>
  <a-card variant="borderless">
    <a-result
      status="error"
      title="提交失败"
      sub-title="请核对并修改以下信息后，再重新提交。"
      :style="{ marginTop: '48px', marginBottom: '16px' }"
    >
      <template #extra>
        <a-button type="primary" @click="$router.push('/')">返回修改</a-button>
      </template>

      <div style="font-size: 16px; font-weight: 500; margin-bottom: 16px">您提交的内容有如下错误：</div>
      <div style="margin-bottom: 16px">
        <CloseCircleOutlined style="margin-right: 8px; color: #ff4d4f" />
        <span>您的账户已被冻结</span>
        <a-button type="link" style="margin-left: 16px; padding: 0">
          立即解冻 <RightOutlined />
        </a-button>
      </div>
      <div>
        <CloseCircleOutlined style="margin-right: 8px; color: #ff4d4f" />
        <span>您的账户还不具备申请资格</span>
        <a-button type="link" style="margin-left: 16px; padding: 0">
          立即升级 <RightOutlined />
        </a-button>
      </div>
    </a-result>
  </a-card>
</template>
