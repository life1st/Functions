import Vue from 'vue'
import App from './App.vue'

import router from './router'

Vue.config.productionTip = true

import message from '../message'
import loading from '../loading'

Vue.use(message)
Vue.use(loading)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
