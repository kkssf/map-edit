import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/css/global.scss'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vuex from 'vuex'
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(Vuex)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
