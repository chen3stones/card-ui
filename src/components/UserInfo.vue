<template>
  <el-container>
    <el-main>
      <el-row class="row-bg">
        <el-col :span="8" offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">姓名</div>
            <div class="div-small">{{info.name}}</div>
          </div>
        </el-col>
        <el-col :span="8" offset="3" class="el-col">
          <div class="bg-purple-light grid-content div-box">
            <div class="div-small">性别</div>
            <div class="div-small">{{info.sex}}</div>
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
    </el-main>
  </el-container>
</template>

<script>
/* eslint-disable */

import util from './js/util'
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
      }
    }
  },
  created () {
    util.test(this.info)
  }
}
</script>

<style>
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

