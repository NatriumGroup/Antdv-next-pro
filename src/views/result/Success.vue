<script setup lang="ts">
import { DingdingOutlined } from '@antdv-next/icons'
</script>

<template>
  <a-card variant="borderless">
    <a-result
      status="success"
      title="提交成功"
      sub-title="提交结果页用于反馈一系列操作任务的处理结果，如果仅是简单操作，使用 Message 全局提示反馈即可。本文字区域可以展示简单的补充说明，如果有类似展示"单据"的需求，下面这个灰色区域可以呈现比较复杂的内容。"
      style="margin-bottom: 16px"
    >
      <template #extra>
        <a-button type="primary" @click="$router.push('/')">返回列表</a-button>
        <a-button>查看项目</a-button>
        <a-button>打印</a-button>
      </template>

      <a-descriptions title="项目名称" :column="1">
        <a-descriptions-item label="项目 ID">23421</a-descriptions-item>
        <a-descriptions-item label="负责人">曲丽丽</a-descriptions-item>
        <a-descriptions-item label="生效时间">2016-12-12 ~ 2017-12-12</a-descriptions-item>
      </a-descriptions>
      <br />
      <a-steps :current="1" type="dot" :items="[
        { title: '创建项目' },
        { title: '部门初审' },
        { title: '财务复核' },
        { title: '完成' },
      ]">
        <template #description="{ current: stepIndex }">
          <div v-if="stepIndex === 0" style="font-size: 12px; margin: 8px 0 4px">
            <div>曲丽丽 <DingdingOutlined style="margin-left: 8px; color: #00A0E9" /></div>
            <div>2016-12-12 12:32</div>
          </div>
          <div v-if="stepIndex === 1" style="font-size: 12px; margin: 8px 0 4px">
            <div>
              周毛毛
              <a-button type="link" style="padding: 0">
                <DingdingOutlined style="color: #00A0E9; margin-left: 8px" />
                催一下
              </a-button>
            </div>
          </div>
        </template>
      </a-steps>
    </a-result>
  </a-card>
</template>
