<template>
    <el-table :data="purchaseList">
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="name" label="店铺名称"></el-table-column>
      <el-table-column prop="number" label="购买数量"></el-table-column>
      <el-table-column prop="money" label="支付金额">
        <template slot-scope="scope">
          <div>{{scope.row.money/100}}元</div>
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注"></el-table-column>
      <el-table-column prop="id" label="详情">
        <template slot-scope="scope">
          <router-link :to="{path: '/goods/records', query: {id: scope.row.id}}">
            <el-button
              size="min">
              详情
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        purchaseList: []
      }
    },
    created () {
      this.getPurchaseList()
    },
    methods: {
      getPurchaseList: function () {
        axios.get('/api/goods/purchaseList')
        .then(response => {
          console.log(response)
          this.purchaseList = response.data.data
        })
      },
      goto: function (id) {
        console.log(id)

      }
    }
  }
</script>

<style scoped>

</style>
