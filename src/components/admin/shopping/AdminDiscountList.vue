<template>
  <div>
    <el-table :data="pagination.tableData">
      <el-table-column prop="discountName" label="方案名称" align="center"></el-table-column>
      <el-table-column prop="" label="种类">
        <template slot-scope="scope">
          <div>{{discountTypeEnum[scope.row.discountType]}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="goodsType" label="商品类别" align="center"></el-table-column>
      <el-table-column prop="" label="折扣方式" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.discountType === 0">满{{scope.row.amount}}元减{{scope.row.discount}}元</div>
          <div v-else>满{{scope.row.amount}}件{{scope.row.discount}}折</div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="有效时间" align="center">
        <template slot-scope="scope">
          <div>{{scope.row.stime}}</div>
          <div>{{scope.row.etime}}</div>
        </template>
      </el-table-column>
      <el-table-column prop="" label="状态" align="center">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status" type="success" size="mini">已启用</el-button>
          <el-button v-else type="danger" size="mini">未启用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="note" label="备注" align="center"></el-table-column>
      <el-table-column label="管理" align="center">
        <template slot-scope="scope">
          <router-link :to="{path: '/admin/discount/info', query: {id: scope.row.id}}">
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
        discountTypeEnum: {
          0 : '满减',
          1 : '满折',
          2 : '生日折扣'
        },
        discountStatusEnum: {
          0: '未启用',
          1: '已启用'
        }
      }
    },
    created() {
      this.getPurchaseList()
      this.pagination.currentPage = Number(localStorage.getItem('discountPage')) || 1
    },
    beforeDestroy (){
      localStorage.setItem('discountPage',this.pagination.currentPage)
    },
    methods: {
      getPurchaseList: function () {
        axios.get('/api/shopping/discount/list',{
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
