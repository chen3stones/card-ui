<template>
  <el-container>
    <el-header>一卡通</el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :unique-opened="true" router mode="vertical" :default-active="this.$router.path" @select="handleSelect"
                 el-menu-vertical-demo default-active="/user/info">
          <div v-for="(subMenu,i) in menuItem">
            <el-submenu v-if="subMenu.children" :index="subMenu.path">
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

</template>

<script>
/* eslint-disable */
  export default {
    name: 'userIndex',
    data () {
      return{
        menuItem: [
          {
            path: '/user/info',
            name: '个人信息'
          },
          {
            path: '/goods/purchaseList',
            name: '消费信息'
          },
          {
            path: '/user/advise',
            name: '投诉与建议',
            children: [
              {
                path: '/advise/list',
                name: '我的建议'
              }, {
                path: '/advise/add',
                name: '我要反馈'
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
