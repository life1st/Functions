import Vue from 'vue'
import router from 'vue-router'

// const message = () => require('./MessageIndex')
// const loading = () => require('./LoadingIndex')
import message from './MessageIndex'
import loading from './LoadingIndex'


Vue.use(router)

export default new router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/message'
    },
    {
      path: '/message',
      component: message
    },
    {
      path: '/loading',
      component: loading
    }
  ]
})