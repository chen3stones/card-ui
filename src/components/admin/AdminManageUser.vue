<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path: '/admin/user/list'}">所有用户</el-breadcrumb-item>
        <el-breadcrumb-item >用户详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-row class="row-bg">
        <el-col :span="8" offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">姓名</div>
            <div class="div-small" v-if="changeFlag">{{info.name}}</div>
            <el-input v-model="info.name" :placeholder="info.name" v-if="!changeFlag"></el-input>
          </div>
        </el-col>
        <el-col :span="8" offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">性别</div>
            <div class="div-small" v-if="changeFlag">{{sexEnum.getLabelByValue(info.sex)}}</div>
            <div class="div-small" v-else>
              <el-select v-model="info.sex">
                <el-option label="男" value=0></el-option>
                <el-option label="女" value=1></el-option>
              </el-select>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="8" offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">手机</div>
            <div class="div-small">{{info.phone}}</div>
          </div>
        </el-col>
        <el-col :span="8" offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">邮箱</div>
            <div class="div-small">{{info.mail}}</div>
          </div>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="8" offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">积分</div>
            <div class="div-small">{{info.score}}</div>
          </div>
        </el-col>
        <el-col :span="8" offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">余额</div>
            <div class="div-small">{{info.balance}}</div>
          </div>
        </el-col>
      </el-row>
      <el-row class="row-bg">
        <el-col :span="8" offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">状态</div>
            <div class="div-small">{{info.status}}</div>
          </div>
        </el-col>
        <el-col :span="8" offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">暂无</div>
            <div class="div-small">--</div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-button @click="onClick">{{changeButton}}</el-button>
          <el-button @click="change" v-if="!changeFlag">提交</el-button>
          <el-button @click="open" type="danger" :disabled="info.status === '拉黑'">拉黑</el-button>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
  /* eslint-disable */

  import util from '../js/util'
  import {Enum} from '../js/Enum'
  import AdminIndex from './AdminIndex'
  import axios from 'axios'
  export default {
    data () {
      return {
        info : {
          id : -1,
          name: '--',
          sex: 0,
          phone: '--',
          mail: '--',
          score: '--',
          balance: '--',
          status: ''
        },
        changeFlag: true,
        deleteFlag: true,
        changeButton: '修改',
        sexEnum:
          new Enum().add('男',0)
          .add('女',1)
          .add('未知',-1)
      }
    },
    components: {
      AdminIndex,
    },
    created () {
      this.info.id = this.$route.query.id
      util.getUserIfo(this.info,this.info.id)
    },
    methods: {
      onClick(){
        this.changeFlag = !this.changeFlag
        if(this.changeFlag) {
          this.changeButton = '修改'
        } else {
          this.changeButton = '放弃'
        }
      },
      change(){
        //提交逻辑
        axios.post("/api/admin/user/update",this.info)
        .then(result => {
          if(result.data.code === 200) {
            this.changeFlag = !this.changeFlag
            if(this.changeFlag) {
              this.changeButton = '修改'
            } else {
              this.changeButton = '放弃'
            }
            this.$message({
              type: 'success',
              message: '信息修改成功'
            })
          }else {
            this.$message({
              type: 'error',
              message: result.data.message === '' ? result.data.message : result.data.message
            })
          }
        })

      },
      open() {
        this.$confirm('是否确认拉黑该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get('/api/admin/user/delete',
            {
              params: {
                'id': this.info.id
              }
            })
            .then(result => {
              if (result.data.code !== 200) {
                this.$message({
                  type: 'error',
                  message: result.data.data
                })
              } else {
                this.info.status = '拉黑'
                this.$message({
                  type: 'success',
                  message: '拉黑成功!'
                })
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已放弃拉黑'
          });
        });
      }
    }
  }
</script>

<style scoped>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 40px;
  }
  .row-bg {
    padding: 10px 0;
  }
  .div-box {
    padding: 10px;
  }
  .div-small {
    margin: 5px;
  }
</style>

