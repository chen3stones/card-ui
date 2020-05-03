<template>
  <div>
    <el-table :data="pagination.tableData" :row-class-name="tableRowClassName">
      <el-table-column label="ID" prop="id" width="50" align="center"></el-table-column>
      <el-table-column label="姓名" prop="name" width="100" align="center"></el-table-column>
      <el-table-column label="性别" prop="sex" align="center">
        <template slot-scope="scope">
          <span>{{sexEnum[scope.row.sex]}}</span>
        </template>
      </el-table-column>
      <el-table-column label="邮箱" prop="mail" align="center"></el-table-column>
      <el-table-column label="状态" prop="status" align="center"></el-table-column>
      <el-table-column label="积分" prop="score" align="center"></el-table-column>
      <el-table-column label="余额" prop="balance" align="center"></el-table-column>
      <el-table-column label="管理">
        <template slot-scope="scope">
          <router-link :to="{path: '/admin/user/manage', query: {id: scope.row.id}}">
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
<style>
  .el-table .delete {
    background: #FFFFFF;
  }

  .el-table .normal-row {
    background: #f0f9eb;
  }
</style>
<script>
import axios from 'axios'
import {getUserInfo} from '../../axios/api/UserApi'
export default {
  name: 'UserList',
  data () {
    return {
      pagination: {
        pageSize: 10,
        currentPage: 1,
        tableData: []
      },
      hidePage: true,
      sexEnum: {
          0: '男',
          1: '女'
      }
    }
  },
  created() {
    this.getUserList()
    this.pagination.currentPage = Number(localStorage.getItem('userPage')) || 1
  },
  beforeDestroy (){
    localStorage.setItem('userPage',this.pagination.currentPage)
  },
  methods: {
    getUserList: function () {
      axios.get('/api/user/list',
        {
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
        .catch(error => {
          console.log(error.response.status)
        })
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val
      this.getUserList()
    },
    tableRowClassName({row, rowIndex}) {
      if (row.status === '正常状态') {
        return 'normal-row'
      } else if(row.status === '拉黑') {
        return 'delete'
      }
      return ''
    }
  },

}
</script>
