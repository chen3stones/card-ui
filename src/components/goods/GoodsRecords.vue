<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/goods/purchaseList'}">消费列表</el-breadcrumb-item>
        <el-breadcrumb-item >消费详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-table :data="goodRecords" :header-cell-style="rowClass" :cell-style="rowClass">
        <el-table-column prop="id" label="商品Id"></el-table-column>
        <el-table-column prop="goodName" label="商品名称"></el-table-column>
        <el-table-column prop="num" label="商品数量"></el-table-column>
        <el-table-column label="商品价格">
          <template slot-scope="scope">
            <span>{{scope.row.originMoney/100}}元</span>
          </template>
        </el-table-column>
        <el-table-column label="支付金额">
          <template slot-scope="scope">
            <span>{{scope.row.realMoney/100}}元</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'GoodsRecords',
    data() {
      return {
        goodRecords: []
      }
    },
    created () {
      this.getGoodsRecords()
    },
    methods: {
      getGoodsRecords: function () {
        let id = this.$route.params.id
        axios.get('/api/goods/records',
          {params: {'id':1}})
        .then(response => {
          console.log(response.data.data)
          this.goodRecords = response.data.data
        })
      },
      headClass: function () {
        return 'text-align: center;background:#eef1f6;'
      },
      rowClass: function () {
        return 'text-align: center;'
      }
    }
  }
</script>

<style scoped>
</style>
