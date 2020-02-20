import Vue from 'vue'
import App from './App'

import store from './store'
import './assets/scss/main.scss'

Vue.config.devtools = true

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
