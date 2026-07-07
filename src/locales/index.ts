import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'

export type LocaleType = 'zh-CN' | 'en-US'

const defaultLocale: LocaleType = (localStorage.getItem('locale') as LocaleType) || 'zh-CN'

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})

/** 切换语言 */
export function setLocale(locale: LocaleType) {
  ;(i18n.global.locale as any).value = locale
  localStorage.setItem('locale', locale)
  document.documentElement.setAttribute('lang', locale === 'zh-CN' ? 'zh' : 'en')
}

/** 获取当前语言 */
export function getLocale(): LocaleType {
  return (i18n.global.locale as any).value
}
