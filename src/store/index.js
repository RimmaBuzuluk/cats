import Vue from 'vue'
import Vuex from 'vuex'
import theme from './theme'
import facts from './facts'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    theme,
    facts
  }
})
