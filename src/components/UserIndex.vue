<template>
  <el-container>
    <el-header style="background: #409EFF">
      <h1>一卡通管理系统</h1>
    </el-header>
    <el-container style="height: 100%">
      <el-aside style="background: #99a9bf">
        <el-menu :unique-opened="true" router mode="vertical" :default-active="this.$router.path" @select="handleSelect"
                 el-menu-vertical-demo style="background: #99a9bf">
          <div v-for="(subMenu,i) in menuItem">
            <el-submenu v-if="subMenu.children && subMenu.children.length > 0" :index="subMenu.path">
              <template slot="title">
                <span>{{subMenu.name}}</span>
              </template>
              <el-menu-item v-for="(item,k) in subMenu.children" :key="k" :index="item.path">
                {{item.name}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-else="!subMenu.children" :key="i" :index="subMenu.path">
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
import axios from 'axios'
  export default {
    name: 'userIndex',
    data () {
      return{
        menuItem: [
          // {
          //   path: '/user/info',
          //   name: '个人信息'
          // },
          // {
          //   path: '/user/message/list',
          //   name: '我的消息'
          // },
          // {
          //   path: '/purchase/list',
          //   name: '消费信息'
          // },
          // {
          //   path: '/user/advise',
          //   name: '投诉与建议',
          //   children: [
          //     {
          //       path: '/advise/list',
          //       name: '我的建议'
          //     }, {
          //       path: '/advise/add',
          //       name: '我要反馈'
          //     }
          //   ]
          // }
        ]
      }
    },
    methods: {
      handleSelect(path) {
        this.$router.push(path)
      },
      getMenuItem() {
        axios.get('/api/system/user/menu/show')
          .then(result => {
            this.menuItem = result.data.data
            console.log(result.data.data)
          })
      }
    },
    created(){
      this.getMenuItem()
    }
  }
</script>

<style scoped>

</style>
