<script setup lang="ts">
import { onMounted, onUnmounted, ref as vRef, nextTick } from 'vue'
import { Chart } from '@antv/g2'
import { PlusOutlined } from '@antdv-next/icons'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const router = useRouter()

const currentUser = {
  avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png',
  name: '吴彦祖',
  title: '交互专家',
  group: '蚂蚁集团－某某某事业群－某某平台部－某某技术部－UED',
}

const projectNotice = [
  { id: '1', title: 'Alipay', logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png', description: '那是一种内在的东西，他们到达不了，也无法触及的', member: '科学搬砖组', updatedAt: dayjs().subtract(5, 'hour').format() },
  { id: '2', title: 'Angular', logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png', description: '希望是一个好东西，也许是最好的，好东西是不会消亡的', member: '全组都是吴彦祖', updatedAt: dayjs().subtract(1, 'day').format() },
  { id: '3', title: 'Ant Design', logo: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png', description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆', member: '中二少女团', updatedAt: dayjs().subtract(2, 'day').format() },
  { id: '4', title: 'Ant Design Pro', logo: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png', description: '那时候我只会想自己想要什么，从不想自己拥有什么', member: '程序员日常', updatedAt: dayjs().subtract(3, 'day').format() },
  { id: '5', title: 'Bootstrap', logo: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png', description: '凛冬将至', member: '高逼格设计天团', updatedAt: dayjs().subtract(4, 'day').format() },
  { id: '6', title: 'Vue', logo: 'https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png', description: '生命就像一盒巧克力，结果往往出人意料', member: '骗你来学计算机', updatedAt: dayjs().subtract(5, 'day').format() },
]

const activities = [
  { id: '1', updatedAt: new Date().toISOString(), user: { name: '曲丽丽', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png' }, group: { name: '高逼格设计天团', link: '/' }, project: { name: '六月迭代', link: '/' }, template: '在 @{group} 新建项目 @{project}' },
  { id: '2', updatedAt: new Date().toISOString(), user: { name: '付小小', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/cnrhVkzwxjPwAaCfPbdc.png' }, group: { name: '高逼格设计天团', link: '/' }, project: { name: '六月迭代', link: '/' }, template: '在 @{group} 新建项目 @{project}' },
  { id: '3', updatedAt: new Date().toISOString(), user: { name: '林东东', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png' }, group: { name: '中二少女团', link: '/' }, project: { name: '六月迭代', link: '/' }, template: '在 @{group} 新建项目 @{project}' },
  { id: '4', updatedAt: new Date().toISOString(), user: { name: '周星星', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WhxKECPNujWoWEFNdnJE.png' }, project: { name: '5 月日常迭代', link: '/' }, template: '将 @{project} 更新至已发布状态' },
  { id: '5', updatedAt: new Date().toISOString(), user: { name: '朱偏右', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ubnKSIfAJTxIgXOKlciN.png' }, project: { name: '工程效能', link: '/' }, comment: { name: '留言', link: '/' }, template: '在 @{project} 发布了 @{comment}' },
  { id: '6', updatedAt: new Date().toISOString(), user: { name: '乐哥', avatar: 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png' }, group: { name: '程序员日常', link: '/' }, project: { name: '品牌迭代', link: '/' }, template: '在 @{group} 新建项目 @{project}' },
] as any[]

// 解析 template 模板 — 对标 Pro 原版的 renderActivities
function parseTemplate(item: any): Array<{ type: 'text' | 'link'; text: string; link?: string }> {
  const parts = item.template.split(/@\{([^{}]*)\}/gi)
  return parts.map((part: string) => {
    if (item[part]) {
      return { type: 'link' as const, text: item[part].name, link: item[part].link }
    }
    return { type: 'text' as const, text: part }
  })
}

const links = [
  { title: '操作一' }, { title: '操作二' }, { title: '操作三' },
  { title: '操作四' }, { title: '操作五' }, { title: '操作六' },
]

const radarData = [
  { name: '个人', label: '引用', value: 10 }, { name: '个人', label: '口碑', value: 8 },
  { name: '个人', label: '产量', value: 4 }, { name: '个人', label: '贡献', value: 5 },
  { name: '个人', label: '热度', value: 7 },
  { name: '团队', label: '引用', value: 3 }, { name: '团队', label: '口碑', value: 9 },
  { name: '团队', label: '产量', value: 6 }, { name: '团队', label: '贡献', value: 3 },
  { name: '团队', label: '热度', value: 1 },
  { name: '部门', label: '引用', value: 4 }, { name: '部门', label: '口碑', value: 1 },
  { name: '部门', label: '产量', value: 6 }, { name: '部门', label: '贡献', value: 5 },
  { name: '部门', label: '热度', value: 7 },
]

let radarChart: Chart | null = null
const radarRef = vRef<HTMLDivElement>()

onMounted(() => {
  nextTick(() => {
    if (!radarRef.value) return
    const chart = new Chart({ container: radarRef.value, autoFit: true, height: 343 })
    chart.coordinate({ type: 'polar' })
    chart.data(radarData)
    chart.area()
      .encode('x', 'label').encode('y', 'value').encode('color', 'name')
      .encode('shape', 'smooth').style('fillOpacity', 0.4)
    chart.line()
      .encode('x', 'label').encode('y', 'value').encode('color', 'name')
      .encode('shape', 'smooth')
    chart.axis('y', { gridStrokeOpacity: 0.5 })
    chart.legend('color', { position: 'bottom', layout: { justifyContent: 'center' } })
    chart.render()
    radarChart = chart
  })
})
onUnmounted(() => { radarChart?.destroy() })
</script>

<template>
  <div>
    <!-- ═══ PageHeader（无卡片，对标 Pro PageContainer header） ═══ -->
    <div class="page-header-wrapper">
      <div class="page-header-content">
        <div class="page-header-avatar">
          <a-avatar :size="72" :src="currentUser.avatar" />
        </div>
        <div class="page-header-text">
          <div class="page-header-title">早安，{{ currentUser.name }}，祝你开心每一天！</div>
          <div class="page-header-subtitle">{{ currentUser.title }} | {{ currentUser.group }}</div>
        </div>
        <div class="page-header-extra">
          <div class="stat-item">
            <a-statistic title="项目数" :value="56" />
          </div>
          <div class="stat-item">
            <a-statistic title="团队内排名" :value="8" suffix="/ 24" />
          </div>
          <div class="stat-item last">
            <a-statistic title="项目访问" :value="2223" />
          </div>
        </div>
      </div>
    </div>

    <a-row :gutter="24">
      <!-- ═══ 左栏 ═══ -->
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        <!-- 进行中的项目 -->
        <a-card variant="borderless" title="进行中的项目" class="project-list" style="margin-bottom: 24px">
          <template #extra><a @click="router.push('/')">全部项目</a></template>
          <div class="project-grid-container">
            <div v-for="item in projectNotice" :key="item.id" class="project-grid-item">
              <div class="project-card-title">
                <a-avatar :src="item.logo" :size="24" />
                <a>{{ item.title }}</a>
              </div>
              <div class="project-card-desc">{{ item.description }}</div>
              <div class="project-card-footer">
                <a>{{ item.member }}</a>
                <span class="datetime">{{ dayjs(item.updatedAt).fromNow() }}</span>
              </div>
            </div>
          </div>
        </a-card>

        <!-- 动态 -->
        <a-card variant="borderless" title="动态" :styles="{ body: { padding: 0 } }" style="margin-bottom: 24px">
          <div class="activities-list">
            <div v-for="item in activities" :key="item.id" class="activity-item">
              <a-avatar :src="item.user.avatar" :size="40" />
              <div class="activity-content">
                <div>
                  <a class="activity-username" :href="item.user.link || '/'">{{ item.user.name }}</a>
                  &nbsp;
                  <span class="activity-event">
                    <template v-for="(part, pi) in parseTemplate(item)" :key="pi">
                      <a v-if="part.type === 'link'" :href="part.link">{{ part.text }}</a>
                      <span v-else>{{ part.text }}</span>
                    </template>
                  </span>
                </div>
                <div class="datetime">{{ dayjs(item.updatedAt).fromNow() }}</div>
              </div>
            </div>
          </div>
        </a-card>
      </a-col>

      <!-- ═══ 右栏 ═══ -->
      <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
        <!-- 快速开始 -->
        <a-card variant="borderless" title="快速开始 / 便捷导航" style="margin-bottom: 24px">
          <div class="link-group">
            <a v-for="link in links" :key="link.title" class="link-item">{{ link.title }}</a>
            <a class="link-item link-add"><PlusOutlined /> 添加</a>
          </div>
        </a-card>

        <!-- XX 指数 -->
        <a-card variant="borderless" title="XX 指数" style="margin-bottom: 24px">
          <div ref="radarRef" style="width: 100%; height: 343px" />
        </a-card>

        <!-- 团队 -->
        <a-card variant="borderless" title="团队" :styles="{ body: { paddingTop: '12px', paddingBottom: '12px' } }">
          <div class="members">
            <a v-for="item in projectNotice" :key="item.id" class="member-item">
              <a-avatar :src="item.logo" :size="24" />
              <span class="member-name">{{ item.member.substring(0, 3) }}</span>
            </a>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<style scoped>
/* ═══ PageHeader（对标 Pro PageContainer content 区域） ═══ */
.page-header-wrapper {
  margin-bottom: 24px;
  padding: 16px 0 0;
}
.page-header-content {
  display: flex;
  align-items: center;
}
.page-header-avatar { flex: 0 1 72px; }
.page-header-text {
  position: relative; top: 4px;
  flex: 1 1 auto; margin-left: 24px;
  color: rgba(0,0,0,0.45); line-height: 22px;
}
.page-header-title {
  margin-bottom: 12px; color: rgba(0,0,0,0.88);
  font-weight: 500; font-size: 20px; line-height: 28px;
}
.page-header-subtitle { color: rgba(0,0,0,0.45); }
.page-header-extra {
  white-space: nowrap; display: flex;
}
.stat-item {
  position: relative; display: inline-block; padding: 0 32px;
}
.stat-item::after {
  content: ''; position: absolute; top: 8px; right: 0;
  width: 1px; height: 40px; background: rgba(5,5,5,0.06);
}
.stat-item.last { padding-right: 0; }
.stat-item.last::after { display: none; }

/* ═══ 项目列表 ═══ */
.project-grid-container {
  display: flex; flex-wrap: wrap;
}
.project-grid-item {
  width: 33.33%; padding: 24px 24px 8px;
  border-right: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0;
  box-sizing: border-box;
}
.project-grid-item:nth-child(3n) { border-right: none; }
.project-grid-item:nth-last-child(-n+3) { border-bottom: none; }
.project-card-title {
  font-size: 0; display: flex; align-items: center;
}
.project-card-title a {
  display: inline-block; height: 24px; margin-left: 12px;
  color: rgba(0,0,0,0.88); font-size: 14px; line-height: 24px;
  vertical-align: top;
}
.project-card-title a:hover { color: var(--ant-color-primary, #1677ff); }
.project-card-desc {
  height: 44px; overflow: hidden;
  color: rgba(0,0,0,0.45); font-size: 14px; line-height: 22px;
  margin-top: 8px;
}
.project-card-footer {
  display: flex; height: 20px; margin-top: 8px;
  font-size: 12px; line-height: 20px; gap: 4px;
}
.project-card-footer a {
  display: inline-block; flex: 1 1 0;
  color: rgba(0,0,0,0.45); overflow: hidden;
  white-space: nowrap; text-overflow: ellipsis;
}
.project-card-footer a:hover { color: var(--ant-color-primary, #1677ff); }
.datetime { flex: 0 0 auto; color: rgba(0,0,0,0.25); }

/* ═══ 动态列表 ═══ */
.activities-list { padding: 0; }
.activity-item {
  display: flex; align-items: flex-start; gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid rgba(5,5,5,0.06);
}
.activity-item:last-child { border-bottom: none; }
.activity-content { flex: 1; min-width: 0; }
.activity-username {
  color: rgba(0,0,0,0.88); font-weight: 500;
}
.activity-event { font-weight: normal; color: rgba(0,0,0,0.65); }
.activity-event a { color: rgba(0,0,0,0.88); }
.activity-event a:hover { color: var(--ant-color-primary, #1677ff); }

/* ═══ 快速导航 ═══ */
.link-group {
  display: flex; flex-wrap: wrap;
}
.link-item {
  width: 33.33%; height: 36px; line-height: 36px;
  font-size: 14px; color: rgba(0,0,0,0.65);
  transition: color 0.2s;
}
.link-item:hover { color: var(--ant-color-primary, #1677ff); }
.link-add { color: rgba(0,0,0,0.25); }

/* ═══ 团队 ═══ */
.members {
  display: flex; flex-wrap: wrap;
}
.member-item {
  width: 50%; display: flex; align-items: center;
  height: 24px; margin: 12px 0; gap: 12px;
  color: rgba(0,0,0,0.65); overflow: hidden;
  white-space: nowrap; text-overflow: ellipsis;
  transition: color 0.3s;
}
.member-item:hover { color: var(--ant-color-primary, #1677ff); }
.member-name {
  font-size: 14px; line-height: 24px; vertical-align: top;
}

@media screen and (max-width: 768px) {
  .page-header-content { display: block; }
  .page-header-text { margin-left: 0; margin-top: 12px; }
  .page-header-extra { margin-top: 16px; }
  .stat-item { padding: 0 16px; }
  .stat-item::after { display: none; }
  .project-grid-item { width: 50%; }
}
@media screen and (max-width: 480px) {
  .project-grid-item { width: 100%; }
}
</style>
