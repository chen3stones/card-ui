<template>
  <el-container id="user-menu">
    <el-header>
      一卡通管理系统
    </el-header>
    <el-aside>
      <el-menu router mode="vertical">
        <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name" style="width: 200px">
          {{item.navItem}}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
    </el-main>
  </el-container>
</template>

<script>
/* eslint-disable */
  export default {
    name: 'user-menu',
    data () {
      return{
        navList: [
          {name: '/user/info', navItem: '个人信息'},
          {name: '/buyDetail', navItem: '消费信息'}
        ]
      }
    }
  }
</script>

<style scoped>

</style>
