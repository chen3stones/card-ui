import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import UserList from '../components/UserList'
import Register from '../components/Register'
import UserIndex from '../components/UserIndex'
import Login from '../components/Login'
import UserInfo from '../components/UserInfo'
import AdviseMenu from '../components/advise/AdviseMenu'
import AdviseList from '../components/advise/AdviseList'
import AddAdvise from '../components/advise/AddAdvise'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/index',
      name: 'index',
      component: UserIndex,
      children: [
        {
          path: '/user/list',
          name: 'userList',
          component: UserList
        },
        {
          path: '/user/info',
          name: 'userInfo',
          component: UserInfo
        },
        {
          path: '/advise/list',
          name: 'adviseList',
          component: AdviseList
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/advise/add',
      name: 'addAdviseMenu',
      component: AddAdvise
    },
    {
      path: '/advise/list',
      name: 'adviseList',
      component: AdviseList
    }
  ]
})
