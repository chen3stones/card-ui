<template>
    <el-table :data="purchaseList">
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="name" label="购买人" v-if="admin"></el-table-column>
      <el-table-column prop="name" label="店铺名称" v-else></el-table-column>
      <el-table-column prop="number" label="购买数量"></el-table-column>
      <el-table-column prop="money" label="支付金额">
        <template slot-scope="scope">
          <div>{{scope.row.money/100}}元</div>
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注"></el-table-column>
      <el-table-column prop="id" label="详情">
        <template slot-scope="scope">
          <router-link :to="{path: to, query: {id: scope.row.id}}">
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
        purchaseList: [],
        admin: false,
        to: ''
      }
    },
    created () {
      this.getPurchaseList()
    },
    methods: {
      getPurchaseList: function () {
        let url = ''
        if(this.$route.path === '/admin/purchase/list') {
          this.admin = true
          url = '/api/goods/admin/purchaseList'
          this.to = '/admin/goods/records'
        }else{
          url = '/api/goods/purchaseList'
          this.to = '/goods/records'
        }
        axios.get(url)
        .then(response => {
          this.purchaseList = response.data.data
        })
      }
    }
  }
</script>

<style scoped>

</style>
