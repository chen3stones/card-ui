<template>
  <div  style="background: #e5e9f2; height: 100%">
    <el-container>
      <el-header style="background: #409EFF" height="80px">

      </el-header>
      <el-container style="height: 100%">
        <el-aside style="background: #99a9bf">
          <el-image
            style="width: 100px; height: 100px"
            src="https://t41.pixhost.to/thumbs/419/146350041_2.jpg"
          ></el-image>
          <el-menu :unique-opened="false" router mode="vertical" default-active="0" @select="handleSelect"
                   el-menu-vertical-demo style="background: #99a9bf">
            <div v-for="(subMenu,i) in menuItem">
              <el-submenu v-if="subMenu.children" :index="i+''">
                <template slot="title">
                  <span>{{subMenu.name}}</span>
                </template>
                <el-menu-item v-for="(item,k) in subMenu.children" :key="k" :index="item.path">
                  {{item.name}}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-if="!subMenu.children" :key="i" :index="subMenu.path">
                {{subMenu.name}}
              </el-menu-item>
            </div>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
  /* eslint-disable */
  export default {
    name: 'AdminIndex',
    data () {
      return{
        menuItem: [
          {
            path: '/admin/info',
            name: '个人信息'
          },
          {
            path: '',
            name: '消息管理',
            children: [
              {
                path: '/admin/message/add',
                name: '发送消息'
              },
              {
                path: '/admin/message/list',
                name: '发送的消息'
              },
              {
                path: '/message/list',
                name: '我的消息'
              }
            ]
          },
          {
            path: '',
            name: '用户管理',
            children: [
              {
                path: '/admin/user/list',
                name: '所有用户'
              },
              {
                path: '/admin/user/add',
                name: '新增用户'
              }
            ]
          },
          {
            path: '',
            name: '销售管理',
            children: [
              {
                path: '/admin/purchase/list',
                name: '销售记录'
              },
              {
                path: '/admin/goods/statistics',
                name: '销售统计'
              }
            ]
          },
          {
            path: '',
            name: '商品管理',
            children: [
              {
                path: '/admin/goods/list',
                name: '所有商品'
              },
              {
                path: '/admin/goods/add',
                name: '增加商品'
              },
            ]
          },
          {
            path: '',
            name: '促销管理',
            children: [
              {
                path: '/admin/discount/list',
                name: '促销方案'
              },
              {
                path: '/admin/discount/add',
                name: '新增方案'
              }
            ]
          },
          {
            path: '',
            name: '投诉与建议',
            children: [
              {
                path: '/admin/advise/list',
                name: '收到的建议'
              }, {
                path: '',
                name: '调整反馈'
              }
            ]
          }
        ]
      }
    },
    methods: {
      handleSelect(path) {
        this.$router.push(path)
      }
    }
  }
</script>

<style scoped>

</style>
