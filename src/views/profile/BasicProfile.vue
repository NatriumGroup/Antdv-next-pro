<script setup lang="ts">
// Profile Basic - 精确对标 Pro 原版

const goodsColumns = [
  { title: '商品编号', dataIndex: 'id', key: 'id' },
  { title: '商品名称', dataIndex: 'name', key: 'name' },
  { title: '商品条码', dataIndex: 'barcode', key: 'barcode' },
  { title: '单价', dataIndex: 'price', key: 'price' },
  { title: '数量（件）', dataIndex: 'num', key: 'num', align: 'right' as const },
  { title: '金额', dataIndex: 'amount', key: 'amount', align: 'right' as const },
]

const goodsData = [
  { key: '1', id: '1234561', name: '矿泉水 550ml', barcode: '12421432143214321', price: '2.00', num: 1, amount: '2.00' },
  { key: '2', id: '1234562', name: '凉茶 300ml', barcode: '12421432143214322', price: '3.00', num: 2, amount: '6.00' },
  { key: '3', id: '1234563', name: '好吃的薯片', barcode: '12421432143214323', price: '7.00', num: 4, amount: '28.00' },
  { key: '4', id: '1234564', name: '特仑苏牛奶', barcode: '12421432143214324', price: '4.00', num: 1, amount: '4.00' },
]

const progressColumns = [
  { title: '时间', dataIndex: 'time', key: 'time' },
  { title: '当前进度', dataIndex: 'rate', key: 'rate' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '操作员ID', dataIndex: 'operator', key: 'operator' },
  { title: '耗时', dataIndex: 'cost', key: 'cost' },
]

const progressData = [
  { key: '1', time: '2026-07-01 14:00', rate: '联系客户', status: 'success', operator: 'ID001', cost: '5mins' },
  { key: '2', time: '2026-07-01 14:05', rate: '取货员出发', status: 'success', operator: 'ID002', cost: '1h' },
  { key: '3', time: '2026-07-01 15:05', rate: '取货员接单', status: 'success', operator: 'ID003', cost: '5mins' },
  { key: '4', time: '2026-07-01 15:10', rate: '申请审批', status: 'processing', operator: 'ID004', cost: '1h' },
]
</script>

<template>
  <PageContainer>
    <a-card variant="borderless">
      <a-descriptions title="退款申请" :column="2">
        <a-descriptions-item label="取货单号">1000000000</a-descriptions-item>
        <a-descriptions-item label="状态">已取货</a-descriptions-item>
        <a-descriptions-item label="销售单号">1234123421</a-descriptions-item>
        <a-descriptions-item label="子订单">3214321432</a-descriptions-item>
      </a-descriptions>
      <a-divider />
      <a-descriptions title="用户信息" :column="2">
        <a-descriptions-item label="用户姓名">付小小</a-descriptions-item>
        <a-descriptions-item label="联系电话">18100000000</a-descriptions-item>
        <a-descriptions-item label="常用快递">菜鸟仓储</a-descriptions-item>
        <a-descriptions-item label="取货地址">浙江省杭州市西湖区万塘路18号</a-descriptions-item>
        <a-descriptions-item label="备注">无</a-descriptions-item>
      </a-descriptions>
      <a-divider />

      <div style="font-size: 16px; font-weight: 500; margin-bottom: 16px">退货商品</div>
      <a-table :columns="goodsColumns" :data-source="goodsData" :pagination="false" size="middle">
        <template #summary>
          <a-table-summary>
            <a-table-summary-row>
              <a-table-summary-cell :col-span="4">总计</a-table-summary-cell>
              <a-table-summary-cell :align="'right'">8</a-table-summary-cell>
              <a-table-summary-cell :align="'right'">¥ 40.00</a-table-summary-cell>
            </a-table-summary-row>
          </a-table-summary>
        </template>
      </a-table>

      <a-divider />
      <div style="font-size: 16px; font-weight: 500; margin-bottom: 16px">退货进度</div>
      <a-table :columns="progressColumns" :data-source="progressData" :pagination="false" size="middle">
        <template #bodyCell="{ column, text }">
          <template v-if="column.key === 'status'">
            <a-badge v-if="text === 'success'" status="success" text="成功" />
            <a-badge v-else status="processing" text="进行中" />
          </template>
        </template>
      </a-table>
    </a-card>
  </PageContainer>
</template>
