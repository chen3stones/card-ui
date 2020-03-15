import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import UserList from '../components/admin/AllUserList'
import Register from '../components/Register'
import UserIndex from '../components/UserIndex'
import Login from '../components/Login'
import UserInfo from '../components/UserInfo'
import AdviseMenu from '../components/advise/AdviseMenu'
import AdviseList from '../components/advise/AdviseList'
import AddAdvise from '../components/advise/AddAdvise'
import PurchaseList from '../components/goods/PurchaseList'
import GoodsRecords from '../components/goods/GoodsRecords'
import Logout from '../components/Logout'
import AdminIndex from '../components/admin/AdminIndex'
import AdminInfo from '../components/admin/AdminInfo'
import AdminAddUser from '../components/admin/AdminAddUser'
import AdminManageUser from '../components/admin/AdminManageUser'
import AdminAdviseList from '../components/admin/advise/AdminAdviseList'
import AdminGoodsList from '../components/admin/goods/AdminGoodsList'
import AdminGoodsInfo from '../components/admin/goods/AdminGoodsInfo'
import AdminAddGoods from '../components/admin/goods/AdminAddGoods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/userIndex',
      name: 'userIndex',
      component: UserIndex,
      children: [
        {
          path: '/user/info',
          name: 'userInfo',
          component: UserInfo
        },
        {
          path: '/goods/purchaseList',
          name: 'purchaseList',
          component: PurchaseList
        },
        {
          path: '/goods/records',
          name: 'goodsRecords',
          component: GoodsRecords
        },
        {
          path: '/advise/list',
          name: 'adviseList',
          component: AdviseList
        },
        {
          path: '/advise/add',
          name: 'addAdviseMenu',
          component: AddAdvise
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },

    /**
     * 管理员
     */
    {
      path: '/adminIndex',
      name: 'adminIndex',
      component: AdminIndex,
      children: [
        {
          path: '/admin/info',
          name: 'adminInfo',
          component: AdminInfo
        },
        {
          path: '/admin/user/list',
          name: 'userList',
          component: UserList
        },
        {
          path: '/admin/user/add',
          name: 'adminAddUser',
          component: AdminAddUser
        },
        {
          path: '/admin/user/manage',
          name: 'adminManagerUser',
          component: AdminManageUser
        },
        {
          path: '/admin/advise/list',
          name: 'adminAdviseList',
          component: AdminAdviseList
        },
        {
          path: '/admin/goods/list',
          name: 'adminGoodsList',
          component: AdminGoodsList
        },
        {
          path: '/admin/goods/info',
          name: 'adminGoodsInfo',
          component: AdminGoodsInfo
        },
        {
          path: '/admin/goods/add',
          name: 'adminAddGoods',
          component: AdminAddGoods
        }
      ]
    }
  ]
})
