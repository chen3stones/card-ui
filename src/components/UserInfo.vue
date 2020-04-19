<template>
  <div>
    <el-row class="row-bg">
      <el-col :span="8" :offset="3" class="el-col">
        <div class="bg-purple-light grid-content div-box">
          <div class="div-small">姓名</div>
          <div class="div-small" v-if="flag">{{info.name}}</div>
          <el-input v-model="info.name" :placeholder="info.name" v-if="!flag"></el-input>
        </div>
      </el-col>
      <el-col :span="8" :offset="3" class="el-col">
        <div class="bg-purple-light grid-content div-box">
          <div class="div-small">性别</div>
          <div class="div-small" v-if="flag">{{sexEnum[info.sex]}}</div>
          <el-select placeholder="性别" v-model="info.sex" v-if="!flag">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="8" :offset="3" class="el-col">
        <div class="bg-purple-light grid-content div-box">
          <div class="div-small">手机</div>
          <div class="div-small" v-if="flag">{{info.phone}}</div>
        </div>
      </el-col>
      <el-col :span="8" :offset="3" class="el-col">
        <div class="bg-purple-light grid-content div-box">
          <div class="div-small">邮箱</div>
          <div class="div-small" v-if="flag">{{info.mail}}</div>
        </div>
      </el-col>
    </el-row>
    <el-row class="row-bg">
      <el-col :span="8" :offset="3" class="el-col">
        <div class="bg-purple-light grid-content div-box">
          <div class="div-small">积分</div>
          <div class="div-small">{{info.score}}</div>
        </div>
      </el-col>
      <el-col :span="8" :offset="3" class="el-col">
        <div class="bg-purple-light grid-content div-box">
          <div class="div-small">余额</div>
          <div class="div-small">{{info.balance}}</div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-button @click="onClick">修
          改</el-button>
        <el-button @click="change" v-if="!flag">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
/* eslint-disable */

import util from './js/util'
import userMenu from './UserIndex'
export default {
  data () {
    return {
      info : {
        name: '--',
        sex: '--',
        phone: '--',
        mail: '--',
        score: '--',
        balance: '--'
      },
      flag: true,
      sexEnum: {
        0: '男',
        1: '女'
      }
    }
  },
  components: {
    userMenu,
  },
  created () {
    util.getUserIfo(this.info,-1)
  },
  methods: {
    onClick(){
      this.flag = !this.flag
    },
    change(){
      alert(this.info.name)
      this.flag = !this.flag
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

