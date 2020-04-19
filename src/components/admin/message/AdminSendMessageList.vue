<template>
    <el-table :data="list">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form inline>
            <el-row>
              <el-form-item label="标题:">
                <span>{{props.row.title}}</span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="发送时间:">
                <span>{{props.row.sendTime}}</span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="用户:">
                <span>{{props.row.userGroup}}</span>
              </el-form-item>
            </el-row>
            <el-row>
            </el-row>
            <el-row>
              <el-form-item label="内容:">
                <span>{{props.row.content}}</span>
              </el-form-item>
            </el-row>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="标题" prop="title"></el-table-column>
      <el-table-column label="时间" prop="sendTime"></el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-button @click="deleteMessage(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "AdminSendMessageList",
    data() {
      return {
        list: []
      }
    },
    methods: {
      getMessageList() {
        axios.get("/api/message/admin/list")
        .then(result => {
          if(result.data.code === 200) {
            this.list = result.data.data
          }else{
            this.$message.error(this.data.message)
          }
        })
      },
      deleteMessage(id) {
        axios.get('/api/message/admin/delete',
          {
            params: {
              "id":id
            }
          })
        .then(result => {
          if(result.data.code === 200 && result.data.data === true) {
            this.$message.success('删除成功')
            this.getMessageList()
          }else{
            this.$message.error('删除失败')
          }
        })
      }
    },
    created() {
      this.getMessageList()
    }
  }
</script>

<style scoped>
  .label {
    width: 190px;
    color: #409EFF;
  }
  .not-processed {
    background: #42b983;
  }
  .re-label {
    width: 190px;
    color: #42b983;
  }
  .big-re-label {
    width: 360px;
    color: #42b983;
  }
  .el-table .already-processed {
    background: #f0f9eb;
  }
</style>
