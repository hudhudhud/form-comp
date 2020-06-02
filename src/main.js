import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import MintUI from 'mint-ui'
import {Indicator} from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'font-awesome/css/font-awesome.min.css'
import { Input,Button, Dialog,Checkbox,Collapse,CollapseItem,Tag } from 'element-ui';
Vue.use(MintUI)

Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(Dialog.name, Dialog);
Vue.component(Checkbox.name, Checkbox);
Vue.component(Collapse.name, Collapse);
Vue.component(CollapseItem.name, CollapseItem);
Vue.component(Tag.name, Tag);

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$Indicator=Indicator
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
