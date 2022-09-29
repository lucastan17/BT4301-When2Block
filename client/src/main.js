import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store/store'
import Oruga from '@oruga-ui/oruga-next'
import '@oruga-ui/oruga-next/dist/oruga-full.css'

Vue.use(Oruga)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
