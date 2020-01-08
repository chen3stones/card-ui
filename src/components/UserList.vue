<template>
  <div>
    <el-table :data="tableData" stripe>
      <el-table-column label="ID" prop="id" width="50"></el-table-column>
      <el-table-column label="姓名" prop="name" width="100"></el-table-column>
      <el-table-column label="性别" prop="sex"></el-table-column>
      <el-table-column label="电话" prop="phone"></el-table-column>
      <el-table-column label="生日" prop="birthday"></el-table-column>
      <el-table-column label="积分" prop="score"></el-table-column>
      <el-table-column label="余额" prop="balance"></el-table-column>
    </el-table>
  </div>
</template>
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
    }
  }
}

</script>
