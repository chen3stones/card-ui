<template>
    <!--销售统计-->
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="5" :offset="3">
          <el-switch
            style="display: block"
            v-model="dateFlag"
            active-color="#13ce66"
            inactive-color="#13ce66"
            inactive-text="快捷选择"
            active-text="自定义">
          </el-switch>
        </el-col>
        <el-col :span="10" :offset="2">
          <el-button-group v-model="time" v-if="!dateFlag">
            <el-button @click="getData(0,1)">今天</el-button>
            <el-button @click="getData(0,2)">近1月</el-button>
            <el-button @click="getData(0,3)">近半年</el-button>
            <el-button @click="getData(0,4)">近一年</el-button>
          </el-button-group>
        </el-col>
        <el-col :span="12" :offset="3" v-if="dateFlag">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <el-button @click="datePiker">搜索</el-button>
        </el-col>
      </el-row>
      <el-tabs stretch>
        <el-tab-pane label="图表">
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
        </el-tab-pane>
        <el-tab-pane label="数据">
          <span>123</span>
        </el-tab-pane>
      </el-tabs>


    </el-main>
  </el-container>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "SalesStatistics",
    data() {
      return{
        sTime: 0,
        eTime: 0,
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
        },
        dateRange: [],
        dateFlag: false
      }
    },
    mounted (){
      this.drawTotalMoneyHistogram()
      this.drawTotalRecordHistogram()
      this.drawAveragePriceListHistogram()
      this.drawTotalNumberHistogram()
    },
    methods : {
      getData(sTime,eTime) {
        axios.get('/api/shopping/statistics',
          {
            params: {
              'sTime' : sTime,
              'eTime' : eTime
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
            this.$message.error(result.data.message)
          }
        })
      },
      datePiker() {
        console.log(this.dateRange)
        if( this.dateRange.length !== 2) {
          this.$message.error('请选择正确的时间')
        } else {
          let timeList = this.dateRange
          let sTime = Date.parse(timeList[0])
          let eTime = Date.parse(timeList[1])
          this.getData(sTime,eTime)
        }
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
      inputDate(){
        this.dateFlag = !this.dateFlag
      }
    }
  }
</script>

<style scoped>

</style>
