<template>
    <div>
      <el-table :data="pagination.tableData">
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
        hidePage: true,
        //purchaseList: [],
        admin: true,
        to: ''
      }
    },
    created() {
      this.getPurchaseList()
      this.pagination.currentPage = Number(localStorage.getItem('purchasePage')) || 1
    },
    beforeDestroy (){
      localStorage.setItem('purchasePage',this.pagination.currentPage)
    },
    methods: {
      getPurchaseList: function () {
        let url = ''
        if(this.$route.path === '/admin/purchase/list') {
          this.admin = true
          url = '/api/goods/admin/purchaseList'
          this.to = '/admin/goods/records'
        }else{
          url = '/api/goods/user/purchaseList'
          this.to = '/goods/records'
        }
        axios.get(url,{
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

</style>
