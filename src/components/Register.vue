<template>
    <!--el-tabs type="card">
      <el-tab-pane label="手机注册" name="0">
       <el-form :model="phoneRegister" :rules="phoneRules">
         <el-form-item prop="phone">
           <el-input v-model="phoneRegister.phone" placeholder="请输入手机号"></el-input>
         </el-form-item>
         <el-form-item prop="code">
           <el-input v-model="phoneRegister.code" placeholder="短信验证码"></el-input>
         </el-form-item>
       </el-form>
      </el-tab-pane>
      <el-tab-pane label="邮箱注册" name="1">
      </el-tab-pane>
    </el-tabs-->
    <el-container style="width: 400px; margin: 0 auto; ">
      <el-header>一卡通客户管理系统</el-header>
      <el-main>
        <el-form :model="mailRegister" :rules="mailRules"  ref="mailRegister" class="demo-ruleForm" size="medium">
          <el-row>
            <el-col>
              <el-form-item prop="mail">
                <el-input v-model="mailRegister.mail" placeholder="邮箱" style="width: 350px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item prop="name">
                <el-input v-model="mailRegister.name" placeholder="姓名" style="width: 350px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item prop="sex">
                <el-select placeholder="性别" v-model="mailRegister.sex" style="width: 350px;">
                  <el-option label="男" value="0"></el-option>
                  <el-option label="女" value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item prop="birthday">
                <el-date-picker
                  value-format="timestamp"
                  v-model="mailRegister.birthday"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="{
              disabledDate(time) {
              return time.getTime() > Date.now();
              }
              }"
                  style="width: 350px;"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item prop="password">
                <el-input v-model="mailRegister.password" placeholder="密码" show-password style="width: 350px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item prop="re_password">
                <el-input v-model="mailRegister.re_password" placeholder="重复密码" show-password style="width: 350px;"></el-input>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item>
                <el-button type="primary" @click="mailSubmit('mailRegister')">添加用户</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-main>
    </el-container>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    /**
     * 手机号格式验证
     */
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      if (!value) {
        return callback(new Error('电话号不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (phoneReg.test(value)) {
            callback()
          } else {
            callback(new Error('电话号码格式不正确'))
          }
        }
      }, 100)
    }

    /**
     * 检查邮箱格式
     * @param rule
     * @param value
     * @param callback
     * @returns {*}
     */
    var checkMail = (rule, value, callback) => {
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
              if (result.data.code !== 200) {
                callback(new Error(result.data.message))
              } else {
                callback()
              }
            })
        } else {
          callback(new Error('邮箱格式不正确'))
        }
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

    var recheck = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        if (value !== this.mailRegister.password) {
          alert(this.mailRegister.password)
          callback(new Error('请输入相同的密码'))
        } else {
          callback()
        }
      }
    }
    return {
      activeName: '1',
      phoneRegister: {
        phone: '',
        code: ''
      },
      phoneRules: {
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'},
          {validator: checkPhone, trigger: 'blur'}
        ],
        code: [
          {required: true, trigger: 'blur'}
        ]
      },
      mailRegister: {
        mail: '',
        name: '',
        sex: '',
        birthday: '',
        password: '',
        re_password: '',
        createBy: 0
      },
      mailRules: {
        mail: [
          {required: true, message: '请输入邮箱', trigger: 'blur'},
          {validator: checkMail, trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'},
          {max: 10, min: 2, message: '请输入正确的姓名', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'change'}
        ],
        birthday: [
          {required: true, message: '请选择生日', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: checkPassword, message: '请使用复杂度更高的密码', trigger: 'blur'}
        ],
        re_password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {validator: recheck, trigger: 'blur'}
        ]
      },
      back_img: {
        backgroundImage: 'url(https://imgchr.com/content/images/system/home_cover_1552414407320_3a5f92.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 1920px'
      }
    }
  },
  methods: {
    /* eslint-disable */
    mailSubmit: function (formName) {
      const h = this.$createElement;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('/api/user/mailSubmit', this.mailRegister)
            .then(result => {
              if (result.data.code === 200) {
                this.$notify({
                  title: '添加用户成功',
                  message: h('i', { style: 'color: teal'}, '用户添加成功，密码为邮箱账号')
                });
              } else {
                this.$message.error(result.data.message)
              }
            })
            .catch(function (error) {
              console.log(JSON.stringify(error))
            })
        }
      })
    }
  }
}
</script>
