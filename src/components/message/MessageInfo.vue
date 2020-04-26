<template>
  <el-container>
    <el-page-header content="消息" title="返回" @back="$router.push('/message/list')">
    </el-page-header>
    <el-header>
      <el-row type="center">
        <h2 style="font-family:'微软雅黑',serif">{{info.title}}</h2>
      </el-row>
      <el-row type="center">
        <span style="color: #909399;font-size:15px">{{info.sendTime}}</span>
      </el-row>
      <el-row style="margin-top: 40px" type="">
        <span>{{info.content}}</span>
      </el-row>
    </el-header>
  </el-container>

</template>

<script>
  import axios from 'axios'
  export default {
    name: "MessageInfo",
    data() {
      return{
        id: 0,
        info: {}
      }
    },
    created(){
      this.id = this.$route.query.id
      this.read()
    },
    methods: {
      read() {
        axios.get('/api/message/user/info',
          {params: {'id':this.id}})
        .then(result => {
          this.info = result.data.data
          console.log(this.info)
        })
      }
    }
  }
</script>

<style scoped>

</style>
