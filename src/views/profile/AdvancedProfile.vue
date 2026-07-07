<script setup lang="ts">
// Profile Advanced - 精确对标 Pro 原版
import { EllipsisOutlined } from '@antdv-next/icons'

const activeTab = ref('detail')

const operationColumns1 = [
  { title: '操作类型', dataIndex: 'type', key: 'type' },
  { title: '操作人', dataIndex: 'name', key: 'name' },
  { title: '执行结果', dataIndex: 'status', key: 'status' },
  { title: '操作时间', dataIndex: 'time', key: 'time' },
  { title: '备注', dataIndex: 'memo', key: 'memo' },
]
const operationData1 = [
  { key: '1', type: '创建实验', name: '曲丽丽', status: 'success', time: '2026-07-01 08:00', memo: '-' },
  { key: '2', type: '关联规则', name: '曲丽丽', status: 'success', time: '2026-07-01 08:00', memo: '-' },
  { key: '3', type: '创建实验', name: '曲丽丽', status: 'success', time: '2026-07-01 08:00', memo: '-' },
]
const operationColumns2 = [
  { title: '操作类型', dataIndex: 'type', key: 'type' },
  { title: '操作人', dataIndex: 'name', key: 'name' },
  { title: '执行结果', dataIndex: 'status', key: 'status' },
  { title: '操作时间', dataIndex: 'time', key: 'time' },
  { title: '备注', dataIndex: 'memo', key: 'memo' },
]
const operationData2 = [
  { key: '1', type: '创建实验', name: '曲丽丽', status: 'success', time: '2026-07-02 09:00', memo: '-' },
  { key: '2', type: '关联规则', name: '付小小', status: 'success', time: '2026-07-02 10:00', memo: '-' },
]
const operationData3 = [
  { key: '1', type: '创建实验', name: '林东东', status: 'success', time: '2026-07-03 11:00', memo: '-' },
]
const tabOperationData: Record<string, any[]> = {
  op1: operationData1, op2: operationData2, op3: operationData3,
}
const opTabKey = ref('op1')
</script>

<template>
  <div>
    <!-- 头部信息 + 操作按钮 -->
    <a-card variant="borderless">
      <div style="display: flex; justify-content: space-between; align-items: flex-start">
        <a-descriptions title="单号：234231029431" :column="3">
          <a-descriptions-item label="创建人">曲丽丽</a-descriptions-item>
          <a-descriptions-item label="订购产品">XX 服务</a-descriptions-item>
          <a-descriptions-item label="创建时间">2026-07-01</a-descriptions-item>
          <a-descriptions-item label="关联单据"><a>12421</a></a-descriptions-item>
          <a-descriptions-item label="生效日期">2026-07-01 ~ 2026-12-31</a-descriptions-item>
          <a-descriptions-item label="备注">请于两个工作日内确认</a-descriptions-item>
        </a-descriptions>
        <a-space>
          <a-button type="primary">主操作</a-button>
          <a-button>其他操作</a-button>
          <a-dropdown>
            <a-button><EllipsisOutlined /></a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">操作一</a-menu-item>
                <a-menu-item key="2">操作二</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </a-space>
      </div>

      <a-divider style="margin: 16px 0" />

      <!-- 流程进度 -->
      <a-steps :current="2" size="small" style="max-width: 750px">
        <a-step title="创建项目">
          <template #description>
            <div style="font-size: 12px">
              <div>曲丽丽 <a-divider type="vertical" /> 2026-07-01</div>
            </div>
          </template>
        </a-step>
        <a-step title="部门初审">
          <template #description>
            <div style="font-size: 12px">周毛毛 <a-divider type="vertical" /> 2026-07-02</div>
          </template>
        </a-step>
        <a-step title="财务复核" />
        <a-step title="完成" />
      </a-steps>
    </a-card>

    <!-- 详情 Tabs -->
    <a-card variant="borderless" style="margin-top: 24px">
      <a-tabs v-model:activeKey="activeTab">
        <a-tab-pane key="detail" tab="详情">
          <a-descriptions title="用户信息" :column="2" bordered>
            <a-descriptions-item label="用户姓名">曲丽丽</a-descriptions-item>
            <a-descriptions-item label="会员卡号">32943898021309809423</a-descriptions-item>
            <a-descriptions-item label="身份证">3321944288191034921</a-descriptions-item>
            <a-descriptions-item label="联系方式">18112345678</a-descriptions-item>
            <a-descriptions-item label="联系地址" :span="2">曲丽丽 18100000000 浙江省杭州市西湖区工专路 77 号</a-descriptions-item>
          </a-descriptions>

          <a-descriptions title="信息组" :column="2" bordered style="margin-top: 24px">
            <a-descriptions-item label="某某数据">725</a-descriptions-item>
            <a-descriptions-item label="该数据更新时间">2026-07-01</a-descriptions-item>
            <a-descriptions-item label="某某数据" :span="2">
              这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长…
            </a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>
        <a-tab-pane key="rules" tab="规则">
          <a-empty description="暂无规则" />
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <!-- 操作日志 Tabs -->
    <a-card variant="borderless" title="操作日志" style="margin-top: 24px">
      <a-tabs v-model:activeKey="opTabKey">
        <a-tab-pane key="op1" tab="操作日志一">
          <a-table :columns="operationColumns1" :data-source="tabOperationData.op1" :pagination="false" size="middle">
            <template #bodyCell="{ column, text }">
              <template v-if="column.key === 'status'">
                <a-badge v-if="text === 'success'" status="success" text="成功" />
                <a-badge v-else status="error" text="失败" />
              </template>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="op2" tab="操作日志二">
          <a-table :columns="operationColumns2" :data-source="tabOperationData.op2" :pagination="false" size="middle">
            <template #bodyCell="{ column, text }">
              <template v-if="column.key === 'status'">
                <a-badge status="success" text="成功" />
              </template>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="op3" tab="操作日志三">
          <a-table :columns="operationColumns2" :data-source="tabOperationData.op3" :pagination="false" size="middle">
            <template #bodyCell="{ column, text }">
              <template v-if="column.key === 'status'">
                <a-badge status="success" text="成功" />
              </template>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
