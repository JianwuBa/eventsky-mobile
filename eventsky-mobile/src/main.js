import Vue from 'vue'
import App from './App.vue'
//reset css
import './styles/reset.css'
import './styles/border.css'

//element UI
import elementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//国际化
import i18n from './lang/index.js'
//axios
import axios from "axios";
//router
import router from './router/index'
Vue.prototype.$http = axios;
//引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.use(elementUi)
Vue.config.productionTip = false
    //直播引入jquery
import $ from 'jquery'
Vue.prototype.$ = $;
new Vue({
    render: h => h(App),
    i18n,
    router
}).$mount('#app')