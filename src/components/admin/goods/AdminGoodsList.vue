<template>
  <el-table :data="purchaseList">
    <el-table-column prop="goodName" label="商品名称"></el-table-column>
    <el-table-column prop="goodType" label="商品类别"></el-table-column>
    <el-table-column label="商品原价/折后价">
      <template slot-scope="scope">
        <span>{{scope.row.goodOriginPrice/100}}元 / {{scope.row.goodRealPrice/100}}元</span>
      </template>
    </el-table-column>
    <el-table-column prop="inDiscount" label="是否参加折扣">
      <template slot-scope="scope">
        <el-button v-if="scope.row.inDiscount" size="mini" type="success">是</el-button>
        <el-button v-else size="mini" type="danger">否</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="number" label="数量"></el-table-column>
    <el-table-column prop="id" label="管理">
      <template slot-scope="scope">
        <router-link :to="{path: '/admin/goods/info', query: {id: scope.row.id}}">
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
        axios.get('/api/goods/list')
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
  .inDiscount {
    background: #42b983;
  }
  .notInDiscount {
    background: crimson;
  }
</style>
