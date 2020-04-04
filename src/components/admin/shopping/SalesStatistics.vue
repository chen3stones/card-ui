<template>
    <!--销售统计-->
  <el-container>
<!--    <el-header>-->
<!--      <el-row align="center">-->
<!--        <el-col :span="5">商品总数</el-col>-->
<!--        <el-col :span="5">折扣总数</el-col>-->
<!--      </el-row>-->
<!--    </el-header>-->
    <el-main>
      <el-radio-group v-model="time">
        <el-radio-button :label="1">近1月</el-radio-button>
        <el-radio-button :label="2">近3月</el-radio-button>
        <el-radio-button :label="3">近一年</el-radio-button>
        <el-radio-button :label="0">汇总</el-radio-button>
      </el-radio-group>
      <el-button @click="test(1)">点击1</el-button>
      <el-button @click="test(2)">点击2</el-button>
      <el-button @click="test(3)">点击3</el-button>
      <el-button @click="test(4)">点击4</el-button>
    </el-main>
  </el-container>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "SalesStatistics",
    data() {
      return{
        time: 1
      }
    },
    methods : {
      test(time) {
        axios.get('/api/shopping/statistics',
          {
            params: {
              'sTime' : 0,
              'eTime' : time
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
