<template>
  <el-form :model="message" ref="goods" size="medium" label-position="right" label-width="100px">
    <el-row>
        <el-col>
          <el-form-item prop="title" label="标题">
            <el-input v-model="message.title" placeholder="标题" style="width: 350px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    <el-row>
      <el-col>
        <el-form-item prop="type" label="用户">
          <el-select v-model="message.userGroup" :placeholder="a" style="width: 350px" multiple filterable>
            <el-option
              v-for="(item,index) in pagination.tableData"
              :key="index"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item prop="goodOriginPrice" label="消息内容">
          <el-input placeholder="内容" v-model="message.content" style="width: 350px;" type="textarea">
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item>
          <el-button @click="sendMessage" type="primary">发送消息</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        pagination: {
          pageSize: 0,
          currentPage: 0,
          tableData: []
        },
        message: {
          title: '',
          content: '',
          userGroup: ''
        },
        userList: []
      }
    },
    methods: {
      getAllUser() {
        axios.get("/api/user/list",{
          params: {pageSize: this.pagination.pageSize,currentPage: this.pagination.currentPage}
        })
          .then(result => {
            if(result.data.code === 200) {
              console.log(result.data.data)
              this.pagination = result.data.data
              //this.userList = result.data.data.tableData
            } else {
              this.$message.error("获取用户列表失败")
            }
          })
      },
      sendMessage: function (formName) {
        console.log(this.message.userGroup.toString())
        this.message.userGroup = this.message.userGroup.toString()
        axios.post('/api/message/admin/add', this.message)
          .then(result => {
            if (result.data.code === 200) {
              this.$notify({
                title: '消息发送',
                message: ('hi', {style: 'color: teal'}, '消息发送成功')
              });
              this.message.title = ""
              this.message.content = ""
              this.message.userGroup = []
            } else {
              this.$message.error(result.data.message)
            }
          })
          .catch(function (error) {
            console.log(JSON.stringify(error))
          })
      }
    },
    created () {
      this.getAllUser()
    }
  }
</script>

<style scoped>

</style>
