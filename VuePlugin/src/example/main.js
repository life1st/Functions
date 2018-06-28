import Vue from 'vue'
import App from './App.vue'

import router from './router'

import message from '../message'
import loading from '../loading'

Vue.config.productionTip = true

Vue.use(message)
Vue.use(loading)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
