<template>
  <div>
    <el-table :data="pagination.tableData" :row-class-name="tableRowClassName">
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="时间" prop="sendTime"></el-table-column>
      <el-table-column prop="id" label="管理" align="center">
        <template slot-scope="scope">
          <router-link :to="{path: path, query: {id: scope.row.id,page: pagination.pageSize}}">
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
    name: "MessageList",
    data(){
      return{
        pagination: {
          pageSize: 10,
          currentPage: 1,
          tableData: []
        },
        hidePage: true,
        path: ''
      }
    },
    methods: {
      getMessageList() {
        axios.get('/api/message/list',{
          params: {pageSize: this.pagination.pageSize,currentPage: this.pagination.currentPage}}
        ).then(result => {
            if(result.data.code === 200) {
              this.pagination = result.data.data
              if(this.pagination.pageSize < this.pagination.total) {
                this.hidePage = false
              }
            }else{
              this.$message.error(result.data.message)
            }
        })
      },
      handleCurrentChange(val) {
        this.pagination.currentPage = val
        this.getMessageList()
      },
      tableRowClassName({row, rowIndex}) {
        if (row.status === 0) {
          return ''
        } else if(row.status === 1) {
          return 'read'
        }
        return ''
      }
    },
    created() {
      this.pagination.currentPage = Number(localStorage.getItem('messagePage')) || 1
      this.getMessageList()
      if(this.$route.path === '/admin/message/list') {
        this.path = '/admin/message/info'
      }else{
        this.path = '/user/message/info'
      }
    },
    beforeDestroy (){
      localStorage.setItem('messagePage',this.pagination.currentPage)
    }
  }
</script>

<style>
  .el-table .read {
    background: #F2F6FC;
  }
  .el-table .normal-row {
    background: #f0f9eb;
  }
</style>
