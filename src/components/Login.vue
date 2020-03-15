<template>
  <el-container style="width: 400px; margin: 200px auto; ">
    <el-header>一卡通客户管理系统</el-header>
    <el-main>
      <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="账号" prop="username" style="width: 350px;">
          <el-input v-model="loginForm.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 350px;">
          <el-input v-model="loginForm.password" placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <div>
            <el-radio-group v-model="loginForm.role">
              <el-radio-button :label="0">用户</el-radio-button>
              <el-radio-button :label="1">管理员</el-radio-button>
              <!--el-radio-button label="2">系统管理员</--el-radio-button-->
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item style="width: 350px;">
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
export default {
  data () {
    var checkAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      }
      if (value.indexOf('@') !== -1) {
        // 邮箱
        const reg = /^([a-zA-Z]|[0-9])(\w|\\_)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
        if (!value) {
          return callback(new Error('邮箱不为空'))
        } else {
          if (reg.test(value)) {
            axios.get('/api/user/check',
              {
                params: {
                  'account': value
                }
              })
              .then(result => {
                if (result.data.code === 5001 || result.data.code === 5007) {
                  callback()
                } else {
                  callback('账号未注册')
                }
              })
              .catch(error => {
                callback(new Error('系统错误'))
              })
          } else {
            callback(new Error('邮箱格式不正确'))
          }
        }
      } else {
        const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
        if (!value) {
          return callback(new Error('电话号不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(+value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (phoneReg.test(value)) {
              axios.get('/api/user/check',
                {
                  params: {
                    'account': value
                  }
                })
                .then(result => {
                  if (result.data.code !== 5001) {
                    callback('账号未注册')
                  } else {
                    callback()
                  }
                })
                .catch(error => {
                  callback(new Error('系统错误'))
                })
            } else {
              callback(new Error('电话号码格式不正确'))
            }
          }
        }, 100)
      }
    }
    var checkPassword = (rule, value, callback) => {
      const reg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/
      if (!value) {
        return callback(new Error('请输入密码'))
      } else {
        if (!reg.test(value)) {
          callback(new Error('密码复杂度不够'))
        } else {
          callback()
        }
      }
    }
    return {
      roleEnum: {
        USER: 0,
        ADMIN: 1,
        SYS_ADMIN: 2
      },
      loginForm: {
        username: '',
        password: '',
        role: 0
      },
      rules: {
        username: [
          {validator: checkAccount, trigger: 'blur'}
        ],
        password: [
          {validator: checkPassword, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/api/user/login', this.loginForm)
            .then(result => {
              if (result.data.code === 200) {
                console.log(result.data.data.role)
                if(result.data.data.role === this.roleEnum.USER) {
                  this.$router.push({
                    path: '/user/info'
                  })
                } else if(result.data.data.role === this.roleEnum.ADMIN){
                  this.$router.push({
                    path: '/admin/info'
                  })
                } else {
                  this.$message.error('系统错误')
                }
              } else {
                this.$message.error(result.data.message)
              }
            })
            .catch(function (error) {
              console.log('222')
              console.log(JSON.stringify(error))
            })
        } else {
          console.log('error')
          return false
        }
      })
    }
  }
}
</script>

<!--<template>-->
<!--  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">-->
<!--    <el-form-item label="密码" prop="account">-->
<!--      <el-input v-model="ruleForm.account" autocomplete="off"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item label="确认密码" prop="password">-->
<!--      <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>-->
<!--    </el-form-item>-->
<!--    <el-form-item>-->
<!--      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>-->
<!--    </el-form-item>-->
<!--  </el-form>-->

<!--</template>-->

<!--<script>-->
<!--/* eslint-disable */-->
<!--export default {-->
<!--  data () {-->
<!--    var checkAge = (rule, value, callback) => {-->
<!--      if (!value) {-->
<!--        return callback(new Error('年龄不能为空'))-->
<!--      }-->
<!--      setTimeout(() => {-->
<!--        if (!Number.isInteger(value)) {-->
<!--          callback(new Error('请输入数字值'))-->
<!--        } else {-->
<!--          if (value < 18) {-->
<!--            callback(new Error('必须年满18岁'))-->
<!--          } else {-->
<!--            callback()-->
<!--          }-->
<!--        }-->
<!--      }, 1000)-->
<!--    }-->
<!--    var validatePass = (rule, value, callback) => {-->
<!--      if (value === '') {-->
<!--        callback(new Error('请输入密码'))-->
<!--      } else {-->
<!--        if (this.ruleForm.checkPass !== '') {-->
<!--          this.$refs.ruleForm.validateField('checkPass')-->
<!--        }-->
<!--        callback()-->
<!--      }-->
<!--    }-->
<!--    var validatePass2 = (rule, value, callback) => {-->
<!--      if (value === '') {-->
<!--        callback(new Error('请再次输入密码'))-->
<!--      } else if (value !== this.ruleForm.pass) {-->
<!--        callback(new Error('两次输入密码不一致!'))-->
<!--      } else {-->
<!--        callback()-->
<!--      }-->
<!--    }-->
<!--    return {-->
<!--      ruleForm: {-->
<!--        account: '',-->
<!--        password: ''-->
<!--      },-->
<!--      rules: {-->
<!--        account: [-->
<!--          { validator: validatePass, trigger: 'blur' }-->
<!--        ],-->
<!--        password: [-->
<!--          { validator: validatePass2, trigger: 'blur' }-->
<!--        ],-->
<!--        age: [-->
<!--          { validator: checkAge, trigger: 'blur' }-->
<!--        ]-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    submitForm (formName) {-->
<!--      this.$refs[formName].validate((valid) => {-->
<!--        if (valid) {-->
<!--          alert('submit!')-->
<!--        } else {-->
<!--          console.log('error submit!!')-->
<!--          return false-->
<!--        }-->
<!--      })-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
