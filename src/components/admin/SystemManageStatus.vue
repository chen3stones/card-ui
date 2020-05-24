<template>
  <el-tabs stretch>
    <el-tab-pane label="管理员">
      <el-table  row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :data="adminList">
        <el-table-column label="功能名称" prop="name" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.show" size="mini" type="success" @click="changeStatus(scope.row.id)">已启用</el-button>
            <el-button v-else size="mini" type="danger" @click="changeStatus(scope.row.id)">未启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="用户">
      <el-table  row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" :data="userList">
        <el-table-column label="功能名称" prop="name" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.show" size="mini" type="success" @click="changeStatus(scope.row.id)">已启用</el-button>
            <el-button v-else size="mini" type="danger" @click="changeStatus(scope.row.id)">未启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "SystemManageStatus",
    data() {
      return {
        adminList: [],
        userList: []
      }
    },
    methods: {
      getList() {
        axios.get('/api/system/admin/menu/all')
        .then(result => {
          this.adminList = result.data.data
        })
        axios.get('/api/system/user/menu/all')
        .then(result => {
          this.userList = result.data.data
        })
      },
      changeStatus(id) {
        axios.get('/api/system/admin/menu/change',
          {params: {id: id}
          }).then(result => {
            if(result.data.code === 200) {
              this.$message.success('修改成功')
              this.getList()
            }else{
              this.$message.error('修改失败')
            }
        })
      }
    },
    created(){
      this.getList()
    }
  }
</script>

<style scoped>

</style>
