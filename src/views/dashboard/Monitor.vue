<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, nextTick } from 'vue'
import { Chart } from '@antv/g2'
import * as d3 from 'd3'
import { feature } from 'topojson-client'
import type { Topology } from 'topojson-specification'

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30

function fixedZero(val: number) { return val < 10 ? `0${val}` : String(val) }
function getActiveData() {
  return Array.from({ length: 24 }, (_, i) => ({ x: `${fixedZero(i)}:00`, y: Math.floor(Math.random() * 200) + i * 50 }))
}
function formatNumber(n: number) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }

const activeData = ref(getActiveData())
let activeTimer: ReturnType<typeof setTimeout> | null = null
const allCharts: Chart[] = []

// Refs
const activeChartEl = ref<HTMLDivElement>()
const mapSvgEl = ref<SVGSVGElement>()
const gaugeEl = ref<HTMLDivElement>()
const wordCloudEl = ref<HTMLDivElement>()
const liquidEl = ref<HTMLDivElement>()
const mapLoading = ref(true)
const mapTooltipEl = ref<HTMLDivElement>()

const maxValue = computed(() => Math.max(...activeData.value.map(d => d.y)))
const medianValue = computed(() => {
  const sorted = [...activeData.value].sort((a, b) => a.y - b.y)
  return sorted[Math.floor(sorted.length / 2)]?.y ?? 0
})

// 词云原始数据
const wordCloudData = (() => {
  const cs = ['北京','上海','杭州','深圳','广州','成都','武汉','南京','重庆','长沙','苏州','西安','天津','青岛','厦门','大连','宁波','无锡','郑州','合肥']
  return Array.from({ length: 100 }, (_, i) => ({ text: cs[i % 20]!, value: Math.floor(Math.random() * 90) + 10 }))
})()

function destroyChart(el: HTMLElement | undefined) {
  const idx = allCharts.findIndex((c: any) => c._el === el)
  if (idx !== -1) { allCharts[idx]!.destroy(); allCharts.splice(idx, 1) }
}
function makeChart(el: HTMLElement, opts: Record<string, any> = {}): Chart {
  destroyChart(el)
  const chart = new Chart({ container: el, autoFit: true, ...opts })
  ;(chart as any)._el = el
  allCharts.push(chart)
  return chart
}

// ── ActiveChart: G2 Area ──
function renderActiveChart() {
  if (!activeChartEl.value) return
  const chart = makeChart(activeChartEl.value, { height: 84, padding: 0 })
  chart.data(activeData.value)
  chart.area().encode('x', 'x').encode('y', 'y')
    .style('fill', 'linear-gradient(-90deg, white 0%, #6294FA 100%)')
    .style('fillOpacity', 0.6)
  chart.axis(false); chart.legend(false); chart.interaction('tooltip', false)
  chart.render()
}

// ── Gauge: G2 v5 Spec API ──
function renderGauge() {
  if (!gaugeEl.value) return
  const chart = makeChart(gaugeEl.value, { height: 220, padding: -16 })
  chart.options({
    type: 'gauge',
    data: {
      value: {
        target: 80,
        total: 100,
        name: 'score',
        thresholds: [20, 40, 60, 80, 100],
      },
    },
    scale: {
      color: { range: ['#6395FA', '#62DAAB', '#657798', '#F7C128', '#1F8718'] },
    },
    style: {
      textContent: () => '优',
    },
    legend: false,
  })
  chart.render()
}

// ── WordCloud: G2 v5 Spec API ──
function renderWordCloud() {
  if (!wordCloudEl.value) return
  const chart = makeChart(wordCloudEl.value, { height: 162 })
  chart.options({
    type: 'wordCloud',
    data: {
      value: wordCloudData,
    },
    layout: {
      spiral: 'rectangular',
      fontSize: [10, 20],
    },
    encode: {
      color: 'text',
    },
    legend: false,
  })
  chart.render()
}

// ── Liquid: G2 v5 Spec API ──
function renderLiquid() {
  if (!liquidEl.value) return
  const chart = makeChart(liquidEl.value, { height: 160 })
  chart.options({
    type: 'liquid',
    data: 0.35,
    style: {
      outlineBorder: 2,
      outlineDistance: 0,
      waveLength: 128,
    },
  })
  chart.render()
}

// ── D3 Hex Map ──
const DATA_COLORS = ['#ede9fe','#ddd6fe','#c4b5fd','#a78bfa','#8b5cf6','#7c3aed','#6d28d9']

function hexPath(cx: number, cy: number, r: number): string {
  const pts: string[] = []
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`)
  }
  return `M${pts.join('L')}Z`
}

function buildLandBitmap(width: number, height: number, countries: any, pathGen: d3.GeoPath): Uint8Array {
  const canvas = document.createElement('canvas')
  canvas.width = width; canvas.height = height
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, width, height); ctx.fillStyle = '#000'
  for (const f of countries.features) {
    const path = pathGen(f); if (path) { ctx.beginPath(); ctx.fill(new Path2D(path)) }
  }
  const data = ctx.getImageData(0, 0, width, height).data
  const bitmap = new Uint8Array(width * height)
  for (let i = 0; i < bitmap.length; i++) bitmap[i] = data[i * 4 + 3]! > 0 ? 1 : 0
  return bitmap
}

async function renderMap() {
  if (!mapSvgEl.value) return
  mapLoading.value = true
  try {
    const [worldRes, geoRes] = await Promise.all([
      fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'),
      fetch('https://gw.alipayobjects.com/os/bmw-prod/c5dba875-b6ea-4e88-b778-66a862906c93.json'),
    ])
    const worldData = await worldRes.json() as Topology
    const geoData = await geoRes.json() as { features: Array<{ geometry: { coordinates: [number, number] } | null; properties: { cum_conf: number } }> }

    const svg = d3.select(mapSvgEl.value)
    svg.selectAll('*').remove()

    const width = mapSvgEl.value.clientWidth || 800
    const height = Math.max(width * 0.45, 300)
    mapSvgEl.value.style.height = `${height}px`
    mapSvgEl.value.setAttribute('viewBox', `0 0 ${width} ${height}`)

    const countries = feature(worldData, worldData.objects.countries as any) as any
    const projection = d3.geoNaturalEarth1().fitSize([width - 20, height - 10], countries)
    const pathGen = d3.geoPath().projection(projection)

    svg.append('rect').attr('width', width).attr('height', height).attr('fill', '#fff')
    const g = svg.append('g')

    const bitmap = buildLandBitmap(width, height, countries, pathGen)
    const hexR = 8, hexW = Math.sqrt(3) * hexR, hexH = 2 * hexR
    const hexes: { cx: number; cy: number }[] = []
    for (let row = -1; row * (hexH * 0.75) < height + hexH; row++) {
      for (let col = -1; col * hexW < width + hexW; col++) {
        const cx = col * hexW + (row % 2 !== 0 ? hexW / 2 : 0)
        const cy = row * hexH * 0.75
        const px = Math.round(cx), py = Math.round(cy)
        if (px >= 0 && px < width && py >= 0 && py < height && bitmap[py * width + px]) hexes.push({ cx, cy })
      }
    }
    g.selectAll('path.hex').data(hexes).enter().append('path')
      .attr('d', d => hexPath(d.cx, d.cy, hexR - 0.25))
      .attr('fill', '#e8ecf1').attr('stroke', '#cdd5de').attr('stroke-width', 0.3)

    const validFeatures = geoData.features.filter(f => f.geometry && f.properties.cum_conf != null)
    const maxVal = Math.max(...validFeatures.map(f => f.properties.cum_conf), 1)
    const colorScale = d3.scaleQuantize<string>(DATA_COLORS).domain([0, 1])

    g.selectAll('circle').data(validFeatures).enter().append('circle')
      .attr('cx', d => { const p = projection(d.geometry!.coordinates); return p ? p[0] : 0 })
      .attr('cy', d => { const p = projection(d.geometry!.coordinates); return p ? p[1] : 0 })
      .attr('r', d => Math.max(4, Math.sqrt(d.properties.cum_conf / maxVal) * 22))
      .attr('fill', d => colorScale(d.properties.cum_conf / maxVal))
      .attr('fill-opacity', 0.45)
      .style('cursor', 'pointer')
      .each(function pulse(this: SVGCircleElement) {
        const el = d3.select(this)
        if ((el.node() as any).__hovering) return
        const datum = el.datum() as typeof validFeatures[0]
        const r = Math.max(4, Math.sqrt(datum.properties.cum_conf / maxVal) * 22)
        el.transition('pulse').duration(2000).ease(d3.easeSinInOut)
          .attr('fill-opacity', 0.2).attr('r', r * 0.8)
          .transition('pulse').duration(2000).ease(d3.easeSinInOut)
          .attr('fill-opacity', 0.55).attr('r', r)
          .on('end', function(this: SVGCircleElement) { pulse.call(this) })
      })
      .on('mouseenter', function(_event, d) {
        const el = d3.select(this)
        ;(el.node() as any).__hovering = true
        el.interrupt('pulse')
        el.transition().duration(150).attr('fill-opacity', 0.85)
        if (mapTooltipEl.value) {
          const name = (d as any).properties.Short_Name_ZH || (d as any).properties.ADM0_NAME || ''
          mapTooltipEl.value.innerHTML = `<strong>${name}</strong><br/>交易量: ${d.properties.cum_conf.toLocaleString()}`
          mapTooltipEl.value.style.opacity = '1'
        }
      })
      .on('mousemove', (event) => {
        if (mapTooltipEl.value && mapSvgEl.value) {
          const [x, y] = d3.pointer(event, mapSvgEl.value)
          mapTooltipEl.value.style.left = `${x + 14}px`
          mapTooltipEl.value.style.top = `${y - 14}px`
        }
      })
      .on('mouseleave', function(_event, d) {
        const el = d3.select(this)
        ;(el.node() as any).__hovering = false
        const r = Math.max(4, Math.sqrt(d.properties.cum_conf / maxVal) * 22)
        el.transition().duration(150).attr('fill-opacity', 0.45).attr('r', r)
          .on('end', function(this: SVGCircleElement) {
            // restart pulse
            const sel = d3.select(this)
            const datum = sel.datum() as typeof validFeatures[0]
            const rr = Math.max(4, Math.sqrt(datum.properties.cum_conf / maxVal) * 22)
            function pulse(node: SVGCircleElement) {
              if ((node as any).__hovering) return
              d3.select(node).transition('pulse').duration(2000).ease(d3.easeSinInOut)
                .attr('fill-opacity', 0.2).attr('r', rr * 0.8)
                .transition('pulse').duration(2000).ease(d3.easeSinInOut)
                .attr('fill-opacity', 0.55).attr('r', rr)
                .on('end', function(this: SVGCircleElement) { pulse(this) })
            }
            pulse(this)
          })
        if (mapTooltipEl.value) mapTooltipEl.value.style.opacity = '0'
      })

    // Highlight circles — 交易量 > 2000 的城市画外圈光晕
    const highlightFeatures = validFeatures.filter(f => f.properties.cum_conf > 2000)
    g.selectAll('circle.highlight-point')
      .data(highlightFeatures).enter().append('circle')
      .attr('class', 'highlight-point')
      .attr('cx', d => { const p = projection(d.geometry!.coordinates); return p ? p[0] : 0 })
      .attr('cy', d => { const p = projection(d.geometry!.coordinates); return p ? p[1] : 0 })
      .attr('r', d => Math.max(4, Math.sqrt(d.properties.cum_conf / maxVal) * 22) + 2)
      .attr('fill', DATA_COLORS[3]!)
      .attr('fill-opacity', 0.3)
      .style('pointer-events', 'none')

  } catch (e) { console.warn('[Map]', e) }
  finally { mapLoading.value = false }
}

onMounted(() => {
  nextTick(() => {
    renderActiveChart()
    renderMap()
    renderGauge()
    renderWordCloud()
    renderLiquid()
  })
  const loop = () => {
    activeData.value = getActiveData()
    nextTick(() => renderActiveChart())
    activeTimer = setTimeout(loop, 2000)
  }
  activeTimer = setTimeout(loop, 2000)
})
onUnmounted(() => {
  if (activeTimer) clearTimeout(activeTimer)
  allCharts.forEach(c => c.destroy())
})
</script>

<template>
  <div>
    <a-row :gutter="24">
      <!-- 左：活动实时交易情况 -->
      <a-col :xl="18" :lg="24" style="margin-bottom: 24px; display: flex">
        <a-card title="活动实时交易情况" variant="borderless" style="flex: 1" :styles="{ body: { display: 'flex', flexDirection: 'column', flex: '1' } }">
          <a-row>
            <a-col :md="6" :sm="12" :xs="24"><a-statistic title="今日交易总额" :value="formatNumber(124543233)" suffix="元" /></a-col>
            <a-col :md="6" :sm="12" :xs="24"><a-statistic title="销售目标完成率" value="92%" /></a-col>
            <a-col :md="6" :sm="12" :xs="24"><a-statistic-timer type="countdown" title="活动剩余时间" :value="deadline" format="HH:mm:ss:SSS" /></a-col>
            <a-col :md="6" :sm="12" :xs="24"><a-statistic title="每秒交易总额" :value="formatNumber(234)" suffix="元" /></a-col>
          </a-row>
          <div style="flex: 1; min-height: 380px; margin-top: 16px; position: relative; border-radius: 8px; overflow: hidden; background: #fff">
            <div v-if="mapLoading" style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; z-index: 1"><a-spin /></div>
            <svg ref="mapSvgEl" preserveAspectRatio="xMidYMid meet" style="width: 100%; display: block" />
            <div ref="mapTooltipEl" class="map-tooltip" />
          </div>
        </a-card>
      </a-col>

      <!-- 右侧 -->
      <a-col :xl="6" :lg="24">
        <a-card title="活动情况预测" variant="borderless" style="margin-bottom: 24px">
          <a-statistic title="目标评估" value="有望达到预期" />
          <div style="margin-top: 32px">
            <div ref="activeChartEl" style="width: 100%; height: 84px" />
          </div>
          <div class="active-chart-grid">
            <p>{{ maxValue + 200 }} 亿元</p>
            <p>{{ medianValue }} 亿元</p>
          </div>
          <div class="dashed-line"><div class="dashed-line-inner" /></div>
          <div class="dashed-line last"><div class="dashed-line-inner" /></div>
          <div class="active-chart-legend">
            <span>00:00</span>
            <span>{{ activeData[12]?.x }}</span>
            <span>{{ activeData[23]?.x }}</span>
          </div>
        </a-card>

        <!-- 券核效率：G2 Gauge -->
        <a-card title="券核效率" variant="borderless" style="margin-bottom: 24px" :styles="{ body: { textAlign: 'center' } }">
          <div ref="gaugeEl" style="width: 100%; height: 220px" />
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="24">
      <!-- 各品类占比 -->
      <a-col :xl="12" :lg="24" style="margin-bottom: 24px">
        <a-card title="各品类占比" variant="borderless">
          <a-row style="padding: 16px 0">
            <a-col :span="8" style="text-align: center"><a-progress type="dashboard" :percent="75" /></a-col>
            <a-col :span="8" style="text-align: center"><a-progress type="dashboard" :percent="48" /></a-col>
            <a-col :span="8" style="text-align: center"><a-progress type="dashboard" :percent="33" /></a-col>
          </a-row>
        </a-card>
      </a-col>

      <!-- 热门搜索：G2 WordCloud -->
      <a-col :xl="6" :lg="12" style="margin-bottom: 24px">
        <a-card title="热门搜索" variant="borderless" :styles="{ body: { overflow: 'hidden' } }">
          <div ref="wordCloudEl" style="width: 100%; height: 162px" />
        </a-card>
      </a-col>

      <!-- 资源剩余：G2 Liquid -->
      <a-col :xl="6" :lg="12" style="margin-bottom: 24px">
        <a-card title="资源剩余" variant="borderless" :styles="{ body: { textAlign: 'center', fontSize: '0' } }">
          <div ref="liquidEl" style="width: 100%; height: 160px" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
.active-chart-grid { position: relative; }
.active-chart-grid p { position: absolute; font-size: 12px; color: rgba(0,0,0,0.45); margin: 0; }
.active-chart-grid p:first-child { top: -80px; }
.active-chart-grid p:last-child { top: -45px; }
.dashed-line { position: relative; top: -70px; left: -3px; height: 1px; }
.dashed-line.last { top: -36px; }
.dashed-line-inner {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  background-image: linear-gradient(to right, transparent 50%, #e9e9e9 50%); background-size: 6px;
}
.active-chart-legend { position: relative; height: 20px; margin-top: 8px; font-size: 0; line-height: 20px; }
.active-chart-legend span { display: inline-block; width: 33.33%; font-size: 12px; text-align: center; color: rgba(0,0,0,0.45); }
.active-chart-legend span:first-child { text-align: left; }
.active-chart-legend span:last-child { text-align: right; }
/* Tooltip — 白底风格（对标 Pro 原版） */
.map-tooltip {
  position: absolute;
  pointer-events: none;
  padding: 8px 12px;
  background: #fff;
  color: #334155;
  font-size: 12px;
  line-height: 1.6;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  opacity: 0;
  transition: opacity 0.2s;
  z-index: 10;
  white-space: nowrap;
}
</style>
