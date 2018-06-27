import Vue from 'vue'
import App from './App.vue'

import message from '../message/index'
Vue.use(message)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
