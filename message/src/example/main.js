import Vue from 'vue'
import App from './App.vue'

import router from './router'

import message from '../message/index'
Vue.use(message)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
