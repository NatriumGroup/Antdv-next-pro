<script setup lang="ts">
import { EllipsisOutlined, DingdingOutlined } from '@antdv-next/icons'

const tabActiveKey = ref('detail')
const opTabKey = ref('tab1')

// 操作日志数据
const operationColumns = [
  { title: '操作类型', dataIndex: 'type', key: 'type' },
  { title: '操作人', dataIndex: 'name', key: 'name' },
  { title: '执行结果', dataIndex: 'status', key: 'status' },
  { title: '操作时间', dataIndex: 'updatedAt', key: 'updatedAt' },
  { title: '备注', dataIndex: 'memo', key: 'memo' },
]
const operationData: Record<string, any[]> = {
  tab1: [
    { key: '1', type: '创建实验', name: '曲丽丽', status: 'agree', updatedAt: '2017-07-07 14:00', memo: '-' },
    { key: '2', type: '关联规则', name: '曲丽丽', status: 'agree', updatedAt: '2017-07-07 14:00', memo: '-' },
    { key: '3', type: '创建实验', name: '曲丽丽', status: 'agree', updatedAt: '2017-07-07 14:00', memo: '-' },
  ],
  tab2: [
    { key: '1', type: '创建实验', name: '曲丽丽', status: 'agree', updatedAt: '2017-07-08 09:00', memo: '-' },
    { key: '2', type: '关联规则', name: '付小小', status: 'reject', updatedAt: '2017-07-08 10:00', memo: '不通过原因' },
  ],
  tab3: [
    { key: '1', type: '创建实验', name: '林东东', status: 'agree', updatedAt: '2017-07-09 11:00', memo: '-' },
  ],
}

const dropdownMenu = {
  items: [
    { key: '1', label: '选项一' },
    { key: '2', label: '选项二' },
    { key: '3', label: '选项三' },
  ],
}

const opTabItems = [
  { key: 'tab1', label: '操作日志一' },
  { key: 'tab2', label: '操作日志二' },
  { key: 'tab3', label: '操作日志三' },
]
</script>

<template>
  <div>
    <!-- ============ 页头区域 ============ -->
    <div class="page-header-wrapper">
      <div class="page-header-heading">
        <div class="page-header-heading-title">单号：234231029431</div>
        <div class="page-header-heading-extra">
          <a-space>
            <a-space-compact>
              <a-button>操作一</a-button>
              <a-button>操作二</a-button>
              <a-dropdown :menu="dropdownMenu">
                <a-button><EllipsisOutlined /></a-button>
              </a-dropdown>
            </a-space-compact>
            <a-button type="primary">主操作</a-button>
          </a-space>
        </div>
      </div>

      <div class="page-header-detail">
        <div class="page-header-main">
          <a-descriptions size="small" :column="2">
            <a-descriptions-item label="创建人">曲丽丽</a-descriptions-item>
            <a-descriptions-item label="订购产品">XX 服务</a-descriptions-item>
            <a-descriptions-item label="创建时间">2017-07-07</a-descriptions-item>
            <a-descriptions-item label="关联单据"><a>12421</a></a-descriptions-item>
            <a-descriptions-item label="生效日期">2017-07-07 ~ 2017-08-08</a-descriptions-item>
            <a-descriptions-item label="备注">请于两个工作日内确认</a-descriptions-item>
          </a-descriptions>
        </div>
        <div class="page-header-extra">
          <a-statistic title="状态" value="待审批" />
          <a-statistic title="订单金额" prefix="¥" :value="568.08" />
        </div>
      </div>

      <!-- Tabs -->
      <a-tabs v-model:activeKey="tabActiveKey" :items="[{ key: 'detail', label: '详情' }, { key: 'rule', label: '规则' }]" />
    </div>

    <!-- ============ 内容区域 ============ -->
    <div class="page-content" style="padding: 0 24px 24px">
      <template v-if="tabActiveKey === 'detail'">
        <!-- 流程进度 -->
        <a-card title="流程进度" style="margin-bottom: 24px">
          <a-steps
            :current="1"
            :items="[
              { title: '创建项目', description: '曲丽丽\n2016-12-12 12:32' },
              { title: '部门初审', description: '周毛毛' },
              { title: '财务复核' },
              { title: '完成' },
            ]"
          />
        </a-card>

        <!-- 用户信息 -->
        <a-card title="用户信息" variant="borderless" style="margin-bottom: 24px">
          <a-descriptions style="margin-bottom: 24px">
            <a-descriptions-item label="用户姓名">付小小</a-descriptions-item>
            <a-descriptions-item label="会员卡号">32943898021309809423</a-descriptions-item>
            <a-descriptions-item label="身份证">3321944288191034921</a-descriptions-item>
            <a-descriptions-item label="联系方式">18112345678</a-descriptions-item>
            <a-descriptions-item label="联系地址" :span="2">曲丽丽 18100000000 浙江省杭州市西湖区黄姑山路工专路交叉路口</a-descriptions-item>
          </a-descriptions>

          <a-descriptions title="信息组" style="margin-bottom: 24px">
            <a-descriptions-item label="某某数据">725</a-descriptions-item>
            <a-descriptions-item label="该数据更新时间">2017-08-08</a-descriptions-item>
            <a-descriptions-item label="某某数据">725</a-descriptions-item>
            <a-descriptions-item label="该数据更新时间">2017-08-08</a-descriptions-item>
          </a-descriptions>

          <h4 style="margin-bottom: 16px">信息组</h4>
          <a-card type="inner" title="多层级信息组">
            <a-descriptions title="组名称">
              <a-descriptions-item label="负责人">林东东</a-descriptions-item>
              <a-descriptions-item label="角色码">1234567</a-descriptions-item>
              <a-descriptions-item label="所属部门">XX公司 - YY部</a-descriptions-item>
              <a-descriptions-item label="过期时间">2017-08-08</a-descriptions-item>
              <a-descriptions-item label="描述" :span="2">这段描述很长很长很长很长很长很长很长很长很长很长很长很长很长很长...</a-descriptions-item>
            </a-descriptions>
            <a-divider />
            <a-descriptions title="组名称" :column="1">
              <a-descriptions-item label="学名">Citrullus lanatus (Thunb.) Matsum. et Nakai一年生蔓生藤本；茎、枝粗壮，具明显的棱。卷须较粗..</a-descriptions-item>
            </a-descriptions>
            <a-divider />
            <a-descriptions title="组名称">
              <a-descriptions-item label="负责人">付小小</a-descriptions-item>
              <a-descriptions-item label="角色码">1234568</a-descriptions-item>
            </a-descriptions>
          </a-card>
        </a-card>

        <!-- 用户近半年来电记录 -->
        <a-card title="用户近半年来电记录" variant="borderless" style="margin-bottom: 24px">
          <a-empty />
        </a-card>

        <!-- 操作日志 -->
        <a-card variant="borderless">
          <a-tabs v-model:activeKey="opTabKey" :items="opTabItems" />
          <a-table :columns="operationColumns" :data-source="operationData[opTabKey]" :pagination="false">
            <template #bodyCell="{ column, text }">
              <template v-if="column.key === 'status'">
                <a-badge v-if="text === 'agree'" status="success" text="成功" />
                <a-badge v-else status="error" text="驳回" />
              </template>
            </template>
          </a-table>
        </a-card>
      </template>

      <template v-if="tabActiveKey === 'rule'">
        <a-card variant="borderless">
          <a-empty description="暂无规则" />
        </a-card>
      </template>
    </div>
  </div>
</template>

<style scoped>
.page-header-wrapper {
  background: var(--ant-color-bg-container, #fff);
  padding: 16px 24px 0;
  margin-bottom: 24px;
}

.page-header-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header-heading-title {
  font-size: 20px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.88);
}

.page-header-detail {
  display: flex;
  margin-top: 16px;
}

.page-header-main {
  flex: 1;
  min-width: 0;
}

.page-header-extra {
  display: flex;
  gap: 32px;
  margin-left: 48px;
  flex-shrink: 0;
}
</style>
