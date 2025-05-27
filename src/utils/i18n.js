import { createI18n } from 'vue-i18n';
import en from './lang/en.js';
import zh from './lang/zh.js';
import { includes } from 'lodash';

const messages = {
	en: en,
	zh: zh,
};

// 2. Create i18n instance with options
const i18n = createI18n({
	locale: localStorage.getItem('language') || 'en',
	fallbackLocale: 'en',
	messages,
	missingWarn: false,
});

export default i18n;

// 全局修改语言
export function changeLocale(locale) {
	const ALLOW_LOCALE_CODE = ['zh', 'en'];
	let resuleLocale = locale;
	if (!includes(ALLOW_LOCALE_CODE, locale)) {
		resuleLocale = 'en';
	}

	i18n.global.locale = resuleLocale; // 改变当前语言
	localStorage.setItem('language', resuleLocale);
}

// 获取翻译后的文本（此处是为了兼容旧版、推荐直接使用$t）
export function getTitle(val) {
 
	if (!val) {
		return '';
	}
	return i18n.global.t(val);
}
