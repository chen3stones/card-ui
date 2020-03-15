<template>
  <div>
    <el-table :data="tableData" :row-class-name="tableRowClassName">
      <el-table-column label="ID" prop="id" width="50"></el-table-column>
      <el-table-column label="姓名" prop="name" width="100"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
      <el-table-column label="积分" prop="score"></el-table-column>
      <el-table-column label="余额" prop="balance"></el-table-column>
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
export default {
  name: 'UserList',
  data () {
    return {
      tableData: []
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    getUserList: function () {
      axios.get('/api/user/list')
        .then(response => {
          if (response.data.code === 200) {
            this.tableData = response.data.data
          } else {
            this.$message(response.data.message)
          }
        })
        .catch(error => {
          this.$message(error)
        })
    },
    tableRowClassName({row, rowIndex}) {
      if (row.status === '正常状态') {
        return 'normal-row'
      } else if(row.status === '拉黑') {
        return 'delete'
      }
      return ''
    }
  }
}
</script>
