// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAxios from 'vue-axios'
import axios from 'axios'
import UserIndex from './components/userIndex/UserIndex'

import UserList from './components/UserList'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueAxios, axios)

Vue.component('userList', UserList)
Vue.use(UserList)
Vue.component('user-menu', UserIndex)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
