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
import AdminDiscountList from '../components/admin/shopping/AdminDiscountList'
import AdminDiscountInfo from '../components/admin/shopping/AdminDiscountInfo'
import AdminAddDiscount from '../components/admin/shopping/AdminAddDiscount'
import Buy from '../components/admin/shopping/Buy'
import SalesStatistics from '../components/admin/shopping/SalesStatistics'
import Echarts from '../components/Echarts'
import AdminAddMessage from '../components/admin/message/AdminAddMessage'
import AdminSendMessageList from '../components/admin/message/AdminSendMessageList'
import MessageList from '../components/message/MessageList'
import MessageInfo from '../components/message/MessageInfo'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
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
          path: '/purchase/list',
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
        },
        {
          path: '/user/message/list',
          name: 'messageList',
          component: MessageList
        },
        {
          path: '/user/message/info',
          name: 'adminMessageInfo',
          component: MessageInfo
        }
      ]
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

        /**
         * 用户管理
         */
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

        /**
         * 建议与意见
         */
        {
          path: '/admin/advise/list',
          name: 'adminAdviseList',
          component: AdminAdviseList
        },

        /**
         * 商品管理
         */
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
        },

        /**
         * 折扣管理
         */
        {
          path: '/admin/discount/list',
          name: 'discountList',
          component: AdminDiscountList
        },
        {
          path: '/admin/discount/info',
          name: 'discountIfo',
          component: AdminDiscountInfo
        },
        {
          path: '/admin/discount/add',
          name: 'adminAddDiscount',
          component: AdminAddDiscount
        },
        //销售管理
        {
          path: '/admin/purchase/list',
          name: 'purchaseList',
          component: PurchaseList
        },
        {
          path: '/admin/goods/records',
          name: 'goodsRecords',
          component: GoodsRecords
        },
        {
          path: '/admin/goods/statistics',
          name: 'SalesStatistics',
          component: SalesStatistics
        },
        /**
         * 消息通知
         */
        {
          path: '/admin/message/add',
          name: 'adminAddMessage',
          component: AdminAddMessage
        },
        {
          path: '/admin/message/list',
          name: 'adminMessageList',
          component: AdminSendMessageList
        },
        {
          path: '/message/list',
          name: 'messageList',
          component: MessageList
        },
        {
          path: '/admin/message/info',
          name: 'adminMessageInfo',
          component: MessageInfo
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/buy',
      name: 'buy',
      component: Buy
    },
    {
      path: '/test',
      name: 'test',
      component: Echarts
    }
  ]
})
