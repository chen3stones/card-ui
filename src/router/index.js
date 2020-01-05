import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserList from '@/components/UserList'
import Register from '../components/Register'
import UserIndex from '../components/userIndex/UserIndex'
import Login from '../components/Login'
import UserInfo from '../components/UserInfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/user/list',
      name: 'userList',
      component: UserList
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/index',
      name: 'index',
      component: UserIndex
    },
    {
      path: '/user/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user/info',
      name: 'userInfo',
      component: UserInfo
    }
  ]
})
