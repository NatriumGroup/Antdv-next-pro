<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { Chart } from '@antv/g2'
import dayjs from 'dayjs'
import {
  InfoCircleOutlined,
  CaretUpOutlined,
  CaretDownOutlined,
  EllipsisOutlined,
} from '@antdv-next/icons'

// ── Mock 数据（与 Pro _mock.ts 完全一致）──
const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]
const beginDay = Date.now()
const visitData = fakeY.map((y, i) => ({
  x: dayjs(beginDay + 1000 * 60 * 60 * 24 * i).format('YYYY-MM-DD'),
  y,
}))

const fakeY2 = [1, 6, 4, 8, 3, 7, 2]
const visitData2 = fakeY2.map((y, i) => ({
  x: dayjs(beginDay + 1000 * 60 * 60 * 24 * i).format('YYYY-MM-DD'),
  y,
}))

const salesData = Array.from({ length: 12 }, (_, i) => ({
  x: `${i + 1}月`,
  y: Math.floor(Math.random() * 1000) + 200,
}))

const searchData = Array.from({ length: 50 }, (_, i) => ({
  index: i + 1,
  keyword: `搜索关键词-${i}`,
  count: Math.floor(Math.random() * 1000),
  range: Math.floor(Math.random() * 100),
  status: Math.floor((Math.random() * 10) % 2),
}))

const salesTypeData = [
  { x: '家用电器', y: 4544 },
  { x: '食用酒水', y: 3321 },
  { x: '个护健康', y: 3113 },
  { x: '服饰箱包', y: 2341 },
  { x: '母婴产品', y: 1231 },
  { x: '其他', y: 1231 },
]
const salesTypeDataOnline = [
  { x: '家用电器', y: 244 }, { x: '食用酒水', y: 321 }, { x: '个护健康', y: 311 },
  { x: '服饰箱包', y: 41 }, { x: '母婴产品', y: 121 }, { x: '其他', y: 111 },
]
const salesTypeDataOffline = [
  { x: '家用电器', y: 99 }, { x: '食用酒水', y: 188 }, { x: '个护健康', y: 344 },
  { x: '服饰箱包', y: 255 }, { x: '其他', y: 65 },
]

const offlineData = Array.from({ length: 10 }, (_, i) => ({
  name: `Stores ${i}`,
  cvr: Math.ceil(Math.random() * 9) / 10,
}))

const offlineChartData: { date: string; type: string; value: number }[] = []
for (let i = 0; i < 20; i++) {
  const d = dayjs(Date.now() + 1000 * 60 * 30 * i).format('HH:mm')
  offlineChartData.push({ date: d, type: '客流量', value: Math.floor(Math.random() * 100) + 10 })
  offlineChartData.push({ date: d, type: '支付笔数', value: Math.floor(Math.random() * 100) + 10 })
}

const rankingListData = Array.from({ length: 7 }, (_, i) => ({
  title: `工专路 ${i} 号店`,
  total: 323234,
}))

// ── 状态 ──
const salesTab = ref<'sales' | 'views'>('sales')
const salesTimeRange = ref<'today' | 'week' | 'month' | 'year'>('year')
const salesType = ref<'all' | 'online' | 'stores'>('all')
const offlineActiveKey = ref(offlineData[0]?.name ?? '')

const salesPieData = computed(() => {
  if (salesType.value === 'online') return salesTypeDataOnline
  if (salesType.value === 'stores') return salesTypeDataOffline
  return salesTypeData
})

function formatNumber(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// ── G2 图表实例 ──
const charts: Chart[] = []
const miniAreaRef = ref<HTMLDivElement>()
const miniColumnRef = ref<HTMLDivElement>()
const salesColumnRef = ref<HTMLDivElement>()
const pieRef = ref<HTMLDivElement>()
const offlineLineRef = ref<HTMLDivElement>()
const searchArea1Ref = ref<HTMLDivElement>()
const searchArea2Ref = ref<HTMLDivElement>()

function destroyChart(el: HTMLDivElement | undefined) {
  const idx = charts.findIndex((c: any) => c._el === el)
  if (idx !== -1) { charts[idx]!.destroy(); charts.splice(idx, 1) }
}

function makeChart(el: HTMLDivElement, height: number, padding?: number): Chart {
  destroyChart(el)
  const chart = new Chart({ container: el, autoFit: true, height, ...(padding != null ? { padding } : {}) })
  ;(chart as any)._el = el
  charts.push(chart)
  return chart
}

function renderMiniArea(el: HTMLDivElement | undefined, data: typeof visitData, color: string) {
  if (!el) return
  const chart = makeChart(el, 46, -20)
  chart.data(data)
  chart.area().encode('x', 'x').encode('y', 'y').encode('shape', 'smooth')
    .style('fill', `linear-gradient(-90deg, white 0%, ${color} 100%)`)
    .style('fillOpacity', 0.6)
  chart.axis(false); chart.legend(false); chart.interaction('tooltip', false)
  chart.render()
}

function renderMiniColumn(el: HTMLDivElement | undefined, data: typeof visitData) {
  if (!el) return
  const chart = makeChart(el, 46, -20)
  chart.data(data)
  chart.interval().encode('x', 'x').encode('y', 'y').scale('x', { paddingInner: 0.4 })
  chart.axis(false); chart.legend(false); chart.interaction('tooltip', false)
  chart.render()
}

function renderSalesColumn() {
  if (!salesColumnRef.value) return
  const chart = makeChart(salesColumnRef.value, 300)
  chart.options({ paddingBottom: 12 })
  chart.data(salesData)
  chart.interval().encode('x', 'x').encode('y', 'y')
    .scale('x', { paddingInner: 0.4 })
    .tooltip({ name: salesTab.value === 'sales' ? '销售量' : '访问量', channel: 'y' })
  chart.axis('x', { title: false })
  chart.axis('y', { title: false, gridLineDash: null, gridStroke: '#ccc' })
  chart.render()
}

function renderPie(data: typeof salesTypeData) {
  if (!pieRef.value) return
  const chart = makeChart(pieRef.value, 340)
  chart.coordinate({ type: 'theta', innerRadius: 0.5 })
  chart.data(data)
  chart.interval().encode('y', 'y').encode('color', 'x')
    .transform({ type: 'stackY' })
    .label({ text: (d: any) => `${d.x}: ${formatNumber(d.y)}`, position: 'spider' })
    .tooltip({ name: '销售额', channel: 'y' })
  chart.legend(false)
  chart.render()
}

function renderOfflineLine() {
  if (!offlineLineRef.value) return
  const chart = makeChart(offlineLineRef.value, 400)
  chart.data(offlineChartData)
  chart.line().encode('x', 'date').encode('y', 'value').encode('color', 'type')
  chart.axis('x', { title: false })
  chart.axis('y', { title: false, gridLineDash: null, gridStroke: '#ccc', gridStrokeOpacity: 1 })
  chart.legend('color', { layout: { justifyContent: 'center' } })
  chart.render()
}

function renderSearchArea(el: HTMLDivElement | undefined, data: typeof visitData2) {
  if (!el) return
  const chart = makeChart(el, 45, -12)
  chart.data(data)
  chart.area().encode('x', 'x').encode('y', 'y').encode('shape', 'smooth')
    .style('fill', 'linear-gradient(-90deg, white 0%, #6294FA 100%)')
    .style('fillOpacity', 0.4)
  chart.axis(false); chart.legend(false); chart.interaction('tooltip', false)
  chart.render()
}

// ── 生命周期 ──
onMounted(() => {
  nextTick(() => {
    renderMiniArea(miniAreaRef.value, visitData, '#975FE4')
    renderMiniColumn(miniColumnRef.value, visitData)
    renderSalesColumn()
    renderPie(salesTypeData)
    renderOfflineLine()
    renderSearchArea(searchArea1Ref.value, visitData2)
    renderSearchArea(searchArea2Ref.value, visitData2)
  })
})

onUnmounted(() => {
  charts.forEach(c => c.destroy())
})

watch(salesTab, () => { nextTick(() => renderSalesColumn()) })
watch(salesPieData, (data) => { nextTick(() => renderPie(data)) })
watch(offlineActiveKey, () => { nextTick(() => renderOfflineLine()) })

// ── TopSearch Table ──
const searchColumns = [
  { title: '排名', dataIndex: 'index', key: 'index', width: 65 },
  { title: '搜索关键词', dataIndex: 'keyword', key: 'keyword' },
  { title: '用户数', dataIndex: 'count', key: 'count', sorter: (a: any, b: any) => a.count - b.count },
  { title: '周涨幅', dataIndex: 'range', key: 'range', sorter: (a: any, b: any) => a.range - b.range },
]
</script>

<template>
  <div>
    <!-- ═══════ 1. IntroduceRow — 4 ChartCards ═══════ -->
    <a-row :gutter="24">
      <!-- 总销售额 -->
      <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6" style="margin-bottom: 24px">
        <a-card title="总销售额" variant="borderless" :styles="{ body: { padding: '20px 24px 8px' } }">
          <div class="chart-card">
            <div class="chart-top">
              <div class="meta-wrap">
                <div class="meta">
                  <span class="meta-title">总销售额</span>
                  <span class="meta-action">
                    <a-tooltip title="指标说明"><InfoCircleOutlined /></a-tooltip>
                  </span>
                </div>
                <div class="total">¥ 126,560</div>
              </div>
            </div>
            <div class="content" style="height: 46px">
              <div class="content-fixed">
                <span class="trend-item" style="margin-right: 16px">
                  周同比<span class="trend-text">12%</span>
                  <CaretUpOutlined class="trend-up" />
                </span>
                <span class="trend-item">
                  日同比<span class="trend-text">11%</span>
                  <CaretDownOutlined class="trend-down" />
                </span>
              </div>
            </div>
            <div class="card-footer">
              <span class="field-label">日销售额</span>
              <span class="field-value">￥{{ formatNumber(12423) }}</span>
            </div>
          </div>
        </a-card>
      </a-col>

      <!-- 访问量 -->
      <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6" style="margin-bottom: 24px">
        <a-card title="访问量" variant="borderless" :styles="{ body: { padding: '20px 24px 8px' } }">
          <div class="chart-card">
            <div class="chart-top">
              <div class="meta-wrap">
                <div class="meta">
                  <span class="meta-title">访问量</span>
                  <span class="meta-action">
                    <a-tooltip title="指标说明"><InfoCircleOutlined /></a-tooltip>
                  </span>
                </div>
                <div class="total">{{ formatNumber(8846) }}</div>
              </div>
            </div>
            <div class="content" style="height: 46px">
              <div ref="miniAreaRef" class="content-fixed" />
            </div>
            <div class="card-footer">
              <span class="field-label">日访问量</span>
              <span class="field-value">{{ formatNumber(1234) }}</span>
            </div>
          </div>
        </a-card>
      </a-col>

      <!-- 支付笔数 -->
      <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6" style="margin-bottom: 24px">
        <a-card title="支付笔数" variant="borderless" :styles="{ body: { padding: '20px 24px 8px' } }">
          <div class="chart-card">
            <div class="chart-top">
              <div class="meta-wrap">
                <div class="meta">
                  <span class="meta-title">支付笔数</span>
                  <span class="meta-action">
                    <a-tooltip title="指标说明"><InfoCircleOutlined /></a-tooltip>
                  </span>
                </div>
                <div class="total">{{ formatNumber(6560) }}</div>
              </div>
            </div>
            <div class="content" style="height: 46px">
              <div ref="miniColumnRef" class="content-fixed" />
            </div>
            <div class="card-footer">
              <span class="field-label">转化率</span>
              <span class="field-value">60%</span>
            </div>
          </div>
        </a-card>
      </a-col>

      <!-- 运营活动效果 -->
      <a-col :xs="24" :sm="12" :md="12" :lg="12" :xl="6" style="margin-bottom: 24px">
        <a-card title="运营活动效果" variant="borderless" :styles="{ body: { padding: '20px 24px 8px' } }">
          <div class="chart-card">
            <div class="chart-top">
              <div class="meta-wrap">
                <div class="meta">
                  <span class="meta-title">运营活动效果</span>
                  <span class="meta-action">
                    <a-tooltip title="指标说明"><InfoCircleOutlined /></a-tooltip>
                  </span>
                </div>
                <div class="total">78%</div>
              </div>
            </div>
            <div class="content" style="height: 46px">
              <div class="content-fixed">
                <a-progress
                  :percent="78"
                  :size="{ width: '100%', height: 8 }"
                  :stroke-color="{ from: '#108ee9', to: '#87d068' }"
                  status="active"
                />
              </div>
            </div>
            <div class="card-footer" style="white-space: nowrap; overflow: hidden">
              <span class="trend-item" style="margin-right: 16px">
                周同比<span class="trend-text">12%</span>
                <CaretUpOutlined class="trend-up" />
              </span>
              <span class="trend-item">
                日同比<span class="trend-text">11%</span>
                <CaretDownOutlined class="trend-down" />
              </span>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- ═══════ 2. SalesCard — Tab 柱状图 + 排名 ═══════ -->
    <a-card variant="borderless" :styles="{ body: { padding: 0 } }">
      <a-tabs
        v-model:activeKey="salesTab"
        size="large"
        :tab-bar-style="{ marginBottom: '24px', paddingLeft: '16px' }"
        :tab-bar-extra-content="undefined"
      >
        <template #rightExtra>
          <div class="sales-extra-wrap">
            <div class="sales-extra">
              <a-button
                v-for="t in ([
                  { key: 'today', label: '今日' },
                  { key: 'week', label: '本周' },
                  { key: 'month', label: '本月' },
                  { key: 'year', label: '本年' },
                ] as const)"
                :key="t.key"
                type="text"
                :class="{ 'current-date': salesTimeRange === t.key }"
                @click="salesTimeRange = t.key"
              >
                {{ t.label }}
              </a-button>
            </div>
            <a-range-picker variant="filled" style="width: 256px" />
          </div>
        </template>
        <a-tab-pane key="sales" tab="销售额">
          <a-row>
            <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
              <div class="sales-bar">
                <div ref="salesColumnRef" style="width: 100%; height: 300px" />
              </div>
            </a-col>
            <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
              <div class="sales-rank">
                <h4 class="ranking-title">门店销售额排名</h4>
                <ul class="ranking-list">
                  <li v-for="(item, i) in rankingListData" :key="item.title">
                    <span :class="['ranking-item-number', { active: i < 3 }]">{{ i + 1 }}</span>
                    <span class="ranking-item-title" :title="item.title">{{ item.title }}</span>
                    <span>{{ formatNumber(item.total) }}</span>
                  </li>
                </ul>
              </div>
            </a-col>
          </a-row>
        </a-tab-pane>
        <a-tab-pane key="views" tab="访问量">
          <a-row>
            <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
              <div class="sales-bar">
                <div ref="salesColumnRef" style="width: 100%; height: 300px" />
              </div>
            </a-col>
            <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
              <div class="sales-rank">
                <h4 class="ranking-title">门店访问量排名</h4>
                <ul class="ranking-list">
                  <li v-for="(item, i) in rankingListData" :key="item.title">
                    <span :class="['ranking-item-number', { active: i < 3 }]">{{ i + 1 }}</span>
                    <span class="ranking-item-title" :title="item.title">{{ item.title }}</span>
                    <span>{{ formatNumber(item.total) }}</span>
                  </li>
                </ul>
              </div>
            </a-col>
          </a-row>
        </a-tab-pane>
      </a-tabs>
    </a-card>

    <!-- ═══════ 3. TopSearch + ProportionSales ═══════ -->
    <a-row :gutter="24" style="margin-top: 24px">
      <!-- 线上热门搜索 -->
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card variant="borderless" title="线上热门搜索" style="height: 100%">
          <template #extra>
            <span class="icon-group">
              <a-dropdown placement="bottomRight">
                <EllipsisOutlined />
                <template #overlay>
                  <a-menu>
                    <a-menu-item key="1">操作一</a-menu-item>
                    <a-menu-item key="2">操作二</a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </span>
          </template>

          <a-row :gutter="68">
            <a-col :sm="12" :xs="24" style="margin-bottom: 24px">
              <div class="number-info">
                <span class="number-info-subtitle">
                  搜索用户数
                  <a-tooltip title="指标说明"><InfoCircleOutlined style="margin-left: 8px" /></a-tooltip>
                </span>
                <div class="number-info-value">
                  <span class="number-total">{{ formatNumber(12321) }}</span>
                  <span class="number-sub">
                    17.1%<CaretUpOutlined class="trend-up" />
                  </span>
                </div>
              </div>
              <div ref="searchArea1Ref" style="height: 45px" />
            </a-col>
            <a-col :sm="12" :xs="24" style="margin-bottom: 24px">
              <div class="number-info">
                <span class="number-info-subtitle">
                  人均搜索次数
                  <a-tooltip title="指标说明"><InfoCircleOutlined style="margin-left: 8px" /></a-tooltip>
                </span>
                <div class="number-info-value">
                  <span class="number-total">2.7</span>
                  <span class="number-sub">
                    26.2%<CaretDownOutlined class="trend-down" />
                  </span>
                </div>
              </div>
              <div ref="searchArea2Ref" style="height: 45px" />
            </a-col>
          </a-row>

          <a-table
            :row-key="(record: any) => record.index"
            size="small"
            :columns="searchColumns"
            :data-source="searchData"
            :pagination="{ pageSize: 5, style: { marginBottom: 0 } }"
          >
            <template #bodyCell="{ column, record, text }">
              <template v-if="column.key === 'keyword'">
                <a>{{ text }}</a>
              </template>
              <template v-if="column.key === 'range'">
                <span class="trend-item">
                  <span style="margin-right: 4px">{{ text }}%</span>
                  <CaretDownOutlined v-if="record.status === 1" class="trend-down" />
                  <CaretUpOutlined v-else class="trend-up" />
                </span>
              </template>
            </template>
          </a-table>
        </a-card>
      </a-col>

      <!-- 销售额类别占比 -->
      <a-col :xl="12" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card variant="borderless" title="销售额类别占比" style="height: 100%">
          <template #extra>
            <div class="sales-card-extra">
              <span class="icon-group">
                <a-dropdown placement="bottomRight">
                  <EllipsisOutlined />
                  <template #overlay>
                    <a-menu>
                      <a-menu-item key="1">操作一</a-menu-item>
                      <a-menu-item key="2">操作二</a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </span>
              <a-segmented
                v-model:value="salesType"
                :options="[
                  { label: '全部渠道', value: 'all' },
                  { label: '线上', value: 'online' },
                  { label: '门店', value: 'stores' },
                ]"
              />
            </div>
          </template>

          <a-typography-text>销售额</a-typography-text>
          <div ref="pieRef" style="width: 100%; height: 340px" />
        </a-card>
      </a-col>
    </a-row>

    <!-- ═══════ 4. OfflineData — 门店 Tab + 折线图 ═══════ -->
    <a-card variant="borderless" style="margin-top: 32px" :styles="{ body: { padding: 0 } }">
      <a-tabs v-model:activeKey="offlineActiveKey">
        <a-tab-pane v-for="shop in offlineData" :key="shop.name">
          <template #tab>
            <a-row :gutter="8" style="width: 138px; margin: 8px 0">
              <a-col :span="12">
                <div class="number-info">
                  <span class="number-info-subtitle" :style="{ opacity: offlineActiveKey === shop.name ? 1 : 0.45 }">{{ shop.name }}</span>
                  <div style="color: var(--ant-color-text-tertiary); font-size: 12px; margin: 2px 0">转化率</div>
                  <div class="number-total" :style="{ opacity: offlineActiveKey === shop.name ? 1 : 0.45 }">
                    {{ (shop.cvr * 100).toFixed(0) }}%
                  </div>
                </div>
              </a-col>
              <a-col :span="12" style="padding-top: 36px">
                <svg width="60" height="60" viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#E8EEF4" stroke-width="6" />
                  <circle cx="30" cy="30" r="24" fill="none" stroke="#5FABF4" stroke-width="6"
                    :stroke-dasharray="`${shop.cvr * 150.8} ${150.8 - shop.cvr * 150.8}`"
                    stroke-dashoffset="37.7" stroke-linecap="round"
                  />
                </svg>
              </a-col>
            </a-row>
          </template>
        </a-tab-pane>
      </a-tabs>
      <!-- 图表放在 tabs 外面，只渲染一次 -->
      <div style="padding: 0 24px 24px">
        <div ref="offlineLineRef" style="width: 100%; height: 400px" />
      </div>
    </a-card>
  </div>
</template>

<style scoped>
/* ═══ ChartCard ═══ */
.chart-card { position: relative; }
.chart-top { position: relative; width: 100%; overflow: hidden; }
.meta-wrap { float: left; }
.meta { height: 22px; color: var(--ant-color-text-tertiary); font-size: 14px; line-height: 22px; }
.meta-title {}
.meta-action { position: absolute; top: 4px; right: 0; line-height: 1; cursor: pointer; }
.total {
  height: 38px; margin-top: 4px; margin-bottom: 0;
  overflow: hidden; color: var(--ant-color-text);
  font-size: 30px; line-height: 38px;
  white-space: nowrap; text-overflow: ellipsis; word-break: break-all;
}
.content { position: relative; width: 100%; margin-bottom: 12px; }
.content-fixed { position: absolute; bottom: 0; left: 0; width: 100%; }
.card-footer {
  margin-top: 8px; padding-top: 9px;
  border-top: 1px solid rgba(5,5,5,0.06);
}
.card-footer > * { position: relative; }
.field-label { font-size: 14px; line-height: 22px; }
.field-value { margin-left: 8px; color: var(--ant-color-text); }

/* ═══ Trend ═══ */
.trend-item { display: inline-block; font-size: 14px; line-height: 22px; }
.trend-text { margin-left: 8px; color: var(--ant-color-text); }
.trend-up { color: #ff4d4f; }
.trend-down { color: #52c41a; }

/* ═══ SalesCard ═══ */
.sales-extra-wrap { display: flex; align-items: center; padding-right: 24px; }
.sales-extra { display: inline-block; margin-right: 24px; }
.sales-extra :deep(.ant-btn) { color: var(--ant-color-text); }
.sales-extra :deep(.ant-btn:hover) { color: var(--ant-color-primary); }
.current-date { color: var(--ant-color-primary) !important; font-weight: bold; }
.sales-bar { padding: 0 0 32px 32px; }
.sales-rank { padding: 0 32px 32px 72px; }
.ranking-title { margin: 25px 0 0; }
.ranking-list { margin: 25px 0 0; padding: 0; list-style: none; }
.ranking-list li { display: flex; align-items: center; margin-top: 16px; }
.ranking-item-number {
  display: inline-block; width: 20px; height: 20px;
  margin-top: 1.5px; margin-right: 16px;
  font-weight: 600; font-size: 12px; line-height: 20px;
  text-align: center; border-radius: 20px;
  background-color: var(--ant-color-fill-tertiary, rgba(0,0,0,0.04));
}
.ranking-item-number.active { color: #fff; background-color: var(--ant-color-text); }
.ranking-item-title { flex: 1; margin-right: 8px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }

/* ═══ TopSearch ═══ */
.icon-group { cursor: pointer; color: var(--ant-color-text-tertiary); transition: color 0.32s; }
.icon-group:hover { color: var(--ant-color-text); }
.number-info {}
.number-info-subtitle { font-size: 14px; line-height: 22px; color: var(--ant-color-text-tertiary); }
.number-info-value { display: flex; align-items: baseline; gap: 8px; margin-top: 4px; }
.number-total { font-size: 24px; font-weight: 600; color: var(--ant-color-text); }
.number-sub { font-size: 16px; }

/* ═══ ProportionSales ═══ */
.sales-card-extra { display: flex; align-items: center; gap: 16px; }

@media screen and (max-width: 992px) {
  .sales-extra-wrap { display: none; }
  .sales-bar { padding: 16px; }
  .sales-rank { padding: 0 32px 32px 32px; }
}
</style>
