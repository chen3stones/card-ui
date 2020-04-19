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
      <el-button-group v-model="time">
        <el-button @click="getData(1)">今天</el-button>
        <el-button @click="getData(2)">近1月</el-button>
        <el-button @click="getData(3)">近半年</el-button>
        <el-button @click="getData(4)">汇总</el-button>
      </el-button-group>
      <el-row>
        <el-col :offset="2" :span="8">
          <div id="totalMoneyHistogram" :style="{width: '500px', height: '280px'}"></div>
        </el-col>
        <el-col :span="8" :offset="3">
          <div id="totalRecordHistogram" :style="{width: '500px', height: '280px'}"></div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="2" :span="8">
          <div id="averagePriceListHistogram" :style="{width: '500px', height: '280px'}"></div>
        </el-col>
        <el-col :span="8" :offset="3">
          <div id="totalGoodsNumberHistogram" :style="{width: '500px', height: '280px'}"></div>
        </el-col>
      </el-row>

    </el-main>
  </el-container>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "SalesStatistics",
    data() {
      return{
        time: 1,
        statisticsView : {
          //日期
          dateList: [],
          //总金额
          totalMoneyList: [],
          //订单总数
          totalRecordList: [],
          //订单均价
          averagePriceList: [],
          //销售商品总数
          totalGoodsNumberList: []
        }
      }
    },
    mounted (){
      this.drawTotalMoneyHistogram()
      this.drawTotalRecordHistogram()
      this.drawAveragePriceListHistogram()
      this.drawTotalNumberHistogram()
    },
    methods : {
      getData(time) {
        axios.get('/api/shopping/statistics',
          {
            params: {
              'sTime' : 0,
              'eTime' : time
            }
          })
        .then(result => {
          if(result.data.code === 200) {
            this.statisticsView = result.data.data
            console.log(this.statisticsView)
            this.drawTotalMoneyHistogram()
            this.drawTotalRecordHistogram()
            this.drawAveragePriceListHistogram()
            this.drawTotalNumberHistogram()
          }else{
            this.$message.error(result.message)
          }
        })
      },
      drawTotalMoneyHistogram(){
        //初始化echarts实例
        var totalMoneyHistogram = this.$echarts.init(document.getElementById("totalMoneyHistogram"))
        let data = this.statisticsView
        // 初始 option
        let option = {
          title: {
            text: '销售额'
          },
          tooltip: {},
          legend: {
            data:['销量']
          },
          xAxis: {
            data: data.dateList
          },
          yAxis: {},
          series: [{
            name: '销售额',
            type: 'bar',
            data: data.totalMoneyList
          }]
        };
        totalMoneyHistogram.setOption(option)
      },
      drawTotalRecordHistogram() {
        //初始化echarts实例
        var totalRecordHistogram = this.$echarts.init(document.getElementById("totalRecordHistogram"))
        let data = this.statisticsView
        // 初始 option
        let option = {
          title: {
            text: '订单数'
          },
          tooltip: {},
          legend: {
            data:['订单数']
          },
          xAxis: {
            data: data.dateList
          },
          yAxis: {},
          series: [{
            name: '订单数',
            type: 'bar',
            data: data.totalRecordList
          }]
        };
        totalRecordHistogram.setOption(option)
      },
      drawAveragePriceListHistogram() {
        //初始化echarts实例
        var averagePriceListHistogram = this.$echarts.init(document.getElementById("averagePriceListHistogram"))
        let data = this.statisticsView
        // 初始 option
        let option = {
          title: {
            text: '订单均价'
          },
          tooltip: {},
          legend: {
            data:['订单均价']
          },
          xAxis: {
            data: data.dateList
          },
          yAxis: {},
          series: [{
            name: '订单均价',
            type: 'bar',
            data: data.averagePriceList
          }]
        };
        averagePriceListHistogram.setOption(option)
      },
      drawTotalNumberHistogram() {
        //初始化echarts实例
        var totalNumberHistogram = this.$echarts.init(document.getElementById("totalGoodsNumberHistogram"))
        let data = this.statisticsView
        // 初始 option
        let option = {
          title: {
            text: '商品数'
          },
          tooltip: {},
          legend: {
            data:['商品数']
          },
          xAxis: {
            data: data.dateList
          },
          yAxis: {},
          series: [{
            name: '商品数',
            type: 'bar',
            data: data.totalGoodsNumberList
          }]
        };
        totalNumberHistogram.setOption(option)
      },
    }
  }
</script>

<style scoped>

</style>
