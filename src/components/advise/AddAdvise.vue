<template>
  <el-form ref="advise" :model="advise" :rules="rules">
    <el-container>
      <el-aside width="160px" style="margin: 20px">
        <el-form-item prop="menu">
          <advise-menu ref="adviseMenu"></advise-menu>
        </el-form-item>
      </el-aside>
        <el-main>
          <div style="width: 600px">
            <el-form-item label="反馈类型" prop="type">
              <el-radio v-model="advise.type" label="0">投诉</el-radio>
              <el-radio v-model="advise.type" label="1">建议</el-radio>
            </el-form-item>
            <el-form-item label="反馈对象" prop="beAdviseUser">
              <el-select placeholder="反馈对象" v-model="advise.beAdviseUser" style="width: 350px;">
                <el-option v-for="item in adminUser" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="反馈内容" prop="adviseInfo">
              <el-input v-model="advise.adviseInfo" placeholder="反馈内容" type="textarea"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submit('advise')">提交</el-button>
            </el-form-item>
          </div>
        </el-main>
    </el-container>
  </el-form>
</template>

<script>
  import AdviseMenu from './AdviseMenu'
  import axios from 'axios'
  export default {
    name: 'AddAdvise',
    template: "<advise-menu></advise-menu>",
    components: {
      AdviseMenu
    },

    data() {
      return {
        advise: {
          adviseMenu: 0,
          type: "1",
          beAdviseUser: '请选择',
          adviseInfo: ''
        },
        adminUser: [],
        rules: {
          type: [
            {required: true, message: '请选择投诉类型', trigger: 'blur'},
          ],
          beAdviseUser: [
            {required: true, message: '请选择投诉对象',trigger: 'blur'}
          ],
          adviseInfo: [
            {required: true, message: '请输入投诉内容', trigger: 'blur'},
            {max: 1024, min: 10, message: '字数限制为10-1024', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      submit (formName) {
        var menu = this.$refs.adviseMenu.editCheckId
        if(menu === 0 || menu === 1 || menu === 2) {
          this.$message.error('请选择您的投诉类型')
          return false
        }
        this.advise.adviseMenu = this.$refs.adviseMenu.editCheckId
        this.$refs[formName].validate((valid) => {
          if(valid) {
            axios.post('/api/advise/user/add',this.advise)
            .then(result => {
              if(result.data.code === 200) {
                this.$notify({
                  title: '提交成功',
                  message: '您好，您的反馈我们已收到，将会尽快给您回复'
                })
                this.$router.push('/advise/list')
              }else {
                // todo
              }
            })
            .catch(function (error) {
              console.log(JSON.stringify(error))
            })
          }else {
            console.log('error')
            return false
          }
        })
      },
      getAdminName() {
        axios.get('/api/user/roleList',
          {
            params: {
              role : 'admin'
            }
          }
        )
          .then(result => {
            console.log(result)
            this.adminUser = result.data.data
          })
      }
    },
    created () {
      this.getAdminName()
    }

  }
</script>

<style scoped>

</style>
