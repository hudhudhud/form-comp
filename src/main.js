import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import MintUI from 'mint-ui'
import {Indicator} from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(MintUI)

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$Indicator=Indicator
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
