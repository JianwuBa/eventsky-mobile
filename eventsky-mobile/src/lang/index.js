import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zh from './zh'
import en from './en'
Vue.use(VueI18n)
    //设置语言环境
    //获取浏览器的语言
    //console.log(navigator.language)
    //浏览器的语言
const navLang = navigator.language
    //如果浏览器支持语言，则为浏览器的当前语言，否则返回false
let localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false

//浏览器当前语言 改为本地设置的语言
if (localLang == 'zh-CN') {
    localLang = zh
} else if (localLang == 'en-US') {
    localLang = en
}
//console.log(localLang)
//获取localStorage（本地存储）的语言状态，如果没有设置为默认的语言环境，如果浏览器默认也没有语言环境，设置为中文
let lang = localStorage.getItem('lang') || localLang || 'zh'
    //console.log(lang)
    //console.log(localLang)
    //localStorage存储最新的语言信息
localStorage.setItem('lange', lang)
const i18n = new VueI18n({
    locale: localStorage.getItem('lange') || 'zh',
    messages: {
        zh,
        en
    }
})
export default i18n