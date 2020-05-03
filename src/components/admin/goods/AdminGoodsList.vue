<template>
  <div>

    <el-table :data="pagination.tableData">
      <el-table-column prop="goodName" label="商品名称" align="center"></el-table-column>
      <el-table-column prop="goodType" label="商品类别" align="center"></el-table-column>
      <el-table-column label="划线价/折后价" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.goodOriginPrice}}元 / {{scope.row.goodRealPrice}}元</span>
        </template>
      </el-table-column>
      <el-table-column prop="inDiscount" label="是否参加折扣" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.inDiscount" size="mini" type="success">是</el-button>
          <el-button v-else size="mini" type="danger">否</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="数量" align="center"></el-table-column>
      <el-table-column prop="id" label="管理" align="center">
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
    <div>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="pagination.currentPage"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        :hide-on-single-page = "hidePage"
        background>
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        pagination: {
          pageSize: 10,
          currentPage: 1,
          tableData: []
        },
        hidePage: true
      }
    },
    created() {
      this.getPurchaseList()
      this.pagination.currentPage = Number(localStorage.getItem('goodsPage')) || 1
    },
    beforeDestroy (){
      localStorage.setItem('goodsPage',this.pagination.currentPage)
    },
    methods: {
      getPurchaseList: function () {
        axios.get('/api/goods/admin/list',{
          params: {pageSize: this.pagination.pageSize,currentPage: this.pagination.currentPage}
        })
          .then(response => {
            if (response.data.code === 200) {
              this.pagination = response.data.data
              if(this.pagination.pageSize < this.pagination.total) {
                this.hidePage = false
              }
            } else {
              this.$message(response.data.message)
            }
          })
      },
      handleCurrentChange(val) {
        this.pagination.currentPage = val
        this.getPurchaseList()
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
