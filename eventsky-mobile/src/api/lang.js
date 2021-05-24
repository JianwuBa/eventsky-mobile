import i18n from '@/lang/index'
export function langZh() {
    i18n.locale = 'zh'
    window.localStorage.setItem('lang', i18n.locale)
}
export function langEn() {
    i18n.locale = 'en'
    window.localStorage.setItem('lang', i18n.locale)
}