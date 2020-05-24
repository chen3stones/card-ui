<template>
  <div>
    <el-row type="flex" justify="center">
      <el-col :span="15">
        <el-table :data="records"  show-summary :summary-method="getSummaries" border>
          <el-table-column prop="goodName" label="商品名称" align="center"></el-table-column>
          <el-table-column prop="number" label="商品数量" align="center">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.number" size="small" :min="1" :max="goodMap.get(scope.row.id).number"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="goodRealPrice" label="商品价格" align="center">
            <template slot-scope="slot">
              {{slot.row.goodRealPrice * slot.row.number}}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="deleteGoods(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="15">
        <el-select v-model="data" placeholder="商品名称" style="width: 550px">
          <el-option
            v-for="(item,index) in goods"
            :key="index"
            :label="item.goodName"
            :value="item.id"
            :disabled="item.number <= 0">
            <span style="float: left">{{ item.goodName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">

              <span v-if="item.inDiscount" style="background: #22DD48; border-radius: 5px"><span style="color: #F7F7F7; margin: 8px">参与折扣</span></span>
              共({{ item.number }})个</span>
          </el-option>
        </el-select>
        <el-button @click="addGoods">增加</el-button>
        <el-button @click="readyBuy" type="primary">结算</el-button>
      </el-col>
    </el-row>
    <el-dialog title="结算信息" :visible.sync="visible">
      <el-container>
        <el-main>
          <strong>商品信息</strong>
          <el-table :data="records" width="30%">
            <el-table-column property="goodName" label="商品名称" width="150" align="center"></el-table-column>
            <el-table-column property="number" label="商品数量" width="200" align="center"></el-table-column>
            <el-table-column property="goodRealPrice" label="商品价格" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.number * scope.row.goodRealPrice}}元</span>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="discounts.length > 0">
            <br><br>
            <strong>折扣信息</strong>
            <el-table align="right" :data="discounts">
              <el-table-column property="discountName" label="折扣名称" align="center">
                <template slot-scope="scope" slot="header">
                  <span>折扣名称</span>
                  <el-tooltip effect="dark" content="以下顺序即为计算时的顺序" placement="top">
                    <i class="el-icon-question"></i>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column label="详情" align="center">
                <template slot-scope="scope">
                  <div v-if="scope.row.discountType === 0">满{{scope.row.amount/100}}元减{{scope.row.discount/100}}元</div>
                  <div v-else>满{{scope.row.amount}}件{{scope.row.discount}}折</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
        <el-footer>
          <el-row>
            <el-col>
              <div>原价:{{shoppingRecordView.totalMoney/100}}元</div>
            </el-col>
            <el-col>
              <div>支付价格:{{shoppingRecordView.realMoney/100}}元</div>
            </el-col>
          </el-row>
        </el-footer>
      </el-container>
      <el-button @click="buy">提交</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import util from '../../js/util'
  export default {
    data() {
      return{
        data: '',
        records:[],
        goods: [],
        goodMap : new Map(),
        shoppingRecordView: {
          buyer: 0,
          seller: 0,
          goodsList: [],
          discount: [],
          totalMoney: 0.0,
          realMoney: 0.0
        },
        discounts: [],
        visible: false
      }
    },
    created () {
      this.getAllGoods()
    },
    methods: {
      readyBuy() {
        this.visible = true
        if(this.records.length <= 0) {
          return
        }
        this.shoppingRecordView.goodsList = []
        for(let tmp = 0; tmp < this.records.length; tmp++) {
          let good = {'id':this.records[tmp].id,'num':this.records[tmp].number}
          this.shoppingRecordView.goodsList.push(good)
        }
        this.shoppingRecordView.buyer = 1
        console.log(this.shoppingRecordView.goodsList,'records')
        axios.post("/api/shopping/readyBuy",this.shoppingRecordView)
        .then(result => {
          console.log(result)
          if(result.data.code === 200) {
            this.discounts = result.data.data.discountList
            this.shoppingRecordView.realMoney = result.data.data.realMoney
            this.shoppingRecordView.totalMoney = result.data.data.totalMoney
          }else{
            if(result.data.message) {
              this.$message.error(result.data.message)
            }else if(result.data.data) {
              this.$message.error(result.data.data)
            }else{
              this.$message.error('系统开小差啦')
            }
          }
        })
      },
      buy(){
        console.log(this.shoppingRecordView.goodsList,'records1')
        if(this.shoppingRecordView.goodsList.length !== 0) {
          axios.post("/api/shopping/buy",this.shoppingRecordView)
            .then(result => {
              console.log(result)
              if(result.data.code === 200) {
                  this.$message.success(result.data.data)
              }else{
                if(result.data.message) {
                  this.$message.error(result.data.message)
                }else if(result.data.data) {
                  this.$message.error(result.data.data)
                }else{
                  this.$message.error('系统开小差啦')
                }
              }
            })
          .catch(error => {
            this.$message.error('系统开小差啦')
          })
        }
      },
      getAllGoods() {
        axios.get('/api/goods/admin/list',
          {params: {pageSize: 0,currentPage: 0}})
        .then(result => {
          this.goods = result.data.data.tableData
          //this.records = this.goods
          for(let i = 0; i < result.data.data.tableData.length;i ++) {
            let tmp = result.data.data.tableData[i]
            this.goodMap.set(tmp.id,tmp)
          }
        })
      },
      addGoods() {
        if(this.data) {
          console.log(this.goodMap)
          if(this.goodMap.has(this.data)) {
            let index = this.getIndex(this.records,this.data)
            //已经加到了列表中
            if(index > -1) {
              if(this.records[index].number < this.goodMap.get(this.data).number) {
                this.records[index].number++
              }else {
                this.$message.error('数量已经达到上限')
              }
            }else{
              let data = util.deepClone(this.goodMap.get(this.data))
              data.number = 1
              this.records.push(data)
            }
            console.log(this.records)
          }
        }
      },
      deleteGoods(good) {
        let index = this.records.indexOf(good)
        if(index > -1) {
          this.records.splice(index,1)
        }
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '合计';
          } else if (index === 1) {
            if(!sums[index]) {
              sums[index] = 0
            }
            for (let i in data) {
              sums[index] += Number(data[i].number)
            }
          } else if (index === 2) {
            if(!sums[index]) {
              sums[index] = 0
            }
            for (let d in data) {
              sums[index] += (data[d].number * data[d].goodRealPrice)
            }
          } else {
            return ''
          }
        },0)
        return sums
      },
      getIndex(records,data) {
        for(let i = 0;i < records.length;i++) {
          if(data === records[i].id) {
            return i
          }
        }
        return -1
      }
    }
  }
</script>

<style scoped>

</style>
