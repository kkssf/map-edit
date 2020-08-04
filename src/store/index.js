import Vue from 'vue'
import Vuex from 'vuex'
import area from './modules/area.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    area
  }
})
