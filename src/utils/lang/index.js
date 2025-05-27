// index.ts
import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

const messages = {
  en,
  zh,
}
const language = 'en' // (navigator.language || 'en').toLocaleLowerCase() // 这是获取浏览器的语言

const i18n = createI18n({
  locale: localStorage.getItem('lang') || language.split('-')[0] || 'en', // 首先从缓存里拿，没有的话就用浏览器语言，这里可用本地存储进行切换
  fallbackLocale: 'en', // 设置备用语言
  messages,
  legacy: false,
  globalInjection: true,
})

export default i18n

// 全局修改语言
export function changeLocale(locale) {
  const ALLOW_LOCALE_CODE = ['zh', 'en']
  let resuleLocale = locale
  if (!includes(ALLOW_LOCALE_CODE, locale)) {
    resuleLocale = 'en'
  }

  i18n.global.locale = resuleLocale // 改变当前语言
  localStorage.setItem('language', resuleLocale)
}

// 获取翻译后的文本（此处是为了兼容旧版、推荐直接使用$t）
export function getTitle(val) {
  if (!val) {
    return ''
  }
  return i18n.global.t(val)
}
