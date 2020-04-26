<template>
    <el-table :data="messageList" :row-class-name="tableRowClassName">
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="时间" prop="sendTime"></el-table-column>
      <el-table-column prop="id" label="管理" align="center">
        <template slot-scope="scope">
          <router-link :to="{path: '/admin/message/info', query: {id: scope.row.id}}">
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
    name: "MessageList",
    data(){
      return{
        messageList: []
      }
    },
    methods: {
      getMessageList() {
        axios.get('/api/message/list')
          .then(result => {
            if(result.data.code === 200) {
              this.messageList = result.data.data
            }else{
              this.$message.error(result.data.message)
            }
        })
      },
      tableRowClassName({row, rowIndex}) {
        console.log(row.status)
        if (row.status === 0) {
          return ''
        } else if(row.status === 1) {
          return 'read'
        }
        return ''
      }
    },
    created() {
      this.getMessageList()
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
