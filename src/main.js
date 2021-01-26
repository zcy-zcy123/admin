import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ele from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ele)

import api from './utils/network/index'
Vue.use(api)

import axios from 'axios'
Vue.prototype.$axios = axios

import MyComponent from './components/header.vue'
Vue.component('MyComponent', MyComponent)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
