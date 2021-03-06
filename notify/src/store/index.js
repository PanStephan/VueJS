import Vue from 'vue'
import Vuex from 'vuex'

import notify from './notify'
import errors from './errors'
import loaders from './loaders'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    loaders,
    errors,
    notify,
  }
})